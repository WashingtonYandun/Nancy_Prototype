import { User } from "../../models/user/user.model.js";

export const getUsers = async (req, res) => {
    // get all the existing users
    try {
        const requester = await User.findById(req.user.id);
        if (requester.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const users = await User.find({ role: "user" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    // get user by id
    try {
        const requester = await User.findById(req.user.id);
        if (requester.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    // update user by id
    try {
        const requester = await User.findById(req.user.id);
        if (requester.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

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
        const requester = await User.findById(req.user.id);
        if (requester.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userDeleted = await User.findByIdAndDelete(req.params.id);
        return res.json(userDeleted);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const makeAdmin = async (req, res) => {
    // make user admin by id
    try {
        const requester = await User.findById(req.user.id);

        if (requester.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.params.id);
        user.role = "admin";

        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
