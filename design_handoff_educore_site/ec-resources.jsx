/* global React, EC, PrimaryNav, SubNav, Hero, PageFooter, ECContainer, Eyebrow, Btn, NewsletterBand */
// Resources section — Library hub, Glossary, FAQ (matched to DSU.fig Resources-Layouts)

const RES_SUB = ['Library', 'Newsletter', 'Glossary', 'FAQ', 'Standards matrix', 'Press & charter'];

const RES_CARDS = [
  { meta: '12 documents', title: 'White Papers & Reports', desc: 'Peer-reviewed research, policy briefs, and technical reports from the EDU and DSU communities.', cta: 'Browse white papers →' },
  { meta: 'Current + archive', title: 'Newsletter', desc: 'Monthly updates on DSU activities, CEDS developments, EDUcore progress, and upcoming events.', cta: 'View newsletter →' },
  { meta: '200+ terms', title: 'Glossary', desc: 'Authoritative definitions for education data standards terminology — drawn from CEDS and DSU member organizations.', cta: 'Browse glossary →' },
  { meta: '30+ questions', title: 'FAQ', desc: 'Answers to the most common questions about EDU, DSU, CEDS, and the EDUcore platform.', cta: 'View FAQ →' },
  { meta: 'External resource', title: 'Standards Matrix', desc: 'The EdMatrix — a comprehensive crosswalk of education data standards by domain, sector, and organization.', cta: 'Open EdMatrix →' },
  { meta: 'Charter + releases', title: 'Press & Charter', desc: 'Press releases, the DSU charter document, and organizational governance materials.', cta: 'View documents →' },
];

function ResourcesHub() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Resources" />
      <SubNav crumb="Resources" links={RES_SUB} active="Library" />
      <Hero chip="RESOURCES" title="Resource library" minHeight={200}
        desc="White papers, newsletters, glossaries, and governance documents from Education Data Unlimited and the DSU community." />
      <div style={{ background: EC.white, padding: '72px 0' }}>
        <ECContainer>
          <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Browse by type</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>All resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {RES_CARDS.map((c) => (
              <div key={c.title} style={{ background: EC.white, border: `2px solid ${EC.gold}`, borderRadius: 8, padding: '24px 26px', display: 'flex', flexDirection: 'column', minHeight: 220 }}>
                <div style={{ fontFamily: EC.sans, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: EC.gold, marginBottom: 12 }}>{c.meta}</div>
                <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 20, color: '#000', margin: '0 0 10px', lineHeight: 1.25 }}>{c.title}</h3>
                <p style={{ fontFamily: EC.sans, fontSize: 15, lineHeight: 1.6, color: EC.ink, margin: '0 0 18px' }}>{c.desc}</p>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 600, color: EC.link, textDecoration: 'none', marginTop: 'auto' }}>{c.cta}</a>
              </div>
            ))}
          </div>
        </ECContainer>
      </div>
      <NewsletterBand bg={EC.navy} />
      <PageFooter />
    </div>
  );
}

// ── Glossary ──────────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: '504 Plan', def: 'A plan developed to ensure a student with a disability receives accommodations under Section 504 of the Rehabilitation Act.', cat: 'Education' },
  { term: 'AACRAO', def: 'American Association of Collegiate Registrars and Admissions Officers — a DSU signatory member organization.', cat: 'Education' },
  { term: 'A4L', def: 'Access 4 Learning Community — a non-profit that manages the SIF data standard for K-12 interoperability.', cat: 'Technology' },
  { term: 'CEDS', def: 'Common Education Data Standards — a national, voluntary effort to standardize key education data elements.', cat: 'Education' },
  { term: 'Credential Engine', def: 'An organization maintaining the Credential Transparency Description Language (CTDL) registry.', cat: 'Skills/Talent/Workforce' },
  { term: 'Interoperability', def: 'The ability of different information systems to exchange data and use the information that has been exchanged.', cat: 'Technology' },
  { term: 'LER', def: 'Learning and Employment Record — a digital record of an individual\'s learning and work history across providers.', cat: 'Skills/Talent/Workforce' },
  { term: 'Ontology', def: 'A formal specification of the concepts and relationships within a domain — the backbone of harmonized standards.', cat: 'Technology' },
  { term: 'PESC', def: 'Postsecondary Electronic Standards Council — a DSU signatory maintaining standards for postsecondary data exchange.', cat: 'Education' },
  { term: 'SEDM', def: 'Special Education Data Management — a cross-standard model for special education data across PK20W+ environments.', cat: 'Education' },
  { term: 'SIF', def: 'Schools Interoperability Framework — A4L\'s data model and integration specification for education software.', cat: 'Technology' },
];
const GLOSSARY_CATS = ['Education', 'Skills/Talent/Workforce', 'Technology'];

