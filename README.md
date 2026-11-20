# Animated statistical illustration (new)

The homepage contains a **Statistics in motion** section below the campus photograph. It plots three **simulated normal distributions** as animated, translucent SVG curves. This is a visual illustration of probability density, not an analysis of research data.

- The animation runs automatically when motion is permitted; visitors can **Pause animation**, **Play animation**, or **Restart**.
- When a visitor sets reduced motion at the operating-system level, the illustration starts in a paused state. It also stops in inactive tabs.
- The SVG shapes appear even when JavaScript is disabled (static fallback).
- All animation logic is contained in `assets/site.js`; all styling in `assets/style.css`. No plotting package, CDN, login, or external library is used.
- To remove the visual, delete the section with `id="statistics-live"` from `index.html`, plus the `initDistributionAnimation` function from `assets/site.js` and the final distribution CSS block.

# Kawsar Ahmed — academic homepage (expanded 2026)

A static website for GitHub Pages. This version adds manuscript statuses, employment, consultancy, analytical skills, awards, and activities.

## Upload

1. Extract the ZIP; upload its **contents**, not the enclosing folder or the ZIP itself.
2. Add `index.html`, `README.md`, `CONTACT-SETUP.md`, `EDITING-GUIDE.md`, `.nojekyll`, and the entire `assets/` directory to the **root** of `https://github.com/Kahmedstats/KA`.
3. Make sure `assets/style.css`, `assets/site.js`, `assets/campus-scene.jpg`, and `assets/favicon.svg` exist.
4. Commit to `main`. Go to GitHub repository **Settings > Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**.
5. Open https://kahmedstats.github.io/KA/ and refresh after deployment.

## Editing academic details

- `index.html`: manuscripts, dates, employers, consulting assignments, skills, award items, publications, news, optional sections.
- `assets/style.css`: colors and layout.
- `assets/site.js`: five-language UI and social profiles under `OPTIONAL_SOCIAL`. Each platform currently links to its official homepage as a **demo**, not to your profile. Replace each `profileUrl: ''` with your real public URL to remove its demo label automatically.
- `assets/campus-scene.jpg`: replace with your picture using exactly that name.
- `EDITING-GUIDE.md`: copy-paste examples for new positions/manuscripts/awards.

### Source currency

The two peer-reviewed 2024 publications and the experience/skills/awards/manuscript pipeline details were derived from a curriculum vitae dated **30 December 2024**. A submitted manuscript's editorial status is not static: **verify the status and journal directly with your submission systems before treating it as current**. The page labels historical statuses clearly rather than asserting an ongoing review in November 2026. For positions marked 'continuing' in the 2024 CV, the website deliberately does not claim they are still active.

## Contact form

The form uses an ordinary native HTML POST to `https://formspree.io/f/mrpqagaa` and does not disable the Send button. Your receiving email is not present in the site source. In Formspree, confirm the destination email and notification settings, then submit a test from the published site. Formspree receives submitted visitor details under its own privacy policy. See `CONTACT-SETUP.md`.

## Privacy

The public site does not contain the receiving email address, phone numbers, private submission IDs, or home address. Never copy passwords or private access tokens into site files.


## Campus photograph
The overlaid 'Research Lens' panel has been removed, leaving the photograph unobstructed. Replace `assets/campus-scene.jpg` with your own picture using the same filename.

## Temporary social links (demo)

The Google Scholar, ORCID, LinkedIn, ResearchGate, YouTube, WeChat, Facebook and X buttons are clickable **demo links to the official platform homepages**, not your accounts.

Edit `assets/site.js`, find `OPTIONAL_SOCIAL`, and change just `profileUrl` for each platform, for example:

```js
{ label: 'ORCID', profileUrl: 'https://orcid.org/YOUR-ORCID-ID', demoUrl: 'https://orcid.org/' }
```

Use your actual ID, not `YOUR-ORCID-ID`. An empty `profileUrl` keeps the demo homepage. WeChat generally requires your own public contact page or QR code; do not publish a private QR code without considering privacy.


## Red publication-status labels

Publication entries show a crimson **Published** badge, while the manuscript entries show outlined red badges for review stages **as recorded in December 2024**. These are historical statuses, not a claim that manuscripts remain under review today. To edit text, open `index.html` and search for `publication-status`. To change badge colors, edit `.publication-status.status-published` and `.publication-status.status-review` in `assets/style.css`. Do not add journal impact-factor or quartile claims without verifying the relevant year and source.


## Accessibility zoom buttons (A− / A+)

The header has A− and A+ buttons beside the language and theme controls. Each click adjusts the page by 5% within 90%–125%. The current value is displayed between the buttons and saved to browser local storage under `ka-page-zoom`. The buttons work in light/dark modes and all five languages. Native browser zoom (Ctrl/Cmd + or −) remains available for larger adjustments.

Update both `index.html`, `assets/style.css` and `assets/site.js` together for this feature.


## Footer statistics visualization (November 2026 update)
The “Statistics in motion” visualization is now located immediately before the website footer, after the contact form. Its three illustrative curves use ocean blue, evergreen and lavender. The keyboard skip-to-content link stays visually hidden unless focused. Animation can be paused or restarted and respects reduced-motion accessibility preferences. To adjust colors, edit the `.dist-*` and `.key-*` selectors in `assets/style.css`.


### Statistics display placement
The animated **Statistics in motion** visualization is placed directly **below the social/profile buttons** and **above the contact form** inside the Get in touch section. To change this position, edit `index.html` and move the single `<section id="statistics-live">…</section>` block, keeping it outside the `<form>`. The visualization needs `assets/site.js` and `assets/style.css`.
