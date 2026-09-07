import { Router } from "express";
//import { CategoryController } from "../controllers/CategoryController";
import { asyncHandler } from "../middlewares/asyncHandler";
//import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { validateDto } from "../middlewares/validateDTO";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioController } from "../controllers/UsuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const usuarioRoutes = Router();

const usuarioRepository = new UsuarioRepository();

const usuarioController = new UsuarioController(usuarioRepository);

usuarioRoutes.post(
    "/register/gerente", 
    authMiddleware,
    roleMiddleware(UsuarioRole.GERENTE),
    (req, res) => usuarioController.registrarGerente(req, res)
);
    
export { usuarioRoutes };


/* Depois vou ter que mudar para isso:
const usuarioRepository = new UsuarioRepository();

const usuarioService = new UsuarioService(usuarioRepository);

const usuarioController = new UsuarioController(usuarioService);
*/