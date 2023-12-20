export default class ThreadUtils {
  /**
   * 等待延迟 xxx ms
   * @param interval 要延迟的 ms
   * @example await ThreadUtils.sleep(500) 等待 500 ms
   */
  public static sleep(interval: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const windowHandle = setTimeout(() => {
        clearInterval(windowHandle);
        resolve();
      }, interval);
    });
  }
}
