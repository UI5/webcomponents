# AGENTS.md - UI5 Web Components Development Guide

This file guides AI coding assistants developing components built on `@ui5/webcomponents-base`.

> **Working in the ui5-webcomponents monorepo?** See the [root AGENTS.md](../../AGENTS.md) for repository commands, build flow, and commit guidelines.

## Knowledge Base — read this first

The conventions, guardrails, and good/bad examples for writing components live in the **AI Knowledge Base**
at [`ai-knowledge-base/`](../../ai-knowledge-base/) (repo root). It is the single source of truth, for any AI
tool. Load it **on demand**, not up front.

**Read [`ai-knowledge-base/INDEX.md`](../../ai-knowledge-base/INDEX.md) before you edit code whenever any of these is true:**

- You add, change, review, or test a `.ts`, `.tsx`, or `.css` file under `packages/`.
- You write or debug a Cypress spec.
- The task names a `ui5-*` component, a property, slot, event, design token, or ARIA attribute.

Then open **only** the reference files its routing table names for the areas your task touches — do not
read every file.
