import React, { useContext } from 'react'
import Header from './components/Header'
import Amount from './components/Amount'
import Transactions from './components/Transactions'
import { Toaster } from 'react-hot-toast'
import MonthlyTransactions from './components/MonthlyTransactions'
import { AppContext } from './context/AppContext'

const App = () => {

  const { data } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw]">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Amount />
      <Transactions />
      <MonthlyTransactions />
    </div>
  )
}

export default App
