var app = new Vue({
	el: '#app',
	data: {
		'blogTitle' : "algo",
		'color' : colors,
		'colorHexa' : colorsHexa,
		'colorText' : colorsText,
		'colorFull' : colorsFull
	},
	components: {
		'Indeterminate' : progressIndeterminate
	},
	methods:{
		create : function (element){
			return this.$el.append(element);
		},
		newComponent : function(component){
			return eval("new this.$options.components." + component + "()");
		}
	}
});