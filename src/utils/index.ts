type TargetContext = "_self" | "_parent" | "_blank" | "_top";

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any },
) => {
  const { target = "_blank", ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(","),
  );
};

export const regexUrl = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  "i",
);

export default null;
/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            // eslint-disable-next-line prefer-const, no-shadow
            let params = `${propName}[${key}]`;
            // eslint-disable-next-line vars-on-top, no-var
            var subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

export function cloneDeep<T>(entity: any, cache = new WeakMap()): T {
  const referenceTypes = ["Array", "Object", "Map", "Set", "Date"];
  const entityType = Object.prototype.toString.call(entity);
  if (
    !new RegExp(referenceTypes.join("|")).test(entityType) ||
    entity instanceof WeakMap ||
    entity instanceof WeakSet
  )
    return entity;
  if (cache.has(entity)) {
    return cache.get(entity);
  }
  const c = new entity.constructor();

  if (entity instanceof Map) {
    entity.forEach((value, key) => c.set(cloneDeep(key), cloneDeep(value)));
  }
  if (entity instanceof Set) {
    entity.forEach((value) => c.add(cloneDeep(value)));
  }
  if (entity instanceof Date) {
    return new Date(entity) as T;
  }
  cache.set(entity, c);
  return Object.assign(
    c,
    ...Object.keys(entity).map((prop) => {
      // debugger;
      return {
        [prop]: cloneDeep(entity[prop], cache),
      };
    }),
  );
}

export { default as isImg } from "./isImg";
export { default as isUrl } from "./isUrl";
export { default as isNil } from "./isNil";
