/* tslint:disable */
/* eslint-disable */
/**
*/
export class Array16u8 {
  free(): void;
/**
* @param {number} index
* @returns {number}
*/
  get(index: number): number;
/**
* @param {number} index
* @param {number} val
*/
  set(index: number, val: number): void;
/**
* @returns {string}
*/
  to_string(): string;
/**
* @param {number} i
* @returns {Uint8Array}
*/
  get_row(i: number): Uint8Array;
}
/**
*/
export class Generator {
  free(): void;
/**
* @param {number} unique
* @param {number} duplicate
*/
  constructor(unique: number, duplicate: number);
/**
* @returns {Array16u8 | undefined}
*/
  next(): Array16u8 | undefined;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_generator_free: (a: number) => void;
  readonly __wbg_array16u8_free: (a: number) => void;
  readonly array16u8_get: (a: number, b: number) => number;
  readonly array16u8_set: (a: number, b: number, c: number) => void;
  readonly array16u8_to_string: (a: number, b: number) => void;
  readonly array16u8_get_row: (a: number, b: number, c: number) => void;
  readonly generator_new: (a: number, b: number) => number;
  readonly generator_next: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
