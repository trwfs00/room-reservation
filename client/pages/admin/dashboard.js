import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import Hero from '@components/heroAdmin'

export default function dashboard() {
    const { data: session } = useSession()
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/signup');
        } else if (session.user.role != 'admin') {
            router.push('/');
        } else {
            router.push('/admin/dashboard')
        }
    }, [session])
    return (
        <>
            <Head>
                <title>ระบบจองห้องประชุม</title>
            </Head>
            <Hero />
        </>
    )
}
