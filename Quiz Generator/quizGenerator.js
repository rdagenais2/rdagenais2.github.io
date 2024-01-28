// Classes

class Question{
    constructor(num) {
        this.num = num;
        this.options = [];
        this.optionNum = 0;
        var questionDiv = document.getElementById('questionDiv');
        //Create elements
        this.createElements();
        //Set attributes
        this.setAttributes();
        //Append children
        this.appendChildren(questionDiv);
    }

    createElements() {
        this.div = document.createElement('div');
        this.header = document.createElement('h3');
        this.removeButton = document.createElement('input');
        this.form = document.createElement('form');
        this.textLabel = document.createElement('label');
        this.textInput = document.createElement('input');
        this.optionButton = document.createElement('input');
        this.optionDiv = document.createElement('div');
    }

    setAttributes() {
        this.setIds();
        this.header.innerHTML = `Question ${this.num + 1}`;
        this.removeButton.setAttribute('type', 'button');
        this.removeButton.setAttribute('onclick', `removeQuestion(${this.num})`);
        this.removeButton.setAttribute('value', 'Remove Question');
        this.textLabel.innerHTML = 'Text';
        this.textInput.setAttribute('type', 'text');
        this.optionButton.setAttribute('type', 'button');
        this.optionButton.setAttribute('value', 'Add Option');
        this.optionButton.setAttribute('onclick', `questions[${this.num}].addOption()`);
    }

    setIds() {
        this.id = `question${this.num}`;
        this.div.setAttribute('id', `${this.id}Div`);
        this.textLabel.setAttribute('for', `${this.id}Text`);
        this.textInput.setAttribute('id', `${this.id}Text`);
        this.textInput.setAttribute('name', `${this.id}Text`);
        this.optionDiv.setAttribute('id', `${this.id}OptionDiv`);

    }

    appendChildren(questionDiv) {
        questionDiv.appendChild(this.div);
        this.div.appendChild(this.header);
        this.div.appendChild(this.removeButton);
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

    getOptionNum() {
        return this.optionNum;
    }

    getText() {
        return this.textInput.value;
    }

    getOption(i) {
        return this.options[i];
    }

    //set

    setText(text) {
        this.textInput.setAttribute('value', text);
    }

    setNum(num) {
        this.num = num;
        this.updateElementsNum();
    }

    //add

    addOption() {
        this.options.push(new Option(this.optionNum++, this));
    }

    //remove

    remove() {
        this.div.remove();
        questions.splice(this.num, 1);
    }

    removeOption(i) {
        this.options[i].remove();
        this.options.splice(i, 1);
        this.optionNum--;
    }

    //update

    updateElementsNum() {
        this.setIds();
        this.header.innerHTML = `Question ${this.num + 1}`;
        this.removeButton.setAttribute('onclick', `removeQuestion(${this.num})`);
        this.optionButton.setAttribute('onclick', `questions[${this.num}].addOption()`);
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
        this.removeButton = document.createElement('input');
        this.form = document.createElement('form');
        this.textLabel = document.createElement('label');
        this.valueLabel = document.createElement('label');
        this.textInput = document.createElement('input');
        this.valueInput = document.createElement('input');
        //Set attributes
        this.div.setAttribute('id', `${this.id}Div`);
        this.header.innerHTML = `Option ${this.num + 1}`;
        this.removeButton.setAttribute('type', 'button');
        this.removeButton.setAttribute('onclick', `questions[${this.question.getNum()}].removeOption(${this.num})`);
        this.removeButton.setAttribute('value', 'Remove Option');
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
        this.div.appendChild(this.removeButton);
        this.div.appendChild(this.form);
        this.form.appendChild(this.textLabel);
        this.form.appendChild(this.textInput);
        this.form.appendChild(this.valueLabel);
        this.form.appendChild(this.valueInput);
    }

    //get

    getId() {
        return this.id;
    }

    getNum() {
        return this.num;
    }

    getValue() {
        return this.valueInput.value;
    }

    getText() {
        return this.textInput.value;
    }

    //set

    setText(text) {
        this.textInput.setAttribute('value', text);
    }

    setValue(value) {
        this.valueInput.setAttribute('value', value);
    }

    //remove

    remove() {
        this.div.remove()
    }
}

class Result {
    constructor(num) {
        this.num = num;
        this.id = `result${this.num}`;
        var resultDiv = document.getElementById('resultDiv');
        //Create elements
        this.div = document.createElement('div');
        this.header = document.createElement('h3');
        this.form = document.createElement('form');
        this.textLabel = document.createElement('label');
        this.lowerLabel = document.createElement('label');
        this.upperLabel = document.createElement('label');
        this.detailLabel = document.createElement('label');
        this.textInput = document.createElement('input');
        this.lowerInput = document.createElement('input');
        this.upperInput = document.createElement('input');
        this.detailInput = document.createElement('textarea');
        //Set attributes
        this.div.setAttribute('id', `${this.id}Div`);
        this.header.innerHTML = `Result ${this.num + 1}`;
        this.textLabel.setAttribute('for', `${this.id}Text`);
        this.textLabel.innerHTML = 'Text';
        this.textInput.setAttribute('type', 'text');
        this.textInput.setAttribute('id', `${this.id}Text`);
        this.textInput.setAttribute('name', `${this.id}Text`);
        this.lowerLabel.setAttribute('for', `${this.id}Lower`);
        this.lowerLabel.innerHTML = 'Lower Value';
        this.lowerInput.setAttribute('type', 'number');
        this.lowerInput.setAttribute('id', `${this.id}Lower`);
        this.lowerInput.setAttribute('name', `${this.id}Lower`);
        this.upperLabel.setAttribute('for', `${this.id}Upper`);
        this.upperLabel.innerHTML = 'Upper Value';
        this.upperInput.setAttribute('type', 'number');
        this.upperInput.setAttribute('id', `${this.id}Upper`);
        this.upperInput.setAttribute('name', `${this.id}Upper`);
        this.detailLabel.setAttribute('for', `${this.id}Detail`);
        this.detailLabel.innerHTML = 'Detail';
        this.detailInput.setAttribute('id', `${this.id}Detail`);
        this.detailInput.setAttribute('name', `${this.id}Detail`);
        this.detailInput.setAttribute('rows', '5');
        this.detailInput.setAttribute('cols', '50');
        //Append children
        resultDiv.appendChild(this.div);
        this.div.appendChild(this.header);
        this.div.appendChild(this.form);
        this.form.appendChild(this.textLabel);
        this.form.appendChild(this.textInput);
        this.form.appendChild(this.lowerLabel);
        this.form.appendChild(this.lowerInput);
        this.form.appendChild(this.upperLabel);
        this.form.appendChild(this.upperInput);
        this.form.appendChild(this.detailLabel);
        this.form.appendChild(this.detailInput);
    }

