# Andromera — Governing Skills

This codebase is governed by the following design skills from `.skills/`.
Load these at the start of every session.

## Primary Design System (governs everything)
- `.skills/agent-skills/web-design/dark-blue-contrasting-clean/SKILL.md`
  Near-black navy base, thin rail framing, corner squares, strong contrast, localised glow.
  Andromera adaptation: violet bloom replaces cobalt feature blocks (atmosphere only); --glow teal owns all interaction.

## Secondary Structure (layout hierarchy, agency feel)
- `.skills/agent-skills/web-design/nested-container-clean-agency/SKILL.md`
  Nested containers, outer editorial shell, inset dark feature blocks, restrained accent.

## Method
- `.skills/agent-skills/ui/design-first-ui-prompting/SKILL.md`

## Detail Skills (apply only where the brief calls them out)
- `.skills/agent-skills/web-design/container-lines/SKILL.md` — vertical side rails + corner squares
- `.skills/agent-skills/web-design/number-details/SKILL.md` — 01 / 02 / 03 section markers
- `.skills/agent-skills/web-design/css-border-gradient/SKILL.md` — premium gradient borders
- `.skills/agent-skills/web-design/animation-on-scroll/SKILL.md` — IntersectionObserver reveals
- `.skills/agent-skills/web-design/staggered-word-reveal/SKILL.md` — word-by-word H1 reveal
- `.skills/agent-skills/web-design/beam-glow-states/SKILL.md` — CSS-only glow states (no React dep)

## Banned Skills
Do NOT load: threejs, webgl-*, shader*, globe*, cinematic-*, gsap*, matterjs, unicorn-studio.
These break the ≤ 180 KB performance budget.

## Brand Rules
- Violet is atmosphere only: blooms, arcs, nebula washes. Never text, buttons, borders, icons.
- --glow teal owns 100% of interaction.
- No prices, currency symbols, or "starting from" language anywhere.
- No AI tool/model/vendor names. Capability language only.
- Logo wordmark ships as SVG (geometric sans). Serif headlines are intentional.
