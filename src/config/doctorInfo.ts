import { loadDoctorProfile } from "../service/doctorProfileService";
import { getLang } from "../config/i18n";
import type { DoctorProfile } from "../types/doctor.types";

/**
 * Carrega informações do médico
 * é usado apenas como valor estático
 * e atualizações acontecem pelos eventos
 */
export const DOCTOR_INFO: DoctorProfile = loadDoctorProfile();

/**
 * Retorna um texto de uso padrão para medicamentos.
 * Essa função é usada como mock.
 */
export function getUsageMock(medicine: string): string {
  const lang = getLang();

  return lang === "en"
    ? `Use ${medicine}: 1 dose every 8 hours for 5 days.`
    : `Usar ${medicine}: 1 dose a cada 8 horas por 5 dias.`;
}
