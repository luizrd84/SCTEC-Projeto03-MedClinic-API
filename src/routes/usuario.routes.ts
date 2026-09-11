import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
//import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { validateDto } from "../middlewares/validateDTO";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioController } from "../controllers/UsuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";
import { UsuarioService } from "../services/UsuarioService";
import { AlterarSenhaDto } from "../entities/DTOs/AlterarSenhaDto";
import { CriarUsuarioDto } from "../entities/DTOs/CriarUsuarioDto";
import { UsuarioIdParamDto } from "../entities/DTOs/UsuarioIdParamDto";

const usuarioRoutes = Router();

const usuarioRepository = new UsuarioRepository();

const usuarioService = new UsuarioService(usuarioRepository);

const usuarioController = new UsuarioController(usuarioService);

// ======================================================
// CADASTRO
// ======================================================

//POST /usuarios/register/gerente
usuarioRoutes.post(
    "/register/gerente",
    authMiddleware,
    roleMiddleware(UsuarioRole.ADMIN),
    validateDto(CriarUsuarioDto),
    (req, res) =>
        usuarioController.registrarUsuario(
            req,
            res,
            UsuarioRole.GERENTE
        )
);

//POST /usuarios/register/atendente
usuarioRoutes.post(
    "/register/atendente",
    authMiddleware,
    roleMiddleware(UsuarioRole.ADMIN, UsuarioRole.GERENTE),
    validateDto(CriarUsuarioDto),
    (req, res) =>
        usuarioController.registrarUsuario(
            req,
            res,
            UsuarioRole.ATENDENTE
        )
);

//No futuro, atendente poderá registrar pacientes por exemplo. 

// ======================================================
// CONSULTA
// ======================================================

//GET /usuarios/:id
// ADMIN e GERENTE podem consultar um usuário
usuarioRoutes.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        UsuarioRole.ADMIN,
        UsuarioRole.GERENTE
    ),
    validateDto(UsuarioIdParamDto, "params"),
    asyncHandler((req, res) =>
        usuarioController.consultarUsuario(req, res)
    )
);

//GET /usuarios/
// ADMIN e GERENTE podem consultar todos
usuarioRoutes.get(
    "/",
    authMiddleware,
    roleMiddleware(
        UsuarioRole.ADMIN,
        UsuarioRole.GERENTE
    ),
    asyncHandler((req, res) =>
        usuarioController.buscarTodosOsUsuarios(req, res)
    )
);


// ======================================================
// ALTERAR SENHA
// ======================================================

//PATCH /usuarios/senha
// Cada usuário pode alterar somente a própria senha
usuarioRoutes.patch(
    "/senha",
    authMiddleware,
    validateDto(AlterarSenhaDto),
    asyncHandler((req, res) =>
        usuarioController.alterarSenha(req, res)
    )
);


// ======================================================
// EXCLUSÃO
// ======================================================

//DELETE /usuarios/:id
// ADMIN pode excluir GERENTE e ATENDENTE
// GERENTE pode excluir ATENDENTE
usuarioRoutes.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(
        UsuarioRole.ADMIN,
        UsuarioRole.GERENTE
    ),
    validateDto(UsuarioIdParamDto, "params"),
    asyncHandler((req, res) =>
        usuarioController.deletarUsuario(req, res)
    )
);

    
export { usuarioRoutes };
