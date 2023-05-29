import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "./users/models/user.schema";

const getUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getUserByContext(context)
);
