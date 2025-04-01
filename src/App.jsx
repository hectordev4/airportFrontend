import { FlyServiceProvider } from "./middleware/Context"
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, About, Flights, Planes, Airports } from "./pages";



function App() {
  return (
    <FlyServiceProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/airports" element={<Airports />} />
      </Routes>
    </FlyServiceProvider>
  )
}
export default App;