/* Claude Code Quest - tiny game engine shared by every level.
   No frameworks: each level page loads this file and calls CCQ.runLevel(). */
(function () {
  "use strict";

  var STORE_KEY = "ccq-progress-v1";

  var LEVELS = [
    { id: "l1", file: "level1-meet-claude.html", emoji: "👋", color: "c-peach", title: "Meet Claude Code", blurb: "What is this helpful coding buddy?" },
    { id: "l2", file: "level2-playgrounds.html", emoji: "🗺️", color: "c-sky", title: "Pick a Playground", blurb: "Terminal, VS Code, JetBrains, Desktop, Web..." },
    { id: "l3", file: "level3-install-quest.html", emoji: "🧰", color: "c-mint", title: "Install Quest", blurb: "Type real commands in a pretend terminal." },
    { id: "l4", file: "level4-prompt-chef.html", emoji: "🧑‍🍳", color: "c-lemon", title: "Prompt Chef", blurb: "Cook up clear instructions for Claude." },
    { id: "l5", file: "level5-power-ups.html", emoji: "🧩", color: "c-lilac", title: "Power-Up Memory", blurb: "CLAUDE.md, skills, hooks, subagents, MCP, plugins." },
    { id: "l6", file: "level6-safety-shield.html", emoji: "🛡️", color: "c-pink", title: "Safety Shield", blurb: "Permissions, plan mode and rewinding time." },
    { id: "l7", file: "level7-claude-everywhere.html", emoji: "🚀", color: "c-sky", title: "Claude Everywhere", blurb: "Projects, artifacts, routines and more." },
    { id: "l8", file: "level8-what-can-we-build.html", emoji: "🏗️", color: "c-mint", title: "What Can We Build?", blurb: "Web apps, games, AI agents and beyond." },
    { id: "l9", file: "level9-boss.html", emoji: "👑", color: "c-peach", title: "Boss Level", blurb: "Beat the final quiz and earn your badge!" }
  ];

  /* ---------- storage (safe if blocked) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function save(p) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) { /* private mode: ignore */ }
  }
  function setStars(id, stars) {
    var p = load();
    if (!p[id] || p[id] < stars) p[id] = stars;
    save(p);
  }
  function totalStars() {
    var p = load(), t = 0;
    LEVELS.forEach(function (l) { t += p[l.id] || 0; });
    return t;
  }
  function isUnlocked(i) {
    var p = load();
    if (p.unlockAll) return true;
    return i === 0 || !!p[LEVELS[i - 1].id];
  }

  /* ---------- tiny DOM helpers ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.indexOf("on") === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* ---------- mascot: "Sparky", a cute coding star ---------- */
  var MASCOT =
    '<svg viewBox="0 0 120 120" aria-hidden="true">' +
    '<path d="M60 6 L74 40 L112 44 L83 68 L92 106 L60 86 L28 106 L37 68 L8 44 L46 40 Z" fill="#ff9a76" stroke="#3d2c4e" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="48" cy="60" r="6" fill="#3d2c4e"/><circle cx="72" cy="60" r="6" fill="#3d2c4e"/>' +
    '<circle cx="50" cy="58" r="2" fill="#fff"/><circle cx="74" cy="58" r="2" fill="#fff"/>' +
    '<ellipse cx="40" cy="72" rx="6" ry="4" fill="#ffb7c9"/><ellipse cx="80" cy="72" rx="6" ry="4" fill="#ffb7c9"/>' +
    '<path d="M52 72 Q60 80 68 72" fill="none" stroke="#3d2c4e" stroke-width="4" stroke-linecap="round"/>' +
    '<text x="60" y="34" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#3d2c4e">&lt;/&gt;</text>' +
    '</svg>';

  function topbar(root) {
    var bar = el("header", { class: "topbar wrap" }, [
      el("a", { class: "logo", href: root + "index.html", html: MASCOT + "<span>Claude Code Quest</span>" }),
      el("span", { class: "star-count", id: "starCount", text: "⭐ " + totalStars() + " / " + LEVELS.length * 3 })
    ]);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function say(text) {
    return el("div", { class: "speech" }, [
      el("span", { html: MASCOT }),
      el("div", { class: "bubble", html: text })
    ]);
  }

  /* ---------- confetti + win screen ---------- */
  function confetti() {
    var colors = ["#ff9a76", "#ffb7c9", "#a8e6cf", "#a0d8f1", "#ffe48a", "#cdb4ff"];
    for (var i = 0; i < 70; i++) {
      var c = el("div", { class: "confetti" });
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.8 + Math.random() * 1.8 + "s";
      c.style.animationDelay = Math.random() * 0.5 + "s";
      document.body.appendChild(c);
      setTimeout(function (n) { return function () { n.remove(); }; }(c), 4200);
    }
  }

  function win(level, stars, note) {
    setStars(level.id, stars);
    var sc = document.getElementById("starCount");
    if (sc) sc.textContent = "⭐ " + totalStars() + " / " + LEVELS.length * 3;
    var idx = LEVELS.indexOf(level);
    var next = LEVELS[idx + 1];
    var starStr = "★★★".slice(0, stars) + "☆☆☆".slice(0, 3 - stars);
    var box = el("div", { class: "win-box" }, [
      el("div", { class: "mascot", html: MASCOT }),
      el("h2", { text: stars === 3 ? "Perfect!" : stars === 2 ? "Great job!" : "You did it!" }),
      el("div", { class: "big-stars", text: starStr }),
      el("p", { html: note || "" }),
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn sky", text: "Close", onclick: function () { ov.remove(); } }),
        el("button", { class: "btn ghost", text: "Play again", onclick: function () { location.reload(); } }),
        next
          ? el("a", { class: "btn mint", href: next.file, text: "Next level ➜" })
          : el("a", { class: "btn mint", href: "../challenges.html", text: "Try the challenges ➜" })
      ])
    ]);
    var ov = el("div", { class: "overlay show", role: "dialog", "aria-modal": "true" }, [box]);
    document.body.appendChild(ov);
    confetti();
  }

  /* ---------- STORY: learn slides ---------- */
  function story(host, slides, done) {
    var i = 0;
    var panel = el("div", { class: "panel story" });
    host.appendChild(panel);
    function draw() {
      var s = slides[i];
      panel.innerHTML = "";
      panel.appendChild(el("div", { class: "emoji-big", text: s.emoji || "✨" }));
      panel.appendChild(el("h2", { text: s.title }));
      panel.appendChild(el("div", { html: s.body }));
      var dots = el("div", { class: "dots" });
      slides.forEach(function (_, k) { dots.appendChild(el("span", { class: k === i ? "on" : "" })); });
      panel.appendChild(dots);
      panel.appendChild(el("div", { class: "btn-row" }, [
        i > 0 ? el("button", { class: "btn ghost", text: "⟵ Back", onclick: function () { i--; draw(); } }) : null,
        i < slides.length - 1
          ? el("button", { class: "btn", text: "Next ⟶", onclick: function () { i++; draw(); } })
          : el("button", { class: "btn mint", text: "Let's play! 🎮", onclick: function () { panel.remove(); done(); } })
      ]));
    }
    draw();
  }

  /* ---------- QUIZ: multiple choice with hearts ---------- */
  function quiz(host, questions, done) {
    var qs = shuffle(questions), i = 0, right = 0, hearts = 3;
    var panel = el("div", { class: "panel" });
    host.appendChild(panel);
    function draw() {
      if (i >= qs.length || hearts === 0) return done({ right: right, total: qs.length, hearts: hearts });
      var q = qs[i];
      panel.innerHTML = "";
      var bar = el("div", { class: "progress-bar" }, [el("div")]);
      bar.firstChild.style.width = (i / qs.length) * 100 + "%";
      panel.appendChild(bar);
      panel.appendChild(el("div", { class: "hearts", text: "❤️".repeat(hearts) + "🤍".repeat(3 - hearts) + "  Question " + (i + 1) + "/" + qs.length }));
      panel.appendChild(el("div", { class: "quiz-q", html: q.q }));
      var box = el("div", { class: "choices" });
      var fb = el("div", { class: "feedback" });
      var opts = shuffle(q.choices.map(function (c, k) { return { t: c, ok: k === q.answer }; }));
      opts.forEach(function (o) {
        box.appendChild(el("button", {
          class: "choice", html: o.t, onclick: function (ev) {
            var all = box.querySelectorAll("button");
            all.forEach(function (b) { b.disabled = true; });
            if (o.ok) { ev.currentTarget.classList.add("right"); right++; fb.className = "feedback show good"; fb.innerHTML = "✅ Yes! " + (q.why || ""); }
            else {
              ev.currentTarget.classList.add("wrong"); hearts--;
              all.forEach(function (b, k) { if (opts[k].ok) b.classList.add("right"); });
              fb.className = "feedback show bad"; fb.innerHTML = "💡 Not quite. " + (q.why || "");
            }
            panel.appendChild(el("div", { class: "btn-row" }, [
              el("button", { class: "btn", text: hearts === 0 ? "See result" : "Next ⟶", onclick: function () { i++; draw(); } })
            ]));
          }
        }));
      });
      panel.appendChild(box);
      panel.appendChild(fb);
    }
    draw();
  }

  /* ---------- MATCH: click a left tile then its partner ---------- */
  function match(host, pairs, done, labels) {
    var mistakes = 0, found = 0, picked = null;
    var panel = el("div", { class: "panel" });
    var left = el("div", { class: "match-col" }, [el("h3", { text: (labels && labels[0]) || "Thing" })]);
    var right = el("div", { class: "match-col" }, [el("h3", { text: (labels && labels[1]) || "What it does" })]);
    var status = el("p", { class: "mission", text: "Tap a tile on the left, then its partner on the right." });
    panel.appendChild(status);
    panel.appendChild(el("div", { class: "match-grid" }, [left, right]));
    host.appendChild(panel);
    shuffle(pairs.map(function (p, k) { return { k: k, t: p[0] }; })).forEach(function (o) {
      var b = el("button", { class: "tile", html: o.t, onclick: function () {
        if (b.classList.contains("done")) return;
        left.querySelectorAll(".tile").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel"); picked = { k: o.k, b: b };
      } });
      left.appendChild(b);
    });
    shuffle(pairs.map(function (p, k) { return { k: k, t: p[1] }; })).forEach(function (o) {
      var b = el("button", { class: "tile", html: o.t, onclick: function () {
        if (!picked || b.classList.contains("done")) return;
        if (picked.k === o.k) {
          b.classList.add("done"); picked.b.classList.remove("sel"); picked.b.classList.add("done");
          picked = null; found++;
          status.textContent = "Matched " + found + " of " + pairs.length + "!";
          if (found === pairs.length) setTimeout(function () { done({ mistakes: mistakes }); }, 400);
        } else {
          mistakes++; b.classList.add("oops");
          setTimeout(function () { b.classList.remove("oops"); }, 400);
        }
      } });
      right.appendChild(b);
    });
  }

  /* ---------- MEMORY: flip cards to find term/meaning pairs ---------- */
  function memory(host, pairs, done) {
    var cards = [];
    pairs.forEach(function (p, k) { cards.push({ k: k, t: p[0] }); cards.push({ k: k, t: p[1] }); });
    cards = shuffle(cards);
    var open = [], moves = 0, found = 0, lock = false;
    var panel = el("div", { class: "panel" });
    var status = el("p", { class: "mission", text: "Flip two cards. Find each power-up and what it does!" });
    var grid = el("div", { class: "memory" });
    panel.appendChild(status); panel.appendChild(grid); host.appendChild(panel);
    cards.forEach(function (c) {
      var b = el("button", { class: "mcard", "aria-label": "card" }, [
        el("div", { class: "inner" }, [el("div", { class: "face front", text: "❓" }), el("div", { class: "face back", html: c.t })])
      ]);
      b.addEventListener("click", function () {
        if (lock || b.classList.contains("flip") || b.classList.contains("matched")) return;
        b.classList.add("flip"); open.push({ c: c, b: b });
        if (open.length === 2) {
          moves++; lock = true;
          var a = open[0], z = open[1];
          if (a.c.k === z.c.k) {
            a.b.classList.add("matched"); z.b.classList.add("matched"); found++; open = []; lock = false;
            status.textContent = "Pairs found: " + found + "/" + pairs.length + "  •  Moves: " + moves;
            if (found === pairs.length) setTimeout(function () { done({ moves: moves }); }, 500);
          } else {
            setTimeout(function () { a.b.classList.remove("flip"); z.b.classList.remove("flip"); open = []; lock = false; }, 900);
            status.textContent = "Pairs found: " + found + "/" + pairs.length + "  •  Moves: " + moves;
          }
        }
      });
      grid.appendChild(b);
    });
  }

  /* ---------- TERMINAL: type the right command for each mission ---------- */
  function terminal(host, missions, done) {
    var i = 0, hints = 0, tries = 0;
    var mission = el("p", { class: "mission" });
    var log = el("div", { class: "log" });
    var input = el("input", { "aria-label": "Type a command", autocomplete: "off", spellcheck: "false", placeholder: "type here and press Enter" });
    var hintBtn = el("button", { class: "btn sky", type: "button", text: "💡 Hint" });
    var form = el("form", {}, [el("span", { text: "$" }), input]);
    var term = el("div", { class: "terminal" }, [
      el("div", { class: "bar" }, [el("i", { style: "background:#ff6b81" }), el("i", { style: "background:#ffe48a" }), el("i", { style: "background:#a8e6cf" })]),
      log, form
    ]);
    host.appendChild(el("div", { class: "panel" }, [mission, term, el("div", { class: "btn-row" }, [hintBtn])]));
    function line(text, cls) { log.appendChild(el("div", { class: cls || "", text: text })); term.scrollTop = term.scrollHeight; }
    function show() {
      var m = missions[i];
      mission.innerHTML = "Mission " + (i + 1) + "/" + missions.length + ": " + m.task;
      form.firstChild.textContent = m.prompt || "$";
      tries = 0;
      input.focus();
    }
    function norm(s) { return s.trim().replace(/\s+/g, " ").toLowerCase(); }
    hintBtn.addEventListener("click", function () { hints++; line("hint: " + missions[i].hint, "hint"); input.focus(); });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var m = missions[i], typed = input.value;
      if (!typed.trim()) return;
      line((m.prompt || "$") + " " + typed);
      input.value = "";
      var ok = m.accept.some(function (a) { return a instanceof RegExp ? a.test(typed.trim()) : norm(a) === norm(typed); });
      if (ok) {
        (m.reply || []).forEach(function (r) { line(r, "claude"); });
        line("✔ mission complete!", "ok");
        i++;
        if (i === missions.length) { input.disabled = true; setTimeout(function () { done({ hints: hints }); }, 700); }
        else show();
      } else {
        tries++;
        line("✘ " + (m.oops || "Hmm, that's not it. Try again!"), "err");
        if (tries >= 2) line("hint: " + m.hint, "hint");
      }
    });
    show();
  }

  /* ---------- SORT: tap a chip, then tap the right bin ---------- */
  function sort(host, bins, items, done) {
    var mistakes = 0, left = items.length, sel = null;
    var panel = el("div", { class: "panel" });
    var status = el("p", { class: "mission", text: "Tap a bubble, then tap the box where it belongs." });
    var pool = el("div", { class: "pool" });
    var binWrap = el("div", { class: "bins" });
    panel.appendChild(status); panel.appendChild(pool); panel.appendChild(binWrap); host.appendChild(panel);
    shuffle(items).forEach(function (it) {
      var c = el("button", { class: "chip", html: it.t, onclick: function () {
        pool.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("sel"); });
        c.classList.add("sel"); sel = { it: it, c: c };
      } });
      pool.appendChild(c);
    });
    bins.forEach(function (b, k) {
      var bin = el("div", { class: "bin", role: "button", tabindex: "0" }, [el("h4", { html: b })]);
      function drop() {
        if (!sel) return;
        if (sel.it.bin === k) {
          sel.c.classList.remove("sel"); sel.c.classList.add("good"); sel.c.disabled = true;
          bin.appendChild(sel.c); sel = null; left--;
          status.textContent = left ? left + " left to sort!" : "All sorted!";
          if (!left) setTimeout(function () { done({ mistakes: mistakes }); }, 500);
        } else {
          mistakes++; sel.c.classList.add("oops");
          status.textContent = "Oops! " + (sel.it.why || "Try another box.");
          var cc = sel.c; setTimeout(function () { cc.classList.remove("oops"); }, 400);
        }
      }
      bin.addEventListener("click", drop);
      bin.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); drop(); } });
      binWrap.appendChild(bin);
    });
  }

  /* ---------- BUILDER: pick ingredients for a great prompt ---------- */
  function builder(host, rounds, done) {
    var r = 0, mistakes = 0;
    var panel = el("div", { class: "panel" });
    host.appendChild(panel);
    function draw() {
      if (r >= rounds.length) return done({ mistakes: mistakes });
      var R = rounds[r], chosen = [];
      panel.innerHTML = "";
      panel.appendChild(el("p", { class: "mission", html: "Order " + (r + 1) + "/" + rounds.length + ": " + R.task }));
      var slot = el("div", { class: "builder-slot" }, [el("span", { style: "color:var(--ink-soft)", text: "Your prompt bowl 🥣" })]);
      var pool = el("div", { class: "pool", style: "margin:12px 0" });
      var fb = el("div", { class: "feedback" });
      shuffle(R.pieces).forEach(function (p) {
        var c = el("button", { class: "chip", text: p.t, onclick: function () {
          var at = chosen.indexOf(p);
          if (at === -1) { chosen.push(p); slot.appendChild(c); c.classList.add("sel"); }
          else { chosen.splice(at, 1); pool.appendChild(c); c.classList.remove("sel"); }
        } });
        pool.appendChild(c);
      });
      panel.appendChild(slot); panel.appendChild(pool);
      panel.appendChild(el("div", { class: "btn-row" }, [el("button", { class: "btn mint", text: "Serve to Claude 🍽️", onclick: function () {
        var need = R.pieces.filter(function (p) { return p.good; });
        var missing = need.filter(function (p) { return chosen.indexOf(p) === -1; });
        var bad = chosen.filter(function (p) { return !p.good; });
        if (!missing.length && !bad.length) {
          fb.className = "feedback show good"; fb.innerHTML = "😋 Delicious prompt! " + R.why;
          panel.querySelector(".btn-row").innerHTML = "";
          panel.appendChild(el("div", { class: "btn-row" }, [el("button", { class: "btn", text: "Next order ⟶", onclick: function () { r++; draw(); } })]));
        } else {
          mistakes++;
          fb.className = "feedback show bad";
          fb.innerHTML = bad.length
            ? "🤢 Yuck, remove: <b>" + bad.map(function (b) { return b.t; }).join("</b>, <b>") + "</b>. " + (bad[0].why || "")
            : "🧂 Something is missing. You still need " + missing.length + " more ingredient" + (missing.length > 1 ? "s" : "") + ".";
        }
      } })]));
      panel.appendChild(fb);
    }
    draw();
  }

  /* ---------- level runner ---------- */
  function stars3(bad, ok1, ok2) { return bad <= ok1 ? 3 : bad <= ok2 ? 2 : 1; }

  function runLevel(cfg) {
    topbar("../");
    var level = LEVELS.filter(function (l) { return l.id === cfg.id; })[0];
    var host = document.getElementById("game");
    var head = el("div", { class: "hero" }, [
      el("div", { class: "num", style: "font-weight:800;color:var(--ink-soft)", text: "LEVEL " + (LEVELS.indexOf(level) + 1) }),
      el("h1", { html: level.emoji + " " + level.title })
    ]);
    host.appendChild(head);
    if (cfg.intro) host.appendChild(el("div", { class: "panel" }, [say(cfg.intro)]));
    story(host, cfg.story, function () {
      cfg.play(host, function (stars, note) { win(level, stars, note); });
    });
  }

  window.CCQ = {
    LEVELS: LEVELS, load: load, save: save, totalStars: totalStars, isUnlocked: isUnlocked,
    el: el, say: say, MASCOT: MASCOT, topbar: topbar, confetti: confetti, stars3: stars3,
    story: story, quiz: quiz, match: match, memory: memory, terminal: terminal, sort: sort, builder: builder,
    runLevel: runLevel
  };
})();
