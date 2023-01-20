
import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return <>
		<Head>
			<title>MyTop - наш лучший топ</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="preconnect" href="https://mc.yandex.ru" />
			<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
			<meta property='og:url' content={process.env.NODE_ENV + router.asPath} />
			<meta property='og:locale' content='ru-Ru' />
			<meta property='og:type' content='article' />
		</Head>
		<Component {...pageProps} />
	</>;
}

export default MyApp;
