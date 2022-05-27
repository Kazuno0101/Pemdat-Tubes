import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CommentList = () => {
	const { id } = useParams();
	const [comment, setComment] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getComment();
	}, []);

	const getComment = async () => {
		const res = await axios.get(`http://localhost:5000/post/comment/${id}`);
		setComment(res.data);
	};

	const handleDeleteComment = async (id) => {
		const res = await axios.get(`http://localhost:5000/post/comment/${id}`);
		alert(res.data);
		try {
			const json = JSON.stringify({
				like: res.data.like + 1,
			});
			await axios.patch(`http://localhost:5000/post/comment/${res.data.id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			getComment();
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const handleLike = async (id) => {
		const res = await axios.get(`http://localhost:5000/post/comment/${id}`);
		try {
			const json = JSON.stringify({
				like: res.data.like + 1,
			});
			await axios.patch(`http://localhost:5000/post/comment/${id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			getComment();
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddComment = (id) => {
		navigate(`/post/comment/add/${id}`);
	};

	return (
		<div className="columns is-half">
			<div className="column">
				<button onClick={() => handleAddComment(id)} className="button is-primary">
					Add Comment
				</button>
				<table className="table mt-5 is-striped is-fullwidth">
					<thead>
						<tr>
							<th>No</th>
							<th>Username</th>
							<th>Isi</th>
							<th>Like</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{comment.map((c) => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.username}</td>
								<td>{c.isi}</td>
								<td>{c.like}</td>
								<td>
									<Link
										to={`comment/edit/${c.username}`}
										className="button is-info is-small"
									>
										Edit
									</Link>
									<button
										onClick={() => handleDeleteComment(id)}
										className="mx-2 button is-danger is-small"
									>
										Delete
									</button>
									<button
										onClick={() => handleLike(id)}
										className="button is-primary is-small"
									>
										Like
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

export default CommentList;
