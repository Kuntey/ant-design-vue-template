export interface CellEdit {
  enable?: boolean;
  component: string;
  attrs?: object;
  events?: object;
}
export interface EditConfig {
  trigger: string;
  mode: string;
  showStatus: boolean;
  markInsert: boolean;
}
