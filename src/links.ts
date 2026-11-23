/**
 * The club's site on Svenskalag. Svenskalag holds everything about the club (teams, calendar, news,
 * fees), so most links on this page point there. Change the domain here when it moves; every link
 * to the club site is built with club().
 */
export const CLUB_SITE = "https://www.bk50.se";

/** The club site's host for display, e.g. "bk50.se". */
export const CLUB_HOST = new URL(CLUB_SITE).hostname.replace(/^www\./, "");

/** A page on the club's Svenskalag site, e.g. club("/lag"). */
export const club = (path = "/") => `${CLUB_SITE}${path}`;

// External links shared by several sections. Team pages live in Teams.tsx.
export const LINKS = {
  signup: "https://www.svenskalag.se/lugibbk/formular/borja-spela-basket/19804",
  support: club("/sida/109411/stotta-foreningen"),
  engage: club("/sida/114809/engagera-dig"),
  supporter: club("/bk50/formular/bli-stodmedlem/23360"),
  clubSite: club("/"),
  teams: club("/lag"),
  fees: club("/sida/104590/avgifter"),
  values: club("/sida/114557/vardegrund-bk50"),
  history: club("/sida/109410/historia"),
  news: club("/nyheter"),
  /** The leaders' group on Svenskalag. Internal: only leaders who are logged in can see it. */
  leaders: club("/bk50-ledare"),
  education: club("/sida/104586/utbildning"),
  calendar: club("/kalender"),
  contact: club("/kontakt"),
  svenskalagApp: "https://www.svenskalag.se/appen",
  appStore: "https://www.svenskalag.se/app/ios",
  googlePlay: "https://www.svenskalag.se/app/android",
  shop: "https://www.2win.se/klubbshop/bk50",
  instagram: "https://www.instagram.com/bk50_official/",
  facebook: "https://www.facebook.com/LugiBasket",
  email: "info@bk50.se",
};
