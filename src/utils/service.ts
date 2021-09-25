import axios from 'axios'
import ElMessage from '@/utils/ElMessage'
import { ElNotification } from 'element-plus'

// 创建axios的一个实例
const instance = axios.create({
	baseURL: '/api',
	timeout: 20000
})

// ------------------- 一、请求拦截器
instance.interceptors.request.use(
	(config: any) => {
		return config
	},
	(error: any) => {
		// 对请求错误做些什么

		return Promise.reject(error)
	}
)

// ----------------- 二、响应拦截器
instance.interceptors.response.use(
	(response: any) => {
		let code: number = response.data.code
		switch (code) {
			case 200:
				break
			case 403:
				ElMessage.warning('你没有权限执行该操作!')
				break
			case 401:
				ElNotification({
					title: '警告',
					message: '你还未登录，将在2s后跳转至登录页面',
					type: 'warning'
				})
				setTimeout(() => {
					window.location.href = '/login'
				}, 2000)
		}
		return response.data
	},
	(error: any) => {
		// 对响应错误做点什么
		ElMessage.error('发生错误！')
		console.error(`api error: ${error}`)
		return Promise.reject(error)
	}
)

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method 请求的方法：get、post、delete、put
 * @param {String} url   请求的url:
 * @param {Object} data  请求的参数
 * @returns {Promise}   返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method: string, url: string, data: any = null): Promise<any> {
	method = method.toLowerCase()
	if (method === 'post') {
		return instance.post(url, data)
	} else if (method === 'get') {
		return instance.get(url, { params: data })
	} else if (method === 'delete') {
		return instance.delete(url, { params: data })
	} else {
		return instance.put(url, data)
	}
}
