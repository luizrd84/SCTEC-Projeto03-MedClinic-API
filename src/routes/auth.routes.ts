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

//POST /auth/login
authRoutes.post(
    "/login",
    (req, res) => authController.login(req, res)
);

//GET /auth/me
authRoutes.get(
    "/me",
    authMiddleware,
    (req, res) => authController.me(req, res)
);

//POST /auth/refresh
authRoutes.post(
    "/refresh", 
    (req, res) => authController.refresh(req, res)    
);

//POST /auth/logout
authRoutes.post(
    "/logout",
    (req, res) => authController.logout(req, res)
);

export { authRoutes };

