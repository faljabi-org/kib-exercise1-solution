import { useReducer } from 'react';

const useForceUpdate = _ => {

    let [, forceUpdate] = useReducer(x => x + 1, 0);

    return forceUpdate;
}

export default useForceUpdate;