import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.js';
import AddUser from './components/AddUser.js';
import EditUser from './components/EditUser.js';

function App() {
	return (
		<Switch>
			<div className="container">
				<Routes>
					<Route path="/" element={<UserList />} />
					<Route path="/add" element={<AddUser />} />
					<Route path="/edit/:id" element={<EditUser />} />
				</Routes>
			</div>
		</Switch>
	);
}

export default App;
