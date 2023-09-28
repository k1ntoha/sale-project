import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalWindow from '../components/UI/modalWindow/ModalWindow'
import CreateSale from '../components/createSale/CreateSale'
import Navbar from '../components/navbar/Navbar'
import SaleList from '../components/saleList/SaleList'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { checkAuth } from '../store/UserSlice'
import styles from '../styles/OwnSales.module.sass'
const OwnSales: FC = () => {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState<string>('moderating')

	const dispatch = useAppDispatch()

	const currentSale = useAppSelector(state => state.saleSlice.currentSale)
	const sales = useAppSelector(state => state.saleSlice.sales)
	const authUser = useAppSelector(state => state.userReducer.authUser)
	const isUserLoading = useAppSelector(state => state.userReducer.isLoading)
	const isSalesLoading = useAppSelector(state => state.saleSlice.isLoading)
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth()).then(response => {
				if (!response.payload) {
					navigate('/authorization')
				}
			})
		}
	}, [])
	return (
		<div className={styles.container}>
			{currentSale._id && <ModalWindow></ModalWindow>}
			{!isUserLoading && !isSalesLoading ? (
				<>
					<Navbar></Navbar>
					<CreateSale></CreateSale>
					<div className={styles.tabs}>
						<div
							className={`${styles.tab} ${
								activeTab === 'accepted' && styles.activeTab
							}`}
							onClick={() => setActiveTab('accepted')}
						>
							Accepted
						</div>
						<div
							className={`${styles.tab} ${
								activeTab === 'moderating' && styles.activeTab
							}`}
							onClick={() => setActiveTab('moderating')}
						>
							Moderating
						</div>
						<div
							className={`${styles.tab} ${
								activeTab === 'declined' && styles.activeTab
							}`}
							onClick={() => setActiveTab('declined')}
						>
							Declined
						</div>
					</div>
					<SaleList
						sales={
							sales &&
							sales.filter(
								sale =>
									sale.status === activeTab &&
									authUser.createdSales.includes(sale._id) &&
									sale
							)
						}
					></SaleList>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	)
}

export default OwnSales
