# KA — Personal Research Homepage

Clean, professional academic homepage for **Kawsar Ahmed** (Kahmedstats).

**After upload the site will be live at:**  
https://kahmedstats.github.io/KA/

---

## How to upload (replace the old site)

1. Go to https://github.com/Kahmedstats/KA
2. Open the `main` branch
3. Delete or replace the old `index.html` (and any other old files if you want a clean start)
4. Upload these three files to the **root** of the repository:
   - `index.html`
   - `README.md` (this file)
   - `.nojekyll`
5. Commit the changes
6. Go to **Settings → Pages**
7. Source: Deploy from a branch → `main` → `/ (root)` → Save
8. Wait 1–2 minutes, then visit https://kahmedstats.github.io/KA/

---

## What this version includes

- Clean single-page design that works in both light and dark mode
- Clear “Currently open to” cards for:
  - Postdoctoral positions
  - Research collaboration
  - PhD mentoring
  - Industry / consulting roles
- Research focus with topic chips
- Real selected publications with working DOI links
- Open-source packages (tIPW, ivcoxw, BET)
- Contact section
- Optional News and Teaching sections (hidden until you activate them)
- Reading comfort controls (theme toggle + font size) in the bottom-right corner
- No external CSS, JavaScript libraries, fonts or tracking
- Mobile-friendly

---

## How to edit later (very simple)

Open `index.html` on GitHub → click the pencil icon.

| Want to change | Search for |
|----------------|------------|
| Name / title / affiliation | `Kawsar Ahmed` or the hero section |
| Open-to cards | `id="open"` |
| Research text & chips | `id="research"` |
| Publications | `id="publications"` |
| Software / packages | `id="software"` |
| Contact details | `id="contact"` |
| Activate News section | Find `id="news"` and change `class="optional"` to `class="optional active"` |
| Activate Teaching section | Same for `id="teaching"` |
| Add ORCID / Scholar | Search for `Optional professional links` and uncomment the lines |

Only change text inside the tags. Do not remove the angle brackets or closing tags.

---

## Design notes

- Works automatically with the visitor’s system light/dark preference
- Manual theme toggle and font-size buttons are available in the bottom-right
- Phone number and private referee contacts are intentionally **not** included
- This is a public research homepage, not a full CV

---

© 2026 Kawsar Ahmed
