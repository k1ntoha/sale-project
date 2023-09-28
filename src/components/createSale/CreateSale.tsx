import { FC, useState } from 'react'
import useInput from '../../hooks/UseInput'
import { useAppDispatch } from '../../hooks/storeHooks'
import { addSale } from '../../store/SaleSlice'
import { createSale } from '../../store/UserSlice'
import Sale from '../../types/SaleTypes'
import Button from '../UI/button/Button'
import Field from '../field/Field'
import styles from './CreateSale.module.sass'

const CreateSale: FC = () => {
	const percent = useInput('12', 'percent')
	const company = useInput('eldarado', 'company')
	const description = useInput('loremloremloremloremloremlorem', 'description')
	const link = useInput('google.com', 'link')
	const d = new Date()
	const getMonth = () => {
		if (d.getMonth() + 1 < 10) return `0${d.getMonth() + 1}`
		return d.getMonth()
	}
	const formatDate = `${d.getFullYear()}-${getMonth()}-${d.getDate()}`
	const date = useInput(`${formatDate}`, 'date')

	const [selectedCategory, setSelectedCategory] = useState<string>('clothes')
	const dispatch = useAppDispatch()

	const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newSale: Sale = {
			_id: String(Date.now()),
			categories: ['all', `${selectedCategory}`],
			percent: Number(percent.value),
			company: company.value,
			description: description.value,
			link: link.value,
			deadlineDate: date.value,
			status: 'moderating',
		}

		dispatch(addSale(newSale)).then(response => {
			response.payload && dispatch(createSale(response.payload))
		})
	}

	return (
		<div className={styles.createSaleForm}>
			<form className={styles.form} onSubmit={e => handelSubmit(e)}>
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
					<Button className='redButton'>Create Sale</Button>
				</div>
			</form>
		</div>
	)
}

export default CreateSale
