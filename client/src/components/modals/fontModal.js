import { useState } from 'react';

export const useFont = (e) => {
    const [font, setFont] = useState({
        style: 'normal',
        weight: 400
    })

    const val = e.target.value.split(' ');

    if(val.length > 1){
        setFont({ ...font, style: val[0], weight: val[1] });
    } else {
        setFont({ ...font, style: val[0], weight: 400 })
    }

    return { font };
}