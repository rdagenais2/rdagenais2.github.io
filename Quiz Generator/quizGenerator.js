// Classes

class QuizElement {
    constructor(num, type, parentObject = null) {
        this._num = num;
        this._type = type;
        this._parent = parentObject;
        if (this._parent != null) {
            this._mainDiv = document.getElementById(`${this._parent.id}${this._type.charAt(0).toUpperCase() + this._type.slice(1)}Div`);
        } else {
            this._mainDiv = document.getElementById(`${type}Div`);
        }
    }

    createElements() {
        this._div = document.createElement('div');
        if (this._parent != null) {
            this._header = document.createElement('h4');
        } else {
            this._header = document.createElement('h3');
        }
        this._removeButton = document.createElement('input');
        this._form = document.createElement('form');
        this._textLabel = document.createElement('label');
        this._textInput = document.createElement('input');
    }

    setAttributes() {
        //base attributes
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('type', 'button');
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._removeButton.setAttribute('value', `Remove ${this._type.charAt(0).toUpperCase() + this._type.slice(1)}`);
        this._textLabel.innerHTML = 'Text';
        this._textInput.setAttribute('type', 'text');

        //class attributes
        this._div.classList += `${this._type} `
        this._div.classList += 'elementDiv ';
        this._removeButton.classList += 'removeButton ';
    }

    setIds() {
        this._id = this.id;
        this._div.setAttribute('id', `${this._id}Div`);
        this._textLabel.setAttribute('for', `${this._id}Text`);
        this._textInput.setAttribute('id', `${this._id}Text`);
        this._textInput.setAttribute('name', `${this._id}Text`);
    }

    appendChildren() {
        this._mainDiv.appendChild(this._div);
        this._div.appendChild(this._header);
        this._div.appendChild(this._removeButton);
        this._div.appendChild(this._form);
        this._form.appendChild(this._textLabel);
        this._form.appendChild(this._textInput);
    }

    //getters

    get num() {
        return this._num;
    }
    get type() {
        return this._type;
    }
    get id() {
        if (this._parent != null) {
            return `${this._parent.id}${this._type}${this._num}`
        } else {
            return `${this._type}${this._num}`;
        }
    }
    get text() {
        return this._textInput.value;
    }
    get parent() {
        return this._parent;
    }

    //setters

    set num(num) {
        this._num = num;
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._id = this.id;
        this._div.setAttribute('id', `${this._id}Div`);
        this._textLabel.setAttribute('for', `${this._id}Text`);
        this._textInput.setAttribute('id', `${this._id}Text`);
        this._textInput.setAttribute('name', `${this._id}Text`);
    }
    set text(text) {
        this._textInput.setAttribute('value', text);
    }

    //update
    parentUpdate() {
        if (this._parent != null) {
            this.num = this._num;
        }
    }

    //remove

    remove() {
        this._div.remove();
    }
}

class Question extends QuizElement{
    constructor(num) {
        super(num, 'question');
        this._options = [];
        this._optionNum = 0;
        this.createElements();
        this.setAttributes();
        this.appendChildren();
    }

    createElements() {
        super.createElements();
        this._optionButton = document.createElement('input');
        this._optionDiv = document.createElement('div');
    }

    setAttributes() {
        this.setIds();
        super.setAttributes();
        //base attributes
        this._optionButton.setAttribute('type', 'button');
        this._optionButton.setAttribute('value', 'Add Option');
        this._optionButton.setAttribute('onclick', `questions[${this._num}].addOption()`);

        //class attributes
        this._optionButton.classList += 'addButton ';
        this._optionButton.classList += 'option ';
    }

    setIds() {
        super.setIds();
        this._optionDiv.setAttribute('id', `${this.id}OptionDiv`);
    }

    appendChildren() {
        super.appendChildren();
        this._div.appendChild(this._optionDiv);
        this._div.appendChild(this._optionButton);
    }

    //get

    get num() {
        return super.num;
    }
    get optionNum() {
        return this._optionNum;
    }
    getOption(i) {
        return this._options[i];
    }

    //set

    set num(num) {
        super.num = num;
        this._optionButton.setAttribute('onclick', `questions[${super.num}].addOption()`);
        this._optionDiv.setAttribute('id', `${this._id}OptionDiv`);
        for (let i = 0; i < this._optionNum; i++) {
            this._options[i].num = i;
        }
    }

    //add

    addOption() {
        this._options.push(new Option(this._optionNum++, this));
    }

    //remove

    removeOption(i) {
        this._options[i].remove();
        this._options.splice(i, 1);
        this._optionNum--;

        for (let j = i; j < this._optionNum; j++) {
            this._options[j].num = j;
        }
    }
}

class Option extends QuizElement {
    constructor(num, question) {
        super(num, 'option', question);
        this.createElements();
        this.setAttributes();
        this.appendChildren();
    }

    createElements() {
        super.createElements();
        this._valueLabel = document.createElement('label');
        this._valueInput = document.createElement('input');
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        //base attributes
        this._removeButton.setAttribute('onclick', `questions[${this._parent.num}].removeOption(${this._num})`);
        this._valueLabel.innerHTML = 'Value';
        this._valueInput.setAttribute('type', 'number');

        //class attributes
       
    }

    setIds() {
        super.setIds();
        this._valueLabel.setAttribute('for', `${this._id}Value`);
        this._valueInput.setAttribute('name', `${this._id}Value`);
        this._valueInput.setAttribute('id', `${this._id}Value`);
    }

    appendChildren() {
        super.appendChildren();
        this._form.appendChild(this._valueLabel);
        this._form.appendChild(this._valueInput);
    }

