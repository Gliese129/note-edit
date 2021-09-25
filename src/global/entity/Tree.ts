interface ITreeNode {
	name: string
	type: string
	id: number
	leaf: boolean
	path: string | null
	children?: ITreeNode[]
}

export { ITreeNode }
