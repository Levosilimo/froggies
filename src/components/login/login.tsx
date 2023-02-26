import { useForm } from 'react-hook-form';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getUserDataAction, loginAction, setUserDataAction} from "../../store/api-action";
import {getLanguage} from "../../store/user/selectors";
import {useTranslation} from "react-i18next";

type LoginData = {
  login: string;
  password: string;
}

function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const dispatch = useAppDispatch();
  const language = useAppSelector(getLanguage);
  const { t } = useTranslation();
  const onSubmit = handleSubmit(data => {
    dispatch(loginAction(data)).unwrap().then(() => {
      if(language) {
        dispatch(setUserDataAction({language}));
      }
      else {
        dispatch(getUserDataAction());
      }
    });
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block ">
        <label className="form-label">{t("loginLabel")}</label>
        <input className="form-input" placeholder={t("loginPlaceholder").toString()}
               {...register("login",  { required: true})} />
        {errors.login && <span className="error">{t("obligatoryFieldError")}</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("passwordLabel")}</label>
        <input className="form-input" type="password" placeholder={t("passwordPlaceholder").toString()}
               {...register("password",  { required: true, minLength: 6 })} />
        {errors.password && <span className="error">{t("passwordPlaceholder")}</span>}
      </div>
      <button className="form-submit button" type="submit">{t("login")}</button>
    </form>
  )
}

export default Login;
