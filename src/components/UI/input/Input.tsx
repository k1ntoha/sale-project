import styles from './Input.module.sass'

const Input = ({ ...props }) => {
	return <input {...props} className={styles.input} />
}

export default Input
