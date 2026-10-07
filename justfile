# Validate without modifying the working tree; optionally pass a Git base and --complete.
check-docs *args:
    scripts/check-business-patterns {{args}}
