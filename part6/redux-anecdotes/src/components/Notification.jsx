import { useSelector } from 'react-redux';

const Notification = () => {
    const notification =  useSelector(state => state.notification);

    if (!notification) return null;

    const styles = {
        base: {
            padding: '10px',
            fontFamily: 'sans-serif',
            fontSize: 'medium',
            fontWeight: '600',
            borderRadius: '5px',
            marginBottom: '10px'
        },
        error: {
            color: '#ff3333',
            backgroundColor: '#ffcccc',
            border: '1px solid #800000',
        },
        success: {
            color: '#3b8019',
            backgroundColor: '#ddffcc',
            border: '1px solid #2a8000',
        },
    };

    const divStyle = {
        ...styles.base,
        ...styles[notification.type]
    };

    return (
        <div style={divStyle}>
            {notification.message}
        </div>
    );
};

export default Notification;