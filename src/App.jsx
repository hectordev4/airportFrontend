import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./middleware/Routes";

function App() {
  return (
      <Router>
          <Routes>
            {routes.map(({path,element}) => (
              <Route key={path} path={path} element={element()} />
            ))}
          </Routes>
      </Router>
  );
}

export default App;
