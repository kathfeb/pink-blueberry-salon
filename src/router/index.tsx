import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "../Layouts";
import HomePage from "../views/Home";
import BookingPage from "../views/Booking";
import ServicesPage from "../views/Services";
import ShopPage from "../views/Shop";
import StylistsPage from "../views/Stylists";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="book" element={<BookingPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="stylists" element={<StylistsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
