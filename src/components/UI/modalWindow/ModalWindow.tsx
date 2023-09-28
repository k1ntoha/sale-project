import { FC, useState } from 'react'
import useInput from '../../../hooks/UseInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks'
import { setCurrentSale, updateSale } from '../../../store/SaleSlice'
import Sale from '../../../types/SaleTypes'
import Field from '../../field/Field'
import Button from '../button/Button'
import styles from './ModalWindow.module.sass'

const ModalWindow: FC = () => {
	const dispatch = useAppDispatch()
	const authUser = useAppSelector(state => state.userReducer.authUser)
	const sale = useAppSelector(state => state.saleSlice.currentSale)
	const percent = useInput(`${sale.percent}`, 'percent')
	const company = useInput(`${sale.company}`, 'company')
	const description = useInput(`${sale.description}`, 'description')
	const link = useInput(`${sale.link}`, 'link')
	const date = useInput(`${sale.deadlineDate}`, 'date')
	const [selectedCategory, setSelectedCategory] = useState<string>('clothes')
	const currentSale = useAppSelector(state => state.saleSlice.currentSale)
	const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const updatedSale: Sale = {
			_id: currentSale._id,
			categories: ['all', `${selectedCategory}`],
			percent: Number(percent.value),
			company: company.value,
			description: description.value,
			link: link.value,
			deadlineDate: date.value,
			status: 'moderating',
		}

		dispatch(updateSale(updatedSale))
		dispatch(setCurrentSale({} as Sale))
	}

	return (
		<div className={styles.modalWindow}>
			<div className={styles.modalForm}>
				<form className={styles.form} onSubmit={e => handelSubmit(e)}>
					<i
						className='fa-solid fa-xmark'
						onClick={() => dispatch(setCurrentSale({} as Sale))}
					></i>
					<Field field={percent} type='percent'></Field>
					<Field field={company} type='company'></Field>
					<Field field={description} type='description'></Field>
					<Field field={link} type='link'></Field>
					<Field field={date} type='date'></Field>
					<div>
						<select
							name='category'
							id='category'
							onChange={e => setSelectedCategory(e.currentTarget.value)}
						>
							<option value='clothes'>Clothes</option>
							<option value='food'>Food</option>
							<option value='games'>Games</option>
							<option value='web'>Web</option>
						</select>
					</div>
					<div>
						<Button className='redButton'>Update Sale</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ModalWindow
