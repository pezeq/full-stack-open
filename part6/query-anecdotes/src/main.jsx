import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
<<<<<<< HEAD
import { NotificationContextProvider } from './NotificationContext';
=======
import { NotificationContextProvider } from './NotificationContext'
>>>>>>> d51c4876f9951d92b4914f0680ca6bfdcf84c4df

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </QueryClientProvider>
);