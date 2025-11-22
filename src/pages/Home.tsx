import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DiagnosisResult } from "../components/DiagnosisResult";
import type { Diagnosis } from "../types/diagnosis.types";
import { diagnose } from "../service/diagnosisService";
import { SpecialtySelect } from "../components/SpecialtySelect";
import { AudioRecorderButton } from "../components/AudioRecorderButton";

import type {
  SpeakerMessage,
  SpeakerMessageList,
  ConsultationMeta,
} from "../types/consultation.types";

import { saveConsultation } from "../service/saveConsultationService";
import { useNavigate } from "react-router-dom";
import { GeneratePrescriptionButton } from "../components/GeneratePrescriptionButton";
import { UsageGuideSection } from "../components/UsageGuideSection";

import { t } from "../config/i18n";
import { useLanguage } from "../hooks/useLanguage";

const Home = () => {
  useLanguage(); // traduzido em tempo real

  const navigate = useNavigate();

  const [transcript, setTranscript] = useState("");
  const [transcriptSpeaker, setTranscriptSpeaker] = useState<SpeakerMessageList>([]);
  const [specialty, setSpecialty] = useState<ConsultationMeta["specialty"]>("general");
  const [patientName, setPatientName] = useState("");

  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [savedConsultationId, setSavedConsultationId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const formatSpeaker = (messages: SpeakerMessage[]) =>
    messages
      .map(
        (msg) => `${msg.speaker === "medico" ? t("doctor") : t("patient")}: ${msg.text}`
      )
      .join("\n");

  const handleSubmit = async () => {
    setLoading(true);
    setDiagnosis(null);
    setSavedConsultationId(null);

    try {
      const result = await diagnose(transcript, specialty);
      setDiagnosis(result);

      const saved = await saveConsultation({
        patientName,
        transcript,
        transcriptSpeaker,
        diagnosis: result,
        queries: [],
        meta: { language: "pt", specialty },
      });

      setSavedConsultationId(saved.id);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setTranscript("");
    setTranscriptSpeaker([]);
    setSpecialty("general");
    setPatientName("");
    setDiagnosis(null);
    setSavedConsultationId(null);
  };

  const handleGeneratePrescription = () => {
    if (savedConsultationId) navigate(`/prescription/${savedConsultationId}`);
  };

  // Extensão do Chrome
  useEffect(() => {
    const listener = (msg: { type: string; text: string }) => {
      if (msg.type === "TRANSCRIPTION_FROM_EXTENSION") {
        setTranscript(msg.text);
        setDiagnosis(null);
      }
    };

    window.chrome?.runtime?.onMessage.addListener(listener);
    return () => window.chrome?.runtime?.onMessage.removeListener(listener);
  }, []);

  // Scroll suave até o diagnóstico
  useEffect(() => {
    if (diagnosis) {
      setTimeout(() => {
        const el = document.getElementById("diagnosis-result");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [diagnosis]);

  return (
    <div className="to-primary-100/40 min-h-screen w-full bg-linear-to-br from-white p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-5">
        {/* Coluna Esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center sm:ml-14 sm:items-start sm:text-start md:col-span-2"
        >
          <img src="/logo-mc.png" className="-mt-10 w-40 sm:w-70" />

          <h1 className="text-primary-600 -mt-6 mb-2 text-xl font-bold sm:-mt-14 sm:text-3xl">
            {t("home_header")}
          </h1>

          <p className="text-text-700 max-w-[300px] text-sm sm:max-w-[380px] sm:text-base">
            {t("home_intro")}
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.main
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="border-primary-100 relative max-w-full rounded-3xl border bg-white/70 px-8 py-10 shadow-xl backdrop-blur-2xl md:col-span-3"
        >
          <h2 className="text-primary-600 -mt-4 mb-4 text-center text-2xl font-semibold sm:text-3xl">
            {t("home_title")}
          </h2>

          {/* Nome + Especialidade */}
          <div className="mt-2 flex items-end gap-4">
            <div className="flex-1">
              <label className="text-text-700 mb-1 block text-sm font-medium">
                {t("patient_name")}
              </label>

              <input
                type="text"
                className="border-primary-100 text-text-300 focus:ring-primary-400 w-full rounded-full border bg-white/60 px-4 py-3 text-sm outline-none focus:ring-1"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={t("patient_placeholder")}
              />
            </div>

            <div className="w-1/3 min-w-[130px]">
              <SpecialtySelect value={specialty} onChange={setSpecialty} />
            </div>
          </div>

          {/* Transcrição */}
          <label className="text-text-700 mt-6 mb-1 block text-sm font-medium">
            {t("consultation_text")}
          </label>

          <textarea
            className="border-primary-100 text-text-300 focus:ring-primary-400 min-h-26 w-full rounded-2xl border bg-white/60 px-4 py-2 text-sm outline-none focus:ring-1 sm:min-h-38"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={t("consultation_placeholder")}
          />

          {/* Botão de áudio */}
          <AudioRecorderButton
            onTranscript={(_txt, speaker) => {
              setTranscript(formatSpeaker(speaker));
              setTranscriptSpeaker(speaker);
              setDiagnosis(null);
            }}
            className="absolute right-3 bottom-40 sm:bottom-24"
          />

          {/* Botões */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={transcript.trim().length < 10 || loading}
              className="from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 cursor-pointer rounded-full bg-linear-to-r px-6 py-3 font-semibold text-white shadow-lg transition disabled:opacity-60"
            >
              {loading ? t("loading_diagnosis") : t("generate_diagnosis")}
            </button>

            <button
              onClick={handleNew}
              className="text-text-300 cursor-pointer rounded-full bg-slate-200 px-6 py-3 transition hover:bg-slate-300"
            >
              {t("new_consult")}
            </button>
          </div>
        </motion.main>
      </div>

      {/* Resultado */}
      {diagnosis && (
        <motion.div
          id="diagnosis-result"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <DiagnosisResult diagnosis={diagnosis} />

          {savedConsultationId && (
            <div className="mt-4 flex justify-center sm:mt-2">
              <GeneratePrescriptionButton
                onClick={handleGeneratePrescription}
                className="bg-primary-600 hover:bg-primary-700 rounded-full px-6 py-3 text-white shadow-lg"
              />
            </div>
          )}
        </motion.div>
      )}

      <UsageGuideSection />

      {/* Toast */}
      {showToast && (
        <div className="animate-fade-in-up fixed right-6 bottom-6 rounded-lg bg-green-400 px-4 py-2 text-white shadow-lg">
          {t("saved_consult")}
        </div>
      )}
    </div>
  );
};

export default Home;
