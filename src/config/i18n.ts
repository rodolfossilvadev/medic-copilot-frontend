// Sistema de idioma — i18n
// A chave usada no localStorage
const STORAGE_KEY = "mednote_lang";

// Tipagem explícita dos idiomas suportados
export type Lang = "pt" | "en";

// Obtém o idioma salvo — fallback sempre "pt"
export const getLang = (): Lang => {
  const lang = localStorage.getItem(STORAGE_KEY);
  return lang === "en" ? "en" : "pt";
};

// Atualiza idioma e dispara evento global
export const setLang = (lang: Lang): void => {
  localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new Event("languageChanged"));
};

// especialidades — traducao

export const SPECIALTIES_MAP: Record<string, Record<Lang, string>> = {
  general: { pt: "Clínico Geral", en: "General Practitioner" },
  cardiology: { pt: "Cardiologia", en: "Cardiology" },
  dermatology: { pt: "Dermatologia", en: "Dermatology" },
  pediatrics: { pt: "Pediatria", en: "Pediatrics" },
  neurology: { pt: "Neurologia", en: "Neurology" },
  gynecology: { pt: "Ginecologia", en: "Gynecology" },
  orthopedics: { pt: "Ortopedia", en: "Orthopedics" },
  endocrinology: { pt: "Endocrinologia", en: "Endocrinology" },
  psychiatry: { pt: "Psiquiatria", en: "Psychiatry" },
  ophthalmology: { pt: "Oftalmologia", en: "Ophthalmology" },
  urology: { pt: "Urologia", en: "Urology" },
  gastro: { pt: "Gastroenterologia", en: "Gastroenterology" },
};

// Traduz especialidade
export const translateSpecialty = (code: string): string => {
  const lang = getLang();
  return SPECIALTIES_MAP[code]?.[lang] ?? code;
};

// Textos globais

// Tipagem da tabela UI_TEXT
export type UITextTable = Record<string, Record<Lang, string>>;

