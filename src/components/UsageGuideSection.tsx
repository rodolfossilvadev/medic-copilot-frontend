import { motion } from "framer-motion";
import { t } from "../config/i18n";
import { useLanguage } from "../hooks/useLanguage";

// Tipagem dos passos
interface Step {
  title: string;
  description: string;
  image: string;
}

// Imagens PT
import profilePT from "../assets/profile.png";
import homePT from "../assets/home.png";
import gravacaoPT from "../assets/gravacao.png";
import diagnosticoPT from "../assets/diagnostico.png";
import receitaPT from "../assets/receita.png";
import consultasPT from "../assets/consultas.png";

// Imagens EN
import profileEN from "../assets/profile_en.png";
import homeEN from "../assets/home_en.png";
import gravacaoEN from "../assets/gravacao_en.png";
import diagnosticoEN from "../assets/diagnostico_en.png";
import receitaEN from "../assets/receita_en.png";
import consultasEN from "../assets/consultas_en.png";

export const UsageGuideSection = () => {
  const lang = useLanguage(); // força re-render quando idioma muda

  // helper para escolher imagem por idioma
  const img = (pt: string, en: string): string => (lang === "pt" ? pt : en);

  // Passos do guia
  const STEPS: Step[] = [
    {
      title: t("guide_step1_title"),
      description: t("guide_step1_desc"),
      image: img(profilePT, profileEN),
    },
    {
      title: t("guide_step2_title"),
      description: t("guide_step2_desc"),
      image: img(homePT, homeEN),
    },
    {
      title: t("guide_step3_title"),
      description: t("guide_step3_desc"),
      image: img(gravacaoPT, gravacaoEN),
    },
    {
      title: t("guide_step4_title"),
      description: t("guide_step4_desc"),
      image: img(diagnosticoPT, diagnosticoEN),
    },
    {
      title: t("guide_step5_title"),
      description: t("guide_step5_desc"),
      image: img(receitaPT, receitaEN),
    },
    {
      title: t("guide_step6_title"),
      description: t("guide_step6_desc"),
      image: img(consultasPT, consultasEN),
    },
  ];

  return (
    <section className="mx-auto mt-16 mb-20 max-w-6xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-primary-600 mb-10 text-center text-2xl font-bold sm:text-3xl"
      >
        {t("guide_title")}
      </motion.h2>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="border-primary-100 flex flex-col rounded-2xl border bg-white/70 p-5 shadow-lg backdrop-blur-xl"
          >
            <img
              src={step.image}
              alt={step.title}
              className="border-primary-100 h-40 w-full rounded-xl border object-cover shadow-sm"
            />

            <h3 className="text-primary-600 mt-4 text-lg font-semibold">{step.title}</h3>

            <p className="text-text-700 mt-2 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
