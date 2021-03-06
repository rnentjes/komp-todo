An example on how to build a single page app with Kotlin (javascript) using static html builders.

Runing example: [komp-todo](http://todo.astraeus.nl/)

Compare it with other js frameworks: [https://github.com/tastejs/todomvc/](https://github.com/tastejs/todomvc/)

You can also find an example of a complete application here: [simple-password-manager](https://github.com/rnentjes/simple-password-manager)

Dependencies:

* [kotlinx-html-js](https://github.com/Kotlin/kotlinx.html)
* [komponent](https://github.com/rnentjes/komponent)

Complete source:

```kotlin
package nl.astraeus.komp.todo

import kotlinx.html.HtmlBlockTag
import kotlinx.html.InputType
import kotlinx.html.TagConsumer
import kotlinx.html.a
import kotlinx.html.button
import kotlinx.html.classes
import kotlinx.html.div
import kotlinx.html.footer
import kotlinx.html.h1
import kotlinx.html.header
import kotlinx.html.id
import kotlinx.html.input
import kotlinx.html.js.onClickFunction
import kotlinx.html.js.onDoubleClickFunction
import kotlinx.html.js.onKeyPressFunction
import kotlinx.html.label
import kotlinx.html.li
import kotlinx.html.section
import kotlinx.html.span
import kotlinx.html.strong
import kotlinx.html.ul
import nl.astraeus.komp.Komponent
import nl.astraeus.komp.include
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
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

fun HtmlBlockTag.todo(app: TodoApp, todo: Todo) {
  this.include(TodoKomponent(app, todo))
}

class TodoKomponent(
    val app: TodoApp,
    val todo: Todo
) : Komponent() {

  override fun render(consumer: TagConsumer<HTMLElement>) = consumer.li {
    if (todo.editing) {
      classes += "editing"
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
        classes += "completed"
      }
      attributes["data-id"] = todo.dataId
      div(classes = "view") {
        input(classes = "toggle") {
          type = InputType.checkBox
          checked = todo.completed
          onClickFunction = {
            app.todoClicked(todo)
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

class TodoApp : Komponent() {
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
      h1 { +"todos" }
      input(classes = "new-todo") {
        id = "todo_input"
        placeholder = "What needs to be done?"
        autoFocus = true
        onKeyPressFunction = { e ->
          val target = e.target
          if (target is HTMLInputElement && e is KeyboardEvent && e.keyCode == 13 && target.value.isNotBlank()) {
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
        +"Mark all as complete"
      }
      ul(classes = "todo-list") {
        for (todo in todoList) {
          if (selected == Selection.ALL ||
              (todo.completed && selected == Selection.COMPLETED) ||
              (!todo.completed && selected == Selection.ACTIVE)) {
            todo(this@TodoApp, todo)
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
                classes += "selected"
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

fun main() {
  Komponent.create(document.body!!, TodoApp(), true)
}
```
