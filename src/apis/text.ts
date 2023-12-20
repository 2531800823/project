import { api } from "@/common/axios";
import { RequestConfig } from "@/interface/request";
import { ObjectUtils } from "@/utils";

interface Params {}

interface Data {}

export function testAxios(options?: { params?: Params; data?: Data; config?: RequestConfig }): Promise<any> {
  const { params, data, config } = ObjectUtils.getOrDefault(options, {});
  return api({
    url: `https://jsonplaceholder.typicode.com/comments`,
    method: "get",
    params,
    data,
    ...config,
  });
}
