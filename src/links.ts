/**
 * Everything about the club (teams, calendar, news, fees, forms) lives on Svenskalag. Links go to
 * svenskalag.se rather than the club's own domain: Svenskalag forwards them to whatever domain the
 * club has set up there (www.bk50.se today), so they keep working when that domain changes.
 *
 * Club pages live under the club's slug (svenskalag.se/bk50/...). "lugibbk" is the old slug and
 * only forwards to "bk50". Team and group pages live at the top level (svenskalag.se/bk50-flickor2013)
 * and give 404 under the club's slug, so they have their own helper.
 */
export const CLUB_SITE = "https://www.svenskalag.se/bk50";

/** A club page on Svenskalag, e.g. club("/lag"). */
export const club = (path = "") => `${CLUB_SITE}${path}`;

/** A team or group page on Svenskalag, e.g. team("bk50-flickor2013"). */
export const team = (slug: string) => `https://www.svenskalag.se/${slug}`;

/** A document uploaded to the club's Svenskalag site, e.g. doc("<id>/bakning.pdf"). */
export const doc = (path: string) => club(`/dokument/${path}`);

// External links shared by several sections. Team pages live in Teams.tsx.
export const LINKS = {
  signup: club("/formular/borja-spela-basket/19804"),
  support: club("/sida/109411/stotta-foreningen"),
  engage: club("/sida/114809/engagera-dig"),
  supporter: club("/formular/bli-stodmedlem/23360"),
  clubSite: club(),
  teams: club("/lag"),
  fees: club("/sida/104590/avgifter"),
  values: club("/sida/114557/vardegrund-bk50"),
  history: club("/sida/109410/historia"),
  news: club("/nyheter"),
  /** The leaders' group on Svenskalag. Internal: only leaders who are logged in can see it. */
  leaders: team("bk50-ledare"),
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
