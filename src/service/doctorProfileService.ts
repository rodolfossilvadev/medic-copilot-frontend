import type { DoctorProfile } from "../types/doctor.types";

const STORAGE_KEY = "doctor_profile";

// Carrega perfil salvo no localStorage
export function loadDoctorProfile(): DoctorProfile {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) return JSON.parse(data);

  // Perfil inicial padrão
  return {
    name: "Dr. Rodolfo Silva",
    specialty: "Ortopedia",
    crm: "12345-PE",
    clinicPhone: "(81) 99999-0000",
  };
}

// Salva perfil e notifica UI para atualizar
export function saveDoctorProfile(profile: DoctorProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("doctorProfileUpdated"));
}
