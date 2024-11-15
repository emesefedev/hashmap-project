export function linkedList () {
    let _head = null
    let _tail = null
    
    let _size = 0

    const append = (data) => {
        const newNode = node(data)
        if (_size === 0) {
            _head = newNode
            _tail = newNode
        } else if (_size === 1) {
            _head.updateNextNode(newNode)
            _tail = newNode
        } else {
            _tail.updateNextNode(newNode)
            _tail = newNode
        }

        _size++
    }

    const prepend = (data) => {
        const prevHead = _head
        _head = node(data, prevHead)

        _size++
    }

    const at = (index) => {
        
        if (index < 0 || index >= _size) throw Error("Index Out Of Bounds")

        let i = 0
        let node = _head
        while (i < index) {
            node = node.next()
            i++
        }

        return node
    }

    const pop = () => {
        if (_size <= 0) return

        if (_size > 1) {
            _tail = at(_size - 2)
            _tail.updateNextNode(null)
        } else {
            _head = null
            _tail = null
        }
        
        _size--
    }

    const containsAt = (data) => {
        for (let i = 0; i < _size; i++) {
            if (at(i).data() === data) {
                return {contains: true, at: i}
            }
        }
        return {contains: false, at: -1}
    }

    const contains = (data) => {
        return containsAt(data).contains
    }

    const find = (data) => {
        return containsAt(data).at
    }

    const toString = () => {
        if (_size > 0) {
            console.log(nodeToString(_head))
        } else {
            console.log("null")
        }
    }

    // const nodeToString = (node) => {
    //     if (node.next() === null) {
    //         return `( ${node.data()} ) -> null`
    //     }
    //     return `( ${node.data()} ) -> ${nodeToString(node.next())}`
    // }

    const insertAt = (data, index) => {
        if (index < 0 || index >= _size) throw Error("Index Out Of Bounds")

        if (index === 0) {
            prepend(data)
        } else {
            const nodeAtIndex = at(index)
            const newNode = node(data, nodeAtIndex)
            at(index - 1).updateNextNode(newNode)
            
            _size++
        }
    }

    const removeAt = (index) => {
        if (_size <= 0) return
        if (index < 0 || index >= _size) throw Error("Index Out Of Bounds")
        
        if (_size > 1) {
            if (index === 0) {
                _head = _head.next()
            } else {
                const nodeToRemove = at(index)
                at(index - 1).updateNextNode(nodeToRemove.next())
            }
            _size--
        } else {
            pop()
        }        
    }

    const size = () => _size
    const head = () => _head
    const tail = () => _tail

    // New functions created for this project

    const clear = () => {
        _head = null
        _tail = null
        _size = 0
    }

    const containsKeyAt = (key) => {
        for (let i = 0; i < _size; i++) {
            if (at(i).data().key === key) {
                return {contains: true, at: i}
            }
        }
        return {contains: false, at: -1}
    }

    const containsKey = (key) => {
        return containsKeyAt(key).contains
    }

    const findKey = (key) => {
        return containsKeyAt(key).at
    }

    const nodeToString = (node) => {
        const data = node.data()
        if (node.next() === null) {
            return `( (${data.key}, ${data.value}) ) -> null`
        }
        return `( (${data.key}, ${data.value}) ) -> ${nodeToString(node.next())}`
    }

    const replace = (key, value) => {
        if (!containsKey(key)) {
            append({key, value})
            return
        }

        const index = findKey(key)
        console.log(`idx: ${index} key: ${key} val: ${value}`)
        insertAt({key, value}, index)
        removeAt(index + 1)

    }

    return {toString, append, size, removeAt, clear, containsKey, replace}
}

function node (dataValue = null, nextNode = null) {

    let _data = dataValue
    let _nextNode = nextNode

    const updateData = (newDataValue) => {
        _data = newDataValue
    }

    const updateNextNode = (newNext) => {
        _nextNode = newNext
    }

    const data = () => _data
    const next = () => _nextNode

    return {data, next, updateData, updateNextNode}  
}