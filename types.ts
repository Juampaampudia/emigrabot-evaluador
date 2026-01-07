export interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export interface Case {
  id: number;
  client: string;
  type: string;
  status: string;
  viability: number;
  date: string;
}