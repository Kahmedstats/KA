# KA Studio — Kawsar Ahmed Academic Homepage

Website address (after successful GitHub Pages publication): https://kahmedstats.github.io/KA/

## Files and where to put them

```
KA/
  index.html
  README.md
  .nojekyll
  assets/
    style.css
    site.js
    campus-scene.jpg
    favicon.svg
```

**Do not upload the ZIP as a file to the repository.** Extract it first, then upload its contents. Keep the `assets` directory, and do not nest all the files in another folder.

## GitHub Pages publishing

1. Open https://github.com/Kahmedstats/KA and choose the `main` branch.
2. Back up your old `index.html` before replacing it.
3. Choose Add file > Upload files. Upload the extracted contents, preserving `assets/`.
4. Commit the changes.
5. Open Settings > Pages > Build and deployment. Choose **Deploy from a branch**, branch **main**, folder **/(root)**; Save.
6. Check repository Actions for a successful build, then visit https://kahmedstats.github.io/KA/.

## Edit your profile and research

- `index.html` contains all public text. Find headings `About me`, `Research directions`, `Publications` and `Notes & updates` and change the text underneath.
- The main CSS lives in `assets/style.css`. Change the colors under `:root` for light mode or `html[data-theme=dark]` for dark mode.
- `assets/site.js` contains translations, the theme button, optional social profile links and private contact form setup. Be sure to keep quotes, commas and braces intact when editing it.
- Do not add qualifications, awards, appointments or current availability claims until you verify them.

## Replace your campus photo

1. In GitHub, open `assets/`. Choose Add file > Upload files.
2. Upload a JPG named exactly `campus-scene.jpg` (lowercase, hyphen, `.jpg`). If a file of that name already exists, replace it.
3. Commit. The CSS uses `url('campus-scene.jpg')` because the CSS and image are both inside `assets/`.
4. Use a horizontally oriented photo for best results. Check that subjects remain visible on mobile, as the hero photo is cropped using `background-size: cover`.

## Add a publication

Copy a whole `<div class="publication">...</div>` block in `index.html` inside the `#publications` section. Change year, journal, title, authors and DOI. Remove a publication by deleting its whole block. Do not include an invented DOI or inaccurate article status.

## Add or remove news

Inside `<ol class="updates">` under `#updates`, copy one `<li>...</li>` block and edit the `<time datetime="YYYY-MM">` and accompanying text. Put newest updates first. To remove old news, delete only that `<li>...</li>` block.

## Turn on optional sections

Three sections are in `index.html` but have `hidden` on their opening `<section>` tags: `projects`, `talks`, `opportunities`.

To show one, delete `hidden`, replace the sample text, and optionally add `<a href="#projects">Projects</a>` to the header navigation. To hide it again, restore `hidden`. The site styling respects hidden sections.

## Google Scholar, ORCID, LinkedIn, ResearchGate and X

Open `assets/site.js` and find `OPTIONAL_SOCIAL`. Each entry has `label` and `url`. Paste your **actual public profile URL** into its empty `url` value, for example:

```javascript
{ label: 'ORCID', url: 'https://orcid.org/YOUR-REAL-ORCID' },
```

Links with empty or non-HTTPS URLs stay hidden. GitHub is already active in `index.html`.

## Contact form without exposing your receiving email

**GitHub Pages cannot send private email on its own.** Choose a form provider you trust (e.g., Formspree) and configure the receiving address in your private account. Verify your inbox there. The receiving email must **never** be inserted into `index.html` or `assets/site.js`.

In `assets/site.js`, find:

```javascript
const FORM_ENDPOINT = '';
```

Paste the endpoint supplied by the provider into the quotes, like `https://formspree.io/f/your-id`. You must use the real endpoint the provider generated. Before that, the form button is disabled and no messages are sent. After configuring, make a test submission, verify it arrives, and check your provider spam/protection settings. Visitors' form submissions go to the external provider, whose privacy terms apply. The public endpoint is not a secret; the receiving email is not present in this site's files.

## Language selector

English, Simplified Chinese, Spanish, French, and Arabic are available. Header/navigation, overview and contact interface are translated. Publication citations, research-card details and archived news remain in their original English. You can add translations in the `dict` object in `assets/site.js` if you want to fully translate them.

## Troubleshooting

- Plain text / missing styling: verify `assets/style.css` exists at the correct path, with exactly that capitalization.
- No background photo: verify `assets/campus-scene.jpg` exists, not `campus-scene.JPG` or a nested folder.
- Buttons not responding: ensure `assets/site.js` was uploaded and the browser console has no syntax errors.
- Both `https://kahmedstats.github.io/KA/` and your other pages show 404: check Settings > Pages and Actions. A public repo's mere existence does not enable Pages.
- An old version shows: confirm `main` was deployed and refresh your browser.
- Contact button disabled: configure `FORM_ENDPOINT` with a verified form provider.

## Privacy

All GitHub Pages assets are public. Only publish content you deliberately want the public to see. This package contains no receiving email address, personal phone numbers, original private CV, referee contacts, or third-party trackers. It contains a campus image supplied in this conversation and two scholarly DOI links.

## Exact checklist for activating email delivery

See [CONTACT-SETUP.md](CONTACT-SETUP.md). You need to create a Formspree form from your account, confirm your receiving inbox and paste the real endpoint into `assets/site.js`. **The address that receives messages is never entered into public HTML/CSS/JS or the GitHub repository.** The site will enable Send enquiry automatically once the endpoint has been saved and deployed.
