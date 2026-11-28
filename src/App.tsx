import Welcome from "./pages/Welcome";
import Foralder from "./pages/Foralder";
import Spelare from "./pages/Spelare";
import Ledare from "./pages/Ledare";
import Styrelse from "./pages/Styrelse";
import NotFound from "./pages/NotFound";
import DraftBanner from "./components/DraftBanner";

/**
 * A start page that lets you pick parent, player or leader, each its own page, plus a page for the board. No router: the path picks
 * the page. nginx serves index.html for these paths (configure-nginx.sh), and with a 404 status for
 * anything else, so other paths render the 404 page.
 */
const PAGES: Record<string, () => JSX.Element> = {
  "/": Welcome,
  "/foralder": Foralder,
  "/spelare": Spelare,
  "/ledare": Ledare,
  "/styrelse": Styrelse,
};

const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/(.)\/+$/, "$1");
const Page = PAGES[path] ?? NotFound;

// Every page carries the draft banner until the board has decided on the site
const App = () => (
  <>
    <Page />
    <DraftBanner />
  </>
);

export default App;
