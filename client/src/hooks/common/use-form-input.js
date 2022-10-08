import { useState, useRef } from 'react';

const useFormInput = initialValue => {

    let ref = useRef(null);

    const [value, setValue] = useState(initialValue);

    const handleChange = e => {

        if (typeof (initialValue) === 'string')
            setValue(e.target.value);

        else if (typeof (initialValue) === 'boolean')
            setValue(e.target.checked);
    }

    return {
        value,
        setValue,
        onChange: handleChange,
        ref
    }
}

export default useFormInput;