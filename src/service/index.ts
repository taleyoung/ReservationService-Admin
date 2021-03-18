import {request} from 'ice'

const baseService =
    (url: string) => {
      return {
        async getList(curPage?: number, limit?: number) {
          return request({
            url,
            method: 'GET',
            params: {page: curPage || 1, limit: limit || 10}
          })
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