import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";
import CatalogDetail from "./Pages/CatalogDetail";
import ManageUser from "./Pages/ManageUser";
import ManageBooking from "./Pages/ManageBooking";
import ManageCatalog from "./Pages/ManageCatalog";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Pages/Layout";
import { routeList } from "./helpers/routeList";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element= {<Layout />} >
          <Route path={routeList.HOME} element={<Home />} />
          <Route path={`${routeList.CATALOG_DETAIL}/:id`} element={<CatalogDetail />} />
          <Route path={routeList.ADMIN_PANEL} element={<AdminPanel />} />
          <Route path={routeList.USERS} element={<ManageUser />} />
          <Route path={routeList.BOOKINGS} element={<ManageBooking />} />
          <Route path={routeList.CATALOGS} element={<ManageCatalog />} />
        </Route> 
        <Route path="*" element= {<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
