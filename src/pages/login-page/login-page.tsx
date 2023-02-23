import "./login-page.scss";
import {useState} from "react";
import Login from "../../components/login/login";
import Registration from "../../components/registration/registration";
import {useTranslation} from "react-i18next";

function LoginPage () {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { t } = useTranslation();
  const onRegisterButtonClick = () => setIsLoginForm(!isLoginForm);

  return (
    <div className="page-login">
      <section className="login">
        <div className="login-form">
          <h1 className="login-title">{isLoginForm ? t("login") : t("createAccount")}</h1>
          {isLoginForm ? (<Login/>) : (<Registration/>)}
          <button className="button-account" type="button" onClick={onRegisterButtonClick}>
            {!isLoginForm? t("returnToLogin") : t("returnToRegister")}</button>
        </div>
      </section>
    </div>
  )
}

export default LoginPage;
