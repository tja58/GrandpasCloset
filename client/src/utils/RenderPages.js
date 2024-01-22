// Module Imports
import { Route, Outlet } from "react-router-dom";

// Component Imports
import { pages, authPages } from "../pages";
import Header from "../components/header-footer/Header";
import Footer from "../components/header-footer/Footer";
import ProtectedRoute from "./ProtectedRoute";

////////////////////////////////////////////////////////////////////////////
// Pages Template
////////////////////////////////////////////////////////////////////////////
export const Template = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////
// Pages
////////////////////////////////////////////////////////////////////////////
export function routes() {
  return pages.map((element) => {
    return (
      <Route
        path={element.path}
        Component={element.component}
        key={element.path}
      />
    );
  });
}

////////////////////////////////////////////////////////////////////////////
// Auth Pages
////////////////////////////////////////////////////////////////////////////
export function AuthPages() {
  return authPages.map((element) => {
    return (
      <Route
        path={element.path}
        element={<ProtectedRoute />}
        key={element.path}
      >
        <Route exact path={element.path} Component={element.component} />
      </Route>
    );
  });
}
