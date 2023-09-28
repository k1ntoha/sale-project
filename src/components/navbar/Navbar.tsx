import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import image from '../../images/logo.png'
import { logout } from '../../store/UserSlice'
import Button from '../UI/button/Button'
import styles from './Navbar.module.sass'

const getActivePage = () => {
	if (String(location.pathname) === '/') return 'All'
	return String(location.pathname).substring(1)
}

const pages = ['All', 'OwnSales', 'SavedSales']

const Navbar: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.userReducer.isAuth)

	return (
		<header>
			<div className={styles.headerContent}>
				<img src={image} alt='Logo' />
				<nav>
					<ul>
						{pages.map((page, index) => (
							<li
								className={`${styles.link} ${
									getActivePage() === page && styles.activePage
								}`}
								onClick={() => {
									navigate(`/${page === 'All' ? '' : page}`)
								}}
								key={index}
							>
								{page}
							</li>
						))}
					</ul>
				</nav>

				{getActivePage() === 'All' ? (
					<Button
						className='redButton'
						onClick={() => {
							isAuth ? navigate('/ownSales') : navigate('/authorization')
						}}
					>
						Add Sale
					</Button>
				) : (
					isAuth && (
						<i
							className='fa-solid fa-arrow-right-from-bracket'
							onClick={() => {
								dispatch(logout())
								navigate('/authorization')
							}}
						></i>
					)
				)}
			</div>
		</header>
	)
}

export default Navbar
