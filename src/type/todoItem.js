import ItemType from "./itemType"

class TodoItem extends ItemType {
    constructor(uuid, title, content, startDate, endDate, isCompleted) {
        super(uuid, startDate, endDate, "todoItem")
        this.title = title
        this.content = content
        this.isCompleted = isCompleted
    }

    getTitle() {
        return this.title
    }

    getContent() {
        return this.content
    }
}

export default TodoItem