import { runApp, IAppConfig } from 'ice';
import { Message } from '@alifd/next'

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    // 可选的，全局设置 request 是否返回 response 对象，默认为 false
    withFullResponse: false,

    baseURL: 'http://localhost:88/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    // ...RequestConfig 其他参数

    // 拦截器
    interceptors: {
      request: {
        onConfig: (config) => {
          // 发送请求前：可以对 RequestConfig 做一些统一处理
          config.headers = { a: 1 };
          return config;
        },
        onError: (error) => {
          return Promise.reject(error);
        }
      },
      response: {
        onConfig: (response) => {
          // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
          if (response.data.code !== 0) {
            Message.error('操作失败');
            return response.data;
          }
          const method = response.config.method;
          switch (method) {
            case 'put':
              Message.success('修改成功');
              break;
            case 'delete':
              Message.success('删除成功');
              break;
            case 'post':
              Message.success('操作成功');
              break;
            default:
              break;
          }
          return response.data;
        },
        onError: (error: any) => {
          // 请求出错：服务端返回错误状态码
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          Message.error('操作失败');
          return Promise.reject(error);
        }
      },
    }
  }
};

runApp(appConfig);
