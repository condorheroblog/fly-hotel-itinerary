import { useCallback, useEffect, useRef, useState } from "react";

function load<T>(key: string, initialValue: T): T {
	try {
		const raw = window.localStorage.getItem(key);
		if (raw != null)
			return { ...initialValue, ...JSON.parse(raw) } as T;
	}
	catch {
		// ignore corrupted storage
	}
	return initialValue;
}

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [value, setValue] = useState<T>(() => load(key, initialValue));

	const keyRef = useRef(key);
	const initialRef = useRef(initialValue);
	keyRef.current = key;
	initialRef.current = initialValue;

	// Re-hydrate when the caller switches to a different storage key.
	const swappedRef = useRef(false);
	useEffect(() => {
		if (keyRef.current === key)
			return;
		keyRef.current = key;
		swappedRef.current = true;
		setValue(load(key, initialRef.current));
	}, [key]);

	useEffect(() => {
		// Skip the stale value carried over from the previous key on the swap commit.
		if (swappedRef.current) {
			swappedRef.current = false;
			return;
		}
		try {
			window.localStorage.setItem(keyRef.current, JSON.stringify(value));
		}
		catch {
			// storage may be unavailable (private mode) — state still works
		}
	}, [key, value]);

	const update = useCallback(
		(next: T | ((prev: T) => T)) => {
			setValue(prev =>
				typeof next === "function" ? (next as (p: T) => T)(prev) : next,
			);
		},
		[],
	);

	return [value, update];
}
