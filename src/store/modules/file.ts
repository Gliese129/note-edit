import fileApis from '@/apis/fileApis'
import type { IFileInfo, IFileInfoLight } from '@/global/entity/file'
const file = {
	namespaced: true,
	state: {
		fileId: 0,
		fileName: '',
		fileType: '',
		realPath: ''
	},
	mutations: {
		setFolderPath(state: any, paths: string[]) {
			let result = ''
			paths.forEach((path) => {
				if (path !== '') result += path + '/'
			})
			state.folderPath = result
		},
		setFileId(state: any, id: number) {
			state.fileId = id
		},
		setFileInfoLight(state: any, file: IFileInfoLight) {
			state.fileId = file.id
			state.fileName = file.name
		},
		setFileInfo(state: any, file: IFileInfo) {
			state.fileId = file.id
			state.fileName = file.fileName
			state.fileType = file.fileType
			state.realPath = file.realPath
		}
	},
	actions: {
		async fetchFileInfoLight({ commit }: any, id: number) {
			const data = await fileApis.fetchFileById(id)
			commit('setFileInfo', data.obj)
		}
	}
}

export default file
