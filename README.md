# TFP Models marketing site

Published separately at https://tfpmodels.app using GitHub Pages, `main` / root.
The existing https://www.tfpmodels.org publication remains separate.

The root paints the download page first, then attempts an ordinary HTTPS
App Store redirect on iPhone or routes Android to the local installation guide.
Manual interaction cancels the automatic redirect. Desktop, iPad, bots,
translated pages, /about.html and ?stay=1 retain the page. Ordinary download
buttons remain available when automatic navigation is blocked. No custom
protocols or external-browser handoffs are used.

Android installation instructions and download pages use ten-language content
from [tfpmodels-site](https://github.com/EvilevNikita/tfpmodels-site).
This repository contains generated deployable files. To update them, run in
the source repository:

```sh
python3 scripts/generate_marketing_site.py --output ../tfpmodels-app-site
node scripts/test_marketing_routing.cjs
python3 scripts/test_marketing_seo.py
```

Use the cloned checkout of this repository as the output directory, review its
diff, then commit and push. Do not manually edit generated HTML.

Porkbun DNS: apex ALIAS `evilevnikita.github.io`, www CNAME
`evilevnikita.github.io`, TTL 600. The Pages custom domain is `tfpmodels.app`.
Keep the .org DNS and repository custom domain unchanged.

Download homepages are indexable, with self-canonicals and reciprocal hreflang
on .app, and are listed in the .app sitemap. Android, legal pages, and the
duplicate /about.html stay noindex. Download copy lives in
`content/marketing-locales.json`; its template is `templates/marketing-home.html`.
Search indexing and search-result appearance are decided by the search engine.
GA4 only loads after consent. Store URLs and support email remain unchanged.