export const UI_TEXT: UITextTable = {
  // Home
  home_title: { pt: "Nova Consulta", en: "New Consultation" },
  home_intro: {
    pt: "Registre consultas automaticamente, gere diagnósticos em segundos e mantenha tudo organizado.",
    en: "Automatically record consultations, generate diagnoses in seconds and keep everything organized.",
  },

  // Prescription keys
  loading: { pt: "Carregando...", en: "Loading..." },
  export_pdf: { pt: "Exportar PDF", en: "Export PDF" },

  // SaveConsultationService
  default_patient: { pt: "Paciente", en: "Patient" },

  // Profile
  doctor_name: { pt: "Nome", en: "Name" },
  clinic_phone: { pt: "Telefone da Clínica", en: "Clinic Phone" },
  profile_saved: {
    pt: "Perfil atualizado com sucesso!",
    en: "Profile updated successfully!",
  },

  doctor: { pt: "Médico", en: "Doctor" },
  home_header: {
    pt: "O copiloto inteligente para suas consultas médicas.",
    en: "The intelligent copilot for your medical consultations.",
  },
  patient_name: { pt: "Nome do Paciente", en: "Patient Name" },
  patient_placeholder: {
    pt: "Ex: Daniela Souza",
    en: "Ex: Daniel Smith",
  },

  consultation_text: { pt: "Texto da consulta", en: "Consultation text" },
  consultation_placeholder: {
    pt: "Ex: Paciente relata dor de cabeça há 2 dias...",
    en: "Ex: Patient reports headache for 2 days...",
  },

  loading_diagnosis: {
    pt: "Gerando diagnóstico...",
    en: "Generating diagnosis...",
  },

  saved_consult: {
    pt: "Consulta salva automaticamente!",
    en: "Consultation saved automatically!",
  },

  // Consultations page
  consultations_title: {
    pt: "Consultas Anteriores",
    en: "Previous Consultations",
  },

  consultations_subtitle: {
    pt: "Aqui estão suas consultas anteriores e seus detalhes.",
    en: "Here are your past consultations and their details.",
  },

  // Profile page
  profile_title: { pt: "Perfil do Médico", en: "Doctor Profile" },
  save_changes: { pt: "Salvar Alterações", en: "Save Changes" },

  // Buttons
  generate_diagnosis: {
    pt: "Gerar Diagnóstico",
    en: "Generate Diagnosis",
  },

  new_consult: { pt: "Nova Consulta", en: "New Consultation" },
  generate_prescription: {
    pt: "Gerar Receita",
    en: "Generate Prescription",
  },
  back: { pt: "Voltar", en: "Back" },

  // DiagnosisResult
  diagnosis_result: {
    pt: "Resultado do Diagnóstico",
    en: "Diagnosis Result",
  },

  probable_diagnosis: {
    pt: "Diagnóstico Provável",
    en: "Probable Diagnosis",
  },

  associated_diseases: {
    pt: "Doenças Associadas",
    en: "Associated Diseases",
  },

  suggested_exams: {
    pt: "Exames Sugeridos",
    en: "Suggested Exams",
  },

  suggested_meds: {
    pt: "Medicamentos Sugeridos",
    en: "Suggested Medications",
  },

  observations: { pt: "Observações", en: "Observations" },
  error: { pt: "Erro", en: "Error" },

  // ConsultationDetails
  consultation_not_found: {
    pt: "Consulta não encontrada.",
    en: "Consultation not found.",
  },

  not_informed: { pt: "Não informado", en: "Not informed" },

  consultation_title: {
    pt: "Consulta Médica",
    en: "Medical Consultation",
  },

  professional: { pt: "Profissional", en: "Professional" },
  patient: { pt: "Paciente", en: "Patient" },
  specialty: { pt: "Especialidade", en: "Specialty" },

  transcription: {
    pt: "CONSULTA (TRANSCRIÇÃO)",
    en: "CONSULTATION (TRANSCRIPTION)",
  },

  no_info: { pt: "Nenhuma informação.", en: "No information." },
  no_exams: { pt: "Nenhum exame sugerido.", en: "No suggested exams." },
  no_meds: {
    pt: "Nenhum medicamento sugerido.",
    en: "No suggested medications.",
  },

  // UsageGuideSection
  guide_title: {
    pt: "Como usar o MedCopilot no dia a dia",
    en: "How to use MedCopilot daily",
  },

  guide_step1_title: {
    pt: "1. Configure seu perfil",
    en: "1. Set up your profile",
  },

  guide_step1_desc: {
    pt: "Preencha seus dados médicos na aba Perfil. Eles serão usados automaticamente na geração das receitas.",
    en: "Fill your medical information in the Profile tab. It will auto-fill prescriptions.",
  },

  guide_step2_title: {
    pt: "2. Inicie uma nova consulta",
    en: "2. Start a new consultation",
  },

  guide_step2_desc: {
    pt: "Informe o nome do paciente, escolha a especialidade e prepare-se para registrar a consulta.",
    en: "Enter the patient's name, choose a specialty, and get ready to record the consultation.",
  },

  guide_step3_title: {
    pt: "3. Grave ou digite a consulta",
    en: "3. Record or type the consultation",
  },

  guide_step3_desc: {
    pt: "Use o botão de microfone para transcrever a conversa ou escreva manualmente.",
    en: "Use the microphone to transcribe the conversation or type manually.",
  },

  guide_step4_title: {
    pt: "4. Gere o diagnóstico com IA",
    en: "4. Generate diagnosis with AI",
  },

  guide_step4_desc: {
    pt: "A IA identifica doenças associadas, exames sugeridos e medicamentos comuns.",
    en: "AI identifies associated diseases, suggested exams and common medications.",
  },

  guide_step5_title: {
    pt: "5. Gere a receita automaticamente",
    en: "5. Generate the prescription automatically",
  },

  guide_step5_desc: {
    pt: "Com um clique o sistema cria uma receita estruturada com seus dados e os do paciente.",
    en: "With one click the system creates a structured prescription with your data and the patient's.",
  },

  guide_step6_title: {
    pt: "6. Consulte o histórico",
    en: "6. Check the history",
  },

  guide_step6_desc: {
    pt: "Veja consultas anteriores, acesse o detalhamento e gere novas receitas a partir delas.",
    en: "See previous consultations, access full details and generate new prescriptions from them.",
  },
};
// Função principal de tradução

export const t = (key: keyof typeof UI_TEXT): string => {
  const lang = getLang();
  return UI_TEXT[key][lang] ?? UI_TEXT[key].pt;
};
