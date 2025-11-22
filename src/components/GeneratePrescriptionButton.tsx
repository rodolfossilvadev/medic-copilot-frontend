import { useNavigate } from "react-router-dom";
import { t } from "../config/i18n";

interface GeneratePrescriptionButtonProps {
  consultationId?: string; // id da consulta usada para montar a URL
  label?: string; // texto opcional do botão
  className?: string; // classes extras de estilo
  onClick?: () => void; // ação alternativa opcional
}

export const GeneratePrescriptionButton = ({
  consultationId,
  label,
  className = "",
  onClick,
}: GeneratePrescriptionButtonProps) => {
  const navigate = useNavigate();

  // Define a ação do botão: prioriza onClick, senão navega para a receita
  const handleClick = (): void => {
    if (onClick) {
      onClick();
      return;
    }

    if (consultationId) {
      navigate(`/prescription/${consultationId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`from-primary-300 to-primary-400 hover:from-primary-400 hover:to-primary-400 cursor-pointer rounded-full bg-linear-to-r px-2 font-semibold text-white shadow-lg transition active:scale-95 sm:py-3 ${className} `}
    >
      {/* usa texto traduzido, mas permite sobrescrever via prop */}
      {label || t("generate_prescription")}
    </button>
  );
};
