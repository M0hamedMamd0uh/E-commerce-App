import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import AuthProvider from "./Context/Authentication";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import WishList from "./Components/WishList/WishList";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/Store";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import SubCategoryDetails from "./Components/SubCategoryDetails/SubCategoryDetails";
import Home from "./Components/Home/Home";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Settings from "./Components/Settings/Settings";

const clientQuery = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "verifyCode",
        element: <VerifyCode />,
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "subCategoryDetails/:id",
        element: (
          <ProtectedRoute>
            <SubCategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={clientQuery}>
          <CartContextProvider>
            <AuthProvider>
              <RouterProvider router={router} />
              <Toaster
                containerStyle={{
                  top: 58.5,
                }}
              />
            </AuthProvider>
          </CartContextProvider>
        </QueryClientProvider>
        <Offline>
          <div className="offlineMessage bg-dark text-white p-3 ">
            Ooops.. You Are Offline Now..
          </div>
        </Offline>
      </Provider>
    </>
  );
}
