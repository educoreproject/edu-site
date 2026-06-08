/* global React */
// ============================================================================
// EDUcore — shared foundation, matched to the approved DSU.fig
// Tokens, fonts, brand chip, globe, primary nav, contextual sub-nav, hero band,
// footer, and small primitives. Every page is built on these.
// ============================================================================

// ── Design tokens (sampled from the Figma) ─────────────────────────────────
const EC = {
  navy:      '#002B70',  // rgb(0,43,112)   primary brand navy / hero band
  navySub:   '#0D3B66',  // rgb(13,59,102)  contextual sub-nav bar
  navyDeep:  '#0C171D',  // rgb(12,23,29)   brand chip background
  navyMid:   '#0D538C',  // rgb(13,83,140)
  teal:      '#00B9BB',  // rgb(0,185,187)  brand dot / accent
  tealSoft:  '#5FBEBF',  // rgb(95,190,191) eyebrow text on dark
  tealDk:    '#00797A',  // rgb(0,121,122)
  tealDkr:   '#004747',  // rgb(0,71,71)
  gold:      '#FBB244',  // rgb(251,178,68) member-card stroke / accent
  violet:    '#3E4DED',  // rgb(62,77,237)  EDUcore brand hero
  violetDk:  '#2B33B5',
  teal900:   '#004747',  // rgb(0,71,71)    Glossary/FAQ/Events hero
  cream:     '#FFF3EA',  // rgb(255,243,234)
  link:      '#0F62FE',  // rgb(15,98,254)  active breadcrumb / footer links
  ink:       '#2E2E2E',  // rgb(46,46,46)   body text
  inkSoft:   '#5b6670',
  white:     '#FDFDFD',  // rgb(253,253,253)
  surface:   '#F4F5F6',  // rgb(244,245,246) light surface
  border:    '#CCD0D6',  // rgb(204,208,214)
  borderSoft:'#E4E5E6',
  sans:   '"Public Sans Web","Public Sans","Helvetica Neue",Arial,sans-serif',
  legible:'"Atkinson Hyperlegible","Public Sans Web",Arial,sans-serif',
  cond:   '"Roboto Condensed","Public Sans Web",Arial,sans-serif',
};
const PAGE_W = 1280;
const INSET = 128;          // side margin → 1024 content
window.EC = EC;

// ── Inject web fonts once ───────────────────────────────────────────────────
(function injectFonts() {
  if (document.getElementById('ec-fonts')) return;
  const l = document.createElement('link');
  l.id = 'ec-fonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Roboto+Condensed:wght@400;500;700&display=swap';
  document.head.appendChild(l);
})();

// ── Globe line-art (hero background) ────────────────────────────────────────
function Globe({ size = 760, color = 'rgba(255,255,255,0.07)', style }) {
  const r = 250, cx = 256, cy = 256;
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} aria-hidden="true"
      style={{ display: 'block', ...style }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      {/* latitudes */}
      {[-160, -90, 0, 90, 160].map((o) => (
        <ellipse key={'lat' + o} cx={cx} cy={cy + o} rx={Math.sqrt(Math.max(0, r * r - o * o))} ry={Math.sqrt(Math.max(0, r * r - o * o)) * 0.16}
          fill="none" stroke={color} strokeWidth="1.5" />
      ))}
      {/* longitudes */}
      {[1, 0.6, 0.28].map((k, i) => (
        <ellipse key={'lon' + i} cx={cx} cy={cy} rx={r * k} ry={r} fill="none" stroke={color} strokeWidth="1.5" />
      ))}
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ── Brand chip — "● EDUCATION DATA UNLIMITED" ───────────────────────────────
function BrandChip({ label = 'EDUCATION DATA UNLIMITED' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: EC.navyDeep, borderRadius: 6, padding: '4px 10px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: EC.teal }} />
      <span style={{ fontFamily: EC.sans, fontSize: 13, letterSpacing: '-0.01em', color: EC.tealSoft, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────
function ECContainer({ children, style }) {
  return <div style={{ maxWidth: PAGE_W, margin: '0 auto', padding: `0 ${INSET}px`, ...style }}>{children}</div>;
}

function Eyebrow({ children, color = EC.navy, style }) {
  return <div style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color, ...style }}>{children}</div>;
}

// USWDS-style button. variant: primary | outline | inverse | unstyled
function Btn({ children, variant = 'primary', onDark = false, style }) {
  const base = { fontFamily: EC.sans, fontSize: 15, fontWeight: 600, borderRadius: 4, padding: '12px 20px', cursor: 'pointer', border: '2px solid transparent', lineHeight: 1.1, whiteSpace: 'nowrap', transition: 'background .12s, color .12s' };
  const v = {
    primary: { background: EC.link, color: '#fff' },
    teal:    { background: EC.teal, color: EC.navyDeep },
    gold:    { background: EC.gold, color: EC.navyDeep },
    outline: { background: 'transparent', color: onDark ? '#fff' : EC.link, borderColor: onDark ? 'rgba(255,255,255,0.6)' : EC.link },
    unstyled:{ background: 'transparent', color: onDark ? '#fff' : EC.link, padding: '12px 4px', textDecoration: 'underline', textUnderlineOffset: 3 },
  }[variant];
  return <button style={{ ...base, ...v, ...style }}>{children}</button>;
}

// ── Primary navigation (white bar, navy logo square, 7 pills) ───────────────
const PRIMARY_NAV = ['DSU', 'About EDU', 'CEDS', 'EDUcore', 'Resources', 'Events', 'Contact'];

function PrimaryNav({ active = 'About EDU' }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, height: 61, background: EC.white, borderBottom: `1px solid ${EC.borderSoft}`, display: 'flex', alignItems: 'stretch' }}>
      <div style={{ width: 61, background: EC.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src="assets/educore-logo.png" alt="EDU" style={{ height: 22, filter: 'brightness(0) invert(1)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, paddingRight: INSET }}>
        {PRIMARY_NAV.map((n) => {
          const on = n === active;
          return (
            <button key={n} style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: on ? 700 : 500, color: on ? '#fff' : EC.navy, background: on ? EC.navy : 'transparent', border: `1px solid ${on ? EC.navy : 'transparent'}`, borderRadius: 4, padding: '7px 13px', cursor: 'pointer' }}>
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Contextual sub-nav (navy bar, breadcrumb + section links) ───────────────
function SubNav({ crumb = 'EDU', links = [], active }) {
  return (
    <div style={{ height: 49, background: EC.navySub, display: 'flex', alignItems: 'center' }}>
      <ECContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: EC.legible, fontSize: 14, color: '#6da2ff', fontWeight: 700 }}>{crumb}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>›</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {links.map((l) => (
            <span key={l} style={{ fontFamily: EC.legible, fontSize: 14, color: l === active ? '#fff' : 'rgba(255,255,255,0.72)', fontWeight: l === active ? 700 : 400, cursor: 'pointer', borderBottom: l === active ? '2px solid #fff' : '2px solid transparent', paddingBottom: 2 }}>
              {l}
            </span>
          ))}
        </div>
      </ECContainer>
    </div>
  );
}

// ── Hero band (navy, globe, brand chip, heading) ────────────────────────────
function Hero({ chip = 'EDUCATION DATA UNLIMITED', title, title2, desc, children, minHeight = 167, bg = EC.navy }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: bg, minHeight }}>
      <div style={{ position: 'absolute', left: -90, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <Globe size={620} />
      </div>
      <ECContainer style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight, padding: `36px ${INSET}px`, gap: 16 }}>
        <BrandChip label={chip} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: title2 ? 4 : 0 }}>
          <h1 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 48, lineHeight: 1.15, letterSpacing: '-0.02em', color: EC.white, margin: 0, textWrap: 'pretty' }}>{title}</h1>
          {title2 && <h1 style={{ fontFamily: EC.sans, fontWeight: 400, fontSize: 48, lineHeight: 1.15, letterSpacing: '-0.02em', color: EC.white, opacity: 0.75, margin: 0 }}>{title2}</h1>}
        </div>
        {desc && <p style={{ fontFamily: EC.sans, fontWeight: 300, fontSize: 16, lineHeight: 1.5, color: 'rgba(255,255,255,0.92)', margin: 0, maxWidth: 720 }}>{desc}</p>}
        {children}
      </ECContainer>
    </div>
  );
}

