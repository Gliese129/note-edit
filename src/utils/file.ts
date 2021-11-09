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

import fileApis from '@/apis/fileApis'
import ElMessage from './ElMessage'
const deleteFile = async (fileId: number) => {
	console.log(fileId)
	let response = await fileApis.deleteFileById(fileId)
	if (response.code == 200) {
		ElMessage.success('删除成功')
	} else {
		ElMessage.error('删除失败')
	}
}

export { fileInfoToNode, deleteFile }
