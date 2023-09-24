import moment from "moment"
import ErrorUtil from "./errorUtil"

// Object
const DateUtil = {}

DateUtil.dateFormat = function() {
    return moment().format("YYYY-MM-DD").split("T")[0]
}

DateUtil.dateFormatForCustom = function(date, foramt) {
    return moment(date, foramt).format().split("T")[0]
}

DateUtil.timeFormat = function() {
    return moment().format("HH:mm")
}

DateUtil.timeFormatToSeconds = function() {
    return moment().format("HH:mm:ss")
}

DateUtil.dayFormat = function() {
    return moment().format("dddd")
}

// input: date, number, operation, days, months, years
// output: (add, subtract) date
// ex) 1, days => add 1 days
// need to fix
DateUtil.dateCalculate = function(date, number, operation, day) {
    switch(operation) {
        case "add":
            return moment(date).add(number, day).format("YYYY-MM-DD").split("T")[0]

        case "subtract":
            return moment(date).subtract(number, day).format("YYYY-MM-DD").split("T")[0]

        default:
            ErrorUtil.notImplemented()
            return
    }
}

DateUtil.dateFromDate = function(start, end, operation) {
    const startDate = moment(start)
    const endDate = moment(end)

    switch(operation) {
        case "days":
            return endDate.diff(startDate, "days").toString()

        case "weeks":
            return endDate.diff(startDate, "weeks").toString()

        case "months":
            return endDate.diff(startDate, "months").toString()

        default:
            ErrorUtil.notImplemented()
    }
}

DateUtil.isSame = function(current, compare) {
    return moment(current).isSame(compare)
}

DateUtil.isBetween = function(now, prev, next) {
    return moment(now).isBetween(prev, next, undefined, "[]")
}

DateUtil.dateFromMonth = function() {
    const month = []
    const startDay = moment().startOf("month").format("YYYY-MM-DD")
    const endDay = moment().endOf("month").format("YYYY-MM-DD")
    month.push(startDay, endDay)
    return month
}

DateUtil.castToDay = function(day) {
    switch(day) {
        case "Mon":
            return "Monday"

        case "Tue":
            return "Tuesday"

        case "Wed":
            return "Wednesday"

        case "Thu":
            return "Thursday"

        case "Fri":
            return "Friday"

        case "Sat":
            return "Saturday"

        case "Sun":
            return "Sunday"

        default:
            ErrorUtil.notImplemented()
            break
    }
}

DateUtil.castToMonth = function(month) {
    switch(month) {
        case "Jan":
            return "01"

        case "Feb":
            return "02"

        case "Mar":
            return "03"

        case "Apr":
            return "04"

        case "May":
            return "05"

        case "Jun":
            return "06"

        case "Jul":
            return "07"

        case "Aug":
            return "08"

        case "Sep":
            return "09"

        case "Oct":
            return "10"

        case "Nov":
            return "11"

        case "Dec":
            return "12"

        default:
            ErrorUtil.notImplemented()
            break
    }
}

Object.freeze(DateUtil)
export default DateUtil