# Claude-Code-Course-101
Develop web applications providing user understanding of using Claude Code from basic to professional

## Claude Code Quest

A cute, game-style course that teaches kids and beginners how to use Claude Code. Plain HTML, CSS and JavaScript: no build step, no framework.

**Play it:** open `index.html` in a browser (or enable GitHub Pages on this branch's root).

| Level | Game | Teaches |
|---|---|---|
| 1. Meet Claude Code | Quiz | What Claude Code is and how its look-act-check loop works |
| 2. Pick a Playground | Matching | Terminal, VS Code (and Cursor), JetBrains, Desktop, Web, GitHub Actions, Slack. No IDE required |
| 3. Install Quest | Pretend terminal | Install commands, `claude`, `/init`, `/clear` |
| 4. Prompt Chef | Prompt builder | Writing specific prompts, `@` files, plan mode |
| 5. Power-Up Memory | Card flip | CLAUDE.md, skills, hooks, subagents, MCP, plugins |
| 6. Safety Shield | Sorting | Permission modes, Shift+Tab, Esc, `/rewind` checkpoints |
| 7. Claude Everywhere | Scenario quiz | Projects, artifacts, routines, `/loop`, Remote Control, Code Review |
| 8. What Can We Build? | Sorting | Web/mobile apps, games, backends, AI agents (Agent SDK), automation |
| 9. Boss Level | Final quiz | Everything, plus a printable certificate |

`challenges.html` lists 14 real-world challenges (data in `js/challenges-data.js`).

### Files

- `index.html`: level map and progress (saved in the browser's localStorage)
- `levels/*.html`: one page per level
- `js/game.js`: the tiny game engine (story slides, quiz, match, memory, terminal, sort, prompt builder)
- `css/style.css`: shared pastel theme

Facts follow the official docs at https://code.claude.com/docs (checked October 2026).
