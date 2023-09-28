import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import SaleList from '../components/saleList/SaleList'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { checkAuth } from '../store/UserSlice'
import styles from '../styles/SavedSales.module.sass'

const SavedSales: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const sales = useAppSelector(state => state.saleSlice.sales)
	const isAuth = useAppSelector(state => state.userReducer.isAuth)
	const authUser = useAppSelector(state => state.userReducer.authUser)
	useEffect(() => {
		if (isAuth)
			if (localStorage.getItem('token'))
				dispatch(checkAuth()).then(response => {
					if (!response.payload) navigate('/authorization')
				})
	}, [])
	return (
		<div className={styles.container}>
			<Navbar></Navbar>

			<SaleList
				sales={
					sales &&
					sales.filter(sale => authUser.savedSales.includes(sale._id) && sale)
				}
			></SaleList>
		</div>
	)
}

export default SavedSales
