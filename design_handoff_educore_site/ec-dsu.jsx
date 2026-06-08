/* global React, EC, PrimaryNav, SubNav, Hero, PageFooter, ECContainer, Eyebrow, Btn */
// DSU section — Home, Members, Joining DSU, Projects (matched to DSU.fig DSU-Layouts)

const DSU_SUB = ['Home', 'Members', 'Joining DSU', 'Projects'];

function DSec({ bg = EC.white, children, pad = 72, style }) {
  return <div style={{ background: bg, padding: `${pad}px 0`, ...style }}>{children}</div>;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const DSU_PILLARS = [
  { label: 'Our Charter', text: 'Establish a "common ground" mechanism to coordinate and align disparate global data standards while respecting each organization\'s independence across systems, platforms, networks, sectors, and industries — produced or supported by the respective standards bodies.' },
  { label: 'Our Vision', text: 'Collaborate and align standards to support the global education and workforce digital ecosystem.' },
  { label: 'Our Mission', text: 'Establish a sustainable collaborative of Data Standards Development Organizations (SDOs) and their stakeholders across education, employment, and training sectors.' },
];
const DSU_VALUES = [
  { n: '1', title: 'Free Access', desc: 'Open, barrier-free access to data standards for all organizations and institutions, regardless of size or resources.' },
  { n: '2', title: 'Transparent Process', desc: 'Voluntary, consensus-based standards development, approval, and maintenance — visible and accountable to all members.' },
  { n: '3', title: 'Public Commitment', desc: 'Active public support of the Data Standards United collaborative and lifelong learning and employment standards.' },
];
const DSU_INITIATIVE = [
  'Support a seamless, lifelong learning infrastructure and sustainable standards.',
  'Provide an open forum for emerging and innovative technologies and business applications wishing to work within a standards environment.',
  'Promote existing standards-based solutions while not disrupting current investments in technology and systems.',
  'Foster an understanding of each stakeholder\'s role across education, employment, and training sectors.',
];
const DSU_VOICES = [
  { quote: 'By embracing our unique strengths and differences, DSU will enable us to create and evolve a roadmap for a more harmonious journey of growth, innovation and progress — as we leverage the past, serve the now and steer toward a better future together.', name: 'David K Moldoff', org: 'CEO and Founder, AcademyOne, Inc.' },
  { quote: 'The time for data standards bodies to work together to support lifelong learning PK20W+ is long overdue. Through open collaboration and sharing we can all work towards a world where data is seamlessly shared appropriately while ensuring privacy, security and learner agency.', name: 'Steve Smith', org: 'Executive Director, Access 4 Learning' },
  { quote: 'Innovation thrives on collaboration. Data Standards United brings standards organizations together, creating a fertile ground to craft a future where skills and opportunities connect effortlessly.', name: 'Jim Ireland', org: 'Executive Director, HR Open Standards' },
];
const DSU_VIDEOS = [
  { name: 'Jason Tyszko', title: 'Sr. Vice President', org: 'US Chamber of Commerce Foundation' },
  { name: 'Nancy Copa', title: 'CEDS Project Director', org: 'Education Data Unlimited' },
  { name: 'Duane Brown', title: 'Senior Business Analyst', org: 'AEM Education Data Standards' },
];
const SIGNATORY = [
  { name: 'Access 4 Learning (A4L)', url: 'a4l.org' },
  { name: 'Dublin Core Metadata Initiative (DCMI)', url: 'dublincore.org' },
  { name: 'HR Open Standards Consortium', url: 'hropenstandards.org' },
  { name: 'IMS Global Learning Consortium', url: 'imsglobal.org' },
  { name: 'Medbiquitous', url: 'medbiq.org' },
  { name: 'Postsecondary Electronic Standards Council (PESC)', url: 'pesc.org' },
  { name: 'Credential Engine', url: 'credentialengine.org' },
  { name: 'Ed3', url: 'ed3.org' },
  { name: 'Groningen Declaration Network', url: 'groningendeclaration.org' },
];
const AFFILIATE = [
  { name: 'Advanced Digital Learning (ADL) Initiative', url: 'adlnet.gov' },
  { name: 'Common Education Data Standards (CEDS)', url: 'ceds.ed.gov' },
  { name: 'IEEE Learning Technology Standards Committee (LTSC)', url: 'ieee.org' },
  { name: 'Loop Data', url: 'loopdataservices.com' },
];
const DSU_PROJECTS = [
  { tag: 'A4L Unity', title: 'Personal Privacy Balance', cat: 'Working Group · Free & Open' },
  { tag: 'A4L Unity', title: 'JSON-LD Transcript', cat: 'Development Workgroup · Free & Open' },
  { tag: 'A4L Unity', title: 'Gender Identity', cat: 'Task Force · Free & Open' },
  { tag: 'CEDS', title: 'CEDS Sustainability', cat: 'Stewardship · Active' },
  { tag: 'CEDS', title: 'A4L Unity CEDS Project', cat: 'Alignment · Active' },
  { tag: 'CEDS', title: 'CEDS-SEDM', cat: 'State Adoption · Active' },
];

// ── DSU Home ──────────────────────────────────────────────────────────────────
function DSUOverview() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="DSU" />
      <SubNav crumb="DSU" links={DSU_SUB} active="Home" />
      <Hero chip="DATA STANDARDS UNITED" title="The coordinating body for global education data standards." minHeight={300}
        desc="DSU is a standards collaborative operating on the principle that education, employment, and training data must speak the same language — openly, transparently, and across institutional boundaries.">
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Btn variant="primary">Become a member</Btn>
          <Btn variant="outline" onDark>View our projects</Btn>
        </div>
      </Hero>

      {/* Charter / Vision / Mission */}
      <DSec>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {DSU_PILLARS.map((p) => (
            <div key={p.label}>
              <Eyebrow color={EC.tealDk} style={{ marginBottom: 12 }}>{p.label}</Eyebrow>
              <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.6, color: EC.ink, margin: 0 }}>{p.text}</p>
            </div>
          ))}
        </ECContainer>
      </DSec>

      {/* Core values */}
      <DSec bg={EC.surface} style={{ borderTop: `1px solid ${EC.border}`, borderBottom: `1px solid ${EC.border}` }}>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 56 }}>
          <div>
            <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Core Values</Eyebrow>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>How we operate</h2>
            <p style={{ fontFamily: EC.sans, fontSize: 15, color: EC.inkSoft, margin: 0, lineHeight: 1.55 }}>All organizations within Data Standards United abide by these operating principles.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {DSU_VALUES.map((v) => (
              <div key={v.n} style={{ display: 'flex', gap: 20, background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 6, padding: '20px 24px' }}>
                <div style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 28, color: EC.teal, lineHeight: 1, minWidth: 28 }}>{v.n}</div>
                <div>
                  <div style={{ fontFamily: EC.sans, fontSize: 17, fontWeight: 700, color: EC.navy, marginBottom: 5 }}>{v.title}</div>
                  <div style={{ fontFamily: EC.sans, fontSize: 15, color: EC.ink, lineHeight: 1.55 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>

      {/* Our initiative */}
      <DSec>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Our Initiative</Eyebrow>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>Data Standards United for Lifelong Learning and Employment</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DSU_INITIATIVE.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '14px 0', borderBottom: i < DSU_INITIATIVE.length - 1 ? `1px solid ${EC.borderSoft}` : 'none' }}>
                <div style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 22, color: EC.navy, minWidth: 30 }}>{String(i + 1).padStart(2, '0')}</div>
                <p style={{ fontFamily: EC.sans, fontSize: 16, lineHeight: 1.55, color: EC.ink, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>

      {/* Member voices */}
      <DSec bg={EC.surface} style={{ borderTop: `1px solid ${EC.border}` }}>
        <ECContainer>
          <Eyebrow color={EC.tealDk} style={{ marginBottom: 12 }}>Member Voices</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Why organizations join DSU</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {DSU_VOICES.map((t) => (
              <div key={t.name} style={{ background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 8, padding: '28px 26px' }}>
                <div style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 44, color: EC.gold, lineHeight: 0.6, marginBottom: 10 }}>“</div>
                <p style={{ fontFamily: EC.sans, fontSize: 15, lineHeight: 1.65, color: EC.ink, margin: '0 0 20px' }}>{t.quote}</p>
                <div style={{ borderTop: `1px solid ${EC.borderSoft}`, paddingTop: 14 }}>
                  <div style={{ fontFamily: EC.sans, fontSize: 15, fontWeight: 700, color: EC.navy }}>{t.name}</div>
                  <div style={{ fontFamily: EC.sans, fontSize: 13.5, color: EC.inkSoft, marginTop: 2 }}>{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>
      <PageFooter />
    </div>
  );
}

// ── Join CTA band (reused) ──────────────────────────────────────────────────
function JoinCTA() {
  return (
    <div style={{ background: EC.tealDk, padding: '56px 0' }}>
      <ECContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 28, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>Ready to join the collaborative?</h2>
          <p style={{ fontFamily: EC.sans, fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.55 }}>DSU membership is open to all SDOs and stakeholders committed to open, interoperable education data standards.</p>
        </div>
        <Btn variant="primary">View joining information</Btn>
      </ECContainer>
    </div>
  );
}

// ── DSU Members ─────────────────────────────────────────────────────────────
function LogoMark({ label, ring = EC.navy }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 56, marginTop: 14 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: ring, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: EC.cond, fontWeight: 700, fontSize: 16 }}>{label[0]}</div>
        <span style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 18, color: ring, letterSpacing: '0.02em' }}>{label}</span>
      </div>
    </div>
  );
}

