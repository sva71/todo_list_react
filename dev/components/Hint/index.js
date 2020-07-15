import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Hint = ({caption, children, ...otherProps}) => {

    const renderTooltip = (props) => (
        <Tooltip {...props}>
            {props.caption}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            delay={{ show: 250, hide: 400 }}
            overlay={(props) =>
                renderTooltip({...props, caption})}
            {...otherProps}>
            {children}
        </OverlayTrigger>
    )

}

export default Hint;