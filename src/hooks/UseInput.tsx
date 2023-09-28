import { useEffect, useState } from 'react'

const useValidate = (value: string, validation: string) => {
	const [error, setError] = useState('')

	useEffect(() => {
		if (value && validation) {
			if (
				!/[a-zа-яё]/i.test(value) &&
				validation !== 'percent' &&
				validation !== 'date'
			) {
				setError('Enter at least 1 letter')
				return
			} else {
				setError('')
			}
		} else {
			setError('')
			return
		}

		if (validation === 'percent' && value) {
			if (Number(value) > 100 || Number(value) < 1) {
				setError('Enter number from 1-100')
			} else {
				setError('')
				return
			}
		}

		if (validation === 'company') {
			value.length > 16 || value.length < 2
				? setError('Enter 2-16 characters')
				: setError('')
		}

		if (validation === 'description') {
			value.length > 200 || value.length < 20
				? setError('Enter 20-200 characters')
				: setError('')
		}

		if (validation === 'link') {
			value.includes('.')
				? setError('')
				: setError('Enter correct link with dot')
		}

		if (validation === 'email') {
			value.includes('@')
				? setError('')
				: setError('Enter correct email with @')
		}

		if (validation === 'password') {
			if (/^[^A-ZА-ЯЁ]*$/.test(value)) {
				setError('Enter at Capital letter')
				return
			}

			if (!value.includes('$')) {
				setError('Add $ character to your password')
				return
			}

			value.length > 16 || value.length < 10
				? setError('Enter 8-16 characters')
				: setError('')
		}
	}, [value, validation])

	return error
}

const useInput = (initialState: string, validation: string) => {
	const [value, setValue] = useState(initialState)
	const error = useValidate(value, validation)

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	return { value, onChange, error }
}

export default useInput
