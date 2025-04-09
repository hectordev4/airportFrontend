import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./middleware/Routes";
import Layout from "./layouts/SidebarLayout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element()} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
