export default class ObjectUtils {
  /**
   * 判断是否为 null
   * @example ObjectUtils.isNull(null)        = true
   * @example ObjectUtils.isNull(undefined)  = false
   * @example ObjectUtils.isNull({})          = false
   * @example ObjectUtils.isNull(1)           = false
   */
  public static isNull(value: any): boolean {
    return value === null;
  }

  /**
   * 判断是否为 undefined
   * @example ObjectUtils.isUndefined(undefined)  = true
   * @example ObjectUtils.isUndefined(null)        = false
   * @example ObjectUtils.isUndefined({})          = false
   * @example ObjectUtils.isUndefined(1)           = false
   */
  public static isUndefined(value: any): boolean {
    return typeof value === "undefined";
  }

  /**
   * 判断是否为 null or undefined.
   * @example ObjectUtils.isNullOrUndefined(undefined)  = true
   * @example ObjectUtils.isNullOrUndefined(null)        = true
   * @example ObjectUtils.isNullOrUndefined({})          = false
   * @example ObjectUtils.isNullOrUndefined(1)           = false
   */
  public static isNullOrUndefined(value: any): boolean {
    return this.isNull(value) || this.isUndefined(value);
  }

  /**
   * 判断是否为 时间对象 date
   * @example ObjectUtils.isDate(new Date())   = true
   * @example ObjectUtils.isDate(null)         = false
   * @example ObjectUtils.isDate(undefined)   = false
   * @example ObjectUtils.isDate(1)            = false
   */
  public static isDate(value: any): boolean {
    return value instanceof Date;
  }

  /**
   * 判断是否为 string
   * @example ObjectUtils.isString("test")       = true
   * @example ObjectUtils.isString(null)         = false
   * @example ObjectUtils.isString(undefined)   = false
   * @example ObjectUtils.isString(1)            = false
   */
  public static isString(value: any): boolean {
    return typeof value === "string";
  }

  /**
   *判断是否为 number
   * @example ObjectUtils.isNumber(1)            = true
   * @example ObjectUtils.isNumber(null)         = false
   * @example ObjectUtils.isNumber(undefined)   = false
   * @example ObjectUtils.isNumber("test")       = false
   */
  public static isNumber(value: any): boolean {
    return typeof value === "number";
  }

  /**
   *判断是否为 boolean
   * @example ObjectUtils.isBoolean(false)        = true
   * @example ObjectUtils.isBoolean(null)         = false
   * @example ObjectUtils.isBoolean(undefined)   = false
   * @example ObjectUtils.isBoolean("test")       = false
   */
  public static isBoolean(value: any): boolean {
    return typeof value === "boolean";
  }

  /**
   * 如果参数一 为 null or undefined 返回 参数2
   * @example ObjectUtils.getOrDefault<number | undefined>(1, 0)            = "1"
   * @example ObjectUtils.getOrDefault<number | undefined>(undefined, 0)    = "0"
   * @example ObjectUtils.getOrDefault<number | null>(1, 0)                 = "1"
   * @example ObjectUtils.getOrDefault<number | null>(null, 0)              = "0"
   */
  public static getOrDefault<T>(value: T, defaultValue: NonNullable<T>): NonNullable<T> {
    if (ObjectUtils.isNullOrUndefined(value)) {
      return defaultValue;
    } else {
      return value as NonNullable<T>;
    }
  }

  /**
   * 判断当前参数是否有值，不等于 null or undefined
   * @returns  不为空 true
   * @returns true if current object is not null or undefined, else return false.
   * @example ObjectUtils.hasValue(1)           = true
   * @example ObjectUtils.hasValue("str")       = true
   * @example ObjectUtils.hasValue(undefined)   = false
   * @example ObjectUtils.hasValue(null)        = false
   */
  public static hasValue<T>(object: T): object is NonNullable<T> {
    return !this.isNullOrUndefined(object);
  }
}
