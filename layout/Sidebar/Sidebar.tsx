import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import { Search } from '../../components/Search/Search';
import Link from 'next/link';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div {...props} className={cn(className, styles.sideBar)}>
			<Link href={'/'}>
				<a><Logo className={styles.logo} /></a></Link>
			<Search />
			<Menu />
		</div>
	);
};