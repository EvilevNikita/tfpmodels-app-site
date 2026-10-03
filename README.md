# TFP Models marketing site

Published separately at https://tfpmodels.app using GitHub Pages, `main` / root.
The existing https://www.tfpmodels.org publication remains separate.

The root displays the download page before routing iPhone browsers to the existing App Store listing and Android
visitors to `/android.html`. Desktop and unrecognized devices see the landing
page. Embedded iPhone browsers (including Threads and Instagram) keep the
information visible and use the App Store button instead of an automatic store
handoff. On iPhone, buttons attempt a direct native store link synchronously on
a user tap. A separate HTTPS link and Safari instructions remain available.
Manual interaction cancels a pending automatic redirect.
`/about.html` and `/?stay=1` bypass automatic routing.

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
diff, then commit and push. Do not manually edit generated HTML or marketing.js.

Porkbun DNS: apex ALIAS `evilevnikita.github.io`, www CNAME
`evilevnikita.github.io`, TTL 600. The Pages custom domain is `tfpmodels.app`.
Keep the .org DNS and repository custom domain unchanged.

Download homepages are indexable, with self-canonicals and reciprocal hreflang
on .app, and are listed in the .app sitemap. Android, legal pages, and the
duplicate /about.html stay noindex. Download copy lives in
`content/marketing-locales.json`; its template is `templates/marketing-home.html`.
Search indexing and search-result appearance are decided by the search engine.
Standard UTM
parameters survive the Android route and internal links. GA4 only loads after
consent, so fresh immediate iPhone redirects do not produce GA4 events and do
not measure installation. Store URLs and support email remain unchanged.
