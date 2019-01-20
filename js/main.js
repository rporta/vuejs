//aca trabajo con la instancia
//example:
app.setColor(app.generateColor());
var preloaderFull = app.newComponent('c-preloaderCircleFull').setSectionColor(app.generateColor()).setColorHexa(app.generateColorHexa());

setTimeout(() => {
	preloaderFull.setShow(false);
}, 1000);

app.create(preloaderFull);

var footer = app.newComponent('c-footer').setText("soy footer").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);
var main = app.newComponent('c-main').setText("soy main").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);
var header = app.newComponent('c-header').setText("soy header").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);

app.create(header);
app.create(main);
app.create(footer);
