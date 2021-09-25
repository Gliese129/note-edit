import req from '@/utils/service'

const fetchRootFolders = () => req('get', '/file/list-root-folders')
const fetchChildrenFiles = (folderId: number) => req('get', '/file/list-all-children', { folderId })
const upload = () => req('post', '/file/upload')
const fetchChildrenByPath = (path: string[]) => req('post', '/file/list-all-folders-by-path', path)
const fetchFileById = (fileId: number) => req('get', '/file/get-file-by-id', { id: fileId })

export default {
	fetchRootFolders,
	fetchChildrenFiles,
	upload,
	fetchChildrenByPath,
	fetchFileById
}