function DSUMembers() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="DSU" />
      <SubNav crumb="DSU" links={DSU_SUB} active="Members" />
      <Hero chip="DATA STANDARDS UNITED" title="Our members" minHeight={167} />

      {/* Video testimonials */}
      <DSec bg={EC.navyDeep}>
        <ECContainer>
          <Eyebrow color={EC.tealSoft} style={{ marginBottom: 12 }}>Video Testimonials</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#fff', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Hear from DSU members</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {DSU_VIDEOS.map((v) => (
              <div key={v.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(95,190,191,0.25)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ background: '#1a2733', height: 168, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: EC.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '18px solid #0C171D', marginLeft: 4 }} />
                  </div>
                  <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.4)', borderRadius: 3, padding: '2px 8px', fontFamily: EC.sans, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Vimeo</span>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <div style={{ fontFamily: EC.sans, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{v.name}</div>
                  <div style={{ fontFamily: EC.sans, fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>{v.title}</div>
                  <div style={{ fontFamily: EC.sans, fontSize: 13, color: EC.tealSoft, marginTop: 2 }}>{v.org}</div>
                </div>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>

      {/* Signatory members */}
      <DSec>
        <ECContainer>
          <Eyebrow color={EC.tealDk} style={{ marginBottom: 12 }}>Signatory Members</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Organizations committed to DSU's core values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {SIGNATORY.map((m) => (
              <div key={m.name} style={{ background: EC.white, border: `2px solid ${EC.gold}`, borderRadius: 6, boxShadow: '2px 4px 20px rgba(0,0,0,0.06)', padding: '22px 24px' }}>
                <div style={{ fontFamily: EC.sans, fontSize: 16, fontWeight: 700, color: '#000', lineHeight: 1.3 }}>{m.name}</div>
                <div style={{ fontFamily: EC.sans, fontSize: 13.5, color: EC.tealDk, marginTop: 4 }}>{m.url}</div>
                <LogoMark label="A4L" ring={EC.navy} />
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>

      {/* Affiliate members */}
      <DSec bg={EC.surface} style={{ borderTop: `1px solid ${EC.border}` }}>
        <ECContainer>
          <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Affiliate Members</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Supporting organizations</h2>
          <p style={{ fontFamily: EC.sans, fontSize: 16, color: EC.inkSoft, margin: '0 0 36px', maxWidth: 720, lineHeight: 1.55 }}>Affiliate members support DSU's mission in an advisory capacity — typically organizations that are not standards development bodies, or whose governance does not allow full signatory commitment.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {AFFILIATE.map((m) => (
              <div key={m.name} style={{ background: EC.white, border: `2px solid ${EC.gold}`, borderRadius: 6, boxShadow: '2px 4px 20px rgba(0,0,0,0.06)', padding: '22px 24px' }}>
                <div style={{ fontFamily: EC.sans, fontSize: 15, fontWeight: 700, color: '#000', lineHeight: 1.3 }}>{m.name}</div>
                <div style={{ fontFamily: EC.sans, fontSize: 13, color: EC.tealDk, marginTop: 4 }}>{m.url}</div>
                <LogoMark label="ADL" ring="#5b3fb8" />
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>
      <JoinCTA />
      <PageFooter />
    </div>
  );
}

