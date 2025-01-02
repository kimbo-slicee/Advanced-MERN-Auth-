import FloatingShape from "./components/FloatingShape.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/AuthStore.js";
import {useEffect} from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import {LoadingSpinner} from "./components/LoadingSpinner.jsx";
import {ForgetPassword} from "./pages/ForgetPassword.jsx";
import {ResetPassword} from "./pages/ResetPassword.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    if (!user.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }
    return children;
};
// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    console.log(isAuthenticated,user)
    if (isAuthenticated && user.isVerified) {
        return <Navigate to='/' replace />;
    }

    return children;
};

const App=()=>{
    const {isCheckingAuth,checkAuth}=useAuthStore()
    useEffect(()=>{
        checkAuth()
    },[checkAuth])
    if (isCheckingAuth) return <LoadingSpinner />;
    return (
     <div className="min-h-screen bg-gradient-to-br
     from-gray-900 via-green-900 to-emerald-900 flex
     items-center justify-center relative overflow-hidden ">
         <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
         <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
         <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>
         <FloatingShape color="bg-green-500" size="w-32 h-32" top="60%" left="10%" delay={4}/>
      <Routes>
          <Route path="/" element={
                <ProtectedRoute>
                    <DashboardPage/>
                </ProtectedRoute>
          }/>
          <Route path="/login" element={
                <RedirectAuthenticatedUser>
                    <Login/>
                </RedirectAuthenticatedUser>
          }/>
          <Route path="/signup" element={
                <RedirectAuthenticatedUser>
                    <Signup/>
                </RedirectAuthenticatedUser>
          }/>
          <Route path="/verify-email" element={
              <RedirectAuthenticatedUser>
                  <EmailVerification/>
              </RedirectAuthenticatedUser>
              }/>
          <Route path="/forgot-password"
          element={
              <RedirectAuthenticatedUser>
              <ForgetPassword/>
              </RedirectAuthenticatedUser>}/>
          <Route path="/forgot-password/:token" element={
              <RedirectAuthenticatedUser>
                    <ResetPassword/>
                </RedirectAuthenticatedUser>
          }/>
            <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Toaster/>
     </div>
  )
}
export default App