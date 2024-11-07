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
import { ExpensesProvider } from "./Expenses.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
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
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ExpensesProvider>
            <RouterProvider router={router} />
        </ExpensesProvider>
    </StrictMode>,
);