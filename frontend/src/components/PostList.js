import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const PostList = () => {
	const [post, setPost] = useState([]);

	useEffect(() => {
		getPost();
	}, []);

	const getPost = async () => {
		const res = await axios.get('http://localhost:5000/post');
		setPost(res.data);
	};

	const getUsername = (id) => {
		axios.get(`http://localhost:5000/users/${id}`).then((res) => {
			console.log(res.data.username);
			return res.data.username;
		});
	};

	const handleDeletePost = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/post/${id}`);
			getPost();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async (id) => {
		const res = await axios.get(`http://localhost:5000/post/${id}`);
		try {
			const json = JSON.stringify({
				like: res.data.like + 1,
			});
			await axios.patch(`http://localhost:5000/post/${id}`, json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			getPost();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="columns is-half">
			<div className="column">
				<Link to="/post/add" className="button is-primary">
					Add Post
				</Link>
				<table className="table mt-5 is-striped is-fullwidth">
					<thead>
						<tr>
							<th>No</th>
							<th>Judul</th>
							<th>Kategori</th>
							<th>Isi</th>
							<th>Author</th>
							<th>Like</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{post.map((post, index) => (
							<tr key={post._id}>
								<td>{index + 1}</td>
								<td>{post.judul}</td>
								<td>{post.kategori}</td>
								<td>{post.isi}</td>
								<td>{getUsername(post.author)}</td>
								<td>{post.like}</td>
								<td>
									<Link
										to={`post/edit/${post._id}`}
										className="button is-info is-small"
									>
										Edit
									</Link>
									<button
										onClick={() =>
											handleDeletePost(
												post._id
											)
										}
										className="mx-2 button is-danger is-small"
									>
										Delete
									</button>
									<button
										onClick={() => handleLike(post._id)}
										className="button is-primary is-small"
									>
										Like
									</button>
									<Link
										to={`post/comment/${post._id}`}
										className="mx-2 button is-link is-small"
									>
										Comment
									</Link>
									<Link
										to={`post/${post._id}`}
										className="button is-warning is-small"
									>
										Detail
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PostList;
