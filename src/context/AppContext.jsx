import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [type, setType] = useState("expense");

  const [category, setCategory] = useState("Housing");

  const [amount, setAmount] = useState("");

  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");

  const [total, setTotal] = useState(() => Number(localStorage.getItem('total')) || 0);

  const [income, setIncome] = useState(() => Number(localStorage.getItem('income')) || 0);

  const [expense, setExpense] = useState(() => Number(localStorage.getItem('expense')) || 0);

  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data')) || []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      type,
      category,
      amount: parseFloat(amount),
      date,
      description,
    };

    if (type === "expense") {
      if (Number(amount) > Number(total)) {
        toast.error("You do not have enough balance");
      } else {
        const updatedTotal = Number(total) - Number(amount);
        setTotal(updatedTotal);
        if (
          new Date(date).toLocaleString("default", { month: "long" }) ===
          new Date().toLocaleString("default", { month: "long" })
        ) {
          const updatedExpense = Number(expense) + Number(amount);
          setExpense(updatedExpense);
        }
        setData((prev) => [...prev, newEntry]);

        setAmount("");
        setDate("");
        setDescription("");
        setCategory("Housing");
      }
    } else {
      const updatedTotal = Number(total) + Number(amount);
      setTotal(updatedTotal);
      if (
        new Date(date).toLocaleString("default", { month: "long" }) ===
        new Date().toLocaleString("default", { month: "long" })
      ) {
        const updatedIncome = Number(income) + Number(amount);
        setIncome(updatedIncome);
      }
      setData((prev) => [...prev, newEntry]);

      setAmount("");
      setDate("");
      setDescription("");
      setCategory("Salary/Wages");
    }
  };

  useEffect(() => {
    setCategory(type === "expense" ? "Housing" : "Salary/Wages");
  }, [type]);

  useEffect(() => {
    localStorage.setItem('total', total);
  }, [total]);

  useEffect(() => {
    localStorage.setItem('income', income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem('expense', expense);
  }, [expense]);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const value = {
    type,
    setType,
    category,
    setCategory,
    amount,
    setAmount,
    date,
    setDate,
    description,
    setDescription,
    total,
    setTotal,
    income,
    setIncome,
    expense,
    setExpense,
    data,
    setData,
    handleSubmit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
