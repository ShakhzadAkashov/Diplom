import { PracticeFile } from "./PracticiFile";

export class Practice{
    id:number;
    name:string;
    ownerId:string;
    subjectId: number;
    subjectName: string;
    practiceFiles:PracticeFile[];
}