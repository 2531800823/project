import type { AxiosResponse, Canceler } from "axios";
import axios from "axios";
import qs from "qs";
import type { ApiResponse, RequestConfig } from "@/interface/request";
import { ObjectUtils } from "@/utils";
// 取消请求
const requestMap = new Map<symbol, Canceler>();
// 删除生成 url 定时器
const revokeURLTimeoutTime = 30 * 1000;

const instantAxios = axios.create({
  baseURL: "",
  timeout: 10 * 1000,
});

// 请求拦截器
instantAxios.interceptors.request.use(
  (config) => {
    // const token = getLocalStorageItem(LOCALE_TOKEN_NAME);
    // if (!ObjectUtils.hasValue(token)) window.location.pathname = "/login";

    // config.headers[LOCALE_TOKEN_NAME] = `Bearer ${token}`;
    // 在请求发送之前做一些处理
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instantAxios.interceptors.response.use(
  (response) => {
    // 在响应之前做一些处理
    return response;
  },
  (error) => {
    // 取消请求
    if (axios.isCancel(error)) return { code: 0, data: [], message: "取消请求" };

    // 处理响应错误
    return Promise.reject(error);
  }
);

/**
 * 取消请求方法
 * @param symbol symbol
 */
export function cancelRequest(requestId: symbol) {
  const canceler = requestMap.get(requestId);
  if (ObjectUtils.hasValue(canceler)) canceler();
}

// 请求基础方法
export async function request<T = unknown, R = AxiosResponse<T>>(config: RequestConfig): Promise<R> {
  const { requestId, abortContext, ...restConfig } = config;

  if (typeof requestId !== "undefined" || typeof abortContext !== "undefined") {
    if (typeof requestId !== "undefined" && requestMap.has(requestId)) {
      const c = requestMap.get(requestId);
      if (ObjectUtils.hasValue(c)) c?.("cancel");

      requestMap.delete(requestId);
    }

    restConfig.cancelToken = new axios.CancelToken((cancel) => {
      if (typeof requestId !== "undefined") requestMap.set(requestId, cancel);

      if (typeof abortContext !== "undefined") {
        abortContext.abort = () => {
          if (typeof requestId !== "undefined" && requestMap.has(requestId)) requestMap.delete(requestId);

          cancel("cancel");
        };
      }
    });
  }

  try {
    const r = await instantAxios.request<T, R>(restConfig);
    return Promise.resolve(r);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 处理请求参数 对 params 做全局操作
 */
export async function getParamsConfig(config: RequestConfig): Promise<RequestConfig> {
  if (typeof config.params !== "undefined") {
    if (config.params instanceof URLSearchParams) {
      // 可以添加统一操作
    } else if (typeof config.params === "object") {
      config.paramsSerializer = ObjectUtils.getOrDefault(config.paramsSerializer, (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      });
    }
  } else {
    config.params = {};
  }
  return config;
}

/**
 * json 处理一层，params , 和返回的 data
 */
export async function json<T = unknown>(config: RequestConfig): Promise<T> {
  try {
    const newConfig = await getParamsConfig(config);
    const response = await request<T>(newConfig);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * api 可以直接使用的请求
 */
export async function api<T = unknown>(config: RequestConfig): Promise<T> {
  try {
    const res = await json<ApiResponse<T>>(config);
    // 返回数据需要规定 { code,data,message}
    // if (res.code === "0" || res.code === 0) {
    //   return Promise.resolve(res.data);
    // }
    //   需要规定 直接返回还是 .data
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function randomApi<T = unknown>(config: RequestConfig): Promise<T> {
  try {
    const res = await json<T>(config);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 文件下载 or 预览 第三个参数 true 就是预览
 * @param url 路径
 * @param fileName 文件名
 * @param isPreview 是否预览
 */
export function downloadFile(url: string, fileName: string, isPreview = false) {
  const link = document.createElement("a");
  if (isPreview) link.target = "_blank";
  else link.download = fileName;

  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

type FileOptions = {
  /**
   * 指定文件名称
   */
  downloadFileName?: string;
};

function getDownloadFileName(contentDisposition?: string): string {
  let fileName = "";
  if (ObjectUtils.hasValue(contentDisposition)) {
    fileName = contentDisposition.substr(contentDisposition.indexOf("filename=") + 9);
    fileName = decodeURIComponent(fileName).replace(/"/g, "");
  }
  return fileName;
}

/**
 * 下载后端返回文件
 * @param config
 * @param options
 */
export async function file(config: RequestConfig, options: FileOptions = {}) {
  const { downloadFileName } = options;
  const signedConfig = await getParamsConfig(config);
  const response = await request<string>(signedConfig);
  const url = self.URL.createObjectURL(new Blob([response.data]));
  const fileName = ObjectUtils.hasValue(downloadFileName)
    ? downloadFileName
    : getDownloadFileName(response.headers["content-disposition"]);
  downloadFile(url, fileName);
  // 30秒以后，删除 创建的 url
  self.setTimeout(() => {
    self.URL.revokeObjectURL(url);
  }, revokeURLTimeoutTime);
}
