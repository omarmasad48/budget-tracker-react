import { useState, useEffect } from 'react' // <--- 1. Import useEffect
   
import { ExpenseChart } from './components/ExpenseChart';
function App() {
  // 2. LOAD DATA: Check Local Storage first. If empty, use default list.
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    const initialValue = JSON.parse(saved);
    return initialValue || [
      { id: 1, text: 'Flower', amount: -20 },
      { id: 2, text: 'Salary', amount: 300 },
      { id: 3, text: 'Book', amount: -10 }
    ];
  });

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  // 
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);


  // --- 
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: text,
      amount: +amount
    };
    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount(0);
  }

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <h4>Your Balance</h4>
      <h1>${total}</h1>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>
<ExpenseChart income={income} expense={expense} />

      
      

      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li className={transaction.amount < 0 ? 'minus' : 'plus'} key={transaction.id}>
            {transaction.text} 
            <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
          </li>
        ))}
      </ul>

      <h3>Add new transaction</h3>
      <form onSubmit={addTransaction}>
        <div className="form-control">
          <label>Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
}

export default App;