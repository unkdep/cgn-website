import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<string | null>(null);

  const trabalhos = [
    { id: "portoes", name: "Portões", images: ["/portao1.jpg","/portao2.jpg","/portao3.jpg","/portao4.jpg"] },
    { id: "grades", name: "Grades", images: ["/grade1.jpg","/grade2.jpg","/grade3.jpg","/grade4.jpg"] },
    { id: "estruturas", name: "Estruturas Metálicas", images: ["/estrutura1.jpg","/estrutura2.jpg","/estrutura3.jpg","/estrutura4.jpg"] },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo-container">
          <img src="/logocgn.png" alt="Logo CGN" className="logo" />
          <img src="/cgn.png" alt="C.G.N" className="cgn-title" />
        </div>
        <nav className={`nav ${open ? "open" : ""}`}>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
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

        {activeWork && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={() => setActiveWork(null)}>✕</button>
              <h3>{trabalhos.find(t => t.id === activeWork)?.name}</h3>
              <div className="modal-images">
                {trabalhos.find(t => t.id === activeWork)?.images.map((img, i) => (
                  <img key={i} src={img} alt={`${activeWork}-${i}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="depoimentos">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="titulo-secao">O que nossos clientes dizem</motion.h2>
        <div className="depoimentos-lista">
          <blockquote>
            <p>“Serviço impecável, recomendo demais!”</p>
            <span>- João Silva</span>
          </blockquote>
          <blockquote>
            <p>“Atendimento rápido e portão de ótima qualidade.”</p>
            <span>- Maria Oliveira</span>
          </blockquote>
          <blockquote>
            <p>“Minha empresa ficou muito mais segura, obrigado CGN.”</p>
            <span>- Pedro Santos</span>
          </blockquote>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="contato">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="titulo-secao">Contato</motion.h2>
        <form className="form-contato">
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
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
        </div>
        <p>© 2025 C.G.N Construções - Todos os direitos reservados</p>
      </footer>

      {/* BOTÃO VOLTAR */}
      <button className="btn-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>

      {/* FUNDO DINÂMICO */}
      <div className="fundo-dinamico"></div>
    </>
  );
}
