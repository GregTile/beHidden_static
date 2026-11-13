(() => {
  "use strict";

  // 1. Sticky Header & Mobile Navigation
  const header = document.querySelector(".site-header");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      mobileBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        mobileBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Interactive "How It Works" Switcher (Personal vs. Business)
  const protocolData = {
    personal: [
      {
        num: "01",
        title: "Tell Us What You Need",
        desc: "Reach out with what you'd like to buy, receive, or subscribe to. Share only as much detail as you're comfortable with to start."
      },
      {
        num: "02",
        title: "Agree on a Simple Plan",
        desc: "We reply personally, work out the best way to handle your request, and give you a clear total price upfront before anything is ordered."
      },
      {
        num: "03",
        title: "We Make the Purchase",
        desc: "We buy the item, set up the subscription, or receive the package at our address—so your name, card, and home address stay private."
      },
      {
        num: "04",
        title: "Sent Quietly to You",
        desc: "For physical items, we repackage and resend them to where you want them. For subscriptions or digital goods, we pass access directly to you."
      }
    ],
    business: [
      {
        num: "01",
        title: "Share Your Request",
        desc: "Let us know what product, sample, software, or subscription your company wants to purchase without alerting the seller."
      },
      {
        num: "02",
        title: "Straightforward Quote",
        desc: "We review the details and send a simple, transparent quote covering the purchase price, any shipping costs, and our service fee."
      },
      {
        num: "03",
        title: "We Act as the Buyer",
        desc: "We place the order directly with the vendor so your business name, company email domain, and payment cards never show up on their side."
      },
      {
        num: "04",
        title: "Reshipped or Delivered",
        desc: "Physical orders arrive with us first and are forwarded cleanly to your team. Digital tools or recurring subscriptions are handed over smoothly."
      }
    ]
  };

  const modeButtons = document.querySelectorAll("[data-protocol-mode]");
  const stepsContainer = document.getElementById("protocolSteps");

  function renderProtocol(mode) {
    if (!stepsContainer || !protocolData[mode]) return;
    stepsContainer.innerHTML = protocolData[mode]
      .map(
        (step) => `
        <article class="step-card">
          <div class="step-number">${step.num}</div>
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
        </article>
      `
      )
      .join("");
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-protocol-mode");
      modeButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
      renderProtocol(mode);
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".faq-trigger");
          const otherPanel = other.querySelector(".faq-panel");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.style.maxHeight = "0px";
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  if (faqItems.length > 0) {
    const firstTrigger = faqItems[0].querySelector(".faq-trigger");
    if (firstTrigger) firstTrigger.click();
  }

  // 4. Copy Email Button & Pre-Select Request Type
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = "Copied!";
      } catch {
        btn.textContent = "Select text";
      }
      setTimeout(() => {
        btn.textContent = original;
      }, 1800);
    });
  });

  document.querySelectorAll("[data-select-mandate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetValue = btn.getAttribute("data-select-mandate");
      const selectEl = document.getElementById("mandateType");
      if (selectEl && targetValue) {
        selectEl.value = targetValue;
      }
    });
  });

  // 5. Simple Request Form Handler
  const form = document.getElementById("mandateForm");
  const confirmation = document.getElementById("formConfirmation");
  const mailtoDispatch = document.getElementById("mailtoDispatch");

  if (form && confirmation) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("clientName")?.value.trim() || "Prospective Client";
      const contact = document.getElementById("clientContact")?.value.trim() || "";
      const requestType = document.getElementById("mandateType")?.value || "General Request";
      const details = document.getElementById("mandateBrief")?.value.trim() || "";

      const subject = encodeURIComponent(`beHidden Request — ${requestType}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
          `Reply To: ${contact}\n` +
          `Request Type: ${requestType}\n\n` +
          `How can we help?\n${details || "(Let's connect to discuss details)"}`
      );

      if (mailtoDispatch) {
        mailtoDispatch.setAttribute("href", `mailto:concierge@behidden.com?subject=${subject}&body=${body}`);
      }

      confirmation.classList.add("visible");
      confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // 6. Scroll Reveal Observer
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
