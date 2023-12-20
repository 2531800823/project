import { AxiosRequestConfig } from "axios";

/**
 * 取消请求
 */
export interface AbortContext {
  abort?: () => void;
}

/**
 * axios 请求配置，加上取消请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  requestId?: symbol;
  abortContext?: AbortContext;
}

/**
 * axios 通用响应体
 */
export interface ApiResponse<T = unknown> {
  code: number | string;
  message: string;
  data: T;
}
