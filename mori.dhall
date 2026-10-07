let Schema =
      https://raw.githubusercontent.com/shinzui/mori-schema/3522f4a51181d73c9c90fc27a7c0838bd29ae95f/package.dhall
        sha256:dcb19e2312e790bad14e622cc98a1281cd2298c5b564a2f0d0534d3c718d8803

in  Schema.Project::{
    , project = Schema.ProjectIdentity::{
      , name = "keiro-runtime-business-application-patterns"
      , namespace = "shinzui"
      , stableId = Some "project_01m4bj3kvde2as3avpveavg5bw"
      , type = Schema.PackageType.Other "Documentation"
      , language = Schema.Language.Haskell
      , lifecycle = Schema.Lifecycle.Active
      , description = Some
          "Business application patterns built on the Keiro runtime (keiki, keiro, kiroku, shibuya)"
      , domains = [ "EventSourcing", "Workflow" ]
      }
    , repos =
      [ Schema.Repo::{
        , name = "keiro-runtime-business-application-patterns"
        , github = Some "shinzui/keiro-runtime-business-application-patterns"
        }
      ]
    , dependencies = [ "shinzui/keiro-runtime-patterns" ]
    , dependencyRefs =
      [ Schema.MoriRef::{
        , namespace = "shinzui"
        , name = "keiro-runtime-patterns"
        }
      ]
    }
