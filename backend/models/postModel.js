import mongoose from 'mongoose';

const Comment = mongoose.Schema({
	id: {
		type: Number,
		required: false,
	},
	username: {
		type: String,
		required: false,
	},
	isi: {
		type: String,
		required: false,
	},
	like: {
		type: Number,
		required: false,
	},
	approve: {
		type: Boolean,
		required: false,
	},
});

const Filter = mongoose.Schema({
	jenis: {
		type: String,
		required: true,
	},
	subJenis: {
		type: String,
		required: false,
	},
	alatBantu: {
		type: String,
		required: false,
	},
	merk: {
		type: String,
		required: false,
	},
	spesifikasi: {
		type: String,
		required: false,
	},
});

const Post = mongoose.Schema({
	judul: {
		type: String,
		required: true,
	},
	kategori: {
		type: String,
		required: true,
	},
	isi: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	comment: {
		type: [Comment],
		required: false,
	},
	like: {
		type: Number,
		required: true,
	},
	filter: {
		type: Filter,
		required: false,
	},
});

export default mongoose.model('Posts', Post);
