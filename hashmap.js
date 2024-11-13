class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
    }
    
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 199;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode
    }
}