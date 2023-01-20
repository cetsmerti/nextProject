import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './Sort.svg';
import { KeyboardEvent } from 'react';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {

	const EnterFunk = (e: KeyboardEvent, sort: SortEnum) => {
		if ((e.key == 'Enter' || e.key == 'Space') && SortEnum.Rating) {
			e.preventDefault;
			setSort(SortEnum.Rating);
		}
		if ((e.key == 'Enter' || e.key == 'Space') && SortEnum.Price) {
			e.preventDefault;
			setSort(SortEnum.Price);
		}
	}
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				tabIndex={0}
				onKeyDown={(key: KeyboardEvent) => EnterFunk(key, SortEnum.Rating)}
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}

			>
				<SortIcon className={styles.sortIcon} />По рейтингу
			</span>
			<span
				tabIndex={0}
				onKeyDown={(key: KeyboardEvent) => EnterFunk(key, SortEnum.Price)}
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
			>
				<SortIcon className={styles.sortIcon} />По цене
			</span>
		</div>
	);
};