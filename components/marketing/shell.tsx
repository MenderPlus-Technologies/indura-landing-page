"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.indura.mobile";
const WHATSAPP_CHAT =
  "https://wa.me/2349133293575?text=Hello%20Indura%20Health%2C%20I%27d%20like%20to%20know%20more.";
const LHF_COMMUNITY = "https://chat.whatsapp.com/Lsjqoob7vUrCs8COdwmu0d";

const TOP_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/programmes", label: "Programmes" },
  { href: "/lhf", label: "Learn Health Financing" },
];

const COMPANY_LINKS = [
  { href: "/about", title: "About", detail: "Our story and the team" },
  { href: "/impact", title: "Impact", detail: "Our work towards the SDGs" },
  { href: "/insights", title: "Insights", detail: "Articles and LHF Notes" },
  { href: "/press", title: "Press and media", detail: "Media kit and brand assets" },
  { href: "/faq", title: "FAQ", detail: "Answers to common questions" },
  { href: "/contact", title: "Contact", detail: "Talk to our team" },
];

function currentTheme(): "light" | "dark" {
  const stored = document.documentElement.getAttribute("data-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const moreRef = useRef<HTMLLIElement>(null);
  const waRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const year = new Date().getFullYear();
  const companyCurrent = COMPANY_LINKS.some((link) => link.href === pathname);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
    setWaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const paint = () => setTheme(currentTheme());
    paint();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", paint);
    return () => media.removeEventListener("change", paint);
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (moreRef.current && !moreRef.current.contains(target)) setMoreOpen(false);
      if (waRef.current && !waRef.current.contains(target)) setWaOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMoreOpen(false);
      setWaOpen(false);
      setMenuOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const main = document.getElementById("marketing-main");
    if (!main) return;

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element) || !main.contains(target)) return;
      const anchor = target.closest("a");
      if (!anchor || !main.contains(anchor) || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      event.preventDefault();
      router.push(href);
    }

    main.addEventListener("click", onClick);
    return () => main.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    const form = document.getElementById("contactForm");
    const mail = document.getElementById("cf-mail");
    if (!(form instanceof HTMLFormElement)) return;

    const buttons = [form.querySelector('button[type="submit"]'), mail].filter(
      (button): button is HTMLButtonElement => button instanceof HTMLButtonElement,
    );
    let sending = false;

    function body() {
      const name = document.getElementById("cf-name");
      const email = document.getElementById("cf-email");
      const role = document.getElementById("cf-role");
      const message = document.getElementById("cf-msg");
      const out = document.getElementById("cf-out");
      if (
        !(name instanceof HTMLInputElement) ||
        !(email instanceof HTMLInputElement) ||
        !(role instanceof HTMLSelectElement) ||
        !(message instanceof HTMLTextAreaElement) ||
        !out
      ) {
        return null;
      }
      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const messageValue = message.value.trim();
      if (!nameValue || !emailValue || !messageValue) {
        out.textContent = "Please add your name, email, and message.";
        return null;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        out.textContent = "Please enter a valid email address.";
        return null;
      }
      return {
        name: nameValue,
        email: emailValue,
        role: role.value,
        message: messageValue,
        text: `Name: ${nameValue}\nEmail: ${emailValue}\nI am: ${role.value}\n\n${messageValue}`,
        out,
      };
    }

    async function sendToInbox(
      result: NonNullable<ReturnType<typeof body>>,
    ) {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: result.name,
          email: result.email,
          role: result.role,
          message: result.message,
        }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || "Failed to send email");
      }
    }

    async function onSubmit(event: Event) {
      event.preventDefault();
      if (sending) return;
      const result = body();
      if (!result) return;
      sending = true;
      buttons.forEach((button) => {
        button.disabled = true;
      });
      result.out.textContent = "Sending your message…";
      let emailed = false;
      try {
        await sendToInbox(result);
        emailed = true;
      } catch {
        emailed = false;
      }
      window.open(
        `https://wa.me/2349133293575?text=${encodeURIComponent(`Hello Indura Health,\n\n${result.text}`)}`,
        "_blank",
        "noopener",
      );
      result.out.textContent = emailed
        ? "Your message is in our inbox, and WhatsApp has opened so you can send it there too."
        : "We couldn't email the team just now. WhatsApp has opened so you can send the message there.";
      sending = false;
      buttons.forEach((button) => {
        button.disabled = false;
      });
    }

    async function onMail() {
      if (sending) return;
      const result = body();
      if (!result) return;
      sending = true;
      buttons.forEach((button) => {
        button.disabled = true;
      });
      result.out.textContent = "Sending your message…";
      try {
        await sendToInbox(result);
        result.out.textContent =
          "Your message is on its way to hello@menderplus.com. We'll be in touch.";
      } catch {
        result.out.textContent =
          "We couldn't send that just now. Please email hello@menderplus.com directly.";
      } finally {
        sending = false;
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }
    }

    form.addEventListener("submit", onSubmit);
    mail?.addEventListener("click", onMail);
    return () => {
      form.removeEventListener("submit", onSubmit);
      mail?.removeEventListener("click", onMail);
    };
  }, [pathname]);

  useEffect(() => {
    const wrap = document.getElementById("slides");
    const dots = document.getElementById("dots");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    if (!wrap || !dots || !prev || !next) return;

    const slides = Array.from(wrap.querySelectorAll<HTMLElement>(":scope > .slide"));
    if (!slides.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const buttons: HTMLButtonElement[] = [];

    function show(index: number) {
      cur = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === cur;
        slide.classList.toggle("on", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      buttons.forEach((button, buttonIndex) => {
        if (buttonIndex === cur) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
      wrap.classList.toggle("on-dark", slides[cur].classList.contains("s-lhf"));
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = null;
      if (!reduce) timer = setInterval(() => show(cur + 1), 6000);
    }

    function pause() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Go to slide ${index + 1}`);
      button.addEventListener("click", () => {
        show(index);
        restart();
      });
      dots.appendChild(button);
      buttons.push(button);
    });

    function onPrev() {
      show(cur - 1);
      restart();
    }
    function onNext() {
      show(cur + 1);
      restart();
    }

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    wrap.addEventListener("mouseenter", pause);
    wrap.addEventListener("mouseleave", restart);
    wrap.addEventListener("focusin", pause);
    show(0);
    restart();

    return () => {
      pause();
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", restart);
      wrap.removeEventListener("focusin", pause);
      buttons.forEach((button) => button.remove());
    };
  }, [pathname]);

  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("indura-theme", next);
    } catch {
      /* storage can be blocked */
    }
    setTheme(next);
  }

  const dark = theme === "dark";

  return (
    <div className="mkt">
      <div className="blobs" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="nav-shell">
        <div className="wrap">
          <nav className="nav glass" aria-label="Main">
            <Link className="brand" href="/">
              <img src="/images/img-01-fbcfb9e3.jpg" alt="" />
              Indura Health
            </Link>
            <ul className={`links${menuOpen ? " open" : ""}`} id="links">
              {TOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li
                className={`has-sub${moreOpen ? " open" : ""}`}
                id="more"
                ref={moreRef}
              >
                <button
                  className={`sub-btn${companyCurrent ? " cur" : ""}`}
                  id="moreBtn"
                  type="button"
                  aria-expanded={moreOpen}
                  aria-controls="moreMenu"
                  onClick={() => setMoreOpen((open) => !open)}
                >
                  Company
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="sub" id="moreMenu">
                  {COMPANY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={() => setMoreOpen(false)}
                    >
                      <b>{link.title}</b>
                      <span>{link.detail}</span>
                    </Link>
                  ))}
                </div>
              </li>
              <li className="menu-cta">
                <a
                  className="btn btn-primary"
                  href={PLAY_STORE}
                  target="_blank"
                  rel="noopener"
                >
                  Get the app
                </a>
              </li>
            </ul>
            <div className="nav-actions">
              <button
                className="theme-btn"
                type="button"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <a className="btn btn-primary" href={PLAY_STORE} target="_blank" rel="noopener">
                Get the app
              </a>
              <button
                className="menu-btn"
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="links"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <main id="marketing-main">{children}</main>

      <div className={`wa${waOpen ? " open" : ""}`} id="wa" ref={waRef}>
        <div className="wa-menu" id="waMenu" role="menu">
          <a role="menuitem" href={WHATSAPP_CHAT} target="_blank" rel="noopener">
            <b>Chat with Indura</b>
            <span>Questions about the app, providers or programmes</span>
          </a>
          <a role="menuitem" href={LHF_COMMUNITY} target="_blank" rel="noopener">
            <b>Join the LHF community</b>
            <span>Learn Health Financing on WhatsApp</span>
          </a>
        </div>
        <button
          className="wa-btn"
          type="button"
          aria-expanded={waOpen}
          aria-controls="waMenu"
          onClick={() => setWaOpen((open) => !open)}
        >
          <img src="/images/img-23-3ec61c68.png" alt="" width={34} height={34} />
          <span className="wa-label">WhatsApp</span>
        </button>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="stack" style={{ gap: 10 }}>
              <Link className="brand" href="/">
                <img src="/images/img-01-fbcfb9e3.jpg" alt="" />
                Indura Health
              </Link>
              <p className="small">
                The financial operating system for healthcare in Africa.
              </p>
              <div className="badges">
                <a href={PLAY_STORE} target="_blank" rel="noopener">
                  <img
                    src="/images/img-10-8828c7c1.png"
                    alt="Get it on Google Play"
                    style={{ height: 42 }}
                  />
                </a>
                <span className="badge-static">
                  <img
                    src="/images/img-11-96a1450d.png"
                    alt="Available on the App Store"
                    style={{ height: 42 }}
                  />
                </span>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/platform">Platform</Link></li>
                <li><Link href="/programmes">Programmes</Link></li>
                <li><Link href="/lhf">Learn Health Financing</Link></li>
                <li><Link href="/impact">Impact</Link></li>
                <li><Link href="/insights">Insights</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/press">Press and media</Link></li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/become-a-provider">Become a provider</Link></li>
                <li>
                  <a href={LHF_COMMUNITY} target="_blank" rel="noopener">
                    LHF community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <p className="legalline">
            © {year} Mender Plus Technologies Ltd, RC 8119350. Indura Health is a
            product of Mender Plus Technologies Ltd. Licensed with the Nigeria
            Data Protection Commission.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
