'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import Star from '../../public/Star.js';
import SnapshotForm from '../snapshots/SnapshotForm';
import styles from './ui.module.scss';

export default function Profile(props) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setProfileOpen(!profileOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
        }}
      >
        <Star height="6vw" width="6vw" />
      </motion.button>

      {profileOpen ? (
        <SnapshotForm user={props.user} snapshots={props.snapshots} />
      ) : null}
    </>
  );
}
