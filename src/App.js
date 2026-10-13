import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BrainCircuit,
  Download,
  GraduationCap,
  LineChart,
  Mail,
  Menu,
  Server,
  Sparkles,
  X,
} from "lucide-react";

/* ---------------------------------------------------------------- data --- */

const PROFILE = {
  name: "Akash Kumar Barnwal",
  role: "AI Engineer · Machine Learning Engineer · Data Scientist",
  email: "barnwalakash60973@gmail.com",
  resume:
    "https://drive.google.com/file/d/1Na75mWGMHSzn-epl6PjiZN03sQ7qmy6n/view?usp=sharing",
};

const SPECS = [
  { label: "Focus", value: "Applied ML, LLM systems" },
  { label: "Studying", value: "M.Sc. AI & ML, IIIT Lucknow" },
  { label: "Deployed", value: "2 live services" },
  { label: "Available for", value: "Internships, full-time" },
];

const SOCIALS = [
  {
    name: "GitHub",
    handle: "barnwalakash60973-pixel",
    href: "https://github.com/barnwalakash60973-pixel",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    handle: "Akash Kumar Barnwal",
    href: "https://www.linkedin.com/in/akash-kumar-barnwal-31968a380/",
    icon: LinkedinIcon,
  },
  {
    name: "Kaggle",
    handle: "sumeakash",
    href: "https://www.kaggle.com/sumeakash",
    icon: KaggleIcon,
  },
  {
    name: "Email",
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
  },
];

const PROJECTS = [
  {
    title: "Global Superstore profit prediction",
    summary:
      "End-to-end profit forecasting service: ensemble regression over 51K historical orders, SHAP explanations for every prediction, packaged in Docker and served through FastAPI with a Streamlit front end.",
    stack: ["Python", "Scikit-Learn", "FastAPI", "Streamlit", "Docker", "SHAP"],
    metrics: [
      { value: "0.77", label: "R² on held-out orders" },
      { value: "51K", label: "orders trained on" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://global-superstore-profit-prediction-5chk.onrender.com/",
        primary: true,
      },
      {
        label: "Source",
        href: "https://github.com/barnwalakash60973-pixel/global-superstore-profit-prediction",
      },
    ],
    featured: true,
  },
  {
    title: "Stock market MLOps pipeline",
    summary:
      "Automated pipeline covering ingestion, feature engineering, training and evaluation, wired to DVC and MLflow for versioning and experiment tracking, with GitHub Actions shipping each model to a FastAPI endpoint.",
    stack: ["CatBoost", "MLflow", "DVC", "GitHub Actions", "FastAPI", "AWS"],
    metrics: [{ value: "CI/CD", label: "retrain to deploy" }],
    links: [
      {
        label: "Live demo",
        href: "https://stock-market-mlops-pipeline-1.onrender.com/",
        primary: true,
      },
      {
        label: "Source",
        href: "https://github.com/barnwalakash60973-pixel/Stock-Market-MLOps-Pipeline",
      },
    ],
  },
  {
    title: "AlphaGraphIQ",
    summary:
      "Ask questions about the market in plain English. A LangGraph agent routes between SQL Server, a news tool and web research over MCP, then returns charts and written analysis in one interface.",
    stack: ["FastMCP", "LangGraph", "Google Gemini", "SQL Server", "CSS", "Streamlit"],
    metrics: [{ value: "MCP", label: "multi-tool agent" }],
    links: [
      {
        label: "Source",
        href: "https://github.com/barnwalakash60973-pixel/AlphaGraphIQ",
        primary: true,
      },
    ],
  },
  {
    title: "Papeer",
    summary:
      "Research assistant for academic literature. Hybrid BM25 and vector retrieval with a BGE reranker, a knowledge graph across papers, and claim verification that flags answers the sources do not support.",
    stack: ["LangGraph", "Qdrant", "BM25", "BGE Reranker", "NetworkX", "Ollama"],
    metrics: [{ value: "Hybrid RAG", label: "grounded answers" }],
    links: [
      {
        label: "Source",
        href: "https://github.com/barnwalakash60973-pixel/Papier",
        primary: true,
      },
    ],
  },
];

