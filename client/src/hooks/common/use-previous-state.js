import { useRef, useEffect } from 'react';

const usePreviousState = value => {

    const ref = useRef(value);

    useEffect(_ => { ref.current = value });

    return ref.current;
}

export default usePreviousState;