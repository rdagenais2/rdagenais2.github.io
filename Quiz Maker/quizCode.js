class Option{
    constructor(){
        this.text = "";
        this.value = 0;
    }

    addText(text) {
        this.text = text;
    }

    addValue(value) {
        this.value = value;
    }
}

class Question{
    constructor(num){
        this.text = "";
        this.options = [];
        this.num = num;
        this.id = `question${num}`;
    }

    addText(text) {
        this.text = text;
    }

    addOption() {
        option = new Option();
        this.options.push(option);
    }
}

const questions = [];
var questionNum = 0;

