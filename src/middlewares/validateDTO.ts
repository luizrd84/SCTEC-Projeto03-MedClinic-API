import { plainToInstance, ClassConstructor  } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function validateDto(
    dtoClass: ClassConstructor<object>,
    source: "body" | "params" = "body"
) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const data = source === "body"
            ? req.body
            : req.params;

        const dto = plainToInstance(dtoClass, data);

        const errors = await validate(dto);

        if (errors.length > 0) {
            const validationErrors = errors.map(error => ({
                field: error.property,
                messages: Object.values(
                    error.constraints ?? {}
                )
            }));

            throw new AppError(
                JSON.stringify(validationErrors),
                400
            );
        }

        if (source === "body") {
            req.body = dto;
        } else {
            req.params = dto as any;
        }

        next();
    };
}