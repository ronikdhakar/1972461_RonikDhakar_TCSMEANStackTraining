export class Quiz{
    constructor(public id:string,
        public question:string,
        public option:Array<{ optionid:string,  name:string}>,
        public answer:string,
        public selected:string,
        public correct:string){}
}