// Drawer Logic
        function toggleMenu() {
            const nav = document.getElementById("nav");
            const menuBtn = document.getElementById("menuBtn");
            nav.classList.toggle("active");
            menuBtn.classList.toggle("open");
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById("nav").classList.remove("active");
                document.getElementById("menuBtn").classList.remove("open");
            });
        });

        // Intersection / Scroll Link Tracking
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-links a");

        window.addEventListener("scroll", () => {
            let currentSectionId = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(currentSectionId)) {
                    link.classList.add("active");
                }
            });
        });

        // Automated Typewriter Engine
        const roles = ["MERN Stack Developer", "AI & Game Developer", "AI Ads & Film Maker"];
        let currentRoleIdx = 0;
        let currentCharIdx = 0;
        let isDeleting = false;
        const targetElement = document.getElementById("typewriter");
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const delayBetweenRoles = 2000;

        function handleTypingEffect() {
            const currentFullText = roles[currentRoleIdx];

            if (isDeleting) {
                targetElement.textContent = currentFullText.substring(0, currentCharIdx - 1);
                currentCharIdx--;
            } else {
                targetElement.textContent = currentFullText.substring(0, currentCharIdx + 1);
                currentCharIdx++;
            }

            if (!isDeleting && currentCharIdx === currentFullText.length) {
                setTimeout(() => isDeleting = true, delayBetweenRoles);
            } else if (isDeleting && currentCharIdx === 0) {
                isDeleting = false;
                currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            }

            setTimeout(handleTypingEffect, isDeleting ? erasingSpeed : typingSpeed);
        }

        // Skills Filler Progress Triggers
        function initSkillsAnimation() {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-progress');
                bar.style.width = targetWidth;
            });
        }

        // Dark/Light Local Persistence Logic
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = "dark";

            if (currentTheme === "dark" || !currentTheme) {
                targetTheme = "light";
            }
            applyTheme(targetTheme);
        }

        function applyTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);

            const themeText = document.getElementById("themeText");
            const themeToggle = document.getElementById("themeToggle");

            if (theme === "light") {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light</span>';
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark</span>';
            }
        }

        // Trigger Executions on Load
        document.addEventListener("DOMContentLoaded", () => {
            handleTypingEffect();
            setTimeout(initSkillsAnimation, 400);

            const savedTheme = localStorage.getItem("theme") || "dark";
            applyTheme(savedTheme);
        });
/* ===== Portfolio rendering (data lives in projects.js) ===== */
const $ = (s) => document.querySelector(s);
const ALL = [...P, ...V];
const thumb = (p) => p.poster || p.img || (p.live ? `https://image.thum.io/get/width/700/crop/440/${p.live}` : "");
const links = (p) => (p.live ? `<a class="pb" href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid ${p.type === "game" ? "fa-play" : "fa-arrow-up-right-from-square"}"></i>${p.type === "game" ? "Play" : "Live Demo"}</a>` : "") +
    (p.gh ? `<a class="pb alt" href="${p.gh}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i>GitHub</a>` : "");
const media = (p) => `<div class="th" style="${p.icon ? `background-image:url(${p.icon})` : ""}">${thumb(p) ? `<img loading="lazy" src="${thumb(p)}" alt="" onerror="${p.live && !p.img && !p.poster ? `this.onerror=function(){this.remove()};this.src='https://s0.wp.com/mshots/v1/${encodeURIComponent(p.live)}?w=700&h=440'` : "this.remove()"}">` : ""}</div>`;

function card(p, i) {
    const st = `style="--i:${i}"`;
    if (V.includes(p)) {
        return `<button class="card vc" ${st} data-id="${p.id}" aria-label="Play ${p.title}">${media(p)}${p.src ? `<video muted loop playsinline preload="none" src="${p.src}"></video>` : ""}<span class="pl"><i class="fa-solid fa-play"></i></span><span class="cap"><small>${TYPE[p.type]}</small><h3>${p.title}</h3></span></button>`;
    }
    const game = p.type === "game";
    return `<article class="card" ${st} data-id="${p.id}" tabindex="0" role="button" aria-label="Open ${p.title}">
        <span class="bd">${game ? '<i class="fa-solid fa-gamepad"></i>' : ""}${TYPE[p.type]}</span>${media(p)}${game ? `<span class="play"><i><i class="fa-solid fa-play"></i> PLAY</i></span>` : ""}
        <div class="cb"><h3>${p.title}</h3><p>${p.desc}</p><div class="tg">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div><div class="ln">${links(p)}</div></div></article>`;
}

