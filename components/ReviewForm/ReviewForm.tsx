import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewSetRespons, ReviewFormForm } from './ReviewFormForm.module';
import axios from 'axios';
import { useState } from 'react';
export const ReviewForm = ({ isOpened, productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>();

	const onSubmit = async (Formdata: ReviewFormForm) => {
		const { data } = await axios.post<IReviewSetRespons>('https://courses-top.ru' + '/api/review/create-demo', { ...FormData, productId });
		try {
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}
		} catch (e) {
			setIsError('status 400');
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} >
			<div className={cn(styles.reviewForm, className)}>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder='Заголовок Отзыва'
					className={styles.title}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1} />
				<div className={styles.rating}
				>
					<span>Оценка:</span>
					<Controller

						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Поставьте оценку' } }}
						render={({ field }) => (
							<Rating tabIndex={isOpened ? 0 : -1} error={errors.rating} isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />
						)}
					/>

				</div>
				<TextArea
					{...register('description', { required: { value: true, message: 'Заполните описание' } })}
					placeholder='Текст отзыва'
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
				/>
				<div className={styles.submit}>
					<Button tabIndex={isOpened ? 0 : -1} appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div >
			{isSuccess && <div className={styles.success}>
				<div className={styles.successTitle}> Выш отзыв Отправлен</div>
				<div>
					Спасибо за ваш отзыв, будет опубликован после проверки
				</div>
				<CloseIcon className={styles.close} />
			</div>}
			{isError && <div className={styles.error}>
				{isError}
				<CloseIcon className={styles.close} />
			</div>}
		</form>
	);
};