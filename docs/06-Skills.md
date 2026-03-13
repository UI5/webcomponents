---
sidebar_label: Skills
sidebar_class_name: sidebar-sparkle
title: Skills
---

# Skills

UI5 Web Components ships [Agent Skills](https://agentskills.io) — portable, structured knowledge files that teach AI coding assistants how to work with the library. Skills provide domain-specific guidance that goes beyond what a general-purpose LLM knows out of the box.

## Available Skills

| Skill | Description |
|-------|-------------|
| **styling** | How to customize and style UI5 Web Components — CSS shadow parts, custom states, CSS variables, and tag-level styling |
| **accessibility** | How to make UI5 Web Components applications accessible — accessibility APIs, label-input relationships, invisible messaging, keyboard handling, and high contrast themes |

## Installation

Install all UI5 Web Components skills into your project:

```bash
npx skills add "UI5/webcomponents"
```

This downloads the skill files into your project so that AI assistants (Claude Code, Copilot, Cursor, etc.) can pick them up automatically.

To install a specific skill:

```bash
npx skills add "UI5/webcomponents" --skill "styling"
```

### In the Repository

When working inside the UI5 Web Components repository, AI coding assistants automatically discover and use the skills from the [`skills/`](https://github.com/UI5/webcomponents/tree/main/skills) directory — no setup needed.

### Manual Setup

You can also copy skills directly from the repository's [`skills/`](https://github.com/UI5/webcomponents/tree/main/skills) directory into your project's `.agents/skills/` folder:

```
your-project/
└── .agents/
    └── skills/
        ├── styling/
        │   └── SKILL.md
        └── accessibility/
            └── SKILL.md
```

## How Skills Work

Each skill is a Markdown file (`SKILL.md`) with structured frontmatter (name, description, trigger conditions) and a body containing the actual guidance. When an AI assistant encounters a relevant task — for example, a question about styling a component — it uses the skill's content to provide accurate, project-specific answers instead of generic advice.

Skills are part of the open [Agent Skills](https://agentskills.io) standard and work across AI tools that support it.
