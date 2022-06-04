import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function AddPost() {
	const [judul, setJudul] = useState('');
	const [kategori, setKategori] = useState('');
	const [isi, setIsi] = useState('');
	const [author, setAuthor] = useState('');
	const [like, setLike] = useState();
	const [jenis, setJenis] = useState('');
	const [subJenis, setSubJenis] = useState();
	const [alatBantu, setAlatBantu] = useState();
	const [merk, setMerk] = useState();
	const [spesifikasi, setSpesifikasi] = useState();
	const navigate = useNavigate();
	const { id } = useParams();

	const [users, setUser] = useState([]);

	const current = new Date();
	const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

	useEffect(() => {
		const getUserById = async () => {
			const res = await axios.get(`http://localhost:5000/post/${id}`);
			setJudul(res.data.judul);
			setKategori(res.data.kategori);
			setIsi(res.data.isi);
			setAuthor(res.data.author);
			setLike(res.data.like);
			setJenis(res.data.filter.jenis);
			setSubJenis(res.data.filter.subJenis);
			setAlatBantu(res.data.filter.alatBantu);
			setMerk(res.data.filter.merk);
			setSpesifikasi(res.data.filter.spesifikasi);
		};
		const getUsers = async () => {
			const res = await axios.get('http://localhost:5000/users');
			setUser(res.data);
		};
		getUserById();
		getUsers();
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
				filter: {
					jenis: jenis,
					subJenis: subJenis,
					alatBantu: alatBantu,
					merk: merk,
					spesifikasi: spesifikasi,
				},
				update_at: date,
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
		<form onSubmit={UpdatePost}>
			<Link to="/" className="my-3 button is-primary">
				Back
			</Link>
			<div className="columns">
				<div className="column is-half">
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
