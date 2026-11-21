# Social demo links and personal profile URLs

All eight social buttons are **placeholder links to platform homepages**, not personal accounts. GitHub already points to the actual public GitHub profile.

## Edit your personal URLs

1. In your GitHub repo, open `assets/site.js`.
2. Find `const OPTIONAL_SOCIAL`.
3. Each entry has a `profileUrl: ''` field. Set it to your own actual public HTTPS profile page URL.
4. Commit your change. That button will then say `Platform ↗` instead of `Platform ↗ · demo`.

```javascript
{ label: 'Google Scholar', profileUrl: 'https://scholar.google.com/citations?user=YOUR_ID', demoUrl: 'https://scholar.google.com/' },
{ label: 'ORCID', profileUrl: 'https://orcid.org/YOUR-ORCID-ID', demoUrl: 'https://orcid.org/' },
{ label: 'YouTube', profileUrl: 'https://www.youtube.com/@YOUR_HANDLE', demoUrl: 'https://www.youtube.com/' },
```

These `YOUR_...` examples are placeholders, not real accounts. Do not paste a private WeChat address or QR code without considering who may access it.

## Email

The contact form still sends directly to `https://formspree.io/f/mrpqagaa` with POST. Your inbox address is not embedded in public website code.
