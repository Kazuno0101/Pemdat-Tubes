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

	const handleDeleteComment = async (idComment) => {
		try {
			const json = JSON.stringify({ comment: { _id: idComment } });
			const res = await axios.delete(`http://localhost:5000/post/comment/${id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			alert(json);
			console.log(res);
			getComment();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async (idComment) => {
		const res = await axios.get(`http://localhost:5000/post/commentId/${idComment}`);
		try {
			const json = JSON.stringify({ 'comment.$.like': res.data.like + 1 });
			await axios.patch(`http://localhost:5000/post/comment/${id}/${idComment}`, json, {
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

	const handleApprove = async (idComment) => {
		try {
			const json = JSON.stringify({ 'comment.$.approve': true });
			await axios.patch(`http://localhost:5000/post/comment/${id}/${idComment}`, json, {
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

	const handleShowApprove = (isi) => {
		return isi ? 'Approve' : 'Not Approve';
	};

	const handleAddComment = (id) => {
		navigate(`/post/comment/add/${id}`);
	};

	return (
		<div className="mt-5 columns is-half">
			<div className="column">
				<Link to="/" className="mr-5 button is-primary">
					Back
				</Link>
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
							<th>Approve</th>
							<th>Dibuat</th>
							<th>Terakhir diubah</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{comment.map((c, index) => (
							<tr key={c._id}>
								<td>{index + 1}</td>
								<td>{c.username}</td>
								<td>{c.isi}</td>
								<td>{c.like}</td>
								<td>{handleShowApprove(c.approve)}</td>
								<td>{c.create_at}</td>
								<td>{c.update_at}</td>
								<td>
									<Link
										to={`/post/comment/add/${id}/${c._id}`}
										className="button is-info is-small"
									>
										Edit
									</Link>
									<button
										onClick={() =>
											handleDeleteComment(
												c._id
											)
										}
										className="mx-2 button is-danger is-small"
									>
										Delete {c._id}
									</button>
									<button
										onClick={() => handleLike(c._id)}
										className="button is-primary is-small"
									>
										Like
									</button>
									<button
										onClick={() => handleApprove(c._id)}
										className="ml-2 button is-primary is-small"
									>
										Approve
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
