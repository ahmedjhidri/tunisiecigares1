/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  ChevronRight,
  Mic,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { useFinanceStore, useTotals, Expense } from "@/store/finance-store";
import { currencyFormatter, shortDate } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type ReceiptInsight = {
  vendor?: string;
  total?: number;
  itemCount?: number;
};

type VoiceInsight = {
  summary?: string;
  mood?: string;
};

const timeframeOptions = [
  { value: "weekly", label: "Week" },
  { value: "monthly", label: "Month" },
  { value: "quarterly", label: "Quarter" },
] as const;

const paymentOptions = [
  { label: "Visa • 5123", value: "card" },
  { label: "Cash", value: "cash" },
  { label: "Household Account", value: "account" },
];

const categories = ["Essentials", "Lifestyle", "Wellness", "Travel", "Income", "Other"];

const normalizeCategory = (value: string) => {
  if (!value) return "Essentials";
  const found = categories.find(
    (category) => category.toLowerCase() === value.toLowerCase()
  );
  if (found) return found;
  return "Other";
};

const sumByDate = (expenses: Expense[]) => {
  const latestSeven = expenses.slice(0, 14);
  const daily = latestSeven.reduce<Record<string, number>>((acc, expense) => {
    const key = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    acc[key] = (acc[key] ?? 0) + expense.amount;
    return acc;
  }, {});
  return Object.entries(daily)
    .map(([date, value]) => ({ date, value }))
    .reverse();
};

export default function DashboardShell() {
  const { expenses, budgets, timeframe, setTimeframe } = useFinanceStore();
  const { totalSpent, budgeted, savings } = useTotals();
  const [receiptInsight, setReceiptInsight] = useState<ReceiptInsight>();
  const [voiceInsight, setVoiceInsight] = useState<VoiceInsight>();

  const chartData = useMemo(() => sumByDate(expenses), [expenses]);

  const topExpenses = useMemo(() => expenses.slice(0, 6), [expenses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f4f9] to-white text-slate-900">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 lg:px-10">
        <header className="flex flex-col gap-6 rounded-3xl bg-white/90 p-6 shadow-sm backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Personalized Budget
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Mizaniya Dashboard
            </h1>
            <p className="mt-1 text-base text-slate-500">
              Track every dinar, stay on plan, and let AI capture what you say or scan.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ScanReceiptDialog
              onComplete={(payload) => setReceiptInsight(payload)}
            />
            <VoiceNoteDialog
              onComplete={(payload) => setVoiceInsight(payload)}
            />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
          <nav className="rounded-3xl bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Timeframe</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-500 hover:text-slate-900"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <Tabs
              className="mt-4 w-full"
              value={timeframe}
              onValueChange={(v) => setTimeframe(v as any)}
            >
              <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
                {timeframeOptions.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    className="rounded-2xl text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900"
                    value={option.value}
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Planned budget</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(budgeted)}
                </p>
                <p className="text-xs text-slate-400">
                  vs last {timeframe} plan
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Spent</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(totalSpent)}
                </p>
                <Progress value={(totalSpent / budgeted) * 100} />
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Savings runway
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {currencyFormatter.format(savings)}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  left to stay on target {timeframe}
                </p>
              </div>
            </div>
          </nav>

          <main className="flex flex-col gap-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <MetricCard
                title="This period"
                amount={currencyFormatter.format(totalSpent)}
                delta="-4.3%"
                trend="down"
                description="vs previous period"
              />
              <MetricCard
                title="Income captured"
                amount={currencyFormatter.format(4200)}
                delta="+6.8%"
                trend="up"
                description="Updated this morning"
              />
              <MetricCard
                title="Savings automation"
                amount={currencyFormatter.format(savings)}
                delta="+$280"
                trend="up"
                description="Goal: $12k / year"
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <Card className="rounded-3xl border-none bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardDescription>Spending flow</CardDescription>
                    <CardTitle className="text-2xl">
                      {currencyFormatter.format(totalSpent)}
                    </CardTitle>
                  </div>
                  <TrendingChip />
                </CardHeader>
                <CardContent className="mt-4 h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#C7D2FE" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 16,
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 15px 50px rgba(15,23,42,0.08)",
                        }}
                        formatter={(value: any) => currencyFormatter.format(value as number)}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSpend)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <BudgetBreakdown
                budgets={budgets}
                expenses={expenses}
              />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
              <Card className="rounded-3xl border-none bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Recent activity</CardTitle>
                    <CardDescription>Synced in real time</CardDescription>
                  </div>
                  <AddExpenseSheet />
                </CardHeader>
                <CardContent className="mt-4 space-y-2">
                  {topExpenses.map((expense) => (
                    <ExpenseRow key={expense.id} expense={expense} />
                  ))}
                  {!topExpenses.length && (
                    <p className="text-sm text-slate-400">
                      No expenses yet. Add one manually or via AI to get started.
                    </p>
                  )}
                </CardContent>
              </Card>

              <AiInsightsPanel
                receiptInsight={receiptInsight}
                voiceInsight={voiceInsight}
                onReset={() => {
                  setReceiptInsight(undefined);
                  setVoiceInsight(undefined);
                }}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  amount,
  delta,
  trend,
  description,
}: {
  title: string;
  amount: string;
  delta: string;
  trend: "up" | "down";
  description: string;
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor =
    trend === "up"
      ? "text-emerald-500 bg-emerald-50"
      : "text-rose-500 bg-rose-50";
  return (
    <Card className="rounded-3xl border-none bg-white/90 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-3xl font-semibold text-slate-900">
            {amount}
          </CardTitle>
        </div>
        <Badge
          variant="secondary"
          className={`rounded-full px-3 py-1 text-xs font-medium ${trendColor}`}
        >
          <TrendIcon className="mr-1 h-3.5 w-3.5" />
          {delta}
        </Badge>
      </CardHeader>
      <CardContent className="text-sm text-slate-500">{description}</CardContent>
    </Card>
  );
}

