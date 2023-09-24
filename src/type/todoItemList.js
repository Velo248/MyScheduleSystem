import ArrayUtil from "../util/arrayUtil"
import ErrorUtil from "../util/errorUtil"
import TodoItem from "./todoItem"

class _TodoItemList {
    constructor(todoItemListArray) {
        this.$_todoItemListArray = todoItemListArray
    }

    todoItemListObject() {
        const listObj = {}
        this.$_todoItemListArray.forEach((item) => {
            listObj[item.getTitle()] = {
                content: item.getContent(),
                startDate: item.getStartDate(),
                endDate: item.getEndDate(),
            }
        })
        return listObj
    }

    friendListArray() {
        return this.$_todoItemListArray
    }
}

const TodoItemList = {}

TodoItemList.createTodoItemList = function(array) {
    const tdArr = ArrayUtil.createArray(array, TodoItem)
    ErrorUtil.assert(ArrayUtil.size(tdArr) > 1, 'Array size > 1')
    return new _TodoItemList(tdArr)
}

TodoItemList.createTodoStringList = function(array) {
    ErrorUtil.assert(!ArrayUtil.isEmpty(array), 'Array must be filled!')
    const tArr = array.map(item => item.content)
    tArr.every(e => ErrorUtil.typeCheck(e, 'string'))
    ErrorUtil.assert(ArrayUtil.size(tArr) > 1, 'Array size > 1')
    return tArr
}

Object.freeze(TodoItemList)
export default TodoItemList