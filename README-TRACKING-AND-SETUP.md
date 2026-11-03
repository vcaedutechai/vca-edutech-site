# VCA site: setup notes

## Tracking IDs (one place): assets/vca.js
Edit `window.VCA_CONFIG` at the top: `ga4`, `gtm`, `metaPixel`. Empty = that tracker is off.
Events sent (no personal data): ViewContent / view_item, InitiateCheckout / begin_checkout (Buy click), Lead / generate_lead (WhatsApp click).
UTM parameters (utm_source, utm_medium, utm_campaign, fbclid, gclid) are kept for the session and added to Buy links.

## Purchase event
Not fired in the browser (a visitor could fake it). Study-material purchases: the Apps Script sends GA4 `purchase` from the server only after Razorpay says "paid"
(set Script properties GA4_MEASUREMENT_ID and GA4_API_SECRET). CBT purchases run in a separate script, which is not part of this folder: it needs the same addition.
Meta Pixel Purchase needs Meta's Conversions API (server side) and is not set up.

## Diwali offer date: assets/vca.js -> offerEnd
After this date the offer banners disappear and regular prices show automatically (CBT landing pages, hub).
The old store page /tests/store/ has its own date inside the file (search DIWALI).

## Add your real CBT screenshot
Save as assets/img/cbt-neet-interface.png and cbt-jee-interface.png and re-run the build (the section appears only when the file exists).
