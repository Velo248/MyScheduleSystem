import ItemType from "./itemType"

class Notify extends ItemType {
    constructor(uuid, startDate, isChecked, message) {
        // notify의 endDate는 큰 의미가 없어보이므로, startDate와 동일하게 넣는다.
        super(uuid, startDate, startDate, "notify")
        this.isChecked = isChecked
        this.message = message
    }

    getIsChecked() {
        return this.isChecked
    }

    getMessage() {
        return this.message
    }
}

Object.freeze(Notify)
export default Notify
