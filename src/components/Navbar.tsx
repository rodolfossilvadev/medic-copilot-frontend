import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, User, User2, X } from "lucide-react";
import { loadDoctorProfile } from "../service/doctorProfileService";
import { getLang, setLang } from "../config/i18n";

// Tipo do perfil carregado (storage)
type DoctorProfile = ReturnType<typeof loadDoctorProfile>;

export const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  // Perfil do médico sempre tipado
  const [doctor, setDoctor] = useState<DoctorProfile>(() => loadDoctorProfile());

  // Idioma aplicado na UI
  const [lang, setLangState] = useState<"pt" | "en">(getLang());

  const location = useLocation();

  // Atualiza perfil quando storage ou evento global mudar
  useEffect(() => {
    const update = (): void => setDoctor(loadDoctorProfile());
    window.addEventListener("doctorProfileUpdated", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("doctorProfileUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // Re-render quando idioma mudar globalmente
  useEffect(() => {
    const handle = (): void => setLangState(getLang());
    window.addEventListener("languageChanged", handle);
    return () => window.removeEventListener("languageChanged", handle);
  }, []);

  // Troca idioma no storage + estado local
  const changeLang = (value: "pt" | "en"): void => {
    setLang(value);
    setLangState(value);
  };

  const linkClass =
    "px-4 py-2 text-text-300 font-medium hover:text-primary-500 transition";

  const activeClass =
    "text-primary-400 ml-4 sm:ml-0 font-semibold sm:border-b-2 border-primary-400 pb-1";

  const isPdfPage = location.pathname.includes("/prescription");

  return (
    <nav
      className={` ${
        isPdfPage ? "min-w-[750px]" : "w-full"
      } border-primary-100 sticky top-0 z-50 border-b bg-white/90 shadow-[0_2px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Links Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            {lang === "pt" ? "Início" : "Home"}
          </NavLink>

          <NavLink
            to="/consultations"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            {lang === "pt" ? "Consultas" : "Consultations"}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            {lang === "pt" ? "Perfil" : "Profile"}
          </NavLink>
        </div>

        {/* Perfil + Idioma Desktop */}
        <div className="flex">
          <div className="ml-4 hidden items-center gap-3 md:flex">
            <User className="text-primary-400 h-8 w-8" />
            <div className="leading-tight">
              <p className="text-text-300 text-sm font-semibold">{doctor.name}</p>
              <p className="text-text-700 text-xs">{doctor.specialty}</p>
            </div>
          </div>

          <select
            value={lang}
            onChange={(e) => changeLang(e.target.value as "pt" | "en")}
            className="text-text-300 border-primary-100 focus:ring-primary-300 ml-4 hidden cursor-pointer rounded-full border bg-transparent px-3 py-1 text-sm outline-none md:block"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Botão Mobile */}
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? (
            <X size={26} className="text-text-300" />
          ) : (
            <Menu size={26} className="text-text-300" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="border-primary-100 border-t bg-white/90 shadow-lg backdrop-blur-xl md:hidden">
          <div className="border-primary-100 flex items-center gap-3 border-b px-4 py-3">
            <User2 className="text-primary-400 h-10 w-10" />
            <div>
              <p className="text-text-300 text-sm font-semibold">{doctor.name}</p>
              <p className="text-text-700 text-xs">{doctor.specialty}</p>
            </div>
          </div>

          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className={({ isActive }) => (isActive ? activeClass : linkClass) + " block"}
          >
            {lang === "pt" ? "Início" : "Home"}
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/consultations"
            className={({ isActive }) => (isActive ? activeClass : linkClass) + " block"}
          >
            {lang === "pt" ? "Consultas" : "Consultations"}
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/profile"
            className={({ isActive }) => (isActive ? activeClass : linkClass) + " block"}
          >
            {lang === "pt" ? "Perfil" : "Profile"}
          </NavLink>

          {/* Seletor idioma Mobile */}
          <div className="p-4">
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as "pt" | "en")}
              className="border-primary-200 w-36 cursor-pointer rounded-xl border bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};
