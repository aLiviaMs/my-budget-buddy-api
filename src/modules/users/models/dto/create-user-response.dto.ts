import { CreateUserDto } from './create-user.dto';

export type CreateUserDtoResponse = CreateUserDto & { id: string };
