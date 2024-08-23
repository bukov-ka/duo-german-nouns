(()=>{"use strict";function t(){return t=this,n=void 0,r=function(){return function(t,n){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(u=0)),u;)try{if(e=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return u.label++,{value:c[1],done:!1};case 5:u.label++,r=c[1],c=[0];continue;case 7:c=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){u=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){u.label=c[1];break}if(6===c[0]&&u.label<o[1]){u.label=o[1],o=c;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(c);break}o[2]&&u.ops.pop(),u.trys.pop();continue}c=n.call(t,u)}catch(t){c=[6,t],r=0}finally{e=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}}(this,(function(t){switch(t.label){case 0:return[4,fetch("./german_nouns_with_gender_and_plural.json")];case 1:return[4,t.sent().json()];case 2:return[2,t.sent().map((function(t){return{word:t[0],gender:t[1],plural:t[2]}})).filter((function(t){return["n","m","f"].includes(t.gender)}))]}}))},new((e=void 0)||(e=Promise))((function(o,i){function u(t){try{s(r.next(t))}catch(t){i(t)}}function c(t){try{s(r.throw(t))}catch(t){i(t)}}function s(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,c)}s((r=r.apply(t,n||[])).next())}));var t,n,e,r}var n=function(){function n(t,n,e,r,o,i){this.wordElement=t,this.derButton=n,this.dieButton=e,this.dasButton=r,this.feedbackElement=o,this.continueButton=i,this.nouns=[],this.currentNoun=null,this.initialize()}return n.prototype.initialize=function(){return n=this,e=void 0,o=function(){var n;return function(t,n){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(u=0)),u;)try{if(e=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return u.label++,{value:c[1],done:!1};case 5:u.label++,r=c[1],c=[0];continue;case 7:c=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){u=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){u.label=c[1];break}if(6===c[0]&&u.label<o[1]){u.label=o[1],o=c;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(c);break}o[2]&&u.ops.pop(),u.trys.pop();continue}c=n.call(t,u)}catch(t){c=[6,t],r=0}finally{e=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}}(this,(function(e){switch(e.label){case 0:return n=this,[4,t()];case 1:return n.nouns=e.sent(),this.setupEventListeners(),this.nextWord(),[2]}}))},new((r=void 0)||(r=Promise))((function(t,i){function u(t){try{s(o.next(t))}catch(t){i(t)}}function c(t){try{s(o.throw(t))}catch(t){i(t)}}function s(n){var e;n.done?t(n.value):(e=n.value,e instanceof r?e:new r((function(t){t(e)}))).then(u,c)}s((o=o.apply(n,e||[])).next())}));var n,e,r,o},n.prototype.setupEventListeners=function(){var t=this;this.derButton.addEventListener("click",(function(){return t.checkAnswer("m")})),this.dieButton.addEventListener("click",(function(){return t.checkAnswer("f")})),this.dasButton.addEventListener("click",(function(){return t.checkAnswer("n")})),this.continueButton.addEventListener("click",(function(){return t.nextWord()}))},n.prototype.nextWord=function(){this.currentNoun=this.nouns[Math.floor(Math.random()*this.nouns.length)],this.wordElement.textContent=this.currentNoun.word,this.feedbackElement.textContent="",this.continueButton.style.display="none",this.resetButtons()},n.prototype.checkAnswer=function(t){if(this.currentNoun){var n=t===this.currentNoun.gender,e=this.getButtonForGender(t),r=this.getButtonForGender(this.currentNoun.gender);e.style.backgroundColor=n?"green":"red",r.style.backgroundColor="green",this.feedbackElement.textContent=n?"Correct!":"Incorrect. Try again!",this.continueButton.style.display="inline-block"}},n.prototype.getButtonForGender=function(t){switch(t){case"m":return this.derButton;case"f":return this.dieButton;case"n":return this.dasButton}},n.prototype.resetButtons=function(){[this.derButton,this.dieButton,this.dasButton].forEach((function(t){t.style.backgroundColor=""}))},n}();document.addEventListener("DOMContentLoaded",(function(){new n(document.getElementById("word"),document.getElementById("der"),document.getElementById("die"),document.getElementById("das"),document.getElementById("feedback"),document.getElementById("continue"))}))})();