import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Vitrine } from "./components/Vitrine";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vitrine/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
