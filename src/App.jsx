import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ICONS } from "./icons";
import { me, stats, jobs, skills, education, certs, projects } from "./data";

const WORDS = [
  "コード",
  "BUILD",
  "SHIP",
  "開発",
  "TEST",
  "</>",
  "DEBUG",
  "進化",
  "DEPLOY",
  "ログ",
  "MERGE",
  "完成",
];

/* ---------- Intro: panels fly in from off-screen like the Marvel comic reel ---------- */
function Intro({ onDone, reduced }) {
  const [k] = useState(() => (window.matchMedia("(max-width: 639px)").matches ? 0.7 : 1)); // shorter intro on phones
  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 300 : 3600 * k);
    return () => clearTimeout(t);
  }, [onDone, reduced, k]);

  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <div className="intro-grid">
        {WORDS.map((w, i) => {
          const a = i * 2.4;
          return (
            <motion.div
              key={w}
              className={`panel fill-${i % 4}`}
              initial={{
                x: `${Math.cos(a) * 130}vw`,
                y: `${Math.sin(a) * 130}vh`,
                rotate: (i % 2 ? 1 : -1) * (25 + i * 6),
              }}
              animate={{ x: 0, y: 0, rotate: ((i % 3) - 1) * 1.2 }}
              transition={{ delay: i * 0.13 * k, type: "spring", stiffness: 120, damping: 16 }}
            >
              <span className="sfx">{w}</span>
            </motion.div>
          );
        })}
      </div>
      <motion.h1
        className="intro-title"
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.0 * k, type: "spring", stiffness: 260, damping: 14 }}
      >
        {me.name}
      </motion.h1>
      <button className="skip" onClick={onDone}>
        Skip intro
      </button>
    </motion.div>
  );
}

/* ---------- A single comic panel that wipes open when scrolled into view ---------- */
function Panel({ i = 0, className = "", children }) {
  return (
    <motion.section
      className={`panel ${className}`}
      initial={{ opacity: 0, y: 24, rotate: -0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay: Math.min(i, 5) * 0.05 }}
    >
      {children}
    </motion.section>
  );
}

const Tags = ({ items }) => (
  <ul className="tags">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);

const Chapter = ({ no, title, jp }) => (
  <Panel i={0} className="chapter fill-2">
    <div>
      <p className="role">Chapter {no}</p>
      <h2>{title}</h2>
    </div>
    <span className="sfx">{jp}</span>
  </Panel>
);

/* ---------- Pages ---------- */
function CountUp({ to, suffix = "" }) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let t0;
    const step = (t) => {
      if (t0 === undefined) t0 = t;
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - (1 - k) ** 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, reduced]);
  return (
    <>
      {v}
      {suffix}
    </>
  );
}

