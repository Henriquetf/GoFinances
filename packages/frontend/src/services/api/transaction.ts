import api from './api';

interface ListTransactionsResponse {
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
  transactions: {
    id: string;
    title: string;
    type: 'income' | 'outcome';
    value: string;
    category: {
      title: string;
    };
    createdAt: string;
  }[];
}

interface CreateTransactionData {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export function listTransactions() {
  return api.get<ListTransactionsResponse>('transactions');
}

export function createTransaction(data: CreateTransactionData) {
  return api.post('transactions', {
    data,
  });
}

export function deleteTransaction(id: string) {
  return api.delete(`transactions/${id}`);
}

export function importTransactionSpreadsheet(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  return api.post('transactions');
}
