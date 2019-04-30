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
		setMethods.getVue = function(uid = 0){
			var uids = {};
			for(let i in document.all){
				var current = document.all[i];
				if(current.__vue__){
					uids[current.__vue__._uid] = current.__vue__;
					if(current.__vue__._uid === uid){
						return current.__vue__;
					}
				}
			}
			return uids;
		}
		setMethods.newComponent = function(component){
			return new this.$options.components[component]();
		}
		setMethods.generateId = function(arg){			
			return app ? this.$options.name + app.generateId(arg) : this.$options.name + this.$root.generateId(arg);		
		}
		setMethods.create = function(element){
			this.$el
			? this.$el.append(element.$mount().$el)
			: (() => {
				this.$mount().$el.append(element.$mount().$el);
			})();

			return this;
		}
		setMethods.setVue = function (add = "string", b = this){
			if(!b.$el){
				b.$mount();
			}
			$(b).empty();
			if(typeof add == 'string'){
				$(b.$el).text(add);
			}else{
				$(b.$el).append(add.$mount().$el);
			}
			return this;
		}
		setMethods.addVue = function (add = "string", b = this){
			if(!b.$el){
				b.$mount();
			}
			if(typeof add == 'string'){
				$(b.$el).append((document.createTextNode(add)));
			}else{
				if(!add.$el){
					add.$mount();	
				}
				var x = $(add.$el)
				console.log($(add.$el));
				$(b.$el).append(x);
			}
			return this;
		}
		setMethods.clearVue = function(b = this){
			if(!b.$el){
				b.$mount();
			}
			$(b).empty();
		}
		setMethods.binaryCompare = function(a, b){
			if(b.constructor.name === "Array"){
				for(var x in b){
					if(this.binaryCompare(a, b[x])) return true;
					if(x === b.length -1) return false;
				}
			}else{
				return a.localeCompare(b, 'es', { sensitivity: 'base' }) === 0 ? true : false;
			}
		}
		setMethods.setClass = function(arg){
			let setClass = new Array();
			//default class
			for(let i in this.$data){
				i == 'truncate' && this.$data[i] ? setClass.push(i) : null;
				i == 'cardpanel' && this.$data[i] ? setClass.push('card-panel') : null;
				i == 'hoverable' && this.$data[i] ? setClass.push(i) : null;
				i == 'container'  && this.$data[i] ? setClass.push(i) : null;
				i == 'valign' && this.$data[i] ? setClass.push('valign-wrapper') : null;
				i == 'flowText' && this.$data[i] ? setClass.push('flow-text') : null;
				i == 'striped' && this.$data[i] ? setClass.push(i) : null;
				i == 'highlight' && this.$data[i] ? setClass.push(i) : null;
				i == 'centered' && this.$data[i] ? setClass.push(i) : null;
				i == 'responsive' && this.$data[i] ? setClass.push('responsive-table') : null;
				i == 'filledIn' && this.$data[i] ? setClass.push('filled-in') : null;
				i == 'disable' && this.$data[i] ? setClass.push(i) : null;
				i == 'flat' && this.$data[i] ? setClass.push(i) : null;
				i == 'floating' && this.$data[i] ? setClass.push(i) : null;
				i == 'withGap' && this.$data[i] ? setClass.push('with-gap') : null;

				i == 'color' ||
				i == 'colorText' ||
				i == 'colorHexa' ||
				i == 'textAling' ||
				i == 'float' ||
				i == 'shadow' 
				? setClass.push(this.$data[i])
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
			if (this.binaryCompare(set, 'indeterminate') || set === 0){
				this.mode = "indeterminate";
			}
			else if (this.binaryCompare(set, 'determinate') || set === 1){
				this.mode = "determinate";
			}
			return this;
		},
		setStyle : function(){
			var out;
			if (this.binaryCompare(this.mode, 'indeterminate') || set === 0){
				out = {};
			}
			else if(this.binaryCompare(this.mode, 'determinate') || set === 1){
				out = { width : this.progress + this.percentage};
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
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()" class="section">{{this.text}}<slot></slot></div>\
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
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}<slot></slot></div>\
	</transition>',
	methods : {
		setStyleP : function(arg){
			this.styleP = arg;
			return this;			
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
		pshow  : {
			type : Boolean,
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
			this.$el.M_Modal.open();
			return this;
		},
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
			show : this.pshow,
		}
	},
	props : {
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 

	},
	template : 
	'<transition name="fade">\
	<br key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)">\
	</transition>',
	methods : {

	}
});
var divider = new configComponent({
	name : "c-divider",
	data : function(){
		return {
			show : this.pshow,
		}
	},
	props : {
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
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)"  v-bind:class="this.setClass()"  v-bind:style="this.setStyle()">{{this.text}}<slot></slot></div>\
	</transition>',
	methods : {
		setStyleP : function(arg){
			this.styleP = arg;
			return this;			
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
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="row">{{this.text}}<slot></slot></div>\
	</transition>',
	methods : {

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
	<div key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" class="col">{{this.text}}<slot></slot></div>\
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
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", typeof this.s === "number" ? s + this.s : s + 12, typeof this.m === "number" ? m + this.m : m +  12, typeof this.l === "number" ? l + this.l : l + 12, typeof this.xl === "number" ? xl + this.xl : xl + 12, this.container ? container : "").join(" ").trim();
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
	<header key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}<slot></slot></header>\
	</transition>',
	methods : {

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
	<main key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}<slot></slot></main>\
	</transition>',
	methods : {

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
	<footer key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}<slot></slot></footer>\
	</transition>',
	methods : {

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
	}		
});
var ol = new configComponent({
	name : "c-ol",
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
			var tagName = "ol";
			return tagName;	
		},		
	}		
});
var ul = new configComponent({
	name : "c-ul",
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
			padingl : this.pppadingl,
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
		ppadingl  : {
			type : String,
			required : false, 
			default : null,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:style="this.generateStyle()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
	</transition>',
	methods : {
		generateTag : function(){
			var tagName = "ul";
			return tagName;	
		},	
		generateStyle : function(){
			var setStyle = {};
			this.padingl !== null 
			? (() => {
				setStyle.paddingLeft = this.padingl;
			})()
			: null; 
			return setStyle;	
		},	
	}		
});
var li = new configComponent({
	name : "c-li",
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
			value : this.pvalue,
			listStyle : this.plistStyle,
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
		pvalue  : {
			type : String,
			required : false, 
			default : null,
		}, 		
		plistStyle  : {
			type : String,
			required : false, 
			default : null,
		}, 		
	},
	template : 
	'<transition name="fade">\
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:style="this.generateStyle()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:value="this.value">{{this.text}}</div>\
	</transition>',
	methods : {
		generateTag : function(){
			var tagName = "li";
			return tagName;	
		},
		generateStyle : function(){
			var setStyle = {}
			this.listStyle !== null 
			? (() => {
				setStyle.listStyleType = this.listStyle;
			})()
			: null;
			return setStyle;	
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
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()" v-bind:style="this.setStyle()">{{this.text}}</div>\
	</transition>',
	methods : {
		generateTag : function(){
			var tagName = "blockquote";
			return tagName;	
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
			return new Array(this.color, this.colorText, this.float, this.shadow, this.size, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "", this.container ? container : "",  this.prefix ? prefix : "", (this.d == 0 ? "" : (this.d == 1 ? dline : (this.d == 2 ? dbox : "")))).join(" ").trim();
		},
	}		
});
var form = new configComponent({
	name : "c-form",
	data : function(){
		return {
			action : this.paction,
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
		paction  : {
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
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:action="this.action" v-bind:method="this.generateMethod()" v-bind:enctype="this.generateEnctype()" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()"><slot></slot></div>\
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
		setMethod : function (arg){
			if(this.binaryCompare(arg, 'get') || 0 === arg){
				this.method = 0;
			}
			else if(this.binaryCompare(arg, 'post') || 1 === arg){
				this.method = 1;
			}
			return this;
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
	<thead><tr></tr></thead>\
	<tbody></tbody>\
	</div>\
	</transition>',
	methods : {
		generateTag : function(arg){
			var tagName = "table";
			return tagName;	
		},		
		generateHead : function(){
			var b = this;
			if(!b.$el) b.$mount();
			var head = table.$el.children[0].children[0];
			$(head).empty();
			for(x in this.head){
				var currentHead = this.head[x];
				if(currentHead.constructor.name == 'String'){
					var th = $('<th>');
					th.append(currentHead);
					$(head).append(th);
				}else{
					var th = $('<th>');
					th.append(currentHead.$mount().$el);
					$(head).append(th);
				}
			}

			return this;
		},		
		generateRow : function(){
			var b = this;
			if(!b.$el) b.$mount();
			var row = b.$el.children[1];
			$(row).empty();
			for(x in this.row){
				var currentRow = this.row[x];
				var tr = $('<tr>');
				for(c in currentRow){
					var th = $('<th>');
					var currentC = currentRow[c];
					if(currentC.constructor.name == 'String'){
						th.append(currentC);
						tr.append(th);
					}else{
						tr.append(currentC.$mount().$el);
						tr.append(th);
					}
				}
				$(row).append(tr);
			}
			return this;
		},		
		setHead : function(arg){
			this.head = arg;
			this.generateHead();
			return this;
		},
		addHead : function(arg){
			this.head.push(arg);
			this.generateHead();
			return this;
		},
		addRow : function(arg){
			this.row.push(arg);
			this.generateRow();
			return this;
		},
		clearRow :function(){
			this.row = new Array();
			this.generateRow();
			return this;
		},
		clearHead : function(){
			this.head = new Array();
			this.generateHead();
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
			if(this.binaryCompare(arg, 'button') || arg === 0){
				this.type = 0;
			}
			else if(this.binaryCompare(arg, 'submit') || arg === 1){
				this.type = 1;
			}
			else if(this.binaryCompare(arg, 'reset') || arg === 2){
				this.type = 2;
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
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:href="this.href" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">{{this.text}}</div>\
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
			value : this.pvalue,
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
		pvalue  : {
			type : String,
			required : false, 
			default : null,
		},	
	},
	template : 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<input v-bind:value="this.value" v-bind:name="this.name" v-bind:id="this.generateInputLabelId(5)" v-bind:type="generateType()" class="validate">\
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
			if (this.binaryCompare(arg, 'text') || arg === 0) {
				this.type = 0;
			}
			else if (this.binaryCompare(arg, 'email') || arg === 1) {
				this.type = 1;
			}
			else if (this.binaryCompare(arg, 'password') || arg === 2) {
				this.type = 2;
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
			value : this.pvalue,
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
		pvalue  : {
			type : String,
			required : false, 
			default : null,
		},
	},
	template : 
	'<transition name="fade">\
	<div class="input-field" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
	<textarea v-bind:value="this.value" v-bind:name="this.name" class="materialize-textarea" v-bind:id="this.generateInputLabelId(5)"></textarea>\
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
	<div v-bind:is="this.generateTag()" key="this.generateId(5)" v-show="this.show" v-bind:id="this.generateId(5)" v-bind:class="this.setClass()">\
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
			x : 0,
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
				case 1 : 
				case 0 : setClass = "collection";
				break; 
				case 2 : setClass = "collection with-header";
				break; 
			}

			return new Array(setClass, this.color, this.colorText, this.textAling, this.shadow).join(" ").trim();
		},
		generateRow : function(){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(this.$el).empty();

			for(var r in this.row){
				var currentRow = this.row[r];
				if(!currentRow.$el){
					currentRow.$mount();
				}
				switch(this.mode){
					case 0 : 
					var li = this.newComponent("c-li").$mount();
					$(li.$el).addClass("collection-item").append(currentRow.$el);
					$(this.$el).append(li.$el);
					break; 
					case 1 : 
					$(currentRow.$el).addClass("collection-item");
					$(this.$el).append(currentRow.$el);
					break; 
					case 2 : 
					var li = this.newComponent("c-li").$mount();
					if(r === 0){
						$(li.$el).addClass("collection-header").append(currentRow.$el);
					}else{
						$(li.$el).addClass("collection-item").append(currentRow.$el);
					}
					$(this.$el).append(li.$el);
					break; 	
				}
			}
			this.x++;
			console.log(this.x);	
		},
		generateTag : function(){
			var tagName = "";
			switch(this.mode){
				case 0 : 
				case 2 :  tagName = "ul";
				break; 
				case 1 : tagName = "div";
				break; 
			}
			return tagName;	
		},	
		addRow : function(arg){
			this.row.push(arg);
			this.generateRow();
			return this;			
		},
		clearRow : function(){
			this.row = new Array();
			return this;
		},
		setMode : function(set){
			if (this.binaryCompare(set, 'basic') || set === 0){
				this.mode = 0;
			}
			else if (this.binaryCompare(set, 'link') || set === 1){
				this.mode = 1;
			}
			else if (this.binaryCompare(set, 'headers') || set === 2){
				this.mode = 2;
			}
			return this;
		}
	},
	components : {
		[li.name] : li,
		[ul.name] : ul,
		[div.name] : ul,
		[this.name] : collection,
	}
});
var collapsible = new configComponent({
	name : "c-collapsible",
	template : 
	'<transition name="fade">\
	<ul key="this.generateId(5)" v-show="this.show" class="collapsible" v-bind:class="this.setClass()"  v-bind:id="this.generateId(5)">\
	</ul>\
	</transition>',
	data : function(){
		return {
			color : this.pcolor,
			colorText : this.pcolorText,
			textAling : this.ptextAling,
			shadow : this.pshow,
			show : this.pshow,
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
		prow  : {
			type : Array,
			required : false, 
			default : function(){return new Array()},
		}, 		
	},
	methods : {
		generateRow : function(){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(this.$el).empty();
			for(var r in this.row){
				var currentRow = this.row[r];
				var currentBody = currentRow.body;
				var currentHead = currentRow.head;
				if(!currentHead.$el){
					currentHead.$mount();
				}
				if(!currentBody.$el){
					currentBody.$mount();
				}
				var li = this.newComponent("c-li").$mount();
				var divHead = this.newComponent("c-div").$mount();
				var divBody = this.newComponent("c-div").$mount();
				$(divHead.$el).addClass("collapsible-header").append(currentHead.$el);
				$(divBody.$el).addClass("collapsible-body").append(currentBody.$el);
				$(li.$el).append(divHead.$el);
				$(li.$el).append(divBody.$el);
				$(this.$el).append(li.$el);
			}			
			return this;
		},
		addRow : function(arg){
			this.row.push(arg);
			this.generateRow();
			return this;			
		},
		clearRow : function(){
			this.row = new Array();
			return this;
		},		
	},
	mounted : function () {
		this.$nextTick(function () {
			$('.collapsible').collapsible();
		})
	},
	components : {
		[li.name] : li,
		[div.name] : div,
		[this.name] : collapsible,
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
	},		
});
//macro components
var navbar = new configComponent({
	name : "c-nav-bar",
	template :
	'<transition-group name="fade">\
	<nav key="this.generateId(5)" style="position: relative;height: 100%;" v-show="this.show" v-bind:id="this.generateId(5)">\
	<div class="nav-wrapper" v-bind:class="this.setClass()">\
	<a href="#!" style="position: relative;height: 100%;" class="brand-logo" v-bind:class="this.setClassLogo()"></a>\
	<a href="#" data-target="mobile-demo" class="sidenav-trigger" v-bind:class="this.setClassMenu()"><i class="material-icons">menu</i></a>\
	<ul class="hide-on-med-and-down" v-bind:class="this.setClassMenu()">\
	</ul>\
	</div>\
	</nav>\
	<ul key="this.generateId(5)" class="sidenav" v-bind:class="this.setClassMobile()" id="mobile-demo">\
	</ul>\
	</transition-group>',	
	data : function(){
		return{
			alingLogo : 0,
			logo : null,
			menuD : new Array(),
			menuM : new Array(),
			shadow : this.pshadow,
			show : this.pshow,
			color : this.pcolor,
			colorText : this.pcolorText,			
			colorM : this.pcolorM,			
			colorTextM : this.pcolorTextM,			
		}
	},
	props : {
		pshadow  : {
			type : String,
			required : false, 
			default : "z-depth-1",
		},		
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		},
		pcolor  : {
			type : String,
			required : false, 
			default : "blue",
		}, 
		pcolorM  : {
			type : String,
			required : false, 
			default : "white",
		}, 
		pcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 		
		pcolorTextM  : {
			type : String,
			required : false, 
			default : null,
		}, 		
	},
	methods : {
		setAlingLogo(arg){
			if (this.binaryCompare(arg, 'left') || this.binaryCompare(arg, 'l') || arg === 0){
				this.alingLogo = 0;
			}			
			else if(this.binaryCompare(arg, 'center') || this.binaryCompare(arg, 'c') || arg === 1){
				this.alingLogo = 1;
			}			
			else if(this.binaryCompare(arg, 'right') || this.binaryCompare(arg, 'r') || arg === 2){
				this.alingLogo = 2;
			}
			else if(this.binaryCompare(arg, 'centerright') || this.binaryCompare(arg, 'cr') || arg === 3){
				this.alingLogo = 3;
			}			
			return this;		
		},
		addLogo(arg){
			this.logo = arg;
			this.generateLogo();
			return this;
		},
		generateLogo(){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(b.$el.children[0].children[0].children[0]).empty();
			if(this.logo.constructor.name == 'String'){
				$(b.$el.children[0].children[0].children[0]).text(this.logo);
			}else{
				$(b.$el.children[0].children[0].children[0]).append(this.logo.$mount().$el);
			}
			return this;
		},
		generateMenuD(){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(b.$el.children[0].children[0].children[2]).empty();

			for(let i in this.menuD){
				//aca se resuelve menu desktop
				if(this.menuD[i].constructor.name == 'Array'){
					for (var name in this.menuD[i]) {
						var current = this.menuD[i][name];
						var li = new this.$options.components['c-li']().$mount();
						var a = new this.$options.components['c-a']().$mount().setHref(current).setText(name);
						$(a.$el).attr("class", "");
						li.create(a);
					}
					$(b.$el.children[0].children[0].children[2]).append(li.$el);
				}else{
					$(b.$el.children[0].children[0].children[2]).append(this.menuM[i].$mount().$el);
				}
			}	
			return this;
		},
		generateMenuM(){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(b.$el.children[1]).empty();
			
			for(let i in this.menuM){
				//aca se resuelve menu desktop
				if(this.menuM[i].constructor.name == 'Array'){
					for (var name in this.menuM[i]) {
						var current = this.menuM[i][name];
						var li = new this.$options.components['c-li']().$mount();
						var a = new this.$options.components['c-a']().$mount().setHref(current).setText(name);
						$(a.$el).attr("class", "");
						li.create(a);
					}
					$(b.$el.children[1]).append(li.$el);
				}else{
					$(b.$el.children[1]).append(this.menuM[i].$mount().$el);
				}
			}	
			return this;
		},
		addMenu(arg){
			this.menuD.push(arg);
			this.menuM.push(arg);
			this.generateMenuD();
			this.generateMenuM();
			return this;
		},
		addMenuD(arg){
			this.menuD.push(arg);
			this.generateMenuD();
			return this;
		},
		addMenuM(arg){
			this.menuM.push(arg);
			this.generateMenuM();
			return this;
		},
		clearMenuD(){
			var b = this;
			this.menuD = new Array();
			$(b.$el.children[0].children[0].children[2]).empty();
			return this;
		},
		clearMenuM(){
			var b = this;
			this.menuM = new Array();
			$(b.$el.children[1]).empty();
			return this;
		},
		clearMenu(){
			var b = this;
			$(b.$el.children[1]).empty();
			$(b.$el.children[0].children[0].children[2]).empty();
			this.menuD = new Array();
			this.menuM = new Array();
			return this;
		},
		setClassMobile : function(){
			let setClass = new Array();
			//default class
			for(let i in this.$data){
				// i == 'truncate' && this.$data[i] ? setClass.push(i) : null;
				// i == 'cardpanel' && this.$data[i] ? setClass.push('card-panel') : null;

				i == 'colorM' ||
				i == 'colorTextM' 
				? setClass.push(this.$data[i])
				: null;
			}
			return setClass.join(" ").trim();
		},
		setClassMenu : function(){
			var out = null; 
			let aling = ["left", "center", "right"];
			if(this.alingLogo == 0){
				out = aling[2];
			}
			else if(this.alingLogo == 2){
				out = aling[0];
			}
			else if(this.alingLogo == 1){
				out = aling[0];
			}
			else if(this.alingLogo == 3){
				out = aling[2];
			}
			return out;
		},
		setClassLogo : function(){
			let aling = ["left", "center", "right", "center"];
			return aling[this.alingLogo];
		},
	},
	mounted : function () {
		this.$nextTick(function () {
			$('.sidenav').sidenav();
		})
	},
	components : {
		[this.name] : navbar,
		[li.name] : li,
		[a.name] : a,
	}
}); 
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
			if (this.binaryCompare(arg, 'indeterminate') || arg === 0){
				this.mode = "indeterminate";
			}
			else if (this.binaryCompare(arg, 'determinate') || arg === 1){
				this.mode = "determinate";
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
var dropdown = new configComponent({
	name : "c-dropdown",
	data : function(){
		return {
			show : this.pshow,
			row : this.prow,
			/*data c-a*/
			acolor : this.pacolor,
			acolorText : this.pacolorText,
			atext : this.patext,
			afloat : this.pafloat,
			ashadow : this.pashadow,
			atruncate : this.patruncate,
			acardpanel : this.pacardpanel,
			ahoverable : this.pahoverable,
			acontainer : this.pacontainer,
			avalign : this.pavalign,
			awave : this.pawave,
			asize : this.pasize,
			ahref : this.pahref,
			ashow : this.pashow,
			adisable : this.padisable,
			aflat : this.paflat,
			afloating : this.pafloating,
			/*data c-ul*/
			ultext : this.pultext,
			ulcolor : this.pulcolor,
			ulcolorText : this.pulcolorText,
			ultextAling : this.pultextAling,
			ulfloat : this.pulfloat,
			ulshadow : this.pulshadow,
			ultruncate : this.pultruncate,
			ulcardpanel : this.pulcardpanel,
			ulhoverable : this.pulhoverable,
			ulcontainer : this.pulcontainer,
			ulvalign : this.pulvalign,
			ulshow : this.pulshow,
			ulflowText : this.pulflowText,
			ulpadingl : this.pulppadingl,
		}
	},
	props : {
		pshow  : {
			type : Boolean,
			required : false, 
			default : true,
		},
		prow  : {
			type : Array,
			required : false, 
			default : function () { return new Array() },
		}, 	
		/*props c-a*/
		pacolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pacolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		patext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pafloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pashadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		patruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pacardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pahoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pacontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pavalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pawave  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pasize  : {
			type : String,
			required : false, 
			default : "btn-small",
		}, 
		pahref  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pashow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		padisable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		paflat  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pafloating  : {
			type : Boolean,
			required : false, 
			default : false,
		},
		/*props c-ul*/
		pultext  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pulcolor  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pulcolorText  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pultextAling  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pulfloat  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pulshadow  : {
			type : String,
			required : false, 
			default : null,
		}, 
		pultruncate  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pulcardpanel  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pulhoverable  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pulcontainer  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pulvalign  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 
		pulshow  : {
			type : Boolean,
			required : false, 
			default : true,
		}, 
		pulflowText  : {
			type : Boolean,
			required : false, 
			default : false,
		}, 		
		pulpadingl  : {
			type : String,
			required : false, 
			default : null,
		}

	},
	template :
	'<transition name="fade">\
	<div v-bind:id="this.generateId(5)" v-show="this.show"></div>\
	</transition>',
	methods : {
		generateDropdown : function (){
			var b = this;
			if(!b.$el){
				b.$mount();
			}
			$(b.$el).empty();
			var ul = this.newComponent("c-ul").setText(this.ultext).setColor(this.ulcolor).setColorText(this.ulcolorText).setTextAling(this.ultextAling).setFloat(this.ulfloat).setShadow(this.ulshadow).setTruncate(this.ultruncate).setCardpanel(this.ulcardpanel).setHoverable(this.ulhoverable).setContainer(this.ulcontainer).setValign(this.ulvalign).setShow(this.ulshow).setFlowText(this.ulflowText).setPadingl(this.ulpadingl).$mount();
			$(ul.$el).addClass("dropdown-content");
			var a = this.newComponent("c-a").setColor(this.acolor).setColorText(this.acolorText).setText(this.atext).setFloat(this.afloat).setShadow(this.ashadow).setTruncate(this.atruncate).setCardpanel(this.acardpanel).setHoverable(this.ahoverable).setContainer(this.acontainer).setValign(this.avalign).setWave(this.awave).setSize(this.asize).setHref(this.ahref).setShow(this.ashow).setDisable(this.adisable).setFlat(this.aflat).setFloating(this.afloating).$mount();
			$(a.$el).addClass("dropdown-trigger");
			$(a.$el).attr('data-target', ul.$el.id);
			$(b.$el).append(a.$el);
			$(b.$el).append(ul.$el);
			for(var x in this.row){
				var currentRow = this.row[x];
				var li = this.newComponent("c-li").$mount();
				if (currentRow.constructor.name === "String"){
					$(li.$el).text(currentRow);
					$(b.$el.children[1]).append(li.$el);
				}else{

					$(b.$el.children[1]).append(li.$el);
					$(li.$el).append(currentRow.$mount().$el);
				}
			}
			$('.dropdown-trigger').dropdown();
			return this;
		},
		addRow : function(arg){
			this.row.push(arg);
			this.generateDropdown();
			return this;
		},
		clearRow : function(arg){
			this.row = new Array();
			this.generateDropdown();
			return this;
		},
	},
	mounted : function () {
		this.$nextTick(function () {
			this.generateDropdown();
		});
	},
	components : {
		[this.name] : dropdown,
		[ul.name] : ul,
		[li.name] : li,
		[a.name] : a
	}	
});