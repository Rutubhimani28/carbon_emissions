
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import User from "../models/user.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const index = async (req, res) => {
    const query = { ...req.query, role: 'user' };

    let allData = await User.find(query);

    const result = allData.sort((a, b) => b.createdOn - a.createdOn);

    res.send({ result });
};

const add = async (req, res) => {
    try {
        const result = new User(req.body);
        await result.save();
        res.status(200).json({ result, message: 'Data saved successfully' });
    } catch (err) {
        console.error('Failed to create Data:', err);
        res.status(500).json({ error: 'Failed to create Data' });
    }
};

const edit = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = { ...req.body };
        const userPrevData = await User.findById(userId);

        // Check if a new logo is uploaded
        if (req.file) {
            // Upload new logo to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'carbon_emission', // Specify your Cloudinary folder
                allowed_formats: ['jpeg', 'png', 'jpg'],
            });

            // Extract public ID from existing Cloudinary URL if it exists
            if (userPrevData.logo) {
                const parts = userPrevData.logo.split('/');
                const publicId = parts[parts.length - 1].split('.')[0]; // Extract public ID from URL
                const deleteRes = await cloudinary.uploader.destroy(`carbon_emission/${publicId}`); // Delete previous image from Cloudinary
            }

            // Set new logo url
            updatedUserData.logo = result.secure_url;

            // Delete the temporary file uploaded by multer
            fs.unlinkSync(req.file.path);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedUserData },
            { new: true }  // return updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ updatedUser, message: 'User updated successfully' });
    } catch (err) {
        console.error('Failed to update user:', err);
        res.status(400).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        console.error('Failed to delete user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

const deleteMany = async (req, res) => {
    try {
        const userIds = req.body.ids;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const deletedUsers = await User.deleteMany({ _id: { $in: userIds } });

        if (!deletedUsers) {
            return res.status(404).json({ message: "Users not found" });
        }

        res.status(200).json({ message: "Users deleted successfully", deletedUsers });
    } catch (err) {
        console.error('Failed to delete users:', err);
        res.status(500).json({ error: 'Failed to delete users' });
    }
};
export default { index, add, edit, deleteUser, deleteMany };