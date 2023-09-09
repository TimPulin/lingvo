import {
  useRef, useState, RefObject,
} from 'react';

export function getRefValue<C>(ref: RefObject<C>) {
  return ref.current as C;
}

export function useStateRef<S>(defaultValue:S):[S, (value:S) => void, RefObject<S>] {
  const ref = useRef<S>(defaultValue);
  const [state, setStateLocal] = useState<S>(defaultValue);
  const setState = (value:S) => {
    setStateLocal(value);
    ref.current = value;
  };

  return [state, setState, ref];
}
