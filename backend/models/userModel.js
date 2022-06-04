import mongoose from 'mongoose';

const User = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		required: true,
	},
	create_at: {
		type: String,
		required: true,
	},
	update_at: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Users', User);
