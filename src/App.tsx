import Layout from "./components/Layout";
import Search from "./components/Search";
import ModeToggle from "./components/ModeToggle";

function App() {
  return (
    <Layout>
      <ModeToggle />
      <Search />
    </Layout>
  );
}

export default App;
