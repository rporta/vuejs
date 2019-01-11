//aca trabajo con la instancia
//example:

var preload = app.newComponent('Indeterminate');

preload.color[0] = app.color.green[5];
preload.color[1] = app.color.teal[5];

app.create(preload.insertDom());