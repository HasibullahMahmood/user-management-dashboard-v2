import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import Users from './pages/Users'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'

import Layout from './components/Layout'
import Theme from './config/Theme'
import store from './store/index'
import './config/axios'

const App = () => {
	return (
		<Provider store={store}>
			<Theme>
				<Layout>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Users />} />
							<Route path="/add-user" element={<AddUser />} />
							<Route path="/edit-user/:userId" element={<EditUser />} />
						</Routes>
					</BrowserRouter>
				</Layout>
			</Theme>
		</Provider>
	)
}

export default App
