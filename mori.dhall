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
    , dependencies =
      [ "shinzui/keiro-runtime-patterns"
      , "shinzui/event-sourcing-full-app-patterns"
      , "shinzui/okf-profiles"
      , "shinzui/keiro"
      ]
    , okfBundles =
      [ Schema.OkfBundle::{
        , name = "business-patterns"
        , path = "business-patterns"
        , profileBinding = Some
            (Schema.ProfileBinding.Local "okf/business-patterns.dhall")
        , okfVersion = "0.2"
        , description = Some
            "Book-aligned application compositions supplementing the Keiro runtime catalog"
        }
      ]
    , docs =
      [ Schema.DocRef::{
        , key = "workflows-effects-and-integration"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/workflows/effects-and-integration.md"
        }
      , Schema.DocRef::{
        , key = "workflows-time-and-automation"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/workflows/time-and-automation.md"
        }
      , Schema.DocRef::{
        , key = "commands-outcomes-and-visibility"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/commands/outcomes-and-visibility.md"
        }
      , Schema.DocRef::{
        , key = "commands-generation-and-processing"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/commands/generation-and-processing.md"
        }
      , Schema.DocRef::{
        , key = "getting-started"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "business-patterns/getting-started.md"
        }
      , Schema.DocRef::{
        , key = "architecture-authoring-contract"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/architecture/authoring-contract.md"
        }
      , Schema.DocRef::{
        , key = "architecture-source-map"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/architecture/source-map.md"
        }
      ]
    , dependencyRefs =
      [ Schema.MoriRef::{
        , namespace = "shinzui"
        , name = "keiro-runtime-patterns"
        }
      ]
    }
