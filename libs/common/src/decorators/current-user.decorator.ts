import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDto } from "../dtos";

const getUserByContext = (context: ExecutionContext): UserDto => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getUserByContext(context)
);
