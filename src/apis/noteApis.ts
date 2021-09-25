import req from '@/utils/service'

const saveNote = (fileId: number, note: string) => req('post', '/note/save-note', { fileId, note })
const getNoteByFile = (fileId: number) => req('get', '/note/get-note-by-file-id', { fileId })

export default {
	saveNote,
	getNoteByFile
}
