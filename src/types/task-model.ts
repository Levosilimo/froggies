export interface TaskModel {
  winCondition: string;
  pre: string;
  post: string;
  name: string;
  description: Description;
  submitText: string;
  items: Array<number>;
  levelsCount: number;
}

export type Tooltip = {
  key: string;
  text: string;
};

interface Description {
  paragraph: string;
  rulesList: Array<string>;
  tooltips: Array<Tooltip>;
  example: string;
}
