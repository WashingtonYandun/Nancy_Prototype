import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
    // get all the existing users
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    // get user by id
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    // update user by id
    try {
        const { username, email, password, role } = req.body;

        const noteUpdated = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                username,
                email,
                password,
                role,
            },
            { new: true }
        );
        return res.json(noteUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    // delete user by id
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id);
        return res.json(userDeleted);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
