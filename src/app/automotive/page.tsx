import type { Metadata } from 'next';
import styles from './automotive.module.css';
import AutomotiveVideo from './AutomotiveVideo';

export const metadata: Metadata = {
  title: 'Nas Create LTD — Automotive',
  robots: { index: false, follow: false },
};

const RS6_VIDEO = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/RS6.mov';
const RS6_POSTER = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_rs6_thumbnail.webp';

export default function AutomotivePage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Roboto+Condensed:wght@400;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap');
        html, body { margin: 0; padding: 0; background: #0a0a0a; overflow-x: hidden; cursor: auto !important; }
      `}</style>

      <div className={styles.page}>

        {/* HERO */}
        <section className={styles.hero}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className={styles.heroVideo}
            src={RS6_VIDEO}
            poster={RS6_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.heroTopLeft}>
              <h1 className={styles.heroTitle}>
                <span>Cinematic film</span>
                <span className={styles.accent}>for premium automotive</span>
              </h1>
            </div>
            <div className={styles.heroBottom}>
              <p className={styles.heroSubline}>showrooms · independents · modifiers · restoration</p>
              <a href="#start" className={styles.heroCta}>Start a project</a>
            </div>
          </div>
        </section>

        <div className={styles.inner}>

          {/* INTRO */}
          <section className={styles.intro}>
            <p className={styles.introLead}>
              Short-form film and brand pieces for the businesses who already build, sell, and restore the cars worth filming.
            </p>
            <div className={styles.introTiles}>
              <div className={styles.introTile}>
                <p className={styles.introTileNum}>90<span style={{ fontSize: '38px', marginLeft: '2px' }}>s</span></p>
                <p className={styles.introTileLabel}>Typical film</p>
              </div>
              <div className={styles.introTile}>
                <p className={styles.introTileNum}>4K</p>
                <p className={styles.introTileLabel}>Delivery ceiling</p>
              </div>
              <div className={styles.introTile}>
                <p className={styles.introTileNum}>24<span style={{ fontSize: '38px', marginLeft: '2px' }}>h</span></p>
                <p className={styles.introTileLabel}>Rough-cut turnaround</p>
              </div>
            </div>
          </section>

          {/* FEATURED FILM */}
          <section className={styles.featured}>
            <p className={styles.sectionLabel}>Featured film</p>
            <div className={styles.featuredGrid}>
              <div className={styles.featuredVideoCol}>
                <AutomotiveVideo src={RS6_VIDEO} poster={RS6_POSTER} />
              </div>
              <div className={styles.featuredSide}>
                <h2 className={styles.featuredTitle}>RS6 Cinematic Reveal</h2>
                <p className={styles.featuredSubtitle}>Winnats Pass · Golden hour</p>
                <div className={styles.statCards}>
                  <div className={styles.statCard}>
                    <p className={styles.statCardLabel}>Location</p>
                    <p className={styles.statCardValue}>Winnats Pass, Peak District</p>
                  </div>
                  <div className={styles.statCard}>
                    <p className={styles.statCardLabel}>Subject</p>
                    <p className={styles.statCardValue}>Audi RS6 Avant, C7 generation</p>
                  </div>
                  <div className={styles.statCard}>
                    <p className={styles.statCardLabel}>System</p>
                    <p className={styles.statCardValue}>Stat-card vocabulary, three motion moves</p>
                  </div>
                </div>
                <p className={styles.featuredParagraph}>
                  Personal-brand cinematic short on a wrapped Audi RS6 Avant. Designed a stat-card visual system that treats a modern car film as if it were a blockbuster opening. Three-font typographic stack, six-hex grounded palette, three motion moves only. Built once as a reusable system, retyped per beat. Ports directly to the dealer, modifier, and restoration work below.
                </p>
              </div>
            </div>
          </section>

          {/* SECTORS */}
          <section className={styles.sectors}>
            <p className={styles.sectionLabel}>Who this is for</p>
            <div className={styles.sectorsGrid}>
              <a href="#featured" className={styles.sectorTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Automotive/DSC09689-Enhanced-NR-Edit.jpg" alt="Showroom-style automotive frame" />
                <div className={styles.sectorTileOverlay} />
                <div className={styles.sectorTileText}>
                  <p className={styles.sectorTileTitle}>Showrooms</p>
                  <p className={styles.sectorTileCaption}>Handover films, model launches, event coverage.</p>
                </div>
              </a>
              <a href="#featured" className={styles.sectorTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Automotive/DSC07747-Enhanced-NR.jpg" alt="Independent dealer stock car" />
                <div className={styles.sectorTileOverlay} />
                <div className={styles.sectorTileText}>
                  <p className={styles.sectorTileTitle}>Independent dealers</p>
                  <p className={styles.sectorTileCaption}>Stock films and dealer-event coverage.</p>
                </div>
              </a>
              <a href="#featured" className={styles.sectorTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Automotive/carousel_07.jpg" alt="Modified and wrapped vehicle" />
                <div className={styles.sectorTileOverlay} />
                <div className={styles.sectorTileText}>
                  <p className={styles.sectorTileTitle}>Modifiers & tuners</p>
                  <p className={styles.sectorTileCaption}>Build-process series and reveal films.</p>
                </div>
              </a>
              <a href="#featured" className={styles.sectorTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Automotive/DSC07646-Enhanced-NR.jpg" alt="Detailing and restoration workshop frame" />
                <div className={styles.sectorTileOverlay} />
                <div className={styles.sectorTileText}>
                  <p className={styles.sectorTileTitle}>Detailing & restoration</p>
                  <p className={styles.sectorTileCaption}>Workshop films, restoration time-lapses, handover keepsakes.</p>
                </div>
              </a>
            </div>
          </section>

          {/* PROCESS */}
          <section className={styles.process}>
            <p className={styles.sectionLabel}>How a project runs</p>
            <div className={styles.processList}>
              <div className={styles.processStep}>
                <span className={styles.processNum}>01</span>
                <span className={styles.processName}>Brief</span>
                <p className={styles.processBody}>
                  A 20-minute call. What you sell, what you have shot already, what is missing. Quote within 48 hours.
                </p>
              </div>
              <div className={styles.processStep}>
                <span className={styles.processNum}>02</span>
                <span className={styles.processName}>Shoot</span>
                <p className={styles.processBody}>
                  Solo operator. FX30 on RS4 gimbal, ZV-E10 locked-off wide, Mavic 3 Pro Cine when location needs it. One day on site, two if night coverage is in scope.
                </p>
              </div>
              <div className={styles.processStep}>
                <span className={styles.processNum}>03</span>
                <span className={styles.processName}>Edit</span>
                <p className={styles.processBody}>
                  Rough cut to you within 24 hours of wrap. One round of revisions standard. Stat-card system included on every project at no extra cost.
                </p>
              </div>
              <div className={styles.processStep}>
                <span className={styles.processNum}>04</span>
                <span className={styles.processName}>Deliver</span>
                <p className={styles.processBody}>
                  Final masters in 4K plus square and vertical social variants. Files transferred direct, not via a holding link.
                </p>
              </div>
            </div>
          </section>

          {/* STATS PANEL — sourced */}
          <section className={styles.statsPanel}>
            <p className={styles.sectionLabel}>Why it works</p>
            <div className={styles.statsPanelGrid}>
              <div className={styles.statsPanelItem}>
                <p className={styles.statsPanelNum}>0.48<span style={{ fontSize: '32px', marginLeft: '2px' }}>%</span></p>
                <p className={styles.statsPanelDesc}>Average automotive Instagram engagement rate. Short-form film is what moves the needle above the baseline.</p>
                <a
                  href="https://www.socialinsider.io/blog/automotive-industry-social-media-benchmarks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statsPanelSource}
                >Socialinsider 2026 ↗</a>
              </div>
              <div className={styles.statsPanelItem}>
                <p className={styles.statsPanelNum}>1.81<span style={{ fontSize: '32px', marginLeft: '2px' }}>×</span></p>
                <p className={styles.statsPanelDesc}>Video viewers are 1.81 times more likely to purchase than non-viewers.</p>
                <a
                  href="https://wyzowl.com/video-marketing-statistics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statsPanelSource}
                >Wyzowl 2026 ↗</a>
              </div>
              <div className={styles.statsPanelItem}>
                <p className={styles.statsPanelNum}>70<span style={{ fontSize: '32px', marginLeft: '2px' }}>%</span></p>
                <p className={styles.statsPanelDesc}>Of car buyers leave dealer sites to watch external video during the purchase process.</p>
                <a
                  href="https://www.thinkwithgoogle.com/marketing-strategies/video/auto-shopper-video-mobile-statistics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statsPanelSource}
                >Google Auto Shopper ↗</a>
              </div>
            </div>
          </section>

          {/* PRICING ANCHORS */}
          <section className={styles.pricing}>
            <p className={styles.sectionLabel}>Pricing anchors</p>
            <div className={styles.pricingGrid}>
              <div className={styles.pricingTile}>
                <p className={styles.pricingTileLabel}>One-off film</p>
                <p className={styles.pricingTileBody}>A single 60 to 90 second Reel on one car or one build. From the low four figures.</p>
              </div>
              <div className={styles.pricingTile}>
                <p className={styles.pricingTileLabel}>Monthly content</p>
                <p className={styles.pricingTileBody}>A retainer for new stock, new builds, or new events. Three tiers, scaled to volume.</p>
              </div>
              <div className={styles.pricingTile}>
                <p className={styles.pricingTileLabel}>Brand film</p>
                <p className={styles.pricingTileBody}>A 2 to 3 minute founder or business film. Mid four figures, fully produced.</p>
              </div>
            </div>
            <p className={styles.pricingNote}>travel and accommodation always itemised. net 7 terms.</p>
          </section>

          {/* CTA */}
          <section id="start" className={styles.cta}>
            <p className={styles.sectionLabel}>Start a project</p>
            <h2 className={styles.ctaHeadline}>
              Send a brief. A 60 second voice note is often faster than a form.
            </h2>
            <div className={styles.ctaButtons}>
              <a href="mailto:hello@nascreate.com" className={styles.ctaButton}>Email hello@nascreate.com</a>
              <a
                href="https://wa.me/447475437833"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >WhatsApp +44 7475 437833</a>
            </div>
            <p className={styles.ctaNote}>
              Brief by voice note: what you sell, what you have shot already, what is missing. Reply with a quote within 48 hours.
            </p>
          </section>

          {/* FOOTER */}
          <footer className={styles.footer}>
            <p className={styles.footerQuote}>
              &ldquo;The cars are already worth filming. The film is what makes the next one walk through the door.&rdquo;
            </p>
            <div className={styles.footerRight}>
              <p className={styles.footerNote}>Nas Create Ltd · 2026</p>
            </div>
          </footer>

        </div>

      </div>
    </>
  );
}
