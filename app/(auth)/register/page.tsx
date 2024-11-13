import React from 'react';
import RegisterForm from './RegisterForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function RegisterPage(props: Props) {
  const { returnTo } = await props.searchParams;
  return (
    <div>
      <RegisterForm returnTo={returnTo} />
    </div>
  );
}
