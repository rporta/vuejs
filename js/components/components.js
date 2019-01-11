var progressIndeterminate = {
	data: function () {
		return {
			color : new Array()
		}
	},
	template: '<div class="{color[1]} progress" >{{generateLog(this)}}<div class="{color[0]} indeterminate"></div></div>',
	methods: {
		generateLog : function(log){
			console.log(log);
		}		
	}
};
