// Classes

class Option{
    constructor(num, question){
        this.text = "";
        this.value = 0;
        this.num = num;
        this.question = question;
        this.id = `${this.question.getID()}option${num}`;
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
        this.setID();
    }

    setQuestion(question) {
        this.question = question;
        this.setID();
    }

    setID() {
        this.id = `${this.question.getID()}option${this.num}`;
    }

    //Get functions

    getText() {
        return this.text;
    }

    getValue() {
        return this.value;
    }

    getNum() {
        return this.num;
    }

    getID() {
        return this.id;
    }

    getQuestion() {
        return this.question;
    }

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
            return this.options[optionNum];
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
        //Collect data
        collectData();

        //Add option
        let option = new Option(this.optionNum, this);
        this.options.push(option);
        this.optionNum++;
        updateInterface();
    }

    removeOption(num) {
        //Collect data
        collectData()

        //Remove option
        this.options.splice(num, 1);
        this.optionNum--;

        //Update numbers
        for (let i = 0; i < this.optionNum; i++) {
            let option = this.options[i];
            option.setNum(i);
        }

        //Update interface
        updateInterface();
    }

}

//Global variables

const questions = [];
var questionNum = 0;

//Global functions

function addQuestion() {
    //Collect data
    collectData();

    //Add question
    let q = new Question(questionNum);
    questions.push(q);
    questionNum++;
    updateInterface();
}

function removeQuestion(num) {
    //Collect data
    collectData();

    //Remove question
    questions.splice(num, 1);
    questionNum--;

    //Update numbers
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        question.setNum(i);
    }

    //Update interface
    updateInterface();
}

function collectData() {
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        question.setText(document.getElementById(`${question.getID()}Text`).value);
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            option.setText(document.getElementById(`${option.getID()}Text`).value);
            option.setValue(document.getElementById(`${option.getID()}Value`).value);
        }
    }
}

function replaceData() {
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        document.getElementById(`${question.getID()}Text`).value = question.getText();
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            document.getElementById(`${option.getID()}Text`).value = option.getText();
            document.getElementById(`${option.getID()}Value`).value = option.getValue();
        }
    }
}

function updateInterface() {
    let interfaceHTML = ``;

    //Loop through Question objects
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        interfaceHTML += `
        <div id='${question.getID()}Div'>
        <h3>Question ${question.getNum() + 1}</h3>
        <input type='submit' value='Remove Question' onclick='removeQuestion(${i})' style='color: red;'>
        <br><br>
        <label for='${question.getID()}Text'>Text</label>
        <input type='text' id='${question.getID()}Text' name='${question.getID()}Text'>`;
        //Loop through Option objects
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            interfaceHTML += `
            <br>
            <div id ='${option.getID()}Div' style='margin-left: 25px;'>
            <h4>Option ${option.getNum() + 1}</h4>
            <input type='submit' value='Remove Option' onclick='questions[${question.getNum()}].removeOption(${j})' style='color: red;'>
            <label for='${option.getID()}Text'>Text</label>
            <input type='text' id='${option.getID()}Text' name='${option.getID()}Text'>
            <label for='${option.getID()}Value'>Value</label>
            <input type='number' id='${option.getID()}Value' name='${option.getID()}Value'>
            </div>`;
        }
        //Add buttons for questions
        interfaceHTML += `
        <br><br>
        <input type='submit' value='Add Option' onclick='questions[${question.getNum()}].addOption()' style='margin-left: 25px;'>
        </div>
        <br>`;
    }
    //Add buttons for options
    interfaceHTML += `\n<input type="submit" value="Add Question" onclick="addQuestion()"/>`;
    document.getElementById("interface").innerHTML = interfaceHTML;
    replaceData();
}

function displayData() {
    console.log(questions);
}

