
import Tool from "../models/tool.js";
import mongoose from 'mongoose';


const index = async (req, res) => {
    // const query = req.query
    // let allData = await Tool.find(query)
    // let result = allData.filter(item => item.createdBy !== null);
    // result = result.sort((a, b) => b.createdOn - a.createdOn);
    // res.send({ result })

    const userId = req.user.userId;
    const userTools = await Tool.find({ createdBy: userId });
    const sortedTools = userTools.sort((a, b) => b.createdOn - a.createdOn);
    res.status(200).json({ data: sortedTools });
};

const add = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const result = new Tool({ data: req.body, createdBy: createdBy });
        await result.save();
        res.status(200).json({ success: true, data: result, message: 'Data saved successfully' });
    } catch (err) {
        console.error('Failed to create Data:', err);
        res.status(500).json({ success: false, error: 'Failed to create Data' });
    }
};

const edit = async (req, res) => {
    try {
        // const toolId = req.params.id; 
        // let existingTool = await Tool.findById(toolId);

        let existingTool = await Tool.findById({ createdBy: mongoose.Types.ObjectId(req.user.userId) });

        if (!existingTool) {
            return res.status(404).json({ error: 'Tool not found' });
        }

        const { createdBy, ...updateData } = req.body;

        existingTool.set(updateData);
        await existingTool.save();

        res.status(200).json({ result: existingTool, message: 'Tool updated successfully' });
    } catch (err) {
        console.error('Failed to update tool:', err);
        res.status(500).json({ error: 'Failed to update tool' });
    }
};

export default { index, add, edit };