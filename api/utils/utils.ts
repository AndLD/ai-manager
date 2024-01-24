import fs from 'fs'
import path from 'path'

export const Utils = {
    attachPayloadWordToKeysForObject(obj: any) {
        const result: any = {}
        Object.keys(obj).forEach(key => {
            result[`payload.${key}`] = obj[key]
        })

        return result
    },

    getDirectorySizeSync(directoryPath: string) {
        try {
            let totalSize = 0

            const files = fs.readdirSync(directoryPath)

            for (const file of files) {
                const filePath = path.join(directoryPath, file)
                const stats = fs.statSync(filePath)

                if (stats.isFile()) {
                    totalSize += stats.size
                } else if (stats.isDirectory()) {
                    const subdirectorySize = Utils.getDirectorySizeSync(filePath)
                    totalSize += subdirectorySize
                }
            }

            // Convert bytes to megabytes
            const sizeInMB = Math.round(totalSize * 100) / 100 / 100

            return parseFloat(sizeInMB.toFixed(2))
        } catch (error) {
            throw error
        }
    },
}
