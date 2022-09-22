import ISkillWithGrade from "../skills/ISkillWithGrade";

export default interface IWilderFromDb {
  id: number;
  city?: string;
  description: string;
  name: string;
  grades: ISkillWithGrade[];
}
