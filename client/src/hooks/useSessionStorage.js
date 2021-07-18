import { useState, useEffect } from 'react'

const PREFIX = 'query-game-'

function getSavedValue(key, initialValue) {    
    const savedValue = JSON.parse(sessionStorage.getItem(key))
 
    if (savedValue !== null) return savedValue
 
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}
 
export default function useSessionStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
       return getSavedValue(prefixedKey, initialValue)
    }) 
 
    useEffect(() => {
       sessionStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])
    
 
    return [value, setValue]
}