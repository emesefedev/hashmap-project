import { linkedList } from "./linked-lists.js"

class HashMap {
    constructor(loadFactor = 0.8, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        
        this.buckets = []
        this.initializeBucckets(capacity)
    }

    // Helpers

    initializeBucckets(newBuckets) {
        for (let i = 0; i < newBuckets; i++) {
            const list = linkedList()
            this.buckets.push(list)
        }
    }

    add(key, value, index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        const list = this.getList(index)
        list.append({key, value})

        this.doubleCapacity()    
    }

    getList(index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        return this.buckets[index]
    }

    getListFromKey(key) {
        const hashCode = this.hash(key)
        return this.getList(hashCode)
    }

    doubleCapacity() {
        if (this.length >= this.capacity * this.loadFactor) {
            console.log("It's time to double the capacity")

            this.initializeBucckets(this.capacity)
            this.capacity *= 2

            this.reasingElements()
        }
    }

    reasingElements() {
        const entries = this.entries
        this.clear()
        entries.forEach(([key, value]) => {
            this.reasignElement(key, value)
        })
    }

    reasignElement(key, value) {
        const newHash = this.hash(key)
        this.set(key, value)
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
        if (!this.has(key)) {
            this.add(key, value, this.hash(key))
            return
        } 
        
        const list = this.getListFromKey(key)
        list.replace(key, value)  
    }

    get(key) {
        if (!this.has(key)) {
            return null
        } 

        const list = this.getListFromKey(key)
        return list.getValue(key)
    }

    has(key) {
        const list = this.getListFromKey(key)
        return list.containsKey(key)
    }

    remove(key) {
        if (!this.has(key)) {
            return false
        }

        const list = this.getListFromKey(key)        
        list.removeKey(key)

        return true
    }

    clear() {
        for (const list of this.buckets) {
            list.clear()
        }
    }

    get length() {
        return this.entries.length
    }

    get keys() {
        const keys = []
        for (const keyValue of this.entries) {
            keys.push(keyValue[0])
        }

        return keys
    }

    get values() {
        const values = []
        for (const keyValue of this.entries) {
            values.push(keyValue[1])
        }

        return values
    }

    get entries() {
        const entries = []
        for (const list of this.buckets) {
            if (list.size() !== 0) {
                list.toArray().forEach((keyValue) => {
                    entries.push(keyValue)  
                })
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
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

