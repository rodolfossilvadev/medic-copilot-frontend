import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Consultations from "./pages/Consultations";
import Prescription from "./pages/Prescription";
import ConsultationDetails from "./pages/ConsultationDetails";
import { Navbar } from "./components/Navbar";
import Profile from "./pages/Profile";
import { Footer } from "./components/Footer";

// Configuração principal de rotas da aplicação
// Inclui Navbar fixa + páginas internas + Footer
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/consultations/:id" element={<ConsultationDetails />} />
        <Route path="/prescription/:id" element={<Prescription />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
