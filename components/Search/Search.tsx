import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useState } from 'react';
import SearchSvg from './search.svg';
import { useRouter } from 'next/router';
export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState('');
	const router = useRouter();
	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		})
	};
	const handleKey = (e) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	}
	return (
		<form className={cn(className, styles.search)} {...props} role='search'>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKey}
			/>
			<Button
				aria-label='Искать по сайту'
				appearance='primary'
				className={styles.button}
				onClick={() => { goToSearch(); }}
			>
				<SearchSvg />
			</Button>
		</form>
	);
};