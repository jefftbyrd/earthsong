'use server';

import { cookies } from 'next/headers';
import { getSnapshots } from '../../database/snapshots';
import { getUser } from '../../database/users';

export async function loadSnapshots() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  const snapshots = user && (await getSnapshots(sessionTokenCookie.value));

  // return (
  //   <motion.button
  //     className={styles.backToMapIcon}
  //     onClick={async () => {
  //       await setResetPortal(!resetPortal);
  //       await setResetPortal(false);
  //       setEnterPortal(false);
  //     }}
  //     whileHover={{
  //       color: 'rgba(255, 0, 89, 1)',
  //     }}
  //   >
  //     <Logo height="6vw" width="6vw" />
  //   </motion.button>
  // );
}
