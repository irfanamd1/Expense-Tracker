import React, { useContext, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import ExpenseIncomeChart from './ExpenseIncomeChart'

const Transactions = () => {

  const {
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
    data,
    handleSubmit
  } = useContext(AppContext);      

  return (
    <div className="grid lg:grid-cols-2 mt-5 gap-4">
      <form onSubmit={ handleSubmit } className="bg-[#2f2f2f] w-full rounded-lg p-4 text-gray-300">
        <p className="text-xl text-white">Add Transactions</p>
        <div className="grid sm:grid-cols-2 sm:gap-6 mt-2">
          <div>
            <p className="text-sm">Type</p>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 focus:outline-none focus:border-2 focus:border-violet-600"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense" className="text-black">
                Expense
              </option>
              <option value="income" className="text-black">
                Income
              </option>
            </select>
          </div>
          <div>
            <p className="text-sm">Category</p>
            {type === "expense" ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 focus:outline-none focus:border-2 focus:border-violet-600"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Housing" className="text-black">
                  Housing
                </option>
                <option value="Transportation" className="text-black">
                  Transportation
                </option>
                <option value="Food" className="text-black">
                  Food
                </option>
                <option value="Health" className="text-black">
                  Health
                </option>
                <option value="Insurance" className="text-black">
                  Insurance
                </option>
                <option value="Debt Payments" className="text-black">
                  Debt Payments
                </option>
                <option value="Entertainment" className="text-black">
                  Entertainment
                </option>
                <option value="Personal & Family" className="text-black">
                  Personal & Family
                </option>
                <option value="Savings & Investments" className="text-black">
                  Savings & Investments
                </option>
                <option value="Miscellaneous" className="text-black">
                  Miscellaneous
                </option>
              </select>
            ) : (
              <select
                className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 focus:outline-none focus:border-2 focus:border-violet-600"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Salary/Wages" className="text-black">
                  Salary/Wages
                </option>
                <option value="Business Income" className="text-black">
                  Business Income
                </option>
                <option value="Investments" className="text-black">
                  Investments
                </option>
                <option value="Rental Income" className="text-black">
                  Rental Income
                </option>
                <option value="Government Benefits" className="text-black">
                  Government Benefits
                </option>
                <option value="Gifts & Other" className="text-black">
                  Gifts & Other
                </option>
              </select>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-6">
          <div>
            <p className="text-sm">Amount</p>
            <div className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 flex items-center gap-1 focus:outline-none focus:border-2 focus-within:border-violet-600">
              <p>₹</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                className="bg-transparent outline-none w-full px-1"
                required
              />
            </div>
          </div>
          <div>
            <p className="text-sm">Date</p>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 focus:outline-none focus:border-2 focus:border-violet-600"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]} 
            />
          </div>
        </div>
        <div>
          <p>Description</p>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mt-2 mb-3 resize-none focus:outline-none focus:border-2 focus:border-violet-600"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="w-full py-2 bg-violet-600 text-white cursor-pointer rounded-md">
          <MdOutlineAdd className="inline w-5 h-5" /> Add Transaction
        </button>
      </form>

      <div>
        <ExpenseIncomeChart data={ data } />
      </div>
      

    </div>
  );
};

export default Transactions;
