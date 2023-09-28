import axios from 'axios'
import { FC, useState } from 'react'
import SaleList from '../components/saleList/SaleList'
import { useAppSelector } from '../hooks/storeHooks'
import { API_URL } from '../http'
import styles from '../styles/Admin.module.sass'

const Admin: FC = () => {
	const [isAuth, setAuth] = useState<boolean>(false)

	const [password, setPassword] = useState<string>('')
	const [mailCode, setMailCode] = useState<string>('')

	const [isPasswordCorrect, setPasswordCorrect] = useState<boolean>(false)
	const [isMailCodeCorrect, setMailCodeCorrect] = useState<boolean>(false)

	const sales = useAppSelector(state => state.saleSlice.sales)

	const handlePassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		axios
			.post(`${API_URL}/admin/checkPassword`, { password: password })
			.then(response => {
				if (response.status === 200) {
					setPasswordCorrect(true)
				}
			})
	}

	const handleMailCode = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		axios
			.post(`${API_URL}/admin/checkMailCode`, { mailCode: mailCode })
			.then(response => {
				if (response.status === 200) {
					setMailCodeCorrect(true)
					setAuth(true)
				}
			})
	}

	return (
		<div className={styles.container}>
			{!isAuth && (
				<>
					<form onSubmit={e => handlePassword(e)}>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<input type='submit' value='Check Password' />
					</form>

					<form onSubmit={e => handleMailCode(e)}>
						<input
							type='text'
							value={mailCode}
							onChange={e => setMailCode(e.target.value)}
						/>
						<input type='submit' value='Check Mail Code' />
					</form>
				</>
			)}

			{isAuth && (
				<div>
					You are hacked Sales
					<SaleList
						sales={sales && sales.filter(sale => sale.status === 'moderating')}
					></SaleList>
				</div>
			)}
		</div>
	)
}

export default Admin
