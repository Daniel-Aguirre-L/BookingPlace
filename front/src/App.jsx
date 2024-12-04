import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "./helpers/routeList";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import CatalogDetail from "./Pages/CatalogDetail";
import ManageUser from "./Pages/ManageUser";
import ManageBooking from "./Pages/ManageBooking";
import ManageCatalog from "./Pages/ManageCatalog";
import ManageFeatures from "./Pages/ManageFeatures";
import ErrorPage from "./Pages/ErrorPage";
import FormRegister from "./Pages/FormRegister";
import MyProfile from "./Pages/MyProfile";
import MyFavorites from "./Pages/MyFavorites";
import MyBookings from "./Pages/MyBookings";
import Layout from "./Components/layouts/Layout";
import AdminLayout from "./Components/layouts/AdminLayout";
import AuthLayout from "./Components/layouts/AuthLayout";
import UserLayout from "./Components/layouts/UserLayout";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} >
          <Route path={routeList.LOGIN} element={<LoginPage />} />
          <Route path={routeList.REGISTER} element={<FormRegister />} />
        </Route>
        <Route element={<Layout />} >
          <Route path={routeList.HOME} element={<Home />} />
          <Route path={`${routeList.CATALOG_DETAIL}/:id`} element={<CatalogDetail />} />
          <Route element={<UserLayout />} >
            <Route path={routeList.USER_PROFILE} element={<MyProfile />} />
            <Route path={routeList.USER_FAVORITES} element={<MyFavorites />} />
            <Route path={routeList.USER_BOOKINGS} element={<MyBookings />} />
          </Route>
        </Route>
          <Route element={<AdminLayout />} >
            <Route path={routeList.ADMIN_PANEL} element={<AdminPanel />} />
            <Route path={routeList.ADMIN_USERS} element={<ManageUser />} />
            <Route path={routeList.ADMIN_BOOKINGS} element={<ManageBooking />} />
            <Route path={routeList.ADMIN_CATALOGS} element={<ManageCatalog />} />
            <Route path={routeList.ADMIN_FEATURES} element={<ManageFeatures />} />
          </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
