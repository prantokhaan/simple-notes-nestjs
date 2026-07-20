import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { LoggerService } from 'src/global/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('ID_GENERATOR') private readonly idGen: () => string,
    @Inject('USER_DATABASE') private users: Users[],
    private readonly logger: LoggerService,
  ) {}

  private isUserExistsWithEmail(email: string): boolean {
    return this.users.some(
      (element) => element.email.toLowerCase() === email.toLowerCase(),
    );
  }

  createUser(name: string, email: string): Users {
    if (this.isUserExistsWithEmail(email)) {
      throw new ConflictException({
        message: 'User with email already exists',
      });
    }

    const newUser: Users = {
      id: this.idGen(),
      name,
      email,
    };

    this.users.push(newUser);

    this.logger.log('User created successfully');

    return newUser;
  }

  getAllUsers(): Users[] {
    return this.users;
  }

  getUserId(id: string): Users {
    const user = this.users.find((e) => e.id === id);
    if (!user) {
      throw new ConflictException({
        message: `User with ID: ${id} not found`,
      });
    }

    return user;
  }

  getUserEmail(email: string): Users {
    const user = this.users.find(
      (e) => e.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      throw new ConflictException({
        message: `User with email: ${email} not found`,
      });
    }

    return user;
  }
}
