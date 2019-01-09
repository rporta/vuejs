var progressIndeterminate = {
	data: function () {
		return {

		}
	},
	template: '<div class="progress" v-bind:id="$options._componentTag + $root.generateId(5)">{{generateLog(this)}}<div class="indeterminate"></div></div>',
	methods: {
		generateLog : function(log){
			console.log(log);
		}		
	}
};
