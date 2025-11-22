import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConsultation } from "../service/listConsultationService";
import type { Consultation } from "../types/consultation.types";
import type { Diagnosis } from "../types/diagnosis.types";
import { GeneratePrescriptionButton } from "../components/GeneratePrescriptionButton";
import { Calendar, Clock, Stethoscope, User } from "lucide-react";
import { loadDoctorProfile } from "../service/doctorProfileService";
import { t, getLang, translateSpecialty } from "../config/i18n";
import { diagnose } from "../service/diagnosisService";

const ConsultationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Carrega consulta
  const [consultation] = useState<Consultation | null>(() => {
    if (!id) return null;
    return getConsultation(id);
  });

  // Estado do diagnóstico
  const [diagnosis, setDiagnosis] = useState<Diagnosis>(
    consultation?.diagnosis ?? {
      diagnosticoProvavel: t("not_informed"),
      doencasAssociadas: [],
      examesSugeridos: [],
      medicamentosComuns: [],
      observacao: "",
    }
  );

  // Recalcula diagnóstico quando o idioma muda
  useEffect(() => {
    if (!consultation) return;

    const handler = async () => {
      const result = await diagnose(consultation.transcript, consultation.meta.specialty);
      setDiagnosis(result);
    };

    window.addEventListener("languageChanged", handler);
    return () => window.removeEventListener("languageChanged", handler);
  }, [consultation]);

  // Só retorna mensagem de erro DEPOIS dos hooks
  if (!consultation) {
    return (
      <div className="p-8 text-center text-red-600">{t("consultation_not_found")}</div>
    );
  }

  const lang = getLang();
  const dateObj = new Date(consultation.meta.createdAt);
  const doctor = loadDoctorProfile();
  const specialtyDisplay = translateSpecialty(consultation.meta.specialty);

  return (
    <div className="to-primary-100/40 min-h-screen bg-linear-to-br from-white p-6">
      <div className="border-primary-100 animate-fade-in-up mx-auto max-w-5xl rounded-3xl border bg-white/70 px-10 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
        {/* Titulo + data */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-text-300 text-3xl font-bold">
              {t("consultation_title")}
            </h1>

            <div className="text-text-700 mt-3 flex gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary-500" size={18} />
                {dateObj.toLocaleDateString(lang)}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-primary-500" size={18} />
                {dateObj.toLocaleTimeString(lang, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Card paciente e medico */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Profissional */}
          <div className="border-primary-100 flex items-center gap-4 rounded-2xl border bg-white/80 p-6 shadow-sm">
            <div className="bg-primary-100 text-primary-500 flex h-12 w-12 items-center justify-center rounded-full">
              <Stethoscope size={22} />
            </div>

            <div>
              <p className="text-text-700 mb-1 text-xs font-semibold tracking-wider">
                {t("professional")}
              </p>

              <p className="text-text-300 text-base font-semibold">{doctor.name}</p>

              <p className="text-primary-500 text-sm">
                {translateSpecialty(doctor.specialty)}
              </p>

              <p className="text-text-700 mt-1 text-xs">CRM: {doctor.crm}</p>
            </div>
          </div>

          {/* Paciente */}
          <div className="border-primary-100 flex items-center gap-4 rounded-2xl border bg-white/80 p-6 shadow-sm">
            <div className="bg-primary-100 text-primary-500 flex h-12 w-12 items-center justify-center rounded-full">
              <User size={22} />
            </div>

            <div>
              <p className="text-text-700 mb-1 text-xs font-semibold tracking-wider">
                {t("patient")}
              </p>

              <p className="text-text-300 text-base font-semibold">
                {consultation.patientName}
              </p>

              <p className="text-primary-500 text-sm">
                {t("specialty")}: {specialtyDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Doencas associadas */}
        <section className="mb-10">
          <h3 className="text-text-700 mb-3 text-xs font-semibold tracking-[0.15em]">
            {t("associated_diseases")}
          </h3>

          {diagnosis.doencasAssociadas.length === 0 ? (
            <p className="text-text-700 text-sm">{t("no_info")}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {diagnosis.doencasAssociadas.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-primary-100 text-primary-500 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Transcrição */}
        <section className="mb-10">
          <h3 className="text-text-700 mb-3 text-xs font-semibold tracking-[0.15em]">
            {t("transcription")}
          </h3>

          <div className="border-primary-100 rounded-2xl border bg-white/70 p-5 shadow-sm">
            {consultation.transcriptSpeaker?.length ? (
              <ul className="text-text-700 space-y-2 text-sm">
                {consultation.transcriptSpeaker.map((msg, i) => (
                  <li key={i}>
                    <strong className="text-primary-500">
                      {msg.speaker === "medico" ? t("professional") : t("patient")}:
                    </strong>{" "}
                    {msg.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-700 text-sm">{consultation.transcript}</p>
            )}
          </div>

          {diagnosis.observacao && (
            <p className="text-text-700 mt-3 text-sm">
              <span className="text-primary-500 font-medium">{t("observations")}:</span>{" "}
              {diagnosis.observacao}
            </p>
          )}
        </section>

        {/* Exames sugeridos */}
        <section className="mb-10">
          <h3 className="text-text-700 mb-3 text-xs font-semibold tracking-[0.15em]">
            {t("suggested_exams")}
          </h3>

          {diagnosis.examesSugeridos.length === 0 ? (
            <p className="text-text-700 text-sm">{t("no_exams")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {diagnosis.examesSugeridos.map((exam: string, idx: number) => (
                <div
                  key={idx}
                  className="border-primary-100 text-text-300 rounded-2xl border bg-white/80 px-4 py-3 text-sm shadow-sm"
                >
                  {exam}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Medicamentos sugeridos */}
        <section className="mb-10">
          <h3 className="text-text-700 mb-3 text-xs font-semibold tracking-[0.15em]">
            {t("suggested_meds")}
          </h3>

          {diagnosis.medicamentosComuns.length === 0 ? (
            <p className="text-text-700 text-sm">{t("no_meds")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {diagnosis.medicamentosComuns.map((med: string, idx: number) => (
                <div
                  key={idx}
                  className="border-primary-100 text-text-300 rounded-2xl border bg-white/80 px-4 py-3 text-sm shadow-sm"
                >
                  {med}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Botoes */}
        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row">
          <button
            onClick={() => navigate("/consultations")}
            className="text-text-300 cursor-pointer rounded-full bg-slate-200 px-6 py-3 transition hover:bg-slate-300"
          >
            ← {t("back")}
          </button>

          <GeneratePrescriptionButton
            consultationId={consultation.id}
            className="bg-primary-500 hover:bg-primary-600 rounded-full px-6 py-3 text-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetails;
