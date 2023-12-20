import ObjectUtils from "./ObjectUtils";

export default class StringUtils {
  /**
   * 判断字符是否为空
   * @returns  不为空 false 有空格也是 false
   * @example StringUtils.isEmpty(null)      = true
   * @example StringUtils.isEmpty(undefined) = true
   * @example StringUtils.isEmpty("")        = true
   * @example StringUtils.isEmpty(" ")       = false
   * @example StringUtils.isEmpty("bob")     = false
   * @example StringUtils.isEmpty("  bob  ") = false
   */
  public static isEmpty(str: any): boolean {
    return ObjectUtils.isNullOrUndefined(str) || str.length === 0;
  }

  /**
   * 判断字符是否 不 为空
   * @returns  不为空 true 有空格也是 true
   * @example StringUtils.isNotEmpty(null)      = false
   * @example StringUtils.isNotEmpty(undefined) = false
   * @example StringUtils.isNotEmpty("")        = false
   * @example StringUtils.isNotEmpty(" ")       = true
   * @example StringUtils.isNotEmpty("bob")     = true
   * @example StringUtils.isNotEmpty("  bob  ") = true
   */
  public static isNotEmpty(str: any): boolean {
    return !this.isEmpty(str);
  }

  /**
   * 带空格的判断字符是否为空
   * @returns  不为空 false 有空格也是 true ,没字符 true
   * @example StringUtils.isBlank(null)      = true
   * @example StringUtils.isBlank(undefined) = true
   * @example StringUtils.isBlank("")        = true
   * @example StringUtils.isBlank(" ")       = true
   * @example StringUtils.isBlank("bob")     = false
   * @example StringUtils.isBlank("  bob  ") = false
   */
  public static isBlank(str: any): boolean {
    return ObjectUtils.isNullOrUndefined(str) || str.trim() === "";
  }

  /**
   * 带空格的判断字符是否 不 为空
   * @returns  不为空 true 有空格是 false ,没字符 false
   * @example StringUtils.isNotBlank(null)      = false
   * @example StringUtils.isNotBlank(undefined) = false
   * @example StringUtils.isNotBlank("")        = false
   * @example StringUtils.isNotBlank(" ")       = false
   * @example StringUtils.isNotBlank("bob")     = true
   * @example StringUtils.isNotBlank("  bob  ") = true
   */
  public static isNotBlank(str: any): boolean {
    return !this.isBlank(str);
  }
}
