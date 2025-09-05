import React, { useEffect, useState } from 'react'

export default function UseLocalStorage(key: string, initialValue: T[] = []) {
    const [value, setValue] = useState<T[]>(initialValue)

    useEffect(() => {
        const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored));
      } catch {
        setValue(initialValue);
      }
    }
    }, [key])
    
    const saveValue = (newValue: T[]) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    const addValue = (item: T) => {
    const newArray = [...value, item];
    setValue(newArray);
    localStorage.setItem(key, JSON.stringify(newArray));
  };

    const clearValue = () => {
        setValue([]);
        localStorage.removeItem(key);
    }

  return { value, saveValue, addValue, clearValue };
}
