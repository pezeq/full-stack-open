import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
    const alert = useSelector((s) => s.notification);

    if (!alert) return null;
    const { message, type } = alert;

    return (
        <Alert variant={type} className="mt-3" dismissible>
            {message}
        </Alert>
    );
};

export default Notification;
