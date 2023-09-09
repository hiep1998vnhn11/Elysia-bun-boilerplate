import Elysia from "elysia";
import { errorMiddleware } from "../middleware/error.middleware";
import { UnauthorizedError } from "./unauthorized.error";

export function defineException(app: Elysia) {
  app
    .addError({
      UNAUTHORIZED: UnauthorizedError,
    })
    .onError(errorMiddleware);
}
