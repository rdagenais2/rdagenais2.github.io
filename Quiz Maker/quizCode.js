class Option{
    constructor(num, question){
        this.text = "";
        this.value = 0;
        this.num = num;
        this.id = `option${num}`;
        this.question = question;
    }
    //Set functions

    setText(text) {
        this.text = text;
    }

    setValue(value) {
        this.value = value;
    }

    setNum(num) {
        this.num = num;
        this.id = `option${num}`;
    }

    setQuestion(question) {
        this.question = question;
    }

    //Get functions
}

class Question{
    constructor(num){
        this.text = "";
        this.options = [];
        this.num = num;
        this.id = `question${num}`;
        this.optionNum = 0;
    }

    //Set funtions

    setText(text) {
        this.text = text;
    }

    setNum(num) {
        this.num = num;
        this.id = `question${num}`;
    }

    //Get functions

    getText() {
        return this.text;
    }

    getOption(optionNum) {
        if (optionNum < this.optionNum) {
            return options[optionNum];
        }
    }

    getNum() {
        return this.num;
    }

    getID() {
        return this.id;
    }

    getOptionNum() {
        return this.optionNum;
    }

    //Add functions

    addOption() {
        option = new Option();
        this.options.push(option);
    }

}



const questions = [];
var questionNum = 0;

function addQuestion() {
    let q = new Question(questionNum);
    questions.push(q);
    questionNum++;
    updateInterface();
}

function updateInterface() {
    let interfaceHTML = ``;
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        interfaceHTML += `
        <div id='${question.getID()}div'>
        <h3>Question ${question.getNum() + 1}</h3>
        <label for='${question.getID()}'text>Text</label>
        <input type='text' id='${question.getID()}text' name='${question.getID()}text'>`;
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            interfaceHTML += `
            <br>
            <div id ='${option.getID()}div'>
            <h4>Option ${option.getNum(}`
        }
    }
    interfaceHTML += `\n<input type="submit" value="Add Question" onclick="addQuestion()"/>`;
    document.getElementById("interface").innerHTML = interfaceHTML;
}

function displayData() {
    console.log(questions);
}

