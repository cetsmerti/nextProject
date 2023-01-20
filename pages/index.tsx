import { GetStaticPaths, GetStaticProps } from 'next';

import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Home(): JSX.Element {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push('/courses/financial-analytics');
		}, 500);
	}, []);
	return (
		<>
			<h1>Добрый день<br />
				Спасибо что загленули в мои работы. <br />
				Я сейчас вас ревалидирую на рабочие страници<br />
			</h1>
		</>
	);
}

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		},
		redirect: {
			destination: '/courses/financial-analytics',
			permanent: true
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}