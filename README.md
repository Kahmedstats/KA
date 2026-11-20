# Kawsar Ahmed — Academic Website (working Formspree contact)

## Critical fix
The previous version disabled Send enquiry in JavaScript until it detected a configured endpoint. This version **never disables the Send enquiry button**. `index.html` uses a regular HTML form POST directly to your real endpoint:

```html
<form id="contactForm" action="https://formspree.io/f/mrpqagaa" method="POST">
```

No `fetch`, JavaScript library, or special activation is necessary. Formspree handles the submission and displays its own confirmation or error page. **You must verify that the form is accepting submissions and that email notifications are enabled inside your private Formspree dashboard.** We cannot guarantee delivery until you submit and confirm a live test message.

## Exact GitHub upload instructions

1. Unzip the package. Open https://github.com/Kahmedstats/KA on the published branch (`main` if your GitHub Pages settings point there).
2. Upload the *contents* of the extracted folder, not the containing folder or ZIP. Replace `index.html` and `assets/site.js` **together**. Upload the updated CSS, photo, favicon, and `.nojekyll` too.
3. Confirm this hierarchy:

```
KA/
  index.html
  README.md
  CONTACT-SETUP.md
  .nojekyll
  assets/
    site.js
    style.css
    campus-scene.jpg
    favicon.svg
```

4. Commit, open **Settings → Pages** and verify `Deploy from a branch`, `main`, `/(root)` (or use the actual published branch).
5. Check the **Actions** tab for a successful Pages deployment and open https://kahmedstats.github.io/KA/#contact. Hard-refresh the browser if it shows the old site.
6. The form button should be enabled even if JavaScript is turned off. Submit a test using your own name and a valid sender email. Confirm the result in Formspree **Submissions** and your configured inbox. If delivery fails, check Formspree dashboard settings, verification, email notifications, form limits, and any returned error.

## Keep your receiving address private
Your receiving university email is **not present in any public HTML, CSS, JavaScript, Markdown, or image metadata in this package**. It is configured in your **private** Formspree dashboard. The form endpoint `https://formspree.io/f/mrpqagaa` is public and must be public for the form to submit. Formspree is a separate service processing the data visitors submit; review its privacy policy.

## Add academic and social accounts
Edit `assets/site.js` at `OPTIONAL_SOCIAL`. Each entry has `label` and `url`. When no URL is supplied, the site shows a non-clickable 'link pending' label. Insert **your exact public profile URL** to activate an actual clickable link. Available entries: Google Scholar, ORCID, LinkedIn, ResearchGate, YouTube, WeChat, Facebook, and X. WeChat usually uses a QR code; if you prefer a public QR code, place a graphic in `assets/` and add a link to it in the social area. Never paste your login credentials or private account links.

## Edit the website
- `index.html`: biography, publications, updates and optional project/talk/opportunity sections (remove `hidden` to show).
- `assets/style.css`: layout, color, text sizing, photo treatment.
- `assets/site.js`: languages, theme and public social links.
- `assets/campus-scene.jpg`: image, replace with an upright JPG of the same filename.
- `.nojekyll`: empty file for GitHub Pages.

The academic publication details shown are based on information previously supplied; verify before publishing any new material.
