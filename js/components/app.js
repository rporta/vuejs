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
		[preloader.name] : preloader,
		[container.name] : container,
		[section.name] : section
	},
	methods:{
		create : function(element){
			return this.$el.append(element);
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
		}
	}
});

