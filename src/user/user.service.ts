import { Injectable, ConflictException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.em.findOne(User, {
      userName: dto.userName,
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const user = new User(dto.userName);
    await this.em.persistAndFlush(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.em.find(User, {}, { orderBy: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<User> {
    return this.em.findOneOrFail(User, id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (dto.userName) {
      user.userName = dto.userName;
    }

    await this.em.flush();
    return user;
  }
}
