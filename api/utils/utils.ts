export const Utils = {
    attachPayloadWordToKeysForObject(obj: any) {
        const result: any = {}
        Object.keys(obj).forEach((key) => {
            result[`payload.${key}`] = obj[key]
        })

        return result
    },
}
