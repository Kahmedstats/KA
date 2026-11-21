# Formspree contact setup / delivery test

Form action: `https://formspree.io/f/mrpqagaa` (already configured in `index.html`). Method: POST. The Send button should remain enabled whenever required fields and consent are provided; JavaScript is not needed to submit.

1. In your own Formspree dashboard select the form with ID `mrpqagaa`.
2. Confirm your university inbox is the verified destination and email notifications are enabled.
3. Upload the complete updated website to GitHub Pages.
4. Open the published site and submit a short test message using an email account you control.
5. Look for the submission in Formspree > Submissions and check inbox/spam.

If Formspree shows the submission but no email arrived, check its destination/notifications; if no submission is shown, check GitHub Pages deployment and the form `action` attribute. Avoid testing by submitting private or sensitive material.
