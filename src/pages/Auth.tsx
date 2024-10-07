import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import illustration from '../assets/login-illustration.png';
import { useUser } from '../hooks/user';
import { ROUTES } from '../constants';
import { registration, login } from '../http/userApi';
import Alert from '../components/Alert';

const emptyForm = {
  email: '',
  password: '',
}

const Auth = observer(() => {
  const user = useUser();
  const location = useLocation();
  const isLogin = location.pathname === ROUTES.login;

  const [form, setForm] = useState(emptyForm);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;

    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const makeRegistratinReq = async () => {
    await registration(form.email, form.password)
      .then((resp) => {
        setAlertMessage(resp.data.message);
        setIsAlert(true)
      })
      .catch((err) => {
        setAlertMessage(err.response.data.message);
        setIsAlert(true)
      })
  }

  const makeLoginReq = async () => {
    await login(form.email, form.password)
      .then((resp) => {
        user.setUser(jwtDecode(resp.data.token));
        user.setAuth(true);
      })
      .catch((err) => {
        setAlertMessage(err.response.data.message);
        setIsAlert(true)
      })
      .finally(() => setForm(emptyForm));
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (isLogin) {
      makeLoginReq();
    } else {
      makeRegistratinReq();
    }
  }

  if (user.isAuth) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <main className='flex_between w-full h-screen'>
      <div className='flex_center w-full md:w-1/3 h-full px-8 lg:px-16 bg-slate-100 shadow-sm'>
        <form className='flex_col w-full max-w-80' onSubmit={onFormSubmit}>
          <h1 className='text-3xl px-0.5'>
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <input
            type='email'
            name='email'
            className='text_input mt-8'
            placeholder='Email'
            value={form.email}
            onChange={onInputChange}
            required
          />
          <input
            type='password'
            name='password'
            className='text_input mt-8'
            placeholder='Password'
            value={form.password}
            onChange={onInputChange}
            required
          />
          <button type='submit' className='button rose h-12 w-full mt-16'>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <div className='flex gap-1 mt-4 self-center'>
            <span>{isLogin ? 'No account?' : 'Already registered?'}</span>
            <Link
              to={isLogin ? ROUTES.signUp : ROUTES.login}
              className='text-rose-500 underline'
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Link>
          </div>
        </form>

      </div>

      <div className='hidden md:flex w-2/3'>
        <img
          src={illustration}
          alt='illustration'
          width={447}
          height={400}
          className='mx-auto'
        />
      </div>
      {isAlert && <Alert message={alertMessage} handleClose={() => setIsAlert(false)} />}
    </main>
  )
})

export default Auth;