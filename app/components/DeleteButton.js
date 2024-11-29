import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { useState } from 'react';
import type { AnimalResponseBodyDelete } from '../../api/animals/[animalId]/route';
import ErrorMessage from '../ErrorMessage';

export default function DeleteButton() {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');

return (
<button
  onClick={async () => {
    const response = await fetch(
      `/api/animals/${animal.id}`,
      {
        method: 'DELETE',
      },
    );

    setErrorMessage('');

    if (!response.ok) {
      let newErrorMessage = 'Error deleting animal';

      const responseBody: AnimalResponseBodyDelete =
        await response.json();

      if ('error' in responseBody) {
        newErrorMessage = responseBody.error;
      }

      // TODO: Use toast instead of showing
      // this below creation / update form
      setErrorMessage(newErrorMessage);
      return;
    }

    router.refresh();

    // Reset form states if deleting an
    // animal after editing it
    resetFormStates();
  }}
>
  Delete
</button>
)
}
