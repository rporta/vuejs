//components
var preloader = {
	name : "c-preloader",
	data: function () {
		return {
			color : new Array("", ""),
			mode : "indeterminate",
			space : " ",
			percentage : "%",
			progress : 40,
			show : true
		}
	},
	template: '<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="color[0]"  class="progress" ><div v-bind:style="this.setStyle()" v-bind:class="color[1] + space + mode"></div></div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}
};
var preloaderCircle = {
	name : "c-preloaderCircle",
	data: function () {
		return {
			colorsHexa : "red",
			size : "big",
			show : true
		}
	},
	template: 
	'<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:class="this.size"  class="preloader-wrapper active">\
	<div class="spinner-layer" v-bind:style="this.setStyle()">\
	<div class="circle-clipper left">\
	<div class="circle"></div>\
	</div>\
	<div class="gap-patch">\
	<div class="circle"></div>\
	</div>\
	<div class="circle-clipper right">\
	<div class="circle"></div>\
	</div>\
	</div>\
	</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		setStyle : function(){
			var out;
			out = {borderColor : this.colorsHexa}	
			return out;
		},
		setColorHexa : function(arg){
			this.colorsHexa = arg
			return this;
		},
		setSize : function(arg){
			this.size = arg;
			return this;
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}			
	}
};
var section = {
	name : "c-section",
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
			hoverable : false,
			container : false,
			valign : false,
			styleP : false,
			show : true
		}
	},
	template: '<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="section">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setStyleP : function(arg){
			this.styleP = arg;
			return this;			
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setStyle : function(){
			var stylePreload = {
				position: "fixed",
				top: "0px",
				zIndex: "9999",
				width: "100%",
				height: "100%"
			};
			return this.styleP ? stylePreload : {};
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
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
			hoverable : false,
			valign : false,
			styleP :false,
			container :true,
			show : true
		}
	},
	template: '<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setStyleP : function(arg){
			this.styleP = arg;
			return this;			
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setStyle : function(){			
			var stylePreload = {
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			};
			return this.styleP ? stylePreload : {};			
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}			
	}
};
var row = {
	name : "c-row",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="row">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var col = {
	name : "c-col",
	data: function () {
		return {
			s: 12,
			m: 12,
			l: 12,
			xl: 12,
			text: "",
			color : "",
			colorText : "",
			textAling : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="col">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setS : function(arg){
			this.s = arg;
			return this;
		},
		setM : function(arg){
			this.m = arg;
			return this;
		},		
		setL : function(arg){
			this.l = arg;
			return this;
		},		
		setXl : function(arg){
			this.xl = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var s = "s";
			var m = "m";
			var l = "l";
			var xl = "xl";
			var container = "container";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", typeof this.s === "number" ? this.s : 12, typeof this.m === "number" ? this.m : 12, typeof this.l === "number" ? this.l : 12, typeof this.xl === "number" ? this.xl : 12, this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};

var header = {
	name : "c-header",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><header key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</header></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};

var main = {
	name : "c-main",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><main key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</main></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};

var footer = {
	name : "c-footer",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><footer key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</footer></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var h = {
	name : "c-h",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true,
			size : 1
		}
	},
	template: '<transition name="fade"><h1 v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</h1></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "h";
			return tagName + this.size;	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setSize : function (arg){
			if (arg >= 1 && arg <= 6){
				this.size = arg;
			}
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var p = {
	name : "c-p",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "p";
			return tagName;	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var span = {
	name : "c-span",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "span";
			return tagName;	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var pre = {
	name : "c-pre",
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
			hoverable : false,
			container : false,
			valign : false,
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "pre";
			return tagName;	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var icon = {
	name : "c-icon",
	data: function () {
		return {
			icon: "",
			color : "",
			colorText : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			size : "Small",
			show : true
		}
	},
	template: '<transition name="fade"><div class="material-icons" v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.icon}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "i";
			return tagName;	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setIcon : function(arg){
			this.icon = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setSize : function (arg){
			this.size = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var form = {
	name : "c-form",
	data: function () {
		return {
			color : "",
			colorText : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			file : false,
			method : 0,
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:method="this.generateMethod()" v-bind:enctype="this.generateEnctype()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "form";
			return tagName;	
		},		
		generateEnctype : function(){
			var enctype = this.file ? "multipart/form-data" : "";
			return enctype;	
		},		
		generateMethod : function(){
			var methods = new Array("get", "post");
			return methods[this.method];	
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},					
		setFile : function (arg){
			this.file = arg;
			return this;
		},					
		setMethod : function (arg){
			switch(arg){
				case "GET":
				case "get":
				case 0: this.method = 0;
				break;
				case "POST":
				case "post":
				case 1: this.method = 1;
				break;
			}
			return this;
		},					
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var table = {
	name : "c-table",
	data: function () {
		return {
			color : "",
			colorText : "",
			textAling : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			striped : false,
			highlight : false,
			centered : false,
			responsive : false,
			head : new Array(),
			row : new Array(),
			show : true
		}
	},
	template: 
	'<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"><thead v-html="this.generateHead()"></thead><tbody v-html="this.generateRow()"></tbody></div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(arg){
			var tagName = "table";
			return tagName;	
		},		
		generateHead : function(){
			var out = new Array();
			var head = new Array();
			out.push("<tr>");

			$.each(this.head, function(x, j) {
				head.push("<th>");
				head.push(j);
				head.push("</th>");
			});
			out.push(head.join(""));
			out.push("</tr>");
			return out.join("");	
		},		
		generateRow : function(){
			var out = new Array();
			var row = new Array();
			$.each(this.row, function(x, data) {
				out.push("<tr>");
				$.each(data, function(p, l) {
					var row = new Array();
					row.push("<td>");
					row.push(l);
					row.push("</td>");
					out.push(row.join(""));
				});
				out.push("</tr>");
			});
			return out.join("");
		},		
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setHead : function(arg){
			this.head = arg;
			return this;
		},
		addRow : function(arg){
			this.row.push(arg);
			return this;
		},
		addHead : function(arg){
			this.head.push(arg);
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},			
		setStriped : function (arg){
			this.striped = arg;
			return this;
		},			
		setHighlight : function (arg){
			this.highlight = arg;
			return this;
		},			
		setCentered : function (arg){
			this.centered = arg;
			return this;
		},			
		setResponsive : function (arg){
			this.responsive = arg;
			return this;
		},			
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			var striped = "striped";			
			var highlight = "highlight";			
			var centered = "centered";			
			var responsive = "responsive-table";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.striped ? striped : "", this.highlight ? highlight : "", this.centered ? centered : "", this.responsive ? responsive : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var button = {
	name : "c-button",
	data: function () {
		return {
			color : "",
			colorText : "",
			text : "",
			float : "",
			shadow : "",
			wave : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			disable : false,
			flat : false,
			floating : false,
			type : 0,
			size : "btn-small",
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:type="this.generateType()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "button";
			return tagName;	
		},			
		generateType : function(){
			var type = new Array("button", "submit", "reset");
			return type[this.type];	
		},		
		create : function(element){
			return this.$el.prepend(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},		
		setFloat : function(arg){
			this.float = arg;
			return this;
		},
		setDisable : function(arg){
			this.disable = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},						
		setFlat : function (arg){
			this.flat = arg;
			return this;
		},					
		setFloating : function (arg){
			this.floating = arg;
			return this;
		},					
		setSize : function (arg){
			this.size = arg;
			return this;
		},
		setWave : function (arg){
			this.wave = arg;
			return this;
		},				
		setType : function (arg){
			switch(arg){
				case "button":
				case "BUTTON":
				case 0: this.type = 0;
				break;
				case "submit":
				case "SUBMIT":
				case 1: this.type = 1;
				break;
				case "reset":
				case "RESET":
				case 2: this.type = 2;
				break;
			}
			return this;
		},					
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			var disable = "disable";			
			var flat = "flat";			
			var floating = "floating";			
			return new Array(this.wave, this.size, this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.disable ? disable : "", this.flat ? flat : "", this.floating ? floating : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};

var a = {
	name : "c-a",
	data: function () {
		return {
			color : "",
			colorText : "",
			text : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			disable : false,
			flat : false,
			floating : false,
			wave : "",
			size : "btn-small",
			href : "",
			show : true
		}
	},
	template: '<transition name="fade"><div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:href="this.href" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateTag : function(){
			var tagName = "a";
			return tagName;	
		},				
		create : function(element){
			return this.$el.prepend(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
			return this;
		},		
		setFloat : function(arg){
			this.float = arg;
			return this;
		},
		setDisable : function(arg){
			this.disable = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},						
		setFlat : function (arg){
			this.flat = arg;
			return this;
		},					
		setFloating : function (arg){
			this.floating = arg;
			return this;
		},					
		setSize : function (arg){
			this.size = arg;
			return this;
		},								
		setWave : function (arg){
			this.wave = arg;
			return this;
		},								
		setHref : function (arg){
			this.href = arg;
			return this;
		},								
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			var disable = "disable";			
			var flat = "flat";			
			var floating = "floating";			
			return new Array(this.wave, this.size, this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.disable ? disable : "", this.flat ? flat : "", this.floating ? floating : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		}		
	}		
};
var inputFields = {
	name : "c-inputFields",
	data: function (){
		return {
			inputLabelId : "",
			text : "",
			color : "",
			colorText : "",
			text : "",
			float : "",
			shadow : "",
			truncate : false,
			cardpanel : false,
			hoverable : false,
			container : false,
			valign : false,
			type : 0,
			show : true			
		}
	},
	template: '<transition name="fade"><div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"><input v-bind:id="this.generateInputLabelId(5)" v-bind:type="generateType()" class="validate"><label v-bind:for="this.inputLabelId">{{this.text}}</label></div></transition>',
	methods: {
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId : function(arg){
			return this.$options.name + app.generateId(arg);	
		},
		generateInputLabelId : function(arg){
			this.inputLabelId = app.generateId(arg);
			return this.inputLabelId;	
		},				
		create : function(element){
			return this.$el.prepend(element.$mount().$el);
		},
		setColor : function(arg){
			this.color = arg;
			return this;
		},
		setColorText : function(arg){
			this.colorText = arg;
			return this;
		},
		setText : function(arg){
			this.text = arg;
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
		setValign : function(arg){
			this.valign = arg;
			return this;
		},
		setContainer : function (arg){
			this.container = arg;
			return this;
		},																						
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		},
		setType : function (arg){
			switch(arg){
				case "text":
				case "TEXT":
				case 0: this.type = 0;
				break;
				case "email":
				case "EMAIL":
				case 1: this.type = 1;
				break;
				case "password":
				case "PASSWORD":
				case 2: this.type = 2;
				break;
			}
			return this;
		},
		generateType : function(){
			var type = new Array("text", "email", "password");
			return type[this.type];	
		}	
	}
}
//macro components
var preloaderFull = {
	name : "c-preloaderFull",
	data: function () {
		return {
			sectionColor : "",
			color : new Array("", ""),
			mode : 0,
			progress : 40,
			show : true
		}
	},
	methods: {
		setColor : function(arg){
			this.color = arg;
			if(this.$el){
				container = this.getChild(this);
				preloader = this.getChild(container).setColor(arg);
			}
			return this;
		},
		setSectionColor : function(arg){
			this.sectionColor = arg;
			if(this.$el){
				this.getInstance().setColor(arg);
			}			
			return this;
		},
		setMode : function(arg){
			switch (arg) {
				case 0 :
				case "indeterminate" : this.mode = "indeterminate";
				break;
				case 1 : 
				case "determinate" : this.mode = "determinate";
				break;
			}
			if(this.$el){
				container = this.getChild(this);
				preloader = this.getChild(container).setMode(arg);
			}			
			return this;
		},
		setProgress : function(arg){
			this.progress = arg;
			if(this.$el){
				container = this.getChild(this);
				preloader = this.getChild(container).setProgress(arg);
			}				
			return this;
		},
		setShow : function(arg){
			this.show = arg;
			if(this.$el){
				this.getInstance().setShow(arg);
			}			
			return this;
		},			
		getChild : function(instance, index = 0){
			return instance.$el.childNodes[index].__vue__.$options.parent;
		},
		getInstance : function (){
			//transition on
			return this._vnode.child;
			
			//transition off
			// return this.$el.__vue__.$options.parent;
			// return this.$el.__vue__.$options.parent;
			
		}
	},
	render: function (createElement) {
		var csection = new this.$options.components['c-section']().$mount().setStyleP(true).setColor(this.sectionColor);
		var ccontainer = new this.$options.components['c-container']().$mount().setStyleP(true);
		var cpreloader = new this.$options.components['c-preloader']().$mount().setColor(this.color).setMode(this.mode).setProgress(this.progress);
		csection.create(ccontainer);
		ccontainer.create(cpreloader);
		var section = createElement('c-section');
		section.child = csection;
		return section;
	},
	components: {
		[preloader.name] : preloader,
		[this.name] : preloaderFull,
		[container.name] : container,
		[section.name] : section
	}
};
var preloaderCircleFull = {
	name : "c-preloaderCircleFull",
	data: function () {
		return {
			sectionColor : "",
			colorsHexa : "red",
			size : "big",
			show : true
		}
	},
	methods: {
		setColorHexa : function(arg){
			this.colorsHexa = arg;
			if(this.$el){
				container = this.getChild(this);
				preloaderCircle = this.getChild(container).setColorHexa(arg);
			}
			return this;
		},
		setSectionColor : function(arg){
			this.sectionColor = arg;
			if(this.$el){
				this.getInstance().setColor(arg);
			}			
			return this;
		},
		setSize : function(arg){
			this.size = arg;
			if(this.$el){
				section = this.getInstance();
				container = this.getChild(section);
				preloaderCircle = this.getChild(container).setSize(arg);
			}
			return this;
		},
		setShow : function(arg){
			this.show = arg;
			if(this.$el){
				var section = this.getInstance().setShow(arg);
			}			
			return this;
		},		
		getChild : function(instance, index = 0){
			return instance.$el.childNodes[index].__vue__.$options.parent;
		},
		getInstance : function (){
			//transition on
			return this._vnode.child;
			
			//transition off
			// return this.$el.__vue__.$options.parent;
			// return this.$el.__vue__.$options.parent;
			
		}
	},
	render: function (createElement) {
		var csection = new this.$options.components['c-section']().$mount().setStyleP(true).setColor(this.sectionColor);
		var ccontainer = new this.$options.components['c-container']().$mount().setStyleP(true).setContainer(false);
		var preloaderCircle = new this.$options.components['c-preloaderCircle']().$mount().setColorHexa(this.colorsHexa).setSize(this.size);
		csection.create(ccontainer);
		ccontainer.create(preloaderCircle);
		var section = createElement('c-section');
		section.child = csection;
		return section;
	},
	components: {
		[preloaderCircle.name] : preloaderCircle,
		[this.name] : preloaderFull,
		[container.name] : container,
		[section.name] : section
	}
};