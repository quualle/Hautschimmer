import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GOOGLE_ADS_ID = 'AW-17275818810';

const GoogleAnalytics = () => {
  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Google Ads Conversion Tracking */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Analytics
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            
            // Google Ads Conversion Tracking
            gtag('config', '${GOOGLE_ADS_ID}');
            
            // Track Web Vitals
            gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(performance.now())
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;