/* Name that springs in letter by letter and bounces on hover */
const Kinetic = ({ text }) => {
  let n = 0;
  return (
    <h1 aria-label={text}>
      {text.split(" ").map((w) => (
        <span key={w} className="word" aria-hidden="true">
          {[...w].map((c) => (
            <motion.span
              key={n}
              className="ch"
              initial={{ y: "0.7em", opacity: 0, rotate: -10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.06 * n++, type: "spring", stiffness: 300, damping: 15 }}
              whileHover={{ y: -10, rotate: 4 }}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};

const Cover = () => (
  <div className="page cover">
    <Panel i={0} className="p-title fill-2">
      <Kinetic text={me.name} />
      <p className="role">{me.role}</p>
      <p className="meta live">
        <span className="dot" /> {me.status} · {me.location}
      </p>
      <div className="cta">
        <a className="btn alt" href="#projects">
          See my work
        </a>
        <a className="btn" href={`mailto:${me.email}?subject=Hello%20Arvin`}>
          Message me
        </a>
        <a className="btn" href={me.cv} download>
          Download CV
        </a>
      </div>
    </Panel>
    <Panel i={1} className="p-bubble">
      <p className="bubble">{me.tagline}</p>
    </Panel>
    <Panel i={2} className="fill-1 p-sfx">
      <motion.span
        className="sfx big"
        aria-hidden="true"
        animate={{ rotate: [-4, -1, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9, rotate: 6 }}
      >
        ドン!
      </motion.span>
    </Panel>
    <Panel i={3} className="p-stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <b>
            <CountUp to={s.n} suffix={s.suffix} />
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </Panel>
    <Panel i={4} className="p-skills">
      <p className="meta">Core stack</p>
      <ul className="tags chips big">
        {me.highlights.map((n, k) => (
          <Chip key={n} name={n} i={k} />
        ))}
      </ul>
    </Panel>
  </div>
);

const Experience = () => (
  <div className="page flow exp">
    <Chapter no={2} title="Experience" jp="経歴" />
    {jobs.map((j, i) => (
      <Panel key={j.company} i={i} className={j.wide ? "span2" : ""}>
        <h3>{j.company}</h3>
        {j.role && <p className="meta">{j.role}</p>}
        <p className="meta">{j.dates}</p>
        <ul className="log">
          {j.items.map((it) => (
            <li key={it.title}>
              <strong>
                {it.href ? (
                  <a href={it.href} target="_blank" rel="noreferrer">
                    {it.title}
                  </a>
                ) : (
                  it.title
                )}
                :
              </strong>{" "}
              {it.text}
            </li>
          ))}
        </ul>
      </Panel>
    ))}
  </div>
);

const GLYPH = { "C#": "C#", Java: "JV" };
const Chip = ({ name, i }) => (
  <li className="chip" style={{ "--i": i }}>
    {ICONS[name] ? (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICONS[name]} />
      </svg>
    ) : (
      <b className="glyph" aria-hidden="true">
        {GLYPH[name] || name[0]}
      </b>
    )}
    {name}
  </li>
);

const Skills = () => (
  <div className="page flow skills">
    <Chapter no={3} title="Skills" jp="技術" />
    {Object.entries(skills).map(([group, list], i) => (
      <Panel key={group} i={i}>
        <h3>{group}</h3>
        {group === "Soft skills" ? (
          <Tags items={list} />
        ) : (
          <ul className="tags chips">
            {list.map((n, k) => (
              <Chip key={n} name={n} i={k} />
            ))}
          </ul>
        )}
      </Panel>
    ))}
  </div>
);

const Certs = () => (
  <div className="page flow certs">
    <Chapter no={4} title="Certs & Education" jp="学歴" />
    <Panel i={0} className="span2">
      <h3>{education.school}</h3>
      <p className="meta">{education.degree}</p>
      <ul className="log">
        {education.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </Panel>
    {certs.map((g, i) => (
      <Panel key={g.group} i={i + 1}>
        <h3>{g.group}</h3>
        <ul className="log">
          {g.items.map((c) => (
            <li key={c.title}>
              <strong>{c.title}</strong>
              {c.by ? `, ${c.by}` : ""}
            </li>
          ))}
        </ul>
      </Panel>
    ))}
  </div>
);

const SHOTS = import.meta.glob("./assets/projects/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const shotFor = (slug) => Object.entries(SHOTS).find(([k]) => k.includes(`/${slug}.`))?.[1];

function ProjectCard({ p, i }) {
  const [open, setOpen] = useState(false);
  const img = shotFor(p.slug);
  return (
    <Panel i={i} className={`proj${open ? " open" : ""}`}>
      <div className="shot" aria-hidden="true">
        {img ? <img src={img} alt="" loading="lazy" /> : <span className="sfx">{p.title}</span>}
      </div>
      <h3>{p.title}</h3>
      {p.badge && <span className="badge">{p.badge}</span>}
      <p>{p.desc}</p>
      <Tags items={p.tags} />
      <span className="hoverhint">Hover to preview</span>
      <button className="peek" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Hide preview" : "Tap to preview"}
      </button>
      {p.href && (
        <a href={p.href} target="_blank" rel="noreferrer" className="btn">
          {p.cta || "View project"}
        </a>
      )}
    </Panel>
  );
}

const Projects = () => (
  <div className="page flow projects">
    <Chapter no={5} title="Projects" jp="作品" />
    {projects.map((p, i) => (
      <ProjectCard key={p.slug} p={p} i={i} />
    ))}
  </div>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${me.email}`;
    }
  };
  return (
    <div className="page contact">
      <motion.a
        className="panel p-end fill-1 msg"
        href={`mailto:${me.email}?subject=Hello%20Arvin`}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="tbc">
          Message me <span className="arrow">→</span>
        </h2>
      </motion.a>
      <Panel i={1} className="p-links">
        <h3>Say hello</h3>
        <p>
          {me.status}. Based in {me.location}. Tell me about your project and I'll get back to you.
        </p>
        <div className="actions">
          <a className="btn" href={me.cv} download>
            Download CV (PDF)
          </a>
          {me.links.map((l) => (
            <a key={l.href} className="btn alt" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
          <button className="btn alt" onClick={copy} aria-live="polite">
            {copied ? "Copied!" : "Copy email"}
          </button>
        </div>
      </Panel>
    </div>
  );
};

const PAGES = [
  { name: "Cover", slug: "cover", C: Cover },
  { name: "Experience", slug: "experience", C: Experience },
  { name: "Skills", slug: "skills", C: Skills },
  { name: "Certs & Education", slug: "certs", C: Certs },
  { name: "Projects", slug: "projects", C: Projects },
  { name: "Contact", slug: "contact", C: Contact },
];

/* ---------- Scroll progress ink bar ---------- */
function Progress({ stageRef }) {
  const { scrollYProgress } = useScroll({ container: stageRef });
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

/* ---------- App ---------- */
export default function App() {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(true);
  const finishIntro = useCallback(() => setIntro(false), []);
  const fromHash = () => {
    const i = PAGES.findIndex((p) => p.slug === window.location.hash.slice(1));
    return i < 0 ? 0 : i;
  };
  const [page, setPage] = useState(fromHash);
  const stageRef = useRef(null);
  const touch = useRef(null);

  const go = useCallback((n) => {
    setPage((p) => (n < 0 || n >= PAGES.length || n === p ? p : n));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  useEffect(() => {
    const onHash = () => setPage(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const h = `#${PAGES[page].slug}`;
    if (window.location.hash !== h) window.history.pushState(null, "", h);
    document.title = `${PAGES[page].name} | ${me.name}`;
  }, [page]);

  useEffect(() => {
    stageRef.current?.scrollTo(0, 0);
    document
      .querySelector(".nav [aria-current]")
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [page, intro]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = [t.clientX, t.clientY];
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current[0];
    const dy = t.clientY - touch.current[1];
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(page + (dx < 0 ? 1 : -1));
  };

  const Current = PAGES[page].C;

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <AnimatePresence>{intro && <Intro reduced={reduced} onDone={finishIntro} />}</AnimatePresence>
      {!intro && (
        <div className="book">
          <p className="sr" aria-live="polite">
            {`Page ${page + 1} of ${PAGES.length}: ${PAGES[page].name}`}{" "}
          </p>
          <div className="stage" ref={stageRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <main id="content" key={page}>
              <Current />
            </main>
          </div>
          <Progress stageRef={stageRef} />
          <p className="hint">Swipe left or right to turn the page</p>
          <nav className="nav" aria-label="Pages">
            <button onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">
              ◀
            </button>
            {PAGES.map((p, i) => (
              <button
                key={p.name}
                onClick={() => go(i)}
                aria-current={i === page ? "page" : undefined}
                className={i === page ? "on" : ""}
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={() => go(page + 1)}
              disabled={page === PAGES.length - 1}
              aria-label="Next page"
            >
              ▶
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
