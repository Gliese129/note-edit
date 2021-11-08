interface FileInfoLight {
	id: number
	name: string
}
const file = {
	namespaced: true,
	state: {
		folderPath: '',
		fileId: 0,
		fileName: ''
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
		setFileInfoLight(state: any, file: FileInfoLight) {
			state.fileId = file.id
			state.fileName = file.name
		}
	}
}

export default file