const CAPABILITIES = [
  {
    title: "Machine learning",
    icon: BrainCircuit,
    blurb:
      "Framing a business question as a model, then getting it to hold up on data it has not seen.",
    tools: [
      "Scikit-Learn",
      "XGBoost",
      "CatBoost",
      "Feature engineering",
      "SHAP",
      "TimeSeriesSplit",
    ],
  },
  {
    title: "Deep learning and NLP",
    icon: Brain,
    blurb:
      "Training and fine-tuning neural models for text, and turning language into usable representations.",
    tools: ["PyTorch", "TensorFlow", "Keras", "Embeddings", "Transformers"],
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    blurb:
      "Retrieval, tool use and agent orchestration, built so answers can be traced back to a source.",
    tools: ["LangChain", "LangGraph", "RAG", "MCP", "Qdrant", "LangSmith"],
  },
  {
    title: "MLOps and deployment",
    icon: Server,
    blurb:
      "Versioning data and models, tracking experiments, and shipping the result behind a real endpoint.",
    tools: ["FastAPI", "MLflow", "DVC", "Docker", "GitHub Actions", "AWS"],
  },
  {
    title: "Financial analytics",
    icon: LineChart,
    blurb:
      "Return forecasting and quantitative modelling on market data, with honest backtesting.",
    tools: ["Time series", "Backtesting", "SQL", "Pandas", "Streamlit"],
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. Artificial Intelligence & Machine Learning",
    school: "IIIT Lucknow",
    period: "2025 — 2027",
    focus: "Machine learning, deep learning, generative AI",
  },
  {
    degree: "B.Sc. Mathematics",
    school: "Vinoba Bhave University, Hazaribagh",
    period: "2021 — 2024",
    focus: "Mathematics and statistics",
  },
];

const ACHIEVEMENTS = [
  "Kaggle Expert, working on machine learning and financial analytics competitions",
  "Shipped two ML applications to production on Render, containerised with Docker",
  "Built explainable models with SHAP so business users can act on the output",
  "Designed financial ML systems for stock return forecasting and market analytics",
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_TAGS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "CatBoost",
  "LangChain", "LangGraph", "RAG", "MCP", "MLflow", "DVC", "FastAPI",
  "Docker", "GitHub Actions", "AWS", "SQL", "Streamlit", "Qdrant", "SHAP",
];

/* --------------------------------------------------------------- icons --- */

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.108-.776.42-1.305.763-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.235 0 1.615-.015 2.915-.015 3.31 0 .32.21.695.825.575C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function KaggleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.045.149.027.255-.063.345l-6.555 6.344 6.836 8.507c.083.104.105.207.054.31z" />
    </svg>
  );
}

/* ------------------------------------------------------------ primitives --- */

function Shell({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-shell px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/* Fades and lifts content in once as it scrolls into view. Skipped entirely
   when the visitor prefers reduced motion. */
function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ title, deck }) {
  return (
    <Reveal className="max-w-2xl">
      <h2
        className="text-3xl font-bold tracking-tightest text-ink sm:text-[2.75rem] sm:leading-[1.08]"
      >
        {title}
      </h2>
      {deck ? <p className="mt-4 text-base leading-relaxed text-slate2">{deck}</p> : null}
    </Reveal>
  );
}

