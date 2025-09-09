import i18next, { type i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON resources
// Astro/Vite permite importar JSON directamente
import en from '../locales/en/translation.json';
import es from '../locales/es/translation.json';

let initialized = false;

export async function initI18n(): Promise<i18n> {
  if (initialized) return i18next;

  i18next
    .use(LanguageDetector)
    .init({
      resources: {
        en: { translation: en },
        es: { translation: es },
      },
      fallbackLng: 'en',
      detection: {
        // Usa navigator.language y localStorage
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false, // permitimos HTML controlado en algunas claves
      },
      returnEmptyString: false,
    });

  initialized = true;
  return i18next;
}

export function applyTranslations(root: ParentNode = document): void {
  // Texto plano
  const nodes = root.querySelectorAll<HTMLElement>('[data-i18n]');
  nodes.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.textContent = i18next.t(key);
  });

  // HTML
  const htmlNodes = root.querySelectorAll<HTMLElement>('[data-i18n-html]');
  htmlNodes.forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    el.innerHTML = i18next.t(key, { interpolation: { escapeValue: false } });
  });

  // Atributos
  const attrNodes = root.querySelectorAll<HTMLElement>('[data-i18n-attr]');
  attrNodes.forEach((el) => {
    const mapping = el.getAttribute('data-i18n-attr'); // por ejemplo: "title:title.key;aria-label:aria.key"
    if (!mapping) return;
    mapping.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (attr && key) {
        el.setAttribute(attr.trim(), i18next.t(key.trim()));
      }
    });
  });

  // Título del documento
  const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
  if (titleKey) {
    document.title = i18next.t(titleKey);
  }

  // lang del documento
  document.documentElement.lang = (i18next.language || 'en').split('-')[0];
}

export { i18next };
