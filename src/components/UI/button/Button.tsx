import { FC } from 'react'
import styles from './Button.module.sass'
interface Button {
	children: React.ReactNode | React.ReactChild
	onClick?: () => void
	className: 'redButton' | 'greyButton'
}

const Button: FC<Button> = ({ children, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${
				className === 'redButton' ? styles.redButton : styles.greyButton
			}`}
		>
			{children}
		</button>
	)
}

export default Button
