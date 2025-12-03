import { useState, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Key, Building2 } from "lucide-react";
import "./App.css";

// Tipagens
interface Trabalho {
  id: string;
  name: string;
  images: string[];
}

interface Telefone {
  nome: string;
  numero: string;
}

// DADOS DA EMPRESA
const empresaDados = {
  nome: "CGN Construções LTDA",
  endereco:
    "R. Cinamomo, 12 - 54 - Jardim Planalto, Mogi das Cruzes - SP, 08760-030",
  cnpj: "20.465.553/0001-27",
  inscrEstadual: "454.412.904.118",
  inscrMunicipal: "076 490-6",
  email: "gm0912351@gmail.com",
  telefones: [
    { nome: "Gustavo", numero: "(11) 96058-4759" },
    { nome: "Cerilo", numero: "(11) 99785-5291" },
  ] as Telefone[],
  pix: "gm0912351@gmail.com",
};

const servicosExpandidos = [
  "Portões",
  "Grades",
  "Estruturas Metálicas",
  "Alvenaria Residencial",
  "Alvenaria Comercial",
];

// helper para criar arrays de caminhos de imagem sequenciais
const rangeImages = (base: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/${base}${i + 1}.jpg`);

export default function App() {
  const [open, setOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<string | null>(null);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [estruturaVisibleCount, setEstruturaVisibleCount] = useState(8);

  const navLinks = [
    { id: "inicio", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "trabalhos", label: "Trabalhos" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "contato", label: "Contato" },
  ];

  const trabalhos: Trabalho[] = [
    {
      id: "portoes",
      name: "Portões",
      images: rangeImages("portao", 8),
    },
    {
      id: "grades",
      name: "Grades",
      images: rangeImages("grade", 9),
    },
    {
      id: "estruturas",
      name: "Estruturas Metálicas",
      images: rangeImages("estrutura", 45),
    },
    {
      id: "alvenaria",
      name: "Alvenaria",
      images: [
        "/alvenaria1.jpg",
        "/alvenaria2.jpg",
        "/alvenaria3.jpg",
        "/alvenaria4.jpg",
        "/alvenaria5.jpg",
        "/alvenaria6.jpg",
        "/alvenaria7.jpg",
        "/alvenaria8.jpg",
        "/alvenaria9.jpg",
        "/alvenaria10.jpg",
      ],
    },
  ];

  const depoimentos = [
    { texto: "Serviço impecável, recomendo demais!", autor: "João Silva" },
    {
      texto: "Atendimento rápido e portão de ótima qualidade.",
      autor: "Maria Oliveira",
    },
    {
      texto: "Minha empresa ficou muito mais segura, obrigado CGN.",
      autor: "Pedro Santos",
    },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  const handleModalContentClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleZoomImageClick = (e: ReactMouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentWork = activeWork
    ? trabalhos.find((t) => t.id === activeWork) ?? null
    : null;

  const isEstruturaActive = currentWork?.id === "estruturas";
  const estruturaTotal = currentWork?.images.length ?? 0;
  const estruturaShowing = isEstruturaActive
    ? currentWork.images.slice(0, estruturaVisibleCount)
    : [];

  const handleVerMaisEstruturas = () => {
    if (!currentWork || currentWork.id !== "estruturas") return;
    setEstruturaVisibleCount((prev) => {
      const next = prev + 8;
      return next >= estruturaTotal ? estruturaTotal : next;
    });
  };

  const handleVerMenosEstruturas = () => {
    if (!currentWork || currentWork.id !== "estruturas") return;
    setEstruturaVisibleCount(8);
  };

  // resetar contagem quando fechar modal ou trocar de trabalho
  useEffect(() => {
    if (!activeWork || activeWork !== "estruturas") {
      setEstruturaVisibleCount(8);
    }
  }, [activeWork]);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo-container">
          <img src="/logocgn.png" alt="Logo CGN" className="logo" />
          <img src="/cgn.png" alt="C.G.N" className="cgn-title" />
        </div>
        <nav className={`nav ${open ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir/Fechar menu"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="hero">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1>C.G.N Construções</h1>
          <p>Especialistas em serralheria residencial e comercial</p>
          <a
            href="https://wa.me/message/IGSY7Y7KHO6EL1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            💬 Orçamento via WhatsApp
          </a>
        </motion.div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="sobre">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="sobre-texto"
        >
          <h2>
            Sobre a <span className="highlight">C.G.N</span>
          </h2>
          <p>
            A <span className="highlight">C.G.N Construções</span> atua em{" "}
            <span className="highlight">Mogi das Cruzes</span>, oferecendo
            soluções modernas em <span className="highlight">serralheria</span>{" "}
            com <span className="highlight">qualidade</span> e confiança.
          </p>
          <p>
            Especializados em portões, grades e estruturas metálicas, atendemos
            residências e comércios garantindo durabilidade, design e
            segurança.
          </p>
          <p className="servicos-sobre">
            <strong>Serviços:</strong> {servicosExpandidos.join(" • ")}
          </p>
        </motion.div>
        <div className="sobre-imagem">
          <img src="/logocgn.png" alt="Equipe CGN" />
        </div>
      </section>

      {/* TRABALHOS */}
      <section id="trabalhos" className="trabalhos">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="titulo-secao"
        >
          Trabalhos Realizados
        </motion.h2>

        <div className="cards-trabalhos">
          {trabalhos.map((t) => (
            <motion.div
              key={t.id}
              className="card-trabalho"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px white" }}
              onClick={() => setActiveWork(t.id)}
            >
              <h3>{t.name}</h3>
              <p>Clique para ver fotos</p>
            </motion.div>
          ))}
        </div>

        {activeWork && currentWork && (
          <div className="modal">
            {/* sem onClick aqui, só fecha pelo botão ✕ */}
            <div className="modal-content" onClick={handleModalContentClick}>
              <button
                className="close"
                onClick={() => setActiveWork(null)}
                aria-label="Fechar"
              >
                ✕
              </button>
              <h3>{currentWork.name}</h3>

              <div className="modal-images">
                {isEstruturaActive
                  ? estruturaShowing.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${activeWork}-${i}`}
                        onClick={() => setZoomImg(img)}
                      />
                    ))
                  : currentWork.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${activeWork}-${i}`}
                        onClick={() => setZoomImg(img)}
                      />
                    ))}
              </div>

              {isEstruturaActive && (
                <div className="ver-mais-container">
                  {estruturaVisibleCount < estruturaTotal ? (
                    <button
                      type="button"
                      className="btn-ver-mais"
                      onClick={handleVerMaisEstruturas}
                    >
                      Ver mais
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-ver-mais"
                      onClick={handleVerMenosEstruturas}
                    >
                      Ver menos
                    </button>
                  )}
                  <p className="ver-mais-info">
                    Mostrando {estruturaVisibleCount} de {estruturaTotal} fotos
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ZOOM */}
      {zoomImg && (
        <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
          <img
            src={zoomImg}
            alt="Imagem ampliada"
            className="zoomed-img"
            onClick={handleZoomImageClick}
          />
        </div>
      )}

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="depoimentos">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="titulo-secao"
        >
          O que nossos clientes dizem
        </motion.h2>
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
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="titulo-secao"
        >
          Contato
        </motion.h2>

        <div className="empresa-grid">
          {/* Telefone */}
          <motion.div
            className="empresa-card telefone"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="icon-white" size={32} />
            <h3>Telefone</h3>
            <div>
              {empresaDados.telefones.map((tel, i) => (
                <a
                  key={i}
                  href={`tel:${tel.numero.replace(/\D/g, "")}`}
                  className="tel-link"
                >
                  📱 {tel.nome}: {tel.numero}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Endereço */}
          <motion.div
            className="empresa-card endereco"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="icon-white" size={32} />
            <h3>Endereço</h3>
            <p>{empresaDados.endereco}</p>
          </motion.div>

          {/* E-mail */}
          <motion.div
            className="empresa-card email"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="icon-white" size={32} />
            <h3>E-mail</h3>
            <a href={`mailto:${empresaDados.email}`} className="tel-link">
              {empresaDados.email}
            </a>
          </motion.div>

          {/* PIX */}
          <motion.div
            className="empresa-card pix"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <Key className="icon-white" size={32} />
            <h3>PIX</h3>
            <p>{empresaDados.pix}</p>
          </motion.div>

          {/* Dados da empresa */}
          <motion.div
            className="empresa-card docs"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <Building2 className="icon-white" size={32} />
            <h3>Dados da empresa</h3>
            <p>
              <strong>CNPJ:</strong> {empresaDados.cnpj}
            </p>
            <p>
              <strong>Inscr. Estadual:</strong> {empresaDados.inscrEstadual}
            </p>
            <p>
              <strong>Inscr. Municipal:</strong> {empresaDados.inscrMunicipal}
            </p>
          </motion.div>
        </div>

        <form className="form-contato" onSubmit={handleFormSubmit}>
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
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Pinterest">
            <i className="fab fa-pinterest"></i>
          </a>
        </div>
        <p>
          © {new Date().getFullYear()} C.G.N Construções - Todos os direitos
          reservados
        </p>
      </footer>

      {/* BOTÃO VOLTAR */}
      <button
        className="btn-top"
        onClick={handleScrollTop}
        aria-label="Voltar ao topo"
      >
        ↑
      </button>

      {/* FUNDO DINÂMICO (se tiver no CSS) */}
      <div className="fundo-dinamico" aria-hidden="true"></div>
    </>
  );
}
