// Classes

class Question{
    constructor(num) {
        this.num = num;
        this.id = `question${this.num}`;
        this.options = [];
        this.optionNum = 0;
        var questionDiv = document.getElementById('questionDiv');
        //Create elements
        this.div = document.createElement('div');
        this.header = document.createElement('h3');
        this.form = document.createElement('form');
        this.textLabel = document.createElement('label');
        this.textInput = document.createElement('input');
        this.optionButton = document.createElement('input');
        this.optionDiv = document.createElement('div');
        //Set attributes
        this.div.setAttribute('id', `${this.id}Div`);
        this.header.innerHTML = `Question ${this.num + 1}`;
        this.textLabel.setAttribute('for', `${this.id}Text`);
        this.textLabel.innerHTML = 'Text';
        this.textInput.setAttribute('type', 'text');
        this.textInput.setAttribute('name', `${this.id}Text`);
        this.textInput.setAttribute('id', `${this.id}Text`);
        this.optionButton.setAttribute('type', 'button');
        this.optionButton.setAttribute('value', 'Add Option');
        this.optionButton.setAttribute('onclick', `questions[${this.num}].addOption()`);
        this.optionDiv.setAttribute('id', `${this.id}OptionDiv`);
        //Append children
        questionDiv.appendChild(this.div);
        this.div.appendChild(this.header);
        this.div.appendChild(this.form);
        this.form.appendChild(this.textLabel);
        this.form.appendChild(this.textInput);
        this.div.appendChild(this.optionDiv);
        this.div.appendChild(this.optionButton);
    }

    //get

    getNum() {
        return this.num;
    }

    getId() {
        return this.id;
    }

    //add

    addOption() {
        this.options.push(new Option(this.optionNum++, this));
    }
}

class Option {
    constructor(num, question) {
        this.num = num;
        this.question = question;
        this.id = `${this.question.getId()}option${this.num}`;
        var optionDiv = document.getElementById(`${this.question.getId()}OptionDiv`);
        //Create elements
        this.div = document.createElement('div');
        this.header = document.createElement('h4');
        this.form = document.createElement('form');
        this.textLabel = document.createElement('label');
        this.valueLabel = document.createElement('label');
        this.textInput = document.createElement('input');
        this.valueInput = document.createElement('input');
        //Set attributes
        this.div.setAttribute('id', `${this.id}Div`);
        this.header.innerHTML = `Option ${this.num + 1}`;
        this.textLabel.setAttribute('for', `${this.id}Text`);
        this.textLabel.innerHTML = 'Text';
        this.valueLabel.setAttribute('for', `${this.id}Value`);
        this.valueLabel.innerHTML = 'Value';
        this.textInput.setAttribute('type', 'text');
        this.textInput.setAttribute('name', `${this.id}Text`);
        this.textInput.setAttribute('id', `${this.id}Text`);
        this.valueInput.setAttribute('type', 'number');
        this.valueInput.setAttribute('name', `${this.id}Value`);
        this.valueInput.setAttribute('id', `${this.id}Value`);
        //Append children
        optionDiv.appendChild(this.div);
        this.div.appendChild(this.header);
        this.div.appendChild(this.form);
        this.form.appendChild(this.textLabel);
        this.form.appendChild(this.textInput);
        this.form.appendChild(this.valueLabel);
        this.form.appendChild(this.valueInput);
    }
}

class Result {
    constructor(num, lowerVal, upperVal=lowerVal+1, text="", detail="") {
        this.text = "";
        this.detail = "";
        this.lowerVal = lowerVal;
        this.upperVal = upperVal;
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
    questions.push(new Question(questionNum++));
}

function removeQuestion(num) {
}

function addResult() {
}

function removeResult(num) {
}

function outputCode() {
    let output = `
    <script>
    const scores = [];
    const questionAmt = ${questionNum};
    function setScore(value, question){
        scores[question] = value;
    }
    function finalScore(){
        let score = 0;
        for(let i = 0; i < questionAmt; i++){
            score += scores[i];
        }`;
    for (let i = 0; i < resultNum; i++) {
        let result = results[i];
        output += `
        if(score >= ${result.getLowerVal()} && score <= ${result.getUpperVal()}){
            document.getElementById('resultHead').innerHTML = '${result.getText()}';
            document.getElementById('resultBody').innerHTML = '${result.getDetail()}';
        }`;
        if (i + 1 != resultNum) {
            output += "else";
        }
    }
    output+=`
    }
    </script>
    <div id='quizBody'>`;
    for (let i = 0; i < questionNum; i++) {
        let question = questions[i];
        output += `
        <h1>${question.getText()}<h1>
        <br>`;
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            output += `
            <input type='radio' id='${option.getID()}' name='${question.getID()}' value='option${option.getNum()}' onclick='setScore(${option.getValue()}, ${question.getNum()})'>
            <label for='${option.getID()}'>${option.getText()}</label>
            <br>`;
        }
        
    }
    output += `
    <br><br>
    <input type='submit' value='Get Results' onclick='finalScore()'>
    </div>
    <div id='results'>
    <h1 id='resultHead'></h1>
    <p id='resultBody'></p>
    </div>`;
    document.getElementById('outputText').innerHTML = output;
}

function showDevtools() {
    document.getElementById('devtools').style = 'visibility: visible;';
}

function displayData() {
    console.log(questions);
}

function autofill() {
    addQuestion();
    addQuestion();
    addQuestion();
    
    questions[0].setText("Question 1");
    questions[1].setText("Question 2");
    questions[2].setText("Question 3");

    replaceData();
    for (let i = 0; i < 3; i++) {
        questions[i].addOption();
        questions[i].addOption();
        questions[i].addOption();

        questions[i].getOption(0).setText("Positive");
        questions[i].getOption(0).setValue(1);
        questions[i].getOption(1).setText("Neutral");
        questions[i].getOption(1).setValue(0);
        questions[i].getOption(2).setText("Negative");
        questions[i].getOption(2).setValue(-1);

        replaceData();
    }
    addResult();
    addResult();
    addResult();

    results[0].setText("Negative");
    results[0].setDetail("You got a negative score");
    results[0].setLowerVal(-3);
    results[0].setUpperVal(-1);
    results[1].setText("Neutral");
    results[1].setDetail("You got a neutral score");
    results[1].setLowerVal(0);
    results[1].setUpperVal(0);
    results[2].setText("Positive");
    results[2].setDetail("You got a positive score");
    results[2].setLowerVal(1);
    results[2].setUpperVal(3);

    replaceData();

}

