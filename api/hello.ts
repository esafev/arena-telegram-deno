#!/usr/bin/env deno run --import-map ../import_map.json

import { text } from 'text';

export default () => new Response(`Hello, from Deno v${Deno.version.deno}!`);