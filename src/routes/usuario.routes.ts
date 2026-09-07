import { Router } from "express";
//import { CategoryController } from "../controllers/CategoryController";
import { asyncHandler } from "../middlewares/asyncHandler";
//import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { validateDto } from "../middlewares/validateDTO";

const userRoutes = Router();

//const categoryController = new CategoryController();

/*categoryRoutes.post(
    "/categories",
    validateDto(CreateCategoryDto),
    asyncHandler(
        (req, res) => categoryController.create(req, res)
    )
)

categoryRoutes.get(
    "/categories/:id",
    asyncHandler(
        (req, res) => categoryController.findOne(req, res)
    )
)
*/
export default userRoutes;