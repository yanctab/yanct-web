import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// The site is a single page. nginx serves index.html for unknown paths (with a 404
// status), so anything other than the root renders the 404 page.
const isHome = ["/", "/index.html"].includes(window.location.pathname);

const App = () => (isHome ? <Index /> : <NotFound />);

export default App;
