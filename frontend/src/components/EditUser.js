import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('Male');
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		getUserById();
	}, []);

	const getUserById = async () => {
		const res = await axios.get(`http://localhost:5000/users/${id}`);
		setName(res.data.name);
		setEmail(res.data.email);
		setGender(res.data.gender);
	};

	const UpdateUser = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`http://localhost:5000/users/${id}`, {
				name,
				email,
				gender,
			});
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const moveHome = () => {
		navigate('/');
	};

	return (
		<div className="columns">
			<div className="column is-half">
				<button onClick={moveHome}>Back</button>
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
