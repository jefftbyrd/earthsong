'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import StarInverted from '../../public/StarInverted';
import styles from './ui.module.scss';

export default function Login() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setLoginOpen(!loginOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
          // rotate: 30,
        }}
      >
        <StarInverted height="6vw" width="6vw" />
      </motion.button>

      {loginOpen ? (
        <LoginForm setLoginOpen={setLoginOpen} loginOpen={loginOpen} />
      ) : null}
    </>
  );
}
