import type { Consultation } from "../types/consultation.types";
import { GeneratePrescriptionButton } from "./GeneratePrescriptionButton";
import { getLang, translateSpecialty } from "../config/i18n";

interface Props {
  data: Consultation;
  onOpen: (id: string) => void;
}

export function ConsultationCard({ data, onOpen }: Props) {
  // Data da consulta
  const dateObj: Date = new Date(data.meta.createdAt);

  // Mês traduzido conforme idioma
  const month: string = dateObj
    .toLocaleDateString(getLang(), { month: "short" })
    .toUpperCase();

  const day: number = dateObj.getDate();

  // Especialidade conforme idioma
  const specialtyDisplay: string = translateSpecialty(data.meta.specialty);

  return (
    <div
      className="border-primary-100 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border bg-white/60 px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl transition hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]"
      onClick={(): void => onOpen(data.id)}
    >
      {/* Lado esquerdo */}
      <div className="flex items-center gap-4">
        {/* Data formatada */}
        <div className="bg-primary-100 text-primary-500 border-primary-200 flex h-14 w-14 flex-col items-center justify-center rounded-xl border font-semibold shadow-inner">
          <span className="text-[10px] tracking-wide">{month}</span>
          <span className="text-xl">{day}</span>
        </div>

        {/* Informação do paciente */}
        <div>
          <h3 className="text-text-300 text-lg leading-tight font-semibold">
            {data.patientName}
          </h3>

          <p className="text-primary-500 text-sm">{specialtyDisplay}</p>

          {/* Data e hora conforme idioma */}
          <p className="text-text-700 mt-1 text-xs">
            {dateObj.toLocaleDateString(getLang())} —{" "}
            {dateObj.toLocaleTimeString(getLang(), {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Botão para gerar receita */}
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
          e.stopPropagation(); // evita abrir consulta ao clicar no botão
        }}
      >
        <GeneratePrescriptionButton
          consultationId={data.id}
          className="bg-primary-500 hover:bg-primary-600 rounded-full px-5 py-2 text-white shadow-md"
        />
      </div>
    </div>
  );
}
