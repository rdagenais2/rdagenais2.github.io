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
        this._id = this.id;
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
        this._text = new TextInput(`${this._id}Text`, 'Text');
    }

    setAttributes() {
        //base attributes
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('type', 'submit');
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._removeButton.setAttribute('value', `Remove ${this._type.charAt(0).toUpperCase() + this._type.slice(1)}`);
        //this._removeButton.setAttribute('onmouseover', `${this.globalLocation}.removeHover(true)`);
        //this._removeButton.setAttribute('onmouseout', `${this.globalLocation}.removeHover(false)`);

        //class attributes
        this._div.classList += `${this._type} `
        this._div.classList += 'elementDiv ';
        this._removeButton.classList += 'removeButton ';
    }

    setIds() {
        this._id = this.id;
        this._div.setAttribute('id', `${this._id}Div`);
    }

    appendChildren() {
        this._mainDiv.appendChild(this._div);
        this._div.appendChild(this._header);
        this._div.appendChild(this._removeButton);
        this._div.appendChild(this._form);
        this._form.appendChild(this._text.div);
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
        return this._text.value;
    }
    get parent() {
        return this._parent;
    }
    get globalLocation() {
        if (this._type == 'question' || this._type == 'result') {
            return `${this._type}s[${this._num}]`;
        } else if (this._type == 'option') {
            return `${this._parent.type}s[${this._parent.num}].get${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`;
        }
    }

    //setters

    set num(num) {
        this._num = num;
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._id = this.id;
        this._div.setAttribute('id', `${this._id}Div`);
        this._text.id = `${this._id}Text`;
    }
    set text(text) {
        this._text.value = text;
    }

    //update
    parentUpdate() {
        if (this._parent != null) {
            this.num = this._num;
        }
    }
    /*
    removeHover(on) {
        if (on) {
            this._removeButton.setAttribute('value', `Remove ${this._type.charAt(0).toUpperCase() + this._type.slice(1)}`);
        } else if (!on) {
            this._removeButton.setAttribute('value', '--');
        }
    }
    */
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
        this._optionButton.setAttribute('type', 'submit');
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
        this._value = new NumberInput(`${this._id}Value`, 'Value');
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        //base attributes
        this._removeButton.setAttribute('onclick', `questions[${this._parent.num}].removeOption(${this._num})`);

        //class attributes
       
    }

    setIds() {
        super.setIds();
    }

    appendChildren() {
        super.appendChildren();
        this._form.appendChild(this._value.div);
    }

    //getters

    get num() {
        return super.num;
    }
    get value() {
        return this._value.value;
    }

    //setters

    set value(value) {
        this._value.value = value;
    }
    set num(num) {
        super.num = num;
        this._removeButton.setAttribute('onclick', `questions[${this._parent.num}].removeOption(${this._num})`);
        this._value.id = `${this._id}Value`;
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
        this._lower = new NumberInput(`${this._id}Lower`, 'Lower Value');
        this._upper = new NumberInput(`${this._id}Upper`, 'Upper Value');
        this._detail = new TextArea(`${this._id}Detail`, 'Detail', 5, 50);
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
    }

    setIds() {
        super.setIds();
    }

    appendChildren() {
        super.appendChildren();
        this._form.appendChild(this._lower.div);
        this._form.appendChild(this._upper.div);
        this._form.appendChild(this._detail.div);
    }

    //getters

    get lower() {
        return this._lower.value;
    }
    get upper() {
        return this._upper.value;
    }
    get detail() {
        return this._detail.value;
    }

    //setters

    set lower(lower) {
        this._lower.value = lower;
    }
    set upper(upper) {
        this._upper.value = upper;
    }
    set detail(detail) {
        this._detail.value = detail;
    }
    setNum(num) {
        super.num = num;
        this._lower.id = `${this._id}Lower`;
        this._upper.id = `${this._id}Upper`;
        this._detail.id = `${this._id}Detail`
    }

    //update
    
}

class InputArea {
    constructor(id, text) {
        this._id = id;
        this._text = text;
    }

    create() {
        this._div = document.createElement('div');
        this._label = document.createElement('label');
    }

