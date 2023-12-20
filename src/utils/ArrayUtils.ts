import ObjectUtils from "./ObjectUtils";

export default class ArrayUtils {
  /**
   * 判断数组是否没空
   * @returns  为空 true
   * @example ArrayUtils.isEmpty([]) = true;
   * @example ArrayUtils.isEmpty(null) = true;
   * @example ArrayUtils.isEmpty(undefined) = true;
   * @example ArrayUtils.isEmpty([1]) = false;
   * @example ArrayUtils.isEmpty("string") throw error;
   * @example ArrayUtils.isEmpty(123) throw error;
   */
  public static isEmpty<T>(array: T[] | undefined | null): boolean {
    if (ObjectUtils.isNullOrUndefined(array)) {
      return true;
    }
    if (!Array.isArray(array)) {
      throw new Error("input parameter is not a array or null/undefined");
    }

    return array.length === 0;
  }

  /**
   * 判断数组是否 不 为空
   * @returns  不为空 true
   * @example ArrayUtils.isNotEmpty([]) = false;
   * @example ArrayUtils.isNotEmpty(null) = false;
   * @example ArrayUtils.isNotEmpty(undefined) = false;
   * @example ArrayUtils.isNotEmpty([1]) = true;
   * @example ArrayUtils.isNotEmpty("string") throw error;
   * @example ArrayUtils.isNotEmpty(123) throw error;
   */
  public static isNotEmpty<T>(array: T[] | undefined | null): boolean {
    return !this.isEmpty(array);
  }
}
