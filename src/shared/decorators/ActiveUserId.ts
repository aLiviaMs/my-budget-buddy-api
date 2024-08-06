import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>((_data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const id = request.userId;

  if (!id) throw new UnauthorizedException();

  return id;
});