    //getters

    get num() {
        return super.num;
    }
    get value() {
        return this._valueInput.value;
    }

    //setters

    set value(value) {
        this._valueInput.setAttribute('value', value);
    }
    set num(num) {
        super.num = num;
        this._removeButton.setAttribute('onclick', `questions[${this._parent.num}].removeOption(${this._num})`);
        this._valueLabel.setAttribute('for', `${this._id}Value`);
        this._valueInput.setAttribute('name', `${this._id}Value`);
        this._valueInput.setAttribute('id', `${this._id}Value`);
    }
}

class Result extends QuizElement{
    constructor(num) {
        super(num, 'result');
        this.createElements();
        this.setAttributes();
        this.appendChildren();
    }

    createElements() {
        super.createElements();
        this._lowerLabel = document.createElement('label');
        this._upperLabel = document.createElement('label');
        this._detailLabel = document.createElement('label');
        this._lowerInput = document.createElement('input');
        this._upperInput = document.createElement('input');
        this._detailInput = document.createElement('textarea');
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        this._lowerLabel.innerHTML = 'Lower Value';
        this._lowerInput.setAttribute('type', 'number');
        this._upperLabel.innerHTML = 'Upper Value';
        this._upperInput.setAttribute('type', 'number');
        this._detailLabel.innerHTML = 'Detail';
        this._detailInput.setAttribute('rows', '5');
        this._detailInput.setAttribute('cols', '50');
    }

    setIds() {
        super.setIds();
        this._lowerLabel.setAttribute('for', `${this._id}Lower`);
        this._lowerInput.setAttribute('id', `${this._id}Lower`);
        this._lowerInput.setAttribute('name', `${this._id}Lower`);
        this._upperLabel.setAttribute('for', `${this._id}Upper`);
        this._upperInput.setAttribute('id', `${this._id}Upper`);
        this._upperInput.setAttribute('name', `${this._id}Upper`);
        this._detailLabel.setAttribute('for', `${this._id}Detail`);
        this._detailInput.setAttribute('id', `${this._id}Detail`);
        this._detailInput.setAttribute('name', `${this._id}Detail`);
    }

    appendChildren() {
        super.appendChildren();
        this._form.appendChild(this._lowerLabel);
        this._form.appendChild(this._lowerInput);
        this._form.appendChild(this._upperLabel);
        this._form.appendChild(this._upperInput);
        this._form.appendChild(this._detailLabel);
        this._form.appendChild(this._detailInput);
    }

    //getters

    get lower() {
        return this._lowerInput.value;
    }
    get upper() {
        return this._upperInput.value;
    }
    get detail() {
        return this._detailInput.innerHTML;
    }

    //setters

    set lower(lower) {
        this._lowerInput.setAttribute('value', lower);
    }
    set upper(upper) {
        this._upperInput.setAttribute('value', upper);
    }
    set detail(detail) {
        this._detailInput.innerHTML = detail;
    }
    setNum(num) {
        super.num = num;
        this._lowerLabel.setAttribute('for', `${this._id}Lower`);
        this._lowerInput.setAttribute('id', `${this._id}Lower`);
        this._lowerInput.setAttribute('name', `${this._id}Lower`);
        this._upperLabel.setAttribute('for', `${this._id}Upper`);
        this._upperInput.setAttribute('id', `${this._id}Upper`);
        this._upperInput.setAttribute('name', `${this._id}Upper`);
        this._detailLabel.setAttribute('for', `${this._id}Detail`);
        this._detailInput.setAttribute('id', `${this._id}Detail`);
        this._detailInput.setAttribute('name', `${this._id}Detail`);
    }

    //update
    
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
    questions.splice(num, 1);
    questionNum--;

    for (let i = num; i < questionNum; i++) {
        questions[i].num = i;
    }
}

function addResult() {
    results.push(new Result(resultNum++));
}

function removeResult(num) {
    results[num].remove();
    results.splice(num, 1);
    resultNum--;

    for (let i = num; i < resultNum; i++) {
        results[i].num = i;
    }
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
        if(score >= ${result.lower} && score <= ${result.upper}){
            document.getElementById('resultHead').innerHTML = '${result.text}';
            document.getElementById('resultBody').innerHTML = '${result.detail}';
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
        <h1>${question.text}<h1>
        <form>`;
        for (let j = 0; j < question.optionNum; j++) {
            let option = question.getOption(j);
            output += `
            <input type='radio' id='${option.id}' name='${question.id}' value='option${option.num}' onclick='setScore(${option.value}, ${question.num})'>
            <label for='${option.id}'>${option.text}</label>`;
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
    
    questions[0].text = "Question 1";
    questions[1].text = "Question 2";
    questions[2].text = "Question 3";

    for (let i = 0; i < 3; i++) {
        questions[i].addOption();
        questions[i].addOption();
        questions[i].addOption();

        questions[i].getOption(0).text = "Positive";
        questions[i].getOption(0).value = 1;
        questions[i].getOption(1).text = "Neutral";
        questions[i].getOption(1).value = 0;
        questions[i].getOption(2).text = "Negative";
        questions[i].getOption(2).value = -1;
    }
    addResult();
    addResult();
    addResult();

    results[0].text = "Negative";
    results[0].detail = "You got a negative score";
    results[0].lower = -3;
    results[0].upper = -1;
    results[1].text = "Neutral";
    results[1].detail = "You got a neutral score";
    results[1].lower = 0;
    results[1].upper = 0;
    results[2].text = "Positive";
    results[2].detail = "You got a positive score";
    results[2].lower = 1;
    results[2].upper = 3;
}

