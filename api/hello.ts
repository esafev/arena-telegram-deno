#!/usr/bin/env deno run --import-map ../import_map.json

export default (req: Request) => {
  new Response(`Hello, from Deno v${Deno.version.deno}!`);
};