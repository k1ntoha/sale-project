import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { toggleSave } from '../../store/UserSlice'
import Sale from '../../types/SaleTypes'
import styles from './SaleItem.module.sass'

interface SaleItemProps {
	sale: Sale
}

const saleItem: FC<SaleItemProps> = ({ sale }) => {
	const navigate = useNavigate()
	const authUser = useAppSelector(state => state.userReducer.authUser)
	const isAuth = useAppSelector(state => state.userReducer.isAuth)
	const dispatch = useAppDispatch()

	const toggleSaveRequest = () => {
		if (isAuth) {
			dispatch(toggleSave(sale._id))
		} else {
			navigate('/authorization')
		}
	}
	return (
		<div className={styles.saleItem}>
			<div className={styles.wrapper}>
				<h3>-{sale.percent}%</h3>
				<i
					className={`${
						isAuth && authUser.savedSales.includes(sale._id)
							? 'fa-solid fa-bookmark'
							: 'fa-regular fa-bookmark'
					}`}
					onClick={() => toggleSaveRequest()}
				></i>
			</div>
			<h5 className={styles.company}>{sale.company}</h5>
			<p>{sale.description}</p>
			<span className={styles.link}>
				<a
					href={`http://${sale.link}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					web page
				</a>
			</span>
			<span className={styles.date}>
				<span className={styles.darkGreyText}>До </span>
				{sale.deadlineDate}
			</span>
		</div>
	)
}

export default saleItem
