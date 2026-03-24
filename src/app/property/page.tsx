import type { Metadata } from 'next';
import styles from './property.module.css';

export const metadata: Metadata = {
  title: 'Nas.Create — Property Content',
  robots: { index: false, follow: false },
};

export default function PropertyPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { margin: 0; padding: 0; background: #f7f3ed; overflow-x: hidden; cursor: auto !important; }
      `}</style>

      <div className={styles.page}>

        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>
              Property content that<br />
              <em>wins you the instruction.</em>
            </h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.wordmarkBox}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/darkmode-wordmark.png"
                alt="Nas.Create"
                className={styles.wordmark}
              />
            </div>
          </div>
        </header>

        {/* ROW 1: Why it works | How it works */}
        <div className={styles.main}>

          <div className={styles.valueCol}>
            <p className={styles.colLabel}>Why it works</p>
            <div className={styles.valueList}>
              <div className={styles.vItem}>
                <h3>Win more instructions from sellers</h3>
                <p>Homeowners choose their agent based on how you market other properties. Premium content wins you the listing before the buyer is ever involved.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Stand out on Rightmove &amp; Zoopla</h3>
                <p>Listings with professional video generate more enquiries and move faster. Your properties get noticed first.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Build your brand on social</h3>
                <p>Consistent, cinematic content positions you as the obvious premium choice in your area — on every platform.</p>
              </div>
              <div className={styles.vItem}>
                <h3>Justify your fee to vendors</h3>
                <p>When sellers see you invest properly in their marketing, it validates your commission and reduces fee negotiation.</p>
              </div>
            </div>
          </div>

          <div className={styles.howCol}>
            <p className={styles.colLabel}>How it works</p>
            <div className={styles.howSteps}>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>01</span>
                <div className={styles.howStepContent}>
                  <h4>Book</h4>
                  <p>Share a date, a time, and an address. No brief, no content plan.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>02</span>
                <div className={styles.howStepContent}>
                  <h4>Shoot</h4>
                  <p>I arrive on-site and handle everything: walkthrough video, drone footage, and a full photo set.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>03</span>
                <div className={styles.howStepContent}>
                  <h4>Edit</h4>
                  <p>I colour grade, cut, and finish everything to a cinematic standard. No input required from you.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>04</span>
                <div className={styles.howStepContent}>
                  <h4>Brand</h4>
                  <p>Your agency branding is applied across every format — video, stills, and social-ready cuts.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howStepNum}>05</span>
                <div className={styles.howStepContent}>
                  <h4>Deliver</h4>
                  <p>Finished files are in your inbox within 48 hours, ready to upload anywhere you need them.</p>
                </div>
              </div>
            </div>
            <div className={styles.retainerCallout}>
              <p>On a monthly retainer, there&rsquo;s no briefing process. Send me a date, a time, and a postcode — I handle everything else.</p>
            </div>
          </div>

        </div>

        {/* ROW 2: Every property includes | Investment */}
        <div className={styles.bottomGrid}>

          <div className={styles.includedSection}>
            <p className={styles.colLabel}>Every property includes</p>
            <div className={styles.includeList}>
              <div className={styles.includeItem}>Cinematic walkthrough video</div>
              <div className={styles.includeItem}>Drone aerial exterior</div>
              <div className={styles.includeItem}>Full photo set</div>
              <div className={styles.includeItem}>Colour grading &amp; edit</div>
              <div className={styles.includeItem}>Branded intro/outro</div>
              <div className={styles.includeItem}>Social-ready vertical formats</div>
              <div className={styles.includeItem}>Licensed music</div>
              <div className={styles.includeItem}>Everything end to end</div>
            </div>
          </div>

          <div className={styles.packagesSection}>
            <p className={styles.colLabel}>Investment</p>
            <div className={styles.pkgStack}>

              <div className={styles.pkg}>
                <div className={styles.pkgRow}>
                  <div className={styles.pkgLeft}>
                    <p className={styles.pkgName}>One-Off</p>
                    <p className={styles.pkgDesc}>No commitment. Ideal for trying the format on select listings.</p>
                  </div>
                  <div className={styles.pkgRight}>
                    <p className={styles.pkgPrice}>£350</p>
                    <p className={styles.pkgUnit}>per property</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.pkg} ${styles.pkgMonthly}`}>
                <div className={styles.pkgRow}>
                  <div className={styles.pkgLeft}>
                    <p className={styles.pkgName}>Monthly Retainer</p>
                    <p className={styles.pkgDesc}>Fixed monthly schedule. Area exclusivity included. 3-month minimum.</p>
                  </div>
                  <div className={styles.pkgRight}>
                    <p className={`${styles.pkgPrice} ${styles.pkgPriceGold}`}>£1,500</p>
                    <p className={styles.pkgUnit}>per month<br />6 properties · £250 each</p>
                  </div>
                </div>
              </div>

              <div className={styles.pkg}>
                <div className={styles.pkgRow}>
                  <div className={styles.pkgLeft}>
                    <p className={styles.pkgName}>High Volume</p>
                    <p className={styles.pkgDesc}>For busier months. Best per-property rate.</p>
                  </div>
                  <div className={styles.pkgRight}>
                    <p className={styles.pkgPrice}>£1,800</p>
                    <p className={styles.pkgUnit}>per month<br />8 properties · £225 each</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p className={styles.footerQuote}>&ldquo;Video doesn&rsquo;t just sell the house — it wins you the instruction.&rdquo;</p>
          <div className={styles.footerRight}>
            <p className={styles.footerCta}>Ready to talk?</p>
            <a href="/contact" className={styles.footerLink}>nas.create/contact</a>
            <p className={styles.footerNote}>nas.create · 2026</p>
          </div>
        </footer>

      </div>
    </>
  );
}
