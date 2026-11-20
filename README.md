# KA personal academic homepage — upload and editing guide

**Website:** https://kahmedstats.github.io/KA/
**Repository:** https://github.com/Kahmedstats/KA

## Files to upload

Upload these files to the *root* of the `main` branch, preserving the folder:

```
KA/
  index.html
  README.md
  .nojekyll
  assets/
    campus-scene.jpg
```

The HTML contains its own CSS and JavaScript. No packages, builds or external fonts are needed. Do not upload the ZIP without extracting it.

## Replace the campus photograph

1. In GitHub open your repository and select **Add file → Upload files**.
2. In `assets/`, upload the desired landscape photo named **campus-scene.jpg**. If your photo is sideways, rotate and save it on your computer first.
3. If the file already exists, use GitHub's file replacement workflow (e.g., remove old file and upload new photo).
4. Keep the HTML image path exactly `assets/campus-scene.jpg`. Image name capitalization matters on GitHub Pages.

## Publish on GitHub Pages

Open **Settings → Pages**. Set **Deploy from a branch**, `main`, `/(root)`, and save. Watch the **Actions** tab for successful deployment. The URL is https://kahmedstats.github.io/KA/ .

## Keep the receiving email PRIVATE

**Do not write your receiving email address into index.html, README.md or any other publicly uploaded file.**

1. Create a Formspree account at https://formspree.io/ .
2. **Privately, in the Formspree dashboard**, set the mailbox where you want messages delivered, then verify that address there.
3. Create a form. Formspree provides a public form endpoint such as `https://formspree.io/f/abcdefgh`.
4. In `index.html`, search for `const FORM_ENDPOINT = "";` and paste **only the form endpoint URL** inside the quotes.
5. Commit, then submit a test message through your website. Confirm it arrives in your chosen inbox.

The form ID is public, the destination mailbox is not in your website source. Formspree processes visitor submissions under its own privacy terms. GitHub Pages cannot send private email by itself.

## Academic and social links

In `index.html`, search for `SOCIAL_PROFILES`. Replace each empty `url:""` with the **exact link to your profile** for Google Scholar, ORCID, LinkedIn, ResearchGate or X. Empty links remain hidden. Do not link to platform homepages as though they were your personal accounts.

## Add, update or remove news

Find `id="news"` and `<!-- ADD NEWS ... -->`.

Copy this entire block above the existing news:

```html
<div class="item"><div class="meta">March 2027</div><p>Presented a paper at [conference name].</p></div>
```

Change the date and content. To update, edit the text. To remove, delete one entire `<div class="item">...</div>` news block. Remove placeholders before publishing.

## Add or remove publications

Find `id="publications"`. Copy an existing `<article class="item"> ... </article>` block, update year, authors, journal, title and DOI. Do not list unverified or submitted work as published.

## Optional sections

Find `<section id="projects" hidden>`, `<section id="talks" hidden>` or `<section id="opportunities" hidden>` and remove `hidden` to publish that section. Add your real content. Add `hidden` again to remove it from public view.

## Editing your bio or research interests

Search for `id="about"` or `id="research"` in `index.html` and edit the text. The name and publication information appear in their respective HTML sections. Language selector translates the interface labels and some introductory text; longer scholarly content and publication titles remain English to preserve terminology.

## Troubleshooting

- Plain text/no design: upload the complete `index.html`, not just the content inside `<body>`.
- Background not visible: `assets/campus-scene.jpg` must exist at the exact path and filename.
- Website 404: check Settings → Pages and Actions. The repository path must be `/KA/`.
- Email form disabled: configure the Formspree endpoint; never place your mailbox in public code.
- Old version displayed: confirm main branch deployment and force-refresh your browser.
- If using copy-and-paste, paste the *entire* `index.html` into one GitHub file.
