import dayjs from 'dayjs'
import { INode } from './interfaces/nodes'
import { ICategory } from './interfaces/categories.ts'

export const Utils = {
    randomInteger(min: number, max: number) {
        // получить случайное число от (min-0.5) до (max+0.5)
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    },
    getNodeLabel(node: INode, category?: ICategory) {
        if (!node.payload) {
            return null
        }

        const titleKey = category?.fields?.find(
            (field) => field.type === 'title'
        )?.name

        return (
            node.payload[titleKey || 'title'] +
            (node.payload.startDate
                ? '\n' +
                  dayjs(node.payload.startDate, 'DD.MM.YYYY')
                      .format('DD.MM.YYYY')
                      .toString() +
                  (node.payload.endDate
                      ? ' - ' +
                        dayjs(node.payload.endDate, 'DD.MM.YYYY')
                            .format('DD.MM.YYYY')
                            .toString()
                      : '')
                : '')
        )
    },
    renameIdKeyForItems(items: any[]) {
        return items.map(({ _id, ...rest }) => ({
            id: _id,
            ...rest,
        }))
    },
    getRandomHexColor() {
        return (
            '#' +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
        )
    },
    getRandomColor() {
        const colors = [
            'magenta',
            'red',
            'volcano',
            'orange',
            'gold',
            'lime',
            'green',
            'cyan',
            'blue',
            'geekblue',
            'purple',
        ]

        return colors[Utils.randomInteger(0, colors.length)]
    },
}
