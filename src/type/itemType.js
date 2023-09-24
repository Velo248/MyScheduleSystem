import SymbolName from "../util/symbolName"
import DateType from "./dateType"
import ErrorUtil from "../util/errorUtil"

class ItemType extends SymbolName {
    constructor(uuid, startDate, endDate, name) {
        super(name)
        this.uuid = uuid
        this.startDate = startDate
        this.endDate = endDate
        ErrorUtil.typeCheck(startDate, "string")
        ErrorUtil.typeCheck(endDate, "string")
    }

    getStartDate() {
        return this.startDate
    }

    getEndDate() {
        return this.endDate
    }

    calculateDestinationDay() {
        return DateType.dateFromDate(this.startDate, this.endDate, "days")
    }
}

Object.freeze(ItemType)
export default ItemType