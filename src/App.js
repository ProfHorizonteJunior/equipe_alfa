import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Vitrine } from "./componentess/Vitrine";


function App() {
  return (
    <div>
      <h1>Editado pelo Prof.</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vitrine/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
