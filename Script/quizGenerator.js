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
        this._removeButton = document.createElement('button');
        this._form = document.createElement('form');
        this._textDiv = document.createElement('div');
        this._textDataDiv = document.createElement('div');
        this._textStyleDiv = document.createElement('div');
        this._text = new TextProperty(`${this._id}`, 'Text');
    }

    setAttributes() {
        //base attributes
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('type', 'button');
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._removeButton.innerHTML = `Remove ${this._type.charAt(0).toUpperCase() + this._type.slice(1)}`;
        //class attributes
        this._div.classList.add(`${this._type}`);
        this._div.classList.add('elementDiv');
        this._removeButton.classList.add('removeButton');
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
        return this._text.text;
    }
    get textSize() {
        return this._text.size + 'px';
    }
    get textFont() {
        return this._text.font;
    }
    get textColor() {
        return this._text.color;
    }
    get bold(){
        return this._text.bold;
    }
    get italic(){
        return this._text.italic;
    }
    get underline(){
        return this._text.underline;
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
        this._text.text = text;
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
        this._optionButton = document.createElement('button');
        this._optionDiv = document.createElement('div');
        this._buttonStyle = new StyleProperty(`${this._id}Style`, 'Button Style', this);
    }

    setAttributes() {
        this.setIds();
        super.setAttributes();
        //base attributes
        this._text.size = '24';
        this._optionButton.setAttribute('type', 'button');
        this._optionButton.innerHTML = 'Add Option';
        this._optionButton.setAttribute('onclick', `questions[${this._num}].addOption()`);

        //class attributes
        this._optionButton.classList.add('addButton');
        this._optionButton.classList.add('option');
    }

    setIds() {
        super.setIds();
        this._optionDiv.setAttribute('id', `${this.id}OptionDiv`);
    }

    appendChildren() {
        super.appendChildren();
        this._div.appendChild(this._buttonStyle.div);
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
    get options(){
        return this._options;
    }
    get buttonStyle(){
        return this._buttonStyle.buttonStyle;
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
        this._value = new NumberProperty(`${this._id}Value`, 'Value', this);
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        //base attributes
        this._removeButton.setAttribute('onclick', `questions[${this._parent.num}].removeOption(${this._num})`);
        this._text.size = '16';
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
    get buttonStyle(){
        return this._value.buttonStyle;
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
    set buttonStyle(style){
        this._value.buttonStyle = style;
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
        this._lower = new NumberProperty(`${this._id}Lower`, 'Lower Value', this);
        this._upper = new NumberProperty(`${this._id}Upper`, 'Upper Value', this);
        this._detail = new TextProperty(`${this._id}Detail`, 'Detail', 'textArea');
    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        this._text.size = '32';
        this._detail.size = '16';
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
        return this._detail.text;
    }
    get detailSize() {
        return this._detail.size;
    }
    get detailFont() {
        return this._detail.font;
    }
    get detailColor() {
        return this._detail.color;
    }

    //setters

    set lower(lower) {
        this._lower.value = lower;
    }
    set upper(upper) {
        this._upper.value = upper;
    }
    set detail(detail) {
        this._detail.text = detail;
    }
    setNum(num) {
        super.num = num;
        this._lower.id = `${this._id}Lower`;
        this._upper.id = `${this._id}Upper`;
        this._detail.id = `${this._id}Detail`;
    }

    //update
    
}

class PropertyBar {
    constructor() {
        this._propertyDiv = document.createElement('div');
        this._dataDiv = document.createElement('div');
        this._styleDiv = document.createElement('div');
        this._propertyDiv.classList.add('propertyDiv');
        this._dataDiv.classList.add('dataDiv');
        this._styleDiv.classList.add('styleDiv');
        this._propertyDiv.appendChild(this._styleDiv);
        this._propertyDiv.appendChild(this._dataDiv);
    }

    get div(){
        return this._propertyDiv;
    }
}

class TextProperty extends PropertyBar{
    constructor(id, text, type="text"){
        super();
        this._id = id;
        this._text = text;
        if(type == "text"){
            this._data = new SimpleInput(this._id, this._text, 'text');
        }else if(type == "textArea"){
            this._data = new TextArea(this._id, this._text, "5", "50");
        }
        this._size = new SimpleInput(`${this._id}Size`, `${this._text} Size`, 'number');
        this._font = new DropdownInput(`${this._id}Font`, `${this._text} Font`, ['arial', 'helvetica', 'comic sans', 'times']);
        this._color = new SimpleInput(`${this._id}Color`, `${this._text} Color`, 'color');
        this._bold = new SimpleInput(`${this._id}Bold`, 'Bold', 'checkbox');
        this._italic = new SimpleInput(`${this._id}Italic`, 'Italic', 'checkbox');
        this._underline = new SimpleInput(`${this._id}Underline`, 'Underline', 'checkbox');
        this._dataDiv.appendChild(this._data.div);
        this._styleDiv.appendChild(this._size.div);
        this._styleDiv.appendChild(this._font.div);
        this._styleDiv.appendChild(this._color.div);
        this._styleDiv.appendChild(this._bold.div);
        this._styleDiv.appendChild(this._italic.div);
        this._styleDiv.appendChild(this._underline.div);
    }

    get text(){
        return this._data.value;
    }
    get size(){
        return this._size.value;
    }
    get font(){
        return this._font.value;
    }
    get color(){
        return this._color.value;
    }
    get bold(){
        if(this._bold.input.checked){
            return "bold";
        }
        return "normal";
    }
    get italic(){
        if(this._italic.input.checked){
            return "italic";
        }
        return "normal";
    }
    get underline(){
        if(this._underline.input.checked){
            return "underline";
        }
        return "none";
    }

    set text(text){
        this._data.value = text;
    }
    set size(size){
        this._size.value = size;
    }
    set font(font){
        this._font.value = font;
    }
    set color(color){
        this._color.value = color;
    }
}

class NumberProperty extends PropertyBar{
    constructor(id, text, parent){
        super();
        this._id = id;
        this._text = text;
        this._parent = parent;
        this._data = new SimpleInput(this._id, this._text, 'number');
        if(this._parent.type == "option"){
            this._buttonStyle = new ButtonPopup(`${this._id}ButtonStyle`, 'Button Style', this._parent, 'buttonStyle', "localOption");
            this._styleDiv.appendChild(this._buttonStyle.div);
        }

        this._dataDiv.appendChild(this._data.div);
    }

    get value(){
        return this._data.value;
    }
    get buttonStyle(){
        return this._buttonStyle;
    }

    set value(value){
        this._data.value = value;
    }
    set buttonStyle(style){
        this._buttonStyle.style = style;
    }
}

class StyleProperty extends PropertyBar{
    constructor(id, text, parent){
        super();
        this._id = id;
        this._text = text;
        this._parent = parent;
        this._buttonStyle = new ButtonPopup(`${this._id}ButtonStyle`, 'Button Style', this._parent, 'buttonStyle', "questionOption");
        this._styleDiv.appendChild(this._buttonStyle.div);
    }

    get buttonStyle(){
        return this._buttonStyle;
    }
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
        this._div.classList.add('inputArea');
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

class SimpleInput extends InputArea {
    constructor(id, text, type) {
        super(id, text);
        this._type = type;
        this._updateFunction;
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
        this._input.classList.add('simpleInput');
        this._div.classList.add(`${this._type}Input`);
        this._div.classList.add('simpleInputDiv');

    }
    get value() {
        return this._input.value;
    }
    get input(){
        return this._input;
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
        this._div.classList.add('textArea');
    }

    get value() {
        return this._input.innerHTML;
    }
    set value(value) {
        this._input.innerHTML = value;
    }
} 

class DropdownInput extends InputArea {
    constructor(id, text, optionList) {
        super(id, text);
        this._type = "dropdown";
        this._optionList = optionList;
        this.create();
        this.attributes();
        this.append();
    }

    create() {
        super.create();
        this._input = document.createElement('select');
        this._options = [];
        for (let i = 0; i < this._optionList.length; i++) {
            this._options[i] = document.createElement('option');
        }
    }

    attributes() {
        super.attributes();
        this._div.classList.add('dropdownInput');
        for (let i = 0; i < this._options.length; i++) {
            let option = this._options[i];
            let optionName = this._optionList[i];
            option.setAttribute('value', optionName);
            option.innerHTML = optionName.charAt(0).toUpperCase() + optionName.slice(1);
        }
    }

    append() {
        super.append();
        for (let i = 0; i < this._options.length; i++) {
            this._input.appendChild(this._options[i]);
        }
    }

    get value() {
        return this._input.value;
    }
}

class PropertyPopup extends InputArea{
    constructor(id, text, parent, accessor){
        super(id, text);
        this._parent = parent;
        this._accessor = accessor;
        this._popupWindow = document.getElementById('popup');
        this._popupBackground = document.getElementById('popupBackground');
        this._popupContent = document.getElementById('popupContent');
        this._exitButton = document.getElementById('exitButton');
        this.create();
        this.attributes();
        this.append();
    }
    create(){
        super.create();
        this._input = document.createElement('button');
        this._interfaceContent = document.createElement('div');
    }
    attributes(){
        super.attributes();
        this._input.setAttribute('type', 'button');
        this._input.setAttribute('onclick', `${this._parent.globalLocation}.${this._accessor}.popup()`);
        this._input.classList.add('styleButton');
        this._input.innerHTML = 'Open Menu';
    }

    popup(){
        this._popupWindow.style.display = "";
        this._popupBackground.style.display = "";
        this._exitButton.setAttribute('onclick', `${this._parent.globalLocation}.${this._accessor}.unpopup()`);
        this._popupContent.appendChild(this._interfaceContent);
    }

    unpopup(){
        this._popupWindow.style.display = "none";
        this._popupBackground.style.display = "none";
        this._popupContent.removeChild(this._interfaceContent);
    }
}

class ButtonPopup extends PropertyPopup{
    constructor(id, text, parent, accessor, type){
        super(id, text, parent, accessor);
        this._type = type;

        this._width = new SimpleInput(`${this._id}Width`, 'Button Width', 'number');
        this._height = new SimpleInput(`${this._id}Height`, 'Button Height', 'number');
        this._buttonColor = new SimpleInput(`${this._id}ButtonColor`, 'Button Color', 'color');
        this._showBorder = new SimpleInput(`${this._id}Border`, 'Show Border', 'checkbox');
        this._borderRadius = new SimpleInput(`${this._id}BorderRadius`, 'Border Radius', 'range');
        this._exampleContent = document.createElement('div');
        this._exampleButton = document.createElement('button');
        if(this._type == "questionOption"){
            this._finalizeButton = document.createElement('button');
        }

        this._width.input.setAttribute('onchange', `${this._parent.globalLocation}.buttonStyle.updateButton()`);
        this._height.input.setAttribute('onchange', `${this._parent.globalLocation}.buttonStyle.updateButton()`);
        this._buttonColor.input.setAttribute('onchange', `${this._parent.globalLocation}.buttonStyle.updateButton()`);
        this._showBorder.input.setAttribute('onchange', `${this._parent.globalLocation}.buttonStyle.updateButton()`);
        this._borderRadius.input.setAttribute('onchange', `${this._parent.globalLocation}.buttonStyle.updateButton()`);

        this._exampleButton.classList.add('exampleButton');
        this._exampleButton.style.textAlign = ""
        this._exampleButton.innerHTML = this._parent.text;
        this._exampleButton.style.fontFamily = this._parent.textFont;
        this._exampleButton.style.fontSize = this._parent.textSize;
        this._exampleButton.style.color = this._parent.textColor;
        this._width.value = 100;
        this._height.value = 50;
        this._buttonColor.value = "#FFFFFF";
        this._showBorder.input.checked = true;
        this._borderRadius.input.value = 0;
        this._borderRadius.input.max = "50";
        this._interfaceContent.classList.add('interfaceContent');
        this._exampleContent.classList.add('exampleContent');
        if(this._type == "questionOption"){
            this._finalizeButton.innerHTML = "Finalize Design?";
            this._finalizeButton.setAttribute('onclick', `${this._parent.globalLocation}.buttonStyle.finalize()`);
            this._finalizeButton.classList.add('finalizeButton');
        }

        this._interfaceContent.appendChild(this._height.div);
        this._interfaceContent.appendChild(this._width.div);
        this._interfaceContent.appendChild(this._buttonColor.div);
        this._interfaceContent.appendChild(this._showBorder.div);
        this._interfaceContent.appendChild(this._borderRadius.div);
        if(this._type == "questionOption"){
            this._interfaceContent.appendChild(this._finalizeButton);
        }
        this._exampleContent.appendChild(this._exampleButton);
    }

    popup(){
        super.popup();
        this._popupWindow.style.width = "40vw";
        this._popupWindow.style.marginLeft = "-20vw";
        this._popupContent.style.width = "38vw";
        this._interfaceContent.style.width = "15vw";
        this._exampleContent.style.width = "20vw";
        this._popupContent.appendChild(this._exampleContent);
        this.updateButton();
    }

    unpopup(){
        super.unpopup();
        this._popupContent.removeChild(this._exampleContent);
    }

    updateButton(){
        this._exampleButton.style.height = this.height;
        this._exampleButton.style.width = this.width;
        this._exampleButton.style.backgroundColor = this.color;
        this._exampleButton.style.border = this.border;
        this._exampleButton.style.borderRadius = this.radius;
        this._exampleButton.style.marginTop = this._height.value * -0.5 +"px";
        this._exampleButton.style.left = "10vw";
        this._exampleButton.style.marginLeft = this._width.value * -0.5 + "px";
        this._exampleButton.innerHTML = this._parent.text;
        this._exampleButton.style.fontFamily = this._parent.textFont;
        this._exampleButton.style.fontSize = this._parent.textSize;
        this._exampleButton.style.color = this._parent.textColor;
        this._exampleButton.style.fontWeight = this._parent.bold;
        this._exampleButton.style.fontStyle = this._parent.italic;
        this._exampleButton.style.textDecoration = this._parent.underline;
    }

    finalize(){

        for(let i = 0; i < this._parent.options.length; i++){
            this._parent.getOption(i).buttonStyle = this;
        }
    }

    get width(){
        return this._width.value + "px";
    }
    get height(){
        return this._height.value + "px";
    }
    get color(){
        return this._buttonColor.value;
    }
    get border(){
        if(this._showBorder.input.checked){
            return "solid black";
        }else{
            return "none";
        }
    }
    get radius(){
        return this._borderRadius.input.value + "%";
    }
    get data(){
        return [this._width.value, this._height.value, this._buttonColor.value, this._showBorder.input.checked, this._borderRadius.input.value];
    }
    set style(style){
        let data = style.data;
        this._width.value = data[0];
        this._height.value = data[1];
        this._buttonColor.value = data[2];
        this._showBorder.input.checked = data[3];
        this._borderRadius.input.value = data[4];
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
    preview.innerHTML = "";
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
            let resultHead = document.getElementById('resultHead');
            let resultBody = document.getElementById('resultBody');
            resultHead.innerHTML = '${result.text}';
            resultHead.style.fontSize =  '${result.textSize}';
            resultHead.style.fontFamily = '${result.textFont}';
            resultHead.style.color = '${result.textColor}';
            resultBody.innerHTML = '${result.detail}';
            resultBody.style.fontSize = '${result.detailSize}';
            resultBody.style.fontFamily = '${result.detailFont}';
            resultBody.style.color = '${result.detailColor}';
            resultBody.style.fontWeight = '${result.bold}';
            resultBody.style.fontStyle = '${result.italic}';
            resultBody.style.textDecoration = '${result.underline}';
        }
        `;
    }
    scriptContent += '}';
    script.innerHTML = scriptContent;

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let header = document.createElement('h1');
        header.innerHTML = question.text;
        header.style.fontSize = question.textSize;
        header.style.fontFamily = question.textFont;
        header.style.color = question.textColor;
        header.style.fontWeight = question.bold;
        header.style.fontStyle = question.italic;
        header.style.textDecoration = question.underline;
        let form = document.createElement('form');
        body.appendChild(header);
        body.appendChild(form);

        for (let j = 0; j < question.optionNum; j++) {
            let option = question.getOption(j);
            let button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('onclick', `setScore(${i}, ${option.value})`);
            button.style.fontSize = option.textSize;
            button.style.fontFamily = option.textFont;
            button.style.color = option.textColor;
            button.style.fontWeight = option.bold;
            button.style.fontStyle = option.italic;
            button.style.textDecoration = option.underline;
            button.style.height = option.buttonStyle.height;
            button.style.width = option.buttonStyle.width;
            button.style.backgroundColor = option.buttonStyle.color;
            button.style.border = option.buttonStyle.border;
            button.style.borderRadius = option.buttonStyle.radius;
            button.classList.add('quiz');
            button.innerHTML = option.text;
            form.appendChild(button);
        }

    }

    let doneButton = document.createElement('button');
    doneButton.setAttribute('type', 'button');
    doneButton.innerHTML = 'Get Result';
    doneButton.setAttribute('onclick', 'finalScore()');
    doneButton.classList.add('quiz');
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

