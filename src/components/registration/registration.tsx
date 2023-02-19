import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {registrationAction, setUserDataAction} from "../../store/api-action";
import {ERROR_MESSAGE, MAIL_REG_EXP} from "../../constants";
import {getLanguage} from "../../store/user/selectors";
import {useTranslation} from "react-i18next";

type FormData = {
  username: string;
  email: string;
  password: string;
  adminPassword: string;
}

function Registration () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector(getLanguage);
  const onSubmit = handleSubmit(data => {
    dispatch(registrationAction(data)).then(() => {
      if(language) {
        dispatch(setUserDataAction({language}));
      }
    });
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block">
        <label className="form-label">{t("usernameLabel")}</label>
        <input className="form-input" placeholder={t("usernamePlaceholder").toString()}
               {...register("username",  { required: true })} />
        {errors.username && <span className="error">{t("usernameErrorMessage")}</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("emailLabel")}</label>
        <input className="form-input" placeholder={t("emailPlaceholder").toString()}
               {...register("email",  { required: true, pattern: MAIL_REG_EXP })} />
        {errors.email && <span className="error">{t("emailErrorMessage")}</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("passwordLabel")}</label>
        <input className="form-input" type="password" placeholder={t("passwordPlaceholder").toString()}
               {...register("password",  { required: true, minLength: 6 })} />
        {errors.password && <span className="error">{t("passwordPlaceholder")}</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("adminPasswordLabel")} <span>({t("adminPasswordRemark")})</span></label>
        <input className="form-input" placeholder={t("adminPasswordPlaceholder").toString()}
               {...register("adminPassword")} />
      </div>
      <button className="form-submit button" type="submit">{t("createAccount")}</button>
    </form>
  )
}

export default Registration;
