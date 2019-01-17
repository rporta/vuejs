var app = new Vue({
	el: '#app',
	data: {
		'colorFull' : colorsFull,
		'color' : colors,
		'colorHexa' : colorsHexa,
		'colorText' : colorsText,
		'float' : float,
		'textAling' : textAling,
		'edge' : edge,
		'shadow' : shadow,
		'transitions' : transitions,
		'sizeIcon' : sizeIcon,
		'sizeCard' : sizeCard,
		'sizePreloader' : sizePreloader,
		'waves' : waves
	},
	components: {
		[preloaderCircleFull.name] : preloaderCircleFull,
		[preloaderCircle.name] : preloaderCircle,
		[preloader.name] : preloader,
		[preloaderFull.name] : preloaderFull,
		[container.name] : container,
		[section.name] : section
	},
	methods:{
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId: function(length){
			var id = "";
			var char_list = 
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i=0; i < length; i++ ){  
				id += char_list.charAt(Math.floor(Math.random() * char_list.length));
			}
			return '-' + id;
		},
		setColor : function(arg){
			$('body').toggleClass(arg);
			return this;
		},
		generateColor : function(){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			return ((c) => { return this.color[c][Math.floor(Math.random() * this.color[c].length)]})(color[Math.floor(Math.random() * color.length)])
		},
		generateColorText : function(){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			return ((c) => { return this.colorText[c][Math.floor(Math.random() * this.colorText[c].length)]})(color[Math.floor(Math.random() * color.length)])
		},
		generateColorHexa : function(){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			return ((c) => { return this.colorHexa[c][Math.floor(Math.random() * this.colorHexa[c].length)]})(color[Math.floor(Math.random() * color.length)])
		}
	}
});

