export function getTimezoneOffsetMilli(date: Date) {
    return date.getTimezoneOffset() * 60 * 1000
}

export function localeDateStringToDate(dateString: string) {
    let date = new Date(dateString)
    date = new Date(date.getTime() + getTimezoneOffsetMilli(date))
    return date
}
