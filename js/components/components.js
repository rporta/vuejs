//Obj config component
let configComponent = class {

	/**
	 * [constructor description]
	 * @param  {obj} obj [description] keys : string(name), obj(property) , obj(data), obj(methods)
	 * @return {void}     [description] create config component : string(name), function(data), obj(methods)
	 */
	 constructor(obj) {
	 	var setProperty = {};
	 	var setMethods = {};

	 	for (let i in obj) {

	 		i == 'name' ||
	 		i == 'template' ||
	 		i == 'render' ||
	 		i == 'beforeCreate' ||
	 		i == 'created' ||
	 		i == 'beforeMount' ||
	 		i == 'mounted' ||
	 		i == 'beforeUpdate' ||
	 		i == 'updated' ||
	 		i == 'activated' ||
	 		i == 'deactivated' ||
	 		i == 'beforeDestroy' ||
	 		i == 'destroyed' ||
	 		i == 'computed' ||
	 		i == 'components' ||
	 		i == 'props' 
	 		? this[i] = obj[i]
	 		: null;

	 		i == 'property'
	 		? (() => {
	 			for(let property in obj[i]){
	 				property == "striped" ||
	 				property == "highlight" ||
	 				property == "centered" ||
	 				property == "responsive" ||
	 				property == 'text' ||
	 				property == 'color' ||
	 				property == 'colorText' ||
	 				property == 'colorHexa' ||
	 				property == 'textAling' ||
	 				property == 'float' ||
	 				property == 'flowText' ||
	 				property == 'shadow' ||
	 				property == 'truncate' ||
	 				property == 'cardpanel' ||
	 				property == 'hoverable' ||
	 				property == 'href' ||
	 				property == 'src' ||
	 				property == 'container' || 
	 				property == 'valign' || 
	 				property == 'size' || 
	 				property == 'show' ||
	 				property == 'disable' ||
	 				property == 'flat' ||
	 				property == 'name' ||
	 				property == 'filledIn' ||
	 				property == 'floating' ||
	 				property == 'withGap' ||
	 				property == 'wave' 
	 				? setProperty[property] = obj[i][property]
	 				: null;		
	 			}
	 		})()
	 		: null;
	 	};

		//create methods in property
		for(let i in setProperty){
			var method =  'set' + i.charAt(0).toUpperCase() + i.slice(1);
			setMethods[method] = function(arg) {
				this[i] = arg;
				return this;
			}
		}

		//create default methods
		setMethods.newComponent = function(component){
			return new this.$options.components[component]();
		}
		setMethods.generateId = function(arg){			
			return app ? this.$options.name + app.generateId(arg) : this.$options.name + this.$root.generateId(arg);		
		}
		setMethods.create = function(element){
			return this.$el.append(element.$mount().$el);
		}
		setMethods.setClass = function(arg){
			let setClass = new Array;
			//default class
			for(let i in this.$options.data()){

				i == 'truncate' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'cardpanel' && this.$options.data()[i] ? setClass.push('card-panel') : null;
				i == 'hoverable' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'container'  && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'valign' && this.$options.data()[i] ? setClass.push('valign-wrapper') : null;
				i == 'flowText' && this.$options.data()[i] ? setClass.push('flow-text') : null;
				i == 'striped' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'highlight' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'centered' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'responsive' && this.$options.data()[i] ? setClass.push('responsive-table') : null;
				i == 'filledIn' && this.$options.data()[i] ? setClass.push('filled-in') : null;
				i == 'disable' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'flat' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'floating' && this.$options.data()[i] ? setClass.push(i) : null;
				i == 'withGap' && this.$options.data()[i] ? setClass.push('with-gap') : null;

				i == 'color' ||
				i == 'colorText' ||
				i == 'colorHexa' ||
				i == 'textAling' ||
				i == 'float' ||
				i == 'shadow' 
				? setClass.push(this.$options.data()[i])
				: null;
			}

			//custom class
			switch(arg){
				default:
				break;
			}
			return setClass.join(" ");
		}
		//set data property && obj.data
		this.data = function (){
			return Object.assign(setProperty, obj.data);
		}
		//set methods && obj.methods
		this.methods = Object.assign(setMethods, obj.methods);
	};
};
var test = new  configComponent({
	name : 'c-test',
	property : {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		valign : false,
		container :true,
		show : true,
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()">{{this.text}}<slot></slot></div>\
	</transition>'
})

//components
var preloader = new  configComponent({
	name : "c-preloader",
	property : {
		show : true,
		color : new Array(null, null),
	},
	data: {
		mode : "indeterminate",
		space : " ",
		percentage : "%",
		progress : 40,
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="color[0]"  class="progress" >\
	<div v-bind:style="this.setStyle()" v-bind:class="color[1] + space + mode"></div>\
	</div>\
	</transition>',
	methods: {
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
	},
});
var preloaderCircle = new  configComponent({
	name : "c-preloader-circle",
	property : {
		colorHexa : "red",
		show : true,
		size : "big",
	},
	data: {},
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
		setStyle : function(){
			var out;
			out = {borderColor : this.colorsHexa}	
			return out;
		},
	}
});
var section = new  configComponent({
	name : "c-section",
	property : {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true		
	},
	data: {
		styleP : false,
		d : 0,
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="section">{{this.text}}</div>\
	</transition>',
	methods: {
		setStyleP : function(arg){
			this.styleP = arg;
			return this;			
		},
		setD : function (arg){
			this.d = arg;
			return this;
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			var dbox = "dbox";
			var dline = "dline";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", (this.d == 0 ? "" : (this.d == 1 ? dline : (this.d == 2 ? dbox : "")))).join(" ");
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
	}
});
var div = new configComponent({
	name : "c-div",
	data: {
		styleP :false,
	},
	property : {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		valign : false,
		container :false,
		show : true
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods: {
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
		}	
	}
});
var modal = new configComponent({
	name : "c-modal",
	data:  {
		styleP : false,
	},
	property: {
		text:null,
		color :null,
		colorText :null,
		textAling :null,
		float :null,
		shadow :null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="modal">\
	<div class="modal-content center-align">{{this.text}}</div>\
	<div class="modal-footer" style="text-align: center !important;">\
	<a class="modal-close waves-effect btn-flat" >Aceptar</a>\
	</div>\
	</div>\
	</transition>',
	methods: {
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
				position: "fixed",
				top: "0px",
				zIndex: "9999",
				width: "100%",
				height: "100%"
			};
			return this.styleP ? stylePreload : {};
		},
		open: function (){
			return this.$el.M_Modal.open();
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			$('.modal').modal();
		})
	}	
});
var br = new configComponent({
	name : "c-br",
	data: 
	{
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
	},
	property: {
		styleP : false,
	},
	template: 
	'<transition name="fade">\
	<br key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	</transition>',
	methods: {
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
				position: "fixed",
				top: "0px",
				zIndex: "9999",
				width: "100%",
				height: "100%"
			};
			return this.styleP ? stylePreload : {};
		},
	}
});
var divider = new configComponent({
	name : "c-divider",
	property :{
		styleP : false,
	},
	data:{
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-bind:class="this.setClass()" v-show="this.show" v-bind:id="this.generateId(5)" class="divider"></div>\
	</transition>',
	methods: {
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
				position: "fixed",
				top: "0px",
				zIndex: "9999",
				width: "100%",
				height: "100%"
			};
			return this.styleP ? stylePreload : {};
		},	
	}
});
var container = new configComponent({
	name : "c-container",
	data: {
		styleP :false,
	},
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		valign : false,
		container :true,
		show : true,
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods: {
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
	},
});
var row = new configComponent({
	name : "c-row",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true
	},
	data:{

	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="row">{{this.text}}</div>\
	</transition>',
	methods: {	
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	},	
});
var col = new configComponent({
	name : "c-col",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
	},
	data:{
		s: 12,
		m: 12,
		l: 12,
		xl: 12,		
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="col">{{this.text}}</div>\
	</transition>',
	methods: {
		setAll : function(arg){
			this.s = arg;
			this.m = arg;
			this.l = arg;
			this.xl = arg;
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
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", typeof this.s === "number" ? s + this.s : s + 12, typeof this.m === "number" ? m + this.m : m +  12, typeof this.l === "number" ? l + this.l : l + 12, typeof this.xl === "number" ? xl + this.xl : xl + 12, this.container ? container : "").join(" ");
		},
	},	
});

