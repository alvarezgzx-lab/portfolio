import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

// ─── TOKENS ────────────────────────────────────────────────────────────────
const C = {
  ink:   "#171717",
  cream: "#F4EFE6",
  terra: "#B85C38",
  navy:  "#17324D",
  sage:  "#6F8F72",
};
const F = {
  display: "'Fraunces', Georgia, serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'IBM Plex Mono', monospace",
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const COMPETENCIAS = [
  "Estrategia de transformación digital educativa",
  "Diseño e implementación de sistemas y plataformas educativas",
  "Integración de IA en procesos de aprendizaje y gestión académica",
  "Adopción tecnológica docente y gestión del cambio",
  "Diseño instruccional (ADDIE / SAM)",
  "Construcción y despliegue de agentes de IA educativos",
  "Prompt Engineering aplicado a la educación",
  "Análisis de datos educativos",
  "Gestión de proyectos tecnológicos",
  "Pensamiento sistémico y crítico",
];

const HERRAMIENTAS = [
  { name: "React", cat: "Desarrollo" },
  { name: "HTML5 · CSS3 · JS", cat: "Desarrollo" },
  { name: "Python", cat: "Desarrollo" },
  { name: "GitHub", cat: "Desarrollo" },
  { name: "OpenAI · ChatGPT", cat: "IA" },
  { name: "Google Cloud", cat: "IA" },
  { name: "Power Platform", cat: "IA" },
  { name: "Supabase", cat: "Datos" },
  { name: "Looker Studio", cat: "Datos" },
  { name: "Figma", cat: "Diseño" },
  { name: "Miro", cat: "Diseño" },
  { name: "Notion", cat: "Gestión" },
  { name: "Google Classroom", cat: "Educación" },
  { name: "Moodle", cat: "Educación" },
  { name: "Articulate 360", cat: "Educación" },
  { name: "VS Code", cat: "Dev" },
];

const TIMELINE = [
  {
    yr: "2024 – Presente",
    role: "Docente e Innovador Tecnológico",
    org: "Institución de educación secundaria privada · Monterrey, N.L.",
    notes: [
      "Diseño e implementación de plataformas educativas digitales propias.",
      "Integración de IA generativa como apoyo al aprendizaje y seguimiento.",
      "350+ alumnos en 3 materias, 11 grupos activos.",
      "Optimización de procesos institucionales de evaluación, retroalimentación y organización académica.",
      "Acompañamiento a docentes en adopción tecnológica.",
    ],
    active: true,
  },
  {
    yr: "2022 – 2024",
    role: "Docente de Secundaria",
    org: "Institución de educación privada · Monterrey, N.L.",
    notes: [
      "Experiencia pedagógica en educación secundaria privada.",
      "Uso de tecnología educativa como soporte didáctico y organizacional.",
      "Diseño de secuencias de aprendizaje mediadas por tecnología.",
      "Identificación de barreras pedagógicas y culturales para la transformación digital.",
    ],
    active: false,
  },
  {
    yr: "2022",
    role: "Diseñador Instruccional — Prácticas profesionales",
    org: "Empresa EdTech nacional",
    notes: [
      "Participación en proyectos de diseño instruccional para entornos digitales.",
      "Colaboración en cursos y programas de formación docente.",
      "200+ docentes capacitados en IA y tecnología educativa. NPS 98%.",
    ],
    active: false,
  },
  {
    yr: "Anterior",
    role: "Analista Jr.",
    org: "Institución bancaria",
    notes: [
      "Experiencia en procesos, flujos de información y toma de decisiones organizacionales.",
    ],
    active: false,
  },
];

const CASES = [
  {
    tag:    "Micrositio · Foro académico · HTML5",
    impact: "Micrositio de simulación académica · HTML5 · 2026",
    title:  "Micrositio de simulación académica con sistema de roles, expedientes digitales y rúbrica interactiva",
    prob:   "Las actividades de debate oral carecían de estructura pedagógica verificable, sistema de evaluación rubricado accesible al estudiante y gestión diferenciada de roles antes y durante el foro.",
    sol:    "Micrositio HTML con cuatro mesas de trabajo temáticas (migración, agua, gentrificación, derechos humanos en Nuevo León), sistema de expedientes por rol (contexto histórico, postura asignada, arsenal de investigación, palabras clave técnicas), rúbrica interactiva de 4 criterios con tarjetas flip-card animadas (interpretación, fundamentación, vocabulario, convivencia lasallista), hoja de ruta con datos estadísticos regionales, y sistema de impresión diferenciada: expediente individual para el alumno y matriz de evaluación para el docente.",
    util:   "Digitaliza la preparación y conducción del foro: elimina el papel en rúbricas y expedientes, hace transparentes los criterios de evaluación, y permite al alumno acceder a su rol en cualquier dispositivo sin instalar nada.",
    tech:   ["HTML5", "TailwindCSS CDN", "Vanilla JS", "Font Awesome", "CSS @media print", "Diseño instruccional"],
    url:    "https://alvarezgzx-lab.github.io/micrositiomesaredonda/",
  },
  {
    tag:    "Portal del estudiante · HTML5 · NEM",
    impact: "Portal del estudiante por asignatura · acceso multiplataforma sin instalación",
    title:  "Portal del estudiante por asignatura con módulos de contenido, flashcards y simulador de actividades",
    prob:   "Los estudiantes no contaban con un punto de acceso unificado a los contenidos de la asignatura. Los materiales de estudio estaban dispersos y no existían herramientas de autoevaluación entre sesiones.",
    sol:    "Portal web estático desplegado en GitHub Pages con módulos de contenido por PDA, sistema de flashcards para repaso de conceptos, simulador de actividades y guía completa del ciclo escolar alineada al marco curricular NEM. Accesible desde teléfono móvil sin descarga de aplicaciones.",
    util:   "Permite al estudiante repasar contenidos de forma autónoma fuera del horario de clase. Reduce la fragmentación de materiales y centraliza el acceso a recursos sin depender de plataformas institucionales de terceros.",
    tech:   ["HTML5", "JavaScript", "CSS3", "GitHub Pages", "Diseño instruccional"],
    url:    "https://alvarezgzx-lab.github.io/spanishportal25-26/?v=1",
  },
  {
    tag:    "PWA · Gestión institucional · Multi-rol",
    impact: "Sistema de gestión institucional · prototipo funcional desplegado",
    title:  "Sistema de gestión de asistencia institucional con arquitectura multi-rol y registro QR",
    prob:   "El registro de asistencia era manual, con alta fricción para docentes y sin visibilidad en tiempo real para coordinación ni trazabilidad estructurada de ausencias y sustituciones.",
    sol:    "Progressive Web App con arquitectura de roles diferenciados (docente, auxiliar, coordinación, administrador), registro por código QR, lógica de asignación de sustituciones, registro auditado de ausencias justificadas y calendario institucional integrado. Desplegado en Vercel como prototipo institucional funcional.",
    util:   "Centraliza el registro y trazabilidad de asistencia, elimina el proceso manual y genera datos institucionales estructurados sobre ausentismo, cobertura docente y sustituciones. Cada rol accede únicamente a las funciones que le corresponden.",
    tech:   ["React", "PWA", "QR", "Arquitectura multi-rol", "Vercel"],
    url:    "https://asiste-sistema-de-asistencia-escola.vercel.app/",
  },
  {
    tag:    "Agente de IA · Evaluación formativa · JSON",
    impact: "Evaluación formativa personalizada · base de conocimiento estructurada por grupo",
    title:  "Agente de IA para evaluación formativa de producción escrita con base de conocimiento por alumno",
    prob:   "La evaluación formativa de producción escrita en grupos numerosos de secundaria demandaba un tiempo de retroalimentación insostenible y no permitía personalización por alumno.",
    sol:    "Agente de IA con system prompt estructurado (v3) y base de conocimiento en JSON que vincula matrícula, nomenclatura e identificador de cada alumno. Genera retroalimentación formativa personalizada a partir del texto entregado, reconociendo al estudiante por su matrícula sin intervención manual del docente.",
    util:   "Escala la retroalimentación formativa escrita a grupos grandes sin incrementar la carga docente. El docente configura los criterios una vez; el agente los aplica de forma consistente a cada entrega con información contextual del alumno.",
    tech:   ["IA Generativa", "System Prompt Engineering", "JSON Knowledge Base", "Evaluación formativa"],
    url:    null,
  },
  {
    tag:    "SPA · React.js · Planeación docente",
    impact: "Gestión de planeaciones didácticas · navegación interactiva · formato institucional imprimible",
    title:  "Plataforma SPA de gestión de planeaciones didácticas con generación automática de formato institucional",
    prob:   "Los formatos estáticos de planeación carecían de interactividad, no integraban recursos digitales y generaban fricción en la revisión por coordinación académica.",
    sol:    "Single Page Application en React.js con galería-dashboard de PDAs, vistas colapsables por fase didáctica, integración de ejes NEM y ODS, y Smart Print Layout: al ejecutar impresión, la interfaz web se transforma automáticamente en la tabla administrativa oficial lista para firma directiva.",
    util:   "Permite al coordinador académico revisar planeaciones en pantalla con navegación interactiva, y al docente generar el formato imprimible institucional desde la misma herramienta, sin duplicar archivos en distintos formatos.",
    tech:   ["React.js", "TailwindCSS", "Lucide React", "CSS @media print", "JSON"],
    url:    null,
  },
  {
    tag:    "Formación docente · Diseño instruccional · B2B",
    impact: "Formación docente en IA · 200+ participantes · NPS 98%",
    title:  "Programa modular de formación docente en inteligencia artificial aplicada a la educación",
    prob:   "Docentes de educación superior sin marcos conceptuales ni herramientas prácticas para integrar IA en su práctica pedagógica de manera ética y fundamentada.",
    sol:    "Programa modular de cuatro talleres con diseño instruccional propio: ética de la IA en educación, pedagogía de la IA, construcción de agentes y automatización educativa, y Prompt Engineering para educadores. Materiales, facilitación y seguimiento originales.",
    util:   "Proporciona a instituciones de educación superior un programa de actualización docente en IA con enfoque pedagógico, no solo tecnológico, con evidencia de impacto medible (NPS 98%).",
    tech:   ["Diseño instruccional (ADDIE)", "Facilitación", "Prompt Engineering", "IA educativa"],
    url:    null,
  },
];

const SERVICES_COLEGIOS = [
  { title: "Formación docente en IA y competencias digitales", for: "Equipos docentes de educación básica y media superior", inc: "Diagnóstico · diseño del programa · materiales propios · facilitación · seguimiento", res: "Docentes con capacidad real de integrar IA en su práctica pedagógica" },
  { title: "Diseño e implementación de plataformas educativas con IA", for: "Instituciones que requieren soluciones propias y a medida", inc: "Arquitectura, desarrollo y despliegue de portales de aprendizaje, sistemas de gestión y agentes pedagógicos", res: "Plataforma funcional adaptada a los flujos y la cultura institucional" },
  { title: "Consultoría en innovación y transformación digital", for: "Directivos y coordinadores académicos", inc: "Diagnóstico tecnológico · hoja de ruta · capacitación de liderazgo · seguimiento de implementación", res: "Institución con dirección clara y capacidad instalada para la transformación digital" },
  { title: "Diseño curricular con metodologías activas y tecnología", for: "Instituciones que requieren rediseño de materias o programas", inc: "Alineación con marcos curriculares · integración de IA · recursos digitales · evaluación auténtica", res: "Programa actualizado, alineado y ejecutable por cualquier docente del equipo" },
];

const SERVICES_EMPRESAS = [
  { title: "Diseño de cursos B2B", for: "Empresas con necesidades de capacitación interna o externa", inc: "Diagnóstico · diseño instruccional ADDIE/SAM · producción · implementación · evaluación de impacto", res: "Curso funcional con métricas de aprendizaje claras y documentadas" },
  { title: "Capacitación en IA generativa y Prompt Engineering", for: "Equipos que requieren integrar IA en sus flujos de trabajo", inc: "Programa modular por niveles y áreas de aplicación · talleres prácticos con casos de uso reales", res: "Equipos con flujos de trabajo aumentados por IA y criterio para su aplicación" },
  { title: "Automatización de procesos instruccionales", for: "Áreas de L&D con necesidad de escalar producción de contenido", inc: "Implementación de flujos con IA para producción de contenido, evaluación y retroalimentación", res: "Reducción de tiempos de desarrollo de contenido documentada hasta en un 30%" },
  { title: "Desarrollo de agentes educativos y asistentes de IA", for: "Organizaciones con necesidades de onboarding o formación continua", inc: "Diseño de system prompts · bases de conocimiento · integración con sistemas existentes · pruebas con usuarios", res: "Agente funcional que escala el acompañamiento formativo sin incrementar el equipo" },
];

// ─── UTILS ─────────────────────────────────────────────────────────────────
const Label = ({ children, color = C.terra }) => (
  <p style={{ fontFamily: F.mono, fontSize: 11, color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{children}</p>
);
const Tag = ({ children, accent = C.navy }) => (
  <span style={{ fontFamily: F.mono, fontSize: 11, background: `${accent}18`, color: accent, padding: "3px 10px", borderRadius: 3, display: "inline-block" }}>{children}</span>
);

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [open, setOpen]     = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 800);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const links = [["Inicio","home"],["Perfil","about"],["Proyectos","portfolio"],["Servicios","services"],["Contacto","contact"]];
  const go = (k) => { setPage(k); setOpen(false); };

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:C.cream, borderBottom:`1px solid ${C.ink}18` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => go("home")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:F.display, fontSize:20, fontWeight:700, color:C.ink }}>
          AA<span style={{ color:C.terra }}>.</span>
        </button>
        {!mobile && (
          <div style={{ display:"flex", alignItems:"center", gap:28 }}>
            {links.map(([l,k]) => (
              <button key={k} onClick={() => go(k)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:F.body, fontSize:13, fontWeight:500, color:page===k ? C.terra : C.ink, borderBottom:page===k ? `2px solid ${C.terra}` : "2px solid transparent", paddingBottom:2 }}>{l}</button>
            ))}
            <button onClick={() => go("contact")} style={{ fontFamily:F.body, fontSize:12, fontWeight:600, background:C.terra, color:C.cream, border:"none", borderRadius:4, padding:"8px 18px", cursor:"pointer" }}>Contacto</button>
          </div>
        )}
        {mobile && (
          <button onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:5, padding:8 }}>
            <span style={{ width:22, height:2, background:C.ink, display:"block" }}/><span style={{ width:22, height:2, background:C.ink, display:"block" }}/><span style={{ width:22, height:2, background:C.ink, display:"block" }}/>
          </button>
        )}
      </div>
      {mobile && open && (
        <div style={{ background:C.cream, borderTop:`1px solid ${C.ink}12`, padding:"8px 28px 24px" }}>
          {links.map(([l,k]) => (
            <button key={k} onClick={() => go(k)} style={{ display:"block", width:"100%", textAlign:"left", fontFamily:F.body, fontSize:15, fontWeight:page===k?600:400, color:page===k?C.terra:C.ink, background:"none", border:"none", cursor:"pointer", padding:"11px 0", borderBottom:`1px solid ${C.ink}08` }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background:C.ink, padding:"48px 28px 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:32, marginBottom:40 }}>
          <div>
            <p style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:C.cream, marginBottom:4 }}>Ángel Álvarez</p>
            <p style={{ fontFamily:F.body, fontSize:13, color:`${C.cream}55`, lineHeight:1.7 }}>Learning Experience Designer · Docente · Especialista EdTech</p>
          </div>
          <div style={{ display:"flex", gap:32, flexWrap:"wrap", alignItems:"flex-start" }}>
            {[["Inicio","home"],["Perfil","about"],["Proyectos","portfolio"],["Servicios","services"]].map(([l,k]) => (
              <button key={k} onClick={() => setPage(k)} style={{ fontFamily:F.body, fontSize:13, color:`${C.cream}45`, background:"none", border:"none", cursor:"pointer" }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.cream}10`, paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontFamily:F.mono, fontSize:12, color:`${C.cream}35` }}>alvarezgzx@gmail.com · +52 (81) 2632-9304</p>
          <p style={{ fontFamily:F.mono, fontSize:12, color:`${C.cream}25` }}>© 2025–2026 Ángel Álvarez</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────────
function Home({ setPage }) {
  const dims = [
    { n:"01", label:"Learning Experience Designer", desc:"Diseña sistemas y experiencias digitales para la transformación institucional. Especialización en IA como sistema sociotécnico (Maestría UNIR en curso)." },
    { n:"02", label:"Docente", desc:"Docente activo en educación secundaria privada. Imparte asignaturas en humanidades, ciencias sociales y STEAM. Las herramientas diseñadas se implementan y validan directamente en el aula." },
    { n:"03", label:"Especialista EdTech", desc:"Diseño e implementación de soluciones de tecnología educativa para instituciones y corporaciones. Capacitación docente en IA educativa con cobertura nacional y NPS del 98%." },
  ];
  return (
    <div>
      <section style={{ minHeight:"100vh", background:C.cream, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"80px 28px 64px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <p style={{ fontFamily:F.mono, fontSize:11, color:C.terra, letterSpacing:3, textTransform:"uppercase", marginBottom:20 }}>Learning Experience Designer · Docente · Especialista EdTech</p>
          <h1 style={{ fontFamily:F.display, fontWeight:700, color:C.ink, fontSize:"clamp(56px,10vw,120px)", lineHeight:0.92, letterSpacing:"-3px", marginBottom:40 }}>
            Ángel<br/><span style={{ color:C.terra }}>Álvarez</span><span style={{ color:`${C.ink}25` }}>.</span>
          </h1>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:32 }}>
            <p style={{ fontFamily:F.body, fontSize:"clamp(15px,1.8vw,19px)", color:`${C.ink}65`, maxWidth:460, lineHeight:1.6 }}>
              Diseño sistemas y experiencias digitales que acompañan a las instituciones y a las personas en su transformación.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={() => setPage("portfolio")} style={{ fontFamily:F.body, fontWeight:600, fontSize:14, background:C.terra, color:C.cream, border:"none", borderRadius:4, padding:"13px 26px", cursor:"pointer" }}>Ver proyectos</button>
              <button onClick={() => setPage("services")} style={{ fontFamily:F.body, fontWeight:600, fontSize:14, background:"transparent", color:C.ink, border:`2px solid ${C.ink}`, borderRadius:4, padding:"11px 26px", cursor:"pointer" }}>Servicios</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:C.navy }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))" }}>
          {dims.map(d => (
            <div key={d.n} style={{ padding:"48px 36px", borderRight:`1px solid ${C.cream}08` }}>
              <p style={{ fontFamily:F.mono, fontSize:12, color:C.terra, marginBottom:14 }}>{d.n}</p>
              <h3 style={{ fontFamily:F.display, fontSize:21, fontWeight:600, color:C.cream, lineHeight:1.2, marginBottom:12 }}>{d.label}</h3>
              <p style={{ fontFamily:F.body, fontSize:14, color:`${C.cream}60`, lineHeight:1.75 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background:`${C.ink}04`, padding:"40px 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:2 }}>
          {[
            { n:"350+", label:"Alumnos", sub:"en 3 materias · 11 grupos" },
            { n:"200+", label:"Docentes capacitados", sub:"en IA y tecnología educativa" },
            { n:"98%", label:"Satisfacción", sub:"en programas de formación docente" },
          ].map(s => (
            <div key={s.n} style={{ padding:"32px 28px", borderRight:`1px solid ${C.ink}08` }}>
              <p style={{ fontFamily:F.display, fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:C.terra, lineHeight:1, marginBottom:6 }}>{s.n}</p>
              <p style={{ fontFamily:F.body, fontSize:13, fontWeight:600, color:C.ink, marginBottom:4 }}>{s.label}</p>
              <p style={{ fontFamily:F.mono, fontSize:11, color:`${C.ink}45` }}>{s.sub}</p>
            </div>
          ))}
          <div style={{ padding:"32px 28px" }}>
            <p style={{ fontFamily:F.display, fontSize:"clamp(14px,1.5vw,18px)", fontWeight:600, color:C.navy, lineHeight:1.3, marginBottom:6 }}>Impacto real</p>
            <p style={{ fontFamily:F.mono, fontSize:11, color:`${C.ink}45`, lineHeight:1.65 }}>Soluciones implementadas en contextos educativos reales con resultados medibles.</p>
          </div>
        </div>
      </section>

      <section style={{ background:C.cream, padding:"72px 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:40, flexWrap:"wrap", gap:16 }}>
            <h2 style={{ fontFamily:F.display, fontSize:"clamp(26px,3.5vw,40px)", fontWeight:700, color:C.ink }}>Proyectos destacados</h2>
            <button onClick={() => setPage("portfolio")} style={{ fontFamily:F.body, fontSize:13, color:C.terra, background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>Ver todos →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {CASES.slice(0,3).map((c,i) => (
              <div key={i} style={{ background:"white", border:`1px solid ${C.ink}08`, borderRadius:6, padding:28, display:"flex", flexDirection:"column" }}>
                <Tag accent={C.sage}>{c.tag}</Tag>
                <h3 style={{ fontFamily:F.display, fontSize:18, fontWeight:600, color:C.ink, lineHeight:1.25, margin:"14px 0 10px" }}>{c.title}</h3>
                <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}60`, lineHeight:1.7, marginBottom:16 }}>{c.util}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
                  {c.tech.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ marginTop:"auto", alignSelf:"flex-start", fontFamily:F.body, fontSize:12, fontWeight:600, color:C.terra, background:"none", border:`1.5px solid ${C.terra}`, borderRadius:3, padding:"6px 14px", textDecoration:"none" }}>
                    Ver demo →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PERFIL ────────────────────────────────────────────────────────────────
function About() {
  return (
    <div style={{ paddingTop:60 }}>
      <section style={{ background:C.cream, padding:"72px 28px 56px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Label>Perfil profesional</Label>
          <h1 style={{ fontFamily:F.display, fontSize:"clamp(32px,5vw,54px)", fontWeight:700, color:C.ink, lineHeight:1.05, letterSpacing:"-1.5px", marginBottom:32 }}>
            Ángel Álvarez
          </h1>
          <div style={{ width:100, height:100, background:C.navy, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:32 }}>
            <span style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:C.cream }}>AA</span>
          </div>
          <p style={{ fontFamily:F.body, fontSize:16, color:`${C.ink}75`, lineHeight:1.85, maxWidth:660 }}>
            Especialista en transformación digital educativa con experiencia en el diseño e implementación de soluciones EdTech y en la adopción tecnológica docente. Maestrando en Inteligencia Artificial para las Ciencias Sociales y del Comportamiento (UNIR), con enfoque en la IA como sistema sociotécnico que impacta decisiones, procesos y cultura organizacional.
          </p>
        </div>
      </section>

      <section style={{ background:`${C.ink}04`, padding:"56px 28px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Label>Competencias clave</Label>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"0 40px" }}>
            {COMPETENCIAS.map((c,i) => (
              <li key={i} style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}70`, lineHeight:1.65, padding:"8px 0", borderBottom:`1px solid ${C.ink}08`, display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ color:C.terra, flexShrink:0, fontWeight:600 }}>—</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background:C.cream, padding:"40px 28px 56px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Label>Tecnologías y herramientas</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {HERRAMIENTAS.map((h,i) => (
              <span key={i} style={{ fontFamily:F.mono, fontSize:12, background:`${C.navy}10`, color:C.navy, padding:"5px 14px", borderRadius:3, display:"flex", alignItems:"center", gap:6 }}>
                {h.name}
                <span style={{ fontSize:10, color:`${C.navy}55`, background:`${C.navy}15`, padding:"1px 6px", borderRadius:2 }}>{h.cat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:C.cream, padding:"56px 28px 72px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Label>Experiencia profesional</Label>
          <div style={{ position:"relative", paddingLeft:24 }}>
            <div style={{ position:"absolute", left:0, top:10, bottom:10, width:1.5, background:`${C.ink}10` }}/>
            {TIMELINE.map((t,i) => (
              <div key={i} style={{ position:"relative", paddingBottom:36 }}>
                <div style={{ position:"absolute", left:-30, top:6, width:12, height:12, borderRadius:"50%", background:t.active ? C.terra : `${C.ink}20`, boxShadow:t.active ? `0 0 0 3px ${C.cream}, 0 0 0 5px ${C.terra}` : "none" }}/>
                <p style={{ fontFamily:F.mono, fontSize:11, color:t.active ? C.terra : `${C.ink}40`, marginBottom:4, letterSpacing:0.5 }}>{t.yr}</p>
                <h3 style={{ fontFamily:F.display, fontSize:19, fontWeight:600, color:C.ink, marginBottom:2 }}>{t.role}</h3>
                <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}55`, marginBottom:t.notes.length ? 10 : 0 }}>{t.org}</p>
                {t.notes.length > 0 && (
                  <ul style={{ padding:0, margin:0, listStyle:"none" }}>
                    {t.notes.map((n,j) => (
                      <li key={j} style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}65`, lineHeight:1.65, paddingLeft:14, position:"relative", marginBottom:3 }}>
                        <span style={{ position:"absolute", left:0, color:C.terra }}>—</span>{n}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:`${C.ink}04`, padding:"40px 28px 56px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <Label>Formación académica</Label>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ borderLeft:`3px solid ${C.terra}`, paddingLeft:20 }}>
              <p style={{ fontFamily:F.display, fontSize:17, fontWeight:600, color:C.ink }}>Maestría en Inteligencia Artificial para las Ciencias Sociales y del Comportamiento</p>
              <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}55`, marginTop:4 }}>Universidad Internacional de La Rioja (UNIR) · En curso</p>
            </div>
            <div style={{ borderLeft:`3px solid ${C.navy}`, paddingLeft:20 }}>
              <p style={{ fontFamily:F.display, fontSize:17, fontWeight:600, color:C.ink }}>Licenciatura en Educación y Administración de Centros Educativos</p>
              <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}55`, marginTop:4 }}>Universidad Metropolitana de Monterrey (UMM) · Titulado</p>
            </div>
            <div style={{ borderLeft:`3px solid ${C.ink}15`, paddingLeft:20 }}>
              <p style={{ fontFamily:F.display, fontSize:17, fontWeight:600, color:C.ink }}>Créditos hasta 6.° semestre — Economía</p>
              <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}55`, marginTop:4 }}>Universidad Autónoma de Nuevo León (UANL) · Formación de pregrado</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROYECTOS ─────────────────────────────────────────────────────────────
function Portfolio() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ paddingTop:60 }}>
      <section style={{ background:C.cream, padding:"72px 28px 48px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Label>Capacidades de desarrollo</Label>
          <h1 style={{ fontFamily:F.display, fontSize:"clamp(32px,5vw,54px)", fontWeight:700, color:C.ink, lineHeight:1.05, letterSpacing:"-1.5px", marginBottom:16 }}>Tipos de aplicaciones y artefactos EdTech</h1>
          <p style={{ fontFamily:F.body, fontSize:14, color:`${C.ink}50`, lineHeight:1.7 }}>Tipos de aplicaciones, sitios y artefactos educativos que puedo diseñar y desarrollar. Los enlaces son demos funcionales desarrollados para contextos reales.</p>
        </div>
      </section>
      <section style={{ background:C.cream, padding:"0 28px 80px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          {CASES.map((c,i) => (
            <div key={i} style={{ borderTop:`1px solid ${C.ink}12` }}>
              <button onClick={() => setOpen(open===i ? null : i)} style={{ width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", padding:"26px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                <div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                    <Tag accent={C.sage}>{c.tag}</Tag>
                  </div>
                  <h3 style={{ fontFamily:F.display, fontSize:"clamp(16px,2vw,21px)", fontWeight:600, color:C.ink, lineHeight:1.2 }}>{c.title}</h3>
                  <p style={{ fontFamily:F.mono, fontSize:11, color:`${C.ink}40`, marginTop:6, letterSpacing:0.3 }}>{c.impact}</p>
                </div>
                <span style={{ fontFamily:F.mono, fontSize:20, color:open===i ? C.terra : `${C.ink}30`, flexShrink:0, marginTop:4 }}>{open===i ? "−" : "+"}</span>
              </button>
              {open===i && (
                <div style={{ paddingBottom:30 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:24, marginBottom:20 }}>
                    <div>
                      <p style={{ fontFamily:F.mono, fontSize:10, color:C.terra, textTransform:"uppercase", letterSpacing:1.5, marginBottom:10 }}>Problema institucional</p>
                      <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}65`, lineHeight:1.75 }}>{c.prob}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily:F.mono, fontSize:10, color:C.navy, textTransform:"uppercase", letterSpacing:1.5, marginBottom:10 }}>Solución técnica</p>
                      <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}65`, lineHeight:1.75 }}>{c.sol}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily:F.mono, fontSize:10, color:C.sage, textTransform:"uppercase", letterSpacing:1.5, marginBottom:10 }}>Utilidad didáctica</p>
                      <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}65`, lineHeight:1.75 }}>{c.util}</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom: c.url ? 16 : 0 }}>
                    {c.tech.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", fontFamily:F.body, fontSize:12, fontWeight:600, color:C.terra, border:`1.5px solid ${C.terra}`, borderRadius:3, padding:"7px 16px", textDecoration:"none" }}>
                      Ver demo funcional →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${C.ink}12` }}/>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICIOS ─────────────────────────────────────────────────────────────
function SvcCard({ s, accent, setPage }) {
  return (
    <div style={{ background:C.cream, border:`1px solid ${C.ink}08`, borderRadius:6, padding:26, display:"flex", flexDirection:"column" }}>
      <div style={{ width:28, height:2, background:accent, marginBottom:16 }}/>
      <h3 style={{ fontFamily:F.display, fontSize:16, fontWeight:600, color:C.ink, lineHeight:1.3, marginBottom:8 }}>{s.title}</h3>
      <p style={{ fontFamily:F.mono, fontSize:11, color:accent, marginBottom:10, lineHeight:1.5 }}>Para: {s.for}</p>
      <p style={{ fontFamily:F.body, fontSize:12, color:`${C.ink}60`, lineHeight:1.65, marginBottom:6 }}><strong style={{ color:`${C.ink}75` }}>Incluye:</strong> {s.inc}</p>
      <p style={{ fontFamily:F.body, fontSize:12, color:`${C.ink}70`, lineHeight:1.65, marginBottom:18 }}><strong>Resultado:</strong> {s.res}</p>
      <button onClick={() => setPage("contact")} style={{ marginTop:"auto", alignSelf:"flex-start", fontFamily:F.body, fontSize:11, fontWeight:600, color:accent, background:"none", border:`1.5px solid ${accent}`, borderRadius:3, padding:"6px 14px", cursor:"pointer" }}>Contacto →</button>
    </div>
  );
}

function Services({ setPage }) {
  return (
    <div style={{ paddingTop:60 }}>
      <section style={{ background:C.cream, padding:"72px 28px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Label>Servicios</Label>
          <h1 style={{ fontFamily:F.display, fontSize:"clamp(32px,5vw,54px)", fontWeight:700, color:C.ink, lineHeight:1.05, letterSpacing:"-1.5px", maxWidth:520 }}>
            Diseño instruccional y soluciones EdTech
          </h1>
        </div>
      </section>
      <section style={{ background:C.cream, padding:"0 28px 72px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ borderLeft:`4px solid ${C.terra}`, paddingLeft:18, marginBottom:32 }}>
            <h2 style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:C.ink }}>Para instituciones educativas</h2>
            <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}50`, marginTop:4 }}>Colegios, preparatorias e instituciones de educación superior</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:16, marginBottom:56 }}>
            {SERVICES_COLEGIOS.map((s,i) => <SvcCard key={i} s={s} accent={C.terra} setPage={setPage}/>)}
          </div>
          <div style={{ borderLeft:`4px solid ${C.navy}`, paddingLeft:18, marginBottom:32 }}>
            <h2 style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:C.ink }}>Para empresas y corporaciones</h2>
            <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}50`, marginTop:4 }}>Capacitación corporativa, L&D e integración de IA generativa</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:16 }}>
            {SERVICES_EMPRESAS.map((s,i) => <SvcCard key={i} s={s} accent={C.navy} setPage={setPage}/>)}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACTO ──────────────────────────────────────────────────────────────
function Contact() {
  const [state, handleSubmit] = useForm("xvzjwojk");
  const iStyle = { fontFamily:F.body, fontSize:14, padding:"12px 14px", border:`1.5px solid ${C.ink}15`, borderRadius:4, background:"white", color:C.ink, outline:"none", width:"100%", boxSizing:"border-box" };

  return (
    <div style={{ paddingTop:60 }}>
      <section style={{ background:C.cream, padding:"72px 28px 96px" }}>
        <div style={{ maxWidth:620, margin:"0 auto" }}>
          <Label>Contacto</Label>
          <h1 style={{ fontFamily:F.display, fontSize:"clamp(32px,5vw,50px)", fontWeight:700, color:C.ink, lineHeight:1.05, letterSpacing:"-1.5px", marginBottom:12 }}>Trabajemos juntos</h1>
          <p style={{ fontFamily:F.body, fontSize:14, color:`${C.ink}55`, lineHeight:1.7, marginBottom:40 }}>
            Disponible para consultoría, talleres, proyectos EdTech y desarrollo de plataformas educativas.<br/>
            <span style={{ fontFamily:F.mono, fontSize:12, color:C.sage }}>Tiempo de respuesta: menos de 48 horas.</span>
          </p>

          {state.succeeded ? (
            <div style={{ background:`${C.sage}12`, border:`1px solid ${C.sage}40`, borderRadius:6, padding:40, textAlign:"center" }}>
              <p style={{ fontFamily:F.display, fontSize:22, fontWeight:600, color:C.ink, marginBottom:6 }}>Mensaje recibido.</p>
              <p style={{ fontFamily:F.body, fontSize:13, color:`${C.ink}50` }}>Me pondré en contacto en menos de 48 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>

              <div>
                <label style={{ fontFamily:F.mono, fontSize:10, color:`${C.ink}45`, letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Nombre completo</label>
                <input type="text" name="name" required placeholder="Nombre completo" style={iStyle}/>
                <ValidationError field="name" errors={state.errors} style={{ fontFamily:F.mono, fontSize:11, color:C.terra, marginTop:4, display:"block" }}/>
              </div>

              <div>
                <label style={{ fontFamily:F.mono, fontSize:10, color:`${C.ink}45`, letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Correo electrónico</label>
                <input type="email" name="email" required placeholder="correo@ejemplo.com" style={iStyle}/>
                <ValidationError field="email" errors={state.errors} style={{ fontFamily:F.mono, fontSize:11, color:C.terra, marginTop:4, display:"block" }}/>
              </div>

              <div>
                <label style={{ fontFamily:F.mono, fontSize:10, color:`${C.ink}45`, letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Tipo de proyecto</label>
                <select name="tipo_de_proyecto" defaultValue="" style={iStyle}>
                  <option value="" disabled>Seleccionar</option>
                  {["Formación docente","Plataforma educativa","Curso corporativo","Consultoría","Otro"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontFamily:F.mono, fontSize:10, color:`${C.ink}45`, letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Mensaje</label>
                <textarea name="message" required rows={5} placeholder="Descripción del proyecto o consulta" style={{ ...iStyle, resize:"vertical" }}/>
                <ValidationError field="message" errors={state.errors} style={{ fontFamily:F.mono, fontSize:11, color:C.terra, marginTop:4, display:"block" }}/>
              </div>

              {state.errors && state.errors.length > 0 && !state.errors[0].field && (
                <p style={{ fontFamily:F.mono, fontSize:12, color:C.terra }}>Error al enviar. Por favor intenta de nuevo.</p>
              )}

              <button type="submit" disabled={state.submitting} style={{
                fontFamily:F.body, fontSize:14, fontWeight:600,
                background: state.submitting ? `${C.terra}70` : C.terra,
                color:C.cream, border:"none", borderRadius:4,
                padding:"13px 28px", cursor: state.submitting ? "not-allowed" : "pointer",
                alignSelf:"flex-start", transition:"background 0.2s",
              }}>
                {state.submitting ? "Enviando…" : "Enviar"}
              </button>
            </form>
          )}

          <div style={{ marginTop:56, paddingTop:32, borderTop:`1px solid ${C.ink}10` }}>
            <Label>Datos de contacto</Label>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <a href="mailto:alvarezgzx@gmail.com" style={{ fontFamily:F.body, fontSize:14, color:C.terra, textDecoration:"none", fontWeight:500 }}>alvarezgzx@gmail.com</a>
              <a href="tel:+528126329304" style={{ fontFamily:F.body, fontSize:14, color:C.ink, textDecoration:"none", fontWeight:500 }}>+52 (81) 2632-9304</a>
              <a href="https://www.linkedin.com/in/angelalvarezg97/" target="_blank" rel="noopener noreferrer" style={{ fontFamily:F.body, fontSize:14, color:C.navy, textDecoration:"none", fontWeight:500 }}>LinkedIn — Ángel Álvarez G.</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${C.cream}}input:focus,textarea:focus,select:focus{border-color:${C.terra}!important}`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  const PAGES = { home:Home, about:About, portfolio:Portfolio, services:Services, contact:Contact };
  const Page  = PAGES[page];

  return (
    <div style={{ minHeight:"100vh", background:C.cream }}>
      <Nav page={page} setPage={setPage}/>
      <main><Page setPage={setPage}/></main>
      <Footer setPage={setPage}/>
    </div>
  );
}
