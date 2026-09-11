import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { usuarioRoutes } from "./usuario.routes";
import { adminRoutes } from "./adminRoutes";

const routes = Router();

routes.use("/auth", authRoutes);

routes.use("/usuarios", usuarioRoutes);

routes.use("/admin", adminRoutes);

export { routes };

