import { StateNode, TLStateNodeConstructor } from '@tldraw/tldraw'
import { Idle } from './toolStates/Idle'
import { Pointing } from './toolStates/Pointing'

/** @public */
export class ArrowShapeTool extends StateNode {
	static override id = 'arrow'
	static override initial = 'idle'
	static override children = (): TLStateNodeConstructor[] => [Idle, Pointing]

	override shapeType = 'arrow'
}
