import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AppServiceProvider } from "./middleware/Context";
import Layout from "./layouts/SidebarLayout";
import { routes } from "./middleware/Routes";

function App() {
  return (
    <AppServiceProvider>
      <Router> {/* Added Router here */}
        <Layout> {/* Added Layout here */}
          <Routes>
            {routes.map(({path,element}) => (
              <Route key={path} path={path} element={element()} />
            ))}
          </Routes>
        </Layout>
      </Router> {/* Closed Router here */}
    </AppServiceProvider>
  );
}

export default App;
