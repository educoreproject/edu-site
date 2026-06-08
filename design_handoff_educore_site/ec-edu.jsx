/* global React, EC, PrimaryNav, SubNav, Hero, PageFooter, ECContainer, Eyebrow, Btn */
// EDU section — Home/Overview, Board, History, Contact (matched to DSU.fig EDU-Layouts)

const EDU_SUB = ['Overview', 'Board', 'History', 'Contact'];

function Section({ bg = EC.white, children, pad = 72, style }) {
  return <div style={{ background: bg, padding: `${pad}px 0`, ...style }}>{children}</div>;
}

// ── EDU Home / Overview ─────────────────────────────────────────────────────
const EDU_DO = [
  'Act as a convening and organizing system for data standards',
  "Operate as a project home for initiatives and data standards work that don't have another home",
  'Act as a unifying force to reduce the confusion and proliferation of data standards',
  'Conduct research and educate the public on issues related to developing and encouraging the adoption of data interoperability standards, specifically designed to meet the needs of the education and workforce markets',
  'Include testing and validating interoperability systems',
  'Sponsor conferences, forums and collaborative events',
  'Perform other activities designed to meet the needs of the education and workforce market as they emerge',
];
const EDU_DONT = [
  'No substantial part of the activities of which is carrying on propaganda, or otherwise attempting to influence legislation, except as is otherwise provided by section 501(h) of the Internal Revenue Code.',
  'No part of any activities of the organization will include participating in or intervening in any political campaign on behalf of or in opposition to any candidate for public office.',
];
const UNIFICATION = [
  'Education Data Unlimited (EDU), in partnership with funders, leading organizations, and the signatories of Data Standards United (DSU), offers a groundbreaking opportunity to reduce the fragmentation of data standards that has long plagued education and workforce systems. The current landscape is filled with competing, overlapping, and disconnected standards, making it difficult for learners, educators, employers, and policymakers to navigate and exchange data effectively. By uniting key players — including 1EdTech, Access4Learning (A4L), Credential Engine, DublinCore, ED3, the Groningen Declaration Network, HR Open Standards (HROS), Medbiquitous, and the Postsecondary Education Standards Council (PESC) — EDU is spearheading an effort to consolidate and harmonize critical data frameworks.',
  'Through its role as a fully open, neutral convening force, EDU fosters collaboration among standards organizations, industry leaders, and government entities, creating a unified approach to data governance. This model aligns the ontologies, vocabularies, and technical frameworks that underpin existing standards, allowing organizations to integrate their data more efficiently while preserving the specificity needed for different domains.',
  'This partnership-driven strategy is the only scalable, sustainable way to ensure a future-proof data ecosystem. EDU and its DSU partners are building a shared digital infrastructure, much like the electrical grid or the internet, where stakeholders can plug in and operate efficiently without reinventing the wheel.',
];

function ListCard({ text }) {
  return (
    <div style={{ background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 6, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: EC.navy, marginTop: 9, flexShrink: 0 }} />
      <span style={{ fontFamily: EC.sans, fontSize: 15, lineHeight: 1.55, color: EC.ink }}>{text}</span>
    </div>
  );
}

