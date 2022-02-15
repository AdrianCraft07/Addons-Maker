//global interfaces
declare global {
  interface String {
    replaceFull(replaces: String[], sign?: String): String;
    startAndEnd(start: string, end?: string): Boolean;
    dataExists(data: string): Boolean;
    createFile(path: string): String;
    writeFile(path: string): String;
    toBoolean(): Boolean;
    toObject(): Object;
    notColor: String;
    error: String;
    info: String;
    warn: String;
    log: String;
  }
  interface Object {
    compare(Obj: Object): Boolean;
    toJson(): String;
    keys: {
      (): String[];
      inverse(): Object;
    };
    log: Object;
  }
  interface Array<T> {
    deleteIndex(index: Number | Number[]): T[];
    getData(spaces: Number | Number[]): T[];
    dataExists(data: any): Boolean;
    compare(Arr: T[]): Boolean;
    max(maximum: Number): T[];
    order: {
      (): T[];
      number(): Number[];
      string(): string[];
    };
    log: T[];
    text: String;
  }
  interface Boolean {
    txt: String;
    log: Boolean;
  }
  interface Function {
    watch(): String;
  }
  interface Number {
    raised(raised: Number): Number;
    root(root: Number): Number;
    round(): Number;
    txt: String;
    log: Number;
  }
}
export function copyObject(object: Object): Object;
export function copyArray(array: T[]): T[];
export function generateUUID(): String;
export function type(data: any): String;
export function isArray(data: any): Boolean;
export function isString(data: any): Boolean;
export function isObject(data: any): Boolean;
export function isNumber(data: any): Boolean;
export function isBoolean(data: any): Boolean;
export function isIterable(data: any): Boolean;
export function exists(path: String): Boolean;
export function readFile(path: String): String;
export function newFolder(route: String): String;
export function requireJson(path: String): Object;
export function copyFile(copy: String, paste: String): void;
export function input(data: String, config?: String): String;
export function dir(route: String, callback: (file: String) => void): void;
export function array(array: any[], callback: (file: String) => void): void;
export function newExtension(
  config: { path: String; extension: String },
  callback: (data: { name: String; file: Object }) => void
): void;

export function error(caused: String | { name: String; url: String }, number: Number): String;
export function warn(caused: String | { name: String; url: String }, number: Number): String;

export const addProperty = {
  array(name: String, callback: Function): void;,
  object(name: String, callback: Function): void;,
  string(name: String, callback: Function): void;,
  number(name: String, callback: Function): void;,
  boolean(name: String, callback: Function): void;,
  function(name: String, callback: Function): void;,
};

export const addFunction = addProperty;
