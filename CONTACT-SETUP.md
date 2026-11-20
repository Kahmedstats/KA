# Contact form — configured

The website has been configured to submit to the Formspree endpoint you supplied:

`https://formspree.io/f/mrpqagaa`

The receiving email address is **not** present in the website files. It must be set as the verified destination in your private Formspree dashboard.

## Upload

Upload the files in this folder to the ROOT of your `KA` GitHub repository. Keep `assets/site.js`, `assets/style.css`, `assets/campus-scene.jpg`, and `assets/favicon.svg` inside `assets/`. Commit to your published branch.

If you already deployed the same design, replacing `assets/site.js` alone is sufficient to activate the form.

## Test delivery

1. Verify the receiving email address in Formspree and enable email notifications as needed.
2. Open https://kahmedstats.github.io/KA/#contact after the GitHub Pages deploy succeeds.
3. Hard refresh the page to clear cached JavaScript.
4. Submit a real test enquiry. Check your Formspree submissions dashboard and your inbox / spam folder.
5. If no message arrives, consult the Formspree dashboard and its verification/notification settings.

The public form endpoint is visible in the site's JavaScript; this is normal. Do not add passwords or the receiving email address to the repository. Formspree processes submissions according to its own policies.
