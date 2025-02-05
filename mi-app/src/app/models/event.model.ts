export interface Event {
  id: number;
  employee: string;
  client: string;
  date: Date | null;
  title: string;
  description: string;
  category: 'log' | 'warm' | 'error';
  createdDate: Date;
}

  