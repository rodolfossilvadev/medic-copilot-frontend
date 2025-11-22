import { t } from "../config/i18n";

interface GenerateDiagnosisButtonProps {
  loading: boolean; // exibe estado carregando
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export const GenerateDiagnosisButton = ({
  loading,
  disabled = false,
  onClick,
  className = "",
}: GenerateDiagnosisButtonProps) => {
  // Estado final de disabled (por loading ou disabled explícito)
  const isDisabled: boolean = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={`from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 w-full rounded-full bg-linear-to-r px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all select-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className} `}
    >
      {/* Texto traduzido dinâmico */}
      {loading ? `${t("generate_diagnosis")}...` : t("generate_diagnosis")}
    </button>
  );
};
