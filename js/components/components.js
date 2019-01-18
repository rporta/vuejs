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
		setClass : function(){
			var truncate = "truncate";
			var cardpanel = "card-panel";
			var hoverable = "hoverable";
			var valign = "valign-wrapper";
			return new Array(this.color, this.colorText, this.textAling, this.float, this.shadow, this.truncate ? truncate : "", this.cardpanel ? cardpanel : "", this.hoverable ? hoverable : "", this.valign ? valign : "" ).join(" ");
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