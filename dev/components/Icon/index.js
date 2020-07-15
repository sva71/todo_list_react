import React from 'react';

import Plus from './Icons/plus.svg';
import Trash from './Icons/trash.svg';
import Cross from './Icons/cross.svg';
import CrossMain from './Icons/cross_main.svg';
import Check from './Icons/check.svg';
import Up from './Icons/up.svg';
import Down from './Icons/down.svg';

const Icon = ({name}) => {
    switch (name) {
        case 'plus': return <Plus />;
        case 'trash': return <Trash />;
        case 'cross': return <Cross />;
        case 'cross_main': return <CrossMain />;
        case 'check': return <Check />;
        case 'up': return <Up />;
        case 'down': return <Down />;
        default: return <div />
    }
};

export default Icon;