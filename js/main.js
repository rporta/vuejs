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

var h = app.newComponent("c-h").setText("soy H").setSize(6);
footer.create(h);
var p = app.newComponent("c-p").setText("soy p").setColorText(app.generateColorText());
var span = app.newComponent("c-span").setText("soy span").setColorText(app.generateColorText());
var pre = app.newComponent("c-pre").setText("soy pre").setColorText(app.generateColorText());
var table = app.newComponent("c-table").setHead(new Array("fa", "so", "gg"));
table.addRow(new Array("f", "j", "l"));
table.addRow(new Array("f", "j", "l"));
table.addRow(new Array("f", "j", "l"));

footer.create(p);
footer.create(span);
footer.create(pre);
footer.create(table);
var icon = app.newComponent("c-icon").setIcon("account_balance");
footer.create(icon);