// mount(grid, filterBar, list, filters[[label, predicate]], {featured})
function mount(gridId, barId, list, defs, opt = {}) {
    const grid = $(gridId), bar = barId && $(barId);
    let mode = opt.start || defs[0][0];
    const draw = () => {
        const def = defs.find((d) => d[0] === mode);
        const items = list.filter(def[1]);
        grid.innerHTML = items.length ? items.map(card).join("") : (opt.empty || "");
        if (bar) bar.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.f === mode));
        if (opt.onChange) opt.onChange(mode);
    };
    if (bar) {
        const live = defs.filter((d) => list.some(d[1]) || d[2]);
        bar.innerHTML = live.length > 1 ? live.map((d) => `<button data-f="${d[0]}">${d[0]}</button>`).join("") : "";
        bar.onclick = (e) => { const b = e.target.closest("button"); if (b) { mode = b.dataset.f; draw(); } };
    }
    draw();
    return (m) => { mode = m; draw(); };
}

const is = (t) => (p) => p.type === t;
const setAll = mount("#gAll", "#fAll", ALL, [
    ["Featured", (p) => p.feat, 1], ["All", () => true], ["Web Development", is("web")],
    ["MERN", (p) => (p.stack || []).includes("MERN")], ["Games", is("game")], ["AI", is("ai")],
    ["AI Ads", is("ad")], ["AI Films", is("film")]], {
    onChange: (m) => { const b = $("#moreBtn"); if (b) b.textContent = m === "Featured" ? "View All Projects →" : m === "All" ? "← Back to Featured" : "View All Projects →"; },
});
$("#moreBtn").onclick = () => setAll($("#fAll .on")?.dataset.f === "Featured" ? "All" : "Featured");

const stackHas = (k) => (p) => (p.stack || []).includes(k);
mount("#gWeb", "#fWeb", P.filter(is("web")), [["All", () => true], ["Web Apps", (p) => p.sub === "app"], ["UI Clones", (p) => p.sub === "ui"],
    ["MERN", stackHas("MERN")], ["React", stackHas("React")], ["Backend", stackHas("Backend")]]);
mount("#gGame", "#fGame", P.filter(is("game")), [["All Games", () => true], ["Web Games", (p) => (p.tags || []).includes("Web Games")],
    ["3D", (p) => (p.tags || []).includes("3D")], ["Scratch", (p) => (p.tags || []).includes("Scratch")], ["Roblox", (p) => (p.tags || []).includes("Roblox")]]);
mount("#gAI", null, P.filter(is("ai")), [["All", () => true]]);
mount("#gVid", "#fVid", V, [["All", () => true], ["AI Ads", is("ad")], ["AI Films", is("film")], ["Reels", is("reel")], ["Shorts", is("short")]], {
    empty: `<div class="empty"><i class="fa-solid fa-clapperboard"></i> The showreel is being put together.<br>Want a private preview of my AI ads and films? <a href="#contact">Get in touch</a>.</div>`,
});

// About + Skills (skills tied to real projects)
const cnt = (k) => P.filter((p) => p.tech.join(" ").toLowerCase().includes(k)).length;
$("#aboutGrid").innerHTML = [
    ["Build", "MERN stack and web development. Front-end apps, tools and UI builds.", "#web", `${P.filter(is("web")).length} web projects`],
    ["Create", "AI-generated ads, short films, reels and shorts.", "#films", `${V.length} videos`],
    ["Play", "Browser games and interactive experiences.", "#games", `${P.filter(is("game")).length} games`],
].map((a) => `<div class="panel"><h3>${a[0]}</h3><p>${a[1]}</p><a class="see" href="${a[2]}">${a[3]} →</a></div>`).join("");

