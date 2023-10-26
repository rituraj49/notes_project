import express from 'express'
import { loginController, registrationController } from '../controller/authController.js';

const router = express.Router();

router.post("/register", registrationController);
router.post("/login", loginController);

export default router;