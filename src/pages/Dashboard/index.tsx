import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import { formatValue, formatDate } from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const formattedTransactions = response.data.map(transaction => {
        console.log(transaction, '----->>transaction<<-----');
        // {
        //   "id": "d920bb99-03a9-44e9-af5a-bae434c913b2",
        //   "title": "Salário",
        //   "type": "income",
        //   "value": 3000,
        //   "created_at": "2020-06-09T00:58:01.883Z",
        //   "updated_at": "2020-06-09T00:58:01.883Z",
        //   "category": {
        //     "id": "5da14d17-e039-4b44-82c7-af9ad2138346",
        //     "title": "Alimentação",
        //     "created_at": "2020-06-09T00:58:01.857Z",
        //     "updated_at": "2020-06-09T00:58:01.857Z"
        //   }
        // }
        return {
          id: transaction.id,
          title: transaction.title,
          value: transaction.value,
          formattedValue: formatValue(transaction.value),
          formattedDate: formatDate(transaction.created_at),
          type: transaction.type,
          category: { title: transaction.category.title },
          created_at: transaction.created_at,
        };
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">R$ 5.000,00</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">R$ 1.000,00</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">R$ 4000,00</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="title">Computer</td>
                <td className="income">R$ 5.000,00</td>
                <td>Sell</td>
                <td>20/04/2020</td>
              </tr>
              <tr>
                <td className="title">Website Hosting</td>
                <td className="outcome">- R$ 1.000,00</td>
                <td>Hosting</td>
                <td>19/04/2020</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
