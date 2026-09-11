import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const adminRoutes = Router();

adminRoutes.get(
    "/ping",
    authMiddleware,
    roleMiddleware(UsuarioRole.ADMIN),
    (req, res) => {
        return res.status(200).json({
            mensagem: "Acesso autorizado. Você é ADMIN."
        });
    }
);

export { adminRoutes };