import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./login-page.scss";
import {useState} from "react";
import Login from "../../components/login/login";
import Registration from "../../components/registration/registration";

function LoginPage () {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onRegisterButtonClick = () => setIsLoginForm(!isLoginForm);

  return (
    <div className="page page-login">
      <Header/>
      <section className="login">
        <div className="login-form">
          <h1 className="login-title">{isLoginForm ? "Sign in" : "Create account"}</h1>
          {isLoginForm ? (<Login/>) : (<Registration/>)}
          <button className="button-account" type="button" onClick={onRegisterButtonClick}>
            {!isLoginForm? "Return to login form" : "No account? Create one"}</button>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default LoginPage;
