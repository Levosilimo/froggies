import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks";
import {registrationAction} from "../../store/api-action";
import {ERROR_MESSAGE, MAIL_REG_EXP} from "../../constans";

type FormData = {
  username: string;
  email: string;
  password: string;
  adminPassword: string;
}

function Registration () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(data => {
    dispatch(registrationAction(data));
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block">
        <label className="form-label">User name</label>
        <input className="form-input" placeholder="Enter your username"
               {...register("username",  { required: true })} />
        {errors.username && <span className="error">{ ERROR_MESSAGE.USERNAME }</span>}
      </div>
      <div className="form-block ">
        <label className="form-label">E-mail</label>
        <input className="form-input" placeholder="Enter your email"
               {...register("email",  { required: true, pattern: MAIL_REG_EXP })} />
        {errors.email && <span className="error">{ ERROR_MESSAGE.EMAIL }</span>}
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
