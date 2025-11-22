import { useRef, useState } from "react";
import type { SpeakerMessage } from "../types/consultation.types";
import { API_BASE_URL } from "../service/api";
import { getLang, type Lang } from "../config/i18n";

/**
 * Grava áudio, envia ao backend e retorna texto + falantes.
 */
export const useAudioRecorder = (
  onTranscript: (text: string, speaker: SpeakerMessage[]) => void,
  lang?: Lang
) => {
  const [recording, setRecording] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Inicia gravação
  const startRecording = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunks.current = [];

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    // Ao parar gravação → envia ao backend
    recorder.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      // idioma enviado ao backend
      formData.append("lang", lang ?? getLang());

      try {
        const response = await fetch(`${API_BASE_URL}/api/transcribe`, {
          method: "POST",
          body: formData,
        });

        const data: { text: string; speaker: SpeakerMessage[] } = await response.json();

        onTranscript(data.text, data.speaker);
      } catch (err) {
        console.error("Erro ao transcrever:", err);
      }
    };

    recorder.start();
    setRecording(true);
  };

  // Para gravação
  const stopRecording = (): void => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
};
