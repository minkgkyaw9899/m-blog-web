import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import AuthLayout from "./components/layout/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="auth">
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Route>
        {/* <Route element={<NotFoundPage />} /> */}
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
