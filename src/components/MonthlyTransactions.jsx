import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { GrTransaction } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

const MonthlyTransactions = () => {
  const { data } = useContext(AppContext)
  const [transaction, setTransaction] = useState('All')

  const filteredData = transaction === 'All'
    ? data
    : data.filter(item => item.type === transaction.toLowerCase())

  return (
    <div className='grid lg:grid-cols-[2fr_1fr] gap-4 mt-5'>
      <div className="bg-[#2f2f2f] w-full rounded-lg p-4 text-gray-300">
        <div className='grid grid-cols-1 gap-3 sm:flex md:gap-0 sm:items-center sm:justify-between'>
          <div className='flex items-center gap-2'>
            <p className='text-xl text-white flex items-center'>
              <GrTransaction className='inlinne w-5 h-5 mr-2 text-violet-600' />Monthly Transactions - ({new Date().toLocaleString('default', { month: 'long' })})
            </p>
            {data.length > 0 && (
              <div className='w-8 h-8 bg-[#393939] rounded-md flex items-center justify-center'>
                <p className='text-xl text-white'>{filteredData.length}</p>
              </div>
            )}
          </div>
          <div className='flex items-center gap-3'>
            {['All', 'Expense', 'Income'].map(type => (
              <p
                key={type}
                onClick={() => setTransaction(type)}
                className={`px-3 py-1.5 rounded-md cursor-pointer ${transaction === type ? 'bg-violet-600' : 'bg-[#393939]'}`}
              >
                {type}
              </p>
            ))}
          </div>
        </div>

        <div>
          {filteredData.length > 0 ? (
            <div className=' h-[300px] overflow-y-auto mt-5 custom-scrollbar'>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 rounded-md mt-2 bg-[#393939]'
                >
                  <div>
                    <p className='text-sm text-white'>{item.description}</p>
                    <p className='text-xs text-gray-400'>{item.category}</p>
                  </div>
                  <div>
                    <p className={`text-md ${item.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                      ₹{item.amount}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-400 flex items-center justify-center h-[400px]'>No transactions found</p>
          )}
        </div>
      </div>

      <div className="bg-[#2f2f2f] w-full rounded-lg p-4 text-gray-300 h-fit">
        <p className="text-white text-xl flex items-center"><CiCalendarDate className='w-6 h-6 inline text-violet-600 mr-2' />Today Transactions - ({new Date().toISOString().split('T')[0]})</p>
        <div className="grid sm:grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-0">
          <div className="mt-5 bg-[#393939] rounded-md w-full p-4">
            <p>Today's total Expense</p>
            <p className="text-white mt-4">₹&nbsp;
              {
                data.filter(item =>
                  item.type === 'expense' &&
                  item.date === new Date().toISOString().split("T")[0]
                ).reduce((acc, curr) => acc + Number(curr.amount), 0)
              }
            </p>
          </div>
          <div className="mt-5 bg-[#393939] rounded-md w-full p-4">
            <p>Today's total Income</p>
            <p className="text-white mt-4">₹&nbsp;
              {
                data.filter(item =>
                  item.type === 'income' &&
                  item.date === new Date().toISOString().split("T")[0]
                ).reduce((acc, curr) => acc + Number(curr.amount), 0)
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyTransactions
