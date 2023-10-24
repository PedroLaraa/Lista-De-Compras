import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  id: string;
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}
