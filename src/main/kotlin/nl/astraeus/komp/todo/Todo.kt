package nl.astraeus.komp.todo

import kotlinx.html.*
import kotlinx.html.js.onClickFunction
import kotlinx.html.js.onDoubleClickFunction
import kotlinx.html.js.onKeyDownFunction
import kotlinx.html.js.section
import nl.astraeus.komp.HtmlComponent
import nl.astraeus.komp.Komp
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.js.Date

/**
 * https://github.com/tastejs/todomvc/
 */

class Todo(
  val dataId: String,
  var title: String,
  var completed: Boolean = false,
  var editing: Boolean = false
)

enum class Selection(val title: String) {
    ALL("All"),
    ACTIVE("Active"),
    COMPLETED("Completed")
}

class TodoApp: HtmlComponent() {
    val todoList: MutableList<Todo> = ArrayList()
    var selected: Selection = Selection.ALL

    fun addTodo(e: Event) {
        val target = e.target

        if (target is HTMLInputElement) {
            todoList.add(Todo("${Date().getTime()}", target.value))

            refresh()
        }
    }

    fun editTodo(e: Event, todo: Todo) {
        val target = e.target

        if (target is HTMLInputElement) {
            todo.title = target.value
            todo.editing = false

            refresh()
        }

    }

    fun destroyTodo(todo: Todo) {
        todoList.remove(todo)

        refresh()
    }

    fun selectSelection(selection: Selection) {
        selected = selection

        refresh()
    }

    fun clearCompleted() {
        for (todo in ArrayList(todoList)) {
            if (todo.completed) {
                todoList.remove(todo)
            }
        }

        refresh()
    }

    fun todoClicked(todo: Todo) {
        todo.completed = !todo.completed

        refresh()
    }

    fun getItemsLeft(): Int {
        var result = 0
        for (todo in todoList) {
            if (!todo.completed) {
                result++
            }
        }
        return result
    }

    fun setEditing(editTodo: Todo) {
        for (todo in todoList) {
            todo.editing = todo == editTodo
        }

        refresh()
    }

    override fun refresh() {
        super.refresh()

        val inputBox = document.getElementById("todo_input")

        if (inputBox is HTMLInputElement) {
            inputBox.focus()
        }
    }

    override fun render(consumer: TagConsumer<HTMLElement>) = consumer.section(classes = "todoapp") {
        header(classes = "header") {
            h1 { + "todos" }
            input(classes = "new-todo") {
                id = "todo_input"
                placeholder = "What needs to be done?"
                autoFocus = true
                onKeyDownFunction = { e ->
                    if (e is KeyboardEvent && e.keyCode == 13) {
                        addTodo(e)
                    }
                }
            }
        }
        section(classes = "main") {
            input(classes = "toggle-all") {
                type = InputType.checkBox
            }
            label {
                for_ = "toggle-all"
                + "Mark all as complete"
            }
            ul(classes = "todo-list") {
                for (todo in todoList) {
                    if (selected == Selection.ALL ||
                        (todo.completed && selected == Selection.COMPLETED) ||
                        (!todo.completed && selected == Selection.ACTIVE)) {
                        li {
                            if (todo.editing) {
                                classes += "editing"
                                input(classes = "edit") {
                                    value = todo.title
                                    onKeyDownFunction = { e ->
                                        if (e is KeyboardEvent && e.keyCode == 13) {
                                            editTodo(e, todo)
                                        }
                                    }
                                }
                            } else {
                                if (todo.completed) {
                                    classes += "completed"
                                }
                                attributes["data-id"] = todo.dataId
                                div(classes = "view") {
                                    input(classes = "toggle") {
                                        type = InputType.checkBox
                                        checked = todo.completed
                                        onClickFunction = {
                                            todoClicked(todo)
                                        }
                                    }
                                    label(classes = "todo-content") {
                                        +todo.title

                                        onDoubleClickFunction = {
                                            setEditing(todo)
                                        }
                                    }
                                    button(classes = "destroy") {
                                        onClickFunction = {
                                            destroyTodo(todo)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        footer(classes = "footer") {
            span(classes = "todo-count") {
                strong { + "${getItemsLeft()}" }
                + " item left"
            }
            ul(classes = "filters") {
                for (selection in Selection.values())
                li {
                    a {
                        if (selection == selected) { classes += "selected" }
                        href = "#"
                        + selection.title
                        onClickFunction = {
                            selectSelection(selection)
                        }
                    }
                }
            }
            button(classes = "clear-completed") {
                + "Clear completed"
                onClickFunction = {
                    clearCompleted()
                }
            }
        }
    }

}

fun main(args: Array<String>) {
    Komp.create(document.body!!, TodoApp(), true)
}