    attributes() {
        this._div.setAttribute('id', `${this._id}Div`);
        this._label.setAttribute('for', this._id);
        this._label.innerHTML = this._text;
        this._input.setAttribute('id', this._id);
        this._input.setAttribute('name', this._id);
        this._div.classList += 'inputArea ';
    }

    append() {
        this._div.appendChild(this._label);
        this._div.appendChild(this._input);
    }

    //getters
    get div() {
        return this._div;
    }
    //set
    set id(id) {
        this._id = id;
        this._div.setAttribute('id', this._id);
        this._label.setAttribute('for', this._id);
        this._input.setAttribute('id', this._id);
        this._input.setAttribute('name', this._id);
    }
}

class TextInput extends InputArea {
    constructor(id, text) {
        super(id, text);
        this._type = "text";
        this.create();
        this.attributes();
        this.append();
    }
    create() {
        super.create();
        this._input = document.createElement('input');
    }
    attributes() {
        super.attributes();
        this._input.setAttribute('type', this._type);
        this._div.classList += 'textInput ';
    }
    get value() {
        return this._input.value;
    }
    set value(value) {
        this._input.setAttribute('value', value);
    }
}

class NumberInput extends InputArea {
    constructor(id, text) {
        super(id, text);
        this._type = "number";
        this.create();
        this.attributes();
        this.append();
    }
    create() {
        super.create();
        this._input = document.createElement('input');
    }
    attributes() {
        super.attributes();
        this._input.setAttribute('type', this._type);
        this._div.classList += 'numberInput ';
    }
    get value() {
        return this._input.value;
    }
    set value(value) {
        this._input.setAttribute('value', value);
    }
}

class TextArea extends InputArea{
    constructor(id, text, rows, columns) {
        super(id, text);
        this._type = 'textarea';
        this._rows = rows;
        this._columns = columns;
        this.create();
        this.attributes();
        this.append();
    }
    create() {
        super.create();
        this._input = document.createElement('textarea');
    }
    attributes() {
        super.attributes();
        this._input.setAttribute('rows', this._rows);
        this._input.setAttribute('cols', this._columns);
        this._div.classList += 'textArea ';
    }

    get value() {
        return this._input.innerHTML;
    }
    set value(value) {
        this._input.innerHTML = value;
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
    let output = document.getElementById('outputText');
    let preview = document.getElementById('preview');
    let script = document.createElement('script');
    let body = document.createElement('div');
    body.setAttribute('id', 'quizBody');
    preview.appendChild(script);
    preview.appendChild(body);

    let scriptContent = '';
    scriptContent += `
    var scores = [];
    function setScore(question, value){
        scores[question] = value;
    }
    function finalScore(){
        let score = 0;
        for(let i = 0; i < scores.length; i++){
            score += scores[i];
        }`;
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        scriptContent += `
        if(score >= ${result.lower} && score <= ${result.upper}){
            document.getElementById('resultHead').innerHTML = '${result.text}';
            document.getElementById('resultBody').innerHTML = '${result.detail}';
        }
        `;
    }
    scriptContent += '}';
    script.innerHTML = scriptContent;

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let header = document.createElement('h1');
        header.innerHTML = question.text;
        let form = document.createElement('form');
        body.appendChild(header);
        body.appendChild(form);

        for (let j = 0; j < question.optionNum; j++) {
            let option = question.getOption(j);
            let button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('onclick', `setScore(${i}, ${option.value})`);
            button.setAttribute('value', option.text);
            form.appendChild(button);
        }

    }

    let doneButton = document.createElement('input');
    doneButton.setAttribute('type', 'button');
    doneButton.setAttribute('value', 'Get Result');
    doneButton.setAttribute('onclick', 'finalScore()');
    body.appendChild(doneButton);

    let resultHead = document.createElement('h1');
    let resultBody = document.createElement('p');
    resultHead.setAttribute('id', 'resultHead');
    resultBody.setAttribute('id', 'resultBody');
    body.appendChild(resultHead);
    body.appendChild(resultBody);


    let previewText = preview.innerHTML;
    let start = previewText.lastIndexOf('</script>');

    for (let i = start; i < previewText.length - 1; i++) {
        if (previewText.charAt(i + 1) == '<') {
            previewText = previewText.substring(0, i + 1) + '\n' + previewText.substring(i + 1);
            i++;
        }
    }
    
    output.innerHTML = previewText;
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

