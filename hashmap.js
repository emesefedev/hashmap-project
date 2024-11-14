class HashMap {
    constructor(loadFactor = 0.8, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = []
    }
    
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 67;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode
    }

    set(key, value) {
        const hashCode = this.hash(key)
        this.add(key, value, hashCode)
    }

    add(key, value, index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        this.buckets[index] = [key, value]
    }

    get(key) {

    }

    has(key) {

    }

    remove(key) {

    }

    get length() {

    }

    clear() {

    }

    get keys() {

    }

    get values() {

    }

    get entries() {

    }

}

const test = new HashMap(0.8, 16)
console.log(test.hash("miquel"))