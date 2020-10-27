export interface Todo {
  id?: number;
  title: string;
  body: string;
  completed: boolean;
  endDate: string;
  priority: Priority | string;
}

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'
