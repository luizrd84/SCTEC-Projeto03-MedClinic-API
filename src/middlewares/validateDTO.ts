import { plainToInstance, ClassConstructor  } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function validateDto(dtoClass: ClassConstructor<object>) {

    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(dtoClass, req.body);

        const errors = await validate(dto);

        if(errors.length > 0) {
            const validationErros = 
                errors.map(error => ({
                    fields: error.property,
                    messages: Object.values(
                        error.constraints ?? {}
                    )
                }));
            
            throw new AppError(JSON.stringify(validationErros),400);
        }

        req.body = dto;

        next();
    }

}