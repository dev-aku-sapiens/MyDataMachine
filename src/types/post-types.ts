export interface JSONplaceholderProps {
  status: number;
  config: unknown;
  headers: unknown;
  statusText: string;
  data: RecordsProps[];
}

export interface RecordsProps {
  id: number;
  body: string;
  title: string;
  userId: number;
}
