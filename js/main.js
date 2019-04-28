//aca trabajo con la instancia
//example:
app.setColor(app.generateColor());
var preloaderFull = app.newComponent('c-preloader-circle-full').setSectionColor(app.generateColor()).setColorHexa(app.generateColorHexa());

setTimeout(() => {
	preloaderFull.setShow(false);
}, 1000);

app.create(preloaderFull);

var footer = app.newComponent('c-footer').setText("soy footer").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);
var main = app.newComponent('c-main').setText("soy main").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);
var header = app.newComponent('c-header').setText("soy header").setColor(app.generateColor()).setColorText(app.generateColorText()).setTextAling(app.textAling.c);
var nav = app.newComponent('c-nav-bar');
// logo = app.newComponent("c-img").setSrc("https://materializecss.com/res/materialize.svg");
logo = app.newComponent("c-icon").setIcon('add_to_queue').setSize(app.sizeIcon.m).setColorText(app.generateColorText());
var spanLogo = app.newComponent("c-span").setText("reg 8").setColorText('white-text');
// logo = app.newComponent("c-a").setText("ffff");
nav.addLogo(spanLogo).setColorM(app.generateColor());
spanLogo.create(logo);
app.create(nav);
app.create(header);
app.create(main);
app.create(footer);

var h = app.newComponent("c-h").setText("soy H").setSize(6);
footer.create(h);
var p = app.newComponent("c-p").setText("soy p").setColorText(app.generateColorText());
var span = app.newComponent("c-span").setText("soy span").setColorText(app.generateColorText());
var pre = app.newComponent("c-pre").setText("soy pre").setColorText(app.generateColorText());
var table = app.newComponent("c-table").setColor(app.generateColor()).setCentered(true);

var pre1 = app.newComponent("c-pre").setText("soy pre1").setColorText(app.generateColorText());
var pre2 = app.newComponent("c-pre").setText("soy pre2").setColorText(app.generateColorText());
var pre3 = app.newComponent("c-pre").setText("soy pre3").setColorText(app.generateColorText());
var pre4 = app.newComponent("c-pre").setText("soy pre4").setColorText(app.generateColorText());
var pre5 = app.newComponent("c-pre").setText("soy pre5").setColorText(app.generateColorText());

var span = app.newComponent("c-span").setText("reg 8").setColorText(app.generateColorText());

var collapsible = app.newComponent("c-collapsible");
var cont1 = new Object();
cont1.head = pre1; 
cont1.body = pre2;
collapsible.addRow(cont1);
var cont2 = new Object();
cont2.head = pre3; 
cont2.body = pre4;
collapsible.addRow(cont2);

table.setHead(new Array("fa", "so", "gg", "sarasa"));
table.addRow(new Array("f", "j", "l"));
table.addRow(new Array("f", "j", "l"));
table.addRow(new Array("j", "l", span));


footer.create(p);
footer.create(span);
footer.create(pre);
footer.create(table);
footer.create(collapsible);
var icon = app.newComponent("c-icon").setIcon("account_balance");
var form = app.newComponent("c-form");
footer.create(form);
form.setColor(app.generateColor());