function EDUHome() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="About EDU" />
      <SubNav crumb="EDU" links={EDU_SUB} active="Overview" />
      <Hero title="One infrastructure." title2="Endless possibility." minHeight={300}
        desc="Education Data Unlimited is the collaborative network and AI-powered platform that makes interoperable education, training, and workforce data a reality — advancing equity for every learner." />

      {/* Mission + Org description */}
      <Section>
        <ECContainer style={{ maxWidth: 1024, display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div>
            <Eyebrow color={EC.tealDk} style={{ marginBottom: 12 }}>Overview</Eyebrow>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, lineHeight: 1.2, color: '#000', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Mission Statement</h2>
            <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: '#000', margin: 0 }}>
              At Education Data Unlimited (EDU), we are building the foundation for a world where data seamlessly connects learning to opportunity. By uniting agencies, organizations, and industries across the entire education and workforce continuum, we eliminate fragmentation, harmonize data standards, and enable lifelong learning to be accurately recognized and valued. Through collaboration and sustainability, we create a future-proof ecosystem where data flows without barriers — supporting students, workers, and employers in an ever-evolving global economy.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, lineHeight: 1.2, color: '#000', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Organization Description</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Education Data Unlimited (EDU) is a non-profit catalyst for data collaboration across the entire education and workforce spectrum. We bridge horizontal sectors — from Pre-K to graduate education and workforce development — and vertical industries spanning government, military, healthcare, HR, and upskilling initiatives. Our goal is to unify standards, streamline interoperability, and reduce inefficiencies that hinder progress in learning, credentialing, and employment.',
                'EDU serves as a strategic convening force, providing a stable, long-term home for initiatives and frameworks that drive data interoperability. We champion an approach that is market-responsive yet mission-driven, ensuring that evolving technologies — including AI, digital credentials, and lifelong learning records — are built on a strong, sustainable foundation.',
                'By fostering open collaboration among key stakeholders and reducing redundant efforts, EDU advances a data standards ecosystem that is future-proof, cost-effective, and impactful. Our work empowers organizations to shift from proprietary silos to a shared digital infrastructure that supports innovation, accelerates workforce mobility, and unlocks new economic opportunities for individuals and communities worldwide.',
              ].map((p, i) => <p key={i} style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: '#000', margin: 0 }}>{p}</p>)}
            </div>
          </div>
        </ECContainer>
      </Section>

      {/* Things EDU will do / will not do */}
      <Section bg={EC.surface} style={{ borderTop: `1px solid ${EC.border}`, borderBottom: `1px solid ${EC.border}` }}>
        <ECContainer style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 56 }}>
            <div>
              <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 24, color: '#000', margin: '0 0 10px', lineHeight: 1.2 }}>Things EDU will do</h3>
              <p style={{ fontFamily: EC.sans, fontSize: 15, color: EC.inkSoft, margin: 0, lineHeight: 1.55 }}>The scope of activity Education Data Unlimited takes on as a convening body.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EDU_DO.map((t) => <ListCard key={t} text={t} />)}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 56 }}>
            <div>
              <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 24, color: '#000', margin: '0 0 10px', lineHeight: 1.2 }}>Things EDU will not do</h3>
              <p style={{ fontFamily: EC.sans, fontSize: 15, color: EC.inkSoft, margin: 0, lineHeight: 1.55 }}>Boundaries set by our 501(c)(3) charter.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EDU_DONT.map((t) => <ListCard key={t} text={t} />)}
            </div>
          </div>
        </ECContainer>
      </Section>

      {/* Opportunity for unification */}
      <Section>
        <ECContainer style={{ maxWidth: 1024 }}>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, lineHeight: 1.2, color: '#000', margin: '0 0 16px', letterSpacing: '-0.01em' }}>An Opportunity For Unification</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {UNIFICATION.map((p, i) => <p key={i} style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: '#000', margin: 0 }}>{p}</p>)}
          </div>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, lineHeight: 1.2, color: '#000', margin: '40px 0 16px', letterSpacing: '-0.01em' }}>Incorporation Information</h2>
          <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: '#000', margin: 0 }}>
            This corporation is organized exclusively for charitable and educational purposes within the meaning of section 501(c)(3) in the District of Columbia. The organization will engage in activities permissible under section 501(c)(3).
          </p>
        </ECContainer>
      </Section>
      <PageFooter />
    </div>
  );
}

// ── About / Board of Directors ──────────────────────────────────────────────
const BOARD = [
  { role: 'Chair',      name: 'Alex Jackl',     org: 'CEO of Bardic Systems, Chair of DSU', email: 'alex@bardicsystems.com' },
  { role: 'Co-Chair',   name: 'Open',           org: '', email: '' },
  { role: 'Vice-Chair', name: 'Francisco Valines', org: 'Director of Financial Aid, Florida International University', email: 'valinesf@fiu.edu' },
  { role: 'Treasurer',  name: 'George Gatsis',  org: 'CTO 95 Percent Group', email: 'ggatsis@95percentgroup.com' },
  { role: 'Secretary',  name: 'Jeff Simons',    org: 'CIO Washington School Information Processing Cooperative (WSIPC)', email: 'jsimons@wsipc.org' },
  { role: 'Member',     name: 'Ben Silberglitt', org: 'VP of Standards and Data, Level Data', email: 'Ben.Silberglitt@leveldata.com' },
  { role: 'Member',     name: 'Mark Cohen',     org: 'CA Community Colleges Technology Center', email: 'mcohen@ccctechcenter.org' },
  { role: 'Member',     name: 'Jay Pennington', org: 'Bureau Chief, Iowa Dept of Education', email: 'jay.pennington@iowa.gov' },
  { role: 'Member',     name: 'John Kraman',    org: 'CIO Mississippi Dept of Education', email: 'jkraman@mdek12.org' },
  { role: 'Member',     name: 'Kathy Warren',   org: 'Director of Education Data, Maine Dept of Education', email: 'katherine.warren@maine.gov' },
  { role: 'Member',     name: 'Robert Mcgough', org: 'Chief Data Officer, Arkansas Department of Information Services', email: 'robert.mcgough@arkansas.gov' },
];

function BoardCard({ m }) {
  return (
    <div style={{ background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 6, padding: '22px 24px', minHeight: 150, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: EC.navy, marginBottom: 10 }}>{m.role}</div>
      <div style={{ fontFamily: EC.sans, fontSize: 22, fontWeight: 700, color: '#000', marginBottom: m.org ? 6 : 0, lineHeight: 1.2 }}>{m.name}</div>
      {m.org && <div style={{ fontFamily: EC.sans, fontSize: 14, color: EC.inkSoft, lineHeight: 1.45, marginBottom: 12 }}>{m.org}</div>}
      {m.email && <a href={`mailto:${m.email}`} style={{ fontFamily: EC.sans, fontSize: 14, color: EC.link, textDecoration: 'none', marginTop: 'auto' }}>{m.email}</a>}
    </div>
  );
}

