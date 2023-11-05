import { QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "context/DarkModeContext.jsx";
import queryClient from "features/QueryClient";
import Account from "pages/Account";
import Booking from "pages/Booking.jsx";
import Bookings from "pages/Bookings";
import Cabins from "pages/Cabins";
import CheckIn from "pages/CheckIn.jsx";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import PageNotFound from "pages/PageNotFound";
import Settings from "pages/Settings";
import Users from "pages/Users";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "styles/GlobalStyles";
import AppLayout from "ui/AppLayout";
import ProtectedRoute from "ui/ProtectedRoute.jsx";

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* TODO Remove for production */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3_000 },
            error: { duration: 5_000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
