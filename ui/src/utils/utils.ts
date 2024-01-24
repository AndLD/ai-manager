import dayjs from 'dayjs'
import moment from 'moment'

export const Utils = {
    randomInteger(min: number, max: number) {
        // получить случайное число от (min-0.5) до (max+0.5)
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    },
    renameIdKeyForItems(items: any[]) {
        return items.map(({ _id, ...rest }) => ({
            id: _id,
            ...rest,
        }))
    },
    getRandomHexColor() {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
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
    formatTimestamp(timestamp: number, locale: string = 'en-US') {
        // Use moment with 'LT' token to automatically format time based on locale
        const formattedTime = moment(timestamp).locale(locale).format('LT')

        return formattedTime
    },
}
