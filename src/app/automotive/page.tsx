import type { Metadata } from 'next';
import styles from './automotive.module.css';

export const metadata: Metadata = {
  title: 'Nas Create — Automotive',
  robots: { index: false, follow: false },
};

const RS6_VIDEO = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/RS6.mov';
const RS6_POSTER = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_rs6_thumbnail.webp';

const DETAILING_VIDEO = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/Detailing1.mov';
const DETAILING_POSTER = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_detailing1_thumbnail.webp';

const JMC_VIDEO = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/theJMC.mp4';
const JMC_POSTER = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_theJMC_thumbnail.webp';

const VM_VIDEO = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/vm_urus.mov';
const VM_POSTER = 'https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_vm_urus_thumnail.webp';

const CALENDLY_URL = 'https://calendly.com/hello-nascreate/30min';

export default function AutomotivePage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        html, body { margin: 0; padding: 0; background: #FAFAF7; cursor: auto !important; }
      `}</style>

      <div className={styles.page}>

        {/* HERO — dark band, normal document flow, video at standard tile scale */}
        <section className={styles.heroSection}>
          <div className={styles.inner}>
            <p className={styles.heroEyebrow}>Nas Create · Automotive</p>
            <h1 className={styles.heroTitle}>
              <span>Cinematic film</span>
              <span className={styles.accent}>for premium automotive</span>
            </h1>
            <p className={styles.heroSub}>
              For wrap shops, modifiers, detailers and restoration houses where the work is the product. Short-form for Instagram, dealer pages and brand. One shoot, cut for every surface.
            </p>
            <div className={styles.heroVideoFrame}>
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
                tabIndex={-1}
              />
            </div>
            <div className={styles.heroCaptionRow}>
              <p className={styles.heroCaption}>Audi RS6 · Detail Showcase</p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroCta}
              >Book a call</a>
            </div>
          </div>
        </section>

        <div className={styles.inner}>

          {/* SELECTED WORK */}
          <section className={styles.selected}>
            <p className={styles.sectionLabel}>Selected work</p>
            <div className={styles.selectedStack}>

              <article className={styles.workTile}>
                <div className={`${styles.workTileMedia} ${styles.workTileMedia16x9}`}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    className={styles.workTileVideo}
                    src={DETAILING_VIDEO}
                    poster={DETAILING_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
                <div className={styles.workTileInfo}>
                  <div className={styles.workTileIdentity}>
                    <h3 className={styles.workTileTitle}>Paint Correction Detail</h3>
                    <p className={styles.workTileTag}>Detailing Studio</p>
                  </div>
                  <p className={styles.workTileDesc}>
                    Short film for a UK detailing studio showing the work done to a single car. The product is the finish. The film is what makes the next booking enquire.
                  </p>
                </div>
              </article>

              <article className={styles.workTile}>
                <div className={`${styles.workTileMedia} ${styles.workTileMedia16x9}`}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    className={styles.workTileVideo}
                    src={JMC_VIDEO}
                    poster={JMC_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
                <div className={styles.workTileInfo}>
                  <div className={styles.workTileIdentity}>
                    <h3 className={styles.workTileTitle}>The JMC</h3>
                    <p className={styles.workTileTag}>Creator Brand · McLaren</p>
                  </div>
                  <p className={styles.workTileDesc}>
                    Brand film for a creative director working with leading YouTubers. Built around a McLaren that carries the visual weight of the piece and signals the level of work he attracts.
                  </p>
                </div>
              </article>

              <article className={styles.workTile}>
                <div className={`${styles.workTileMedia} ${styles.workTileMediaVertical}`}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    className={styles.workTileVideo}
                    src={VM_VIDEO}
                    poster={VM_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
                <div className={styles.workTileInfo}>
                  <div className={styles.workTileIdentity}>
                    <h3 className={styles.workTileTitle}>Vizual Mods Promo</h3>
                    <p className={styles.workTileTag}>Vehicle Wraps · Mods</p>
                  </div>
                  <p className={styles.workTileDesc}>
                    Social-first promo for a vehicle wrap and modification shop. Designed for Meta placements covering wraps, body kits, tinting and custom plates. Enquiries on Instagram and Facebook went up after launch.
                  </p>
                </div>
              </article>

            </div>
          </section>

          {/* TESTIMONIAL */}
          <section className={styles.testimonial}>
            <p className={styles.testimonialQuote}>
              &ldquo;Nas produces the content we put out on socials, covering wraps, body kits, tinting and custom plates. Enquiries on Instagram and Facebook went up and the brand looks how it should. He gets what we do and is easy to deal with.&rdquo;
            </p>
            <p className={styles.testimonialAttribution}>Director, Vizual Mods</p>
          </section>

          {/* STATS */}
          <section className={styles.stats}>
            <p className={styles.sectionLabel}>By the numbers</p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <p className={styles.statNum}>92<span style={{ fontSize: '38px', marginLeft: '2px' }}>%</span></p>
                <p className={styles.statDesc}>of auto shoppers turn to YouTube when researching a vehicle.</p>
                <a
                  href="https://www.thinkwithgoogle.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statSource}
                >Think with Google ↗</a>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statNum}>40<span style={{ fontSize: '38px', marginLeft: '2px' }}>%+</span></p>
                <p className={styles.statDesc}>of auto shoppers were introduced to a vehicle they weren&rsquo;t considering by online video.</p>
                <a
                  href="https://www.thinkwithgoogle.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statSource}
                >Think with Google ↗</a>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statNum}>78<span style={{ fontSize: '38px', marginLeft: '2px' }}>%</span></p>
                <p className={styles.statDesc}>of consumers trust video with real people more than AI-generated content.</p>
                <a
                  href="https://animoto.com/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.statSource}
                >Animoto 2024-25 ↗</a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="cta" className={styles.cta}>
            <h2 className={styles.ctaHeadline}>
              Book a call.
            </h2>
            <p className={styles.ctaLine}>
              Solo operator. Plan, shoot, edit, deliver. End to end. The call is twenty minutes, no brief or deck needed beforehand.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >Book a 30-min call</a>
            <p className={styles.ctaSecondary}>
              Or email <a href="mailto:hello@nascreate.com">hello@nascreate.com</a>
            </p>
          </section>

          {/* FOOTER */}
          <footer className={styles.footer}>
            <p className={styles.footerQuote}>
              &ldquo;Most shops in this sector let the work speak for itself. The ones winning the next booking make sure it doesn&rsquo;t go unfilmed.&rdquo;
            </p>
            <div className={styles.footerRight}>
              <p className={styles.footerNote}>Nas Create · 2026</p>
            </div>
          </footer>

        </div>

      </div>
    </>
  );
}
