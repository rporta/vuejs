var app = new Vue({
	el: '#app',
	data: {
		'colorFull' : colorsFull,
		'color' : colors,
		'colorHexa' : colorsHexa,
		'colorText' : colorsText,
		'float' : float,		
		'textAling' : textAling,
		'edge' : edge,
		'shadow' : shadow,
		'transitions' : transitions,
		'sizeButton' : sizeButton,
		'sizeIcon' : sizeIcon,
		'sizeCard' : sizeCard,
		'sizePreloader' : sizePreloader,
		'waves' : waves
	},
	components: {
		/*components-preloader*/
		[preloader.name] : preloader,
		[preloaderCircle.name] : preloaderCircle,
		/*components-modal*/
		[modal.name] : modal,
		/*components-containers*/
		[section.name] : section,
		[container.name] : container,
		[div.name] : div,
		[row.name] : row,
		[col.name] : col,
		[header.name] : header,
		[main.name] : main,
		[footer.name] : footer,
		[form.name] : form,
		/*components-text*/
		[h.name] : h,
		[p.name] : p,
		[span.name] : span,
		[pre.name] : pre,
		[icon.name] : icon,
		[blockquotes.name] : blockquotes,
		[badge.name] : badge,
		/*components-\n*/
		[br.name] : br,
		[divider.name] : divider,		
		/*components-media*/
		[img.name] : img,
		/*components-table*/
		[table.name] : table,
		/*components-collections*/
		[collection.name] : collection,
		[collapsible.name] : collapsible,
		/*components-button*/
		[button.name] : button,
		[a.name] : a,
		[dropdown.name] : dropdown,
		/*components-input*/
		[inputFields.name] : inputFields,
		[inputTextarea.name] : inputTextarea,
		[inputSwitch.name] : inputSwitch,
		[inputCheckbox.name] : inputCheckbox,
		[inputRadio.name] : inputRadio,
		/*quedan 8 components-input pendientes */
		/*macro-components-preloader*/
		[preloaderFull.name] : preloaderFull,
		[preloaderCircleFull.name] : preloaderCircleFull
	},
	methods:{
		create : function(element){
			return this.$el.append(element.$mount().$el);
		},
		newComponent : function(component){
			return new this.$options.components[component]();
		},
		generateId: function(length){
			var id = "";
			var char_list = 
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i=0; i < length; i++ ){  
				id += char_list.charAt(Math.floor(Math.random() * char_list.length));
			}
			return '-' + id;
		},
		setColor : function(arg){
			$('body').toggleClass(arg);
			return this;
		},
		generateColor : function(arg = 0){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			var out;
			if(arg > 0){
				out = new Array();
				for (var i = 0; i < arg; i++) {
					out.push(((c) => { return this.color[c][Math.floor(Math.random() * this.color[c].length)]})(color[Math.floor(Math.random() * color.length)]));
				}
				return out ;
			}else{
				out = ((c) => { return this.color[c][Math.floor(Math.random() * this.color[c].length)]})(color[Math.floor(Math.random() * color.length)]);
			}
			return out;
		},
		generateColorText : function(arg = 0){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			if(arg > 0){
				out = new Array();
				for (var i = 0; i < arg; i++) {
					out.push(((c) => { return this.colorText[c][Math.floor(Math.random() * this.colorText[c].length)]})(color[Math.floor(Math.random() * color.length)]));
				}
				return out;
			}else{
				out = ((c) => { return this.colorText[c][Math.floor(Math.random() * this.colorText[c].length)]})(color[Math.floor(Math.random() * color.length)]);
			}
			return out;
		},
		generateColorHexa : function(arg = 0){
			var color = new Array("red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "bwt");
			if(arg > 0){
				out = new Array();
				for (var i = 0; i < arg; i++) {
					out.push(((c) => { return this.colorHexa[c][Math.floor(Math.random() * this.colorHexa[c].length)]})(color[Math.floor(Math.random() * color.length)]));
				}
				return out;
			}else{
				out = ((c) => { return this.colorHexa[c][Math.floor(Math.random() * this.colorHexa[c].length)]})(color[Math.floor(Math.random() * color.length)]);
			}
			return out;
		}
	}
});