function ResourcesGlossary() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Resources" />
      <SubNav crumb="Resources" links={RES_SUB} active="Glossary" />
      <Hero chip="RESOURCES" title="Glossary" minHeight={167} bg={EC.teal900} />
      <div style={{ background: EC.white, padding: '64px 0' }}>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <Eyebrow color={EC.teal900} style={{ marginBottom: 14 }}>Categories</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: EC.sans, fontSize: 15, fontWeight: 700, color: '#000' }}>All terms</span>
              {GLOSSARY_CATS.map((c) => <span key={c} style={{ fontFamily: EC.sans, fontSize: 15, color: EC.link, cursor: 'pointer' }}>{c}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {GLOSSARY.map((g, i) => (
              <div key={g.term} style={{ padding: '18px 0', borderBottom: `1px solid ${EC.borderSoft}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 5 }}>
                  <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 18, color: '#000', margin: 0 }}>{g.term}</h3>
                  <span style={{ fontFamily: EC.sans, fontSize: 11.5, fontWeight: 600, color: EC.teal900, background: 'rgba(0,71,71,0.08)', borderRadius: 3, padding: '2px 8px' }}>{g.cat}</span>
                </div>
                <p style={{ fontFamily: EC.sans, fontSize: 15.5, color: EC.ink, lineHeight: 1.55, margin: 0 }}>{g.def}</p>
              </div>
            ))}
          </div>
        </ECContainer>
      </div>
      <NewsletterBand bg={EC.teal900} />
      <PageFooter />
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  { q: 'Ontological Modeling (including Person, Organizations and Events)', a: 'A project to support the work to create core data objects needed by most education applications and services in almost all horizontals and verticals. This work is in partnership with the CEDS and CTDL work and includes cross-standard cooperation with all the DSU standards.' },
  { q: 'Special Education Data Management (SEDM) and IDEA Compliance', a: 'A cross-standard (CEDS, A4L, and ed-fi) effort to create a universal special education data model that can be used in any PK20W+ environment.' },
  { q: 'P20W+ Learning and Employment Record (LER) Management', a: 'A project to harmonize all the efforts to create and define the LER — including the work being done in IEEE, HROS, T3, ADL, CEDS, 1EdTech, PESC, W3C, the INFUSE project, and many vendors in the wallet, credential, and employment space.' },
  { q: 'Standards Library', a: 'A web site and reference application that contains linked data to all the standards people need for the ecosystem regardless of who publishes them. It provides smart navigation, best practices, and links to useful reference implementations all under one roof.' },
  { q: 'Working with the Open Source Community (OSC) to create a sustainable home for CEDS', a: 'Setting up all the resources needed to sustain CEDS — available and either primarily housed or duplicated in an open location in case the ceds.ed.gov site goes down.' },
  { q: 'Structuring for Data Analytics and AI', a: 'Standardizing the way data needs to be stored, presented, and accessed so it is optimized to support the use of AI and analytics, and standardizing the outputs of AI so it can be used to positively impact learning.' },
  { q: 'Data Governance Modernization', a: 'Addressing privacy, access, ownership, longevity, and accuracy of data so learners control and own their data, and systems have the minimum they need to support self-sovereignty, learner mobility, and data portability.' },
];
const FAQ_CATS = ['About DSU', 'About EDU', 'About EDUcore'];

function ResourcesFAQ() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Resources" />
      <SubNav crumb="Resources" links={RES_SUB} active="FAQ" />
      <Hero chip="RESOURCES" title="Frequently asked questions" minHeight={167} bg={EC.teal900} />
      <div style={{ background: EC.white, padding: '64px 0' }}>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <Eyebrow color={EC.teal900} style={{ marginBottom: 14 }}>Categories</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQ_CATS.map((c, i) => <span key={c} style={{ fontFamily: EC.sans, fontSize: 15, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : EC.link, cursor: 'pointer' }}>{c}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQ.map((f) => (
              <div key={f.q} style={{ padding: '22px 0', borderBottom: `1px solid ${EC.borderSoft}` }}>
                <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 18, color: '#000', margin: '0 0 8px', lineHeight: 1.3 }}>{f.q}</h3>
                <p style={{ fontFamily: EC.sans, fontSize: 15.5, color: EC.ink, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </ECContainer>
      </div>
      <NewsletterBand bg={EC.teal900} />
      <PageFooter />
    </div>
  );
}

Object.assign(window, { ResourcesHub, ResourcesGlossary, ResourcesFAQ });
