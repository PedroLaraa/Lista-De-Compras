import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  id: string;

  constructor(user: UserEntity) {
    this.id = user.id;
  }
}
