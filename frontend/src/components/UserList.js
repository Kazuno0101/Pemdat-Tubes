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
		<div className="columns">
			<div className="column is-half">
				<Link to="add" className="button is-primary">
					Add User
				</Link>
				<table className="table mt-5 is-striped is-fullwidth">
					<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<td>{index + 1}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.gender}</td>
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
										className="button is-danger is-small"
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
