/**
 * Finance store handles expenses, budgets, and insights while persisting
 * data locally so the dashboard feels stateful without a backend.
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Timeframe = "weekly" | "monthly" | "quarterly";

export type Expense = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: "card" | "cash" | "account";
  note?: string;
  source: "manual" | "scan" | "voice";
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  color: string;
};

const seededBudgets: Budget[] = [
  { id: "essentials", category: "Essentials", limit: 1600, color: "#5B8DEF" },
  { id: "lifestyle", category: "Lifestyle", limit: 900, color: "#F97316" },
  { id: "wellness", category: "Wellness", limit: 450, color: "#10B981" },
  { id: "travel", category: "Travel", limit: 600, color: "#C084FC" },
];

const starterExpenses: Expense[] = [
  {
    id: "exp-1",
    merchant: "Farah Market",
    category: "Essentials",
    amount: 86.3,
    date: new Date().toISOString(),
    paymentMethod: "card",
    note: "Weekly groceries",
    source: "manual",
  },
  {
    id: "exp-2",
    merchant: "Orange Fiber",
    category: "Essentials",
    amount: 52.0,
    date: new Date().toISOString(),
    paymentMethod: "account",
    note: "Internet",
    source: "manual",
  },
  {
    id: "exp-3",
    merchant: "Zen Ride",
    category: "Travel",
    amount: 24.5,
    date: new Date().toISOString(),
    paymentMethod: "card",
    source: "manual",
  },
];

type FinanceState = {
  timeframe: Timeframe;
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, "id">) => Expense;
  addAiExpenses: (
    expenses: Array<Omit<Expense, "id" | "source"> & { source?: Expense["source"] }>
  ) => Expense[];
  deleteExpense: (id: string) => void;
  setTimeframe: (frame: Timeframe) => void;
  reset: () => void;
};

const newId = () => crypto.randomUUID();

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      timeframe: "monthly",
      expenses: starterExpenses,
      budgets: seededBudgets,
      addExpense: (expense) => {
        const created: Expense = { id: newId(), ...expense };
        set((state) => ({ expenses: [created, ...state.expenses] }));
        return created;
      },
      addAiExpenses: (payloads) => {
        const created = payloads.map((expense) => ({
          id: newId(),
          source: expense.source ?? "scan",
          ...expense,
        }));
        set((state) => ({
          expenses: [...created, ...state.expenses],
        }));
        return created;
      },
      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },
      setTimeframe: (frame) => set({ timeframe: frame }),
      reset: () =>
        set({
          timeframe: "monthly",
          expenses: starterExpenses,
          budgets: seededBudgets,
        }),
    }),
    {
      name: "mizaniya-finance",
      version: 1,
    }
  )
);

export const useTotals = () => {
  const { expenses, budgets } = useFinanceStore();
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgeted = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const savings = Math.max(budgeted - totalSpent, 0);
  return { totalSpent, budgeted, savings };
};

export const groupExpensesByCategory = (expenses: Expense[]) => {
  return expenses.reduce<Record<string, number>>((acc, current) => {
    acc[current.category] = (acc[current.category] ?? 0) + current.amount;
    return acc;
  }, {});
};

