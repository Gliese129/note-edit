import {
	d as e,
	u as t,
	c as a,
	r as l,
	o,
	a as s,
	b as n,
	w as r,
	F as i,
	e as u,
	p as d,
	f as c,
	g as p,
	n as f,
	t as m,
	E as v,
	h,
	i as y,
	j as g,
	k as _,
	l as b,
	m as w,
	q as k,
	s as I,
	v as x,
	x as P,
	y as N,
	z as V,
	A as j,
	B as C,
	V as F,
	C as L,
	D as U,
	G as $,
	H as A,
	P as S,
	I as E,
	_ as z,
	J as M,
	K as T,
	L as q,
	M as H,
	N as B
} from './vendor.529f12a8.js'
!(function () {
	const e = document.createElement('link').relList
	if (!(e && e.supports && e.supports('modulepreload'))) {
		for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e)
		new MutationObserver((e) => {
			for (const a of e)
				if ('childList' === a.type)
					for (const e of a.addedNodes)
						'LINK' === e.tagName && 'modulepreload' === e.rel && t(e)
		}).observe(document, { childList: !0, subtree: !0 })
	}
	function t(e) {
		if (e.ep) return
		e.ep = !0
		const t = (function (e) {
			const t = {}
			return (
				e.integrity && (t.integrity = e.integrity),
				e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
				'use-credentials' === e.crossorigin
					? (t.credentials = 'include')
					: 'anonymous' === e.crossorigin
					? (t.credentials = 'omit')
					: (t.credentials = 'same-origin'),
				t
			)
		})(e)
		fetch(e.href, t)
	}
})()
const K = u('主页'),
	O = u('工作台'),
	D = u('笔记'),
	G = u('上传'),
	J = u('查看')
var R = e({
	setup(e) {
		const u = t()
		let d = a(() => u.state.file.fileId)
		return (e, t) => {
			const a = l('el-menu-item'),
				u = l('el-sub-menu'),
				c = l('el-menu'),
				p = l('router-view')
			return (
				o(),
				s(
					i,
					null,
					[
						n(
							c,
							{ class: 'el-menu-demo', mode: 'horizontal', router: '' },
							{
								default: r(() => [
									n(a, { index: '/' }, { default: r(() => [K]), _: 1 }),
									n(
										u,
										{ index: '2' },
										{
											title: r(() => [O]),
											default: r(() => [
												n(
													a,
													{ index: `/note-edit/${d.value}` },
													{ default: r(() => [D]), _: 1 },
													8,
													['index']
												),
												n(
													a,
													{ index: '/upload' },
													{ default: r(() => [G]), _: 1 }
												)
											]),
											_: 1
										}
									),
									n(
										a,
										{ index: `/note-view/${d.value}` },
										{ default: r(() => [J]), _: 1 },
										8,
										['index']
									)
								]),
								_: 1
							}
						),
						n(p)
					],
					64
				)
			)
		}
	}
})
d('data-v-096165b4')
const Q = { class: 'file-view' },
	W = { class: 'name' }
c()
var X = e({
	props: { name: String, type: String },
	setup(e) {
		const t = e
		return (e, a) => (
			o(),
			s('div', Q, [
				p('div', { class: f(['icon', t.type ? t.type.toLowerCase() : '']) }, null, 2),
				p('span', W, m(t.name), 1)
			])
		)
	}
})
X.__scopeId = 'data-v-096165b4'
var Y = (e) => v.success({ message: e, type: 'success' }),
	Z = (e) => v.warning({ message: e, type: 'warning' }),
	ee = (e) => v.error({ message: e, type: 'error' })
const te = h.create({ baseURL: '/api', timeout: 2e4 })
function ae(e, t, a = null) {
	return 'post' === (e = e.toLowerCase())
		? te.post(t, a)
		: 'get' === e
		? te.get(t, { params: a })
		: 'delete' === e
		? te.delete(t, { params: a })
		: te.put(t, a)
}
te.interceptors.request.use(
	(e) => e,
	(e) => Promise.reject(e)
),
	te.interceptors.response.use(
		(e) => {
			switch (e.data.code) {
				case 200:
					break
				case 403:
					Z('你没有权限执行该操作!')
					break
				case 401:
					y({
						title: '警告',
						message: '你还未登录，将在2s后跳转至登录页面',
						type: 'warning'
					}),
						setTimeout(() => {
							window.location.href = '/login'
						}, 2e3)
			}
			return e.data
		},
		(e) => (ee('发生错误！'), console.error(`api error: ${e}`), Promise.reject(e))
	)
