# Editing your academic website

## Research manuscripts

Open `index.html`, search for `id="manuscripts"`. Duplicate a whole `<article class="manuscript"> ... </article>` and change the manuscript title, journal and status.

**Status policy:** A December 2024 CV identified two submissions, but status may have changed. If newly accepted or published, move them into the published list and add DOI. If rejected, withdrawn or retargeted, update or remove the old journal. Never present a manuscript as under review merely because it once was.

Example:

```html
<article class="manuscript">
  <div class="pub-meta"><span>Manuscript</span><span>Journal name (verified)</span></div>
  <h4>Your exact manuscript title</h4>
  <p>Author position · Under review (verified Month Year).</p>
</article>
```

## Employment and consultancy

Search for `id="experience"`, then update each `.role` and `.consultancy-card`. Do not describe positions as ongoing unless that is presently confirmed.

## Analytical skills and awards

Search for `id="skills"` to update software and methods. Search for `id="awards"` to update scholarships, memberships and activities. Add new `<span>` elements for skills, and duplicate an `<article class="award-item">` block for a new award.

## Social profiles

In `assets/site.js`, find `OPTIONAL_SOCIAL`. Put real public HTTPS URLs in the matching `url` fields. For WeChat, use a public contact page or link to your own uploaded QR image (avoid adding private account identifiers without consent).

## Other sections

The Projects, Talks, and Opportunities sections have the HTML `hidden` attribute. Remove `hidden` from the opening `<section>` element, replace the template copy, and add a navigation link if you want them displayed.

## Contact / GitHub

The endpoint is set in `index.html` and the form posts directly to Formspree. If the form button becomes disabled after uploading, an older `site.js` or `index.html` likely remained in the repo. Replace both and hard-refresh.


## Footer statistics visualization (November 2026 update)
The “Statistics in motion” visualization is now located immediately before the website footer, after the contact form. Its three illustrative curves use ocean blue, evergreen and lavender. The keyboard skip-to-content link stays visually hidden unless focused. Animation can be paused or restarted and respects reduced-motion accessibility preferences. To adjust colors, edit the `.dist-*` and `.key-*` selectors in `assets/style.css`.
