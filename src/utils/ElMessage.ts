import { ElMessage } from 'element-plus'

const info = (text: string) => ElMessage(text)

const success = (text: string) =>
	ElMessage.success({
		message: text,
		type: 'success'
	})

const warning = (text: string) =>
	ElMessage.warning({
		message: text,
		type: 'warning'
	})

const error = (text: string) =>
	ElMessage.error({
		message: text,
		type: 'error'
	})

export default {
	info,
	success,
	warning,
	error
}
