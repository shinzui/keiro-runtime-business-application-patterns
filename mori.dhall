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
      , Schema.OkfBundle::{
        , name = "book-notes"
        , path = "book-notes"
        , profileBinding = Some
            (Schema.ProfileBinding.Local "okf/book-notes.dhall")
        , okfVersion = "0.2"
        , description = Some
            "Book-checked explanations and explicitly scoped application adaptations"
        }
      ]
    , docs =
      [ Schema.DocRef::{
        , key = "examples-chapter-activation"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/examples/chapter-activation.md"
        }
      , Schema.DocRef::{
        , key = "reads-query-and-live-updates"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/reads/query-and-live-updates.md"
        }
      , Schema.DocRef::{
        , key = "reads-materialization-and-freshness"
        , kind = Schema.DocKind.Pattern
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "business-patterns/reads/materialization-and-freshness.md"
        }
      , Schema.DocRef::{
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
      , Schema.DocRef::{
        , key = "book-what-is-a-business-application"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/what-is-a-business-application.md"
        }
      , Schema.DocRef::{
        , key = "book-the-status-quo"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location = Schema.DocLocation.LocalFile "book-notes/the-status-quo.md"
        }
      , Schema.DocRef::{
        , key = "book-what-is-a-reactive-system"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/what-is-a-reactive-system.md"
        }
      , Schema.DocRef::{
        , key = "book-why-reactive-business-applications"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/why-reactive-business-applications.md"
        }
      , Schema.DocRef::{
        , key = "book-what-is-a-business-rule"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/what-is-a-business-rule.md"
        }
      , Schema.DocRef::{
        , key = "book-managing-time"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location = Schema.DocLocation.LocalFile "book-notes/managing-time.md"
        }
      , Schema.DocRef::{
        , key = "book-constraints-and-principles"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/constraints-and-principles.md"
        }
      , Schema.DocRef::{
        , key = "book-high-level-data-flow"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/high-level-data-flow.md"
        }
      , Schema.DocRef::{
        , key = "book-command-processor"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/command-processor.md"
        }
      , Schema.DocRef::{
        , key = "book-command-generator"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/command-generator.md"
        }
      , Schema.DocRef::{
        , key = "book-event-materializer"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/event-materializer.md"
        }
      , Schema.DocRef::{
        , key = "book-testing-monitoring-observability"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/testing-monitoring-observability.md"
        }
      , Schema.DocRef::{
        , key = "book-required-technologies"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile "book-notes/required-technologies.md"
        }
      , Schema.DocRef::{
        , key = "book-implementation-translation"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/implementation-translation.md"
        }
      , Schema.DocRef::{
        , key = "book-expansion-points-and-beyond"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location =
            Schema.DocLocation.LocalFile
              "book-notes/expansion-points-and-beyond.md"
        }
      , Schema.DocRef::{
        , key = "book-adaptations"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location = Schema.DocLocation.LocalFile "book-notes/adaptations.md"
        }
      , Schema.DocRef::{
        , key = "book-validation"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.Module
        , location = Schema.DocLocation.LocalFile "book-notes/validation.md"
        }
      ]
    , dependencyRefs =
      [ Schema.MoriRef::{
        , namespace = "shinzui"
        , name = "keiro-runtime-patterns"
        }
      ]
    }
