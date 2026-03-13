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

## Usage

### In the Repository

When working inside the UI5 Web Components repository, AI coding assistants (Claude Code, Cursor, etc.) automatically discover and use the skills from the [`skills/`](https://github.com/SAP/ui5-webcomponents/tree/main/skills) directory — no setup needed.

### In Your Own Project

Copy the skills you need from the repository's [`skills/`](https://github.com/SAP/ui5-webcomponents/tree/main/skills) directory into your project's `.agents/skills/` folder:

```
your-project/
└── .agents/
    └── skills/
        ├── styling/
        │   └── SKILL.md
        └── accessibility/
            └── SKILL.md
```

AI assistants that support the [Agent Skills](https://agentskills.io) standard will pick them up automatically.

## How Skills Work

Each skill is a Markdown file (`SKILL.md`) with structured frontmatter (name, description, trigger conditions) and a body containing the actual guidance. When an AI assistant encounters a relevant task — for example, a question about styling a component — it uses the skill's content to provide accurate, project-specific answers instead of generic advice.

Skills are part of the open [Agent Skills](https://agentskills.io) standard and work across AI tools that support it.
