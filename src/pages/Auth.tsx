import { FormEventHandler, useState } from 'react';
import illustration from '../assets/login-illustration.png';

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleTabClick = () => {
    setIsLogin(prev => !prev);
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

  }

  return (
    <main className='flex_between w-full h-screen'>
      <div className='flex_center w-1/3 h-full px-16 bg-slate-100'>
        <form className='flex_col w-full' onSubmit={onFormSubmit}>
          <h1 className='text-3xl px-0.5'>
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <input
            type='emailnom'
            className='text_input mt-8'
            placeholder='Email'
            required
          />
          <input
            type='password'
            className='text_input mt-8'
            placeholder='Password'
            required
          />
          <button type='submit' className='button rose h-12 w-full mt-16'>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <div className='flex gap-1 mt-4 self-center'>
            <span>{isLogin ? 'No account?' : 'Already registered?'}</span>
            <button
              type='button'
              className='text-rose-500 underline'
              onClick={handleTabClick}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>

      </div>

      <div className='hidden sm:flex w-2/3 flex_center'>
        <img
          src={illustration}
          alt='illustration'
          width={447}
          height={400}
        />
      </div>
    </main>
  )
}

export default Auth;