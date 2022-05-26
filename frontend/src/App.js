import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.js';
import PostList from './components/PostList.js';
import AddUser from './components/AddUser.js';
import AddPost from './components/AddPost.js';
import EditUser from './components/EditUser.js';

function App() {
	return (
		<Switch>
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<UserList />
								<hr />
								<PostList />
							</>
						}
					/>
					<Route path="/add" element={<AddUser />} />
					<Route path="/post/add" element={<AddPost />} />
					<Route path="/edit/:id" element={<EditUser />} />
				</Routes>
			</div>
		</Switch>
	);
}

export default App;
