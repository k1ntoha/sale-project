import { FC, useState } from 'react'
import styles from './Categories.module.sass'

interface CategoryProps {
	setCurrentCategory: (arg: string) => void
}

const Categories: FC<CategoryProps> = ({ setCurrentCategory }) => {
	const [categories] = useState<string[]>([
		'all',
		'clothes',
		'food',
		'web',
		'games',
	])
	const [activeCategory, setActiveCategory] = useState<string>('all')

	const toggleCategory = (category: string) => {
		setActiveCategory(category)
		setCurrentCategory(category)
	}

	return (
		<div className={styles.categories}>
			{categories.map(category => (
				<span
					key={category}
					className={`${styles.category} ${
						activeCategory === category && styles.activeCategory
					}`}
					onClick={() => toggleCategory(category)}
				>
					{category}
				</span>
			))}
		</div>
	)
}

export default Categories
