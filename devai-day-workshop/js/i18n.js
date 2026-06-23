/**
 * DevAI Day Workshop - Internationalization (i18n)
 *
 * Client-side translation for a static, multi-page site.
 *
 * How it works:
 *  - Each page sets <body data-i18n-page="<name>"> to declare its namespace.
 *  - Dictionaries live in devai-day-workshop/i18n/<lang>/common.json and
 *    devai-day-workshop/i18n/<lang>/<name>.json. The page dict is merged on top
 *    of the shared common dict.
 *  - Elements are instrumented with:
 *      data-i18n="key"            -> sets textContent
 *      data-i18n-html="key"       -> sets innerHTML (for rich/inline markup)
 *      data-i18n-attr="attr:key,attr:key" -> sets attributes (aria-label, title,
 *                                            alt, content, placeholder, ...)
 *  - English (en) is the default and the fallback for any missing key.
 *  - The chosen language persists in localStorage and updates <html lang>.
 */
(function () {
  'use strict';

  const SUPPORTED = ['en', 'nl'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'devai-day-workshop-lang';

  // Resolve the i18n base directory relative to THIS script's location so the
  // same code works from the root index.html and from devai-day-workshop/*.
  // Script path: <root>/devai-day-workshop/js/i18n.js  ->  base = ../i18n/
  const scriptEl = document.currentScript;
  const scriptSrc = scriptEl ? scriptEl.src : '';
  const baseUrl = scriptSrc.replace(/js\/i18n\.js(?:\?.*)?$/, 'i18n/');

  const I18n = {
    lang: DEFAULT_LANG,
    fallback: {},   // English dict (used as fallback)
    current: {},    // Active-language dict
    listeners: [],

    // localStorage can throw (private mode, opaque origins). Never let
    // persistence failures break translation itself.
    readStored() {
      try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    },
    writeStored(value) {
      try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
    },

    detectInitial() {
      const saved = this.readStored();
      if (saved && SUPPORTED.includes(saved)) return saved;
      const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (nav.startsWith('nl')) return 'nl';
      return DEFAULT_LANG;
    },

    pageName() {
      const body = document.body;
      return (body && body.getAttribute('data-i18n-page')) || 'index';
    },

    async fetchDict(lang) {
      // Primary source: dictionaries embedded as JS bundles on window.I18N.
      // This works when the site is opened from disk (file://) where fetch() of
      // JSON is blocked by the browser. Fall back to fetching JSON only if the
      // embedded bundle is unavailable (e.g. served without its bundle script).
      if (window.I18N && window.I18N[lang]) {
        return window.I18N[lang];
      }
      const page = this.pageName();
      const urls = [baseUrl + lang + '/common.json', baseUrl + lang + '/' + page + '.json'];
      const merged = {};
      for (const url of urls) {
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (res.ok) {
            Object.assign(merged, await res.json());
          }
        } catch (err) {
          // Missing/blocked dict is non-fatal; fallback handling covers it.
          console.warn('[i18n] Could not load', url, err);
        }
      }
      return merged;
    },

    translate(key) {
      if (Object.prototype.hasOwnProperty.call(this.current, key)) return this.current[key];
      if (Object.prototype.hasOwnProperty.call(this.fallback, key)) return this.fallback[key];
      return null;
    },

    applyToDom(root) {
      const scope = root || document;

      scope.querySelectorAll('[data-i18n]').forEach((el) => {
        const val = this.translate(el.getAttribute('data-i18n'));
        if (val != null) el.textContent = val;
      });

      scope.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const val = this.translate(el.getAttribute('data-i18n-html'));
        if (val != null) el.innerHTML = val;
      });

      scope.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        const spec = el.getAttribute('data-i18n-attr');
        spec.split(',').forEach((pair) => {
          const idx = pair.indexOf(':');
          if (idx === -1) return;
          const attr = pair.slice(0, idx).trim();
          const key = pair.slice(idx + 1).trim();
          const val = this.translate(key);
          if (attr && val != null) el.setAttribute(attr, val);
        });
      });

      // <title> can be translated via a dedicated key.
      const titleKey = document.documentElement.getAttribute('data-i18n-title');
      if (titleKey) {
        const t = this.translate(titleKey);
        if (t != null) document.title = t;
      }
    },

    async setLang(lang, persist) {
      if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
      this.lang = lang;

      // Always have English available as a fallback.
      if (lang === DEFAULT_LANG) {
        this.fallback = await this.fetchDict(DEFAULT_LANG);
        this.current = this.fallback;
      } else {
        const [fb, cur] = await Promise.all([
          this.fetchDict(DEFAULT_LANG),
          this.fetchDict(lang),
        ]);
        this.fallback = fb;
        this.current = cur;
      }

      document.documentElement.setAttribute('lang', lang);
      if (persist !== false) this.writeStored(lang);

      this.applyToDom();
      this.updateSwitchers();
      this.listeners.forEach((fn) => {
        try { fn(lang); } catch (e) { /* no-op */ }
      });
    },

    // Public API used by the header language switcher(s).
    setLocale(lang) {
      return this.setLang(lang, true);
    },

    onChange(fn) {
      if (typeof fn === 'function') this.listeners.push(fn);
    },

    updateSwitchers() {
      document.querySelectorAll('[data-lang-switcher] select').forEach((sel) => {
        sel.value = this.lang;
      });
      document.querySelectorAll('[data-lang-option]').forEach((btn) => {
        const on = btn.getAttribute('data-lang-option') === this.lang;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    },

    bindSwitchers() {
      document.querySelectorAll('[data-lang-switcher] select').forEach((sel) => {
        sel.addEventListener('change', (e) => this.setLocale(e.target.value));
      });
      document.querySelectorAll('[data-lang-option]').forEach((btn) => {
        btn.addEventListener('click', () => this.setLocale(btn.getAttribute('data-lang-option')));
      });
    },

    async init() {
      this.lang = this.detectInitial();
      // Set lang attribute early to reduce flash before dictionaries arrive.
      document.documentElement.setAttribute('lang', this.lang);
      this.bindSwitchers();
      await this.setLang(this.lang, false);
    },
  };

  // Expose globally so main.js / inline scripts can call I18n.setLocale().
  window.I18n = I18n;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18n.init());
  } else {
    I18n.init();
  }
})();
