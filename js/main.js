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
		generateId : function(length){
			var id = "";
			var char_list = 
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i=0; i < length; i++ ){  
				id += char_list.charAt(Math.floor(Math.random() * char_list.length));
			}
			return '-' + id;
		}
	}
});
