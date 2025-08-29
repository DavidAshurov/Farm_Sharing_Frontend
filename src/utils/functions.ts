import {useEffect, useState} from "react";

export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function useDebounce<T>(value:T, delay:number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        },delay)
        return () => clearTimeout(timer)
    },[value])

    return debouncedValue
}
