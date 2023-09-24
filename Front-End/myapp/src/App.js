import Record from "./Components/Record";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";

import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
       <BrowserRouter>
          <Routes>
            <Route  path="/" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/record" element={<Record />} />
          </Routes>
       </BrowserRouter>
  );
}

export default App;
