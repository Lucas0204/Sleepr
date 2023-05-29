import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcryptjs from 'bcryptjs';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcryptjs.hash(createUserDto.password, 10)
        });
    }

    async verifyUser(email: string, password: string): Promise<UserDocument> {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcryptjs.compare(password, user.password);

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        return user;
    }
}
