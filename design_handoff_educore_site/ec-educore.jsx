/* global React, EC, PrimaryNav, SubNav, Hero, PageFooter, ECContainer, Eyebrow, Btn */
// EDUcore section — Overview / platform tools (matched to DSU.fig EDUcore-Layouts: violet hero)

const ECORE_SUB = ['Overview', 'Reference Library', 'Graphinator', 'Standards Partner', 'Prospectus'];

const ECORE_TOOLS = [
  { name: 'Reference Library', tag: 'Linked standards data', desc: 'A web reference application with linked data to every standard practitioners need — smart navigation, best practices, and links to reference implementations, all under one roof.' },
  { name: 'Graphinator', tag: 'AI mapping engine', desc: 'AI-assisted crosswalking that maps elements across CEDS, A4L, PESC, and other frameworks — turning manual mapping work that took months into an interactive graph.' },
  { name: 'Standards Partner', tag: 'Conversational guidance', desc: 'A conversational assistant trained on harmonized education data standards — answering implementation questions and pointing to authoritative sources in plain language.' },
  { name: 'Project Prospectus', tag: 'Initiative home', desc: 'A living catalog of the data-standards initiatives EDUcore hosts — scope, status, and how to get involved with each working group and project.' },
];

function ECoreCard({ t }) {
  return (
    <div style={{ background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 8, padding: '28px 28px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 28px rgba(43,51,181,0.06)' }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(62,77,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <span style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 20, color: EC.violet }}>{t.name[0]}</span>
      </div>
      <div style={{ fontFamily: EC.sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: EC.violet, marginBottom: 8 }}>{t.tag}</div>
      <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 21, color: '#000', margin: '0 0 10px', lineHeight: 1.25 }}>{t.name}</h3>
      <p style={{ fontFamily: EC.sans, fontSize: 15, lineHeight: 1.6, color: EC.ink, margin: '0 0 18px' }}>{t.desc}</p>
      <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 600, color: EC.link, textDecoration: 'none', marginTop: 'auto' }}>Explore {t.name} →</a>
    </div>
  );
}

function EDUcoreOverview() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="EDUcore" />
      <SubNav crumb="EDUcore" links={ECORE_SUB} active="Overview" />
      <Hero chip="EDUCORE" bg={EC.violet} minHeight={300}
        title="AI-powered tools for" title2="education data standards."
        desc="Establishing a unified, AI-sustained data infrastructure that enables secure, standards-based interoperability of assessments and credentials across the entire U.S. education-to-employment ecosystem." />

      <div style={{ background: EC.white, padding: '72px 0' }}>
        <ECContainer>
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <Eyebrow color={EC.violet} style={{ marginBottom: 12 }}>The platform</Eyebrow>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>One platform, four ways in</h2>
            <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: EC.ink, margin: 0 }}>
              EDUcore brings the harmonized standards work of DSU and CEDS into a set of AI-native tools — so practitioners can discover, understand, and apply education data standards without the manual overhead.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {ECORE_TOOLS.map((t) => <ECoreCard key={t.name} t={t} />)}
          </div>
        </ECContainer>
      </div>

      {/* Violet CTA */}
      <div style={{ background: EC.violet, padding: '56px 0' }}>
        <ECContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 28, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>EDUcore is in open beta</h2>
            <p style={{ fontFamily: EC.sans, fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.55 }}>Try the reference library, Graphinator, and Standards Partner — and tell us what the standards community needs next.</p>
          </div>
          <Btn variant="teal">Request beta access</Btn>
        </ECContainer>
      </div>
      <PageFooter />
    </div>
  );
}

window.EDUcoreOverview = EDUcoreOverview;
