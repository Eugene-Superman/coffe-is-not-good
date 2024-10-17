import { registerAs } from '@nestjs/config';

export default registerAs('cofees', () => ({ foo: 'bar' }));
