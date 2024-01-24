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
        this.id = `${this.question.getID()}option${this.num}`
    }

    setQuestion(question) {
        this.question = question;
        this.setID();
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

    //Remove functions

    removeOption(num) {
        //Collect data
        collectData()

        //Remove option
        this.options.splice(num, 1);
        this.optionNum--;

        //Update numbers
        for (let i = num; i < this.optionNum; i++) {
            let option = this.options[i];
            option.setNum(i);
        }

        //Update interface
        updateInterface();
    }

}

class Result {
    constructor(num, lowerVal) {
        this.text = "";
        this.detail = "";
        this.lowerVal = lowerVal;
        this.upperVal = lowerVal + 1;
        this.num = num;
        this.id = `result${num}`;
    }

    //Set functions

    setText(text) {
        this.text = text;
    }

    setDetail(detail) {
        this.detail = detail;
    }

    setLowerVal(lowerVal) {
        this.lowerVal = lowerVal;
    }

    setUpperVal(upperVal) {
        this.upperVal = upperVal;
    }

    setNum(num) {
        this.num = num;
        this.id = `result${num}`;
    }


    //Get functions

    getText() {
        return this.text;
    }

    getDetail() {
        return this.detail;
    }

    getLowerVal() {
        return this.lowerVal;
    }

    getUpperVal() {
        return this.upperVal;
    }

    getNum() {
        return this.num;
    }

    getID() {
        return this.id;
    }

}

//Global variables

const questions = [];
var questionNum = 0;
const results = [];
var resultNum = 0;

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
    for (let i = num; i < questionNum; i++) {
        let question = questions[i];
        question.setNum(i);
    }

    //Update interface
    updateInterface();
}

function addResult() {
    //Collect data
    collectData();

    //Add question
    let r = new Result(resultNum, 0);
    results.push(r);
    resultNum++;
    updateInterface();
}

function removeResult(num) {
    //Collect data
    collectData();

    //Remove result
    results.splice(num, 1);
    resultNum--;

    //Update numbers
    for (let i = num; i < resultNum; i++) {
        let result = results[i];
        result.setNum(i);
    }

    //Update interface
    updateInterface();
}

function collectData() {
    //Collect question data
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        question.setText(document.getElementById(`${question.getID()}Text`).value);
        //Collect option data
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            option.setText(document.getElementById(`${option.getID()}Text`).value);
            option.setValue(document.getElementById(`${option.getID()}Value`).value);
        }
    }
    //Collect result data
    for (let i = 0; i < resultNum; i++) {
        let result = results[i];
        result.setText(document.getElementById(`${result.getID()}Text`).value);
        result.setLowerVal(document.getElementById(`${result.getID()}LowerVal`).value);
        result.setUpperVal(document.getElementById(`${result.getID()}UpperVal`).value);
        result.setDetail(document.getElementById(`${result.getID()}Detail`).value);
    }
}

function replaceData() {
    //Collect question data
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        document.getElementById(`${question.getID()}Text`).value = question.getText();
        //Collect option data
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            document.getElementById(`${option.getID()}Text`).value = option.getText();
            document.getElementById(`${option.getID()}Value`).value = option.getValue();
        }
    }
    //Collect result data
    for (let i = 0; i < resultNum; i++) {
        let result = results[i];
        document.getElementById(`${result.getID()}Text`).value = result.getText();
        document.getElementById(`${result.getID()}LowerVal`).value = result.getLowerVal();
        document.getElementById(`${result.getID()}UpperVal`).value = result.getUpperVal();
        document.getElementById(`${result.getID()}Detail`).value = result.getDetail();
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

        //Add buttons for options

        interfaceHTML += `
        <br><br>
        <input type='submit' value='Add Option' onclick='questions[${question.getNum()}].addOption()' style='margin-left: 25px;'>
        </div>
        <br>`;
    }

    //Add buttons for questions

    interfaceHTML += `
    <input type="submit" value="Add Question" onclick="addQuestion()"/>
    <br>`;

    //Loop through result objects

    for (let i = 0; i < resultNum; i++) {
        let result = results[i];
        interfaceHTML += `
        <div id='${result.getID()}Div'>
        <h3>Result ${result.getNum() + 1}</h3>
        <input type='submit' value='Remove Result' onclick='removeResult(${i})' style='color: red;'>
        <br><br>
        <label for='${result.getID()}Text'>Text</label>
        <input type='text' id='${result.getID()}Text' name='${result.getID()}Text'>
        <br><br>
        <label for='${result.getID()}LowerVal'>Lower Value</label>
        <input type='number' id='${result.getID()}LowerVal' name='${result.getID()}LowerVal'>
        <label for='${result.getID()}UpperVal'>Upper Value</label>
        <input type='number' id='${result.getID()}UpperVal' name='${result.getID()}UpperVal'>
        <br><br>
        <label for='${result.getID()}Detail'>Detail</label>
        <br>
        <textarea id='${result.getID()}Detail' name='${result.getID()}Detail' rows='4' cols='50'></textarea>
        </div>
        <br>`;
    }

    //Add buttons for results

    interfaceHTML += `
    <br><br>
    <input type='submit' value='Add Result' onclick='addResult()'/>`;
    document.getElementById("interface").innerHTML = interfaceHTML;
    replaceData();
}

function outputCode() {
    let output = `<!DOCTYPE html>
    `;
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        output += `
        <h1>${question.getText()}<h1>
        <br>`;
    }
}

function displayData() {
    console.log(questions);
}

