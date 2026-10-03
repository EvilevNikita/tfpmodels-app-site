# TFP Models marketing site

Published separately at https://tfpmodels.app using GitHub Pages, `main` / root.
The existing https://www.tfpmodels.org publication remains separate.

The download page stays visible on every device. For iPhone links directly to
https://apps.apple.com/app/tfp-models/id6766621647; For Android links to the local
installation guide. All links use ordinary HTTPS with no automatic routing,
custom protocols, or external-browser handoff.

Android installation instructions and download pages use ten-language content
from [tfpmodels-site](https://github.com/EvilevNikita/tfpmodels-site).
This repository contains generated deployable files. To update them, run in
the source repository:

```sh
python3 scripts/generate_marketing_site.py --output ../tfpmodels-app-site
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
