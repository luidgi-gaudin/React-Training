import { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { bdd } from "../../firebase/firebase";

const ExpensesContext = createContext();

export function useExpenses() {
    return useContext(ExpensesContext);
}

export function ExpensesProvider({ children }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const querySnapshot = await getDocs(collection(bdd, "dépense"));
            const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExpenses(expensesData);
        };
        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        const docRef = await addDoc(collection(bdd, "dépense"), expense);
        setExpenses([...expenses, { id: docRef.id, ...expense }]);
    };

    const editExpense = async (id, updatedExpense) => {
        const expenseDoc = doc(bdd, "dépense", id);
        await updateDoc(expenseDoc, updatedExpense);
        setExpenses(expenses.map((expense) => (expense.id === id ? { id, ...updatedExpense } : expense)));
    };

    const deleteExpense = async (id) => {
        const expenseDoc = doc(bdd, "dépense", id);
        await deleteDoc(expenseDoc);
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    return (
        <ExpensesContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense }}>
            {children}
        </ExpensesContext.Provider>
    );
}