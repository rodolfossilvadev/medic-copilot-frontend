import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  // Detecta se a página atual é a visualização de PDF
  const location = useLocation();
  const isPdfPage: boolean = location.pathname.includes("/prescription");

  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`${
        isPdfPage ? "min-w-[750px]" : "w-full"
      } border-primary-500/20 mt-20 border-t bg-[#2f4970] py-8 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 sm:flex-row sm:items-start">
        {/* Logo */}
        <div className="flex items-center sm:-mt-6">
          <img src="/logo-mc.png" className="h-22 w-22" alt="MedNote Logo" />
        </div>

        {/* Informações de rodapé */}
        <div className="flex flex-col text-center sm:text-right">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} MedNote.IA — Todos os direitos reservados.
          </p>

          <a
            href="https://www.rodolfosilvasites.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-primary-400 mt-2 text-center text-sm font-light transition"
          >
            Desenvolvido por — rodolfosilvasites.site
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
