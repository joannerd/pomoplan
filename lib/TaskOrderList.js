class TaskNode {
  constructor(id) {
    this.id = id;
    this.next = null;
    this.previous = null;
  }
}

class TaskOrderList {
  constructor(taskIds) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    taskIds.forEach(id => this.addTaskOrder(id));
  }

  addTaskOrder(taskId) {
    const node = new TaskNode(taskId);

    if (!this.head) {
      this.head = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  updateTaskOrder(startId, endId) {
    const startNode = this.findNodeById(startId);
    const endNode = this.findNodeById(endId);
    startNode.previous = null;
    startNode.next = null;
    endNode.next = startNode;
    startNode.next = endNode.next;
    startNode.previous = endNode;

    return this;
  }

  findNodeById(id) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.id === id) return currentNode;
      currentNode = currentNode.next;
    }

    return null;
  }

  toObject() {
    if (!this.head) return {};

    const taskOrder = {};
    let currentNode = this.head;

    for (let order = 1; order < this.length + 1; order++) {
      taskOrder[order] = currentNode.id;
      currentNode = currentNode.next;
    }
    return taskOrder;
  }
}

export default TaskOrderList;