var le = () => ae('get', '/file/list-root-folders'),
	oe = (e) => ae('get', '/file/list-all-children', { folderId: e }),
	se = (e) => ae('post', '/file/list-all-folders-by-path', e),
	ne = (e) => ae('get', '/file/get-file-by-id', { id: e })
const re = (e) => {
	let t = []
	return (
		e.forEach((e) => {
			t.push({
				name: e.fileName,
				type: e.fileType,
				id: 'folder' == e.fileType ? e.folderId : e.id,
				leaf: 'folder' != e.fileType,
				path: e.realPath
			})
		}),
		t
	)
}
d('data-v-4befaa83')
const ie = { class: 'home' },
	ue = u('查看笔记'),
	de = u('编辑笔记')
c()
var ce = e({
	setup(e) {
		const a = g({ label: 'name', children: 'children', isLeaf: 'leaf' }),
			i = (e, t) => {
				let a = e.data
				0 === e.level
					? le().then((e) => {
							let a = e.obj
							t(re(a))
					  })
					: oe(a.id).then((e) => {
							let a = e.obj
							t(re(a))
					  })
			},
			u = _(),
			d = t()
		return (e, t) => {
			const c = l('el-button'),
				p = l('el-button-group'),
				f = l('el-popover'),
				m = l('el-tree')
			return (
				o(),
				s('div', ie, [
					n(
						m,
						{ props: b(a), load: i, lazy: '' },
						{
							default: r(({ node: e, data: t }) => [
								'folder' !== t.type
									? (o(),
									  w(
											f,
											{
												key: 0,
												placement: 'right',
												width: 100,
												trigger: 'click'
											},
											{
												reference: r(() => [
													n(X, { name: t.name, type: t.type }, null, 8, [
														'name',
														'type'
													])
												]),
												default: r(() => [
													n(
														p,
														null,
														{
															default: r(() => [
																n(
																	c,
																	{
																		onClick: (e) => {
																			return (
																				(a = t.id),
																				d.commit(
																					'file/setFileId',
																					a
																				),
																				void u.push({
																					path: `/note-view/${a}`
																				})
																			)
																			var a
																		}
																	},
																	{
																		default: r(() => [ue]),
																		_: 2
																	},
																	1032,
																	['onClick']
																),
																n(
																	c,
																	{
																		onClick: (e) => {
																			return (
																				(a = t.id),
																				d.commit(
																					'file/setFileId',
																					a
																				),
																				void u.push({
																					path: `/note-edit/${a}`
																				})
																			)
																			var a
																		}
																	},
																	{
																		default: r(() => [de]),
																		_: 2
																	},
																	1032,
																	['onClick']
																)
															]),
															_: 2
														},
														1024
													)
												]),
												_: 2
											},
											1024
									  ))
									: (o(),
									  w(X, { key: 1, name: t.name, type: t.type }, null, 8, [
											'name',
											'type'
									  ]))
							]),
							_: 1
						},
						8,
						['props']
					)
				])
			)
		}
	}
})
;(ce.__scopeId = 'data-v-4befaa83'), d('data-v-65427426')
const pe = { class: 'choose-folder' },
	fe = p('h3', null, '请选择位置', -1),
	me = u('活动详情')
