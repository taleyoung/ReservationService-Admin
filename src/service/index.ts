import {request} from 'ice'

const baseService =
    (url: string) => {
      return {
        async getList(params) {
          return request(
              {url, method: 'GET', params: {page: 1, limit: 10, ...params}})
        }
        , async getById(id: number) {
          return request({
            url: `${url}/${id}`,
            method: 'GET',
          })
        }
        , async add(data) {
          return request({url, method: 'POST', data})
        }
        , async update(id: number, data: any) {
          return request({url: `${url}/${id}`, method: 'PUT', data})
        }
        , async delete (id: number) {
          return request({url: `${url}/${id}`, method: 'DELETE'})
        }
      }
    }

export {
  baseService
}