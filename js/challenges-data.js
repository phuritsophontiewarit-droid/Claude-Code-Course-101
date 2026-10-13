/* Challenge list shared by challenges.html (and the PDF summary). */
window.CHALLENGES = [
  {
    "id": 1, "icon": "🌱", "name": "Hello, Claude!", "level": "Beginner", "levels": "1-3",
    "goal": "Make your very first web page with Claude Code.",
    "steps": ["Install Claude Code, or open claude.ai/code in a browser.", "Make an empty folder called hello-me and start claude inside it.", "Ask: make hello.html that says hello to <your name> in a big rainbow font with a bouncing emoji.", "Open hello.html in your browser."],
    "success": "The page shows your name in rainbow letters and the emoji bounces.",
    "features": ["Install", "First prompt"]
  },
  {
    "id": 2, "icon": "📒", "name": "My Project Notebook", "level": "Beginner", "levels": "3, 5",
    "goal": "Teach Claude your own rules with CLAUDE.md.",
    "steps": ["In your hello-me folder run /init.", "Open CLAUDE.md and add 3 rules, e.g. 'use pastel colors', 'write comments a 10-year-old can read', 'every page needs a footer'.", "Ask Claude to add a new page called pets.html.", "Check that the new page follows all 3 rules without you repeating them."],
    "success": "pets.html follows every rule in CLAUDE.md.",
    "features": ["/init", "CLAUDE.md"]
  },
  {
    "id": 3, "icon": "🧑‍🍳", "name": "Prompt Makeover", "level": "Beginner", "levels": "4",
    "goal": "Turn vague prompts into great ones.",
    "steps": ["Start with these vague prompts: 'make it nicer', 'fix it', 'add stuff'.", "Rewrite each one so it says WHAT, WHERE (use @file) and HOW TO CHECK.", "Try a vague version and your improved version and compare the results."],
    "success": "You can explain why your improved prompts gave better results.",
    "features": ["Prompting", "@-mentions"]
  },
  {
    "id": 4, "icon": "🗺️", "name": "Plan Before You Build", "level": "Intermediate", "levels": "4, 6",
    "goal": "Use plan mode to design a small game before coding it.",
    "steps": ["Press Shift+Tab until plan mode is on.", "Ask: plan a Pet Feeder clicker game in one HTML file: click to feed, a hunger bar, and a happy face at full.", "Read the plan and ask for one change (e.g. add a sound).", "Approve the plan and let Claude build it step by step."],
    "success": "The game works and matches the plan you approved.",
    "features": ["Plan mode", "Shift+Tab"]
  },
  {
    "id": 5, "icon": "⏪", "name": "Time Traveler", "level": "Intermediate", "levels": "6",
    "goal": "Undo mistakes with checkpoints and git.",
    "steps": ["Run git init and ask Claude to commit your game with a good message.", "Ask Claude for a silly change, like 'make everything upside down'.", "Press Esc twice (or type /rewind) and restore the code to before the change.", "Run git log to see your saved history."],
    "success": "Your game is back to normal and git log shows your commit.",
    "features": ["/rewind", "Checkpoints", "git"]
  },
  {
    "id": 6, "icon": "🐞", "name": "Bug Detective", "level": "Intermediate", "levels": "4, 8",
    "goal": "Find and fix a real bug, and prove it is fixed.",
    "steps": ["Add this broken code to a file: let score; score.points += 1;", "Open the page, copy the error from the browser console.", "Paste the exact error into Claude and ask it to explain the cause in kid-friendly words.", "Ask Claude to fix it and add a tiny test or check that proves it works."],
    "success": "The error is gone and you can explain what caused it.",
    "features": ["Debugging", "Testing"]
  },
  {
    "id": 7, "icon": "🪄", "name": "Make Your Own Skill", "level": "Advanced", "levels": "5",
    "goal": "Package a job you repeat as a skill.",
    "steps": ["Create .claude/skills/cute-readme/SKILL.md (or ask Claude to create it).", "In it, describe how to write a README with a title emoji, a 'How to play' list and a 'Made by' line.", "Type /cute-readme in a project.", "Use the same skill in a second project."],
    "success": "/cute-readme produces the same style of README in two projects.",
    "features": ["Skills", "Slash commands"]
  },
  {
    "id": 8, "icon": "🪝", "name": "Hook It Up", "level": "Advanced", "levels": "5",
    "goal": "Make something happen automatically after Claude edits a file.",
    "steps": ["Type /hooks (or ask Claude to set up a hook in .claude/settings.json).", "Add a PostToolUse hook for file edits that runs a formatter such as Prettier, or simply echoes 'Edited!'.", "Ask Claude to change a file and watch the hook run."],
    "success": "The hook runs every time Claude edits a file, without you asking.",
    "features": ["Hooks", "Settings"]
  },
  {
    "id": 9, "icon": "👯", "name": "Team of Helpers", "level": "Advanced", "levels": "5",
    "goal": "Create a subagent with its own special job.",
    "steps": ["Run /agents and create a project subagent called kind-reviewer.", "Its job: review code and explain problems gently, in simple words, with one compliment first.", "Ask Claude: use the kind-reviewer subagent to review my game."],
    "success": "The review comes back in the kind-reviewer's friendly style.",
    "features": ["Subagents", "/agents"]
  },
  {
    "id": 10, "icon": "🔌", "name": "Plug In a Tool", "level": "Advanced", "levels": "5",
    "goal": "Connect Claude to an outside tool with MCP.",
    "steps": ["With a grown-up, pick an MCP server from the docs (for example a docs or browser server).", "Add it with claude mcp add, or a connector on claude.ai.", "Run /mcp to check it is connected.", "Ask Claude a question only that tool can answer."],
    "success": "/mcp shows the server connected and Claude uses it in an answer.",
    "features": ["MCP", "/mcp"]
  },
  {
    "id": 11, "icon": "🖼️", "name": "Show It Off", "level": "Advanced", "levels": "7",
    "goal": "Publish your work as a live artifact.",
    "steps": ["In a signed-in session (Pro, Max, Team or Enterprise), ask Claude to publish an artifact: a scoreboard page for your game with a chart of your best scores.", "Open the private link on claude.ai.", "Ask Claude to update it and watch the same link change."],
    "success": "You have a live artifact link that updates when Claude republishes.",
    "features": ["Artifacts"]
  },
  {
    "id": 12, "icon": "⏰", "name": "Robot Routine", "level": "Expert", "levels": "7",
    "goal": "Put Claude on autopilot with a scheduled routine.",
    "steps": ["Push your game to a GitHub repository.", "Run /schedule in the CLI, or go to claude.ai/code/routines.", "Create a weekly routine: every Monday, list TODO comments in the repo and write a short summary.", "Use 'run now' once to test it."],
    "success": "The routine runs on its own and you can read its results.",
    "features": ["Routines", "/schedule", "GitHub"]
  },
  {
    "id": 13, "icon": "🗂️", "name": "Project Boss", "level": "Expert", "levels": "7",
    "goal": "Let Claude coordinate several tasks at once in a Project.",
    "steps": ["Create a Project at claude.ai/code and add your game's repository.", "Set a project instruction such as 'keep everything kid-friendly'.", "Send 3 tasks in one message: add sound effects, add a dark mode, write a README.", "Watch the threads in Overview and review each pull request."],
    "success": "3 threads finish and you review 3 pull requests.",
    "features": ["Projects", "Threads", "Pull requests"]
  },
  {
    "id": 14, "icon": "🏆", "name": "Capstone: Game Jam", "level": "Expert", "levels": "1-9",
    "goal": "Build and share a complete game using at least 6 Claude Code features.",
    "steps": ["Choose a game idea and write CLAUDE.md rules for it.", "Plan it in plan mode, then build it in small steps with git commits.", "Use your own skill, a hook and a subagent review.", "Publish an artifact or share the repository, and present it to a friend or class."],
    "success": "A working game, at least 6 features used, and you can explain each one.",
    "features": ["CLAUDE.md", "Plan mode", "git", "Skills", "Hooks", "Subagents", "Artifacts"]
  }
];
