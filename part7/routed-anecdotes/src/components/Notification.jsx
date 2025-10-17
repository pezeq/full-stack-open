const Notification = ({ message, type }) => {
    if (!message) return null;

    const styles = {
        default: {
            padding: '10px',
            marginTop: '20px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '5px',
            color: 'white'
        },
        error: {
            backgroundColor: 'red',
        },
        success: {
            backgroundColor: 'green',
        }
    };

    const divStyle = {
        ...styles.default,
        ...styles[type]
    };

    return (
        <div style={divStyle}>{message}</div>
    );
};

export default Notification;