//aca trabajo con la instancia
//example:

app.setColor(app.color.red[8]);
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)))})(1,"lightGreen", "cyan");


var container = app.newComponent('c-container').setStyleP(true);
var section = app.newComponent('c-section').setStyleP(true);
var preloader = app.newComponent('c-preloader');
app.create(section);
section.create(container);
container.create(preloader);
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(2,"lime", "teal");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(3,"yellow", "green");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(4,"amber", "lightGreen");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(5,"orange", "lime");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(6,"deepOrange", "yellow");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(7,"brown", "amber");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(8,"grey", "orange");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(1,"blueGrey", "deepOrange");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(2,"red", "brown");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(3,"red", "grey");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(4,"pink", "blueGrey");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(5,"purple", "bwt");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(6,"deepPurple", "red");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(7,"indigo", "pink");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(8,"blue", "purple");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(1,"lightBlue", "deepPurple");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(2,"cyan", "indigo");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(3,"teal", "blue");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(4,"green", "lightBlue");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(5,"lightGreen", "cyan");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(6,"lime", "teal");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(7,"yellow", "green");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(8,"amber", "lightGreen");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(1,"orange", "lime");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(2,"deepOrange", "yellow");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(3,"brown", "amber");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(4,"grey", "orange");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(5,"blueGrey", "deepOrange");
// ((j,a,x) => {app.create(app.newComponent('c-preloader').setColor(((range, color1, color2) => {return new Array(app.color[color1][range], app.color[color2][range])})(j,a,x)).insertDom())})(1,"red", "brown");
