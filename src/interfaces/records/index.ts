export type TransactionRecord = {
    id: string;
    type: "topup" | "withdraw";
    amount: number;
    date: number;
    status: "success" | "pending" | "failed";
};

export type GameHistoryRecord = {
    id: string;
    gameName: string;
    betAmount: number;
    winAmount: number;
    date: number;
};
