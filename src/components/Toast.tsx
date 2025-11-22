import { t, UI_TEXT } from "../config/i18n";

interface ToastProps {
  message: string; // mensagem direta ou chave do i18n
  show: boolean; // controla a exibição do toast
}

// Tipo das chaves válidas para tradução
type I18nKey = keyof typeof UI_TEXT;

export const Toast = ({ message, show }: ToastProps) => {
  if (!show) return null;

  // Verifica se "message" corresponde a uma chave válida do i18n
  const isI18nKey = (value: string): value is I18nKey => {
    return Object.prototype.hasOwnProperty.call(UI_TEXT, value);
  };

  // traduz se for chave do i18n, senão usa texto literal
  const translated: string = isI18nKey(message) ? t(message) : message;

  return (
    <div className="animate-fade-in-up fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg">
      {translated}
    </div>
  );
};
