import express from "express";
import email from "../controller/emailController.js";
import auth from "../middelwares/auth.js";

const router = express.Router();

router.post('/add', auth, email.addEmail);
router.post('/addEmailPlan', email.addEmailPlan);
router.post('/addGraph', auth, email.addEmailForGraphs);
router.post('/add-email-for-two-events', auth, email.addEmailForTwoEvents);

export default router;
