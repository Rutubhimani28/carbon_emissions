
import airFreight from "../models/airFreight.js";

const index = async (req, res) => {
    const query = req.query;

    let allData = await airFreight.find(query);

    let result = allData.filter(item => item.createdBy !== null);
    result = result.sort((a, b) => b.createdOn - a.createdOn);

    res.send({ success: true, result });
}

const add = async (req, res) => {
    try {
        const result = new airFreight(req.body);
        await result.save();
        res.status(200).json({ success: true, result, message: 'Data saved successfully' });
    } catch (err) {
        console.error('Failed to create Data:', err);
        res.status(500).json({ success: false, error: 'Failed to create Data' });
    }
}
const addMany = async (req, res) => {
    try {
        const data = req.body;
        const result = await airFreight.insertMany(data);
        res.status(200).json({ success: true, result: result, message: 'Data imported successfully' });
    } catch (err) {
        console.error('Failed to create Data :', err);
        res.status(400).json({ success: false, message: 'Failed to create Data', error: err.toString() });
    }
};
const edit = async (req, res) => {
    try {

        let result = await airFreight.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, result, message: 'Data updated successfully' });
    } catch (err) {
        console.error('Failed to Update Data:', err);
        res.status(400).json({ success: false, error: 'Failed to Update Data' });
    }
}
const deleteData = async (req, res) => {
    try {
        let result = await airFreight.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Data deleted successfully", result })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}
const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).send({ success: false, message: 'Invalid input data' });
        }

        const result = await airFreight.deleteMany({ _id: { $in: ids } });
        res.status(200).send({ success: true, message: 'Data deleted successfully', result });
    } catch (error) {
        console.error('Error deleting Data', error);
        res.status(500).send({ success: false, message: 'Server error', error });
    }
};
export default { index, add, addMany, edit, deleteData, deleteMany }