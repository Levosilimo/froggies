export interface TaskModel {
  winCondition: string;
  name: string;
  description: Description;
  submitText: string;
  type1Quantity: number;
  type2Quantity: number;
  type3Quantity: number;
  levelsCount: number;
}

interface Description {
  paragraph: string;
  rulesList: string[];
  example: string;
}
