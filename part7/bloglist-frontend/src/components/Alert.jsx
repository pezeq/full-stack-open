const Alert = ({ alertMsg, alertType }) => {
    if (!alertMsg) return null;

    const typeStyles = {
        base: {
            padding: '10px',
            fontFamily: 'sans-serif',
            fontSize: 'medium',
            fontWeight: '600',
            borderRadius: '5px',
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


    const alertStyle = {
        ...typeStyles.base,
        ...typeStyles[alertType]
    };

    return (
        <div style={alertStyle}>
            { alertMsg }
        </div>
    );
};

export default Alert;