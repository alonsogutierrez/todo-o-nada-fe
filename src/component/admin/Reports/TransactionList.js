import React from 'react'
import TransactionListAPI from '../../../api/TransactionList.json'

const TransactionList = () => (
    <div
        className="tab-pane fade show active"
        id="transaction-list"
        role="tabpanel"
        aria-labelledby="transaction-list-tab"
        >
        <div className="table-responsive">
            <table className="table table-striped mb-0">
            <thead>
                <tr>
                <th scope="col">Nº orden</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Tipo</th>
                <th scope="col">Cuenta</th>
                <th scope="col">Total</th>
                <th scope="col">Debito</th>
                <th scope="col">Balance</th>
                </tr>
            </thead>
            <tbody>
                {TransactionListAPI.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.TransactionID}</td>
                    <td>{transaction.Date}</td>
                    <td className="text-success">{transaction.Type}</td>
                    <td>{transaction.Account}</td>
                    <td>{transaction.Amount}</td>
                    <td>{transaction.Debit}</td>
                    <td>{transaction.Balance}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
)

export default TransactionList