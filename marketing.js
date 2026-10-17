// Included only in the separate tfpmodels.app publication.
(() => {
  const hosts = ['tfpmodels.app', 'www.tfpmodels.app', 'localhost', '127.0.0.1'];
  if (!hosts.includes(location.hostname)) return;
  const params = new URLSearchParams(location.search);
  const reservedPaths = ["en", "ru", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "about", "android", "ios", "download", "install", "support", "privacy", "terms", "community-guidelines", "account", "delete-account", "auth", "login", "logout", "signup", "settings", "admin", "api", "assets", "static", "images", "css", "js", "fonts", "creator", "profile", "index.html", "about.html", "android.html", "privacy.html", "support.html", "community-guidelines.html", "robots.txt", "sitemap.xml", "favicon.png", "apple-touch-icon.png", "marketing.js", "languages.js", "styles.css", "analytics.js", "analytics.css", "android.js", "android.css", ".well-known"];
  const pathID = location.pathname.slice(1);
  const creator = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,127}$/.test(pathID) && !reservedPaths.includes(pathID.toLowerCase()) ? pathID : null;
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  const supported = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt-BR', 'ru'];
  const pathLanguage = supported.find(code => {
    const prefix = '/' + code.toLowerCase();
    return [prefix, prefix + '/', prefix + '/index.html'].includes(location.pathname);
  });
  const ua = navigator.userAgent || '';
  const preview = /bot|crawler|spider|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot/i.test(ua);
  const entry = Boolean(creator) || location.pathname === '/' || location.pathname === '/index.html' || Boolean(pathLanguage);
  const iphone = /iPhone|iPod/i.test(ua);
  let destination;
  if (entry && !creator && params.get('stay') !== '1' && !preview) {
    if (iphone) {
      destination = 'https://apps.apple.com/app/tfp-models/id6766621647';
    } else if (/Android/i.test(ua) || navigator.userAgentData?.platform === 'Android') {
      destination = 'https://play.google.com/store/apps/details?id=tfpmodels.app';
    }
  }

  // Keep campaign attribution on internal navigation.
  // Store URLs are left untouched.
  function start() {
    for (const link of document.querySelectorAll('a[href]')) {
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) continue;
      for (const key of campaignKeys) {
        if (params.has(key)) url.searchParams.set(key, params.get(key));
      }
      if (creator && supported.some(code => url.pathname === '/' + code.toLowerCase() + '/') || creator && url.pathname === '/') {
        url.pathname = '/' + creator;
        url.searchParams.set('lang', supported.find(code => '/' + code.toLowerCase() + '/' === new URL(link.href, location.href).pathname) || 'en');
      }
      link.href = url.href;
    }
    if (entry && creator && !preview) {
      const labels = {
        en: 'Open profile in the app', ru: 'Открыть профиль в приложении',
        de: 'Profil in der App öffnen', es: 'Abrir perfil en la app',
        fr: 'Ouvrir le profil dans l’application', it: 'Apri il profilo nell’app',
        ja: 'アプリでプロフィールを開く', ko: '앱에서 프로필 열기',
        pl: 'Otwórz profil w aplikacji', 'pt-BR': 'Abrir perfil no aplicativo'
      };
      const link = document.createElement('a');
      link.className = 'button button--download';
      link.textContent = labels[supported.includes(params.get('lang')) ? params.get('lang') : pathLanguage || 'en'];
      link.href = 'cocreatix://creator/' + encodeURIComponent(creator);
      link.id = 'open-shared-profile';
      document.querySelector('.hero__downloads')?.prepend(link);
    }
    if (!destination) return;
    let interacted = false;
    document.addEventListener('pointerdown', () => { interacted = true; }, { once: true });
    document.addEventListener('keydown', () => { interacted = true; }, { once: true });
    // Two frames allow a complete paint before any navigation starts. The
    // short delay keeps the information and manual buttons visible first.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setTimeout(() => {
        if (interacted) return;
        try { location.replace(destination); } catch (_) { /* Manual buttons remain available. */ }
      }, 350);
    }));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
