import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const PHOTO = "data:image/jpeg;base64,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";

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
          <img
            src={PHOTO}
            alt="Ángel Álvarez"
            style={{
              width:160, height:160,
              borderRadius:6,
              objectFit:"cover",
              objectPosition:"center top",
              marginBottom:32,
              display:"block",
              border:`3px solid ${C.ink}10`,
            }}
          />
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
