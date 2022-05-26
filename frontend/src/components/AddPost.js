import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddPost() {
	const [judul, setJudul] = useState('');
	const [kategori, setKategori] = useState('');
	const [isi, setIsi] = useState('');
	const [author, setAuthor] = useState('');
	const navigate = useNavigate();

	const savePost = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				'http://localhost:5000/posts',
				{
					judul: judul,
					kategori: kategori,
					isi: isi,
					author: author,
					like: 0,
				},
				{ headers: { 'content-type': 'application/json' } }
			);
			navigate('/');
		} catch (error) {
			alert(error);
			console.log(error);
		}
	};

	return (
		<div className="columns">
			<div className="column is-half">
				<Link to="/" className="button is-primary">
					Back
				</Link>
				<form onSubmit={savePost}>
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
