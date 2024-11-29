'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import styles from '../../components/ui.module.scss';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBody } from '../api/login/route';

// type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    // router.push(
    //   getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    // );

    router.refresh();
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <p>Welcome to Earth Song.</p>
        <h1>Login</h1>
        <form onSubmit={async (event) => await handleLogin(event)}>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>

          <button className={styles.uiButton}>login</button>

          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          ))}

          <p>
            If you don't have an account, you should{' '}
            <button className={styles.uiButton}>register</button>. Registered
            users can save sounds!
          </p>
        </form>
        <button className={styles.uiButton} onClick={() => {}}>
          About Earth Song
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
