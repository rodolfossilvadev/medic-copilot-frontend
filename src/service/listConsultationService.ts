import {
  listConsultations,
  findConsultationById,
} from "../store/localConsultations";

// Retorna todas as consultas salvas
export function listConsultationService() {
  return listConsultations();
}

// Busca uma consulta específica pelo ID
export function getConsultation(id: string) {
  return findConsultationById(id);
}
