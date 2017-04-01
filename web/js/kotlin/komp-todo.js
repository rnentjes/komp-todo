if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'komp-todo'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'komp-todo'.");
}
this['komp-todo'] = function (_, Kotlin) {
  'use strict';
  Kotlin.defineModule('komp-todo', _);
  return _;
}(typeof this['komp-todo'] === 'undefined' ? {} : this['komp-todo'], kotlin);

//@ sourceMappingURL=komp-todo.js.map
