import './update-username.scss'
import { useForm } from 'react-hook-form';
import {useAppDispatch} from "../../hooks";
import {
  changeUsernameAction,
  checkUsernameEligibility,
} from "../../store/api-action";
import {useTranslation} from "react-i18next";
import {ChangeUsernameReq, FieldAvailabilityMessage} from "../../types/auth-data";
import React, {useEffect, useRef, useState} from "react";
import {AxiosError} from "axios";
import {debounce} from "../../utils";
import {UpdateUsernameProps} from "../../types/user-data";

function UpdateUsername ({onClose, show}:UpdateUsernameProps): JSX.Element {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangeUsernameReq>();
  const [usernameAvailability, setUsernameAvailability] = useState<FieldAvailabilityMessage>();
  const debouncedFetchCheckUsername = useRef(debounce(fetchCheckUsername, 250));

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const onSubmit = handleSubmit(data => {
    dispatch(changeUsernameAction(data));
  });

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.keyCode === 27){
        closeUploadModal();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })

  const closeUploadModal = () => onClose();

  function fetchCheckUsername() {
    checkUsernameEligibility(watch("newUsername"))
      .then((msg) => {
        setUsernameAvailability({msg, isError: false});
      })
      .catch((error: AxiosError) => {
        setUsernameAvailability({msg: error.response?.data as string ?? '', isError: true});
      })
  }

  function checkUsernameAvailability() {
    setUsernameAvailability(undefined);
    debouncedFetchCheckUsername.current();
  }

  return (
    <div className={`update-username-modal ${show?'active':''}`}>
      <div className="update-username-main">
        <form className="update-username-form" onSubmit={onSubmit}>
          <div className="form-block ">
            <label className="form-label">{t("newUsernameLabel")}</label>
            <input className="form-input" placeholder={t("newUsernamePlaceholder").toString()}
                   {...register("newUsername",  { onChange: checkUsernameAvailability, required: true })} />
            {errors.newUsername && <span className="error">{t("obligatoryFieldError")}</span>}
            {usernameAvailability ? <span
              className={`availability ${usernameAvailability.isError ? 'error' : 'eligible'}`}>{usernameAvailability.msg}</span> : ''}
          </div>
          <div className="form-block ">
            <label className="form-label">{t("passwordLabel")}</label>
            <input className="form-input" autoComplete="current-password" type="password" placeholder={t("passwordPlaceholder").toString()}
                   {...register("password",  { required: true, minLength: 6 })} />
            {errors.password && <span className="error">{t("passwordPlaceholder")}</span>}
          </div>
          <button className="form-submit button" type="submit">{t("changeUsername")}</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUsername;
