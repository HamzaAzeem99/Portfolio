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
        const roles = ["Front-End Developer ⚡", "Game Developer 🎮", "UI Designer 💻"];
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
                themeToggle.innerHTML = "☀️ <span>Light</span>";
            } else {
                themeToggle.innerHTML = "🌙 <span>Dark</span>";
            }
        }

        // Trigger Executions on Load
        document.addEventListener("DOMContentLoaded", () => {
            handleTypingEffect();
            setTimeout(initSkillsAnimation, 400);

            const savedTheme = localStorage.getItem("theme") || "dark";
            applyTheme(savedTheme);
        });