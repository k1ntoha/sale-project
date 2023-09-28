import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Authorization from '../pages/Authorization'
import Main from '../pages/Main'
import OwnSales from '../pages/OwnSales'
import Recover from '../pages/Recover'
import SavedSales from '../pages/SavedSales'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main></Main>}></Route>
				<Route path='/all' element={<Main></Main>}></Route>
				<Route
					path='/authorization'
					element={<Authorization></Authorization>}
				></Route>
				<Route path='/ownSales' element={<OwnSales></OwnSales>}></Route>
				<Route path='/savedSales' element={<SavedSales></SavedSales>}></Route>
				<Route path='/recover' element={<Recover></Recover>}></Route>
				<Route path='/admin' element={<Admin></Admin>}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
