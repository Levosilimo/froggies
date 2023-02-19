import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./login-page.scss";
import {useState} from "react";
import Login from "../../components/login/login";
import Registration from "../../components/registration/registration";
import SettingsWindow from "../../components/setting-window/settings-window";
import {useTranslation} from "react-i18next";

function LoginPage () {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { t } = useTranslation();
  const onRegisterButtonClick = () => setIsLoginForm(!isLoginForm);

  return (
    <div className="page page-login">
      <Header/>
      <SettingsWindow/>
      <section className="login">
        <div className="login-form">
          <h1 className="login-title">{isLoginForm ? t("login") : t("createAccount")}</h1>
          {isLoginForm ? (<Login/>) : (<Registration/>)}
          <button className="button-account" type="button" onClick={onRegisterButtonClick}>
            {!isLoginForm? t("returnToLogin") : t("returnToRegister")}</button>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default LoginPage;
