import {useForm} from "react-hook-form";
import {
  checkEmailEligibility,
  checkUsernameEligibility,
  registrationAction, setUserDataAction
} from "../../store/api-action";
import {MAIL_REG_EXP} from "../../constants";
import {AxiosError} from "axios";
import {useRef, useState} from "react";
import {debounce} from "../../utils";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getLanguage} from "../../store/user/selectors";
import {useTranslation} from "react-i18next";

type FormData = {
  username: string;
  email: string;
  password: string;
  adminPassword: string;
}

type FieldAvailability = {
  msg: string;
  isError: boolean
}

function Registration() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
  const [usernameAvailability, setUsernameAvailability] = useState<FieldAvailability>();
  const [emailAvailability, setEmailAvailability] = useState<FieldAvailability>();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector(getLanguage);
  const onSubmit = handleSubmit(data => {
    dispatch(registrationAction(data)).then(() => {
      if (language) {
        dispatch(setUserDataAction({language}));
      }
    });
  });

  function fetchCheckUsername() {
    checkUsernameEligibility(watch("username"))
      .then((msg) => {
        setUsernameAvailability({msg, isError: false});
      })
      .catch((error: AxiosError) => {
        setUsernameAvailability({msg: error.response?.data as string ?? '', isError: true});
      })
  }

  function fetchCheckEmail() {
    checkEmailEligibility(watch("email"))
      .then((msg) => {
        setEmailAvailability({msg, isError: false});
      })
      .catch((error: AxiosError) => {
        setEmailAvailability({msg: error.response?.data as string ?? '', isError: true});
      })
  }

  const debouncedFetchCheckUsername = useRef(debounce(fetchCheckUsername, 250));
  const debouncedFetchCheckEmail = useRef(debounce(fetchCheckEmail, 250));

  function checkUsernameAvailability() {
    setUsernameAvailability(undefined);
    debouncedFetchCheckUsername.current();
  }

  function checkEmailAvailability() {
    setEmailAvailability(undefined);
    debouncedFetchCheckEmail.current();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block">
        <label className="form-label">{t("usernameLabel")}</label>
        <input className="form-input" placeholder={t("usernamePlaceholder").toString()}
               {...register("username", {onChange: checkUsernameAvailability, required: true})} />
        {errors.username && <span className="error">{t("usernameErrorMessage")}</span>}
        {usernameAvailability ? <span
          className={`availability ${usernameAvailability.isError ? 'error' : 'eligible'}`}>{usernameAvailability.msg}</span> : ''}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("emailLabel")}</label>
        <input className="form-input" placeholder={t("emailPlaceholder").toString()}
               {...register("email", {onChange: checkEmailAvailability, required: true, pattern: MAIL_REG_EXP})} />
        {errors.email && <span className="error">{t("emailErrorMessage")}</span>}
        {emailAvailability ? <span
          className={`availability ${emailAvailability.isError ? 'error' : 'eligible'}`}>{emailAvailability.msg}</span> : ''}
      </div>
      <div className="form-block ">
        <label className="form-label">{t("passwordLabel")}</label>
        <input className="form-input" type="password" placeholder={t("passwordPlaceholder").toString()}
               {...register("password", {required: true, minLength: 6})} />
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