function AboutBoard() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="About EDU" />
      <SubNav crumb="EDU" links={EDU_SUB} active="Board" />
      <Hero title="Board of Directors" minHeight={167} />
      <Section>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {BOARD.map((m) => <BoardCard key={m.name + m.role} m={m} />)}
        </ECContainer>
      </Section>
      <PageFooter />
    </div>
  );
}

// ── About / History ─────────────────────────────────────────────────────────
const HISTORY = [
  { year: '2019', title: 'The conversation begins', text: 'Standards development organizations across education and workforce data recognize the growing cost of fragmentation and begin informal coordination on shared vocabularies.' },
  { year: '2021', title: 'Data Standards United forms', text: 'A coalition of SDOs, agencies, and practitioners signs on to a common-ground charter — committing to free, open, consensus-based standards across the PK-20W continuum.' },
  { year: '2023', title: 'CEDS sustainability work', text: 'DSU takes on stewardship initiatives for the Common Education Data Standards, convening the Tiger Team and launching the A4L Unity alignment project.' },
  { year: '2025', title: 'Education Data Unlimited launches', text: 'EDU is incorporated as a 501(c)(3) to serve as the neutral, long-term home for data interoperability initiatives — and to build EDUcore, the AI-native standards platform.' },
  { year: '2026', title: 'EDUcore open beta', text: 'The reference library, Graphinator, and Standards Partner tools enter open beta, giving practitioners AI-assisted access to harmonized education data standards.' },
];

function AboutHistory() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="About EDU" />
      <SubNav crumb="EDU" links={EDU_SUB} active="History" />
      <Hero title="Our history" minHeight={167}
        desc="From an informal conversation among standards bodies to a chartered non-profit building shared data infrastructure for education and the workforce." />
      <Section>
        <ECContainer style={{ maxWidth: 880 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {HISTORY.map((h, i) => (
              <div key={h.year} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32 }}>
                <div style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 40, color: EC.navy, lineHeight: 1 }}>{h.year}</div>
                <div style={{ borderLeft: `2px solid ${EC.border}`, paddingLeft: 32, paddingBottom: i < HISTORY.length - 1 ? 40 : 0, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', background: EC.teal, border: `2px solid ${EC.white}` }} />
                  <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 20, color: '#000', margin: '0 0 8px' }}>{h.title}</h3>
                  <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: EC.ink, margin: 0 }}>{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ECContainer>
      </Section>
      <PageFooter />
    </div>
  );
}

// ── About / Contact ───────────────────────────────────────────────────────────
function Field({ label, placeholder, full, area }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: full ? '1 / -1' : 'auto' }}>
      <span style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 600, color: EC.navy }}>{label}</span>
      {area
        ? <textarea rows={5} placeholder={placeholder} style={{ fontFamily: EC.sans, fontSize: 15, padding: '11px 14px', border: `1px solid ${EC.border}`, borderRadius: 4, resize: 'vertical', color: EC.ink }} />
        : <input placeholder={placeholder} style={{ fontFamily: EC.sans, fontSize: 15, padding: '11px 14px', border: `1px solid ${EC.border}`, borderRadius: 4, color: EC.ink }} />}
    </label>
  );
}

function AboutContact() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Contact" />
      <SubNav crumb="EDU" links={EDU_SUB} active="Contact" />
      <Hero title="Contact EDU" minHeight={167}
        desc="Questions about membership, the standards work, or EDUcore? Reach out and the team will point you in the right direction." />
      <Section>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'start' }}>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} onSubmit={(e) => e.preventDefault()}>
            <Field label="Name" placeholder="Your name" />
            <Field label="Organization" placeholder="Your organization" />
            <Field label="Email" placeholder="you@example.org" full />
            <Field label="How can we help?" placeholder="Tell us a little about your question…" full area />
            <div style={{ gridColumn: '1 / -1' }}><Btn variant="primary">Send message</Btn></div>
          </form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: EC.surface, border: `1px solid ${EC.border}`, borderRadius: 8, padding: '24px 26px' }}>
              <Eyebrow color={EC.tealDk} style={{ marginBottom: 10 }}>Direct</Eyebrow>
              <div style={{ fontFamily: EC.sans, fontSize: 16, fontWeight: 700, color: '#000', marginBottom: 4 }}>General inquiries</div>
              <a href="mailto:alex@bardicsystems.com" style={{ fontFamily: EC.sans, fontSize: 15, color: EC.link, textDecoration: 'none' }}>alex@bardicsystems.com</a>
            </div>
            <div style={{ background: EC.navy, borderRadius: 8, padding: '24px 26px' }}>
              <div style={{ fontFamily: EC.sans, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Join the collaborative</div>
              <p style={{ fontFamily: EC.sans, fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: '0 0 16px' }}>Interested in becoming a DSU signatory or affiliate member?</p>
              <Btn variant="teal">View joining information</Btn>
            </div>
          </div>
        </ECContainer>
      </Section>
      <PageFooter />
    </div>
  );
}

Object.assign(window, { EDUHome, AboutBoard, AboutHistory, AboutContact });
