import { useState } from "react";
import { motion } from "framer-motion";
import type { Consultation } from "../types/consultation.types";
import { listConsultationService } from "../service/listConsultationService";
import { ConsultationCard } from "../components/ConsultatioCard";
import { useNavigate } from "react-router-dom";
import { t } from "../config/i18n";
import { useLanguage } from "../hooks/useLanguage";

const Consultations = () => {
  useLanguage(); // força re-render quando idioma muda

  // Lista ordenada (mais recente → mais antiga)
  const [consultations] = useState<Consultation[]>(() => {
    const list = listConsultationService();

    return list.sort(
      (a: Consultation, b: Consultation): number =>
        new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
    );
  });

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="to-primary-100/40 min-h-screen bg-linear-to-br from-white p-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Título traduzido */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-primary-500 mb-1 text-3xl font-semibold"
        >
          {t("consultations_title")}
        </motion.h1>

        {/* Subtítulo traduzido */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-text-700 mb-6"
        >
          {t("consultations_subtitle")}
        </motion.p>

        {/* Lista animada */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {/* Nenhuma consulta */}
          {consultations.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-500"
            >
              {t("no_info")}
            </motion.p>
          )}

          {/* Lista ordenada */}
          {consultations.map((c: Consultation) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ConsultationCard
                data={c}
                onOpen={(id: string) => navigate(`/consultations/${id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Consultations;
