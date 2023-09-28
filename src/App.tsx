import { FC, useEffect } from 'react'
import { useAppDispatch } from './hooks/storeHooks'
import AppRouter from './router/AppRouter'
import { fetchSales } from './store/SaleSlice'

const App: FC = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchSales())
	}, [])
	return <AppRouter></AppRouter>
}

export default App
