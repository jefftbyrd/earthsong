'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { getSafeReturnToPath } from '../../../util/validation';
import RegisterComponent from '../../components/RegisterComponent';
import styles from '../../components/ui.module.scss';
import ErrorMessage from '../../ErrorMessage';

// import type { LoginResponseBody } from '../api/login/route';

// type Props = { returnTo?: string | string[] };

export default function LoginForm({ setLoginOpen, loginOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);

  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

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
        className={styles.uiModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <button
          className="closeButtonAlt"
          onClick={() => {
            setLoginOpen(!loginOpen);
          }}
        >
          𐛠
        </button>
        <div className={styles.loginPanel}>
          <p>
            Welcome to <span className={styles.heavy}>Earthsong.</span>
          </p>

          {!registerOpen ? (
            <div className={styles.loginPath}>
              <h2>Login</h2>
              <form onSubmit={async (event) => await handleLogin(event)}>
                <label>
                  Username
                  <input
                    autoFocus={true}
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </label>

                <label>
                  Password
                  <input
                    // autoFocus={true}
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
                  <button
                    className={styles.textButton}
                    onClick={() => {
                      setRegisterOpen(!registerOpen);
                    }}
                  >
                    register
                  </button>
                  . Registered users can save their journeys and return to them
                  later.
                </p>
              </form>
            </div>
          ) : (
            <RegisterComponent
              setRegisterOpen={setRegisterOpen}
              registerOpen={registerOpen}
            />
          )}
          <button className={styles.textButton} onClick={() => {}}>
            About Earthsong
          </button>
          {/* <button
            className={styles.uiButton}
            onClick={() => {
              setLoginOpen(!loginOpen);
            }}
          >
            Close
          </button> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
