# Triage labels

Vocabulary used in the `Status:` line at the top of every issue file under `.scratch/<feature-slug>/issues/`.

- **`ready-for-agent`** — issue is well-specified, dependencies are satisfied (or noted under "Blocked by"), and an autonomous coding session can start on it immediately. Acceptance criteria are listed and verifiable.
- **`in-progress`** — an agent or human is actively working on the issue. Do not start work on a `in-progress` issue from a fresh session.
- **`blocked`** — issue depends on something that is not yet done. The "Blocked by" section lists the prerequisite.
- **`needs-triage`** — the issue exists but is not yet specified well enough to hand to an agent. A human must review and rewrite before changing status to `ready-for-agent`.
- **`done`** — the issue's acceptance criteria are all met and the work is merged or otherwise accepted. Issues with this status are considered satisfied for the purposes of unblocking dependents.

A runner picking work should only consider issues whose `Status:` is `ready-for-agent` AND whose "Blocked by" list points to issues with `Status: done` (or no blockers).
