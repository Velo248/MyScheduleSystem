import ErrorUtil from "./errorUtil"
import Lodash from "lodash"

const ArrayUtil = {}

ArrayUtil.removeDuplicate = function(array) {
    return [ ...new Set(array) ]
}

ArrayUtil.isEmpty = function(array) {
    const result = Lodash.isEmpty(array)
    return result
}

ArrayUtil.createArray = function(array, type) {
    const result = ArrayUtil.removeDuplicate(Lodash.castArray(array))
    if(type !== undefined) ErrorUtil.assert(result.every(e => e instanceof type), "All element type must be same!")
    return result
}

ArrayUtil.size = function(array) {
    return Lodash.size(array)
}

ArrayUtil.not = function(checked, array) {
    return checked.filter((value) => array.indexOf(value) === -1)
}

ArrayUtil.intersection = function(checked, array) {
    return checked.filter((value) => array.indexOf(value) !== -1)
}

ArrayUtil.union = function(checked, array) {
    return [...checked, ...ArrayUtil.not(array, checked)]
}

Object.freeze(ArrayUtil)
export default ArrayUtil