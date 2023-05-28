import { AbstractRepository } from "@app/common";
import { UserDocument } from "./models/user.schema";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
    protected readonly logger: Logger = new Logger(UsersRepository.name);

    constructor(@InjectModel(UserDocument.name) userDocument: Model<UserDocument>) {
        super(userDocument);
    }
}
