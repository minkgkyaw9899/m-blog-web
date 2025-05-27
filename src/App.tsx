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
import HomeLayout from "./components/layout/HomeLayout";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            {/*  */}
            <Route path={"posts"}>
              <Route path="create" element={<CreatePostPage />} />
              <Route path=":postId" element={<PostDetailPage />} />
            </Route>
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
          </Route>
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
