import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNum, priceUa } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion'
import { is } from 'date-fns/locale';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDListElement>(null);
	const valueAnim = {
		visible: {
			opacity: 1,
			height: 'auto'
		},
		hidden: { opacity: 0, height: 0 }
	}

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};
	return (
		<div {...props} ref={ref}>
			<Card className={styles.product} >
				<div className={styles.logo}> <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} /></div>
				<div className={styles.title}> {product.title}</div>
				<div className={styles.price}>
					{priceUa(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceUa(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}> {priceUa(product.credit)}/<span className={styles.manth}>месяцы</span></div>
				<div className={styles.rating}> <Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}> {product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'> {c} </Tag>)} </div>
				<div className={styles.priceTitle}> цена</div>
				<div className={styles.creditTitle}> кредит</div>
				<div className={styles.rateTitle}> <a href='#ref' onClick={scrollToReview}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыва', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}> {product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantage && <div className={styles.disadvantage}>
						<div className={styles.advTitle} >Недостатки</div>
						{product.disadvantage}
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'> Узгать подробнее</Button>
					<Button appearance='ghost' aria-expanded={isReviewOpened} onClick={() => setIsReviewOpened(!isReviewOpened)} className={styles.reviewButton} arrow={isReviewOpened ? 'down' : 'right'}> Узгать подробнее</Button>
				</div>
			</Card>
			<motion.div
				layout
				variants={valueAnim}
				initial={'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}
			>
				<Card color='blue' className={cn(styles.review)} tabIndex={isReviewOpened ? 0 : -1} ref={reviewRef}>
					{product.reviews.map(rew => (
						<div key={rew._id} >
							<Review review={rew} />
							<Divider />
						</div>
					))}
					<ReviewForm isOpened={isReviewOpened} productId={product._id} />
				</Card>
			</motion.div>
		</div>
	);
}));