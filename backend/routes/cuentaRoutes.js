import express from "express";
import { cuentaController } from "../controllers/cuentaController.js";

const router = express.Router();
router.get("/usuario/:id", cuentaController.getCuentasDelUsuario);

router.get("/", cuentaController.listar);
router.get("/:id", cuentaController.getId);
router.post("/", cuentaController.crear);
router.put("/:id", cuentaController.put)
router.delete("/:id", cuentaController.delete);

export default router;