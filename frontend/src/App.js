import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.js';
import PostList from './components/PostList.js';
import AddUser from './components/AddUser.js';
import AddPost from './components/AddPost.js';
import EditUser from './components/EditUser.js';
import EditPost from './components/EditPost.js';
import CommentList from './components/CommentList.js';
import AddComment from './components/AddComment.js';
import EditComment from './components/EditComment.js';

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
					<Route path="/edit/:id" element={<EditUser />} />
					<Route path="/post/add" element={<AddPost />} />
					<Route path="/post/edit/:id" element={<EditPost />} />

					<Route path="/post/comment/:id" element={<CommentList />} />
					<Route path="/post/comment/add/:id" element={<AddComment />} />
					<Route path="/post/comment/add/:id/:idComment" element={<EditComment />} />
				</Routes>
			</div>
		</Switch>
	);
}

export default App;
