import { linkedList } from "./linked-lists.js"

class HashMap {
    constructor(loadFactor = 0.8, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        
        this.totalItems = 0
        this.buckets = []
        this.initializeBucckets()
    }

    // Helpers

    initializeBucckets() {
        for (let i = 0; i < this.capacity; i++) {
            const list = linkedList()
            this.buckets.push(list)
        }
    }

    add(key, value, index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        this.totalItems++
        this.doubleCapacity()

        this.buckets[index].append({key, value})
    }

    delete(index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        this.totalItems--
        this.buckets[index].clear()
    }

    doubleCapacity() {
        if (this.totalItems >= this.capacity * this.loadFactor) {
            this.capacity *= 2
            console.log("It's time to double the capacity")

            // TODO: reasign elements
        }
    }

    // Functions
    
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 17;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode
    }

    set(key, value) {
        const hashCode = this.hash(key)
        console.log(`key: ${key} hashcode: ${hashCode}`)

        if (!this.has(key)) {
            this.add(key, value, hashCode)
            return
        } 
        
        console.log(`!!! CONFLICT !!!`)
        const existingList = this.buckets[hashCode]
        existingList.replace(key, value) 
        
    }

    get(key) {
        const hashCode = this.hash(key)

        return this.has(key) ? this.buckets[hashCode].value : null
    }

    has(key) {
        const hashCode = this.hash(key)
        const list = this.buckets[hashCode]

        return list.containsKey(key)
    }

    remove(key) {
        if (this.has(key)) {
            // TODO: Esto no es tan simple, ¿qué pasa si hay linkedList?
            this.delete(this.hash(key))
            return true
        }

        return false
    }

    get length() {
        return this.totalItems
    }

    clear() {
        for (const list of this.buckets) {
            list.clear()
        }
    }

    get keys() {
        const keys = []
        for (const list of this.entries) {
            // TODO: Get all keys of list
            // keys.push(list.key)
        }

        return keys
    }

    get values() {
        const values = []
        for (const list of this.entries) {
            // TODO: Get all values of list
            // values.push(list.value)
        }

        return values
    }

    get entries() {
        const entries = []
        for (const list of this.buckets) {
            if (list.size() !== 0) {
                entries.push(list)
                list.toString()
            }
        }

        return entries
    }

}

const test = new HashMap(0.8, 16)
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('elephant', 'blue')

test.entries