import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import AuthLayout from "./components/layout/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./provider/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
        <Toaster toastOptions={{ closeButton: true }} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
