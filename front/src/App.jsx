import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";
import CatalogDetail from "./Pages/CatalogDetail";
import ManageUser from "./Pages/ManageUser";
import ManageBooking from "./Pages/ManageBooking";
import ManageCatalog from "./Pages/ManageCatalog";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Pages/Layout";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element= {<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/catalogo/:id" element={<CatalogDetail />} />
          <Route path="/administracion" element={<AdminPanel />} />
          <Route path="/administracion/usuarios" element={<ManageUser />} />
          <Route path="/administracion/reservas" element={<ManageBooking />} />
          <Route path="/administracion/catalogo" element={<ManageCatalog />} />
        </Route> 
        <Route path="*" element= {<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
