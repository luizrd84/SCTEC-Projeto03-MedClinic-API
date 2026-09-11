import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { AuthService } from "../services/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { validateDto } from "../middlewares/validateDTO";
import { LoginDto } from "../entities/DTOs/LoginDto";
import { RefreshTokenDto } from "../entities/DTOs/RefreshTokenDto";

const authRoutes = Router();

const usuarioRepository = new UsuarioRepository();
const refreshTokenRepository = new RefreshTokenRepository();

const authService = new AuthService(usuarioRepository, refreshTokenRepository);
const authController = new AuthController(authService);

//POST /auth/login
authRoutes.post(
    "/login",
    validateDto(LoginDto),
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
    validateDto(RefreshTokenDto),
    (req, res) => authController.refresh(req, res)    
);

//POST /auth/logout
authRoutes.post(
    "/logout",
    validateDto(RefreshTokenDto),
    (req, res) => authController.logout(req, res)
);

export { authRoutes };

