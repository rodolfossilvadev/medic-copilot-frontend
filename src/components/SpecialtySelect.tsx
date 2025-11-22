import type { ConsultationMeta } from "../types/consultation.types";
import { translateSpecialty, t } from "../config/i18n";

interface SpecialtySelectProps {
  value: ConsultationMeta["specialty"]; // valor atual
  onChange: (value: ConsultationMeta["specialty"]) => void; // callback
  className?: string; // estilo opcional
}

// Lista de especialidades suportadas pelo sistema
const specialties: ConsultationMeta["specialty"][] = [
  "general",
  "cardiology",
  "pediatrics",
  "psychiatry",
  "endocrinology",
  "gynecology",
  "orthopedics",
];

export const SpecialtySelect = ({
  value,
  onChange,
  className = "",
}: SpecialtySelectProps) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Label traduzido corretamente */}
      <label className="text-text-700 mb-1 block text-sm font-medium">
        {t("specialty")}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as ConsultationMeta["specialty"])}
          className="border-primary-100 text-text-300 focus:ring-primary-400 w-full cursor-pointer appearance-none rounded-full border bg-white/70 px-4 py-3 pr-10 text-sm backdrop-blur-xl transition focus:border-transparent focus:ring-1 focus:outline-none"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {translateSpecialty(spec)}
            </option>
          ))}
        </select>

        <span className="text-text-700 pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs">
          ▼
        </span>
      </div>
    </div>
  );
};
