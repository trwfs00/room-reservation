import Image from 'next/image'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { getSession, useSession, signOut, signIn, signUp } from 'next-auth/react';
import Hero from '@components/hero';
import { useEffect } from 'react';
export default function Home() {
  const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/');
        } else if (session?.user?.role === 'admin') {
            router.push('/admin/dashboard');
        }
    },[session])
  return (
    <>
    <Head>
      <title>ระบบจองห้องประชุม</title>
    </Head>
    <Hero/>
    </>
  )
}
