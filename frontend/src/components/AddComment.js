import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function AddComment() {
	const [username, setUsername] = useState('');
	const [isi, setIsi] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();
	const [users, setUser] = useState([]);

	const current = new Date();
	const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

	useEffect(() => {
		getUsers();
	}, []);
	const getUsers = async () => {
		const res = await axios.get('http://localhost:5000/users');
		setUser(res.data);
	};

	const saveComment = async (e) => {
		e.preventDefault();
		try {
			const json = JSON.stringify({
				comment: {
					username: username,
					isi: isi,
					like: 0,
					approve: false,
					create_at: date,
					update_at: date,
				},
			});
			// const res = await axios.post('http://localhost:5000/post', json, {
			await axios.post(`http://localhost:5000/post/comment/${id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			navigate(`/post/comment/${id}`);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className="columns">
			<div className="column is-half">
				<Link to="/" className="button is-primary">
					Back
				</Link>
				<form onSubmit={saveComment}>
					<div className="field">
						<label className="label">Username</label>
						<div className="control">
							<div className="select is-fullwidth">
								<select value={username} onChange={(e) => setUsername(e.target.value)}>
									<option>---Username---</option>
									{users.map((user) => (
										<option
											key={user._id}
											value={
												user.username
											}
										>
											{user.username}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="field">
						<label className="label">Isi</label>
						<div className="control">
							<textarea
								class="textarea"
								placeholder="Isi..."
								value={isi}
								onChange={(e) => setIsi(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className="field">
						<button type="submit" className="button is-success">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddComment;
