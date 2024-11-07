import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import CatalogDetail from "./Pages/CatalogDetail";
import ManageUser from "./Pages/ManageUser";
import ManageBooking from "./Pages/ManageBooking";
import ManageCatalog from "./Pages/ManageCatalog";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Pages/Layout";
import { routeList } from "./helpers/routeList";
import AdminLayout from "./Pages/AdminLayout";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeList.LOGIN} element= {<LoginPage />} />
        <Route element= {<Layout />} >
          <Route path={routeList.HOME} element={<Home />} />
          <Route path={`${routeList.CATALOG_DETAIL}/:id`} element={<CatalogDetail />} />
          <Route element= {<AdminLayout />} >
          <Route path={routeList.ADMIN_PANEL} element={<AdminPanel />} />
          <Route path={routeList.USERS} element={<ManageUser />} />
          <Route path={routeList.BOOKINGS} element={<ManageBooking />} />
          <Route path={routeList.CATALOGS} element={<ManageCatalog />} />
          </Route>
        </Route> 
        <Route path="*" element= {<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
