import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditComment() {
	const [username, setUsername] = useState('');
	const [isi, setIsi] = useState('');
	const navigate = useNavigate();
	const { id, idComment } = useParams();

	const current = new Date();
	const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

	useEffect(() => {
		const getUserById = async () => {
			const res = await axios.get(`http://localhost:5000/post/commentId/${idComment}`);
			setUsername(res.data.username);
			setIsi(res.data.isi);
		};
		getUserById();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const UpdateComment = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`http://localhost:5000/post/commentId/${idComment}`);
			const json = JSON.stringify({
				comment: {
					username: username,
					isi: isi,
					like: res.data.like,
					approve: res.data.approve,
					update_at: date,
				},
			});
			await axios.patch(`http://localhost:5000/post/comment/${id}/${idComment}`, json, {
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
				<form onSubmit={UpdateComment}>
					<div className="field">
						<label className="label">Username</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Kategori..."
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
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

export default EditComment;
