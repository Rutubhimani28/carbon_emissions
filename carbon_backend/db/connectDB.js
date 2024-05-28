import mongoose from "mongoose";
import CustomField from "../models/customField.js";

// const initializedSchemas = async () => {
// 	const CustomFields = await CustomField.find({ deleted: false });
// 	const createDynamicSchemas = async (CustomFields) => {
// 		for (const module of CustomFields) {
// 			const { moduleName, fields } = module;

// 			// Check if schema already exists
// 			if (!mongoose.models[moduleName]) {
// 				// Create schema object
// 				const schemaFields = {};
// 				for (const field of fields) {
// 					schemaFields[field.name] = { type: field.backendType };
// 				}
// 				// Create Mongoose schema
// 				const moduleSchema = new mongoose.Schema(schemaFields);
// 				// Create Mongoose model

// 				mongoose.model(moduleName, moduleSchema, moduleName);
// 				console.log(`Schema created for module: ${moduleName}`);
// 			}
// 		}
// 	};

// 	createDynamicSchemas(CustomFields);
// };


const connectDB = async (DATABASE_URL, DATABASE) => {
	try {
		const DB_OPTIONS = {
			dbName: DATABASE
		}
		mongoose.set("strictQuery", false);
		await mongoose.connect(DATABASE_URL, DB_OPTIONS);

		// await initializedSchemas();

		console.log("Database Connected Successfully..");

	} catch (err) {
		console.log("Database Not connected", err.message);
	}
};

export default connectDB;