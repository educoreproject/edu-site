/* global React, EC, PrimaryNav, SubNav, Hero, PageFooter, ECContainer, Eyebrow, Btn, NewsletterBand */
// Events section — Upcoming, Past (Event Archive) (matched to DSU.fig Events-Layouts: teal hero)

const EV_SUB = ['Upcoming', 'Past events'];

function Poster({ title, h = 150 }) {
  return (
    <div style={{ position: 'relative', height: h, borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(160deg, #bfe3f5 0%, #cdd6e0 45%, #e8c9a0 100%)', flexShrink: 0, display: 'flex', alignItems: 'flex-start', padding: 16 }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', background: 'linear-gradient(180deg, transparent, rgba(176,84,58,0.55))' }} />
      <div style={{ position: 'absolute', right: '24%', bottom: 0, width: 6, height: '60%', background: 'rgba(176,74,48,0.7)' }} />
      <div style={{ position: 'absolute', right: '46%', bottom: 0, width: 6, height: '48%', background: 'rgba(176,74,48,0.7)' }} />
      <div style={{ position: 'relative', fontFamily: EC.cond, fontWeight: 700, fontSize: 19, lineHeight: 1.1, color: EC.navy }}>{title}</div>
    </div>
  );
}

function EventCard({ ev }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 24, background: EC.white, border: `1px solid ${EC.navy}`, borderRadius: 8, padding: 16, alignItems: 'stretch' }}>
      <Poster title={ev.poster} h={ev.h || 150} />
      <div style={{ paddingRight: 12, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: EC.sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: EC.navy, marginBottom: 4 }}>{ev.tag}</div>
        <div style={{ fontFamily: EC.sans, fontSize: 14, color: EC.inkSoft, marginBottom: 8 }}>{ev.date}</div>
        <h3 style={{ fontFamily: EC.sans, fontWeight: 700, fontSize: 20, color: '#000', margin: '0 0 8px', lineHeight: 1.25 }}>{ev.title}</h3>
        <p style={{ fontFamily: EC.sans, fontSize: 15, color: EC.ink, lineHeight: 1.55, margin: '0 0 14px' }}>{ev.desc}</p>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: EC.sans, fontSize: 14, fontWeight: 600, color: EC.link, textDecoration: 'none', marginTop: 'auto' }}>Learn more →</a>
      </div>
    </div>
  );
}

const ECONF = {
  poster: '2026 1EdTech Learning Impact Conference', tag: 'DSU', date: 'June 1st – 3rd, 2026',
  title: '2026 1EdTech Learning Impact Conference',
  desc: "Join us at 1EdTech's premier event, the Learning Impact Conference, where global education and technology leaders unite to drive innovation, champion interoperability, and shape the future of teaching and learning.",
};
const UPCOMING = [
  ECONF,
  { poster: 'DSU Annual Convening 2026', tag: 'DSU', date: 'July 15 – 17, 2026', title: 'DSU Annual Convening 2026', desc: 'The yearly gathering of DSU signatory and affiliate members — working sessions on CEDS sustainability, the A4L Unity project, and the EDUcore roadmap.' },
  { poster: 'EDUcore Open Beta Launch', tag: 'EDUcore', date: 'September 2026', title: 'EDUcore Open Beta Launch', desc: 'The reference library, Graphinator, and Standards Partner tools open to the wider standards community — with live demos and an onboarding workshop.' },
];

function EventsUpcoming() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Events" />
      <SubNav crumb="Events" links={EV_SUB} active="Upcoming" />
      <Hero chip="EVENTS" title="Upcoming Events" minHeight={200} bg={EC.teal900}
        desc="Convenings, working group sessions, and platform launches across the EDU, DSU, CEDS, and EDUcore communities.">
        <div style={{ position: 'absolute', right: 128, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '16px 22px', textAlign: 'center' }}>
          <div style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 44, color: '#fff', lineHeight: 1 }}>{UPCOMING.length}</div>
          <div style={{ fontFamily: EC.sans, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Upcoming events</div>
        </div>
      </Hero>
      <div style={{ background: EC.white, padding: '64px 0' }}>
        <ECContainer style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {UPCOMING.map((ev, i) => <EventCard key={i} ev={ev} />)}
        </ECContainer>
      </div>
      <NewsletterBand bg={EC.teal900} />
      <PageFooter />
    </div>
  );
}

// ── Past / Event Archive ────────────────────────────────────────────────────
const ARCHIVE = [
  { year: '2026', count: 4, events: [ECONF, ECONF, ECONF, ECONF] },
  { year: '2025', count: 3, events: [ECONF, ECONF, ECONF] },
];

function EventsPast() {
  return (
    <div style={{ width: 1280, background: EC.white, fontFamily: EC.sans, color: EC.ink }}>
      <PrimaryNav active="Events" />
      <SubNav crumb="Events" links={EV_SUB} active="Past events" />
      <Hero chip="EVENTS" title="Event Archive" minHeight={167} bg={EC.teal900} />
      <div style={{ background: EC.white, padding: '56px 0' }}>
        <ECContainer style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {ARCHIVE.map((grp) => (
            <div key={grp.year}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: EC.cond, fontWeight: 700, fontSize: 24, color: EC.navy }}>{grp.year}</span>
                <span style={{ flex: 1, height: 1, background: EC.border }} />
                <span style={{ fontFamily: EC.sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: EC.inkSoft }}>{grp.count} events</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {grp.events.map((ev, i) => <EventCard key={i} ev={{ ...ev, h: 120 }} />)}
              </div>
            </div>
          ))}
        </ECContainer>
      </div>
      <NewsletterBand bg={EC.teal900} />
      <PageFooter />
    </div>
  );
}

Object.assign(window, { EventsUpcoming, EventsPast });
