import { AnimatePresence, motion } from 'motion/react';
import Logo from '../../public/Logo.js';
import styles from './ui.module.scss';

export default function BackToMap({ setEnterPortal }) {
  return (
    <motion.button
      className={styles.backToMapIcon}
      onClick={() => {
        setEnterPortal(false);
      }}
      whileHover={{
        color: 'rgba(255, 0, 89, 1)',
      }}
    >
      <Logo height="6vw" width="6vw" />
    </motion.button>
  );
}
