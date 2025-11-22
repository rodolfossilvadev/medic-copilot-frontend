import type { Diagnosis } from "../types/diagnosis.types";
import { postJson } from "./api";
import { getLang } from "../config/i18n";

// Envia transcrição + especialidade + idioma
export const diagnose = async (
  transcript: string,
  specialty: string
): Promise<Diagnosis> => {
  return postJson<
    Diagnosis,
    { transcript: string; specialty: string; lang: "pt" | "en" }
  >("/api/diagnose", {
    transcript,
    specialty,
    lang: getLang(), //  envia idioma atual
  });
};