function Tag({ children }) {
  return (
    <span className="chip rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.72rem] text-slate2">
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- header --- */

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-paper/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <Shell className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight text-ink">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-xl bg-btn font-display text-sm font-bold text-white ring-1 ring-white/15"
          >
            AK
          </span>
          {PROFILE.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-cyan" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-btn px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-btnHover sm:inline-block"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded border border-line p-2 text-ink md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Shell>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-card md:hidden"
          >
            <Shell className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3.5 text-base text-ink last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </Shell>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------------------------------------------- hero --- */

function Hero() {
  const reduce = useReducedMotion();
  const availability = SPECS.find((spec) => spec.label === "Available for")?.value;
  const rise = (delay) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="hero-bg pointer-events-none absolute inset-0" />
      <Shell className="relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
        <div>
          {availability ? (
            <motion.p
              {...rise(0)}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-slate2"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Available for {availability.toLowerCase()}
            </motion.p>
          ) : null}
          <motion.h1
            {...rise(0.04)}
            className="text-[2.75rem] font-bold leading-[1.04] tracking-tightest text-ink sm:text-6xl lg:text-[4.5rem]"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p {...rise(0.1)} className="mt-5 text-lg font-medium text-violet sm:text-xl">
            {PROFILE.role.split(" · ").map((part, i) => (
              <React.Fragment key={part}>
                {i > 0 ? (
                  <>
                    <span aria-hidden="true" className="mx-2.5 text-cyan">
                      ·
                    </span>
                    <span className="sr-only">, </span>
                  </>
                ) : null}
                {part}
              </React.Fragment>
            ))}
          </motion.p>

          <motion.p
            {...rise(0.14)}
            className="mt-6 max-w-[54ch] text-base leading-relaxed text-slate2 sm:text-lg"
          >
            I build machine learning systems that make it all the way to production —
            from raw data and feature engineering through to containerised services,
            tracked experiments and models whose predictions can be explained.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-btnHover hover:shadow-accent/40"
            >
              See the work
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3 text-sm font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
            >
              <Download size={16} aria-hidden="true" />
              Download résumé
            </a>
          </motion.div>

          <motion.ul {...rise(0.26)} className="mt-10 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-slate2 transition duration-200 hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
                >
                  <social.icon className="h-[17px] w-[17px]" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...(reduce
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 18 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
              })}
          className="photo-card mx-auto w-full max-w-sm overflow-hidden rounded-2xl lg:max-w-none"
        >
          <div className="flex justify-center px-6 pb-9 pt-11">
            <div className="relative w-[66%]">
              <div aria-hidden="true" className="avatar-glow absolute -inset-10 rounded-full" />
              <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-violet/20" />
              <div className="avatar-ring relative rounded-full p-[3px]">
                <img
                  src="/profile-avatar.png"
                  alt={PROFILE.name}
                  width="800"
                  height="800"
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <dl className="divide-y divide-line border-t border-line">
            {SPECS.filter((spec) => spec.label !== "Available for").map((spec) => (
              <div key={spec.label} className="flex items-baseline gap-4 px-5 py-3">
                <dt className="w-28 flex-none text-sm text-muted">{spec.label}</dt>
                <dd className="text-sm font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------- marquee --- */

function Marquee() {
  const half = (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {MARQUEE_TAGS.map((tag) => (
        <span key={tag} className="rounded-full border border-line bg-paper/60 px-3 py-1 font-mono text-xs text-slate2">
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-mask overflow-hidden border-b border-line bg-section py-4" aria-hidden="true">
      {/* Two identical halves: translating the track by -50% loops seamlessly. */}
      <div className="marquee-track flex w-max whitespace-nowrap">
        {half}
        {half}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- about --- */

function About() {
  const stats = [
    { value: "4", label: "AI projects built end to end" },
    { value: "2", label: "services live in production" },
    { value: "51K", label: "orders modelled" },
    { value: "M.Sc.", label: "AI & ML, in progress" },
  ];

  return (
    <section id="about" className="border-b border-line py-20 sm:py-28">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHead
              title="Data is only useful once someone can act on it"
              deck="I'm an M.Sc. Artificial Intelligence & Machine Learning student at IIIT Lucknow, working across data science and AI engineering."
            />
            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-slate2">
              Most of my work starts with a messy dataset and ends with something running:
              a FastAPI service, a Streamlit app, a pipeline that retrains itself. Along the
              way that means feature engineering, model selection, honest evaluation, and
              enough explainability that a non-technical stakeholder can see why the model
              said what it said.
            </p>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-slate2">
              Lately I've been spending most of my time on LLM systems — retrieval,
              agents and tool use — and on the MLOps side that keeps any of it
              maintainable: MLflow, DVC, Docker and CI that ships a model without
              a human copying files around.
            </p>
          </div>

          <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-5 py-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-mono text-3xl font-medium tracking-tight text-ink">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------- projects --- */

function ProjectLinks({ links }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            link.primary
              ? "bg-btn text-white hover:bg-btnHover"
              : "border border-line text-ink hover:border-cyan/60 hover:text-cyan"
          }`}
        >
          {link.label}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

function Metrics({ metrics }) {
  return (
    <ul className="flex flex-wrap gap-x-10 gap-y-4">
      {metrics.map((m) => (
        <li key={m.label}>
          <span
            className={`block font-mono text-2xl font-medium tracking-tight ${
              "text-violet"
            }`}
          >
            {m.value}
          </span>
          <span className={`mt-1 block text-sm text-muted`}>
            {m.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className="featured-card card-hover overflow-hidden rounded-2xl border border-line text-ink">
      <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-slate2">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.72rem] text-slate2"
              >
                {tech}
              </li>
            ))}
          </ul>

          <ProjectLinks links={project.links} />
        </div>

        <div className="lg:border-l lg:border-line lg:pl-10">
          <Metrics metrics={project.metrics} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-7">
      <h3 className="text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate2">{project.summary}</p>

      <div className="mt-6">
        <Metrics metrics={project.metrics} />
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      <ProjectLinks links={project.links} />
    </article>
  );
}

function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-b border-line bg-section py-20 sm:py-28">
      <Shell>
        <SectionHead
          title="Selected work"
          deck="Four systems, each built from the data layer up to something you can open in a browser or read on GitHub."
        />

        <div className="mt-12 space-y-6">
          {featured ? (
            <Reveal>
              <FeaturedProject project={featured} />
            </Reveal>
          ) : null}
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.07} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* --------------------------------------------------------- capabilities --- */

function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-line py-20 sm:py-28">
      <Shell>
        <SectionHead
          title="What I can build for you"
          deck="The five areas I work in, and the tools I reach for in each."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={(i % 3) * 0.06}
              className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
            <div className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                <cap.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate2">{cap.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cap.tools.map((tool) => (
                  <li key={tool}>
                    <Tag>{tool}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------ education --- */

function Education() {
  return (
    <section id="education" className="border-b border-line bg-section py-20 sm:py-28">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead title="Education" />
            <Reveal delay={0.05}>
            <ol className="mt-10 space-y-8 border-l border-line pl-7">
              {EDUCATION.map((edu) => (
                <li key={edu.degree} className="relative">
                  <span
                    className="absolute -left-[2.625rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-card text-cyan"
                    aria-hidden="true"
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                  </span>
                  <p className="font-mono text-xs text-muted">{edu.period}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm text-slate2">{edu.school}</p>
                  <p className="mt-1 text-sm text-muted">{edu.focus}</p>
                </li>
              ))}
            </ol>
            </Reveal>
          </div>

          <div>
            <SectionHead title="Alongside that" />
            <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
              {ACHIEVEMENTS.map((item) => (
                <li key={item} className="px-6 py-5 text-sm leading-relaxed text-slate2">
                  {item}
                </li>
              ))}
            </ul>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------- contact --- */

function Contact() {
  return (
    <section id="contact" className="contact-bg relative overflow-hidden py-20 text-ink sm:py-28">
      <Shell className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tightest sm:text-[2.6rem] sm:leading-[1.1]">
              Have a problem worth modelling?
            </h2>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-slate2">
              I'm open to internships, full-time roles, research collaborations and
              freelance work in machine learning, AI engineering and financial analytics.
              The fastest way to reach me is email — I reply to everything.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:bg-btnHover"
            >
              <Mail size={16} aria-hidden="true" />
              {PROFILE.email}
            </a>
          </div>

          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card/70 backdrop-blur">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <social.icon className="h-4 w-4 flex-none text-cyan" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{social.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {social.handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 flex-none text-muted transition-transform group-hover:text-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-[#070B1A] py-8 text-muted">
      <Shell className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <p>Machine learning, data science and AI engineering</p>
      </Shell>
    </footer>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-btn focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Capabilities />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
