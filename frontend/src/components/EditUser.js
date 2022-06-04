import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditUser() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [gender, setGender] = useState('Male');
	const navigate = useNavigate();
	const { id } = useParams();

	const current = new Date();
	const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

	useEffect(() => {
		const getUserById = async () => {
			const res = await axios.get(`http://localhost:5000/users/${id}`);
			setName(res.data.name);
			setEmail(res.data.email);
			setUsername(res.data.username);
			setGender(res.data.gender);
		};
		getUserById();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const UpdateUser = async (e) => {
		e.preventDefault();
		try {
			const json = JSON.stringify({
				name: name,
				email: email,
				username: username,
				gender: gender,
				update_at: date,
			});
			await axios.patch(`http://localhost:5000/users/${id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="columns">
			<div className="column is-half">
				<Link to="/" className="button is-primary">
					Back
				</Link>
				<form onSubmit={UpdateUser}>
					<div className="field">
						<label className="label">Name</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Name..."
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Email..."
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Username</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Username..."
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Gender</label>
						<div className="control">
							<div className="select is-fullwidth">
								<select value={gender} onChange={(e) => setGender(e.target.value)}>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
						</div>
					</div>
					<div className="field">
						<button type="submit" className="button is-success">
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditUser;
