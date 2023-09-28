import { FC, useState } from 'react'
import Input from '../UI/input/Input'
import styles from './Field.module.sass'

interface FieldProps {
	type: string
	field: any
}

const Field: FC<FieldProps> = ({ field, type }) => {
	const [isVisible, setVisible] = useState<boolean>(false)
	return (
		<div className={styles.field}>
			<div className={styles.fieldItem}>
				<Input
					value={field.value}
					onChange={field.onChange}
					type={`${
						type === 'password'
							? isVisible
								? 'text'
								: 'password'
							: type === 'percent' || type === 'recoverCode'
							? 'number'
							: type === 'date'
							? 'date'
							: 'text'
					}`}
					placeholder={type}
					min='2023-09-16'
				/>

				{type === 'userName' && <i className='fa-solid fa-user'></i>}
				{type === 'email' && <i className='fa-solid fa-envelope'></i>}
				{type === 'password' && (
					<i
						onClick={() => {
							setVisible(!isVisible)
						}}
						className={isVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}
					></i>
				)}
			</div>

			<p className={styles.error}>{field.error}</p>
		</div>
	)
}

export default Field
