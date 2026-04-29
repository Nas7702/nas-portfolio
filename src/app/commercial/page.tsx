import type { Metadata } from 'next';
import styles from './commercial.module.css';
import CommercialVideo from './CommercialVideo';

export const metadata: Metadata = {
  title: 'Nas Create LTD — Commercial & Civils',
  robots: { index: false, follow: false },
};

export default function CommercialPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        html, body { margin: 0; padding: 0; background: #0E0E10; overflow-x: hidden; cursor: auto !important; }
      `}</style>

      <div className={styles.page}>

        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>
              Document the project properly.<br />
              <em>Win the next one on the strength of it.</em>
            </h1>
            <p className={styles.subhead}>
              Project completion films, tender assets and LinkedIn content for civil engineering, surfacing and groundworks businesses. Built around the work, designed to win the next contract.
            </p>
          </div>
        </header>

        {/* STATS STRIP */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <p className={styles.statNum}>70<span className={styles.statSuffix}>%</span></p>
            <p className={styles.statDesc}>of B2B buyers watch video during their purchase decision process</p>
            <a
              href="https://wyzowl.com/video-marketing-statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statSource}
            >Wyzowl ↗︎</a>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statNum}>5.6<span className={styles.statSuffix}>%</span></p>
            <p className={styles.statDesc}>average engagement on LinkedIn video posts, against around 2% on text-only</p>
            <a
              href="https://www.socialinsider.io/social-media-benchmarks/linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statSource}
            >Socialinsider ↗︎</a>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statNum}>93<span className={styles.statSuffix}>%</span></p>
            <p className={styles.statDesc}>of marketers say video has improved customer understanding of their product or service</p>
            <a
              href="https://wyzowl.com/video-marketing-statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statSource}
            >Wyzowl ↗︎</a>
          </div>
        </div>

        {/* FEATURED VIDEO */}
        <div className={styles.videoSection}>
          <CommercialVideo
            src="https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/ADJ_Aintree.mp4"
            poster="https://pub-92e1443c56394daeb0a2b18a08feffdc.r2.dev/thumbnail/sq_adj_aintree_thumbnail.webp"
          />
          <div className={styles.videoCaption}>
            <span>Featured project</span>
            <span className={styles.videoCaptionTag}>ADJ Surfacing & Consultancy · Aintree Shopping Park</span>
          </div>
        </div>

        {/* ROW 1: Why it works | How it works */}
        <div className={styles.main}>

          <div className={styles.valueCol}>
            <p className={styles.colLabel}>Why it works</p>
            <div className={styles.valueList}>
              <div className={styles.vItem}>
                <h3>Win the next contract</h3>
                <p>Most civils companies win work on the strength of what they build. The proof is a PDF with photos and a paragraph. A <span className={styles.hl}>two-minute completion film</span> changes what the next client sees before the conversation starts.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Stand out in tender submissions</h3>
                <p>Specifications and method statements describe quality. <span className={styles.hl}>Footage shows it.</span> Two minutes of completion film communicates more than ten pages of description.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Build a presence on LinkedIn</h3>
                <p>Decision-makers scroll past text. They watch a drone shot of a finished site. <span className={styles.hl}>Repeat clients, suppliers and the people you want to recruit</span> all see it.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Recruit better people</h3>
                <p>Better content attracts better operatives, supervisors and engineers. The work you put on LinkedIn <span className={styles.hl}>signals the standard you operate at</span>. Anyone considering a move sees that first.</p>
              </div>
            </div>
          </div>

          <div className={styles.howCol}>
            <p className={styles.colLabel}>How it works</p>
            <div className={styles.howSteps}>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>01</span>
                <div className={styles.howStepContent}>
                  <h4>Call</h4>
                  <p>Thirty minutes. The site, the works, the timeline. <span className={styles.hl}>No deck, no brief required</span> from your side.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>02</span>
                <div className={styles.howStepContent}>
                  <h4>Plan</h4>
                  <p>Shoot day, kit list, drone permissions, site contact. <span className={styles.hl}>Built around your live works.</span></p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>03</span>
                <div className={styles.howStepContent}>
                  <h4>Shoot</h4>
                  <p>Ground camera, stabilised gimbal, drone. <span className={styles.hl}>No disruption to operatives.</span> Sunrise, golden hour, or overnight if the site demands it.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>04</span>
                <div className={styles.howStepContent}>
                  <h4>Edit</h4>
                  <p>Motion-graphic overlays mapping scope of works. Site title cards. Branded sound and colour grade. <span className={styles.hl}>The standard of the job reads at a glance.</span></p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>05</span>
                <div className={styles.howStepContent}>
                  <h4>Deliver</h4>
                  <p>Landscape, 1:1 and vertical cuts. Files sent direct. <span className={styles.hl}>Yours to use on LinkedIn, in tenders, on the website.</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2: Every project includes | Example engagements */}
        <div className={styles.bottomGrid}>

          <div className={styles.includedSection}>
            <p className={styles.colLabel}>Every project includes</p>
            <div className={styles.includeList}>
              <div className={styles.includeItem}>Drone aerial coverage (CAA A2 CofC)</div>
              <div className={styles.includeItem}>Ground camera and stabilised gimbal</div>
              <div className={styles.includeItem}>Motion-graphic stat overlays</div>
              <div className={styles.includeItem}>Site and location title cards</div>
              <div className={styles.includeItem}>Branded sound design and colour grade</div>
              <div className={styles.includeItem}>Landscape, square and vertical cuts</div>
              <div className={styles.includeItem}>Files for LinkedIn, tender PDFs and website</div>
              <div className={styles.includeItem}>Full project from brief to delivery</div>
            </div>
          </div>

          <div className={styles.packagesSection}>
            <p className={styles.colLabel}>What this looks like in practice</p>
            <div className={styles.pkgStack}>

              <div className={styles.pkg}>
                <p className={styles.pkgName}>Single completion film</p>
                <p className={styles.pkgScope}>One-off · One site · Full deliverables</p>
                <p className={styles.pkgDesc}>A finished site, shot in a day, edited into a two-minute film with motion-graphic overlays mapping the scope of works. Pilot piece, marquee project, or a tender add-on. Recent example: ADJ Surfacing & Consultancy at Aintree Shopping Park.</p>
              </div>

              <div className={styles.pkg}>
                <p className={styles.pkgName}>Multi-site programme</p>
                <p className={styles.pkgScope}>Three to five projects · Single window</p>
                <p className={styles.pkgDesc}>A run of completions in one quarter. Same delivery shape on each, different site. Built for tender season or end-of-year submissions where multiple jobs are wrapping up at once.</p>
              </div>

              <div className={styles.pkg}>
                <p className={styles.pkgName}>Ongoing partnership</p>
                <p className={styles.pkgScope}>Monthly · Annual scope · Area exclusivity</p>
                <p className={styles.pkgDesc}>Continuous coverage across the year. Monthly LinkedIn cuts pulled from live sites, plus one full completion film per quarter. Three-month minimum. Closest fit for businesses making content a permanent part of how they go to market.</p>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p className={styles.footerQuote}>&ldquo;Most companies in this sector win work on the strength of what they build. The companies winning the next contract make sure it doesn&rsquo;t go undocumented.&rdquo;</p>
          <div className={styles.footerRight}>
            <p className={styles.footerCta}>Ready to talk?</p>
            <a href="/contact" className={styles.footerLink}>Nas Create LTD / contact</a>
            <p className={styles.footerNote}>Nas Create LTD · 2026</p>
          </div>
        </footer>

      </div>
    </>
  );
}
