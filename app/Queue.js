'use strict';

class Queue {
  constructor() {
		this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
  }

  enqueue(element) {
  	console.log("Enqueuing item.")
    this._storage[this._newestIndex] = element;
    this._newestIndex++;
    console.log("Item enqueued.")
  }

  dequeue() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 				console.log("Dequeuing item.")
        return deletedData;
    } else {
    	console.log("Queue empty")
    }
  }

  size() {
  	var sz = this._newestIndex - this._oldestIndex
  	console.log("Queue has "+ sz + " elements inside it.")
    return this._newestIndex - this._oldestIndex;
  }

}
function queue(){
	var q = new Queue()
	return q
}
module.exports.Queue = queue;