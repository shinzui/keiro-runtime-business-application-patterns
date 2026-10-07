import { readFileSync, readdirSync, existsSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = process.cwd();
const bundle = 'business-patterns';
const bundles = [bundle, 'book-notes'];
const prefix = 'mori://shinzui/keiro-runtime-business-application-patterns/docs/';
const args = process.argv.slice(2);
const complete = args.includes('--complete');
const positional = args.filter(x => x !== '--complete');
if (positional.length > 1 || positional.some(x => x.startsWith('-'))) throw Error('Usage: check-business-patterns [BASE_REF] [--complete]');
const base = positional[0];
function run(argv: string[], cwd = root) {
  const p = Bun.spawnSync(argv, { cwd, stdout: 'pipe', stderr: 'pipe' });
  const stdout = p.stdout.toString(), stderr = p.stderr.toString();
  if (p.exitCode !== 0) throw Error(`${argv.join(' ')} failed\n${stdout}${stderr}`);
  return stdout;
}
function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw Error(message);
}
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    requireThat(!e.isSymbolicLink(), `Symlinks are not allowed in the catalog: ${dir}/${e.name}`);
    return e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)];
  }).sort();
}
function read(path: string) { return readFileSync(path,'utf8'); }
function meta(path: string): any {
  const m = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(read(path));
  requireThat(m, `Missing frontmatter: ${path}`);
  return Bun.YAML.parse(m[1]);
}
run(['dhall','freeze','--check','mori.dhall']);
const manifest = JSON.parse(run(['dhall-to-json','--file','mori.dhall']));
const validations: string[] = [];
for (const name of bundles) {
  const profile = `okf/${name}.dhall`;
  run(['dhall','freeze','--check',profile]);
  run(['dhall','type','--file',profile]);
  const binding = manifest.okfBundles.find((b:any) => b.name === name);
  requireThat(binding?.path === name && binding.okfVersion === '0.2', `Incorrect bundle manifest: ${name}`);
  requireThat(binding.profileBinding === profile || binding.profile === profile, `Incorrect profile binding: ${name}`);
  validations.push(run(['okf','validate',name,'--strict','--profile',profile,'--profile-enforce','--log-enforce']));
}
const all = bundles.flatMap(b=>files(b).filter(p=>p.endsWith('.md'))).sort();
const concepts = all.filter(p=>!['index.md','log.md'].includes(p.split('/').at(-1)!));
const resources = new Set<string>();
for (const p of concepts) {
  const m = meta(p);
  requireThat(typeof m.resource === 'string' && m.resource.startsWith(prefix), `Wrong resource: ${p}`);
  requireThat(!resources.has(m.resource), `Duplicate resource: ${m.resource}`);
  resources.add(m.resource);
  const matches = manifest.docs.filter((d:any)=>d.key === m.resource.slice(prefix.length));
  requireThat(matches.length === 1 && matches[0].location === p, `DocRef mismatch: ${p}`);
  if (m.type === 'Pattern') {
    for (const heading of ['Problem and applicability','Book principle and source layer','Runtime baseline','Application recommendation','Alternatives and divergences','Failure and recovery','Evidence'])
      requireThat(read(p).includes(`## ${heading}\n`), `Missing ${heading}: ${p}`);
    requireThat(['supplements','diverges','gap'].includes(m.relationship), `Missing supplemental relationship: ${p}`);
    requireThat(m.runtime_baseline?.startsWith('mori://shinzui/keiro-runtime-patterns/'), `Missing runtime baseline: ${p}`);
  }
}
for (const d of manifest.docs) if (bundles.some(b=>d.location?.startsWith(b+'/')))
  requireThat(resources.has(prefix+d.key), `DocRef has no concept: ${d.key}`);
