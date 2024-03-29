// Classes
const fonts = ["Arial", "Veranda", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT", "Impact"];


class QuizElement {
    constructor(num = 0, type, parentObject = null) {
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
        this._text = new TextProperty(`${this._id}TextProperties_`, 'Text');
    }

    setAttributes() {
        //base attributes
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        if(this._type == "resultButton"){
            this._header.innerHTML = `Result Button`;
        }
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
    get size() {
        return this._text.size + 'px';
    }
    get rawSize(){
        return this._text.size;
    }
    get font() {
        return this._text.font;
    }
    get color() {
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
        }else if (this._type == "resultButton"){
            return "resultButton";
        }
    }

    set num(num) {
        this._num = num;
        this._header.innerHTML = `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} ${this._num + 1}`;
        this._removeButton.setAttribute('onclick', `remove${this._type.charAt(0).toUpperCase() + this._type.slice(1)}(${this._num})`);
        this._id = this.id;
        this._div.setAttribute('id', `${this._id}Div`);
        this._text.id = `${this._id}TextProperties_`;
    }
    set text(text) {
        this._text.text = text;
    }
    set size(size){
        this._text.size = size;
    }
    set font(font){
        this._text.font = font;
    }
    set color(color){
        this._text.color = color;
    }
    set bold(bold){
        this._text.bold = bold;
    }
    set italic(italic){
        this._text.italic = italic;
    }
    set underline(underline){
        this._text.underline = underline;
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
        this._styleButtons = new StyleProperty(`${this._id}Style`, this);
    }

    setAttributes() {
        this.setIds();
        super.setAttributes();
        //base attributes
        this._text.size = '24';
        this._text.bold = true;
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
        this._div.appendChild(this._styleButtons.div);
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
        return this._styleButtons.buttonStyle;
    }
    get textStyle(){
        return this._styleButtons.optionTextStyle;
    }

    getOption(i) {
        return this._options[i];
    }

    //set

    set num(num) {
        super.num = num;
        this._optionButton.setAttribute('onclick', `questions[${super.num}].addOption()`);
        this._optionDiv.setAttribute('id', `${this._id}OptionDiv`);
        this._styleButtons.id = this._id + "Style";
        
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
        this._quizType = false;
        this.createElements();
        this.setAttributes();
        this.appendChildren();
    }

    createElements() {
        super.createElements();
        this._lower = new NumberProperty(`${this._id}Lower`, 'Lower Value', this);
        this._upper = new NumberProperty(`${this._id}Upper`, 'Upper Value', this);
        this._value = new NumberProperty(`${this._id}Value`, 'Value', this);
        this._detail = new TextProperty(`${this._id}Detail`, 'Detail', 'textArea');

    }

    setAttributes() {
        super.setAttributes();
        this.setIds();
        this._lower.value = 0;
        this._upper.value = 0;
        this._text.size = '32';
        this._detail.size = '16';
        this._text.bold = true;
        this._lower.input.setAttribute('onchange', `validateRanges(${this._num}, 0)`);
        this._upper.input.setAttribute('onchange', `validateRanges(${this._num}, 1)`);
        this._value.input.setAttribute('onchange', `validateRanges(${this._num}, 2)`);
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
        return parseInt(this._lower.value);
    }
    get upper() {
        return parseInt(this._upper.value);
    }
    get value(){
        return this._value.value;
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
    get detailBold(){
        return this._detail.bold;
    }
    get detailItalic(){
        return this._detail.italic;
    }
    get detailUnderline(){
        return this._detail.underline;
    }
    get quizType(){
        return this._quizType;
    }

    //setters

    set lower(lower) {
        this._lower.value = lower;
    }
    set upper(upper) {
        this._upper.value = upper;
    }
    set value(value){
        this._value.value = value;
    }
    set detail(detail) {
        this._detail.text = detail;
    }
    set detailSize(size){
        this._detail.size = size;
    }
    set detailFont(font){
        this._detail.font = font;
    }
    set detailColor(color){
        this._detail.color = color;
    }
    set detailBold(bold){
        this._detail.bold = bold;
    }
    set detailItalic(italic){
        this._detail.italic = italic;
    }
    set detailUnderline(underline){
        this._detail.underline = underline;
    }
    set quizType(multi){
        if(multi && !this._quizType){
            this._quizType = multi;
            this._form.removeChild(this._upper.div);
            this._form.removeChild(this._lower.div);
            this._form.insertBefore(this._value.div, this._detail.div);
        }else if (!multi && this._quizType){
            this._quizType = multi;
            this._form.removeChild(this._value.div);
            this._form.insertBefore(this._lower.div, this._detail.div);
            this._form.insertBefore(this._upper.div, this._detail.div);
        }
    }
    setNum(num) {
        super.num = num;
        this._lower.id = `${this._id}Lower`;
        this._upper.id = `${this._id}Upper`;
        this._detail.id = `${this._id}Detail`;
        this._value.id = `${this._id}Value`;
    }

    //update
    
}

class ResultButton extends QuizElement{
    constructor(){
        super(0, "resultButton");
        this.createElements();
        this.setAttributes();
        this.appendChildren();
    }

    createElements() {
        super.createElements();
        this._styleButtons = new StyleProperty(`${this._id}Style`, this);
    }

    setAttributes() {
        this.setIds();
        super.setAttributes();
        //base attributes
        this._text.size = '16';
        this._text.bold = true;
        this._text.text = "Get Result";
    }

    setIds() {
        super.setIds();
    }

    appendChildren() {
        super.appendChildren();
        this._div.removeChild(this._removeButton);
        this._div.appendChild(this._styleButtons.div);
    }

    get div(){
        return this._div;
    }
    get buttonStyle(){
        return this._styleButtons.buttonStyle;
    }
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
    constructor(id, text, type="Text"){
        super();
        this._id = id;
        this._text = text;
        if(type == "Text"){
            this._data = new SimpleInput(`${this._id}Text`, this._text, 'text');
        }else if(type == "textArea"){
            this._data = new TextArea(`${this._id}Text`, this._text, "5", "50");
        }
        this._size = new SimpleInput(`${this._id}Size`, `${this._text} Size`, 'number');
        this._font = new DropdownInput(`${this._id}Font`, `${this._text} Font`, fonts, true);
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
        if(this._bold.value){
            return "bold";
        }
        return "normal";
    }
    get italic(){
        if(this._italic.value){
            return "italic";
        }
        return "normal";
    }
    get underline(){
        if(this._underline.value){
            return "underline";
        }
        return "none";
    }

    set id(id){
        this._id = id;
        this._data.id = this._id + "Text";
        this._size.id = this._id + "Size";
        this._font.id = this._id + "Font";
        this._color.id = this._id + "Color";
        this._bold.id = this._id + "Bold";
        this._italic.id = this._id + "Italic";
        this._underline.id = this._id + "Underline";
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
    set bold(bold){
        this._bold.value = bold;
    }
    set italic(italic){
        this._italic.value = italic;
    }
    set underline(underline){
        this._underline.value = underline;
    }
}

class NumberProperty extends PropertyBar{
    constructor(id, text, parent){
        super();
        this._id = id;
        this._text = text;
        this._parent = parent;
        this._data = new SimpleInput(this._id + "Data", this._text, 'number');
        if(this._parent.type == "option"){
            this._buttonStyle = new ButtonPopup(`${this._id}ButtonStyle`, 'Button Style', this._parent, 'buttonStyle', "localOption");
            this._styleDiv.appendChild(this._buttonStyle.div);
        }

        this._dataDiv.appendChild(this._data.div);
    }

    get input(){
        return this._data.input;
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
    set id(id){
        this._id = id;
        this._data.id = this._id + "Data";
        this._buttonStyle.id = this._id + "ButtonStyle";
    }
}

class StyleProperty extends PropertyBar{
    constructor(id, parent = null){
        super();
        this._id = id;  
        this._parent = parent;
        if(this._parent != null && this._parent.type == "question"){
            this._buttonStyle = new ButtonPopup(`${this._id}ButtonStyle`, 'Option Button Style', this._parent, 'buttonStyle', "questionOption");
            this._optionTextStyle = new TextPopup(`${this._id}TextStyle`, 'Option Text Style', this._parent, 'textStyle', 'options');
        }else if(this._parent == null){
            this._questionTextStyle = new TextPopup(`${this._id}QuestionTextStyle`, 'Question Text Style', this._parent, 'questionTextStyle', 'questions');
            this._optionTextStyle = new TextPopup(`${this._id}OptionTextStyle`, 'Option Text Style', this._parent, 'optionTextStyle', 'options');
            this._resultTextStyle = new TextPopup(`${this._id}ResultTextStyle`, 'Result Text Style', this._parent, 'resultTextStyle', 'results');
            this._detailTextStyle = new TextPopup(`${this._id}DetailTextStyle`, 'Detail Text Style', this._parent, 'detailTextStyle', 'details');
            this._buttonStyle = new ButtonPopup(`${this._id}ButtonStyle`, 'Option Button Style', this._parent, 'buttonStyle', 'globalOption');
            this._quizType = new SimpleInput(`${this._id}QuizType`, 'Multi-Result Quiz?', 'checkbox');
            this._quizType.input.setAttribute('onchange', 'changeQuizType()');
            this._styleDiv.appendChild(this._quizType.div);
            this._styleDiv.appendChild(this._questionTextStyle.div);
        }else if(this._parent.type == "resultButton"){
            this._buttonStyle = new ButtonPopup(`${this._id}`, 'Result Button Style', this._parent, 'buttonStyle', 'resultButton');
        }
        if((this._parent != null && this._parent.type == "question")||(this._parent == null)){ 
            this._styleDiv.appendChild(this._optionTextStyle.div);
        }
        if(this._parent == null){
            this._styleDiv.appendChild(this._resultTextStyle.div);
            this._styleDiv.appendChild(this._detailTextStyle.div);
        }
        this._styleDiv.appendChild(this._buttonStyle.div);
    }

    get buttonStyle(){
        return this._buttonStyle;
    }
    get optionTextStyle(){
        return this._optionTextStyle;
    }
    get resultTextStyle(){
        return this._resultTextStyle;
    }
    get questionTextStyle(){
        return this._questionTextStyle;
    }
    get detailTextStyle(){
        return this._detailTextStyle;
    }
    get quizType(){
        return this._quizType;
    }

    set id(id){
        this._id = id;
        if(this._parent != null && this._parent.type == "question"){
            this._buttonStyle.id = this._id + 'ButtonStyle';
            this._optionTextStyle.id = this._id + 'TextStyle';
        }else if(this._parent == null){
            this._questionTextStyle.id = this._id + 'QuestionTextStyle';
            this._optionTextStyle.id = this._id + 'OptionTextStyle';
            this._resultTextStyle.id = this._id + 'ResultTextStyle';
            this._detailTextStyle.id = this._id + 'DetailTextStyle';
            this._buttonStyle.id = this._id + 'ButtonStyle';
        }
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
        this._div.setAttribute('id', this._id + "Div");
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
        if(this._input.type == "number"){
            this._input.value = 0;
            this._input.setAttribute('step', '1');
            this._input.setAttribute('onchange', 'if(this.value == "" || this.value < 0){this.value = 0}; this.value = parseInt(this.value);');
        }
        this._input.classList.add('simpleInput');
        this._div.classList.add(`${this._type}Input`);
        this._div.classList.add('simpleInputDiv');

    }
    get value() {
        if(this._type == "checkbox"){
            return this._input.checked;
        }
        if(this._type == "number"){
            return parseInt(this._input.value);
        }
        return this._input.value;
    }
    get input(){
        return this._input;
    }
    set value(value) {
        if(this._type == "checkbox"){
            this._input.checked = value;
        }else if(this._type == "number"){
            this._input.value = parseInt(value);
        }else{

            this._input.value = value;
        }
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
    constructor(id, text, optionList, fontDropdown = false) {
        super(id, text);
        this._type = "dropdown";
        this._optionList = optionList;
        this._fontDropdown = fontDropdown;
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
            if(this._fontDropdown){
                option.setAttribute('font-family', optionName);
            }
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
    get input(){
        return this._input;
    }
    set value(value){
        this._input.value = value;
    }
}

class PropertyPopup extends InputArea{
    constructor(id, text, parent, accessor){
        super(id, text);
        this._parent = parent;
        this._accessorSave = accessor;
        this._accessor = accessor;
        if(this._parent != null){
            this._accessor = this._parent.globalLocation + "." + this._accessor;
        }
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
        this._input.setAttribute('onclick', `${this._accessor}.popup()`);
        this._input.classList.add('styleButton');
        this._input.innerHTML = 'Open Menu';
        this._interfaceContent.classList.add('interfaceContent');
    }

    popup(){
        this._popupWindow.style.display = "";
        this._popupBackground.style.display = "";
        this._exitButton.setAttribute('onclick', `${this._accessor}.unpopup()`);
        this._popupContent.appendChild(this._interfaceContent);
    }

    unpopup(){
        this._popupWindow.style.display = "none";
        this._popupBackground.style.display = "none";
        this._popupContent.removeChild(this._interfaceContent);
    }

    set accessor(accessor){
        this._accessor = accessor;
        if(this._parent != null){
            this._accessor = this._parent.globalLocation + "." + this._accessor;
        }
        this._input.setAttribute('onclick', `${this._accessor}.popup()`);
        this._exitButton.setAttribute('onclick', `${this._accessor}.unpopup()`);
    }
}

class ButtonPopup extends PropertyPopup{
    constructor(id, text, parent, accessor, type){
        super(id, text, parent, accessor);
        this._type = type;

        this._textPosition = new DropdownInput(`${this._id}TextPosition`, 'Text Position', ['center', 'top', 'bottom']);
        this._textOffset = new SimpleInput(`${this._id}TextOffset`, 'Text Offset', 'number');
        this._width = new SimpleInput(`${this._id}Width`, 'Button Width', 'number');
        this._height = new SimpleInput(`${this._id}Height`, 'Button Height', 'number');
        this._buttonColor = new SimpleInput(`${this._id}ButtonColor`, 'Button Color', 'color');
        this._backgroundImage = new SimpleInput(`${this._id}Image`, "Background Image", 'text');
        this._borderStyle = new DropdownInput(`${this._id}BorderStyle`, 'Border Style', ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge']);
        this._borderWidth = new SimpleInput(`${this._id}BorderWidth`, 'Border Width', 'number');
        this._borderColor = new SimpleInput(`${this._id}BorderColor`, "Border Color", 'color');
        this._borderXRadius = new SimpleInput(`${this._id}BorderXRadius`, 'Border X Radius', 'range');
        this._borderYRadius = new SimpleInput(`${this._id}BorderYRadius`, 'Border Y Radius', 'range');
        this._xMargins = new SimpleInput(`${this._id}XMargins`, 'X Margins', 'number');
        this._yMargins = new SimpleInput(`${this._id}YMargins`, 'Y Margins', 'number');
        this._outlineColor = new SimpleInput(`${this._id}OutlineColor`, 'Outline Color', 'color');
        this._exampleContent = document.createElement('div');
        this._exampleButton = document.createElement('button');
        this._exampleText = document.createElement('p');
        if(this._type == "questionOption" || this._type == "globalOption"){
            this._finalizeButton = document.createElement('button');
        }

        this._textPosition.input.setAttribute('onchange', `${this._accessor}.updateButton()`);
        this._textOffset.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._width.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._height.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._buttonColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._backgroundImage.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderStyle.input.setAttribute('onchange', `${this._accessor}.updateButton()`);
        this._borderWidth.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderXRadius.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderYRadius.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._xMargins.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._yMargins.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._outlineColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);

        this._exampleButton.classList.add('exampleButton');
        this._exampleButton.style.textAlign = "";
        this._exampleButton.style.outline = 'none';

        this._exampleButton.style.outline = 'none';
        this._exampleButton.style.backgroundSize = "cover";
        this._exampleButton.style.backgroundPosition = "center";
        this._exampleText.innerHTML = "EXAMPLE";
        this._exampleText.style.position = "absolute";
        this._exampleText.style.whiteSpace = "nowrap";
        this._textPosition.value = 'center';
        this._textOffset.value = 0;

        this._width.value = 100;
        this._height.value = 50;
        this._buttonColor.value = "#FFFFFF";
        this._borderStyle.value = "solid";
        this._borderWidth.value = 1;
        this._borderColor.value = "#000000";
        this._borderXRadius.input.value = 0;
        this._borderXRadius.input.max = 50;
        this._borderYRadius.input.value = 0;
        this._borderYRadius.input.max = 50;
        this._xMargins.value = 0;
        this._yMargins.value = 0;
        this._outlineColor.value = "#0000FF";
        this._exampleContent.classList.add('exampleContent');
        if(this._type == "questionOption" || this._type == "globalOption"){
            this._finalizeButton.innerHTML = "Finalize Design?";
            this._finalizeButton.setAttribute('onclick', `${this._accessor}.finalize()`);
            this._finalizeButton.classList.add('finalizeButton');
            this._finalizeButton.setAttribute('id', `${this._id}FinalizeButton`);
        }

        this._interfaceContent.appendChild(this._textPosition.div);
        this._interfaceContent.appendChild(this._textOffset.div);
        this._interfaceContent.appendChild(this._height.div);
        this._interfaceContent.appendChild(this._width.div);
        this._interfaceContent.appendChild(this._buttonColor.div);
        this._interfaceContent.appendChild(this._backgroundImage.div);
        this._interfaceContent.appendChild(this._borderStyle.div);
        this._interfaceContent.appendChild(this._borderWidth.div);
        this._interfaceContent.appendChild(this._borderColor.div);
        this._interfaceContent.appendChild(this._borderXRadius.div);
        this._interfaceContent.appendChild(this._borderYRadius.div);
        this._interfaceContent.appendChild(this._xMargins.div);
        this._interfaceContent.appendChild(this._yMargins.div);
        this._interfaceContent.appendChild(this._outlineColor.div);
        if(this._type == "questionOption" || this._type == "globalOption"){
            this._interfaceContent.appendChild(this._finalizeButton);
        }
        this._exampleContent.appendChild(this._exampleButton);
        this._exampleButton.appendChild(this._exampleText);
        this.updateButton();

    }

    popup(){
        super.popup();
        this._popupWindow.style.height = "80vh";
        this._popupWindow.style.marginTop = "-40vh";
        this._popupWindow.style.width = "55vw";
        this._popupWindow.style.marginLeft = "-27.5vw";
        this._popupContent.style.height = "73vh"
        this._popupContent.style.width = "53vw";
        this._interfaceContent.style.height = "78vh";
        this._interfaceContent.style.width = "30vw";
        this._exampleContent.style.height = "78vh";

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

        this._exampleButton.style.backgroundImage = `url(${this.imageSource})`;

        this._exampleButton.style.border = this.border;
        this._exampleButton.style.borderRadius = this.radius;
        this._exampleButton.style.marginTop = this._height.value * -0.5 +"px";
        this._exampleButton.style.left = "10vw";
        this._exampleButton.style.marginLeft = this._width.value * -0.5 + "px";
        this._exampleButton.setAttribute('onclick', `if(this.style.outline == 'none'){this.style.outline = '${this.outline}'; this.style.outlineOffset = '${this.outlineOffset}';}else{this.style.outline = 'none';}`);
        if(this._exampleButton.style.outline != 'none'){
            this._exampleButton.style.outline = this.outline;
        }
        if(this._parent != null && (this._parent.type == "option" || this._parent.type == "resultButton")){
            this._exampleText.innerHTML = this._parent.text;
            this._exampleText.style.fontFamily = this._parent.font;
            this._exampleText.style.fontSize = this._parent.size;
            this._exampleText.style.color = this._parent.color;
            this._exampleText.style.fontWeight = this._parent.bold;
            this._exampleText.style.fontStyle = this._parent.italic;
            this._exampleText.style.textDecoration = this._parent.underline;
        }
        this.updateText();
        
    }

    updateText(){
        this._exampleText.style.margin = "0px 0px 0px 0px";
        switch(this._textPosition.value){
            case "center":
                this._exampleText.style.top = `${this._height.value * 0.5}px`;
                this._exampleText.style.marginTop = `${parseInt(-0.5 * getComputedStyle(this._exampleText).height.replace(/[^\d.-]/g, '')) - 1}px`;
                break;
            case "top":
                this._exampleText.style.top = "0px";
                this._exampleText.style.marginTop = `${parseInt(-1 * getComputedStyle(this._exampleText).height.replace(/[^\d.-]/g, '')) - (1+this._textOffset.value)}px`;
                break;
            case "bottom":
                this._exampleText.style.top = `${this._height.value + this._textOffset.value}px`;
                this._exampleText.style.marginTop = '0px';
                break
            default:
                break;
        }
        
        this._exampleText.style.left = `${this._width.value * 0.5}px`;
        this._exampleText.style.marginLeft = `${parseInt(-0.5 * getComputedStyle(this._exampleText).width.replace(/[^\d.-]/g, '')) - 2}px`;
        
    }

    finalize(auto = false){
        if(this._type == "globalOption"){
            for(let i = 0; i < questions.length; i++){
                let question = questions[i];
                question.buttonStyle.style = this.style;
            }
        }else if(this._type == "questionOption"){
            for(let i = 0; i < this._parent.options.length; i++){
                this._parent.getOption(i).buttonStyle = this.style;
            }
            
        }
        if(!auto){
            this.unpopup();
        }
    }



    get textPosition(){
        return this._textPosition.value;
    }
    get textDistance(){
        return this._textOffset.value + "px";
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
    get imageSource(){
        return this._backgroundImage.value;
    }
    get border(){
        if(this._borderStyle.value == "none"){
            return 'none';
        }else{
            return `${this._borderWidth.value}px ${this._borderStyle.value} ${this._borderColor.value}`;
        }
    }
    get radius(){
        return `${this._borderXRadius.value}% / ${this._borderYRadius.value}%`;
    }
    get margin(){
        return `${this._yMargins.value}px ${this._xMargins.value}px ${this._yMargins.value}px ${this._xMargins.value}px`;
    }
    get outline(){
        return `${this._borderWidth.value}px solid ${this._outlineColor.value}`;
    }
    get outlineOffset(){
        return `${-1 * this._borderWidth.value}px`;
    }
    get style(){
        return [this._width.value, this._height.value, this._buttonColor.value, this._borderStyle.value, this._borderWidth.value, this._borderColor.value, this._borderXRadius.value, this._borderYRadius.value, this._xMargins.value, this._yMargins.value, this._outlineColor.value, this._textPosition.value, this._textOffset.value, this._backgroundImage.value];

    }

    set style(style){
        this._width.value = style[0];
        this._height.value = style[1];
        this._buttonColor.value = style[2];
        this._borderStyle.value = style[3];
        this._borderWidth.value = style[4];
        this._borderColor.value = style[5];
        this._borderXRadius.value = style[6];
        this._borderYRadius.value = style[7];
        this._xMargins.value = style[8];
        this._yMargins.value = style[9];
        this._outlineColor.value = style[10];
        this._textPosition.value = style[11];
        this._textOffset.value = style[12];
        this._backgroundImage.value = style[13];

        this.updateButton();
        if(this._parent != null && this._parent.type == "question"){
            this.finalize(true);
        }
    }
    set id(id){
        super.id = id;
        this._textPosition.id = this._id + "TextPosition";
        this._textOffset.id = this._id + "TextOffset";
        this._width.id = this._id + "Width";
        this._height.id = this._id + "Height";
        this._buttonColor.id = this._id + "ButtonColor";
        this._backgroundImage.id = this._id + "Image";
        this._borderStyle.id = this._id + "BorderStyle";
        this._borderWidth.id = this._id + "BorderWidth";
        this._borderColor.id = this._id + "BorderColor";
        this._borderXRadius.id = this._id + "BorderXRadius";
        this._borderYRadius.id = this._id + "BorderYRadius";
        this._xMargins.id = this._id + "XMargins";
        this._yMargins.id = this._id + "YMargins";
        this._outlineColor = this._id + "OutlineColor";
        if(this._type == "questionOption" || this._type == "globalOption"){
            this._finalizeButton.setAttribute('id', `${this._id}FinalizeButton`);
        }
        this.accessor = this._accessorSave;
    }
    set accessor(accessor){
        super.accessor = accessor;
        this._textPosition.setAttribute('onchange', `${this._accessor}.updateButton()`);
        this._textOffset.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._width.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._height.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._buttonColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._backgroundImage.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderStyle.input.setAttribute('onchange', `${this._accessor}.updateButton()`);
        this._borderWidth.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderXRadius.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._borderYRadius.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._xMargins.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._yMargins.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        this._outlineColor.input.setAttribute('oninput', `${this._accessor}.updateButton()`);
        if(this._type == "questionOption" || this._type == "globalOption"){
            this._finalizeButton.setAttribute('onclick', `${this._accessor}.finalize()`);
        }
    }
}

class TextPopup extends PropertyPopup{
    constructor(id, text, parent, accessor, type){
        super(id, text, parent, accessor, type);
        this._type = type;
        
        this._size = new SimpleInput(`${this._id}Size`, `Font Size`, 'number');
        this._font = new DropdownInput(`${this._id}Font`, `Font Family`, fonts, true);
        this._color = new SimpleInput(`${this._id}Color`, `Font Color`, 'color');
        this._bold = new SimpleInput(`${this._id}Bold`, 'Bold', 'checkbox');
        this._italic = new SimpleInput(`${this._id}Italic`, 'Italic', 'checkbox');
        this._underline = new SimpleInput(`${this._id}Underline`, 'Underline', 'checkbox');
        this._finalizeButton = document.createElement('button');

        if(this._type == "options" || this._type == "details"){
            this._size.value = "16";
            this._color.value = "#000000";
            this._bold.value = false;
            this._italic.value = false;
            this._underline.value = false;
        }else if(this._type == "questions"){
            this._size.value = "24";
            this._color.value = "#000000";
            this._bold.value = true;
            this._italic.value = false;
            this._underline.value = false;
        }else if(this._type == "results"){
            this._size.value = "32";
            this._color.value = "#000000";
            this._bold.value = true;
            this._italic.value = false;
            this._underline.value = false;
        }
        this._finalizeButton.innerHTML = "Finalize Design?";
        this._finalizeButton.setAttribute('onclick', `${this._accessor}.finalize()`);
        this._finalizeButton.classList.add('finalizeButton');

        this._interfaceContent.appendChild(this._size.div);
        this._interfaceContent.appendChild(this._font.div);
        this._interfaceContent.appendChild(this._color.div);
        this._interfaceContent.appendChild(this._bold.div);
        this._interfaceContent.appendChild(this._italic.div);
        this._interfaceContent.appendChild(this._underline.div);
        this._interfaceContent.appendChild(this._finalizeButton);
    }

    popup(){
        super.popup();
        this._popupWindow.style.height = "60vh"
        this._popupWindow.style.marginTop = "-23vh"
        this._popupWindow.style.width = "20vw";
        this._popupWindow.style.marginLeft = "-10vw";
        this._popupContent.style.height = "58vh";
        this._popupContent.style.width = "18vw";
        this._interfaceContent.style.height = "58vh";
        this._interfaceContent.style.width = "15vw";
    }

    finalize(auto = false){
        if(this._type=="options" && this._parent != null){
            let options = this._parent.options;
            for(let i = 0; i < options.length; i++){
                let option = options[i];
                option.size = this._size.value;
                option.font = this._font.value;
                option.color = this._color.value;
                option.bold = this._bold.value;
                option.italic = this._italic.value;
                option.underline = this._underline.value;
            }
        }else if(this._type=="options" && this._parent == null){
            for(let i = 0; i < questions.length; i++){
                let question = questions[i];
                question.textStyle.style = this.style;
            }
        }else if(this._type == "questions"){
            for(let i = 0; i < questions.length; i++){
                let question = questions[i];
                question.size = this.size;
                question.font = this.font;
                question.color = this.color;
                question.bold = this.bold;
                question.italic = this.italic;
                question.underline = this.underline;
            }
        }else if(this._type == "results"){
            for(let i = 0; i < results.length; i++){
                let result = results[i];
                result.size = this.size;
                result.font = this.font;
                result.color = this.color;
                result.bold = this.bold;
                result.italic = this.italic;
                result.underline = this.underline;
            }
        }else if(this._type == "details"){
            for(let i = 0; i < results.length; i++){
                let result = results[i];
                result.detailSize = this.size;
                result.detailFont = this.font;
                result.detailColor = this.color;
                result.detailBold = this.bold;
                result.detailItalic = this.italic;
                result.detailUnderline = this.underline;
            }
        }
        if(!auto){  
            this.unpopup();
        }
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
        return this._bold.value;
    }
    get italic(){
        return this._italic.value;
    }
    get underline(){
        return this._underline.value;
    }
    get style(){
        return [this.size, this.font, this.color, this.bold, this.italic, this.underline];
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
    set bold(bold){
        this._bold.value = bold;
    }
    set italic(italic){
        this._italic.value = italic;
    }
    set underline(underline){
        this._underline.value = underline;
    }
    set style(style){
        this.size = style[0];
        this.font = style[1];
        this.color = style[2];
        this.bold = style[3];
        this.italic = style[4];
        this.underline = style[5];
        this.finalize(true);
    }
    set id(id){
        super.id = id;
        this._size.id = this._id + "Size";
        this._font.id = this._id + "Font";
        this._color.id = this._id + "Color";
        this._bold.id = this._id + "Bold";
        this._italic.id = this._id + "Italic";
        this._underline.id = this._id + "Underline";
        this.accessor = this._accessorSave;
    }
    set accessor(accessor){
        super.accessor = accessor;
        this._finalizeButton.setAttribute('onclick', `${this._accessor}.finalize()`);
    }
}
//Global variables

const questions = [];
var questionNum = 0;
const results = [];
var resultNum = 0;
var quizType, questionTextStyle, optionTextStyle, resultTextStyle, detailTextStyle, buttonStyle;
var resultButton = new ResultButton();

//Global functions
function onloadOps(){
    let globalStyles = document.getElementById('globalStyleDiv');
    let globalPropertyBar = new StyleProperty("globalStyle");
    quizType = globalPropertyBar.quizType
    questionTextStyle = globalPropertyBar.questionTextStyle;
    optionTextStyle = globalPropertyBar.optionTextStyle;
    resultTextStyle = globalPropertyBar.resultTextStyle;
    detailTextStyle = globalPropertyBar.detailTextStyle;
    buttonStyle = globalPropertyBar.buttonStyle;

    globalStyles.append(globalPropertyBar.div);
    //showDevtools();
}

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
    results[resultNum - 1].quizType = quizType.value;
    if(results.length > 1){
        validateRanges(results.length - 2, 1);
    }
}

function removeResult(num) {
    results[num].remove();
    results.splice(num, 1);
    resultNum--;

    for (let i = num; i < resultNum; i++) {
        results[i].num = i;
    }
}

function validateRanges(currentNum, side){
    let current = results[currentNum];
    if(side == 0 && current.lower > current.upper){
        current.upper = current.lower;
    }else if(side == 1 && current.lower > current.upper){
        current.lower = current.upper;
    }
    if(currentNum > 0){
        for(let i = currentNum; i > 0; i--){
            let cur = results[i];
            let prev = results[i-1];
            if(prev.upper >= cur.lower){
                prev.upper = cur.lower - 1;
                if(prev.lower > prev.upper){
                    prev.lower = prev.upper;
                }
            }
            if(cur.value <= prev.value){
                prev.value = cur.value - 1;
            }
        }
    }
    if(currentNum < resultNum - 1){
        for(let i = currentNum; i < resultNum - 1; i++){
            let cur = results[i];
            let next = results[i+1];
            if(next.lower <= cur.upper){
                next.lower = cur.upper + 1;
                if(next.upper < next.lower){
                    next.upper = next.lower;
                }
            }
            if(cur.value >= next.value){
                next.value = cur.value + 1;
            }
        }
    }
    for(let i = 0; i < results.length; i++){
        let result = results[i];
        if(result.lower < 0){
            result.lower = 0;
            validateRanges(i, 0);
        }else if(result.upper < 0){
            result.upper = 0;
            validateRanges(i, 1);
        }else if(result.value < 0){
            result.value = 0;
            validateRanges(i, 2);
        }
    }
}

function changeQuizType(){
    
    for(let i = 0; i < resultNum; i++){
        results[i].quizType = quizType.value;
    }
}

function outputCode() {
    let output = document.getElementById('outputText');
    let preview = document.getElementById('preview');
    preview.innerHTML = "";
    let script = document.createElement('script');
    let body = document.createElement('div');
    body.setAttribute('id', 'quizBody');
    body.style.display = "flex";
    body.style.flexDirection = "column";
    preview.appendChild(script);
    preview.appendChild(body);

    let scriptContent = '';
    scriptContent += `
    var scores = Array(${questions.length}).fill(null);
    var selected = Array(${questions.length}).fill(-1);
    function setScore(question, value){
        scores[question] = value;
    }
    function setSelected(question, option, outline, outlineOffset){
        if(selected[question] != -1){
            document.getElementById('question' + question + 'option' + selected[question]).style.outline = 'none';
        }
        document.getElementById('question' + question + 'option' + option).style.outline = outline;
        document.getElementById('question' + question + 'option' + option).style.outlineOffset = outlineOffset;
        selected[question] = option;
    }
    function finalScore(){
    `
    if(quizType.value){
        scriptContent += `let scoreCounts = Array(${results.length}).fill(0);
        for(let i = 0; i < scores.length; i++){
            if(scores[i] == null){
                return -1;
            }
            scoreCounts[scores[i]]++;
        }
        let score = -1;
        let scoreCount = -1;
        for(let i = 0; i < scoreCounts.length; i++){
            if(scoreCounts[i] > scoreCount){
                score = i;
                scoreCount = scoreCounts[i];
            }
        }`;
    }else{
        scriptContent += `let score = 0;
        for(let i = 0; i < scores.length; i++){
            if(scores[i] == null){
                return -1;
            }
            score += scores[i];
        }`;
    }
        
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        if(quizType.value){
            scriptContent += `
            if(score == ${result.value}){
            `;
        }else{
            scriptContent += `
            if(score >= ${result.lower} && score <= ${result.upper}){
            `;
        }
        scriptContent += `
            let resultHead = document.getElementById('resultHead');
            let resultBody = document.getElementById('resultBody');
            resultHead.innerHTML = '${result.text}';
            resultHead.style.fontSize =  '${result.size}';
            resultHead.style.fontFamily = '${result.font}';
            resultHead.style.color = '${result.color}';
            resultHead.style.fontWeight = '${result.bold}';
            resultHead.style.fontStyle = '${result.italic}';
            resultHead.style.textDecoration = '${result.underline}';
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
        header.style.alignSelf = "center";
        header.innerHTML = question.text;
        header.style.fontSize = question.size;
        header.style.fontFamily = question.font;
        header.style.color = question.color;
        header.style.fontWeight = question.bold;
        header.style.fontStyle = question.italic;
        header.style.textDecoration = question.underline;
        let form = document.createElement('form');
        form.style.alignSelf = "center";
        form.style.display = "flex";
        form.style.flexDirection = "row";
        body.appendChild(header);
        body.appendChild(form);

        for (let j = 0; j < question.optionNum; j++) {
            let option = question.getOption(j);
            let container = document.createElement('div');
            let button = document.createElement('button');
            let text = document.createElement('p');
            button.setAttribute('type', 'button');
            button.setAttribute('onclick', `setScore(${i}, ${option.value}); setSelected(${i}, ${j}, '${option.buttonStyle.outline}', '${option.buttonStyle.outlineOffset}')`);
            button.setAttribute('id', `question${i}option${j}`);
            text.style.textAlign = "center";

            text.style.fontSize = option.size;
            text.style.fontFamily = option.font;
            text.style.color = option.color;
            text.style.fontWeight = option.bold;
            text.style.fontStyle = option.italic;
            text.style.textDecoration = option.underline;
            button.style.height = option.buttonStyle.height;
            button.style.width = option.buttonStyle.width;
            button.style.backgroundColor = option.buttonStyle.color;
            button.style.border = option.buttonStyle.border;
            button.style.borderRadius = option.buttonStyle.radius;
            button.style.margin = option.buttonStyle.margin;
            button.classList.add('quiz');
            button.classList.add('quizButton');
            text.innerHTML = option.text;
            form.appendChild(container);
            
           
            switch(option.buttonStyle.textPosition){
                case "center":
                    container.appendChild(button);
                    button.appendChild(text);
                    break;
                case "top":
                    container.appendChild(text);
                    container.appendChild(button);
                    text.style.marginBottom = option.buttonStyle.textDistance;
                    break;
                case "bottom":
                    container.appendChild(button);
                    container.appendChild(text);
                    text.style.marginTop = option.buttonStyle.textDistance;
                    break;
                default:
                    break;
            }
            if(option.buttonStyle.imageSource != ''){
                button.style.backgroundImage = `url(${option.buttonStyle.imageSource})`;
                button.style.backgroundSize = "cover";
                button.style.backgroundPosition = "center";
            }
            
        }

    }

    let doneContainer = document.createElement('div');
    let doneButton = document.createElement('button');
    let doneText = document.createElement('p');
    doneButton.setAttribute('type', 'button');
    doneButton.setAttribute('onclick', 'finalScore()');
    doneButton.classList.add('quiz');
    doneText.style.textAlign = 'center';

    doneContainer.style.alignSelf = "center";
    doneText.innerHTML = resultButton.text;
    doneText.style.fontSize = resultButton.size;
    doneText.style.fontFamily = resultButton.font;
    doneText.style.color = resultButton.color;
    doneText.style.fontWeight = resultButton.bold;
    doneText.style.fontStyle = resultButton.italic;
    doneText.style.textDecoration = resultButton.underline;
    doneButton.style.height = resultButton.buttonStyle.height;
    doneButton.style.width = resultButton.buttonStyle.width;
    doneButton.style.backgroundColor = resultButton.buttonStyle.color;
    doneButton.style.border = resultButton.buttonStyle.border;
    doneButton.style.borderRadius = resultButton.buttonStyle.radius;
    doneButton.style.margin = resultButton.buttonStyle.margin;
    body.appendChild(doneContainer);
    
    switch(resultButton.buttonStyle.textPosition){
        case "center":
            doneContainer.appendChild(doneButton);
            doneButton.appendChild(doneText);
            break;
        case "top":
            doneContainer.appendChild(doneText);
            doneContainer.appendChild(doneButton);
            doneText.style.marginBottom = resultButton.buttonStyle.textDistance;
            break;
        case "bottom":
            doneContainer.appendChild(doneButton);
            doneContainer.appendChild(doneText);
            doneText.style.marginTop = resultButton.buttonStyle.textDistance;
            break;
        default:
            break;
    }

    if(resultButton.buttonStyle.imageSource != ''){
        doneButton.style.backgroundImage = `url(${resultButton.buttonStyle.imageSource})`;
        doneButton.style.backgroundSize = "cover";
        doneButton.style.backgroundPosition = "center";
    }


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
    navigator.clipboard.writeText(output.innerHTML);
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
        questions[i].getOption(0).value = 2;
        questions[i].getOption(1).text = "Neutral";
        questions[i].getOption(1).value = 1;
        questions[i].getOption(2).text = "Negative";
        questions[i].getOption(2).value = 0;
    }
    addResult();
    addResult();
    addResult();

    results[0].text = "Negative";
    results[0].detail = "You got a negative score";
    results[0].lower = 0;
    results[0].upper = 2;
    results[1].text = "Neutral";
    results[1].detail = "You got a neutral score";
    results[1].lower = 3;
    results[1].upper = 3;
    results[2].text = "Positive";
    results[2].detail = "You got a positive score";
    results[2].lower = 4;
    results[2].upper = 6;
}