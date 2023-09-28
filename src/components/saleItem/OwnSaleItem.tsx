import { FC } from 'react'
import { useAppDispatch } from '../../hooks/storeHooks'
import { deleteSale, setCurrentSale } from '../../store/SaleSlice'
import { removeSale } from '../../store/UserSlice'
import Sale from '../../types/SaleTypes'
import styles from './SaleItem.module.sass'

interface SaleItemProps {
	sale: Sale
}

const ownSaleItem: FC<SaleItemProps> = ({ sale }) => {
	const dispatch = useAppDispatch()
	const modalWindow = () => {
		dispatch(setCurrentSale(sale))
	}

	return (
		<div className={styles.saleItem}>
			<div className={styles.wrapper}>
				<h3>-{sale.percent}%</h3>
				<div className={styles.settingIcons}>
					<i
						className='fa-solid fa-trash'
						onClick={() =>
							dispatch(deleteSale(sale._id)).then(response =>
								dispatch(removeSale(response.payload))
							)
						}
					></i>
					<i className='fa-solid fa-gear' onClick={modalWindow}></i>
				</div>
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

export default ownSaleItem
