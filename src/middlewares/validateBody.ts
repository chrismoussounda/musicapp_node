import { RequestHandler } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export function validateBody<T extends object>(
  type: ClassConstructor<T>
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);

    validate(dtoObj, { skipMissingProperties: false, whitelist: true }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = getErrorMessages(errors);
          res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: dtoErrors,
          });
        } else {
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}

export function getErrorMessages(errors: ValidationError[]): string[] {
  let messages: string[] = [];
  let queue: { error: ValidationError; path: string }[] = errors.map(
    (error) => ({
      error,
      path: error.property,
    })
  );

  while (queue.length > 0) {
    const { error, path } = queue.shift()!;

    if (error.constraints) {
      const errorMessages = Object.values(error.constraints).map(
        (message) => `${path} ${message}`
      );
      messages = [...messages, ...errorMessages];
    }

    if (error.children && error.children.length > 0) {
      const childrenErrors = error.children.map((childError) => ({
        error: childError,
        path: `${path}.${childError.property}`,
      }));
      queue = [...childrenErrors, ...queue];
    }
  }

  return messages;
}
