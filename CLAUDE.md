# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Remote Genius (리모트지니어스) landing page - a Korean service that connects startups with global remote talent at reduced costs. The project is a static HTML website designed for deployment on GitHub Pages.

## Project Structure

- `index.html` - Single-file landing page with embedded CSS and JavaScript
- `COMPONENTS.md` - Design component reference from Chargezoom landing page

## Key Business Context

Remote Genius (리모트지니어스) provides:
- Global talent outsourcing services for Korean startups
- 50% cost reduction compared to local hiring
- Services include: e-commerce managers, social media marketers, sales experts, web designers, developers, data analysts
- No mandatory employment periods
- Performance tracking and management system
- Immediate talent replacement if needed

## Development Guidelines

### Working with the Landing Page

The entire website is contained in a single `index.html` file with:
- Inline CSS in `<style>` tags
- Inline JavaScript for interactions (GSAP 3.15 + ScrollTrigger and Lenis 1.3 from jsDelivr, pinned versions, `defer`)
- Korean language content (UTF-8 encoding)
- Hero photos `assets/hero-seoul-*` / `assets/hero-manila-*`, AI media samples `assets/ai-*.webp`, share image `assets/og-image.jpg`
- Font: Wanted Sans Variable (jsDelivr) only

### Design System

Grid (the rule that matters most): one 12-column grid for every row. `.container` = max 1280px content, margin `clamp(20px, 5vw, 80px)`, gap `clamp(16px, 1.8vw, 24px)`. Header, hero, every section and the footer use it, so every text edge lines up with the logo. Text blocks sit in columns 1–5/6; panels and visuals start on column 7 (the same line where the header nav starts) and end on column 12. Photos, marquees and the stories slider may bleed, text never does. Check with `getBoundingClientRect().left` at 1728 / 1440 / 1280 / 1024 / 390 after layout changes.

Color roles (CSS variables in `:root`):
- Ultramarine `#2341E0` — brand and action only: hero, final CTA, buttons, links, active states
- Midnight `#0F1838` — the one dark feature section (AI media) and the footer
- White — base of every other section; Cloud `#F4F6FB` — panels only, never a whole section
- Ink `#0D1433` text, Slate `#4A5270` secondary text, Line `#E3E7F0`
- Live `#2FD39A` — only "통화 중 / 근무 중" dots

Key Sections (anchor ids used by nav: #services, #about, #faq, #contact):
1. Header (transparent on hero, solid after it, hides on scroll down, scroll progress, active-section underline)
2. Hero: copy on cols 1–6, video-call scene on cols 7–12 (Seoul founder × Manila genius, live clocks, call timer, chat with EN/KO lines), stats row
3. Ticker: two marquees of practical tasks and tools
4. Savings calculator (average 50% savings)
5. Services (#services): 8-role tab explorer, each role with 6 practical tasks, tools and a "상담 신청" button that pre-checks its job in the form
6. AI media (#ai-media): before/after slider, short-form reel, ComfyUI-style workflow run
7. Process (#process): 4 steps with a scroll-linked line
8. About (#about) "왜 리모트지니어스인가?" + live work-report mock
9. Stories slider, 10. FAQ (#faq), 11. CTA (#cta), 12. Footer (#contact)

### Content Guidelines

- Emphasize cost savings (50% reduction) and quality
- Use "지니어스" to refer to dispatched workers
- Use "급여" (salary) not "가격" (price) when discussing compensation
- Avoid treating people as commodities in language
- Maintain professional, trustworthy tone
- Practical, specific role content (e.g. 아마존 셀러센트럴 리스팅, 쇼피 캠페인·바우처, Higgsfield 숏폼, ComfyUI 워크플로우). Illustrative UI (call scene, report, AI samples) is labelled 예시; don't claim a sample was made with a specific tool unless it was.

### Animation and Interactions

- `html.js` / `html.motion` / `html.ready` classes are set by the inline head script; the hero is pre-hidden only under `.motion:not(.ready)` and a 3.5s failsafe removes `motion` if the libraries never load
- Every GSAP/Lenis use is guarded; without them (or with `prefers-reduced-motion`) all content renders statically
- Search/AI crawlers (named UA list in the inline head script, which adds `html.crawler`) get that same static render. Googlebot never scrolls, so scroll reveals left 14 blocks `visibility: hidden` and counters at 0% in its rendered HTML (GSC live test, 2026-09-28). Keep the UA list in that one place; don't add Lighthouse to it.
- Anything that moves on its own has a pause control (call scene, ticker, reel)
- Consultation form is a native `<dialog id="consultModal">`, opened by any `[data-consult]` link (`data-job="job1"` pre-checks a job); Lenis stops while it is open; scroll lock is CSS (`html:has(.consult[open])`)
- Form payload (keys, `SCRIPT_URL`, `mode: 'no-cors'`) feeds Google Apps Script → Slack; keep keys and field ids/values unchanged. Failures are silent under no-cors, so never "test" by submitting to the live endpoint.
- Testing tip: a background Chrome window reports `visibilityState: hidden`, which freezes rAF, GSAP, ScrollTrigger and scroll events. Bring the window to the front, or force with `gsap.ticker.tick()` + `ScrollTrigger.update()`.

### Design Notes

- 2026-09 리뉴얼. 원본(보라 그라데이션) 디자인은 커밋 c8b7d69의 index.html에 있음.
- 정렬은 헤더 기준 12칸 그리드 하나로만 맞춘다. 색은 역할표 밖으로 쓰지 않는다.

### SEO

- Head meta (title, description, OG/Twitter) and JSON-LD quote the same numbers as the page (평균 50% 절감). Don't reintroduce a number the page doesn't show.
- JSON-LD `@graph` in `<head>`: Organization, WebSite, WebPage, Service (8 roles), FAQPage. The role descriptions and FAQ answers are copied verbatim from the page. When the visible FAQ or a role description changes, update the JSON-LD and `llms.txt` to match.
- `sameAs` is left out on purpose: linkedin.com/company/remotegenius is another company (RemoteGenius LLC, IoT), and facebook.com/remotegenius (English, "outsourced team members") is unverified. Add only profiles the company actually owns.
- Stat counters (`[data-count]`) keep the final value in the markup and only drop to 0 inside `countUp` / at the reveal trigger. Never reset them to 0 on load: renderers that don't run GSAP (crawlers) would index "평균 인건비 절감 0%".
- `sitemap.xml` lists the one URL (no `#fragments`). When the page content changes, bump its `lastmod` and the JSON-LD `WebPage.dateModified` together.
- Icons: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `assets/logo.png` (Organization logo) are all the same mark as the header logo.

### Deployment

Static website intended for GitHub Pages deployment. No build process required - direct HTML file. The workflow copies the repo to `_site` without dotfiles and `*.md`, so CLAUDE.md and COMPONENTS.md are not published.
