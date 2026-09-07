import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { AuthService } from "../services/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";
import { RefreshToken } from "../entities/RefreshToken";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

const authRoutes = Router();

const usuarioRepository = new UsuarioRepository();
const refreshTokenRepository = new RefreshTokenRepository();

const authService = new AuthService(usuarioRepository, refreshTokenRepository);
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

authRoutes.post(
    "/refresh", 
    (req, res) => authController.refresh(req, res)    
);

authRoutes.post(
    "/logout",
    (req, res) => authController.logout(req, res)
);

export { authRoutes };

