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
        
        if (index < 0 || index >= _size) throw Error('Index Out Of Bounds')

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

    const containsAt = (callback) => {
        for (let i = 0; i < _size; i++) {
            const currentData = at(i).data()
            if (callback(currentData)) {
                return {contains: true, at: i}
            }
        }
        return {contains: false, at: -1}
    }

    const contains = (callback) => {
        return containsAt(callback).contains
    }

    const find = (callback) => {
        return containsAt(callback).at
    }

    const get = (callback) => {
        const index = find(callback)
        return at(index).data()
    }

    const toString = (callback, node = _head) => {
        if (size <= 0) {
            return  ''
        }

        const data = node.data()
        if (node.next() === null) {
            return `( ${callback(data)} ) -> null`
        }
        return `( ${callback(data)} ) -> ${toString(callback, node.next())}`
    }

    const toArray = (callback, node = _head) => {
        if(!node) {
            return []
        }

        const data = node.data()
        return [callback(data), ...toArray(callback, node.next())]
    }

    const insertAt = (data, index) => {
        if (index < 0 || index >= _size) throw Error('Index Out Of Bounds')

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
        if (index < 0 || index >= _size) throw Error('Index Out Of Bounds')
        if (_size <= 0) return

        if (_size === 1) {
            pop()
            return
        }
        
        if (index === 0) {
            _head = _head.next()
        } else {
            const nodeToRemove = at(index)
            at(index - 1).updateNextNode(nodeToRemove.next())
        }
        _size--   
    }

    const remove = (callback) => {
        const index = find(callback)
        removeAt(index)
    }

    const clear = () => {
        _head = null
        _tail = null
        _size = 0
    }

    const size = () => _size
    const head = () => _head
    const tail = () => _tail


    const containsKey = (key) => {
        return containsKeyAt(key).contains
    }



    const replace = (newData, callback) => {
        if (!contains(callback)) {
            append(newData)
            return
        }

        const index = find(callback)
        insertAt(newData, index)
        removeAt(index + 1)
    }

    return {toString, append, size, clear, replace, remove, get, toArray, contains}
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