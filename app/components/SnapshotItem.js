'use client';
import styles from './ui.module.scss';

export default function SnapshotItem({
  snapshot,
  setRecallId,
  setPortalRecall,
  setProfileOpen,
  setEnterPortal,
  resetPortal,
  setResetPortal,
  setStartWind,
  setIsStarted,
}) {
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  return (
    <>
      {/* {snapshot.title} */}
      <button
        onClick={async () => {
          await setResetPortal(true);
          await setResetPortal(false);
          await setEnterPortal(false);
          await setRecallId(snapshot.id);
          await setPortalRecall(true);
          setStartWind(false);
          setProfileOpen(false);
          setEnterPortal(true);
          setIsStarted(true);
        }}
      >
        {snapshot.title}
      </button>
    </>
  );
}
