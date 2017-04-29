package nl.astraeus.komp.todo

import kotlinx.html.*
import kotlinx.html.js.onKeyPressFunction
import kotlinx.html.js.section
import nl.astraeus.komp.HtmlComponent
import nl.astraeus.komp.Komp
import org.w3c.dom.HTMLElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document

/**
 * User: rnentjes
 * Date: 1-4-17
 * Time: 17:46
 */

class Todo(val dataId: String, val title: String, var completed: Boolean)

class TodoApp: HtmlComponent() {
    val todos: List<Todo> = ArrayList()

    fun addTodo(todo: String) {

    }

    override fun render(consumer: TagConsumer<HTMLElement>) = consumer.section(classes = "todoapp") {
        header(classes = "header") {
            h1 { + "todos" }
            input(classes = "new-todo") {
                placeholder = "What needs to be done?"
                autoFocus = true
                onKeyPressFunction = { e ->
                    if (e is KeyboardEvent && e.keyCode == 13) {
                        //addTodo(e.target.value)
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
                for (todo in todos) {
                    li {
                        if (todo.completed) {
                            classes += "completed"
                        }
                        attributes["data-id"] = todo.dataId
                        div(classes = "view") {
                            input(classes = "toggle") {
                                type = InputType.checkBox
                                checked = todo.completed
                            }
                            label(classes = "todo-content") {
                                + todo.title
                            }
                            button(classes = "destroy")
                        }
                        input(classes = "edit") {
                            value = todo.title
                        }
                    }
                }
            }

        }
        footer(classes = "footer") {
            span(classes = "todo-count") {
                strong { + "0" }
                + " item left"
            }
            ul(classes = "filters") {
                li {
                    a(classes = "selected") {
                        href = "#"
                        + "All"
                    }
                }
                li {
                    a {
                        href = "#"
                        + "Active"
                    }
                }
                li {
                    a(classes = "selected") {
                        href = "#"
                        + "Completed"
                    }
                }
            }
            button(classes = "clear-completed") {
                + "Clear completed"
            }
        }
    }

}

fun main(args: Array<String>) {
    Komp.create(document.body!!, TodoApp(), true)
}
