var Preloader = {
	name : "Preloader",
	data: function () {
		return {
			color : new Array("", ""),
			mode : "indeterminate",
			space : " ",
			percentage : "%",
			progress : 40
		}
	},
	template: '<div v-bind:id="this.generateId(5)"  v-bind:class="color[0]"  class="progress" ><div v-bind:style="this.setStyle()" v-bind:class="color[1] + space + mode"></div></div>',
	methods: {
		insertDom: function(ref){
			return this.$mount(ref).$el;
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element);
		},
		setMode : function(set){
			switch (set) {
				case 0 :
				case "indeterminate" : this.mode = "indeterminate"
				break;
				case 1 : 
				case "determinate" : this.mode = "determinate"
				break;
			}
			return this;
		},
		setStyle : function(){
			var out;
			switch (this.mode) {
				case 0 : out = {};
				break;
				case 1 : out = { width : this.progress + this.percentage};
				break; 
				case "indeterminate" : out = {};
				break;
				case "determinate" : out = { width : this.progress + this.percentage};
				break;

			}	
			return out;
		},
		setProgress : function(arg){
			this.progress = arg;
			return this;
		},
		setColor : function(arg){
			this.color = arg
			return this;
		}
	}
};
