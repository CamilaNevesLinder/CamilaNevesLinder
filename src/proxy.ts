import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/navigation';

const proxy = createMiddleware(routing);

export default proxy;
export { proxy };

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};