c()
var ve = e({
	props: { allowUnexistFolder: Boolean, pathArray: Array },
	emits: ['update:pathArray'],
	setup(e, { emit: t }) {
		const u = e
		let d = a({ get: () => u.pathArray, set: (e) => t('update:pathArray', e) })
		const c = g([0])
		let p = k(0)
		I(p, () => {
			m.value = !0
		})
		let f = [],
			m = k(!0)
		const v = async (e, t) => {
			m.value &&
				(await (async (e) => {
					p.value = e
					let t = []
					for (let l = 0; l < p.value; ++l) t.push(d.value[l])
					for (; f.length > 0; ) f.pop()
					let a = (await se(t)).obj
					;(m.value = !1), (f = re(a))
				})(p.value))
			let a = []
			for (let l = 0; l < f.length; ++l) {
				let t = f[l]
				e
					? 0 === t.name.toLowerCase().indexOf(e.toLowerCase()) &&
					  a.push({ value: t.name })
					: a.push({ value: t.name })
			}
			t(a)
		}
		return (e, t) => {
			const a = l('el-autocomplete'),
				f = l('el-breadcrumb-item'),
				m = l('el-breadcrumb')
			return (
				o(),
				s('div', pe, [
					fe,
					n(
						m,
						{ separator: '/' },
						{
							default: r(() => [
								u.allowUnexistFolder
									? (o(!0),
									  s(
											i,
											{ key: 0 },
											x(
												d.value,
												(e, t) => (
													o(),
													w(
														f,
														{ key: t },
														{
															default: r(() => [
																n(
																	a,
																	{
																		class: 'path-input',
																		size: 'mini',
																		modelValue: d.value[t],
																		'onUpdate:modelValue': (
																			e
																		) => (d.value[t] = e),
																		onInput: (e) =>
																			((e) => {
																				for (
																					;
																					d.value.length >
																					e + 1;

																				)
																					d.value.pop(),
																						c.pop()
																				d.value.push(''),
																					c.push(0)
																			})(t),
																		onClick: (e) =>
																			(p.value = t),
																		onFocus: (e) =>
																			(p.value = t),
																		'fetch-suggestions': v,
																		clearable: ''
																	},
																	null,
																	8,
																	[
																		'modelValue',
																		'onUpdate:modelValue',
																		'onInput',
																		'onClick',
																		'onFocus'
																	]
																)
															]),
															_: 2
														},
														1024
													)
												)
											),
											128
									  ))
									: (o(), w(f, { key: 1 }, { default: r(() => [me]), _: 1 }))
							]),
							_: 1
						}
					)
				])
			)
		}
	}
})
ve.__scopeId = 'data-v-65427426'
const he = { class: 'upload-file' },
	ye = p('i', { class: 'el-icon-upload' }, null, -1),
	ge = p(
		'div',
		{ class: 'el-upload__text' },
		[u('将文件拖到此处，或'), p('em', null, '点击上传')],
		-1
	),
	_e = p('div', { class: 'el-upload__tip' }, '只能上传 pdf 文件，且不超过 10M', -1)
var be = e({
	props: { fileName: String },
	setup(e) {
		const i = e,
			u = t()
		let d = a(() => u.state.file.folderPath),
			c = k(''),
			p = a(() => d.value + (i.fileName && '' !== i.fileName ? i.fileName + '.pdf' : c.value))
		const f = g([]),
			m = async (e) => {
				if (((c.value = e.name), await setTimeout(() => {}, 50), '' == d.value))
					throw (Z('文件必须放在某文件夹下'), new Error('no root folder'))
			},
			v = (e, t, a) => {
				500 == e.code && ee('文件不能重名!')
			},
			h = (e, t, a) => {
				413 === e.code && Z('文件过大!')
			}
		return (e, t) => {
			const a = l('el-upload')
			return (
				o(),
				s('div', he, [
					n(
						a,
						{
							class: 'upload-demo',
							drag: '',
							action: '/api/file/upload',
							accept: '.pdf',
							data: { path: p.value },
							'file-list': b(f),
							'before-upload': m,
							'on-success': v,
							'on-error': h
						},
						{ tip: r(() => [_e]), default: r(() => [ye, ge]), _: 1 },
						8,
						['data', 'file-list']
					)
				])
			)
		}
	}
})
const we = { class: 'upload' },
	ke = p('h3', null, '文件名(不填默认为文件原名)', -1),
	Ie = u('.pdf')
