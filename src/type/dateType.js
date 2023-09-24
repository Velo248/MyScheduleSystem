import DateUtil from "../util/dateUtil"
import ErrorUtil from "../util/errorUtil"

const DateType = {}

// YYYY-MM-DD
DateType.createDate = function() {
    const createdDate = DateUtil.dateFormat()
    return createdDate
}

DateType.createDateFormat = function(date, format) {
    const createdDate = DateUtil.dateFormatForCustom(date, format)
    return createdDate
}

DateType.getYear = function(date) {
    ErrorUtil.invalidParameter(date)
    ErrorUtil.typeCheck(date, "string")
    const year = date.split("-")[0]
    return year
}

DateType.getMonth = function(date) {
    ErrorUtil.invalidParameter(date)
    ErrorUtil.typeCheck(date, "string")
    const month = date.split("-")[1]
    return month
}

DateType.getDateDay = function(date) {
    ErrorUtil.invalidParameter(date)
    ErrorUtil.typeCheck(date, "string")
    const day = date.split("-")[2]
    return day
}

DateType.getTime = function() {
    const time = DateUtil.timeFormat()
    return time
}

DateType.getTimeToSeconds = function() {
    const time = DateUtil.timeFormatToSeconds()
    return time
}

DateType.getDay = function() {
    const day = DateUtil.dayFormat()
    return day
}

DateType.dateFromDate = function(start, end, op) {
    const result = DateUtil.dateFromDate(start, end, op)
    return result
}

DateType.castToDay = function(day) {
    const changedDay = DateUtil.castToDay(day)
    return changedDay
}

DateType.castToMonth = function(month) {
    const changedMonth = DateUtil.castToMonth(month)
    return changedMonth
}

//prev => startDate of calendar, next => endDate of calendar
//all props should be same month range
DateType.isBetween = function(now, prev, next) {
    ErrorUtil.typeCheck(now, "string")
    ErrorUtil.typeCheck(prev, "string")
    ErrorUtil.typeCheck(next, "string")
    const month = DateUtil.dateFromMonth()
    
    if(!DateUtil.isBetween(prev, month[0], month[1]) || !DateUtil.isBetween(next, month[0], month[1])) return false
    const between =  DateUtil.isBetween(now, month[0], month[1])
    return between
}

DateType.lastDayOfMonth = function(day) {

}

Object.freeze(DateType)
export default DateType