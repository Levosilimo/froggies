import { useForm } from 'react-hook-form';
import { ERROR_MESSAGE } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { loginAction } from "../../store/api-action";

type LoginData = {
  login: string;
  password: string;
}

function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(data => {
    dispatch(loginAction(data));
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-block ">
        <label className="form-label">Login</label>
        <input className="form-input" placeholder="Enter your login or email"
               {...register("login",  { required: true })} />
        {errors.login && <span className="error">{ ERROR_MESSAGE.LOGIN }</span>}

      </div>
      <div className="form-block ">
        <label className="form-label">Password</label>
        <input className="form-input" type="password" placeholder="Password must be at least 6 characters long"
               {...register("password",  { required: true, minLength: 6 })} />
        {errors.password && <span className="error">{ ERROR_MESSAGE.PASSWORD }</span>}
      </div>
      <button className="form-submit button" type="submit">Sign in</button>
    </form>
  )
}

export default Login;
