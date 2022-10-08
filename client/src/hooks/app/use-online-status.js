import { useState, useEffect } from 'react';

import usePreviousState from 'hooks/common/use-previous-state';

const useOnlineStatus = _ => {

    const [online, setOnline] = useState(navigator?.onLine ?? true);
    const previousOnlineState = usePreviousState(online);

    useEffect(_ => {

        const onOnlineStatusChange = e => setOnline(e.type === 'online');

        window.addEventListener('online', onOnlineStatusChange);
        window.addEventListener('offline', onOnlineStatusChange);

        return _ => {

            window.removeEventListener('online', onOnlineStatusChange);
            window.removeEventListener('offline', onOnlineStatusChange);
        }

    }, []);

    return { online, previousOnlineState };
}

export default useOnlineStatus;