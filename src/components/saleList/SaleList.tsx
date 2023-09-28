import { FC } from 'react'
import Sale from '../../types/SaleTypes'
import AdminSaleItem from '../saleItem/Admin.SaleItem'
import OwnSaleItem from '../saleItem/OwnSaleItem'
import SaleItem from '../saleItem/SaleItem'
import styles from './SaleList.module.sass'

interface saleListProps {
	sales: Sale[]
}

const getActivePage = () => {
	if (String(location.pathname) === '/') return 'All'
	return String(location.pathname).substring(1)
}

const SaleList: FC<saleListProps> = ({ sales }) => {
	return (
		<div className={styles.saleList}>
			{getActivePage() !== 'OwnSales' &&
				getActivePage() !== 'admin' &&
				sales.map(sale => <SaleItem key={sale._id} sale={sale}></SaleItem>)}
			{getActivePage() === 'OwnSales' &&
				sales.map(sale => (
					<OwnSaleItem key={sale._id} sale={sale}></OwnSaleItem>
				))}
			{getActivePage() === 'admin' &&
				sales.map(sale => (
					<AdminSaleItem key={sale._id} sale={sale}></AdminSaleItem>
				))}
		</div>
	)
}

export default SaleList
