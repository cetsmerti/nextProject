import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheakSvg from './cheak.svg';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantages}>
					<CheakSvg />
					<div className={styles.title}> {a.title}</div>
					<hr className={styles.vline} />
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};