import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const UserList = () => {
	const [users, setUser] = useState([]);
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await axios.get('http://localhost:5000/users');
		setUser(res.data);
	};

	const handleDeleteUser = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/users/${id}`);
			getUsers();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="mt-5 columns is-half">
			<div className="column">
				<Link to="add" className="button is-primary">
					Add User
				</Link>
				<table className="table mt-5 is-striped is-fullwidth">
					<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Email</th>
							<th>Username</th>
							<th>Gender</th>
							<th>Dibuat</th>
							<th>Terakhir diubah</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<td>{index + 1}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.username}</td>
								<td>{user.gender}</td>
								<td>{user.create_at}</td>
								<td>{user.update_at}</td>
								<td>
									<Link
										to={`edit/${user._id}`}
										className="button is-info is-small"
									>
										Edit
									</Link>
									<button
										onClick={() =>
											handleDeleteUser(
												user._id
											)
										}
										className="ml-2 button is-danger is-small"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserList;
