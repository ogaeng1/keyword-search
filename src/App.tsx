import { useEffect } from "react";
import Layout from "./components/Layout";
import Search from "./components/Search";
import ModeToggle from "./components/ModeToggle";

function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, [])
  
  return (
    <Layout>
      <ModeToggle />
      <Search />
    </Layout>
  );
}

export default App;
