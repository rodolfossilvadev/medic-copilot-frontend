// Tipos relacionados a mensagens com identificação de falante
import type { Diagnosis } from "./diagnosis.types";

// Mensagem com identificação de quem falou
export type SpeakerMessage = {
  speaker: "paciente" | "medico";
  text: string;
};

// Lista de mensagens
export type SpeakerMessageList = SpeakerMessage[];

// Função que recebe texto e retorna lista de fal falantes
export type SpeakerMessageFn = (
  transcript: string
) => Promise<SpeakerMessageList>;

// Tipos usados para registrar perguntas feitas durante a consulta
export interface Queries {
  id: string;
  speaker: "doctor" | "patient";
  text: string;
  timestamp: number;
}

// Metadados da consulta (inclui idioma e especialidade)
export interface ConsultationMeta {
  language: "pt" | "en"; // multilíngue
  specialty:
    | "general"
    | "cardiology"
    | "pediatrics"
    | "psychiatry"
    | "endocrinology"
    | "gynecology"
    | "orthopedics";
  createdAt: string;
}

// Estrutura completa de uma consulta salva
export interface Consultation {
  id: string;
  patientName: string;
  transcript: string;
  transcriptSpeaker?: SpeakerMessageList;
  queries: Queries[];
  diagnosis: Diagnosis;
  meta: ConsultationMeta;
}

// Payload para salvar uma nova consulta
export interface SaveConsultationPayload {
  patientName: string;
  transcript: string;
  transcriptSpeaker?: SpeakerMessageList;
  diagnosis: Diagnosis;
  queries: Queries[];
  meta: {
    language: "pt" | "en";
    specialty: ConsultationMeta["specialty"];
  };
}
