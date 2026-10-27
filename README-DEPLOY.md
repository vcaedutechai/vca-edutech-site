# VCA EduTech and AI website: deploy steps for vcakota.com

Files: index.html (whole site), vs-sir.jpg (founder photo), favicon.svg, logo-seal.svg (seal logo),
CNAME (domain name for GitHub Pages), robots.txt, sitemap.xml.
Keep every file in the repository root, next to index.html.

1. GitHub: create a NEW public repository named vca-edutech-site (do not reuse the books repository).
2. Add file > Upload files: upload everything from this folder (not the zip itself), then Commit.
3. Repository Settings > Pages > Source "Deploy from a branch", branch "main", folder "/ (root)", Save.
4. Same page > Custom domain: vcakota.com > Save. (The CNAME file already holds this.)
5. GoDaddy > My Products > vcakota.com > DNS. Add or edit these records:
   Type A      Name @     Value 185.199.108.153
   Type A      Name @     Value 185.199.109.153
   Type A      Name @     Value 185.199.110.153
   Type A      Name @     Value 185.199.111.153
   Type CNAME  Name www   Value vcakota20-web.github.io   (use your own GitHub username if different)
   Delete any old A record for @ that points to GoDaddy parking, and turn off GoDaddy forwarding.
6. Wait 10 to 60 minutes, then in Pages tick "Enforce HTTPS".
7. Google Search Console: add vcakota.com, submit https://vcakota.com/sitemap.xml.
8. Create a Google Business Profile for the Jaipur office, and use the site link on YouTube, Instagram and LinkedIn.
