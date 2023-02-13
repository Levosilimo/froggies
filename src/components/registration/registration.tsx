import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks";
import {
  checkEmailEligibility,
  checkUsernameEligibility,
  registrationAction
} from "../../store/api-action";
import {ERROR_MESSAGE, MAIL_REG_EXP} from "../../constants";
import {AxiosError} from "axios";
import {useRef, useState} from "react";
import {debounce} from "../../utils";

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

function Registration () {
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm<FormData>();
  const [ usernameAvailability, setUsernameAvailability ] = useState<FieldAvailability>();
  const [ emailAvailability, setEmailAvailability ] = useState<FieldAvailability>();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(data => {
    dispatch(registrationAction(data));
  });

  function fetchCheckUsername() {
    checkUsernameEligibility(watch("username"))
      .then((msg) => {
        setUsernameAvailability({msg, isError: false});
        //clearErrors("username")
      })
      .catch((error: AxiosError) => {
        setUsernameAvailability({msg: error.response?.data as string ?? '', isError: true});
        //setError("username", {message: error.response?.data as string ?? '', type: "value"}, {shouldFocus: true})
      })
  }

  function fetchCheckEmail() {
    checkEmailEligibility(watch("email"))
      .then((msg) => {
        setEmailAvailability({msg, isError: false});
        //clearErrors("email");
      })
      .catch((error: AxiosError) => {
        setEmailAvailability({msg: error.response?.data as string ?? '', isError: true});
        //setError("email", {message: error.response?.data as string ?? '', type: "value"}, {shouldFocus: true})
      })
  }

  const debouncedFetchCheckUsername = useRef(debounce(fetchCheckUsername, 250));
  const debouncedFetchCheckEmail = useRef(debounce(fetchCheckEmail, 250));

  function checkUsernameAvailability(){
    setUsernameAvailability(undefined);
    debouncedFetchCheckUsername.current();
  }

  function checkEmailAvailability(){
    setEmailAvailability(undefined);
    debouncedFetchCheckEmail.current();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block">
        <label className="form-label">Username</label>
        <input className="form-input" placeholder="Enter your username"
               {...register("username",  { onChange: checkUsernameAvailability, required: true })} />
        {errors.username && <span className="error">{ ERROR_MESSAGE.USERNAME }</span>}
        { usernameAvailability ? <span className={`availability ${usernameAvailability.isError ? 'error' : 'eligible'}`}>{ usernameAvailability.msg }</span> : ''}
      </div>
      <div className="form-block ">
        <label className="form-label">E-mail</label>
        <input className="form-input" placeholder="Enter your email"
               {...register("email",  { onChange: checkEmailAvailability, required: true, pattern: MAIL_REG_EXP })} />
        {errors.email && <span className="error">{ ERROR_MESSAGE.EMAIL }</span>}
        { emailAvailability ? <span className={`availability ${emailAvailability.isError ? 'error' : 'eligible'}`}>{ emailAvailability.msg }</span> : ''}
      </div>
      <div className="form-block ">
        <label className="form-label">Password</label>
        <input className="form-input" type="password" placeholder="Should contains min 6 symbols"
               {...register("password",  { required: true, minLength: 6 })} />
        {errors.password && <span className="error">{ ERROR_MESSAGE.PASSWORD }</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">Admin password <span>(If you have, enter it)</span></label>
        <input className="form-input" placeholder="Enter your administrator password"
               {...register("adminPassword")} />
      </div>
      <button className="form-submit button" type="submit">Create account</button>
    </form>
  )
}

export default Registration;