function localSource(resource: string, context: string) {
  const [uri, anchor] = resource.split('#');
  requireThat(resources.has(uri), `Missing local source: ${context}: ${resource}`);
  if (anchor) {
    const doc = manifest.docs.find((d:any)=>prefix+d.key === uri);
    const headings = [...read(doc.location).matchAll(/^#+\s+(.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu,'').trim().replace(/\s/g,'-'));
    requireThat(headings.includes(anchor), `Missing local source anchor: ${context}: ${resource}`);
  }
}
for (const p of concepts) {
  for (const source of meta(p).sources ?? []) {
    if (source.resource?.startsWith(prefix)) localSource(source.resource, p);
    requireThat(!source.resource?.startsWith('mori://shinzui/event-sourcing-full-app-patterns'), `External book source dependency: ${p}`);
  }
}
// Inspect links outside fences as well as every generated index. External URI resolution is a separate Mori check.
for (const p of all) {
  const content = read(p).replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const [name,anchor] = target.split('#');
    const dest = name ? resolve(dirname(p),decodeURIComponent(name)) : resolve(p);
    requireThat(dest.startsWith(root+'/'), `Link escapes repository: ${p}: ${target}`);
    requireThat(existsSync(dest), `Broken local link: ${p}: ${target}`);
    if (anchor && dest.endsWith('.md')) {
      const headings = [...read(dest).matchAll(/^#+\s+(.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu,'').trim().replace(/\s/g,'-'));
      requireThat(headings.includes(decodeURIComponent(anchor)), `Broken heading link: ${p}: ${target}`);
    }
  }
}
const coverage = meta(bundle+'/architecture/source-map.md').coverage;
requireThat(Array.isArray(coverage) && coverage.length === 23, 'Expected 23 source-map entries');
requireThat(new Set(coverage.map((c:any)=>c.source)).size === 23, 'Duplicate source-map entry');
for (const c of coverage) {
  requireThat(c.source?.startsWith(prefix+'book-') && c.runtime?.startsWith('mori://shinzui/keiro-runtime-patterns/docs/'), 'Invalid source/runtime identity');
  localSource(c.source, 'coverage');
  requireThat(c.layer && c.rationale && ['inherits','supplements','diverges','gap'].includes(c.disposition), `Invalid coverage: ${c.source}`);
  if (c.disposition === 'inherits') requireThat(c.state === 'inherited' && c.destination === null, `Inherited row duplicates guidance: ${c.source}`);
  else {
    requireThat(['planned','published'].includes(c.state), `Invalid coverage state: ${c.source}`);
    requireThat(typeof c.destination === 'string' && !c.destination.includes('..') && !c.destination.startsWith('/'), `Invalid coverage destination: ${c.source}`);
    if (c.state === 'published') requireThat(existsSync(join(bundle,c.destination)), `Missing published destination: ${c.destination}`);
    if (complete) requireThat(c.state === 'published', `Unfinished coverage: ${c.source}`);
  }
}
for (const name of bundles) {
  const graph = JSON.parse(run(['okf','graph',name,'--json']));
  const ids = new Set(graph.nodes.map((n:any)=>n.id));
  const count = concepts.filter(p=>p.startsWith(name+'/')).length;
  requireThat(ids.size === count && graph.nodes.length === count, `Graph/concept count mismatch: ${name}`);
  for (const e of graph.edges) requireThat(ids.has(e.source) && ids.has(e.target), `Dangling graph edge: ${name}`);
}
const temp = mkdtempSync(join(tmpdir(),'business-patterns-index-'));
try {
  for (const name of bundles) {
    cpSync(name,join(temp,name),{recursive:true});
    run(['okf','index',name,'--write','--okf-version','0.2'],temp);
    const expected = files(join(temp,name)).filter(p=>p.endsWith('/index.md')).map(p=>relative(temp,p));
    const actual = all.filter(p=>p.startsWith(name+'/') && p.endsWith('/index.md'));
    requireThat(JSON.stringify(expected) === JSON.stringify(actual), `Generated index file set is stale: ${name}`);
    for (const p of expected) requireThat(read(p) === read(join(temp,p)), `Generated index is stale: ${p}`);
  }
} finally { rmSync(temp,{recursive:true,force:true}); }
if (base) {
  run(['git','rev-parse','--verify',`${base}^{commit}`]);
  const changed = run(['git','diff','--name-only',base,'--',...bundles]).trim().split('\n');
  const untracked = run(['git','ls-files','--others','--exclude-standard','--',...bundles]).trim().split('\n');
  const changedSet = new Set([...changed,...untracked]);
  for (const p of changedSet) {
    if (!p.endsWith('.md') || ['index.md','log.md'].includes(p.split('/').at(-1)!)) continue;
    let dir = dirname(p);
    while (dir !== '.' && !existsSync(join(dir,'log.md'))) dir = dirname(dir);
    requireThat(dir !== '.' && changedSet.has(join(dir,'log.md')), `Changed concept requires its nearest log in the diff: ${p}`);
  }
} else console.log('No BASE_REF supplied: diff-aware log pairing not checked.');
for (const validation of validations) console.log(validation.trim());
console.log(`Catalog checks passed: ${concepts.length} concepts, 23 source entries across 2 bundles${complete ? ', complete coverage' : ''}.`);
