# TFP Models marketing site

Published separately at https://tfpmodels.app using GitHub Pages, `main` / root.
The existing https://www.tfpmodels.org publication remains separate.

All localized homepages paint the download page first, then attempts an ordinary HTTPS
App Store redirect on iPhone or routes Android directly to Google Play.
Manual interaction cancels the automatic redirect. Desktop, iPad, bots,
/about.html and ?stay=1 retain the page. Ordinary download
buttons remain available when automatic navigation is blocked. Ordinary visits use no custom protocols. Valid ?creator= links keep the download page
visible and add a user-initiated profile button using the existing cocreatix scheme.
Install links stay available; no deferred deep link after installation is promised.

iOS DEV and PROD Universal Links use `.well-known/apple-app-site-association`,
generated from `content/apple-app-site-association.json`. Only root URLs with a
nonempty creator query match. Both apps need the applinks:tfpmodels.app entitlement
and an updated provisioning profile/build. Apple CDN caching and user browser
preferences affect when the association becomes available.

Android App Links are verified through `.well-known/assetlinks.json`, generated
from `content/android-assetlinks.json`. Public certificate fingerprints were read
from Play Console (all app-signing SHA-256 certificates) and Gradle signingReport
on 2026-10-17. DEV debug/release, public PROD Play/local release and private local
PROD are supported. No private signing keys are published.
Android 15+ dynamic rules restrict opening to root URLs with a creator query.
Older Android versions match the root path, so the plain homepage can also open
the app; other site paths remain web pages. If multiple variants are installed,
Android/user link preferences determine which one opens. A new app build is required.

Download pages use ten-language content
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
