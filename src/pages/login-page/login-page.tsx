import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./login-page.scss";
import { useForm } from 'react-hook-form';
import {ERROR_MESSAGE, MAIL_REG_EXP} from "../../constans";
import SettingsWindow from "../settings-page/settings-window";

type FormData = {
  userName: string;
  email: string;
  password: string;
  adminPassword: string;
}

function LoginPage () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <div className="page page-login">
      <Header/>
      <SettingsWindow/>
      <section className="login">
        <div className="login-form">
          <h1 className="login-title">Sign in</h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-block">
              <label className="form-label">User name</label>
              <input className="form-input" placeholder="Enter your username"
                     {...register("userName",  { required: true })} />
              {errors.userName && <span className="error">{ ERROR_MESSAGE.USERNAME }</span>}
            </div>
            <div className="form-block ">
              <label className="form-label">E-mail</label>
              <input className="form-input" placeholder="Enter your email"
                     {...register("email",  { required: true, pattern: MAIL_REG_EXP })} />
              {errors.email && <span className="error">{ ERROR_MESSAGE.EMAIL }</span>}
            </div>
            <div className="form-block ">
              <label className="form-label">Password</label>
              <input className="form-input" placeholder="Should contains min 6 symbols"
                     {...register("password",  { required: true, minLength: 6 })} />
              {errors.password && <span className="error">{ ERROR_MESSAGE.PASSWORD }</span>}
            </div>
            <div className="form-block ">
              <label className="form-label">Admin password <span>(If you have, enter it)</span></label>
              <input className="form-input" placeholder="Enter your administrator password"
                     {...register("adminPassword")} />
            </div>
            <button className="form-submit button" type="submit">Sign in</button>
          </form>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default LoginPage;