// ── DSU Joining ───────────────────────────────────────────────────────────────
const JOIN_STEPS = [
  { title: 'Choose your membership type', desc: 'Signatory membership is for standards development organizations. Affiliate membership is for other stakeholders or organizations whose governance doesn\'t permit full signatory commitment. Both are equally welcome.' },
  { title: 'Download the agreement', desc: 'Each membership type has its own agreement PDF. Download the one that fits your organization\'s situation — both can be signed digitally.' },
  { title: 'Sign and submit', desc: 'Complete the agreement and send it to alex@bardicsystems.com along with your organization\'s logo and a brief note on why you\'re joining DSU.' },
  { title: 'Welcome to DSU', desc: 'The DSU team will confirm receipt, add your organization to the member directory, and connect you with upcoming working groups and meetings.' },
];

function TypeCard({ kind, kindColor, title, desc, bullets, filled, cta }) {
  return (
    <div style={{ border: `2px solid ${filled ? EC.tealDk : EC.border}`, borderRadius: 12, padding: '36px 34px', background: filled ? EC.white : EC.surface }}>
      <div style={{ display: 'inline-block', background: kindColor, color: '#fff', borderRadius: 3, padding: '4px 12px', fontFamily: EC.sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>{kind}</div>
      <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 24, color: EC.navy, margin: '0 0 12px' }}>{title}</h3>
      <p style={{ fontFamily: EC.sans, fontSize: 16, color: EC.inkSoft, lineHeight: 1.6, margin: '0 0 24px' }}>{desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {bullets.map((b) => (
          <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: filled ? EC.tealDk : 'transparent', border: filled ? 'none' : `2px solid ${EC.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <span style={{ width: 6, height: 4, borderBottom: `2px solid ${filled ? '#fff' : EC.navy}`, borderRight: `2px solid ${filled ? '#fff' : EC.navy}`, transform: 'rotate(45deg)', marginBottom: 2 }} />
            </span>
            <span style={{ fontFamily: EC.sans, fontSize: 15, color: EC.ink, lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
      <Btn variant={filled ? 'teal' : 'outline'}>{cta}</Btn>
    </div>
  );
}

function DSUJoin() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="DSU" />
      <SubNav crumb="DSU" links={DSU_SUB} active="Joining DSU" />
      <Hero chip="DATA STANDARDS UNITED" title="Joining DSU" minHeight={167}
        desc="We welcome participation from everyone. DSU is committed to building a global community dedicated to free, open standards that support lifelong learning, interoperability, and portability." />

      {/* Two ways to join */}
      <DSec>
        <ECContainer>
          <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Membership Types</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Two ways to join</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <TypeCard kind="Signatory Member" kindColor={EC.tealDk} filled title="Full organizational commitment"
              desc="For Standards Development Organizations and data standards bodies. Signatory members formally commit their organization to DSU's core values and actively participate in shaping the collaborative's direction."
              bullets={['Vote on DSU initiatives and governance', 'Co-lead working groups and projects', 'Listed as a signatory member organization', 'Full participation in all meetings and events']}
              cta="Download signatory agreement PDF" />
            <TypeCard kind="Affiliate Member" kindColor={EC.navy} title="Advisory participation"
              desc="For organizations that support DSU's mission but are not standards development bodies, or whose governance doesn't allow full organizational commitment. Affiliate members participate in an advisory capacity."
              bullets={['Participate in working groups and discussions', 'Attend all DSU meetings and events', 'Listed as an affiliate supporter', 'Advisory voice in DSU initiatives']}
              cta="Download affiliate agreement PDF" />
          </div>
        </ECContainer>
      </DSec>

      {/* How to join */}
      <DSec bg={EC.surface} style={{ borderTop: `1px solid ${EC.border}` }}>
        <ECContainer style={{ maxWidth: 860 }}>
          <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Process</Eyebrow>
          <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 31.5, color: '#000', margin: '0 0 36px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>How to join</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {JOIN_STEPS.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', gap: 24, background: EC.white, border: `1px solid ${EC.border}`, borderRadius: 8, padding: '24px 28px', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: EC.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: EC.cond, fontWeight: 700, fontSize: 20, color: '#fff' }}>{i + 1}</div>
                <div>
                  <div style={{ fontFamily: EC.sans, fontSize: 17, fontWeight: 700, color: EC.navy, marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontFamily: EC.sans, fontSize: 15.5, color: EC.ink, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>

      {/* Questions */}
      <DSec>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <Eyebrow color={EC.navy} style={{ marginBottom: 12 }}>Questions?</Eyebrow>
            <h2 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 28, color: '#000', margin: '0 0 12px', lineHeight: 1.25 }}>Get in touch</h2>
            <p style={{ fontFamily: EC.sans, fontSize: 16, color: EC.inkSoft, lineHeight: 1.6, margin: '0 0 18px' }}>Not sure which membership type is right for your organization? Reach out and we'll help you figure it out.</p>
            <a href="mailto:alex@bardicsystems.com" style={{ fontFamily: EC.sans, fontSize: 16, fontWeight: 700, color: EC.link, textDecoration: 'none' }}>alex@bardicsystems.com →</a>
          </div>
          <div style={{ background: EC.surface, border: `1px solid ${EC.border}`, borderRadius: 8, padding: '26px 28px' }}>
            <div style={{ fontFamily: EC.sans, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: EC.navy, marginBottom: 16 }}>When submitting your agreement, please include:</div>
            {['Your completed and signed agreement PDF', "Your organization's logo (PNG or SVG preferred)", 'A brief note on why your organization is joining DSU', 'A contact name and email for follow-up'].map((t) => (
              <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: EC.teal, marginTop: 8, flexShrink: 0 }} />
                <span style={{ fontFamily: EC.sans, fontSize: 15, color: EC.ink, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </ECContainer>
      </DSec>
      <PageFooter />
    </div>
  );
}

// ── DSU Projects ────────────────────────────────────────────────────────────
function DSUProjects() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="DSU" />
      <SubNav crumb="DSU" links={DSU_SUB} active="Projects" />
      <Hero chip="DATA STANDARDS UNITED" title="DSU supported projects" minHeight={167}
        desc="Active working groups and initiatives across the DSU network — coordinating the technical, governance, and alignment work that makes standards interoperability real." />
      <DSec>
        <ECContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {DSU_PROJECTS.map((p) => (
            <div key={p.title} style={{ background: EC.white, border: `2px solid ${EC.gold}`, borderRadius: 6, boxShadow: '2px 4px 20px rgba(0,0,0,0.08)', padding: '24px 24px', display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <div style={{ fontFamily: EC.sans, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: EC.tealDk, marginBottom: 8 }}>{p.tag}</div>
              <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 20, color: '#000', margin: '0 0 6px', lineHeight: 1.25 }}>{p.title}</h3>
              <div style={{ fontFamily: EC.sans, fontSize: 13.5, color: EC.inkSoft }}>{p.cat}</div>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 600, color: EC.link, textDecoration: 'none', marginTop: 14 }}>Learn more →</a>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                <LogoMark label="UNITY" ring={EC.navy} />
              </div>
            </div>
          ))}
        </ECContainer>
      </DSec>
      <JoinCTA />
      <PageFooter />
    </div>
  );
}

Object.assign(window, { DSUOverview, DSUMembers, DSUJoin, DSUProjects });
