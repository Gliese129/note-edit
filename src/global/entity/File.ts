interface IFileInfo {
	id: number | null
	fileName: string
	fileType: string
	folderId: number
	realPath: string | null
}
interface IFileInfoLight {
	id: number
	name: string
}

export { IFileInfo, IFileInfoLight }
