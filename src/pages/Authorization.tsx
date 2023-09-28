import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/button/Button'
import Field from '../components/field/Field'
import useInput from '../hooks/UseInput'
import { useAppDispatch } from '../hooks/storeHooks'
import { login, registration } from '../store/UserSlice'
import styles from '../styles/Authorization.module.sass'
const Authorization: FC = () => {
	const navigate = useNavigate()
	const [isLoginActive, setLoginActive] = useState<boolean>(true)
	const password = useInput('amir', 'password')
	const email = useInput('amir1@gmail.com', 'email')
	const dispatch = useAppDispatch()

	const handleForm = (e: React.FormEvent<HTMLFormElement>, type: string) => {
		e.preventDefault()
		if (type === 'login') {
			dispatch(login({ email: email.value, password: password.value })).then(
				response => {
					if (response.payload) {
						navigate('/ownSales')
					}
				}
			)
		} else {
			dispatch(
				registration({ email: email.value, password: password.value })
			).then(response => {
				if (response.payload) {
					navigate('/ownSales')
				}
			})
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.formPage}>
				<h3>
					-Create own Sales <br></br> -Save interesting sales
				</h3>
				<div className={styles.wrapper}>
					<div className={styles.controller}>
						<button
							onClick={() => setLoginActive(true)}
							className={`${styles.controllerBtn} ${
								isLoginActive && styles.activeBtn
							}`}
						>
							Login
						</button>
						<button
							onClick={() => setLoginActive(false)}
							className={`${styles.controllerBtn} ${
								!isLoginActive && styles.activeBtn
							}`}
						>
							Sign Up
						</button>
					</div>
					<form
						className={styles.form}
						onSubmit={e =>
							handleForm(e, `${isLoginActive ? 'login' : 'signup'}`)
						}
					>
						<Field field={email} type='email'></Field>
						<Field field={password} type='password'></Field>

						{isLoginActive && (
							<span className={styles.recoverPassword}>
								Forget Password?{' '}
								<span
									className={styles.redText}
									onClick={() => navigate('/recover')}
								>
									Recover Password
								</span>
							</span>
						)}
						<Button className='redButton'>
							{isLoginActive ? 'Login' : 'Sign Up'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Authorization
