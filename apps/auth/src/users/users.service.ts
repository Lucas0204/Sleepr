import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcryptjs from 'bcryptjs';
import { UserDocument } from './models/user.schema';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);

        return this.usersRepository.create({
            ...createUserDto,
            password: await bcryptjs.hash(createUserDto.password, 10)
        });
    }

    private async validateCreateUserDto({ email }: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email });
        } catch (err) {
            return;
        }

        // user email already exists
        throw new UnprocessableEntityException('Invalid data to create user!');
    }

    async verifyUser(email: string, password: string): Promise<UserDocument> {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcryptjs.compare(password, user.password);

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        return user;
    }

    getUser(getUserDto: GetUserDto): Promise<UserDocument> {
        return this.usersRepository.findOne(getUserDto);
    }
}
