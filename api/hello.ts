export default (req: Request) => {
  new Response(`Hello, from Deno v${Deno.version.deno}!`);
};