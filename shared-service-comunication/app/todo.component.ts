import {Component, Input, Output, EventEmitter, ContentChild,ViewChild, ViewChildren, AfterViewInit, QueryList} from '@angular/core';
import {NgModel, FORM_DIRECTIVES} from '@angular/common';

interface Todo {
  title: string;
  completed: boolean;
}

class TodoList {
  private todos: Todo[] = [];
  add(todo: Todo) {
    this.todos.push(todo);
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  set(todo: Todo, index: number) {
    this.todos[index] = todo;
  }
  get(index: number) {
    return this.todos[index];
  }
  getAll() {
    return this.todos;
  }
}

@Component({
  selector: 'todo',
  template: `
    <div>
      <input type="checkbox"
        [(ngModel)]="todo.completed"
        (change)="completionChanged(todo)">
      {{todo.title}}
    </div>
  `
})
class TodoCmp {
  @Output() onCompletionChange = new EventEmitter<Todo>();
  @Input() todo: Todo;
  completionChanged(todo) {
    this.onCompletionChange.emit(todo);
  }
}

@Component({
  selector: 'todo-input',
  directives:  FORM_DIRECTIVES,
  template: `
    <input type="text" [(ngModel)]="title" [ngModelOptions]="{standalone: true}" ngDefaultControl>
    <button (click)="addTodo()">Add</button>
  `
})
class TodoInputCmp {
  title: string;
  @Output() onTodo = new EventEmitter<Todo>();
  addTodo() {
    this.onTodo.emit({
      title: this.title,
      completed: false
    });
    this.title = '';
  }
}

@Component({
  selector: 'footer',
  template: '<ng-content></ng-content>'
})
class Footer {
  constructor(private todos: TodoList) {}
}

@Component({
  selector: 'todo-app',
  providers: [TodoList],
  directives: [TodoCmp, TodoInputCmp],
  template: `
    <section>
      Add todo:
      <todo-input (onTodo)="addTodo($event)"></todo-input>
    </section>
    <section>
      <h4 *ngIf="todos.getAll().length">Todo list</h4>
      <todo *ngFor="let todo of todos.getAll()" [todo]="todo">
      </todo>
    </section>
    <ng-content select="footer"></ng-content>
  `
})
class TodoAppCmp implements AfterViewInit {
  @ViewChild(TodoInputCmp) inputComponent: TodoInputCmp
  @ViewChildren(TodoCmp) todoComponents: QueryList<TodoCmp>;
  @ContentChild(Footer) footer: Footer;


  constructor(private todos: TodoList) {}
  addTodo(todo) {
    this.todos.add(todo);
  }
  ngAfterViewInit() {
    console.log(this.inputComponent);
    console.log(this.todoComponents);

    console.log(this.footer);
  }
}

@Component({
  selector: 'my-app',
  styles: [
    'todo-app { margin-top: 20px; margin-left: 20px; }'
  ],
  template: `
    <content>
      <todo-app>
        <footer>
          <small>Yet another todo app!</small>
        </footer>
      </todo-app>
    </content>
  `,
  directives: [TodoAppCmp, NgModel, Footer]
})
export class AppCmp {}