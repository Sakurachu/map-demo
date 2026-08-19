(function () {
    "use strict";

    var originalTitle = document.title;
    var titleRestoreTimer = null;

    document.addEventListener("visibilitychange", function () {
        window.clearTimeout(titleRestoreTimer);

        if (document.hidden) {
            document.title = "有需要再来找我哦～ (｡•́︿•̀｡)";
            return
        }

        document.title = "欢迎回来～ (๑•̀ㅂ•́)و✧";
        titleRestoreTimer = window.setTimeout(function () {
            if (!document.hidden) {
                document.title = originalTitle
            }
        }, 1200)
    });

    var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || !document.body) {
        return
    }

    var ring = document.createElement("div");
    var dot = document.createElement("div");
    var glow = document.createElement("div");

    ring.className = "sakura-cursor-ring is-hidden";
    dot.className = "sakura-cursor-dot is-hidden";
    glow.className = "sakura-cursor-glow is-hidden";
    ring.setAttribute("aria-hidden", "true");
    dot.setAttribute("aria-hidden", "true");
    glow.setAttribute("aria-hidden", "true");

    document.body.appendChild(glow);
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.documentElement.classList.add("sakura-cursor-enabled");
    if (reduceMotion) {
        document.documentElement.classList.add("sakura-cursor-reduced")
    }

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var ringX = mouseX;
    var ringY = mouseY;
    var glowX = mouseX;
    var glowY = mouseY;
    var lastParticleAt = 0;
    var animationFrameId = null;
    var hasMoved = false;

    function createParticle(x, y) {
        if (reduceMotion) {
            return
        }

        var particle = document.createElement("span");
        particle.className = "sakura-cursor-particle";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.setProperty("--particle-x", (Math.random() * 18 - 9) + "px");
        particle.style.setProperty("--particle-y", (Math.random() * 18 - 9) + "px");
        document.body.appendChild(particle);

        window.setTimeout(function () {
            particle.remove()
        }, 550)
    }

    function createClickEffect(x, y) {
        if (reduceMotion) {
            return
        }

        var ripple = document.createElement("span");
        var star = document.createElement("span");

        ripple.className = "sakura-click-ripple";
        star.className = "sakura-click-star";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        star.style.left = x + "px";
        star.style.top = y + "px";
        star.textContent = "✦";
        document.body.appendChild(ripple);
        document.body.appendChild(star);

        window.setTimeout(function () {
            ripple.remove();
            star.remove()
        }, 700)
    }

    function renderCursor() {
        if (reduceMotion) {
            ringX = mouseX;
            ringY = mouseY
        } else {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08
        }

        ring.style.transform = "translate3d(" + (ringX - 20) + "px," + (ringY - 20) + "px,0)";
        if (!reduceMotion) {
            glow.style.transform = "translate3d(" + (glowX - 110) + "px," + (glowY - 110) + "px,0)"
        }
        animationFrameId = window.requestAnimationFrame(renderCursor)
    }

    window.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.transform = "translate3d(" + (mouseX - 4) + "px," + (mouseY - 4) + "px,0)";

        if (!hasMoved) {
            hasMoved = true;
            ring.classList.remove("is-hidden");
            dot.classList.remove("is-hidden");
            glow.classList.remove("is-hidden")
        }

        var now = Date.now();
        if (now - lastParticleAt > 55) {
            createParticle(mouseX, mouseY);
            lastParticleAt = now
        }
    }, { passive: true });

    window.addEventListener("mouseover", function (event) {
        var target = event.target;
        var isInteractive = target && target.closest && target.closest("a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1']), .interactive, .xe-widget");
        ring.classList.toggle("is-hovering", Boolean(isInteractive))
    }, { passive: true });

    window.addEventListener("mousedown", function () {
        ring.classList.add("is-clicking");
        dot.classList.add("is-clicking")
    });

    window.addEventListener("mouseup", function () {
        ring.classList.remove("is-clicking");
        dot.classList.remove("is-clicking")
    });

    window.addEventListener("click", function (event) {
        createClickEffect(event.clientX, event.clientY)
    });

    document.addEventListener("mouseleave", function () {
        ring.classList.add("is-hidden");
        dot.classList.add("is-hidden");
        glow.classList.add("is-hidden")
    });

    document.addEventListener("mouseenter", function () {
        if (hasMoved) {
            ring.classList.remove("is-hidden");
            dot.classList.remove("is-hidden");
            glow.classList.remove("is-hidden")
        }
    });

    animationFrameId = window.requestAnimationFrame(renderCursor);

    window.addEventListener("pagehide", function () {
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId)
        }
    })
}());
