'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import StarInverted from '../../public/StarInverted';
import styles from './ui.module.scss';

export default function LoginRef() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setShowModal(false);
    });
  });

  return (
    <>
      <div
        style={{ display: showModal ? 'block' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
        >
          Show Modal
        </button>
      </div>
    </>
  );
}
