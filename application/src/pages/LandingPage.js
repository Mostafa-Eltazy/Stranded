import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingLayout from "../components/LandingComponents/LandingLayout";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { useUserContext } from "../components/UserData/Context";

const LandingPage = () => {
  const { USER_Context_State } = useUserContext();
  const nav = useNavigate();
  useEffect(() => {
    if (USER_Context_State.user) {
      nav("/dispatch");
    }
  }, [USER_Context_State.user, nav]);
  return (
    <div>
      <Header />
      <div className="page-wrapper">
        <LandingLayout />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
