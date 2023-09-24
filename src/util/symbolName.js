import ErrorUtil from "./errorUtil"

class SymbolName {
    constructor(name) {
        ErrorUtil.invalidParameter(typeof name === "string")
        this.name = name
    }
}

SymbolName.freezeObject = function(obj, thisObj) {
    if(obj.constructor === thisObj) {
        Object.freeze(obj)
    }
}

Object.freeze(SymbolName)
export default SymbolName