var header = new configComponent({
	name : "c-header",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
	},
	data : {

	},
	template: 
	'<transition name="fade">\
	<header key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</header>\
	</transition>',
	methods: {
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	}		
});

var main = new configComponent({
	name : "c-main",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
	},
	data: {

	},
	template: 
	'<transition name="fade">\
	<main key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</main>\
	</transition>',
	methods: {
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	}		
});

var footer = new configComponent({
	name : "c-footer",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true
	},
	data : {

	},
	template: 
	'<transition name="fade">\
	<footer key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</footer>\
	</transition>',
	methods: {
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	}		
});
var h = new configComponent({
	name : "c-h",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		flowText : false
	},
	data: {
		size : 1,
	},
	template: 
	'<transition name="fade">\
	<h1 v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</h1>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "h" + this.size;
			return tagName;	
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
			var flowText = "flow-text";			
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.flowText ? flowText : "").join(" ");
		},
	},		
});
var p = new configComponent({
	name : "c-p",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		flowText : false
	},
	data : {

	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "p";
			return tagName;	
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			var flowText = "flow-text";				
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.flowText ? flowText : "").join(" ");
		},
	}		
});
var blockquotes = new configComponent({
	name : "c-blockquotes",
	property: {
		text: null,
		color : null,
		colorText : null,
		colorHexa : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		flowText : false
	},
	data: {},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "blockquote";
			return tagName;	
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			var flowText = "flow-text";				
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.flowText ? flowText : "").join(" ");
		},
		setShow : function(arg){
			this.show = arg;
			return this;
		},
		setStyle : function(){
			var out = {};
			if(this.colorHexa){
				out = { borderLeftColor : this.colorHexa};
			}
			return out;
		}		
	}		
});
var span = new configComponent({
	name : "c-span",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		flowText : false
	},
	data : {},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "span";
			return tagName;	
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			var flowText = "flow-text";	
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.flowText ? flowText : "").join(" ");
		},
	}		
});
var pre = new configComponent({
	name : "c-pre",
	property: {
		text: null,
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		flowText : false
	},
	data:{

	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "pre";
			return tagName;	
		},		
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";
			var flowText = "flow-text";	
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.flowText ? flowText : "").join(" ");
		},
	}		
});
var icon = new configComponent({
	name : "c-icon",
	property: {
		color : null,
		colorText : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		size : "Small",
		show : true
	},
	data: {
		d : 0,
		prefix : false,
		icon: null,
	},
	template: 
	'<transition name="fade">\
	<div class="material-icons" v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.icon}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "i";
			return tagName;	
		},		
		setIcon : function(arg){
			this.icon = arg;
			return this;
		},
		setPrefix : function (arg){
			this.prefix = arg;
			return this;
		},
		setD : function (arg){
			this.d = arg;
			return this;
		},
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";			
			var prefix = "prefix";
			var dbox = "dbox";
			var dline = "dline";
			return new Array(this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "",  this.prefix ? prefix : "", (this.d == 0 ? "" : (this.d == 1 ? dline : (this.d == 2 ? dbox : "")))).join(" ");
		},
	}		
});
var form = new configComponent({
	name : "c-form",
	property: {
		color : null,
		colorText : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true
	},
	data: {
		file : false,
		method : 0,		
	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:method="this.generateMethod()" v-bind:enctype="this.generateEnctype()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div>\
	</transition>',
	methods: {
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
	}		
});
var table = new configComponent({
	name : "c-table",
	property: {
		color : null,
		colorText : null,
		textAling : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,
		striped : false,
		highlight : false,
		centered : false,
		responsive : false,
	},
	data: {
		head : new Array(),
		row : new Array(),		
	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<thead v-html="this.generateHead()"></thead>\
	<tbody v-html="this.generateRow()"></tbody>\
	</div>\
	</transition>',
	methods: {
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
	}		
});
var button =  new configComponent({
	name : "c-button",
	property: {
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		wave : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		size : "btn-small",
		show : true,
		disable : false,
		flat : false,
		floating : false,
	},
	data: {
		type : 0,
	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:type="this.generateType()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "button";
			return tagName;	
		},			
		generateType : function(){
			var type = new Array("button", "submit", "reset");
			return type[this.type];	
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
	}		
});
var a = new configComponent({
	name : "c-a",
	property: {
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		wave : null,
		size : "btn-small",
		href : null,
		show : true,
		disable : false,
		flat : false,
		floating : false,
	},
	data : {

	},
	template: 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:href="this.href" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div>\
	</transition>',
	methods: {
		generateTag : function(){
			var tagName = "a";
			return tagName;	
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
	}		
});
var inputFields = new configComponent({
	name : "c-inputFields",
	property: {
		inputLabelId : null,
		text : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		name : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true			
	},
	data :{
		type : 0,
	},
	template: 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<input v-bind:name="this.name" v-bind:id="this.generateInputLabelId(5)" v-bind:type="generateType()" class="validate">\
	<label v-bind:for="this.inputLabelId">{{this.text}}</label>\
	</div>\
	</transition>',
	methods: {
		generateInputLabelId : function(arg){
			this.inputLabelId = app ? this.$options.name + app.generateId(arg) : this.$options.name + this.$root.generateId(arg);	
			return this.inputLabelId;	
		},																	
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
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
		},
	}
});
var inputTextarea = new configComponent({
	name : "c-inputTextarea",
	property: {
		inputLabelId : null,
		name : null,
		text : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true			
	},
	data: {	
	},
	template: 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<textarea v-bind:name="this.name" class="materialize-textarea" v-bind:id="this.generateInputLabelId(5)"></textarea>\
	<label v-bind:class="this.setClass()" v-bind:for="this.inputLabelId">{{this.text}}</label>\
	</div>\
	</transition>',
	methods: {
		generateInputLabelId : function(arg){
			this.inputLabelId = app ? this.$options.name + app.generateId(arg) : this.$options.name + this.$root.generateId(arg);	
			return this.inputLabelId;	
		},																				
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	}
});
var inputSwitch = new configComponent({
	name : "c-inputSwitch",
	property: {
		inputLabelId : null,
		name : null,
		text : new Array("Off", "On"),
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true			
	},
	data:{
	},
	template: 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" class="switch">\
	<label>{{this.text[0]}}\
	<input v-bind:name="this.name" type="checkbox">\
	<span class="lever"></span>{{this.text[1]}}\
	</label>\
	</div>\
	</transition>',
	methods: {												
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "").join(" ");
		},
	}
});
var inputCheckbox = new configComponent({
	name : "c-inputCheckbox",
	property: {
		inputLabelId : null,
		name : null,
		text : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		show : true,	
		filledIn : false,
	},
	data: {
	},
	template: 
	'<transition name="fade">\
	<label key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	<input v-bind:class="this.setClass()" v-bind:name="this.name" type="checkbox" />\
	<span>{{this.text}}</span>\
	</label>\
	</transition>',
	methods: {						
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			var filledIn = "filled-in";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.filledIn ? filledIn : "").join(" ");
		},
	}	
});
var inputRadio = new configComponent({
	name : "c-inputRadio",
	property: {
		inputLabelId : null,
		name : null,
		text : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		withGap : false,
		show : true			
	},
	data: {

	},
	template: 
	'<transition name="fade">\
	<label key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	<input v-bind:class="this.setClass()" v-bind:name="this.name" type="radio" />\
	<span>{{this.text}}</span>\
	</label>\
	</transition>',
	methods: {												
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var container = "container";				
			var withGap = "with-gap";				
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.withGap ? withGap : "").join(" ");
		},
	}	
});
var img = new configComponent({
	name : "c-img",
	property: {
		inputLabelId : null,
		name : null,
		text : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		src : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		responsive : false,
		show : true			
	},
	data: {
		circle : false,
		materialbox : false,
	},
	template: 
	'<transition name="fade">\
	<img key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="setClass()" v-bind:src="this.src">\
	</transition>',
	methods: {
		setCircle : function(arg){
			this.circle = arg;
			return this;
		},
		setMaterialbox : function(arg){
			this.materialbox = arg;
			if(arg){
				$('.materialboxed').materialbox();
			}
			return this;
		},								
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			var circle = "circle";							
			var responsive = "responsive";							
			var materialbox = "materialboxed";												
			return new Array(this.color, this.colorText, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "", this.circle ? circle : "", this.responsive ? responsive : "", this.materialbox ? materialbox : "").join(" ");
		},
	}	
});
var dropdown = new configComponent({
	name : "c-dropdown",
	property: {
		id : null,
		color : null,
		colorText : null,
		text : null,
		float : null,
		shadow : null,
		truncate : false,
		cardpanel : false,
		hoverable : false,
		container : false,
		valign : false,
		disable : false,
		flat : false,
		floating : false,
		wave : null,
		size : "btn-small",
		href : "#",
		show : true,
	},
	data: {
		dropdown : new Array(),
		idA : null,
	},
	template:
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show">\
	<div v-bind:id="this.generateIdA()" v-bind:is="this.generateTag()" key="this.generateId(5)" class="dropdown-trigger" v-bind:data-target="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	<ul key="this.generateId(5)" v-bind:id="this.id" class="dropdown-content" v-html="this.generateDropDown()" ></ul>\
	</div>\
	</transition>',
	methods: {
		generateDropDown: function (arg){
			var out = new Array();
			$.each(this.dropdown, function(i, v) {
				out.push("<li>");
				if(typeof v == 'string'){
					out.push(v);
				}else{
					console.log(v);
					out.push(v.$el.outerHTML);
				}
				out.push("</li>");
			});
			return out.join("");
		},
		addDropDown : function (arg){
			this.dropdown.push(arg);
			return this;
		},
		clearDropDown : function (arg){
			this.dropdown = new Array();
			return this;
		},
		generateIdA : function(arg){
			this.idA = this.$options.name + app.generateId(arg);
			return this.idA;
		},		
		generateTag : function(){
			var tagName = "a";
			return tagName;	
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
	},
	mounted: function () {
		this.$nextTick(function () {
			$('#'+this.idA).dropdown();
		})
	}	

});
var badge = new configComponent({
	name : "c-badge",
	property : {
		text : null,
		color : null,
		colorText : null,
		show : true,
	},
	data : {
		new : false,
	},
	template:
	'<transition name="fade">\
	<span key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="badge">{{this.text}}</span>\
	</transition>',	
	methods : {
		setNew : function(arg){
			this.new = arg;
			return this;
		},		
		setClass : function(){
			var css = "new"; 
			return new Array(this.color, this.colorText, this.new ? css : "").join(" ");
		},
	}
});
var collection = new configComponent({
	name : "c-collection",
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-html="this.generateRow()" >\
	</div>\
	</transition>',
	property : {
		color : null,
		colorText : null,
		textAling : null,
		shadow : null,
		show : true,
	},
	data: {
		mode : 0,
		row : new Array(),			
	},
	methods : {
		setClass : function (){
			var setClass = "";
			switch(this.mode){
				case 0 : setClass = "collection";
				break; 
				case 1 : 
				case 2 : setClass = "collection with-header";
				break; 
			}

			return new Array(setClass, this.color, this.colorText, this.textAling, this.shadow).join(" ");
		},
		generateRow : function(){
			var out = new Array();
			switch(this.mode){
				case 0 : 
				$.each(this.row, function(i, v) {
					out.push('<li class="collection-item">' + v + '</li>');
				});
				break; 
				case 1 :
				$.each(this.row, function(i, v) {
					console.log(v.$el);
					$(v.$el).addClass('collection-item');
					out.push(v.$el.outerHTML);
				});
				break; 
				case 2 :
				$.each(this.row, function(i, v) {
					if(i == 0){
						out.push('<li class="collection-header">' + v.$el.outerHTML + '</li>');
					}else{
						out.push('<li class="collection-item">' + v.$el.outerHTML + '</li>');
					}
				});
				break; 
			}			

			return out.join("");
		},
		generateTag : function(){
			var tagName = "";
			switch(this.mode){
				case 0 : tagName = "ul";
				break; 
				case 1 : tagName = "div";
				break; 
				case 2 : tagName = "ul";
				break; 
			}
			return tagName;	
		},	
		addRow : function(arg){
			this.row.push(arg)
			return this;			
		},
		clearRow : function(){
			this.row = new Array();
			return this;
		},
		setMode : function(set){
			switch (set) {
				case 0 :
				case "basic" : 
				case "Basic" : 
				this.mode = 0;
				break;
				case 1 : 
				case "link" : 
				case "Link" : 
				this.mode = 1;
				break;
				case 2 : 
				case "headers" : 
				case "HEADERS" : 
				this.mode = 2;
				break;
			}
			return this;
		}
	}
});
var collapsible = new configComponent({
	name : "c-collapsible",
	template : 
	'<transition name="fade">\
	<ul key="this.generateId(5)" v-show="this.show" class="collapsible" v-bind:class="this.setClass()"  v-bind:id="this.generateId(5)" v-html="this.generateRow()">\
	</ul>\
	</transition>',
	property : {
		id : null,
		color : null,
		colorText : null,
		textAling : null,
		shadow : null,
		show : true,
	},
	data:{
		row : new Array(),
	},
	methods : {
		setClass : function (){
			return new Array(this.color, this.colorText, this.textAling, this.shadow).join(" ");
		},
		generateRow : function(){
			var out = new Array();
			$.each(this.row, function(i, v) {
				out.push('<li>');
				out.push('<div class="collapsible-header">');
				out.push(v.header.$el ? v.header.$el.outerHTML : v.header);
				out.push('</div>');
				out.push('<div class="collapsible-body">');
				out.push(v.body.$el ? v.body.$el.outerHTML : v.body);
				out.push('</div>');
				out.push('</li>');				
			});
			return out.join("");
		},		
		/**
		* [addRow description] se agrega un vector a la lista
		* @param {[type]} arg [description] Array (header, body), donde header y body, son componentes 
		*/
		addRow : function(arg){
			this.row.push(arg)
			return this;			
		},
		clearRow : function(){
			this.row = new Array();
			return this;
		},		
	},
	mounted: function () {
		this.$nextTick(function () {
			$('#'+this.id).collapsible();
		})
	}	
});
var parallax = new configComponent({
	name : "c-parallax",
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" class="parallax-container">\
	<div class="parallax"><img v-bind:src="this.src"></div>\
	</div>\
	</transition>',
	property: {
		id : null,
		show : true,
		src : null,
	},	
	methods: {

	},
	mounted: function () {
		this.$nextTick(function () {
			$('.parallax').parallax();
		})
	}		
});
//macro components
var preloaderFull = new configComponent({
	name : "c-preloaderFull",
	property: {
		color : new Array(null, null),
		show : true
	},
	data: {
		sectionColor : "",
		mode : 0,
		progress : 40,
		
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
});
var preloaderCircleFull = new configComponent({
	name : "c-preloaderCircleFull",
	property: {
		colorsHexa : "red",
		size : "big",
		show : true
	},
	data: {
		sectionColor : "",
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
		},
	},
	render: function (createElement) {
		var csection = new this.$options.components['c-section']().$mount().setStyleP(true).setColor(this.sectionColor);
		var ccontainer = new this.$options.components['c-container']().$mount().setStyleP(true).setContainer(false);
		var preloaderCircle = new this.$options.components['c-preloader-circle']().$mount().setColorHexa(this.colorsHexa).setSize(this.size);
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
});