import type {
  Consultation,
  SaveConsultationPayload,
} from "../types/consultation.types";
import { addConsultation } from "../store/localConsultations";
import { t } from "../config/i18n";

// Gera ID compatível com navegadores antigos
function generateId() {
  return (
    crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  );
}

export async function saveConsultation(
  payload: SaveConsultationPayload
): Promise<Consultation> {
  const newConsult: Consultation = {
    id: generateId(),

    // Nome padrão multilíngue
    patientName: payload.patientName || t("default_patient"),

    transcript: payload.transcript || "",
    transcriptSpeaker: payload.transcriptSpeaker ?? [],
    diagnosis: payload.diagnosis,
    queries: payload.queries ?? [],

    meta: {
      ...payload.meta,
      createdAt: new Date().toISOString(), // data atual
    },
  };

  return addConsultation(newConsult); // salva no localStorage
}
