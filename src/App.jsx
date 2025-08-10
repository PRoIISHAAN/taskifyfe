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


function App() {
  return(
    <div className="font-[Inter]">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/home" element={<Homepage></Homepage>}></Route>
        <Route path="/:authtype/:email" element={<AuthPage></AuthPage>}></Route>
        <Route path="/:authtype" element={<AuthPage></AuthPage>}></Route>
        <Route path="/login/verify/:email/:rememberme" element={<OtpPage></OtpPage>}></Route>
        <Route path="/onboarding" element={<OnboardingPage></OnboardingPage>}></Route>
        <Route path="/boards/:boardId" element={<BoardPage></BoardPage>}></Route>
      </Routes>
      </BrowserRouter>
    
    
    </div>
  )
  
}
export default App;
