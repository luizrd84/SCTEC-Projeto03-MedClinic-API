import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { AuthService } from "../services/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const authRoutes = Router();

const usuarioRepository = new UsuarioRepository();
const authService = new AuthService(usuarioRepository);
const authController = new AuthController(authService);

authRoutes.post(
    "/login",
    (req, res) => authController.login(req, res)
);

authRoutes.get(
    "/me",
    authMiddleware,
    (req, res) => authController.me(req, res)
);

export { authRoutes };

