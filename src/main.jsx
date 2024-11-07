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
import Login from "./routes/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Register from "./routes/Register.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (<ProtectedRoute><RecentActivity /></ProtectedRoute>),
            },
            {
                path: "depense/cree",
                element: (<ProtectedRoute><CreateExpense /></ProtectedRoute>),
            },
            {
                path: "depense/:id",
                element: (<ProtectedRoute><ViewExpense /></ProtectedRoute>),
            },
            {
                path: "depense/:id/modifier",
                element: (<ProtectedRoute><EditExpense /></ProtectedRoute>),
            },
        ],
        element: (<ProtectedRoute><Root /></ProtectedRoute>),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register/>,
    }
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