const SK = [
    ["Development", "#web", ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Supabase"]],
    ["Tools", "#web", ["Git", "GitHub", "Postman", "Thunder Client", "Bootstrap"]],
    ["AI", "#ai", ["Teachable Machine", "AI Development", "AI Content Creation"]],
    ["Game Development", "#games", ["JavaScript Games", "Three.js", "Scratch", "Roblox Studio"]],
    ["Creative", "#films", ["AI Ads", "AI Films", "Reels", "Shorts", "Canva"]],
];
$("#skillGroups").innerHTML = SK.map(([n, href, list]) => `<div class="panel"><h3>${n}</h3><div class="chips">${list.map((s) => {
    const c = n === "Development" ? cnt(s.toLowerCase().split(".")[0]) : 0;
    return `<span class="chip">${s}${c ? `<b title="${c} projects">${c}</b>` : ""}</span>`;
}).join("")}</div><a class="see" href="${href}">See the work →</a></div>`).join("");

// Journey / Education (sections stay hidden until you add entries)
[["#journey", "#tlJ", JOURNEY], ["#education", "#tlE", EDU]].forEach(([s, t, d]) => {
    if (!d.length) return;
    $(s).hidden = false;
    $(t).innerHTML = d.map((e) => `<div><small>${e.when}</small><h3>${e.title}</h3><p>${e.where || ""} ${e.text || ""}</p></div>`).join("");
});

// Detail modal
const dlg = $("#dlg");
function player(v) {
    if (v.src) return `<video src="${v.src}" poster="${v.poster || ""}" controls autoplay playsinline></video>`;
    const y = (v.url || "").match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
    return y ? `<iframe src="https://www.youtube-nocookie.com/embed/${y[1]}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>` : media(v);
}
function openItem(id) {
    const p = ALL.find((x) => x.id === id);
    if (!p) return;
    const vid = V.includes(p);
    $("#dlgBody").innerHTML = (vid ? player(p) : `<div class="th" style="aspect-ratio:16/9;${p.icon ? `background-image:url(${p.icon})` : ""}">${thumb(p) ? `<img src="${thumb(p)}" alt="" onerror="this.remove()">` : ""}</div>`) +
        `<div class="dm"><small>${TYPE[p.type]}</small><h2>${p.title}</h2><div><h4>${vid ? "CONCEPT" : "OVERVIEW"}</h4><p>${p.desc}</p></div>
        <div><h4>${vid ? "AI TOOLS / WORKFLOW" : "TECHNOLOGIES"}</h4><div class="tg">${(vid ? p.tools || [] : p.tech).map((t) => `<span>${t}</span>`).join("")}</div></div>
        <div class="ln">${vid ? (p.url ? `<a class="pb" href="${p.url}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i>Watch on social</a>` : "") : links(p)}</div></div>`;
    dlg.showModal();
}
dlg.addEventListener("close", () => ($("#dlgBody").innerHTML = ""));
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
document.addEventListener("click", (e) => { const c = e.target.closest(".card[data-id]"); if (c && !e.target.closest("a")) openItem(c.dataset.id); });
document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches(".card[data-id]")) openItem(e.target.dataset.id); });

// Hover preview for local video files
document.addEventListener("mouseover", (e) => { const c = e.target.closest(".vc"), v = c && c.querySelector("video"); if (v) { c.classList.add("pv"); v.play().catch(() => {}); } });
document.addEventListener("mouseout", (e) => { const c = e.target.closest(".vc"), v = c && c.querySelector("video"); if (v && !c.contains(e.relatedTarget)) { c.classList.remove("pv"); v.pause(); } });

// Contact form: opens the visitor's mail app addressed to you (no backend needed)
$("#cForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    location.href = `mailto:muhammadhamzamuhammadazeem@gmail.com?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(f.get("message") + "\n\n" + f.get("name") + " (" + f.get("email") + ")")}`;
});