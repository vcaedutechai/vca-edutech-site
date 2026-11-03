# VCA site: setup notes

## One-place settings: assets/vca.js (window.VCA_CONFIG)
- metaPixel: set to 2173221344074914 (same Pixel as the books store). ga4 / gtm: empty until you supply IDs.
- offerEnd: Diwali offer end. After it, offer wording disappears and regular prices show (CBT pages, /tests/, home strip).
- leadEndpoint: paste the Apps Script URL from VCA_Leads.gs. Empty = forms fall back to WhatsApp.

## Consent
Trackers load only after the visitor clicks Accept on the banner. UTM parameters are kept for the session.

## Events (no personal data)
ViewContent, InitiateCheckout (Buy click), Lead (form or WhatsApp click). Purchase is NOT fired in the browser.
Study-material GA4 purchase: server side from VCA_Material_Checkout.gs after Razorpay says paid. Meta Purchase needs Meta Conversions API (not set up).
Book store (vcakota20-web.github.io) has its own checkout and Pixel; unchanged.

## PWA
manifest.webmanifest, icons, sw.js (offline notice only; pages, tests and payments are never cached).
Before any Android (Trusted Web Activity) app: test login, CBT portal and Razorpay inside the app. Google Play requires Play Billing for digital goods sold in an app; plan for that before building an app bundle.

## Rollback
GitHub > Commits > open the commit before this upload > Browse files / Revert. The previous site stays in git history.
