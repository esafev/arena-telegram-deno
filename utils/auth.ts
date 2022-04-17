import 'https://deno.land/x/dotenv/load.ts';

const isAuth = (req: Request): boolean => {
  const authToken = req?.headers?.get('x-auth-token');

  return !!authToken && authToken === Deno.env.get('AUTH_TOKEN');
};

export { isAuth };