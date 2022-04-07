import { text } from "./text";
export default () => new Response(`Hello, from Deno v${Deno.version.deno}! ${text.test}`);