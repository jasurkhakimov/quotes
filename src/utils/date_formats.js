import moment from "moment"

export const format_date = (tmp) => {
    return tmp && moment(tmp).format('DD/MM/YYYY, HH:mm')
}