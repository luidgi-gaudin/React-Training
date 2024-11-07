import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import CreateExpense from "./routes/CreateExpense.jsx";
import EditExpense from "./routes/EditExpense.jsx";
import ViewExpense from "./routes/ViewExpense.jsx";
import { ExpensesProvider } from "./context/expensesContext/ExpensesContext.jsx";
import RecentActivity from "./routes/RecentActivity.jsx";
import {AuthProvider} from "./context/authContext/authContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <RecentActivity />,
            },
            {
                path: "depense/cree",
                element: <CreateExpense />,
            },
            {
                path: "depense/:id",
                element: <ViewExpense />,
            },
            {
                path: "depense/:id/modifier",
                element: <EditExpense />,
            },
        ],
        element: <Root />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ExpensesProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ExpensesProvider>
    </StrictMode>,
);