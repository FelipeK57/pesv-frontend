import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../components/layout/MainLayout";

// Routes
import { UsersPage } from "../features/users/pages/UsersPage";
import { Login } from "../features/auth/pages/Login";
import { Home } from "../features/home/pages/Home";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
