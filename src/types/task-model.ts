export interface TaskModel {
  desc: Description;
  answer: string[];
}

interface Description {
  preview: string;
  rulesList: string[];
  example: string;
}
