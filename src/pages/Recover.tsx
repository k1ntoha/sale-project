import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/button/Button'
import Field from '../components/field/Field'
import useInput from '../hooks/UseInput'
import AuthService from '../services/AuthService'
import styles from '../styles/Recover.module.sass'
const Recover: FC = () => {
	const email = useInput('amiryuld@gmail.com', 'email')
	const password = useInput('', 'password')
	const recoverCode = useInput('', 'recoverCode')
	const navigate = useNavigate()
	const [isEmailField, setEmailField] = useState<boolean>(true)
	const [isRecoverCodeField, setRecoverCodeField] = useState<boolean>(false)
	const [isNewPasswordField, setNewPasswordField] = useState<boolean>(false)

	const handleEmailSubmit = (e: FormEvent) => {
		e.preventDefault()
		try {
			AuthService.sendRecoverMail(email.value).then(response => {
				if (response.status === 200) {
					setEmailField(false)
					setRecoverCodeField(true)
				}
			})
		} catch (e) {
			console.log(e)
		}
	}

	const handelRecoverCodeSubmit = (e: FormEvent) => {
		e.preventDefault()

		try {
			AuthService.sendRecoverCode(Number(recoverCode.value), email.value).then(
				response => {
					if (response.data) {
						setRecoverCodeField(false)
						setNewPasswordField(true)
					}
				}
			)
		} catch (e) {
			console.log(e)
		}
	}

	const handlePasswordSubmit = (e: FormEvent) => {
		e.preventDefault()
		navigate('/authorization')
	}

	return (
		<div className={styles.container}>
			<i
				className={`${styles.back} fa-solid fa-chevron-left`}
				onClick={() => navigate('/authorization')}
			></i>
			<h2>Recover Password</h2>

			{isEmailField && (
				<form onSubmit={e => handleEmailSubmit(e)}>
					<Field field={email} type='email'></Field>
					<Button className='redButton'>Send recover Code</Button>
				</form>
			)}

			{isRecoverCodeField && (
				<form onSubmit={e => handelRecoverCodeSubmit(e)}>
					<Field field={recoverCode} type='recoverCode'></Field>
					<Button className='redButton'>Check Code</Button>
				</form>
			)}

			{isNewPasswordField && (
				<form onSubmit={e => handlePasswordSubmit(e)}>
					<Field field={password} type='password'></Field>
					<Button className='redButton'>Set new Password</Button>
				</form>
			)}
		</div>
	)
}

export default Recover
