(function () {
  /** 구글 폼 공개 URL을 여기에 넣으면 커피챗 버튼이 새 탭으로 열립니다. 비워 두면 안내 토스트만 표시됩니다. */
  const COFFEE_CHAT_FORM_URL = "https://docs.google.com/spreadsheets/d/1EKYN61yooyI8cGYMU-6IvOsCkrXaNi70GLm7jRlg__k/edit?gid=0#gid=0";

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealElements() {
    if (prefersReduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((el) => observer.observe(el));
  }

  revealElements();

  const coffeeBtn = document.getElementById("coffee-chat-btn");
  const toast = document.getElementById("toast");

  if (coffeeBtn && COFFEE_CHAT_FORM_URL) {
    coffeeBtn.setAttribute("href", COFFEE_CHAT_FORM_URL);
    coffeeBtn.setAttribute("target", "_blank");
    coffeeBtn.setAttribute("rel", "noopener noreferrer");
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-show"));
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.classList.remove("is-show");
      window.setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2800);
  }

  if (coffeeBtn) {
    coffeeBtn.addEventListener("click", (e) => {
      const href = coffeeBtn.getAttribute("href");
      const unset = href === "#" || !href || href === "";
      if (unset) {
        e.preventDefault();
        showToast("구글 폼 링크 연결 후 이용할 수 있어요.");
      }
    });
  }
})();
