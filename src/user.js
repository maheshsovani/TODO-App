const fs = require("fs");

class Item {
  constructor(content, id, status) {
    this.content = content;
    this.id = id;
    this.status = status;
  }
}

class User {
  constructor(userId, password, todoLists) {
    this.userId = userId;
    this.password = password;
    this.todoLists = todoLists;
  }
  addList(list) {
    this.todoLists.push(list);
  }

  match(password) {
    return this.password == password;     
  }

  parse(data) {
    return JSON.parse(data);
  }

  stringify(data) {
    return JSON.stringify(data);
  }

  getFile(callback) {
    fs.readFile(this.file, "utf8", callback);
  }

  getTitle(element) {
    return element.title;
  }

  getListTitles() {
    let listTitles = this.todoLists.map(this.getTitle);
    return listTitles;
  }

  getList(listname) {
    let list = this.todoLists.filter(todoList => todoList.title == listname);
    return list[0];
  }

  removeList(list) {
    let listIndex = this.todoLists.findIndex(function(todolist) {
      return JSON.stringify(todolist) == JSON.stringify(list);
    });
    this.todoLists.splice(listIndex, 1);
  }
}

class List {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.items = new Array();
  }

  replaceItems(items) {
    this.items = items;
  }

  getNextItemId() {
    const itemsLength = this.items.length;
    const lastItem = this.items[itemsLength - 1];
    return (lastItem && lastItem.id + 1) || 1;
  }

  addItem({ status, content }) {
    const itemId = this.getNextItemId();
    let item = new Item(content, itemId, status);
    this.items.push(item);
  }

  doneItem(item) {
    item.status = "done";
  }

  undoneItem(item) {
    item.status = "undone";
  }

  removeItem(item) {
    let itemIndex = this.items.indexOf(item);
    this.items.splice(itemIndex, 1);
  }
}

module.exports = { Item, User, List };
