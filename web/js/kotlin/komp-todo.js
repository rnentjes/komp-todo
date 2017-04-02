if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'komp-todo'.");
}
if (typeof this['kotlinx-html-js'] === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'kotlinx-html-js' was not found. Please, check whether 'kotlinx-html-js' is loaded prior to 'komp-todo'.");
}
if (typeof komp === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'komp' was not found. Please, check whether 'komp' is loaded prior to 'komp-todo'.");
}
this['komp-todo'] = function (_, Kotlin, $module$kotlinx_html_js, $module$komp) {
  'use strict';
  var h1 = $module$kotlinx_html_js.kotlinx.html.h1_vmej1w$;
  var input = $module$kotlinx_html_js.kotlinx.html.input_e1g74z$;
  var header = $module$kotlinx_html_js.kotlinx.html.header_8btlf7$;
  var InputType = $module$kotlinx_html_js.kotlinx.html.InputType;
  var label = $module$kotlinx_html_js.kotlinx.html.label_yd75js$;
  var get_classes = $module$kotlinx_html_js.kotlinx.html.get_classes_fxodxh$;
  var plus = Kotlin.kotlin.collections.plus_xfiyik$;
  var set_classes = $module$kotlinx_html_js.kotlinx.html.set_classes_njy09m$;
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
  var HtmlComponent = $module$komp.nl.astraeus.komp.HtmlComponent;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var komp_0 = $module$komp.nl.astraeus.komp;
  TodoApp.prototype = Object.create(HtmlComponent.prototype);
  TodoApp.prototype.constructor = TodoApp;
  function Todo(dataId, title, completed) {
    this.dataId = dataId;
    this.title = title;
    this.completed = completed;
  }
  Todo.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Todo',
    interfaces: []
  };
  function TodoApp() {
    HtmlComponent.call(this);
    this.todos = ArrayList_init();
  }
  function TodoApp$render$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('todos');
  }
  function TodoApp$render$lambda$lambda$lambda_0($receiver) {
    $receiver.placeholder = 'What needs to be done?';
    $receiver.autoFocus = true;
  }
  function TodoApp$render$lambda$lambda($receiver) {
    h1($receiver, void 0, TodoApp$render$lambda$lambda$lambda);
    input($receiver, void 0, void 0, void 0, void 0, 'new-todo', TodoApp$render$lambda$lambda$lambda_0);
  }
  function TodoApp$render$lambda$lambda$lambda_1($receiver) {
    $receiver.type = InputType.checkBox;
  }
  function TodoApp$render$lambda$lambda$lambda_2($receiver) {
    $receiver.for_ = 'toggle-all';
    $receiver.unaryPlus_pdl1vz$('Mark all as complete');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo) {
    return function ($receiver) {
      $receiver.type = InputType.checkBox;
      $receiver.checked = closure$todo.completed;
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(closure$todo.title);
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda(closure$todo) {
    return function ($receiver) {
      input($receiver, void 0, void 0, void 0, void 0, 'toggle', TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda(closure$todo));
      label($receiver, 'todo-content', TodoApp$render$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$todo));
      button($receiver, void 0, void 0, void 0, 'destroy');
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_0(closure$todo) {
    return function ($receiver) {
      $receiver.value = closure$todo.title;
    };
  }
  function TodoApp$render$lambda$lambda$lambda$lambda(closure$todo) {
    return function ($receiver) {
      if (closure$todo.completed) {
        set_classes($receiver, plus(get_classes($receiver), 'completed'));
      }
      var $receiver_0 = $receiver.attributes;
      var value = closure$todo.dataId;
      $receiver_0.put_xwzc9p$('data-id', value);
      div($receiver, 'view', TodoApp$render$lambda$lambda$lambda$lambda$lambda(closure$todo));
      input($receiver, void 0, void 0, void 0, void 0, 'edit', TodoApp$render$lambda$lambda$lambda$lambda$lambda_0(closure$todo));
    };
  }
  function TodoApp$render$lambda$lambda$lambda_3(this$TodoApp) {
    return function ($receiver) {
      var tmp$;
      tmp$ = this$TodoApp.todos.iterator();
      while (tmp$.hasNext()) {
        var todo = tmp$.next();
        li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda(todo));
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
  function TodoApp$render$lambda$lambda$lambda$lambda_0($receiver) {
    $receiver.unaryPlus_pdl1vz$('0');
  }
  function TodoApp$render$lambda$lambda$lambda_4($receiver) {
    strong($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_0);
    $receiver.unaryPlus_pdl1vz$(' item left');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_1($receiver) {
    $receiver.href = '#';
    $receiver.unaryPlus_pdl1vz$('All');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_1($receiver) {
    a($receiver, void 0, void 0, 'selected', TodoApp$render$lambda$lambda$lambda$lambda$lambda_1);
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_2($receiver) {
    $receiver.href = '#';
    $receiver.unaryPlus_pdl1vz$('Active');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_2($receiver) {
    a($receiver, void 0, void 0, void 0, TodoApp$render$lambda$lambda$lambda$lambda$lambda_2);
  }
  function TodoApp$render$lambda$lambda$lambda$lambda$lambda_3($receiver) {
    $receiver.href = '#';
    $receiver.unaryPlus_pdl1vz$('Completed');
  }
  function TodoApp$render$lambda$lambda$lambda$lambda_3($receiver) {
    a($receiver, void 0, void 0, 'selected', TodoApp$render$lambda$lambda$lambda$lambda$lambda_3);
  }
  function TodoApp$render$lambda$lambda$lambda_5($receiver) {
    li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_1);
    li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_2);
    li($receiver, void 0, TodoApp$render$lambda$lambda$lambda$lambda_3);
  }
  function TodoApp$render$lambda$lambda$lambda_6($receiver) {
    $receiver.unaryPlus_pdl1vz$('Clear completed');
  }
  function TodoApp$render$lambda$lambda_1($receiver) {
    span($receiver, 'todo-count', TodoApp$render$lambda$lambda$lambda_4);
    ul($receiver, 'filters', TodoApp$render$lambda$lambda$lambda_5);
    button($receiver, void 0, void 0, void 0, 'clear-completed', TodoApp$render$lambda$lambda$lambda_6);
  }
  function TodoApp$render$lambda(this$TodoApp) {
    return function ($receiver) {
      header($receiver, 'header', TodoApp$render$lambda$lambda);
      section($receiver, 'main', TodoApp$render$lambda$lambda_0(this$TodoApp));
      footer($receiver, 'footer', TodoApp$render$lambda$lambda_1);
    };
  }
  TodoApp.prototype.render_q0cphf$ = function (consumer) {
    return section_0(consumer, 'todoapp', TodoApp$render$lambda(this));
  };
  TodoApp.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'TodoApp',
    interfaces: [HtmlComponent]
  };
  function main(args) {
    var tmp$;
    komp_0.Komp.create_og2ns8$((tmp$ = document.body) != null ? tmp$ : Kotlin.throwNPE(), new TodoApp(), true);
  }
  var package$nl = _.nl || (_.nl = {});
  var package$astraeus = package$nl.astraeus || (package$nl.astraeus = {});
  var package$komp = package$astraeus.komp || (package$astraeus.komp = {});
  var package$todo = package$komp.todo || (package$komp.todo = {});
  package$todo.Todo = Todo;
  package$todo.TodoApp = TodoApp;
  package$todo.main_kand9s$ = main;
  Kotlin.defineModule('komp-todo', _);
  main([]);
  return _;
}(typeof this['komp-todo'] === 'undefined' ? {} : this['komp-todo'], kotlin, this['kotlinx-html-js'], komp);

//@ sourceMappingURL=komp-todo.js.map
