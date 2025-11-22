import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Consultation } from "../types/consultation.types";
import { getConsultation } from "../service/listConsultationService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PrescriptionDocument } from "../components/PrescriptionDocument";
import "../styles/prescriptionPDF.css";
import { useLanguage } from "../hooks/useLanguage";

const Prescription = () => {
  //  Garante atualização automática quando o idioma mudar
  useLanguage();

  //  ID da URL /prescription/:id
  const { id } = useParams<{ id: string }>();

  //  Estados principais
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  Carrega a consulta do localStorage usando o id
  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        const data = await getConsultation(id);
        setConsultation(data);
      } catch (err) {
        console.error("Erro ao buscar consulta:", err);
        setError("Não foi possível carregar a consulta.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  //  Exportar PDF da receita
  // Captura o conteúdo do PrescriptionDocument → converte para PNG → gera PDF
  const handleExportPDF = async () => {
    const element = document.getElementById("pdf-document");
    if (!element || !consultation) return;

    // Converte o HTML para imagem
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Adiciona a imagem renderizada ao PDF
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Nome automático baseado no paciente
    pdf.save(`receita-${consultation.patientName}.pdf`);
  };

  //  Estados de carregamento / erro
  if (loading) return <p className="p-6">Carregando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!consultation) return <p className="p-6">Consulta não encontrada.</p>;

  // Layout principal da página
  return (
    <div className=" bg-[#edf2f9] flex flex-col items-center py-8">
      <div className="prescription-page-wrapper">
        {/* Documento que será exportado como PDF */}
        <div className="pdf-wrapper">
          <PrescriptionDocument consultation={consultation} />
        </div>
      </div>

      {/* Botão de exportar */}
      <div className="mt-6">
        <button
          onClick={handleExportPDF}
          className="px-5 py-2 ml-68 sm:ml-0 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  );
};

export default Prescription;
