if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'komp-todo'.");
}
if (typeof komp === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'komp' was not found. Please, check whether 'komp' is loaded prior to 'komp-todo'.");
}
if (typeof this['kotlinx-html-js'] === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'kotlinx-html-js' was not found. Please, check whether 'kotlinx-html-js' is loaded prior to 'komp-todo'.");
}
this['komp-todo'] = function (_, Kotlin, $module$komp, $module$kotlinx_html_js) {
  'use strict';
  var Enum = Kotlin.kotlin.Enum;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_mqih57$;
  var Komponent = $module$komp.nl.astraeus.komp.Komponent;
  var h1 = $module$kotlinx_html_js.kotlinx.html.h1_vmej1w$;
  var set_id = $module$kotlinx_html_js.kotlinx.html.set_id_ueiko3$;
  var set_onKeyPressFunction = $module$kotlinx_html_js.kotlinx.html.js.set_onKeyPressFunction_pszlq2$;
  var input = $module$kotlinx_html_js.kotlinx.html.input_e1g74z$;
  var header = $module$kotlinx_html_js.kotlinx.html.header_8btlf7$;
  var InputType = $module$kotlinx_html_js.kotlinx.html.InputType;
  var label = $module$kotlinx_html_js.kotlinx.html.label_yd75js$;
  var get_classes = $module$kotlinx_html_js.kotlinx.html.get_classes_fxodxh$;
  var plus = Kotlin.kotlin.collections.plus_xfiyik$;
  var set_classes = $module$kotlinx_html_js.kotlinx.html.set_classes_njy09m$;
  var set_onClickFunction = $module$kotlinx_html_js.kotlinx.html.js.set_onClickFunction_pszlq2$;
  var set_onDoubleClickFunction = $module$kotlinx_html_js.kotlinx.html.js.set_onDoubleClickFunction_pszlq2$;
  var button = $module$kotlinx_html_js.kotlinx.html.button_whohl6$;
  var div = $module$kotlinx_html_js.kotlinx.html.div_ri36nr$;
  var li = $module$kotlinx_html_js.kotlinx.html.li_yzv5uh$;
  var ul = $module$kotlinx_html_js.kotlinx.html.ul_pzlyaf$;
  var section = $module$kotlinx_html_js.kotlinx.html.section_ac1jhf$;
  var strong = $module$kotlinx_html_js.kotlinx.html.strong_okpg28$;
  var span = $module$kotlinx_html_js.kotlinx.html.span_6djfml$;
  var a = $module$kotlinx_html_js.kotlinx.html.a_gu26kr$;
  var footer = $module$kotlinx_html_js.kotlinx.html.footer_780ap1$;
  var section_0 = $module$kotlinx_html_js.kotlinx.html.js.section_ceckl$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var get_create = $module$kotlinx_html_js.kotlinx.html.dom.get_create_4wc2mh$;
  var div_0 = $module$kotlinx_html_js.kotlinx.html.js.div_wkomt5$;
  var komp = $module$komp.nl.astraeus.komp;
  Selection.prototype = Object.create(Enum.prototype);
  Selection.prototype.constructor = Selection;
  TodoApp.prototype = Object.create(Komponent.prototype);
  TodoApp.prototype.constructor = TodoApp;
  function Todo(dataId, title, completed, editing) {
    if (completed === void 0)
      completed = false;
    if (editing === void 0)
      editing = false;
    this.dataId = dataId;
    this.title = title;
    this.completed = completed;
    this.editing = editing;
  }
  Todo.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Todo',
    interfaces: []
  };
  function Selection(name, ordinal, title) {
    Enum.call(this);
    this.title = title;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Selection_initFields() {
    Selection_initFields = function () {
    };
    Selection$ALL_instance = new Selection('ALL', 0, 'All');
    Selection$ACTIVE_instance = new Selection('ACTIVE', 1, 'Active');
    Selection$COMPLETED_instance = new Selection('COMPLETED', 2, 'Completed');
  }
  var Selection$ALL_instance;
  function Selection$ALL_getInstance() {
    Selection_initFields();
    return Selection$ALL_instance;
  }
  var Selection$ACTIVE_instance;
  function Selection$ACTIVE_getInstance() {
    Selection_initFields();
    return Selection$ACTIVE_instance;
  }
  var Selection$COMPLETED_instance;
  function Selection$COMPLETED_getInstance() {
    Selection_initFields();
    return Selection$COMPLETED_instance;
  }
  Selection.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Selection',
    interfaces: [Enum]
  };
  function Selection$values() {
    return [Selection$ALL_getInstance(), Selection$ACTIVE_getInstance(), Selection$COMPLETED_getInstance()];
  }
  Selection.values = Selection$values;
  function Selection$valueOf(name) {
    switch (name) {
      case 'ALL':
        return Selection$ALL_getInstance();
      case 'ACTIVE':
        return Selection$ACTIVE_getInstance();
      case 'COMPLETED':
        return Selection$COMPLETED_getInstance();
      default:Kotlin.throwISE('No enum constant nl.astraeus.komp.todo.Selection.' + name);
    }
  }
  Selection.valueOf_61zpoe$ = Selection$valueOf;
  function TodoApp() {
    Komponent.call(this);
    this.todoList = ArrayList_init_0();
    this.selected = Selection$ALL_getInstance();
  }
  TodoApp.prototype.addTodo_9ojx7i$ = function (e) {
    var target = e.target;
    if (Kotlin.isType(target, HTMLInputElement)) {
      this.todoList.add_11rb$(new Todo((new Date()).getTime().toString(), target.value));
      this.refresh();
    }
  };
  TodoApp.prototype.editTodo_y98rgd$ = function (e, todo) {
    var target = e.target;
    if (Kotlin.isType(target, HTMLInputElement)) {
      todo.title = target.value;
      todo.editing = false;
      this.refresh();
    }
  };
  TodoApp.prototype.destroyTodo_bcvlxp$ = function (todo) {
    this.todoList.remove_11rb$(todo);
    this.refresh();
  };
  TodoApp.prototype.selectSelection_uh5ef5$ = function (selection) {
    this.selected = selection;
    this.refresh();
  };
  TodoApp.prototype.clearCompleted = function () {
    var tmp$;
    tmp$ = ArrayList_init(this.todoList).iterator();
    while (tmp$.hasNext()) {
      var todo = tmp$.next();
      if (todo.completed) {
        this.todoList.remove_11rb$(todo);
      }
    }
    this.refresh();
  };
  TodoApp.prototype.todoClicked_bcvlxp$ = function (todo) {
    todo.completed = !todo.completed;
    this.refresh();
  };
  TodoApp.prototype.getItemsLeft = function () {
    var tmp$;
    var result = 0;
    tmp$ = this.todoList.iterator();
    while (tmp$.hasNext()) {
      var todo = tmp$.next();
      if (!todo.completed) {
        result = result + 1 | 0;
      }
    }
    return result;
  };
  TodoApp.prototype.setEditing_bcvlxp$ = function (editTodo) {
    var tmp$;
    tmp$ = this.todoList.iterator();
    while (tmp$.hasNext()) {
      var todo = tmp$.next();
      todo.editing = Kotlin.equals(todo, editTodo);
    }
    this.refresh();
  };
  TodoApp.prototype.refresh = function () {
    Komponent.prototype.refresh.call(this);
    var inputBox = document.getElementById('todo_input');
    if (Kotlin.isType(inputBox, HTMLInputElement)) {
      inputBox.focus();
    }
  };
  function TodoApp$render$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('todos');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda(this$TodoApp) {
    return function (e) {
      if (Kotlin.isType(e, KeyboardEvent) && e.keyCode === 13) {
        this$TodoApp.addTodo_9ojx7i$(e);
      }
    };
  }
  function TodoApp$render$lambda$lambda$lambda_0(this$TodoApp) {
    return function ($receiver) {
      set_id($receiver, 'todo_input');
      $receiver.placeholder = 'What needs to be done?';
      $receiver.autoFocus = true;
      set_onKeyPressFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda(this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda(this$TodoApp) {
    return function ($receiver) {
      h1($receiver, void 0, TodoApp$render$lambda$lambda$lambda);
      input($receiver, void 0, void 0, void 0, void 0, 'new-todo', TodoApp$render$lambda$lambda$lambda_0(this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda_1($receiver) {
    $receiver.type = InputType.checkBox;
  }
  function TodoApp$render$lambda$lambda$lambda_2($receiver) {
    $receiver.for_ = 'toggle-all';
    $receiver.unaryPlus_pdl1vz$('Mark all as complete');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp) {
    return function (e) {
      if (Kotlin.isType(e, KeyboardEvent) && e.keyCode === 13) {
        this$TodoApp.editTodo_y98rgd$(e, closure$todo);
      }
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp) {
    return function ($receiver) {
      $receiver.value = closure$todo.title;
      set_onKeyPressFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp) {
    return function (it) {
      this$TodoApp.todoClicked_bcvlxp$(closure$todo);
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp) {
    return function ($receiver) {
      $receiver.type = InputType.checkBox;
      $receiver.checked = closure$todo.completed;
      set_onClickFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp) {
    return function (it) {
      this$TodoApp.setEditing_bcvlxp$(closure$todo);
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$todo, this$TodoApp) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(closure$todo.title);
      set_onDoubleClickFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$todo, this$TodoApp) {
    return function (it) {
      this$TodoApp.destroyTodo_bcvlxp$(closure$todo);
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_2(closure$todo, this$TodoApp) {
    return function ($receiver) {
      set_onClickFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$todo, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp) {
    return function ($receiver) {
      input($receiver, void 0, void 0, void 0, void 0, 'toggle', TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp));
      label($receiver, 'todo-content', TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$todo, this$TodoApp));
      button($receiver, void 0, void 0, void 0, 'destroy', TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_2(closure$todo, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp) {
    return function ($receiver) {
      if (closure$todo.editing) {
        set_classes($receiver, plus(get_classes($receiver), 'editing'));
        input($receiver, void 0, void 0, void 0, void 0, 'edit', TodoApp$render$lambda$lambda$lambda$lambda$lambda(closure$todo, this$TodoApp));
      }
       else {
        if (closure$todo.completed) {
          set_classes($receiver, plus(get_classes($receiver), 'completed'));
        }
        var $receiver_0 = $receiver.attributes;
        var value = closure$todo.dataId;
        $receiver_0.put_xwzc9p$('data-id', value);
        div($receiver, 'view', TodoApp$render$lambda$lambda$lambda$lambda$lambda_0(closure$todo, this$TodoApp));
      }
    };
  }
  function TodoApp$render$lambda$lambda$lambda_3(this$TodoApp) {
    return function ($receiver) {
      var tmp$;
      tmp$ = this$TodoApp.todoList.iterator();
      while (tmp$.hasNext()) {
        var todo = tmp$.next();
        if (this$TodoApp.selected === Selection$ALL_getInstance() || (todo.completed && this$TodoApp.selected === Selection$COMPLETED_getInstance()) || (!todo.completed && this$TodoApp.selected === Selection$ACTIVE_getInstance())) {
          li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_0(todo, this$TodoApp));
        }
      }
    };
  }
  function TodoApp$render$lambda$lambda_0(this$TodoApp) {
    return function ($receiver) {
      input($receiver, void 0, void 0, void 0, void 0, 'toggle-all', TodoApp$render$lambda$lambda$lambda_1);
      label($receiver, void 0, TodoApp$render$lambda$lambda$lambda_2);
      ul($receiver, 'todo-list', TodoApp$render$lambda$lambda$lambda_3(this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_1(this$TodoApp) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(this$TodoApp.getItemsLeft().toString());
    };
  }
  function TodoApp$render$lambda$lambda$lambda_4(this$TodoApp) {
    return function ($receiver) {
      strong($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_1(this$TodoApp));
      $receiver.unaryPlus_pdl1vz$(' item left');
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_3(closure$selection, this$TodoApp) {
    return function (it) {
      this$TodoApp.selectSelection_uh5ef5$(closure$selection);
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_1(closure$selection, this$TodoApp) {
    return function ($receiver) {
      if (closure$selection === this$TodoApp.selected) {
        set_classes($receiver, plus(get_classes($receiver), 'selected'));
      }
      $receiver.href = '#';
      $receiver.unaryPlus_pdl1vz$(closure$selection.title);
      set_onClickFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_3(closure$selection, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_2(closure$selection, this$TodoApp) {
    return function ($receiver) {
      a($receiver, void 0, void 0, void 0, TodoApp$render$lambda$lambda$lambda$lambda$lambda_1(closure$selection, this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda$lambda_5(this$TodoApp) {
    return function ($receiver) {
      var tmp$, tmp$_0;
      tmp$ = Selection$values();
      for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
        var selection = tmp$[tmp$_0];
        li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_2(selection, this$TodoApp));
      }
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_3(this$TodoApp) {
    return function (it) {
      this$TodoApp.clearCompleted();
    };
  }
  function TodoApp$render$lambda$lambda$lambda_6(this$TodoApp) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$('Clear completed');
      set_onClickFunction($receiver, TodoApp$render$lambda$lambda$lambda$lambda_3(this$TodoApp));
    };
  }
  function TodoApp$render$lambda$lambda_1(this$TodoApp) {
    return function ($receiver) {
      span($receiver, 'todo-count', TodoApp$render$lambda$lambda$lambda_4(this$TodoApp));
      ul($receiver, 'filters', TodoApp$render$lambda$lambda$lambda_5(this$TodoApp));
      button($receiver, void 0, void 0, void 0, 'clear-completed', TodoApp$render$lambda$lambda$lambda_6(this$TodoApp));
    };
  }
  function TodoApp$render$lambda(this$TodoApp) {
    return function ($receiver) {
      header($receiver, 'header', TodoApp$render$lambda$lambda(this$TodoApp));
      section($receiver, 'main', TodoApp$render$lambda$lambda_0(this$TodoApp));
      footer($receiver, 'footer', TodoApp$render$lambda$lambda_1(this$TodoApp));
    };
  }
  TodoApp.prototype.render_q0cphf$ = function (consumer) {
    return section_0(consumer, 'todoapp', TodoApp$render$lambda(this));
  };
  TodoApp.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'TodoApp',
    interfaces: [Komponent]
  };
  function main$lambda$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('Test');
  }
  function main$lambda$lambda$lambda($receiver) {
    set_id($receiver, 'id1');
    span($receiver, void 0, main$lambda$lambda$lambda$lambda);
  }
  function main$lambda$lambda($receiver) {
    div($receiver, void 0, main$lambda$lambda$lambda);
  }
  function main$lambda($receiver) {
    div($receiver, void 0, main$lambda$lambda);
  }
  function main$lambda$lambda$lambda_0($receiver) {
    $receiver.unaryPlus_pdl1vz$('Test');
  }
  function main$lambda$lambda$lambda_1($receiver) {
    $receiver.name = 'bla';
  }
  function main$lambda$lambda_0($receiver) {
    set_id($receiver, 'id1');
    span($receiver, void 0, main$lambda$lambda$lambda_0);
    input($receiver, void 0, void 0, void 0, void 0, void 0, main$lambda$lambda$lambda_1);
  }
  function main$lambda_0($receiver) {
    div($receiver, void 0, main$lambda$lambda_0);
  }
  function main(args) {
    var tmp$;
    Komponent.Companion.create_nkol39$((tmp$ = document.body) != null ? tmp$ : Kotlin.throwNPE(), new TodoApp(), true);
    var el1 = div_0(get_create(document), void 0, main$lambda);
    var el2 = div_0(get_create(document), void 0, main$lambda_0);
    console.log('OLD', el1);
    console.log('NEW', el2);
    komp.DomDiffer.replaceDiff_aifv3w$(el2, el1);
    console.log('OLD', el1);
    console.log('NEW', el2);
  }
  var package$nl = _.nl || (_.nl = {});
  var package$astraeus = package$nl.astraeus || (package$nl.astraeus = {});
  var package$komp = package$astraeus.komp || (package$astraeus.komp = {});
  var package$todo = package$komp.todo || (package$komp.todo = {});
  package$todo.Todo = Todo;
  Object.defineProperty(Selection, 'ALL', {
    get: Selection$ALL_getInstance
  });
  Object.defineProperty(Selection, 'ACTIVE', {
    get: Selection$ACTIVE_getInstance
  });
  Object.defineProperty(Selection, 'COMPLETED', {
    get: Selection$COMPLETED_getInstance
  });
  package$todo.Selection = Selection;
  package$todo.TodoApp = TodoApp;
  package$todo.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('komp-todo', _);
  return _;
}(typeof this['komp-todo'] === 'undefined' ? {} : this['komp-todo'], kotlin, komp, this['kotlinx-html-js']);

//# sourceMappingURL=komp-todo.js.map
