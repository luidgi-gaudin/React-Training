import { createContext, useContext, useState } from "react";

// Create a context for expenses
const ExpensesContext = createContext();

// Custom hook to use the ExpensesContext
export function useExpenses() {
    return useContext(ExpensesContext);
}

// Provider component to wrap the application
export function ExpensesProvider({ children }) {
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            title: "Loyer",
            amount: 500,
            description: "Loyer du mois de juin",
            date: "2021-06-01",
        },
        {
            id: 2,
            title: "Courses",
            amount: 120,
            description: "Courses du mois de juin",
            date: "2021-06-02",
        },
        {
            id: 3,
            title: "Restaurant",
            amount: 50,
            description: "Restaurant du mois de juin",
            date: "2021-06-03"
        }
    ]);

    const addExpense = (expense) => {
        setExpenses([...expenses, { ...expense, id: Date.now() }]);
    };

    const editExpense = (id, updatedExpense) => {
        setExpenses(expenses.map((expense) => (expense.id === id ? { ...updatedExpense, id } : expense)));
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    return (
        <ExpensesContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense }}>
            {children}
        </ExpensesContext.Provider>
    );
}