import { linkedList } from "./linked-lists.js"

// TODO: Big Todo --> Guardar directamente todo como linkedlist

class HashMap {
    constructor(loadFactor = 0.8, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        
        this.buckets = []
        this.totalItems = 0
    }

    // Helpers

    add(key, value, index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        this.totalItems++
        this.doubleCapacity()

        this.buckets[index] = {key, value}
    }

    delete(index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        this.totalItems--
        this.buckets[index] = undefined
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

        if (!this.has(key)) {
            this.add(key, value, hashCode)
            return
        } 
        
        const keyValue = this.buckets[hashCode] // TODO: comprobar que esto no da error
        if (keyValue.key === key) {
            keyValue.value = value
            return
        }

        console.log(`!!! CONFLICT !!! ${key} - ${keyValue[0]}`)
        const list = linkedList()
        list.append(keyValue)
        list.append({key, value})
        this.buckets[hashCode] = list
    }

    get(key) {
        const hashCode = this.hash(key)

        return this.has(key) ? this.buckets[hashCode].value : null
    }

    has(key) {
        const hashCode = this.hash(key)
        const keyValue = this.buckets[hashCode]

        // TODO: Esto no es cierto, ¿qué pasa si hay linkedList?
        return keyValue !== undefined
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
        for (const key of this.keys) {
            this.remove(key)
        }
    }

    get keys() {
        const keys = []
        for (const keyValue of this.entries) {
            keys.push(keyValue.key)
        }

        return keys
    }

    get values() {
        const values = []
        for (const keyValue of this.entries) {
            values.push(keyValue.value)
        }

        return values
    }

    get entries() {
        const entries = []
        for (const keyValue of this.buckets) {
            if (keyValue !== undefined) {
                entries.push(keyValue)
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
console.log(test.entries[0].head().value)