// utils/Queue.ts
export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T, mergeFunction?: (existing: T | undefined, newItem: T) => T): void {
    if (mergeFunction && this.items.length > 0) {
      const lastItem = this.items[this.items.length - 1];
      if (mergeFunction(lastItem, item) === lastItem) {
        // Replace the last item if it has the same ID
        this.items[this.items.length - 1] = item;
        console.log("merged item", item)
        return;
      }
    }
    console.log("added item", item)
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  length(): number {
    return this.items.length;
  }
}

