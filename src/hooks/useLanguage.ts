import { useEffect, useState } from "react";
import { getLang, type Lang } from "../config/i18n";

/**
 * Retorna o idioma atual e re-renderiza quando ele muda.
 */
export function useLanguage(): Lang {
  const [lang, setLang] = useState<Lang>(getLang());

  useEffect(() => {
    const update = () => setLang(getLang());

    window.addEventListener("languageChanged", update);
    return () => window.removeEventListener("languageChanged", update);
  }, []);

  return lang;
}