// ── Footer (light, 6 columns) ───────────────────────────────────────────────
const FOOTER_COLUMNS = [
  { heading: 'DSU',       links: ['Overview', 'Signatory members', 'Affiliate members', 'Joining DSU', 'Projects'] },
  { heading: 'EDU',       links: ['Board', 'History', 'Contact'] },
  { heading: 'CEDS',      links: ['CEDS sustainability', 'A4L Unity project', 'Tiger Team', 'CEDS-SEDM'] },
  { heading: 'EDUcore',   links: ['Project prospectus', 'Reference library', 'Graphinator', 'Standards partner'] },
  { heading: 'Resources', links: ['White papers', 'Glossary', 'FAQ', 'Standards matrix', 'Press & charter'] },
  { heading: 'Events',    links: ['Calendar', 'Past events'] },
];

function PageFooter() {
  return (
    <footer style={{ background: EC.white, borderTop: `1px solid ${EC.border}`, padding: '48px 0 40px' }}>
      <ECContainer style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{ width: 48, height: 48, background: EC.navy, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <img src="assets/educore-logo.png" alt="EDU" style={{ height: 18, filter: 'brightness(0) invert(1)' }} />
          </div>
          <p style={{ fontFamily: EC.sans, fontSize: 13, lineHeight: 1.55, color: EC.inkSoft, margin: '0 0 16px' }}>Connecting the ecosystem of education data standards.</p>
          <div style={{ borderTop: `1px solid ${EC.border}`, paddingTop: 14, fontFamily: EC.sans, fontSize: 12, color: EC.inkSoft, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: EC.navy }}>Data Standards United</div>
            <div>All rights reserved · © 2026</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {FOOTER_COLUMNS.map((c) => (
            <div key={c.heading} style={{ minWidth: 120 }}>
              <div style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 700, color: EC.border, marginBottom: 14, letterSpacing: '0.02em' }}>{c.heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {c.links.map((l) => (
                  <span key={l} style={{ fontFamily: EC.sans, fontSize: 14, color: EC.link, cursor: 'pointer' }}>{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ECContainer>
    </footer>
  );
}

// ── Newsletter band (Resources / Events) ────────────────────────────────────
function NewsletterBand({ bg = EC.teal900 }) {
  return (
    <div style={{ background: bg, padding: '44px 0' }}>
      <ECContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: EC.sans, fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Newsletter</div>
          <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 24, color: '#fff', margin: '0 0 6px' }}>Stay current on standards</h3>
          <p style={{ fontFamily: EC.sans, fontSize: 15, color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.5 }}>Monthly updates on DSU activities, CEDS developments, EDUcore progress, and events. No spam, unsubscribe anytime.</p>
        </div>
        <Btn variant="primary">Subscribe now</Btn>
      </ECContainer>
    </div>
  );
}

Object.assign(window, { Globe, BrandChip, ECContainer, Eyebrow, Btn, PrimaryNav, SubNav, Hero, PageFooter, NewsletterBand });
