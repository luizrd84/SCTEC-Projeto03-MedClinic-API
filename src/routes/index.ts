import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { usuarioRoutes } from "./usuario.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/usuarios", usuarioRoutes);

export { routes };

