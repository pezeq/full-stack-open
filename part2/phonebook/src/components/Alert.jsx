const Alert = ({ message, type }) => {
    if (!message) return null;

    const styles = {
        base: {
            padding: '12px 16px',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '14px',
        },
        success: {
            color: '#155724',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
        },
        error: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
        }
    };

    const alertStyle = {
        ...styles.base,
        ...styles[type]
    };

    return (
        <div style={alertStyle}>
            {message}
        </div>
    );
};

export default Alert;