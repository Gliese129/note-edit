import { IFileInfo } from '@/global/entity/File'
import { ITreeNode } from '@/global/entity/Tree'

const fileInfoToNode = (filesInfo: IFileInfo[]): ITreeNode[] => {
	let result = [] as ITreeNode[]
	filesInfo.forEach((fileInfo: IFileInfo) => {
		result.push({
			name: fileInfo.fileName,
			type: fileInfo.fileType,
			id: fileInfo.fileType == 'folder' ? fileInfo.folderId : (fileInfo.id as number),
			leaf: fileInfo.fileType == 'folder' ? false : true,
			path: fileInfo.realPath
		})
	})
	return result
}

export { fileInfoToNode }
