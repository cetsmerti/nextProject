import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/types';
import React, { useEffect } from 'react';
import { withLayout } from '../../layout/Layout';


function Type(): JSX.Element {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 500);
    }, []);
    return (
        <>
            <h1>По курсу вёрстки и построение этих веток не было <br />
                Сейчас сделаю редирект
            </h1>
        </>
    );
}

export default withLayout(Type);