var xe = e({
	setup(e) {
		const a = t(),
			i = g([''])
		I(i, (e) => {
			console.log(e), a.commit('file/setFolderPath', e)
		})
		let u = k('')
		return (e, t) => {
			const a = l('el-input'),
				d = l('el-col'),
				c = l('el-row')
			return (
				o(),
				s('div', we, [
					n(c, null, {
						default: r(() => [
							n(
								d,
								{ offset: 3, span: 9 },
								{
									default: r(() => [
										n(
											ve,
											{ 'allow-unexist-folder': !0, 'path-array': b(i) },
											null,
											8,
											['path-array']
										),
										p('div', null, [
											ke,
											n(
												a,
												{
													placeholder: '请输入文件名',
													modelValue: u.value,
													'onUpdate:modelValue':
														t[0] || (t[0] = (e) => (u.value = e))
												},
												{ append: r(() => [Ie]), _: 1 },
												8,
												['modelValue']
											)
										])
									]),
									_: 1
								}
							),
							n(
								d,
								{ offset: 1, span: 5 },
								{
									default: r(() => [
										n(be, { size: 'mini', 'file-name': u.value }, null, 8, [
											'file-name'
										])
									]),
									_: 1
								}
							)
						]),
						_: 1
					})
				])
			)
		}
	}
})
var Pe = (e, t) => ae('post', '/note/save-note', { fileId: e, note: t }),
	Ne = (e) => ae('get', '/note/get-note-by-file-id', { fileId: e })
const Ve = { class: 'markdown' }
var je = e({
	props: { modelValue: String, saveMethod: Function },
	emits: ['update:modelValue'],
	setup(e, { emit: t }) {
		const r = e
		let i = a({ get: () => r.modelValue, set: (e) => t('update:modelValue', e) })
		const u = g({
			mermaid: {
				title: '流程图',
				icon: 'el-icon-guide',
				action(e) {
					e.insert(function (e) {
						const t = e || '请输入mermaid语法'
						return { text: `\`\`\`mermaid\n${t}\n\`\`\``, selected: t }
					})
				}
			},
			align: {
				title: '内容定位',
				icon: 'el-icon-rank',
				menus: [
					{
						name: 'left',
						text: '左对齐',
						action(e) {
							e.insert(function (e) {
								const t = e || '请输入内容'
								return { text: `::: align-left\n${t}\n:::`, selected: t }
							})
						}
					},
					{
						name: 'center',
						text: '居中',
						action(e) {
							e.insert(function (e) {
								const t = e || '请输入内容'
								return { text: `::: align-center\n${t}\n:::`, selected: t }
							})
						}
					},
					{
						name: 'right',
						text: '右对齐',
						action(e) {
							e.insert(function (e) {
								const t = e || '请输入内容'
								return { text: `::: align-right\n${t}\n:::`, selected: t }
							})
						}
					}
				]
			}
		})
		return (e, t) => {
			const a = l('v-md-editor')
			return (
				o(),
				s('div', Ve, [
					n(
						a,
						{
							class: 'markdown',
							modelValue: i.value,
							'onUpdate:modelValue': t[0] || (t[0] = (e) => (i.value = e)),
							height: '500px',
							'left-toolbar':
								'undo redo clear | tip h bold italic strikethrough quote | ul ol table | hr link code | mermaid todo-list align | save',
							toolbar: b(u),
							onSave: r.saveMethod
						},
						null,
						8,
						['modelValue', 'toolbar', 'onSave']
					)
				])
			)
		}
	}
})
d('data-v-200a9ed0')
const Ce = { class: 'note-edit' },
	Fe = { key: 0 },
	Le = ['src'],
	Ue = u(' 请到'),
	$e = u('首页'),
	Ae = u('选择pdf ')
