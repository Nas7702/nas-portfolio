"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { META_PIXEL_ID } from "../../lib/meta-pixel";

/**
 * Meta Pixel component - loads the Facebook/Instagram pixel for ad tracking
 *
 * To set up:
 * 1. Go to Meta Events Manager: https://business.facebook.com/events_manager
 * 2. Create a pixel or use an existing one
 * 3. Copy your Pixel ID (a 15-16 digit number)
 * 4. Add it to your .env.local: NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
 */

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq && META_PIXEL_ID) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  // Don't render anything if no Pixel ID is configured
  if (!META_PIXEL_ID) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[MetaPixel] No NEXT_PUBLIC_META_PIXEL_ID found. Pixel not loaded."
      );
    }
    return null;
  }

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Track page views on client-side navigation */}
      <Suspense fallback={null}>
        <MetaPixelTracker />
      </Suspense>
    </>
  );
}




