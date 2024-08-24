import { syntaxTree } from '@codemirror/language'
import { RangeSetBuilder } from '@codemirror/state'
import { WidgetType, ViewPlugin, Decoration, EditorView } from '@codemirror/view'

const objectStartRegex = /^"([^"]+)": \{\s*$/
const objectEndRegex = /^\},?\s*$/
const propNameStringRegex = /^"([^"]+)": "([^"]*)",?\s*$/
const propNameBooleanRegex = /^"([^"]+)": (true|false),?\s*$/
const propNameNumberRegex = /^"([^"]+)": (\d+),?\s*$/
const arrayStringRegex = /^"([^"]+)",?\s*$/
const arrayBooleanRegex = /^(true|false),?\s*$/
const arrayNumberRegex = /^(\d+),?\s*$/
const arrayStartRegex = /^"([^"]+)": \[\s*$/
const arrayEndRegex = /^\],?\s*$/

type LineType = 'json' | 'object' | 'propName' | 'array' | 'unknown'

type LineSubtype = 'string' | 'boolean' | 'number' | 'end' | 'start' | 'jsonStartEnd' | 'unknown'

const checkLineType = (line): { type: LineType; subType: LineSubtype } => {
  if (line === '{' || line === '}') {
    return { type: 'json', subType: 'jsonStartEnd' }
  } else if (line.match(objectStartRegex)) {
    return { type: 'object', subType: 'start' }
  } else if (line.match(objectEndRegex)) {
    return { type: 'object', subType: 'end' }
  } else if (line.match(propNameStringRegex)) {
    return { type: 'propName', subType: 'string' }
  } else if (line.match(propNameBooleanRegex)) {
    return { type: 'propName', subType: 'boolean' }
  } else if (line.match(propNameNumberRegex)) {
    return { type: 'propName', subType: 'number' }
  } else if (line.match(arrayStringRegex)) {
    return { type: 'array', subType: 'string' }
  } else if (line.match(arrayBooleanRegex)) {
    return { type: 'array', subType: 'boolean' }
  } else if (line.match(arrayNumberRegex)) {
    return { type: 'array', subType: 'number' }
  } else if (line.match(arrayStartRegex)) {
    return { type: 'array', subType: 'start' }
  } else if (line.match(arrayEndRegex)) {
    return { type: 'array', subType: 'end' }
  }

  return { type: 'unknown', subType: 'unknown' }
}

const isArrayItem = (line): boolean => {
  if (line.match(arrayStringRegex) || line.match(arrayBooleanRegex) || line.match(arrayNumberRegex)) {
    return true
  }
  return false
}

const getArrayItemIndex = (propNameListIndex, jsonLine, lineDepth): number => {
  if (isArrayItem(jsonLine)) {
    const arrayItemIndex = propNameListIndex[lineDepth]?.arrayItemIndex

    if (arrayItemIndex !== undefined) {
      return arrayItemIndex + 1
    } else {
      return 0
    }
  }

  return undefined
}

const cleanPropName = (jsonLine): string => {
  // Regular expression to find text within quotes
  const regex = /"(.*?)"/

  // Use the regex to match the desired text
  const match = jsonLine.match(regex)

  // Output the text if a match is found
  if (match) {
    return match[1]
  } else {
    return jsonLine?.trim()?.replaceAll(/"/g, '')?.replaceAll(/,/g, '')
  }
}

class IconWidget extends WidgetType {
  constructor(
    readonly property,
    readonly onClick,
  ) {
    super()
  }

  toDOM() {
    const icon = document.createElement('span')
    icon.style.cursor = 'pointer'
    icon.className = 'custom-icon'
    icon.textContent = '🔍' // Example icon, can be replaced with an SVG or other image
    icon.onclick = () => this.onClick(this.property)
    return icon
  }

  ignoreEvent() {
    return false
  }
}

export function iconPlugin(onClick, propNameList = []) {
  return ViewPlugin.fromClass(
    class {
      decorations

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view)
      }

      update(update) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view)
        }
      }

      buildDecorations(view) {
        const builder = new RangeSetBuilder()
        const doc = view.state.doc

        syntaxTree(view.state)

        const parsedPropNameList = propNameList
          .map((propName) => propName?.replaceAll('current/', ''))
          .filter((propName) => propName !== 'current')

        // Indexing last occured property name for each depth where each index represents the depth
        const propNameListIndex: Array<{
          type: LineType
          subType: LineSubtype
          propName: string
          rawLine: string
          arrayItemIndex?: number
        }> = []

        let pos = 0 // Position tracker
        let prevDepth = 0 // track depth of last iterated line to reset the propNameListIndex

        if (propNameList?.includes('current')) {
          const widget = new IconWidget('current', onClick)
          const decoration = Decoration.widget({ widget, side: 1 })
          builder.add(1, 1, decoration)
        }

        // Use iterLines() correctly to iterate through the document lines
        for (let i = doc.iterLines(); !i.next().done; ) {
          const line = i.value
          const lineLength = line.length
          const jsonLine = line.trim()

          // Calculate the depth of the line where each tab is 4 spaces
          const lineDepth = line.search(/\S|$/) / 4

          if (lineDepth < prevDepth) {
            propNameListIndex[prevDepth] = undefined
          }

          const { type, subType } = checkLineType(jsonLine)
          propNameListIndex[lineDepth] = {
            type,
            subType,
            propName: cleanPropName(line),
            rawLine: line,
            arrayItemIndex: getArrayItemIndex(propNameListIndex, jsonLine, lineDepth),
          }

          const propArr = [...propNameListIndex]
            .filter((item) => item?.subType === 'start')
            .map((prop) => prop.propName)
          const propArrIndex = propNameListIndex[lineDepth]?.arrayItemIndex
          let extractedFromJSONUnresolvedPath = propArr.join('/')
          if (propArrIndex !== undefined) {
            extractedFromJSONUnresolvedPath = `${extractedFromJSONUnresolvedPath}[${propArrIndex}]`
          }

          if (parsedPropNameList.includes(extractedFromJSONUnresolvedPath)) {
            let widgetPos
            if (propArrIndex !== undefined) {
              widgetPos = pos + lineLength
            } else {
              widgetPos = pos + lineLength - 2
            }

            const widget = new IconWidget(extractedFromJSONUnresolvedPath, onClick)
            const decoration = Decoration.widget({ widget, side: 1 })
            builder.add(widgetPos, widgetPos, decoration)
          }

          pos += lineLength + 1
          prevDepth = lineDepth
        }

        return builder.finish()
      }
    },
    {
      decorations: (v) => v.decorations,
    },
  )
}
