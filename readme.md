An example on how to build a single page app with Kotlin (javascript) using static html builders.

Runing example: [komp-todo](http://todo.astraeus.nl/)

Compare it with other js frameworks: [https://github.com/tastejs/todomvc/](https://github.com/tastejs/todomvc/)

You can also find an example of a complete application here: [simple-password-manager](https://github.com/rnentjes/simple-password-manager)

Dependencies:

* [kotlinx-html-js](https://github.com/Kotlin/kotlinx.html)
* [komponent](https://github.com/rnentjes/komponent)

This is the complete source:

```kotlin
package nl.astraeus.komp.todo

import kotlinx.browser.document
import kotlinx.html.*
import kotlinx.html.js.onClickFunction
import kotlinx.html.js.onDoubleClickFunction
import kotlinx.html.js.onKeyPressFunction
import nl.astraeus.komp.HtmlBuilder
import nl.astraeus.komp.Komponent
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.js.Date

/**
 * see: https://github.com/tastejs/todomvc/
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

class TodoKomponent(
  val app: TodoApp,
  val todo: Todo
) : Komponent() {

  override fun HtmlBuilder.render() {
    li {
      if (todo.editing) {
        classes = classes + "editing"
        input(classes = "edit") {
          value = todo.title
          onKeyPressFunction = { e ->
            val target = e.target
            if (target is HTMLInputElement && e is KeyboardEvent && e.keyCode == 13 && target.value.isNotBlank()) {
              app.editTodo(e, todo)
            }
          }
        }
      } else {
        if (todo.completed) {
          classes = classes + "completed"
        }
        div(classes = "view") {
          input(classes = "toggle") {
            type = InputType.checkBox
            checked = todo.completed
            onClickFunction = {
              app.todoClicked(todo)
              it.preventDefault()
            }
          }
          label(classes = "todo-content") {
            +todo.title

            onDoubleClickFunction = {
              app.setEditing(todo)
            }
          }
          button(classes = "destroy") {
            onClickFunction = {
              app.destroyTodo(todo)
            }
          }
        }
      }
    }
  }

}

class TodoApp : Komponent() {
  val todoList: MutableList<Todo> = ArrayList()
  var selected: Selection = Selection.ALL

  fun addTodo(e: Event) {
    val target = e.target

    if (target is HTMLInputElement) {
      todoList.add(Todo("${Date().getTime()}", target.value))

      requestUpdate()
    }
  }

  fun editTodo(e: Event, todo: Todo) {
    val target = e.target

    if (target is HTMLInputElement) {
      todo.title = target.value
      todo.editing = false

      requestUpdate()
    }

  }

  fun destroyTodo(todo: Todo) {
    todoList.remove(todo)

    requestUpdate()
  }

  fun selectSelection(selection: Selection) {
    selected = selection

    requestUpdate()
  }

  fun clearCompleted() {
    for (todo in ArrayList(todoList)) {
      if (todo.completed) {
        todoList.remove(todo)
      }
    }

    requestUpdate()
  }

  fun todoClicked(todo: Todo) {
    todo.completed = !todo.completed

    requestUpdate()
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

    requestUpdate()
  }

  override fun HtmlBuilder.render() {
    section(classes = "todoapp") {
      header(classes = "header") {
        h1 { +"todos" }
        input(classes = "new-todo") {
          id = "todo_input"
          placeholder = "What needs to be done?"
          autoFocus = true
          onKeyPressFunction = { e ->
            val target = e.target
            if (target is HTMLInputElement &&
              e is KeyboardEvent &&
              e.keyCode == 13 &&
              target.value.isNotBlank()
            ) {
              e.preventDefault()
              e.stopPropagation()

              addTodo(e)

              target.value = ""
              target.defaultValue = ""
            }
          }
        }
      }

      section(classes = "main") {
        input(classes = "toggle-all") {
          type = InputType.checkBox
        }
        label {
          htmlFor = "toggle-all"
          + "Mark all as complete"
        }
        ul(classes = "todo-list") {
          for (todo in todoList) {
            if (selected == Selection.ALL ||
              (todo.completed && selected == Selection.COMPLETED) ||
              (!todo.completed && selected == Selection.ACTIVE)) {
              include(TodoKomponent(this@TodoApp, todo))
            }
          }
        }
      }

      footer(classes = "footer") {
        span(classes = "todo-count") {
          strong { +"${getItemsLeft()}" }
          +" item left"
        }
        ul(classes = "filters") {
          for (selection in Selection.values()) {
            li {
              a {
                if (selection == selected) {
                  classes = classes + "selected"
                }
                href = "#"
                +selection.title
                onClickFunction = {
                  selectSelection(selection)
                }
              }
            }
          }
        }
        button(classes = "clear-completed") {
          +"Clear completed"
          onClickFunction = {
            clearCompleted()
          }
        }
      }
    }
  }

}

fun main() {
  Komponent.create(document.body!!, TodoApp())
}
```
