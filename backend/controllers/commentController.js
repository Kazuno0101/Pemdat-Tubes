import Post from '../models/postModel.js';

export const getComment = async (req, res) => {
	try {
		const comment = await Post.find(req.params.comment);
		res.json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getCommentById = async (req, res) => {
	try {
		const comment = await Post.findById(req.params.id);
		res.json(comment.comment);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getCommentByIdPost = async (req, res) => {
	try {
		const comment = await Post.findOne({ 'comment._id': req.params.id });
		res.json(comment.comment[0]);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createComment = async (req, res) => {
	try {
		const cComment = await Post.updateOne({ _id: req.params.id }, { $push: req.body });
		res.status(200).json(cComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const updateComment = async (req, res) => {
	try {
		const cComment = await Post.updateOne({ _id: req.params.id, 'comment._id': req.params.idComment }, { $set: req.body });
		res.status(200).json(cComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteComment = async (req, res) => {
	try {
		const dComment = await Post.updateOne({ _id: req.params.id }, { $pull: req.body });
		res.status(200).json(dComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
