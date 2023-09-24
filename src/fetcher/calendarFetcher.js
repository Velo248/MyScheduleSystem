import {
    getDocs,
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore"
import { firestore } from "../service/firebase"
import TodoItem from "../type/todoItem"

const calendarFetcher = {}

// firestore에서는 userUuid가 있어야 하고
// 우리의 TodoItem에서는 doc의 key가 저장되어야만 한다.

calendarFetcher.allCalenderTodoList = async function (uuid) {
    const qs = await getDocs(collection(firestore, "calendar"))
    const arr = []
    qs.forEach((doc) => {
        const obj = doc.data()
        if (obj.userUuid === uuid)
            arr.push(
                new TodoItem(
                    doc.id,
                    obj.title,
                    obj.content,
                    obj.startDate,
                    obj.endDate,
                    obj.isCompleted
                )
            )
    })
    return arr
}

calendarFetcher.createTodoList = function (userUuid, todo, allTodoItems) {
    const ati = !Array.isArray(allTodoItems) ? [] : allTodoItems
    addDoc(collection(firestore, "calendar"), {
        userUuid: userUuid,
        title: todo.title,
        content: todo.content,
        startDate: todo.startDate,
        endDate: todo.endDate,
        isCompleted: false,
    }).then((result) => {
        ati.push(
            new TodoItem(
                result.id,
                todo.title,
                todo.content,
                todo.startDate,
                todo.endDate,
                false
            )
        )
    })
}

calendarFetcher.updateTodoList = async function (uuid, userUuid, obj) {
    const calendar = doc(firestore, "calendar", uuid)
    const updated = {}
    updated.title = obj.title
    updated.content = obj.content
    updated.startDate = obj.startDate
    updated.endDate = obj.endDate
    updated.userUuid = userUuid
    updated.isCompleted = obj.isCompleted
    await updateDoc(calendar, updated)
}

calendarFetcher.deleteTodoList = async function (uuid) {
    const calendar = doc(firestore, "calendar", `${uuid}`)
    await deleteDoc(calendar)
}

Object.freeze(calendarFetcher)
export default calendarFetcher
