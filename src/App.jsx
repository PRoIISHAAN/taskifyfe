import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { Homepage } from "./pages/homepage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { OtpPage } from "./pages/signupVerify";
import OnboardingPage from "./pages/onboardingPage";
import BoardPage from "./pages/BoardPage";
import InvitePage from "./pages/InvitePage";
import InviteTokenRedirect from "./pages/InviteTokenRedirect";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthFlowRoute } from "./components/AuthFlowRoute";


function App() {
  return(
    <div className="font-[Inter]">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/home" element={<Homepage></Homepage>}></Route>
        <Route path="/:authtype/:email" element={<AuthPage></AuthPage>}></Route>
        <Route path="/:authtype" element={<AuthPage></AuthPage>}></Route>
        <Route path="/login/verify/:email/:rememberme" element={<AuthFlowRoute><OtpPage></OtpPage></AuthFlowRoute>}></Route>
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage></OnboardingPage></ProtectedRoute>}></Route>
        <Route path="/invite/:token" element={<InviteTokenRedirect></InviteTokenRedirect>}></Route>
        <Route path="/invite/accept-invite" element={<InvitePage></InvitePage>}></Route>
        <Route path="/boards/:boardId" element={<ProtectedRoute><BoardPage></BoardPage></ProtectedRoute>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
  
}
export default App;
