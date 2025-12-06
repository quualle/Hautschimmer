// Utility für Planity-Buchungslinks mit automatischem Scroll zur Medestetique-Sektion

export const PLANITY_BASE_URL = 'https://www.planity.com/de-DE/glam-glow-beauty-15711-konigs-wusterhausen';

// Diese Funktion öffnet Planity und scrollt automatisch zur Medestetique-Sektion
export const openPlanityBooking = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  // Öffne Planity mit dem spezifischen Service-Anker
  window.open(`${PLANITY_BASE_URL}#service-name-10-0`, '_blank');
  
  // Scroll-Anpassung nach dem Laden (scrollt zum Anfang der Medestetique-Sektion)
  setTimeout(() => {
    try {
      window.scrollBy(0, -600);
    } catch (error) {
      console.log('Scroll-Anpassung nicht möglich');
    }
  }, 1500);
};

// Helper-Funktion für den Planity-Link mit Service-Anker
export const getPlanityBookingUrl = () => {
  // Direkt zum Medestetique-Service
  return `${PLANITY_BASE_URL}#service-name-10-0`;
};