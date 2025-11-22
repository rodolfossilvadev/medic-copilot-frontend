import { useState } from "react";
import { motion } from "framer-motion";
import { loadDoctorProfile, saveDoctorProfile } from "../service/doctorProfileService";
import type { DoctorProfile } from "../types/doctor.types";
import { t } from "../config/i18n";
import { useLanguage } from "../hooks/useLanguage";

const Profile = () => {
  useLanguage();

  const [profile, setProfile] = useState<DoctorProfile>(() => loadDoctorProfile());
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof DoctorProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveDoctorProfile(profile);
    setSaved(true);

    // Toast desaparece sozinho
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="relative flex min-h-130 justify-center p-2">
      {/* Container Principal Animado */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="border-primary-100 w-full max-w-xl rounded-3xl border bg-white/60 px-6 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      >
        {/* Título animado */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-primary-500 mb-2 text-center text-2xl font-semibold"
        >
          {t("profile_title")}
        </motion.h1>

        {/* Form animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-4"
        >
          {/* nome */}
          <div>
            <label className="text-text-700 text-sm font-medium">
              {t("doctor_name") ?? "Nome"}
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-primary-100 text-text-300 focus:ring-primary-400 mt-1 w-full rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur focus:ring-1 focus:outline-none"
            />
          </div>

          {/* especialidade */}
          <div>
            <label className="text-text-700 text-sm font-medium">
              {t("specialty") ?? "Especialidade"}
            </label>
            <input
              type="text"
              value={profile.specialty}
              onChange={(e) => handleChange("specialty", e.target.value)}
              className="border-primary-100 text-text-300 focus:ring-primary-400 mt-1 w-full rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur focus:ring-1 focus:outline-none"
            />
          </div>

          {/* CRM */}
          <div>
            <label className="text-text-700 text-sm font-medium">CRM</label>
            <input
              type="text"
              value={profile.crm}
              onChange={(e) => handleChange("crm", e.target.value)}
              className="border-primary-100 text-text-300 focus:ring-primary-400 mt-1 w-full rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur focus:ring-1 focus:outline-none"
            />
          </div>

          {/* telefone */}
          <div>
            <label className="text-text-700 text-sm font-medium">
              {t("clinic_phone") ?? "Telefone da Clínica"}
            </label>
            <input
              type="text"
              value={profile.clinicPhone}
              onChange={(e) => handleChange("clinicPhone", e.target.value)}
              className="border-primary-100 text-text-300 focus:ring-primary-400 mt-1 w-full rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur focus:ring-1 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Salvar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 cursor-pointer rounded-full bg-linear-to-r px-6 py-2 font-semibold text-white shadow-lg transition active:scale-95"
          >
            {t("save_changes")}
          </button>
        </div>
      </motion.div>

      {/* toast fixo */}
      {saved && (
        <div className="animate-fade-in-up fixed right-6 bottom-6 z-50 rounded-full bg-green-400 px-4 py-2 text-white shadow-xl">
          {t("profile_saved") ?? "Perfil atualizado com sucesso!"}
        </div>
      )}
    </div>
  );
};

export default Profile;
