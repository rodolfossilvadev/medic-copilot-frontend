import { Mic, Square, Loader2 } from "lucide-react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import type { SpeakerMessageList } from "../types/consultation.types";
import { useState } from "react";
import { getLang } from "../config/i18n"; // idioma enviado ao backend

interface AudioRecorderButtonProps {
  onTranscript: (text: string, speaker: SpeakerMessageList) => void;
  className?: string;
}

export const AudioRecorderButton = ({
  onTranscript,
  className = "",
}: AudioRecorderButtonProps) => {
  // Indica se o áudio está sendo processado no backend
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  /**
   * Hook responsável por gravar o áudio e enviar ao backend.
   * Agora recebe o idioma selecionado.
   */
  const { recording, startRecording, stopRecording } = useAudioRecorder(
    async (text: string, speaker: SpeakerMessageList): Promise<void> => {
      setIsProcessing(false);
      onTranscript(text, speaker);
    },
    getLang()
  );

  // Alterna estado entre iniciar/parar gravação
  const handleClick = (): void => {
    if (recording) {
      stopRecording();
      setIsProcessing(true); // mostra spinner durante a transcrição
    } else {
      startRecording();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={` ${className} from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-linear-to-br text-white shadow-2xl transition active:scale-95 sm:h-20 sm:w-20 ${
        recording && !isProcessing
          ? "scale-110 animate-pulse" // efeito enquanto grava
          : "hover:scale-105"
      } ${isProcessing ? "cursor-not-allowed opacity-70" : ""} `}
    >
      {/* Indicadores visuais */}
      {isProcessing ? (
        <Loader2 size={34} className="animate-spin" />
      ) : recording ? (
        <Square size={36} strokeWidth={2.5} />
      ) : (
        <Mic size={36} strokeWidth={2.5} />
      )}
    </button>
  );
};