c()
var Se = e({
	setup(e) {
		const t = P()
		let i = k(''),
			u = a(() => (t.params.fileId ? Number(t.params.fileId) : 0))
		const d = g({ id: 0, fileName: '', realPath: '' }),
			c = (e) => {
				e &&
					e > 0 &&
					(ne(e).then((e) => {
						let t = e.obj
						;(d.id = t.id), (d.fileName = t.fileName), (d.realPath = t.realPath)
					}),
					Ne(e).then((e) => {
						let t = e.obj
						i.value = t.note
					}))
			}
		I(u, (e) => {
			c(e)
		}),
			N(() => {
				c(u.value)
			})
		const f = (e, t) => {
			Pe(u.value, e).then((e) => {
				200 === e.code && Y('保存成功!')
			})
		}
		return (e, t) => {
			const a = l('el-col'),
				c = l('el-row'),
				m = l('router-link'),
				v = l('el-empty')
			return (
				o(),
				s('div', Ce, [
					u.value && u.value > 0
						? (o(),
						  s('div', Fe, [
								n(c, null, {
									default: r(() => [
										n(
											a,
											{ span: 9 },
											{
												default: r(() => [
													p(
														'iframe',
														{ class: 'pdf-view', src: b(d).realPath },
														null,
														8,
														Le
													)
												]),
												_: 1
											}
										),
										n(
											a,
											{ offset: 1, span: 14 },
											{
												default: r(() => [
													n(
														je,
														{
															modelValue: i.value,
															'onUpdate:modelValue':
																t[0] ||
																(t[0] = (e) => (i.value = e)),
															'save-method': f
														},
														null,
														8,
														['modelValue']
													)
												]),
												_: 1
											}
										)
									]),
									_: 1
								})
						  ]))
						: (o(),
						  w(
								v,
								{ key: 1 },
								{
									default: r(() => [
										Ue,
										n(m, { to: '/' }, { default: r(() => [$e]), _: 1 }),
										Ae
									]),
									_: 1
								}
						  ))
				])
			)
		}
	}
})
;(Se.__scopeId = 'data-v-200a9ed0'), d('data-v-b76e8c0a')
const Ee = { class: 'note-view' },
	ze = { key: 0 },
	Me = ['src'],
	Te = u(' 请到'),
	qe = u('首页'),
	He = u('选择pdf ')
c()
var Be = e({
	setup(e) {
		const t = P()
		let i = k(''),
			u = a(() => (t.params.fileId ? Number(t.params.fileId) : 0))
		const d = g({ id: 0, fileName: '', realPath: '' }),
			c = (e) => {
				e &&
					e > 0 &&
					(ne(e).then((e) => {
						let t = e.obj
						;(d.id = t.id), (d.fileName = t.fileName), (d.realPath = t.realPath)
					}),
					Ne(e).then((e) => {
						let t = e.obj
						i.value = t.note
					}))
			}
		return (
			I(u, (e) => {
				c(e)
			}),
			N(() => {
				c(u.value)
			}),
			(e, t) => {
				const a = l('el-col'),
					c = l('v-md-preview'),
					f = l('el-row'),
					m = l('router-link'),
					v = l('el-empty')
				return (
					o(),
					s('div', Ee, [
						u.value && u.value > 0
							? (o(),
							  s('div', ze, [
									n(f, null, {
										default: r(() => [
											n(
												a,
												{ span: 12 },
												{
													default: r(() => [
														p(
															'iframe',
															{
																class: 'pdf-view',
																src: b(d).realPath
															},
															null,
															8,
															Me
														)
													]),
													_: 1
												}
											),
											n(
												a,
												{ offset: 1, span: 11 },
												{
													default: r(() => [
														n(c, { text: i.value }, null, 8, ['text'])
													]),
													_: 1
												}
											)
										]),
										_: 1
									})
							  ]))
							: (o(),
							  w(
									v,
									{ key: 1 },
									{
										default: r(() => [
											Te,
											n(m, { to: '/' }, { default: r(() => [qe]), _: 1 }),
											He
										]),
										_: 1
									}
							  ))
					])
				)
			}
		)
	}
})
Be.__scopeId = 'data-v-b76e8c0a'
const Ke = [
		{ path: '/', name: 'Home', component: ce },
		{ path: '/upload', name: 'Upload', component: xe },
		{ path: '/note-edit/:fileId', name: 'NoteEdit', component: Se },
		{ path: '/note-view/:fileId', name: 'NoteView', component: Be }
	],
	Oe = V({ history: j(), routes: Ke })
var De = C({
	modules: {
		file: {
			namespaced: !0,
			state: { folderPath: '', fileId: 0 },
			mutations: {
				setFolderPath(e, t) {
					let a = ''
					t.forEach((e) => {
						'' !== e && (a += e + '/')
					}),
						(e.folderPath = a)
				},
				setFileId(e, t) {
					e.fileId = t
				}
			}
		}
	}
})
;(F.Codemirror = L),
	F.use(U, { Hljs: $ }).use(A, { Prism: S }).use(E()).use(z()).use(M()).use(T()),
	(F.Codemirror = L),
	q.use(U, { Hljs: $ }).use(A, { Prism: S }).use(E()).use(z()).use(M()).use(T())
const Ge = H(R)
Ge.use(De).use(Oe).use(B).use(F).use(q), Ge.mount('#app')
