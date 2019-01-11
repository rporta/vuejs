var progress = {
	name : "Indeterminate",
	data: function () {
		return {
			color : new Array("", "")
		}
	},
	template: '<div v-bind:id="this.generateId(5)"  v-bind:class="color[0]"  class=" progress " ><div v-bind:class="color[1]" class="indeterminate"></div></div>',
	methods: {
		insertDom: function(ref){
			return this.$mount(ref).$el;
		},
		generateId : function (arg) {
			return this.$options.name + app.generateId(arg);	
		},
		create : function (element){
			return this.$el.append(element);
		}
	}
};
