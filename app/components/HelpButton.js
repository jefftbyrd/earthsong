import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import HelpIcon from '../../public/HelpIcon';
import HelpPanel from './HelpPanel';
import styles from './ui.module.scss';

export default function HelpButton() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!helpOpen && (
          <motion.button
            className={styles.helpIcon}
            onClick={() => {
              setHelpOpen(!helpOpen);
            }}
            animate={{
              opacity: [0, 1],
              transition: { duration: 1, times: [0, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1 },
            }}
            whileHover={{
              color: 'rgba(255, 0, 89, 1)',
            }}
          >
            <HelpIcon height="5.6vw" width="5.6vw" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {helpOpen && (
          <motion.div
            animate={{
              opacity: [0, 1],
              transition: { duration: 1, times: [0, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1 },
            }}
          >
            <HelpPanel setHelpOpen={setHelpOpen} helpOpen={helpOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
