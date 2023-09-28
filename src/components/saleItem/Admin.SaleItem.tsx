import { FC } from 'react'
import { useAppDispatch } from '../../hooks/storeHooks'
import { acceptSale, declineSale, setCurrentSale } from '../../store/SaleSlice'
import Sale from '../../types/SaleTypes'
import Button from '../UI/button/Button'
import styles from './SaleItem.module.sass'

interface SaleItemProps {
	sale: Sale
}

const AdminSaleItem: FC<SaleItemProps> = ({ sale }) => {
	const dispatch = useAppDispatch()
	const modalWindow = () => {
		dispatch(setCurrentSale(sale))
	}

	return (
		<div className={styles.saleItem}>
			<div className={styles.wrapper}>
				<h3>-{sale.percent}%</h3>
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
			<div className={styles.btns}>
				<Button
					className='redButton'
					onClick={() => dispatch(acceptSale(sale._id))}
				>
					Accept
				</Button>
				<Button
					className='greyButton'
					onClick={() => dispatch(declineSale(sale._id))}
				>
					Decline
				</Button>
			</div>
		</div>
	)
}

export default AdminSaleItem
