const file = {
	namespaced: true,
	state: {
		folderPath: '',
		fileId: 0
	},
	mutations: {
		setFolderPath(state: any, paths: string[]) {
			let result = ''
			paths.forEach((path) => {
				if (path !== '') result += path + '/'
			})
			state.folderPath = result
		},
		setFileId(state: any, fileId: number) {
			state.fileId = fileId
		}
	}
}

export default file
