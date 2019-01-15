var preloader = {
	name : "c-preloader",
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
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$el);
		},
		setMode : function(set){
			switch (set) {
				case 0 :
				case "indeterminate" : this.mode = "indeterminate";
				break;
				case 1 : 
				case "determinate" : this.mode = "determinate";
				break;
			}
			return this;
		},
		setStyle : function(){
			var out;
			switch (this.mode) {
				case 0 : out = {};
				case "indeterminate" : out = {};
				break;
				case 1 : out = { width : this.progress + this.percentage};
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
	},
	created : function (){
		this.$mount();
	}
};
var container = {
	name : "c-container",
	data: function () {
		return {
			text: "",
			color : "",
			colorText : "",
			textAling : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false
		}
	},
	template: '<div v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  class="container" >{{this.text}}</div>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
			return this;
		},
		setTextAling : function(arg){
			this.textAling = arg;
			return this;
		},
		setFloat : function(arg){
			this.float = arg;
			return this;
		},
		setShadow : function(arg){
			this.shadow = arg;
			return this;
		},
		setTruncate : function(arg){
			this.truncate = arg;
			return this;
		},
		setCardpanel : function(arg){
			this.cardpanel = arg;
			return this;
		},
		setHoverable : function(arg){
			this.hoverable = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "").join(" ");
		}
	},
	created : function (){
		this.$mount();
	}
};
var section = {
	name : "c-section",
	data: function () {
		return {
			color : new Array("", ""),
			mode : "indeterminate",
			space : " ",
			percentage : "%",
			progress : 40
		}
	},
	template: '<div></div>',
	methods: {
		insertDom: function(ref){
			return this.$mount(ref).$el;
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$el);
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
				case "indeterminate" : out = {};
				break;
				case 1 : out = { width : this.progress + this.percentage};
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
			this.color = arg;
			return this;
		}
	},
	created : function (){
		this.$mount();
	}
};