import { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>{props.children}</div>
        </div>
    );
};

export default Togglable;
