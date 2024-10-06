import { Router } from "express";

import {upload} from "../middleware/multer.middleware.js"
import { getClients, uploadCard } from "../controllers/card.controller.js";

const router = Router();

router.route("/upload").post(upload.single("card"), uploadCard);    //using the multer middleware for file upload functionality

router.route("/cards").get(getClients);

export default router;