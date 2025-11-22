import type { Consultation } from "../types/consultation.types";

const STORAGE_KEY = "consultations";

// Carrega lista do localStorage
export function loadConsultations(): Consultation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Salva lista completa
export function saveConsultations(list: Consultation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Adiciona nova consulta
export function addConsultation(newConsult: Consultation): Consultation {
  const list = loadConsultations();
  list.push(newConsult);
  saveConsultations(list);
  return newConsult;
}

// Retorna todas as consultas
export function listConsultations(): Consultation[] {
  return loadConsultations();
}

// Busca consulta por ID
export function findConsultationById(id: string): Consultation | null {
  return loadConsultations().find((c) => c.id === id) || null;
}
