"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { transition } from "@/lib/motion";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

/** IA from SCOPE.md. Industry & Sector is a dropdown (Tech / Consumer). */
const NAV: NavItem[] = [
  { label: "Services", href: "/services-and-clients" },
  {
    label: "Industry & Sector",
    href: "/industry-sector",
    children: [
      { label: "Technology", href: "/industry-sector/industry-and-sector-tech" },
      { label: "Consumer", href: "/industry-sector/industry-sector-consumer" },
    ],
  },
  { label: "Insights", href: "/insights-news" },
  { label: "Team", href: "/career-and-team" },
];

const CTA = { label: "Get in touch", href: "/get-in-touch" };

const linkClass =
  "text-label font-semibold text-text-secondary transition-colors duration-(--dur-fast) ease-out hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange rounded-sm";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  );
}

/**
 * Desktop "Industry & Sector" dropdown. Opens on hover (pointer) and on
 * click/Enter/Space (keyboard); closes on outside click, blur out of the group,
 * and Escape (handled by the header). A single-key control with `aria-expanded`
 * + `aria-haspopup` over a `<ul>` of links.
 */
function NavDropdown({
  item,
  open,
  onOpenChange,
}: {
  item: NavItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const groupRef = useRef<HTMLLIElement>(null);

  // Close when a click lands outside the group. (Escape is handled by the
  // header; blur-out is handled on the group below.)
  useEffect(() => {
    if (!open) return;
    const onDocPointer = (e: PointerEvent) => {
      if (!groupRef.current?.contains(e.target as Node)) onOpenChange(false);
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [open, onOpenChange]);

  return (
    <li
      ref={groupRef}
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={(e) => {
        if (!groupRef.current?.contains(e.relatedTarget as Node))
          onOpenChange(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => onOpenChange(!open)}
        className={cn(linkClass, "inline-flex items-center gap-1")}
      >
        {item.label}
        <ChevronIcon
          className={cn(
            "transition-transform duration-(--dur-fast) ease-out",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={transition.fast}
            className="absolute left-0 top-full z-10 mt-3 min-w-48 overflow-hidden rounded-md border border-hairline bg-surface-1/95 p-1.5 shadow-xl backdrop-blur"
          >
            {item.children!.map((child) => (
              <li key={child.href} role="none">
                <Link
                  role="menuitem"
                  href={child.href}
                  className="block rounded-sm px-3 py-2 text-label font-medium text-text-secondary transition-colors duration-(--dur-fast) hover:bg-white/5 hover:text-text-primary focus-visible:bg-white/5 focus-visible:text-text-primary focus-visible:outline-none"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none">
      <line
        x1="4"
        y1={open ? "12" : "7"}
        x2="20"
        y2={open ? "12" : "7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="origin-center transition-transform duration-(--dur-base) ease-out"
        style={open ? { transform: "rotate(45deg)" } : undefined}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="transition-opacity duration-(--dur-fast)"
        style={{ opacity: open ? 0 : 1 }}
      />
      <line
        x1="4"
        y1={open ? "12" : "17"}
        x2="20"
        y2={open ? "12" : "17"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="origin-center transition-transform duration-(--dur-base) ease-out"
        style={open ? { transform: "rotate(-45deg)" } : undefined}
      />
    </svg>
  );
}

/**
 * Global navigation (§6, FAV-9).
 *
 * - Transparent over the dark hero; on scroll past a small threshold it gains
 *   an `ink`@85% (or light) glass fill, `backdrop-blur` and a bottom hairline.
 *   The bar is `fixed`, so none of that shifts page layout — only paint.
 * - The logo + link colors follow the section tone: sections tagged
 *   `data-header-light` flip the bar to `.tone-light`, swapping the wordmark to
 *   navy and the glass fill to white. Defaults to the dark treatment.
 * - Keyboard navigable with visible focus; Escape closes the dropdown and the
 *   mobile menu; the mobile hamburger opens a full-screen `ink` overlay.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Scroll state + section-tone detection in one passive handler.
  useEffect(() => {
    const lights = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-header-light]"));
    const update = () => {
      setScrolled(window.scrollY > 24);
      // The header baseline sits ~40px down; a light section owns the bar when
      // it straddles that line.
      const band = 40;
      setOnLight(
        lights().some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= band && r.bottom >= band;
        }),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Escape closes whatever is open: mobile menu first, otherwise the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) closeMobile();
      else setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  // Lock body scroll + move focus into the overlay while it's open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Keep Tab focus inside the open overlay so it can't land on the header /
  // page behind it (the full-screen menu is a modal surface).
  const trapFocus = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const root = overlayRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const barBackground = scrolled
    ? onLight
      ? "border-b border-hairline bg-surface-light/85 backdrop-blur"
      : "border-b border-hairline bg-ink/85 backdrop-blur"
    : "border-b border-transparent bg-transparent";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        onLight && "tone-light",
      )}
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-(--dur-base) ease-out",
          barBackground,
        )}
      >
        <Container className="flex items-center justify-between gap-6 py-5">
          <Link
            href="/"
            aria-label="Favour Capital — home"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
          >
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.href}
                    item={item}
                    open={openMenu === item.href}
                    onOpenChange={(next) =>
                      setOpenMenu(next ? item.href : null)
                    }
                  />
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button href={CTA.href} variant="ghost" className="px-5 py-2.5">
              {CTA.label}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="rounded-sm p-1 text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange lg:hidden"
          >
            <MenuIcon open={false} />
          </button>
        </Container>
      </div>

      {/* Mobile full-screen ink overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            onKeyDown={trapFocus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
            className="fixed inset-0 z-50 bg-ink lg:hidden"
          >
            <div className="flex h-full flex-col">
              <Container className="flex items-center justify-between py-5">
                <Logo className="text-white" />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="rounded-sm p-1 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  <MenuIcon open={true} />
                </button>
              </Container>

              <Container className="flex flex-1 flex-col justify-center gap-2 pb-24">
                <nav aria-label="Mobile">
                  <ul className="flex flex-col gap-1">
                    {NAV.map((item) => (
                      <li key={item.href} className="border-b border-hairline">
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="block py-4 font-display text-h2 font-semibold text-white transition-colors hover:text-text-accent"
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <ul className="-mt-1 flex flex-col gap-2 pb-4 pl-4">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeMobile}
                                  className="block text-body text-text-secondary transition-colors hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-8">
                  <Button href={CTA.href} onClick={closeMobile} className="w-full">
                    {CTA.label}
                  </Button>
                </div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
