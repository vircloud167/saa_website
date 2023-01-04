/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.7.13 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2018, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
// Modified by OZ -> https://github.com/noelboss/featherlight/issues/317
!function(u){"use strict";if(void 0!==u)if(u.fn.jquery.match(/-ajax/))"console"in window&&window.console.info("Featherlight needs regular jQuery, not the slim version.");else{var r=[],i=function(t){return r=u.grep(r,function(e){return e!==t&&0<e.$instance.closest("body").length})},o={allow:1,allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,mozallowfullscreen:1,name:1,referrerpolicy:1,sandbox:1,scrolling:1,src:1,srcdoc:1,style:1,webkitallowfullscreen:1,width:1},n={keyup:"onKeyUp",resize:"onResize"},a=function(e){u.each(c.opened().reverse(),function(){if(!e.isDefaultPrevented()&&!1===this[n[e.type]](e))return e.preventDefault(),e.stopPropagation(),!1})},s=function(e){if(e!==c._globalHandlerInstalled){c._globalHandlerInstalled=e;var t=u.map(n,function(e,t){return t+"."+c.prototype.namespace}).join(" ");u(window)[e?"on":"off"](t,a)}};c.prototype={constructor:c,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:u.noop,beforeContent:u.noop,beforeClose:u.noop,afterOpen:u.noop,afterContent:u.noop,afterClose:u.noop,onKeyUp:u.noop,onResize:u.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(e,t){"object"!=typeof e||e instanceof u!=!1||t||(t=e,e=void 0);var n=u.extend(this,t,{target:e}),r=n.resetCss?n.namespace+"-reset":n.namespace,i=u(n.background||['<div class="'+r+"-loading "+r+'">','<div class="'+r+'-content">','<button class="'+r+"-close-icon "+n.namespace+'-close" aria-label="Close">',n.closeIcon,"</button>",'<div class="'+n.namespace+'-inner">'+n.loading+"</div>","</div>","</div>"].join("")),o="."+n.namespace+"-close"+(n.otherClose?","+n.otherClose:"");return n.$instance=i.clone().addClass(n.variant),n.$instance.on(n.closeTrigger+"."+n.namespace,function(e){if(!e.isDefaultPrevented()){var t=u(e.target);("background"===n.closeOnClick&&t.is("."+n.namespace)||"anywhere"===n.closeOnClick||t.closest(o).length)&&(n.close(e),e.preventDefault())}}),this},getContent:function(){if(!1!==this.persist&&this.$content)return this.$content;var t=this,e=this.constructor.contentFilters,n=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},r=n(t.targetAttr),i=t.target||r||"",o=e[t.type];if(!o&&i in e&&(o=e[i],i=t.target&&r),i=i||n("href")||"",!o)for(var a in e)t[a]&&(o=e[a],i=t[a]);if(!o){var s=i;if(i=null,u.each(t.contentFilters,function(){return(o=e[this]).test&&(i=o.test(s)),!i&&o.regex&&s.match&&s.match(o.regex)&&(i=s),!i}),!i)return"console"in window&&window.console.error("Featherlight: no content filter found "+(s?' for "'+s+'"':" (no target specified)")),!1}return o.process.call(t,i)},setContent:function(e){return this.$instance.removeClass(this.namespace+"-loading"),this.$instance.toggleClass(this.namespace+"-iframe",e.is("iframe")),this.$instance.find("."+this.namespace+"-inner").not(e).slice(1).remove().end().replaceWith(u.contains(this.$instance[0],e[0])?"":e),this.$content=e.addClass(this.namespace+"-inner"),this},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||!1===n.beforeOpen(t))){t&&t.preventDefault();var e=n.getContent();if(e)return r.push(n),s(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),u.when(e).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),u.Deferred().reject().promise()},close:function(e){var t=this,n=u.Deferred();return!1===t.beforeClose(e)?n.reject():(0===i(t).length&&s(!1),t.$instance.fadeOut(t.closeSpeed,function(){t.$instance.detach(),t.afterClose(e),n.resolve()})),n.promise()},resize:function(e,t){if(e&&t&&(this.$content.css("width","").css("height",""),this.$content.parent().width()<e||this.$content.parent().height()<t)){var n=Math.max(e/(this.$content.parent().width()-1),t/(this.$content.parent().height()-1));1<n&&(n=t/Math.floor(t/n),this.$content.css("width",e/n+"px").css("height",t/n+"px"))}},chainCallbacks:function(e){for(var t in e)this[t]=u.proxy(e[t],this,u.proxy(this[t],this))}},u.extend(c,{id:0,autoBind:"[data-featherlight]",defaults:c.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(e){return e instanceof u&&e},process:function(e){return!1!==this.persist?u(e):u(e).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,process:function(e){var t=u.Deferred(),n=new Image,r=u('<img src="'+e+'" alt="" class="'+this.namespace+'-image" />');return n.onload=function(){r.naturalWidth=n.width,r.naturalHeight=n.height,t.resolve(r)},n.onerror=function(){t.reject(r)},n.src=e,t.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(e){return u(e)}},ajax:{regex:/./,process:function(e){var n=u.Deferred(),r=u("<div></div>").load(e,function(e,t){"error"!==t&&n.resolve(r.contents()),n.fail()});return n.promise()}},iframe:{process:function(e){var t=new u.Deferred,n=u("<iframe/>"),r=function(e,t){var n={},r=new RegExp("^"+t+"([A-Z])(.*)");for(var i in e){var o=i.match(r);o&&(n[(o[1]+o[2].replace(/([A-Z])/g,"-$1")).toLowerCase()]=e[i])}return n}(this,"iframe"),i=function(e,t){var n={};for(var r in e)r in t&&(n[r]=e[r],delete e[r]);return n}(r,o);return n.hide().attr("src",e).attr(i).css(r).on("load",function(){t.resolve(n.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),t.promise()}},text:{process:function(e){return u("<div>",{text:e})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(e,t){var r=this,i=new RegExp("^data-"+t+"-(.*)"),o={};return e&&e.attributes&&u.each(e.attributes,function(){var e=this.name.match(i);if(e){var t=this.value,n=u.camelCase(e[1]);if(0<=u.inArray(n,r.functionAttributes))t=new Function(t);else try{t=JSON.parse(t)}catch(e){}o[n]=t}}),o},extend:function(e,t){var n=function(){this.constructor=e};return n.prototype=this.prototype,e.prototype=new n,e.__super__=this.prototype,u.extend(e,this,t),e.defaults=e.prototype,e},attach:function(i,o,a){var s=this;"object"!=typeof o||o instanceof u!=!1||a||(a=o,o=void 0);var c,e=(a=u.extend({},a)).namespace||s.defaults.namespace,l=u.extend({},s.defaults,s.readElementConfig(i[0],e),a),t=function(e){var t=u(e.currentTarget),n=u.extend({$source:i,$currentTarget:t},s.readElementConfig(i[0],l.namespace),s.readElementConfig(e.currentTarget,l.namespace),a),r=c||t.data("featherlight-persisted")||new s(o,n);"shared"===r.persist?c=r:!1!==r.persist&&t.data("featherlight-persisted",r),n.$currentTarget.blur&&n.$currentTarget.blur(),r.open(e)};return i.on(l.openTrigger+"."+l.namespace,l.filter,t),{filter:l.filter,handler:t}},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return i(),u.grep(r,function(e){return e instanceof t})},close:function(e){var t=this.current();if(t)return t.close(e)},_onReady:function(){var r=this;if(r.autoBind){var i=u(r.autoBind);i.each(function(){r.attach(u(this))}),u(document).on("click",r.autoBind,function(e){if(!e.isDefaultPrevented()){var t=u(e.currentTarget);if(i.length!==(i=i.add(t)).length){var n=r.attach(t);(!n.filter||0<u(e.target).parentsUntil(t,n.filter).length)&&n.handler(e)}}})}},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&u.featherlight.close(t),!1):e(t)},beforeOpen:function(e,t){return u(document.documentElement).addClass("with-featherlight"),this._previouslyActive=document.activeElement,this._$previouslyTabbable=u("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=u("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(e,t){return u(t).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur&&document.activeElement.blur(),e(t)},afterClose:function(e,t){var n=e(t),r=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(e,t){u(t).attr("tabindex",r._previousWithTabIndices[e])}),this._previouslyActive.focus(),0===c.opened().length&&u(document.documentElement).removeClass("with-featherlight"),n},onResize:function(e,t){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),e(t)},afterContent:function(e,t){var n=e(t);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(t),n}}}),u.featherlight=c,u.fn.featherlight=function(e,t){return c.attach(this,e,t),this},u(document).ready(function(){c._onReady()})}else"console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery.");function c(e,t){if(!(this instanceof c)){var n=new c(e,t);return n.open(),n}this.id=c.id++,this.setup(e,t),this.chainCallbacks(c._callbackChain)}}(jQuery);