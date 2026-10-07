import { readFileSync, readdirSync, existsSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = process.cwd();
const bundle = 'business-patterns';
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
run(['dhall','freeze','--check','okf/business-patterns.dhall']);
run(['dhall','freeze','--check','mori.dhall']);
run(['dhall','type','--file','okf/business-patterns.dhall']);
const manifest = JSON.parse(run(['dhall-to-json','--file','mori.dhall']));
const binding = manifest.okfBundles.find((b:any) => b.name === bundle);
requireThat(binding?.path === bundle && binding.okfVersion === '0.2', 'Incorrect bundle manifest');
requireThat(binding.profileBinding === 'okf/business-patterns.dhall' || binding.profile === 'okf/business-patterns.dhall', 'Incorrect profile binding');
const validation = run(['okf','validate',bundle,'--strict','--profile','okf/business-patterns.dhall','--profile-enforce','--log-enforce']);
const all = files(bundle).filter(p=>p.endsWith('.md'));
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
for (const d of manifest.docs) if (d.location?.startsWith(bundle+'/'))
  requireThat(resources.has(prefix+d.key), `DocRef has no concept: ${d.key}`);
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
requireThat(Array.isArray(coverage) && coverage.length === 22, 'Expected 22 source-map entries');
requireThat(new Set(coverage.map((c:any)=>c.source)).size === 22, 'Duplicate source-map entry');
for (const c of coverage) {
  requireThat(c.source?.startsWith('mori://shinzui/event-sourcing-full-app-patterns/docs/') && c.runtime?.startsWith('mori://shinzui/keiro-runtime-patterns/docs/'), 'Invalid source/runtime identity');
  requireThat(c.layer && c.rationale && ['inherits','supplements','diverges','gap'].includes(c.disposition), `Invalid coverage: ${c.source}`);
  if (c.disposition === 'inherits') requireThat(c.state === 'inherited' && c.destination === null, `Inherited row duplicates guidance: ${c.source}`);
  else {
    requireThat(['planned','published'].includes(c.state), `Invalid coverage state: ${c.source}`);
    requireThat(typeof c.destination === 'string' && !c.destination.includes('..') && !c.destination.startsWith('/'), `Invalid coverage destination: ${c.source}`);
    if (c.state === 'published') requireThat(existsSync(join(bundle,c.destination)), `Missing published destination: ${c.destination}`);
    if (complete) requireThat(c.state === 'published', `Unfinished coverage: ${c.source}`);
  }
}
const graph = JSON.parse(run(['okf','graph',bundle,'--json']));
const ids = new Set(graph.nodes.map((n:any)=>n.id));
requireThat(ids.size === concepts.length && graph.nodes.length === concepts.length, 'Graph/concept count mismatch');
for (const e of graph.edges) requireThat(ids.has(e.source) && ids.has(e.target), 'Dangling graph edge');
const temp = mkdtempSync(join(tmpdir(),'business-patterns-index-'));
try {
  cpSync(bundle,join(temp,bundle),{recursive:true});
  run(['okf','index',bundle,'--write','--okf-version','0.2'],temp);
  const expected = files(join(temp,bundle)).filter(p=>p.endsWith('/index.md')).map(p=>relative(temp,p));
  const actual = all.filter(p=>p.endsWith('/index.md'));
  requireThat(JSON.stringify(expected) === JSON.stringify(actual), 'Generated index file set is stale');
  for (const p of expected) requireThat(read(p) === read(join(temp,p)), `Generated index is stale: ${p}`);
} finally { rmSync(temp,{recursive:true,force:true}); }
if (base) {
  run(['git','rev-parse','--verify',`${base}^{commit}`]);
  const changed = run(['git','diff','--name-only',base,'--',bundle]).trim().split('\n');
  const untracked = run(['git','ls-files','--others','--exclude-standard','--',bundle]).trim().split('\n');
  const changedSet = new Set([...changed,...untracked]);
  for (const p of changedSet) {
    if (!p.endsWith('.md') || ['index.md','log.md'].includes(p.split('/').at(-1)!)) continue;
    let dir = dirname(p);
    while (dir !== '.' && !existsSync(join(dir,'log.md'))) dir = dirname(dir);
    requireThat(dir !== '.' && changedSet.has(join(dir,'log.md')), `Changed concept requires its nearest log in the diff: ${p}`);
  }
} else console.log('No BASE_REF supplied: diff-aware log pairing not checked.');
console.log(validation.trim());
console.log(`Catalog checks passed: ${concepts.length} concepts, 22 source entries${complete ? ', complete coverage' : ''}.`);
