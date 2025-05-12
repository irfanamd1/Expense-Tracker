import Header from './components/Header'
import Amount from './components/Amount'
import Transactions from './components/Transactions'
import { Toaster } from 'react-hot-toast'
import MonthlyTransactions from './components/MonthlyTransactions'

const App = () => {
  return (
    <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw] pb-10">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Amount />
      <Transactions />
      <MonthlyTransactions />
    </div>
  )
}

export default App
