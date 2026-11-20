# Make the contact form send real enquiries

**Why Send enquiry is disabled:** GitHub Pages hosts HTML, CSS and JS files, but it does not send email. The form must be connected to a third-party form delivery provider before any visitor can submit an enquiry. Do not enter your receiving email in GitHub code.

## Complete setup (Formspree)

1. Open https://formspree.io/ and sign in or create an account. Review the provider's privacy policy and plan limits.
2. Create a new form in the Formspree dashboard. Configure the **receiving email address inside the Formspree dashboard**, not in your website code. Confirm/verify the inbox as requested.
3. Open the form's integration details and copy its **Form Endpoint**. It looks like `https://formspree.io/f/abcdefgh` (example only, do not copy this example).
4. In GitHub, go to `KA/assets/site.js`. Click the pencil/Edit icon. Near the top, replace this exact line:

   ```javascript
   const FORM_ENDPOINT = '';
   ```

   with a line that has your real Formspree endpoint:

   ```javascript
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_REAL_FORM_ID';
   ```

   Save/commit the change to `main`. Use your provider-issued ID. **Never paste your receiving email address into this line.**
5. Visit GitHub Settings → Pages and check the successful deployment in Actions. Open https://kahmedstats.github.io/KA/#contact, refresh the page, and verify **Send enquiry** is enabled.
6. Send one short test submission from an address you control. Check Formspree's Submissions dashboard and your receiving email inbox/spam folder. If it appears in the dashboard but not email, check Formspree notification and verification settings.

**Note:** The endpoint itself is public and can receive spam. Use the provider's spam protection and rate limits. Visitor messages are processed by this provider. A successful form submission means the provider accepted the message, but does not itself guarantee arrival in your email inbox.

## Common failures

- **Send enquiry remains greyed out**: `FORM_ENDPOINT` is blank, is a placeholder, is not a `https://formspree.io/f/...` endpoint, or the latest JS was not deployed.
- **Button works but submission fails**: verify the form ID and that your account/form is active; inspect the message shown below the button.
- **A form submission appears in Formspree but no email arrives**: verify your destination inbox, notification settings and spam/junk folder.
- **Buttons and language selector all fail**: confirm `assets/site.js` is present and loads at the correct path.
- **You want to avoid all external providers**: GitHub Pages alone cannot privately deliver form messages. You would need your own backend or another email-forwarding service.

## Privacy

Keep your private receiving email in the provider dashboard only. Do not add it to GitHub, mailto links, HTML attributes, or JavaScript. Form submissions contain visitor information and are transmitted to Formspree; tell visitors before collecting their data.
