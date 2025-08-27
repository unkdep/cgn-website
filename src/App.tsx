import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Tipagem opcional para organização
interface Trabalho {
  id: string;
  name: string;
  images: string[];
}

export default function App() {
  // Estado do menu mobile
  const [open, setOpen] = useState(false);
  // Estado do modal de trabalhos
  const [activeWork, setActiveWork] = useState<string | null>(null);
  // Estado do zoom individual das imagens
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Navegação dinâmica
  const navLinks = [
    { id: "inicio", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "trabalhos", label: "Trabalhos" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "contato", label: "Contato" },
  ];

  // Conteúdo dinâmico dos trabalhos (mantidos seus arquivos originais)
  const trabalhos: Trabalho[] = [
    { id: "portoes", name: "Portões", images: ["/portao1.jpg","/portao2.jpg","/portao3.jpg","/portao1.jpg"] },
    { id: "grades", name: "Grades", images: ["/grade1.jpg","/grade2.jpg","/grade3.jpg","/grade4.jpg"] },
    { id: "estruturas", name: "Estruturas Metálicas", images: ["/estrutura1.jpg","/estrutura2.jpg","/estrutura3.jpg","/estrutura4.jpg"] },
  ];

  // Depoimentos dinâmicos
  const depoimentos = [
    { texto: "Serviço impecável, recomendo demais!", autor: "João Silva" },
    { texto: "Atendimento rápido e portão de ótima qualidade.", autor: "Maria Oliveira" },
    { texto: "Minha empresa ficou muito mais segura, obrigado CGN.", autor: "Pedro Santos" },
  ];

  // Intersection Observer para animações de entrada das sections
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Fechar modal/zoom com tecla ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomImg) setZoomImg(null);
        else if (activeWork) setActiveWork(null);
        else if (open) setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomImg, activeWork, open]);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo-container">
          <img src="/logocgn.png" alt="Logo CGN" className="logo" />
          <img src="/cgn.png" alt="C.G.N" className="cgn-title" />
        </div>
        <nav className={`nav ${open ? "open" : ""}`}>
          {navLinks.map(link => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Abrir/Fechar menu" role="button" tabIndex={0}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="hero-content">
          <h1>C.G.N Construções</h1>
          <p>Especialistas em serralheria residencial e comercial</p>
          <a href="https://wa.me/message/IGSY7Y7KHO6EL1" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            💬 Orçamento via WhatsApp
          </a>
        </motion.div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="sobre">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="sobre-texto">
          <h2>Sobre a <span className="highlight">C.G.N</span></h2>
          <p>
            A <span className="highlight">C.G.N Construções</span> atua em <span className="highlight">Mogi das Cruzes</span>, oferecendo soluções modernas em <span className="highlight">serralheria</span> com <span className="highlight">qualidade</span> e confiança.
          </p>
          <p>
            Especializados em portões, grades e estruturas metálicas, atendemos residências e comércios garantindo durabilidade, design e segurança.
          </p>
        </motion.div>
        <div className="sobre-imagem">
          <img src="/logocgn.png" alt="Equipe CGN" />
        </div>
      </section>

      {/* TRABALHOS */}
      <section id="trabalhos" className="trabalhos">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="titulo-secao">Trabalhos Realizados</motion.h2>

        <div className="cards-trabalhos">
          {trabalhos.map(t => (
            <motion.div key={t.id} className="card-trabalho" whileHover={{ scale: 1.05, boxShadow: "0 0 25px white" }} onClick={() => setActiveWork(t.id)}>
              <h3>{t.name}</h3>
              <p>Clique para ver fotos</p>
            </motion.div>
          ))}
        </div>

        {/* Modal de trabalhos com clique fora para fechar */}
        {activeWork && (
          <div className="modal" onClick={() => setActiveWork(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={() => setActiveWork(null)} aria-label="Fechar">✕</button>
              <h3>{trabalhos.find(t => t.id === activeWork)?.name}</h3>
              <div className="modal-images">
                {trabalhos.find(t => t.id === activeWork)?.images.map((img, i) => (
                  <img key={i} src={img} alt={`${activeWork}-${i}`} onClick={() => setZoomImg(img)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ZOOM MODAL - clique fora fecha, clique na imagem não propaga */}
      {zoomImg && (
        <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} alt="Imagem ampliada" className="zoomed-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="depoimentos">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="titulo-secao">O que nossos clientes dizem</motion.h2>
        <div className="depoimentos-lista">
          {depoimentos.map((d, idx) => (
            <blockquote key={idx}>
              <p>“{d.texto}”</p>
              <span>- {d.autor}</span>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="contato">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="titulo-secao">Contato</motion.h2>
        <form className="form-contato" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="E-mail" required />
          <input type="text" placeholder="WhatsApp" required />
          <textarea placeholder="Mensagem" rows={4}></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="socials">
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
        </div>
        <p>© {new Date().getFullYear()} C.G.N Construções - Todos os direitos reservados</p>
      </footer>

      {/* BOTÃO VOLTAR */}
      <button className="btn-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">↑</button>

      {/* FUNDO DINÂMICO */}
      <div className="fundo-dinamico" aria-hidden="true"></div>
    </>
  );
}
