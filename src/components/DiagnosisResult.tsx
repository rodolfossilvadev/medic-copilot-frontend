import type { Diagnosis } from "../types/diagnosis.types";
import { CheckCircle, Stethoscope, Pill } from "lucide-react";
import { t } from "../config/i18n";

interface Props {
  diagnosis: Diagnosis;
}

export const DiagnosisResult = ({ diagnosis }: Props) => {
  return (
    <section
      id="diagnosis-result"
      className="border-primary-100 animate-fade-in-up mt-6 rounded-2xl border bg-white/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
    >
      {/* Cabeçalho */}
      <div className="mb-3 flex items-center gap-2">
        <Stethoscope className="text-primary-500" size={20} />
        <h2 className="text-text-300 text-lg font-bold">{t("diagnosis_result")}</h2>
      </div>

      {/* Diagnóstico principal */}
      <div className="mb-4">
        <h3 className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
          {t("probable_diagnosis")}
        </h3>

        <p className="text-text-300 mt-1 text-sm font-medium">
          {diagnosis.diagnosticoProvavel}
        </p>
      </div>

      {/* Doenças associadas */}
      {diagnosis.doencasAssociadas?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
            {t("associated_diseases")}
          </h3>

          <ul className="mt-2 flex flex-wrap gap-1.5">
            {diagnosis.doencasAssociadas.map((item: string, index: number) => (
              <li
                key={index}
                className="bg-primary-100 text-primary-500 rounded-full px-2 py-0.5 text-[11px] font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exames sugeridos */}
      {diagnosis.examesSugeridos?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
            {t("suggested_exams")}
          </h3>

          <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs md:grid-cols-2">
            {diagnosis.examesSugeridos.map((exam: string, index: number) => (
              <li
                key={index}
                className="text-text-700 border-primary-100 flex items-center gap-1.5 rounded-md border bg-white/60 p-2"
              >
                <CheckCircle size={14} className="text-primary-500" />
                {exam}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Medicamentos sugeridos */}
      {diagnosis.medicamentosComuns?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
            {t("suggested_meds")}
          </h3>

          <ul className="mt-2 flex flex-col gap-1.5 text-xs">
            {diagnosis.medicamentosComuns.map((med: string, index: number) => (
              <li
                key={index}
                className="border-primary-100 text-text-700 flex items-center gap-1.5 rounded-md border bg-white/60 p-2"
              >
                <Pill size={14} className="text-primary-500" />
                {med}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Observação */}
      {diagnosis.observacao && (
        <div className="mt-3">
          <h3 className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
            {t("observations")}
          </h3>

          <p className="text-text-700 mt-1 text-xs">{diagnosis.observacao}</p>
        </div>
      )}

      {/* Erro */}
      {diagnosis.error && (
        <p className="mt-3 text-xs font-semibold text-red-600">
          {t("error")}: {diagnosis.error}
        </p>
      )}
    </section>
  );
};
