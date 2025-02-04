import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import '../login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../context';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/product-backlog' });
    }
  },
  component: Login,
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  async function onFormSubmit(formData: FormData) {
    const data = {
      ...Object.fromEntries(formData),
    } as {
      username: string;
      password: string;
    };

    await auth.login(data.username, data.password);
    await router.invalidate();
  }

  return (
    <div className="login__container">
      <form className="login__form" action={onFormSubmit}>
        <p className="login__text login__text--welcome">Welcome To</p>
        <h1 className="login__text">Scrummarize</h1>

        <div className="login__fields">
          <div className="login__field">
            <label className="login__label" htmlFor="username">
              Username
            </label>
            <input className="login__input" id="username" name="username" />
          </div>
          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <div className="login__input-wrapper">
              <input
                className="login__input"
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                name="password"
              />
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="login__icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="login__icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
        </div>

        <button className="login__button">Log In</button>
      </form>
    </div>
  );
}
