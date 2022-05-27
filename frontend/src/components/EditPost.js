import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function AddPost() {
	const [judul, setJudul] = useState('');
	const [kategori, setKategori] = useState('');
	const [isi, setIsi] = useState('');
	const [author, setAuthor] = useState('');
	const [like, setLike] = useState();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getUserById = async () => {
			const res = await axios.get(`http://localhost:5000/post/${id}`);
			setJudul(res.data.judul);
			setKategori(res.data.kategori);
			setIsi(res.data.isi);
			setAuthor(res.data.author);
			setLike(res.data.like);
		};
		getUserById();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const UpdatePost = async (e) => {
		e.preventDefault();
		try {
			const json = JSON.stringify({
				judul: judul,
				kategori: kategori,
				isi: isi,
				author: author,
				like: like,
			});
			await axios.patch(`http://localhost:5000/post/${id}`, json, {
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
				<form onSubmit={UpdatePost}>
					<div className="field">
						<label className="label">Judul</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Judul..."
								value={judul}
								onChange={(e) => setJudul(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Kategori</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Kategori..."
								value={kategori}
								onChange={(e) => setKategori(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Isi</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Isi..."
								value={isi}
								onChange={(e) => setIsi(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Author</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Author..."
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
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

export default AddPost;
