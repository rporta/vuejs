var progressIndeterminate = {
	data: function () {
		return {
			color : new Array("", "")
		}
	},
	template: '<div v-bind:id="$options._componentTag + this.generateId(5)"  v-bind:class="color[0]"  class=" progress " >{{generateLog(this)}}<div v-bind:class="color[1]" class="indeterminate"></div></div>',
	methods: {
		generateLog : function(log){
			console.log(log);
		},
		insertDom: function(ref){
			return this.$mount(ref).$el;
		},
		generateId : function (arg) {
			return generateId(arg);	
		},
		create : function (element){
			return this.$el.append(element);
		}
	}
};
