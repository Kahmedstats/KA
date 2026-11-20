# KA academic homepage — copy-and-paste edition

Upload `index.html` to the root of `Kahmedstats/KA`. Upload `assets/campus-hero.jpg` for the background. Configure Settings > Pages > Deploy from branch > main > /(root).

## Editing

Edit `index.html` in GitHub. Change biography under `id="about"`, research under `id="research"`, and publication entries under `id="publications"`. Add news by copying a `div class="row news"` block into `id="updates"`. Delete a whole block to remove an item.

## Social links

Uncomment only links with your actual Google Scholar, ORCID, LinkedIn, or ResearchGate profile URLs. Never use generic service homepages as profile links.

## Contact form

GitHub Pages cannot privately receive email. Create a form with a provider such as Formspree and enter its public form endpoint as `FORM_ENDPOINT` in `index.html`. Do not enter your private receiving email into the site code. Until configured, Send remains disabled. Form submissions will be processed by the form provider.

## Language and content

The interface and short introductory paragraphs are translated into English, Chinese, Spanish, French, and Arabic. The detailed publication and news entries remain in their original language. Update translations in the `translations` dictionary if you change the introduction.
