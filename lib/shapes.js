class Shape{
    constructor(){
        this.color = undefined;
        this.text = undefined;
        this.textColor = undefined;
    }

    setColor(color){
        this.color = color;
}

setText(text){
    this.text = text;
}
setTextColor(textcolor){
    this.textColor = textColor;
}
}

class Square extends Shape{
    width = 300;
    height = 200;

    constructor(){
        super();
    }

    render(){
        //https://stackoverflow.com/questions/5546346/how-to-place-and-center-text-in-an-svg-rectangle
        return `<svg width="300" height="200"><g><rect x="0" y="0" width="${this.width}" height="${this.height}" fill="${this.color}"/><text font-size="75" fill="${this.textColor}" x="150" y="120" text-anchor="middle">${this.text}</text></g></svg>`
    }
}
class Triangle extends Shape{
    constructor(){
        super();
    }
}