import express from "express";
import { prestamoController } from "../controllers/prestamoController.js";

const router = express.Router();

router.post("/pagar/prestamo/:id", prestamoController.pagarPrestamo)
router.get("/usuario/:id", prestamoController.getPrestamosUsuario)
router.get("/", prestamoController.listar);
router.get("/:id", prestamoController.getId);
router.post("/", prestamoController.crear);
router.put("/:id", prestamoController.put);
router.delete("/:id", prestamoController.delete);

export default router;