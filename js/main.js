var app = new Vue({
	el: '#app',
	data: {

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

// aca comienza el trabajo entre instancias aver que pasa...

// var preload = Vue.component(progressIndeterminate);