function TrendingChip() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      stable vs last period
    </div>
  );
}

function BudgetBreakdown({
  budgets,
  expenses,
}: {
  budgets: ReturnType<typeof useFinanceStore>["budgets"];
  expenses: Expense[];
}) {
  return (
    <Card className="rounded-3xl border-none bg-white/90 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Budgets</CardTitle>
          <CardDescription>Live sync with Mizaniya plan</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-500">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        {budgets.map((budget) => {
          const spent = expenses
            .filter(
              (expense) => expense.category.toLowerCase() === budget.category.toLowerCase()
            )
            .reduce((sum, expense) => sum + expense.amount, 0);
          const percent = Math.min((spent / budget.limit) * 100, 100);
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                <span>{budget.category}</span>
                <span>
                  {currencyFormatter.format(spent)} /{" "}
                  {currencyFormatter.format(budget.limit)}
                </span>
              </div>
              <div className="relative h-3 rounded-full bg-slate-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all"
                  style={{
                    width: `${percent}%`,
                    background: budget.color,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">
                {percent.toFixed(0)}% of limit
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ExpenseRow({ expense }: { expense: Expense }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-100 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {expense.merchant}
        </p>
        <p className="text-xs text-slate-400">
          {expense.category} • {shortDate(expense.date)} • {expense.source}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-slate-800">
          {currencyFormatter.format(expense.amount)}
        </p>
        <p className="text-xs text-slate-400 capitalize">{expense.paymentMethod}</p>
      </div>
    </div>
  );
}

function AddExpenseSheet() {
  const addExpense = useFinanceStore((state) => state.addExpense);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    merchant: "",
    amount: "",
    category: "Essentials",
    paymentMethod: "card",
    note: "",
  });

  const onSubmit = () => {
    if (!form.merchant || !form.amount) return;
    addExpense({
      merchant: form.merchant,
      amount: parseFloat(form.amount),
      category: form.category,
      paymentMethod: form.paymentMethod as Expense["paymentMethod"],
      date: new Date().toISOString(),
      note: form.note,
      source: "manual",
    });
    setForm({
      merchant: "",
      amount: "",
      category: form.category,
      paymentMethod: form.paymentMethod,
      note: "",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-full bg-slate-900 px-5 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" /> Add expense
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Quick add expense</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Merchant / description</Label>
            <Input
              placeholder="Café, ride, groceries..."
              value={form.merchant}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, merchant: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min="0"
                value={form.amount}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, amount: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Payment method</Label>
            <Select
              value={form.paymentMethod}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  paymentMethod: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea
              rows={3}
              placeholder="Optional context"
              value={form.note}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, note: event.target.value }))
              }
            />
          </div>
          <Button className="w-full" onClick={onSubmit}>
            Save expense
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AiInsightsPanel({
  receiptInsight,
  voiceInsight,
  onReset,
}: {
  receiptInsight?: ReceiptInsight;
  voiceInsight?: VoiceInsight;
  onReset: () => void;
}) {
  return (
    <Card className="rounded-3xl border-none bg-[#0f172a] text-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardDescription className="text-slate-400">
            AI copilots
          </CardDescription>
          <CardTitle className="text-2xl text-white">Insights</CardTitle>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full bg-white/10 text-white hover:bg-white/20"
          onClick={onReset}
        >
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
            Receipt scan
          </p>
          {receiptInsight ? (
            <>
              <p className="mt-2 text-lg font-semibold">
                {receiptInsight.vendor ?? "New receipt"} •{" "}
                {receiptInsight.itemCount ?? 0} items
              </p>
              <p className="text-sm text-slate-400">
                {currencyFormatter.format(receiptInsight.total ?? 0)} captured
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-400">
              Scan a receipt and we will categorize every purchase instantly.
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
            Voice note
          </p>
          {voiceInsight ? (
            <>
              <p className="mt-2 text-lg font-semibold">
                {voiceInsight.summary}
              </p>
              <p className="text-sm text-slate-400">
                Mood signal: {voiceInsight.mood ?? "balanced"}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-400">
              Speak your spending and we will transcribe + extract line items.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ScanReceiptDialog({
  onComplete,
}: {
  onComplete: (insight: ReceiptInsight) => void;
}) {
  const addAiExpenses = useFinanceStore((state) => state.addAiExpenses);
  const [open, setOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
    setError(undefined);
  };

  const handleScan = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(undefined);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("/api/scan-receipt", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to analyze receipt");
      }

      const receipt = payload.receipt;
      const items = (receipt.items ?? []).map((item: any) => ({
        merchant: receipt.vendor ?? item.name,
        category: normalizeCategory(item.category),
        amount: item.amount,
        note: item.note ?? item.name,
        date: receipt.purchase_date ?? new Date().toISOString(),
        paymentMethod: "card" as const,
        source: "scan" as const,
      }));
      addAiExpenses(items);
      onComplete({
        vendor: receipt.vendor,
        total: receipt.total,
        itemCount: receipt.items?.length ?? items.length,
      });
      setOpen(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-12 rounded-full border border-slate-200 bg-white px-5 text-slate-900 shadow-sm"
          variant="outline"
        >
          <Camera className="mr-2 h-4 w-4" />
          Scan receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Scan a new receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
            {filePreview ? (
              <img
                src={filePreview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-xl object-cover"
              />
            ) : (
              <p className="text-sm text-slate-500">
                Drop a photo or tap to upload a fresh receipt
              </p>
            )}
            <Input
              type="file"
              accept="image/*,application/pdf"
              className="mt-4 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <Button
            disabled={!selectedFile || isLoading}
            className="w-full"
            onClick={handleScan}
          >
            {isLoading ? "Analyzing..." : "Extract purchases"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VoiceNoteDialog({
  onComplete,
}: {
  onComplete: (insight: VoiceInsight) => void;
}) {
  const addAiExpenses = useFinanceStore((state) => state.addAiExpenses);
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async () => {
    if (!navigator.mediaDevices) {
      throw new Error("Microphone is unavailable on this device.");
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      setIsRecording(false);
    };

    setMediaRecorder(recorder);
  };

  const startRecording = async () => {
    if (!mediaRecorder) {
      try {
        await requestPermission();
      } catch (error) {
        setStatus(
          error instanceof Error ? error.message : "Microphone permission denied."
        );
        return;
      }
    }
    const recorder = mediaRecorder;
    if (!recorder) return;
    setStatus("Listening...");
    setIsRecording(true);
    recorder.start();
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setStatus("Captured");
  };

  const handleSend = async () => {
    if (!audioBlob) return;
    setIsLoading(true);
    setStatus("Sending to GPT-4o...");

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "voice-note.webm");
      const response = await fetch("/api/voice-note", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to interpret voice note");
      }
      const items =
        payload.structured?.purchases?.map((purchase: any) => ({
          merchant: purchase.merchant ?? "Voice note",
          category: normalizeCategory(purchase.category),
          amount: purchase.amount,
          paymentMethod: (purchase.paymentMethod ?? "card")
            .toLowerCase()
            .includes("cash")
            ? ("cash" as const)
            : ("card" as const),
          date: new Date().toISOString(),
          note: purchase.note,
          source: "voice" as const,
        })) ?? [];
      if (items.length) {
        addAiExpenses(items);
      }
      onComplete({
        summary: payload.structured?.summary ?? "Captured note",
        mood: payload.structured?.mood ?? "steady",
      });
      setOpen(false);
      setAudioBlob(undefined);
      setAudioUrl(undefined);
      setStatus(undefined);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => {
      setOpen(state);
      if (!state) {
        setStatus(undefined);
        setAudioBlob(undefined);
        setAudioUrl(undefined);
        setIsRecording(false);
      }
    }}>
      <DialogTrigger asChild>
        <Button className="h-12 rounded-full bg-slate-900 px-5 text-white shadow-lg">
          <Mic className="mr-2 h-4 w-4" />
          Voice note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Record a voice note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-500">
              Share what you spent or plan to spend. We will transcribe & tag it.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3">
              <Button
                variant={isRecording ? "destructive" : "default"}
                className="rounded-full"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? "Stop recording" : "Start recording"}
              </Button>
              {audioUrl && (
                <audio
                  className="w-full"
                  controls
                  src={audioUrl}
                  preload="metadata"
                />
              )}
              {status && (
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  {status}
                </p>
              )}
            </div>
          </div>
          <Button
            disabled={!audioBlob || isLoading}
            className="w-full"
            onClick={handleSend}
          >
            {isLoading ? "Analyzing..." : "Transcribe & extract"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

