import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function DetailPost() {
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
	const { id } = useParams();

	const [users, setUser] = useState([]);

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

	const kategoriProperti = () => {
		if (kategori === 'Olahraga') {
			return (
				<div className="field">
					<label className="label">Alat Bantu</label>
					<div className="control">
						<input disabled className="input" value={alatBantu} />
					</div>
				</div>
			);
		} else if (kategori === 'Teknologi') {
			return (
				<>
					<div className="field">
						<label className="label">Merk</label>
						<div className="control">
							<input disabled className="input" value={merk} />
						</div>
					</div>
					<div className="field">
						<label className="label">Spesifikasi</label>
						<div className="control">
							<input disabled className="input" value={spesifikasi} />
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<>
			<Link to="/" className="my-3 button is-primary">
				Back
			</Link>
			<div className="columns">
				<div className="column">
					<div className="field">
						<label className="label">Judul</label>
						<div className="control">
							<input disabled className="input" value={judul} />
						</div>
					</div>
					<div className="field">
						<label className="label">Kategori</label>
						<div className="control">
							<input disabled className="input" value={kategori} />
						</div>
					</div>
					<div className="field">
						<label className="label">Isi</label>
						<textarea
							disabled
							class="textarea"
							placeholder="Isi..."
							value={isi}
							onChange={(e) => setIsi(e.target.value)}
						></textarea>
					</div>
					<div className="field">
						<label className="label">Author</label>
						<div className="control">
							<input disabled className="input" value={author} />
						</div>
					</div>
					<div className="field">
						<label className="label">Like</label>
						<div className="control">
							<input disabled className="input" value={like} />
						</div>
					</div>
				</div>
				<div className="column">
					<div className="field">
						<label className="label">Jenis</label>
						<div className="control">
							<input disabled className="input" value={jenis} />
						</div>
					</div>
					<div className="field">
						<label className="label">Sub Jenis</label>
						<div className="control">
							<input disabled className="input" value={subJenis} />
						</div>
					</div>
					{kategoriProperti()}
				</div>
			</div>
		</>
	);
}

export default DetailPost;
