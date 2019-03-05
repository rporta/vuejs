//Obj config component
let configComponent = class {
	/**
	 * [constructor description]
	 * @param  {obj} obj [description] regular object that is passed to the component constructor
	 * @return {void}     [description] create config component : string(name), function(data), obj(methods)
	 */
	 constructor(obj) {
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
	 	};

		//set data 
		this.data = typeof obj.data  ==  "function" ? obj.data : null;


		//create methods in data
		typeof this.data   ==  "function"
		? (()=>{
			for(let i in this.data ()){
				var method =  'set' + i.charAt(0).toUpperCase() + i.slice(1);
				setMethods[method] = function(arg) {
					this[i] = arg;
					return this;
				}
			}
		})()
		: null;


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
				default :
				break;
			}
			return setClass.join(" ").trim();
		}
		//set methods && obj.methods
		this.methods = Object.assign(setMethods, obj.methods);
	};
};
var test = new  configComponent({
	name : 'c-test',
	data : function(){
		return {			
			text : this.ptext,
			color : null,
			colorText : null,
			textAling : null,
			float : null,
			shadow : null,
			truncate : false,
			cardpanel : false,
			hoverable : false,
			valign : false,
			container : true,
			show : true,		
		}
	},
	props : {
		ptext : {
			type : String,
			required : false, 
			default : "fafa",
		}
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()">{{this.text}}<slot></slot></div>\
	</transition>'
})



//components
var preloader = new  configComponent({
	name : "c-preloader",
	data : function() {
		return {
			color : this.pcolor,
			show : this.pshow,
			mode : this.pmode,
			space : ' ',
			percentage : '%',
			progress : this.pprogress,
		}
	},
	props : {
		pcolor : {
			type : Array,
			required : false, 
			default : function(){return new Array(null, null)},
		},
		pshow : {
			type : Boolean,
			required : false, 
			default : true,
		},
		pmode : {
			type : String,
			required : false, 
			default : "indeterminate",
		},
		pprogress : {
			type : Number,
			required : false, 
			default : 40,
		},
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="color[0]"  class="progress" >\
	<div v-bind:style="this.setStyle()" v-bind:class="color[1] + space + mode"></div>\
	</div>\
	</transition>',
	methods : {
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
	data : function() {
		return {			
			colorHexa : this.pcolorHexa,
			show :this.pshow,
			size : this.psize,
		}
	},
	props : {
		pcolorHexa : {
			type : String,
			required : false, 
			default : "red",
		},
		pshow : {
			type : Boolean,
			required : false, 
			default : true,
		},
		psize : {
			type : String,
			required : false, 
			default : "big",
		},		
	},
	template : 
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
	methods : {
		setStyle : function(){
			var out;
			out = {borderColor : this.colorsHexa}	
			return out;
		},
	}
});
var section = new  configComponent({
	name : "c-section",
	data : function(){
		return {
			text :this.ptext,
			color :this.pcolor,
			colorText :this.pcolorText,
			textAling :this.ptextAling,
			float :this.pfloat,
			shadow :this.pshadow,
			truncate :this.ptruncate,
			cardpanel :this.pcardpanel,
			hoverable :this.phoverable,
			container :this.pcontainer,
			valign :this.pvalign,
			show :this.pshow,
			styleP :this.pstyleP,
			d :this.pd,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pstyleP  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pd  : {
			type : Number,
			required : false, 
			default : 0,
		}, 
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="section">{{this.text}}</div>\
	</transition>',
	methods : {
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
				position : "fixed",
				top : "0px",
				zIndex : "9999",
				width : "100%",
				height : "100%"
			};
			return this.styleP ? stylePreload : {};
		},
	}
});
var div = new configComponent({
	name : "c-div",
	data : function() {
		return{
			styleP : this.pstyleP,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			valign : this.pvalign,
			container : this.pcontainer,
			show : this.pshow,
		}
	},
	props : {
		pstyleP  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		ptext  : {
			type : String,
			required : false, 
			default : null,
		},  
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		},  
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		},  
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		},  
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		},  
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		},  
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		},  
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods : {
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
				position : "absolute",
				top : "50%",
				left : "50%",
				transform : "translate(-50%, -50%)"
			};
			return this.styleP ? stylePreload : {};			
		}	
	}
});
var modal = new configComponent({
	name : "c-modal",
	data :  function(){
		return {
			styleP : this.pstyleP,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		pstyleP  : {
			type : String,
			required : false, 
			default : false,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : String,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="modal">\
	<div class="modal-content center-align">{{this.text}}</div>\
	<div class="modal-footer" style="text-align : center !important;">\
	<a class="modal-close waves-effect btn-flat" >Aceptar</a>\
	</div>\
	</div>\
	</transition>',
	methods : {
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
				position : "fixed",
				top : "0px",
				zIndex : "9999",
				width : "100%",
				height : "100%"
			};
			return this.styleP ? stylePreload : {};
		},
		open : function (){
			return this.$el.M_Modal.open();
		}
	},
	mounted : function () {
		this.$nextTick(function () {
			$('.modal').modal();
		})
	}	
});
var br = new configComponent({
	name : "c-br",
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			styleP : this.pstyleP,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pstyleP		  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
	},
	template : 
	'<transition name="fade">\
	<br key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	</transition>',
	methods : {
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
				position : "fixed",
				top : "0px",
				zIndex : "9999",
				width : "100%",
				height : "100%"
			};
			return this.styleP ? stylePreload : {};
		},
	}
});
var divider = new configComponent({
	name : "c-divider",
	data : function(){
		return {
			styleP : this.pstyleP,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		pstyleP  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow		  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-bind:class="this.setClass()" v-show="this.show" v-bind:id="this.generateId(5)" class="divider"></div>\
	</transition>',
	methods : {
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
				position : "fixed",
				top : "0px",
				zIndex : "9999",
				width : "100%",
				height : "100%"
			};
			return this.styleP ? stylePreload : {};
		},	
	}
});
var container = new configComponent({
	name : "c-container",
	data : function(){
		return {
			styleP : this.pstyleP,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			valign : this.pvalign,
			container : this.pcontainer,
			show : this.pshow,
		}
	},
	props : {
		pstyleP  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pshow : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods : {
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
				position : "absolute",
				top : "50%",
				left : "50%",
				transform : "translate(-50%, -50%)"
			};
			return this.styleP ? stylePreload : {};			
		},	
	},
});
var row = new configComponent({
	name : "c-row",
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="row">{{this.text}}</div>\
	</transition>',
	methods : {	
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
	property : {
	},
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			s : this.ps,
			m : this.pm,
			l : this.pl,
			xl : this.pxl,		
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		ps  : {
			type : Number,
			required : false, 
			default : 12,
		}, 
		pm  : {
			type : Number,
			required : false, 
			default : 12,
		}, 
		pl  : {
			type : Number,
			required : false, 
			default : 12,
		}, 
		pxl  : {
			type : Number,
			required : false, 
			default : 12,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="col">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return{
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<header key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</header>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		fploat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		tpruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<main key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</main>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<footer key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</footer>\
	</transition>',
	methods : {
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
	data : function(){
		return {			
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			flowText : this.pflowText,
			size : this.psize,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		fploat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		fplowText  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		psize  : {
			type : Number,
			required : false, 
			default : 1,
		}, 
	},
	template : 
	'<transition name="fade">\
	<h1 v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</h1>\
	</transition>',
	methods : {
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
	data : function(){
		return{			
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			flowText : this.pflowText,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pflowText  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			colorHexa : this.pcolorHexa,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			flowText : this.pflowText,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorHexa  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : String,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : String,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : String,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : String,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : String,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : String,
			required : false, 
			default : true,
		}, 
		pflowText  : {
			type : String,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			flowText : this.pflowText,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pflowText  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			flowText : this.pflowText,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pflowText  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return{
			color : this.pcolor,
			colorText : this.pcolorText,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			size : this.psize,
			show : this.pshow,
			d : this.pd,
			prefix : this.pprefix,
			icon : this.picon,
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		psize  : {
			type : String,
			required : false, 
			default : "Small",
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pd  : {
			type : Number,
			required : false, 
			default : 0,
		}, 
		pprefix  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		picon  : {
			type : String,
			required : false, 
			default : null,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div class="material-icons" v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.icon}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			file : this.pfile,
			method : this.pmethod,		
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pfile  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pmethod  : {
			type : Number,
			required : false, 
			default : 0,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:method="this.generateMethod()" v-bind:enctype="this.generateEnctype()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
			striped : this.pstriped,
			highlight : this.phighlight,
			centered : this.pcentered,
			responsive : this.presponsive,
			head : this.phead,
			row : this.prow,
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pstriped  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phighlight  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcentered  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		presponsive  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phead  : {
			type : Array,
			required : false, 
			default : function () { return new Array() },
		}, 
		prow  : {
			type : Array,
			required : false, 
			default : function () { return new Array() },
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<thead v-html="this.generateHead()"></thead>\
	<tbody v-html="this.generateRow()"></tbody>\
	</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			wave : this.pwave,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			size : this.psize,
			show : this.pshow,
			disable : this.pdisable,
			flat : this.pflat,
			floating : this.pfloating,
			type : this.ptype,
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pwave  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		psize  : {
			type : String,
			required : false, 
			default : "btn-small",
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pdisable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pflat  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pfloating  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		ptype  : {
			type : Number,
			required : false, 
			default : 0,
		}, 
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:type="this.generateType()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods : {
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
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			wave : this.pwave,
			size : this.psize,
			href : this.phref,
			show : this.pshow,
			disable : this.pdisable,
			flat : this.pflat,
			floating : this.pfloating,
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pwave  : {
			type : String,
			required : false, 
			default : null,
		}, 
		psize  : {
			type : String,
			required : false, 
			default : "btn-small",
		}, 
		phref  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pdisable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pflat  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pfloating  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:href="this.href" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"></div>\
	</transition>',
	methods : {
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
	name : "c-input-fields",
	data : function(){
		return {
			inputLabelId : this.pinputLabelId,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			name : this.pname,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,		
			type : this.ptype,
		}	
	},
	props : {
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		ptype  : {
			type : Number,
			required : false, 
			default : 0,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<input v-bind:name="this.name" v-bind:id="this.generateInputLabelId(5)" v-bind:type="generateType()" class="validate">\
	<label v-bind:for="this.inputLabelId">{{this.text}}</label>\
	</div>\
	</transition>',
	methods : {
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
	name : "c-input-textarea",
	data : function(){
		return {
			inputLabelId : this.pinputLabelId,
			name : this.pname,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,		
		}	
	},
	props : {
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<textarea v-bind:name="this.name" class="materialize-textarea" v-bind:id="this.generateInputLabelId(5)"></textarea>\
	<label v-bind:class="this.setClass()" v-bind:for="this.inputLabelId">{{this.text}}</label>\
	</div>\
	</transition>',
	methods : {
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
	name : "c-input-switch",
	data : function(){
		return {
			inputLabelId : this.pinputLabelId,
			name : this.pname,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,
		}
	},
	props : {
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : function(){return new Array("Off", "On")},
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" class="switch">\
	<label>{{this.text[0]}}\
	<input v-bind:name="this.name" type="checkbox">\
	<span class="lever"></span>{{this.text[1]}}\
	</label>\
	</div>\
	</transition>',
	methods : {												
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
	name : "c-input-checkbox",
	data : function(){
		return {
			inputLabelId : this.pinputLabelId,
			name : this.pname,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			show : this.pshow,	
			filledIn : this.pfilledIn,			
		}
	},
	props : {
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pfilledIn  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<label key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	<input v-bind:class="this.setClass()" v-bind:name="this.name" type="checkbox" />\
	<span>{{this.text}}</span>\
	</label>\
	</transition>',
	methods : {						
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
	name : "c-input-radio",
	data : function(){
		return {		
			inputLabelId : this.pinputLabelId,
			name : this.pname,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			withGap : this.pwithGap,
			show : this.pshow,			
		}
	},
	props : {
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pwithGap  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<label key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	<input v-bind:class="this.setClass()" v-bind:name="this.name" type="radio" />\
	<span>{{this.text}}</span>\
	</label>\
	</transition>',
	methods : {												
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
	data : function(){
		return {
			circle : this.pcircle,
			materialbox : this.pmaterialbox,			
			inputLabelId : this.pinputLabelId,
			name : this.pname,
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			src : this.psrc,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			responsive : this.presponsive,
			show : this.pshow,			
		}
	},
	props : {
		pcircle  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pmaterialbox  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pinputLabelId  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pname  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		psrc  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		presponsive  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
	},
	template : 
	'<transition name="fade">\
	<img key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="setClass()" v-bind:src="this.src">\
	</transition>',
	methods : {
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
	data : function(){
		return {
			id : this.pid,
			color : this.pcolor,
			colorText : this.pcolorText,
			text : this.ptext,
			float : this.pfloat,
			shadow : this.pshadow,
			truncate : this.ptruncate,
			cardpanel : this.pcardpanel,
			hoverable : this.phoverable,
			container : this.pcontainer,
			valign : this.pvalign,
			disable : this.pdisable,
			flat : this.pflat,
			floating : this.pfloating,
			wave : this.pwave,
			size : this.psize,
			href : this.phref,
			show : this.pshow,
			dropdown : this.pdropdown,
			idA : this.pidA,
		}
	},
	props : {
		pid  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		ptext  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		pfloat  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		ptruncate  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pcardpanel  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		phoverable  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pcontainer  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pvalign  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pdisable  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pflat  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pfloating  : {
			type : Boolean,
			required : false, 
			default :  false,
		}, 
		pwave  : {
			type : String,
			required : false, 
			default :  null,
		}, 
		psize  : {
			type : String,
			required : false, 
			default :  "btn-small",
		}, 
		phref  : {
			type : String,
			required : false, 
			default :  "#",
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default :  true,			
		}, 
		pdropdown  : {
			type : Array,
			required : false, 
			default :  function(){return new Array()},
		}, 
		pidA  : {
			type : String,
			required : false, 
			default :  null,
		}, 		
	},
	template :
	'<transition name="fade">\
	<div key="this.generateId(5)" v-show="this.show">\
	<div v-bind:id="this.generateIdA()" v-bind:is="this.generateTag()" key="this.generateId(5)" class="dropdown-trigger" v-bind:data-target="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	<ul key="this.generateId(5)" v-bind:id="this.id" class="dropdown-content" v-html="this.generateDropDown()" ></ul>\
	</div>\
	</transition>',
	methods : {
		generateDropDown : function (arg){
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
	mounted : function () {
		this.$nextTick(function () {
			$('#'+this.idA).dropdown();
		})
	}	

});
var badge = new configComponent({
	name : "c-badge",
	data : function(){
		return {	
			text : this.ptext,
			color : this.pcolor,
			colorText : this.pcolorText,
			show : this.pshow,
			new : this.pnew,
		}
	},
	props : {
		ptext  : {
			type : String,
			required : false, 
			default : null,
		},  
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		},  
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		},  
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		},  
		pnew  : {
			type : Boolean,
			required : false, 
			default : false,
		},  
	},
	template :
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
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			shadow : this.pshadow,
			show : this.pshow,
			mode : this.pmode,
			row : this.prow,
		}
	},
	props : {
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pmode  : {
			type : Number,
			required : false, 
			default : 0,
		}, 
		prow  : {
			type : Array,
			required : false, 
			default : function(){return new Array()},
		}, 		
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
	data : function(){
		return {
			id : this.pcolor,
			color : this.pcolorText,
			colorText : this.ptextAling,
			textAling : this.pshadow,
			shadow : this.pshow,
			show : this.pmode,
			row : this.prow,
		}
	},
	props : {
		pid  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		ptextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		prow  : {
			type : Array,
			required : false, 
			default : function(){return new Array()},
		}, 		
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
	mounted : function () {
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
	data : function(){
		return {
			id : this.pid,
			show : this.pshow,
			src : this.psrc,
		}
	},
	props : {
		pid  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		psrc  : {
			type : String,
			required : false, 
			default : null,
		}, 		
	},
	methods : {

	},
	mounted : function () {
		this.$nextTick(function () {
			$('.parallax').parallax();
		})
	}		
});
//macro components
var preloaderFull = new configComponent({
	name : "c-preloader-full",
	data : function(){
		return {
			color : this.pcolor,
			show : this.pshow,
			sectionColor : this.psectionColor,
			mode : this.pmode,
			progress : this.pprogress,
		}
	},
	props : {
		pcolor  : {
			type : Array,
			required : false, 
			default : function(){return new Array(null, null)},
		}, 
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		psectionColor  : {
			type : String,
			required : false, 
			default : "",
		}, 
		pmode  : {
			type : Number,
			required : false, 
			default : 0,
		}, 
		pprogress  : {
			type : Number,
			required : false, 
			default : 40,
		}, 		
	},
	methods : {
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
	render : function (createElement) {
		var csection = new this.$options.components['c-section']().$mount().setStyleP(true).setColor(this.sectionColor);
		var ccontainer = new this.$options.components['c-container']().$mount().setStyleP(true);
		var cpreloader = new this.$options.components['c-preloader']().$mount().setColor(this.color).setMode(this.mode).setProgress(this.progress);
		csection.create(ccontainer);
		ccontainer.create(cpreloader);
		var section = createElement('c-section');
		section.child = csection;
		return section;
	},
	components : {
		[preloader.name] : preloader,
		[this.name] : preloaderFull,
		[container.name] : container,
		[section.name] : section
	}
});
var preloaderCircleFull = new configComponent({
	name : "c-preloader-circle-full",
	data : function(){
		return {
			colorsHexa : "red",
			size : "big",
			show : true,
			sectionColor : "",
		}
	},
	methods : {
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
	render : function (createElement) {
		var csection = new this.$options.components['c-section']().$mount().setStyleP(true).setColor(this.sectionColor);
		var ccontainer = new this.$options.components['c-container']().$mount().setStyleP(true).setContainer(false);
		var preloaderCircle = new this.$options.components['c-preloader-circle']().$mount().setColorHexa(this.colorsHexa).setSize(this.size);
		csection.create(ccontainer);
		ccontainer.create(preloaderCircle);
		var section = createElement('c-section');
		section.child = csection;
		return section;
	},
	components : {
		[preloaderCircle.name] : preloaderCircle,
		[this.name] : preloaderFull,
		[container.name] : container,
		[section.name] : section
	}
});