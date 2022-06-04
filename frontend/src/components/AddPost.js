import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddPost() {
	const [judul, setJudul] = useState('');
	const [kategori, setKategori] = useState('Teknologi');
	const [isi, setIsi] = useState('');
	const [author, setAuthor] = useState('');
	const [jenis, setJenis] = useState('');
	const [subJenis, setSubJenis] = useState();
	const [alatBantu, setAlatBantu] = useState();
	const [merk, setMerk] = useState();
	const [spesifikasi, setSpesifikasi] = useState();
	const navigate = useNavigate();

	const [users, setUser] = useState([]);
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await axios.get('http://localhost:5000/users');
		setUser(res.data);
	};

	const savePost = async (e) => {
		e.preventDefault();
		try {
			const json = JSON.stringify({
				judul: judul,
				kategori: kategori,
				isi: isi,
				author: author,
				like: 0,
				filter: {
					jenis: jenis,
					subJenis: subJenis,
					alatBantu: alatBantu,
					merk: merk,
					spesifikasi: spesifikasi,
				},
			});

			// const res = await axios.post('http://localhost:5000/post', json, {
			await axios.post('http://localhost:5000/post', json, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json',
				},
			});
			navigate('/');
		} catch (error) {
			alert(error);
		}
	};

	const kategoriProperti = () => {
		if (kategori === 'Olahraga') {
			return (
				<div className="field">
					<label className="label">Alat Bantu</label>
					<div className="control">
						<input
							type="text"
							className="input"
							placeholder="Alat Bantu..."
							value={alatBantu}
							onChange={(e) => setAlatBantu(e.target.value)}
						/>
					</div>
				</div>
			);
		} else if (kategori === 'Teknologi') {
			return (
				<>
					<div className="field">
						<label className="label">Merk</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Merk..."
								value={merk}
								onChange={(e) => setMerk(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Spesifikasi</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Spesifikasi..."
								value={spesifikasi}
								onChange={(e) => setSpesifikasi(e.target.value)}
							/>
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<form onSubmit={savePost}>
			<Link to="/" className="my-3 button is-primary">
				Back
			</Link>
			<div className="columns">
				<div className="column">
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
							<div className="select is-fullwidth">
								<select value={kategori} onChange={(e) => setKategori(e.target.value)}>
									<option value="Teknologi">Teknologi</option>
									<option value="Olahraga">Olahraga</option>
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
						<label className="label">Author</label>
						<div className="control">
							<div className="select is-fullwidth">
								<select value={author} onChange={(e) => setAuthor(e.target.value)}>
									{users.map((user) => (
										<option key={user._id} value={user._id}>
											{user.username}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="field">
						<button type="submit" className="button is-success">
							Save
						</button>
					</div>
				</div>
				<div className="column">
					<div className="field">
						<label className="label">Jenis</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Jenis..."
								value={jenis}
								onChange={(e) => setJenis(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Sub Jenis</label>
						<div className="control">
							<input
								type="text"
								className="input"
								placeholder="Sub Jenis..."
								value={subJenis}
								onChange={(e) => setSubJenis(e.target.value)}
							/>
						</div>
					</div>
					{kategoriProperti()}
				</div>
			</div>
		</form>
	);
}

export default AddPost;