    //get

    getText() {
        return this.textInput.value;
    }

    getLower() {
        return this.lowerInput.value;
    }

    getUpper() {
        return this.upperInput.value;
    }

    getDetail() {
        return this.detailInput.innerHTML;
    }

    //set

    setText(text) {
        this.textInput.setAttribute('value', text);
    }

    setLower(lower) {
        this.lowerInput.setAttribute('value', lower);
    }

    setUpper(upper) {
        this.upperInput.setAttribute('value', upper);
    }

    setDetail(detail) {
        this.detailInput.innerHTML = detail;
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
    questions[num].remove();
    questionNum--;

    for (let i = num; i < questionNum; i++) {
        questions[i].setNum(i);
    }
}

function addResult() {
    results.push(new Result(resultNum++));
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
        if(score >= ${result.getLower()} && score <= ${result.getUpper()}){
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
        <form>`;
        for (let j = 0; j < question.getOptionNum(); j++) {
            let option = question.getOption(j);
            output += `
            <input type='radio' id='${option.getId()}' name='${question.getId()}' value='option${option.getNum()}' onclick='setScore(${option.getValue()}, ${question.getNum()})'>
            <label for='${option.getId()}'>${option.getText()}</label>`;
        }
        output += `
        </form>`
    }
    output += `
    <input type='submit' value='Get Results' onclick='finalScore()'>
    </div>
    <div id='results'>
    <h1 id='resultHead'></h1>
    <p id='resultBody'></p>
    </div>`;
    document.getElementById('outputText').innerHTML = output;
    var iframe = document.getElementById('preview');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(output);
    iframe.contentWindow.document.close();
    iframe.setAttribute('width', '1000');
    iframe.setAttribute('height', '500');
    iframe.setAttribute('style', 'visibility: visible;');
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
    }
    addResult();
    addResult();
    addResult();

    results[0].setText("Negative");
    results[0].setDetail("You got a negative score");
    results[0].setLower(-3);
    results[0].setUpper(-1);
    results[1].setText("Neutral");
    results[1].setDetail("You got a neutral score");
    results[1].setLower(0);
    results[1].setUpper(0);
    results[2].setText("Positive");
    results[2].setDetail("You got a positive score");
    results[2].setLower(1);
    results[2].setUpper(3);
}

