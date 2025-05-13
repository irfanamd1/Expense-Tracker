import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [type, setType] = useState("expense");

  const [category, setCategory] = useState("Housing");

  const [amount, setAmount] = useState("");

  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");

  const [total, setTotal] = useState(0);

  const [income, setIncome] = useState(0);

  const [expense, setExpense] = useState(0);

  const [data, setData] = useState([]);

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
        setTotal((prev) => Number(prev) - Number(amount));
        if (
          new Date(date).toLocaleString("default", { month: "long" }) ===
          new Date().toLocaleString("default", { month: "long" })
        ) {
          setExpense((prev) => Number(prev) + Number(amount));
        }
        setData((prev) => [...prev, newEntry]);

        setAmount("");
        setDate("");
        setDescription("");
        setCategory("Housing");
      }
    } else {
      setTotal((prev) => Number(prev) + Number(amount));
      if (
        new Date(date).toLocaleString("default", { month: "long" }) ===
        new Date().toLocaleString("default", { month: "long" })
      ) {
        setIncome((prev) => Number(prev) + Number(amount));
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
