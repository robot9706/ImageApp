(this["webpackJsonpimage-app"]=this["webpackJsonpimage-app"]||[]).push([[0],{112:function(t,e,n){},135:function(t,e,n){"use strict";n.r(e);var r=n(3),i=n(0),a=n.n(i),o=n(12),c=n.n(o),s=(n(112),n(18)),A=n(19),u=n(21),l=n(20),h=n(8),d=n(23),f=n(48),j="ACTION_SHOW",g="ACTION_HIDE",b={visible:!1,entry:void 0},C="ACTION_LOGIN",v="ACTION_LOGOUT",O={name:null,token:null,admin:!1},p=Object(f.b)({user:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case C:return{name:e.data.name,token:e.data.token,admin:e.data.admin};case v:return{name:null,token:null,admin:!1};default:return t}},imageDialog:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case j:return{visible:!0,entry:e.data.entry};case g:return{visible:!1,entry:void 0};default:return t}}}),x=Object(f.c)(p),m=n(35),y=n(185),B=n(9),Q=n(172),k=n(173),E=n(97),w=n(174),I=n(93),D=n.n(I);function P(){var t=Object(h.a)(["{\n    flex: 0 0 auto;\n}"]);return P=function(){return t},t}function S(){var t=Object(h.a)(["{\n    cursor: pointer;\n}"]);return S=function(){return t},t}function Y(){var t=Object(h.a)(["{\n    margin-right: 1rem;\n}"]);return Y=function(){return t},t}function J(){var t=Object(h.a)(["{\n    cursor: pointer;\n    margin-left: 0.5rem;\n}"]);return J=function(){return t},t}function M(){var t=Object(h.a)(["{\n    display: flex;\n    align-items: center;\n}"]);return M=function(){return t},t}var L=B.a.div(M()),G=B.a.div(J()),F=B.a.div(Y()),H=Object(B.a)(E.a)(S()),z=B.a.div(P()),K=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){return Object(s.a)(this,n),e.call(this,t)}return Object(A.a)(n,[{key:"handleAdminMenu",value:function(){ke.push("/admin")}},{key:"handleLogout",value:function(){this.props.logout(),ke.push("/")}},{key:"render",value:function(){return Object(r.jsx)(z,{children:Object(r.jsx)(Q.a,{position:"static",children:Object(r.jsxs)(k.a,{children:[Object(r.jsx)(H,{variant:"h6",style:{flexGrow:1},onClick:function(){ke.push("/")},children:"Image App"}),this.props.isLoggedIn?Object(r.jsxs)(L,{children:[this.props.isAdmin?Object(r.jsx)(F,{children:Object(r.jsx)(w.a,{variant:"contained",onClick:this.handleAdminMenu.bind(this),children:"Admin"})}):null,Object(r.jsx)(E.a,{variant:"h6",children:this.props.username}),Object(r.jsx)(G,{onClick:this.handleLogout.bind(this),children:Object(r.jsx)(D.a,{})})]}):null]})})})}}]),n}(a.a.Component),T=Object(d.b)((function(t){return{isLoggedIn:null!==t.user.token,username:t.user.name,isAdmin:t.user.admin}}),(function(t){return{logout:function(){t({type:v})}}}))(K),U=n(175),W=n(136),N=n(186),R=n(70),X=n.n(R),Z=function(t){return{ok:!1}},V=function(t){return{ok:!0,headers:t.headers}},q=function(t){return{ok:200==t.status}},_=function(t){return{ok:!0,data:t.data}},$=function(t){var e=x.getState().user.token;return null===e?null!==t?{headers:{authorization:t}}:{headers:{}}:{headers:{authorization:e}}},tt=function(t,e){return X.a.get(""+t,$(e))},et=function(t,e){return X.a.post(""+t,e,$())},nt=function(t){var e=x.getState().user.token;return"".concat("","/content/data?id=").concat(t.id,"&t=").concat(e)};function rt(){var t=Object(h.a)(["{\n    display: flex;\n    justify-content: center;\n}"]);return rt=function(){return t},t}function it(){var t=Object(h.a)(["{\n    cursor: pointer;\n    color: black;\n    text-align: center;\n    padding-top: 1rem;\n}"]);return it=function(){return t},t}function at(){var t=Object(h.a)(["{\n    width: 100%;\n    text-align: center;\n    color: red;\n}"]);return at=function(){return t},t}function ot(){var t=Object(h.a)(["{\n    display: flex;\n    flex-flow: row;\n    margin-top: 0.5rem;\n    padding-left: 0.5rem;\n    padding-right: 0.5rem;\n}"]);return ot=function(){return t},t}function ct(){var t=Object(h.a)(["{\n    display: flex;\n    width: 100%;\n    flex-flow: column;\n}"]);return ct=function(){return t},t}var st=B.a.div(ct()),At=B.a.div(ot()),ut=B.a.div(at()),lt=Object(B.a)(E.a)(it()),ht=B.a.div(rt()),dt=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(s.a)(this,n),(r=e.call(this,t)).state={loginMode:!0,errorText:"",loading:!1,inputUsername:"",inputPassword:""},r}return Object(A.a)(n,[{key:"toggleMode",value:function(){this.setState({loginMode:!this.state.loginMode})}},{key:"handleAction",value:function(){var t=this;this.state.loginMode?this.setState({errorText:"",loading:!0},(function(){var e;(e={username:t.state.inputUsername,password:t.state.inputPassword},et("/login",e).then(V).catch(Z)).then(function(e){var n;e.ok&&void 0!==e.headers.authorization?(n=e.headers.authorization,tt("/userInfo",n).then(_).catch(Z)).then(function(n){n.ok?t.setState({loading:!1,errorText:""},(function(){t.props.onLogin(n.data.name,e.headers.authorization,n.data.admin)})):t.setState({loading:!1,errorText:"Hib\xe1s adatok!"})}.bind(t)):t.setState({loading:!1,errorText:"Hib\xe1s adatok!"})}.bind(t))})):this.setState({errorText:"",loading:!0},(function(){var e;(e={username:t.state.inputUsername,password:t.state.inputPassword},et("/register",e).then(q).catch(Z)).then(function(e){null!==e.ok&&e.ok?t.setState({errorText:"",loading:!1,loginMode:!0}):t.setState({errorText:"Ilyen felhaszn\xe1l\xf3 m\xe1r l\xe9tezik!",loading:!1})}.bind(t))}))}},{key:"renderActions",value:function(){return this.state.loading?Object(r.jsx)(ht,{children:Object(r.jsx)(U.a,{})}):Object(r.jsxs)(a.a.Fragment,{children:[Object(r.jsx)(w.a,{style:{padding:"10px"},variant:"contained",color:"primary",onClick:this.handleAction.bind(this),children:this.state.loginMode?"Bejelentkez\xe9s":"Regisztr\xe1ci\xf3"}),Object(r.jsx)(lt,{variant:"body2",onClick:this.toggleMode.bind(this),children:Object(r.jsx)("u",{children:this.state.loginMode?"Nincs felhaszn\xe1l\xf3m":"M\xe1r van felhaszn\xe1l\xf3m"})})]})}},{key:"render",value:function(){var t=this;return Object(r.jsxs)(W.a,{elevation:3,style:{width:"400px",padding:"20px"},children:[Object(r.jsx)(E.a,{variant:"h5",style:{textAlign:"center"},children:this.state.loginMode?"Bejelentkez\xe9s":"Regisztr\xe1ci\xf3"}),Object(r.jsxs)(st,{children:[Object(r.jsx)(At,{children:Object(r.jsx)(N.a,{id:"username",fullWidth:!0,label:"Felhaszn\xe1l\xf3n\xe9v",value:this.state.inputUsername,onChange:function(e){return t.setState({inputUsername:e.target.value})}})}),Object(r.jsx)(At,{children:Object(r.jsx)(N.a,{id:"password",type:"password",fullWidth:!0,label:"Jelsz\xf3",value:this.state.inputPassword,onChange:function(e){return t.setState({inputPassword:e.target.value})}})}),Object(r.jsx)(At,{style:{marginTop:"20px"},children:Object(r.jsx)(ut,{children:Object(r.jsx)(E.a,{children:this.state.errorText})})}),Object(r.jsx)(At,{style:{marginTop:"20px",display:"flex",justifyContent:"center",flexFlow:"column"},children:this.renderActions()})]})]})}}]),n}(a.a.Component),ft=Object(d.b)((function(t){return{}}),(function(t){return{onLogin:function(e,n,r){t(function(t,e,n){return{type:C,data:{name:t,token:e,admin:n}}}(e,n,r))}}}))(dt),jt=n(73),gt=n(181),bt=n(99),Ct=n(191),vt=n(95),Ot=n.n(vt),pt=n(94),xt=n.n(pt),mt=n(96),yt=n.n(mt),Bt=n(190),Qt=n(177),kt=n(178),Et=n(179),wt=n(180);function It(){var t=Object(h.a)(["{\n    display: flex;\n    width: 100%;\n    justify-content: center;\n    align-items: center;\n}"]);return It=function(){return t},t}var Dt=B.a.div(It()),Pt=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(s.a)(this,n),(r=e.call(this,t)).inputFileRef=void 0,r.state={open:!1,entryName:"",isDirectory:!1,parentID:""},r}return Object(A.a)(n,[{key:"doOpen",value:function(t){this.setState({open:!0,entryName:"",parentID:t})}},{key:"handleClose",value:function(){this.setState({open:!1})}},{key:"handleDone",value:function(){var t,e,n=this;if(this.state.isDirectory)(t=this.state.parentID,e=this.state.entryName,et("/admin/createDirectory",{parentId:t,name:e}).then(q).catch(Z)).then((function(t){t.ok&&n.setState({open:!1},(function(){n.props.onDone()}))}));else{var r=new FileReader;r.onload=function(t){(function(t,e,n,r){var i=new FormData;return i.append("file",new Blob([r]),n),et("/admin/createFile?parentId=".concat(encodeURIComponent(t),"&name=").concat(encodeURIComponent(e)),i).then(q).catch(Z)})(n.state.parentID,n.state.entryName,n.inputFileRef.files[0].name,t.target.result).then((function(t){t.ok&&n.setState({open:!1},(function(){n.props.onDone()}))}))},r.readAsArrayBuffer(this.inputFileRef.files[0])}}},{key:"handleFileChange",value:function(){if(this.inputFileRef.files.length>0&&0==this.state.entryName.length){var t=this.inputFileRef.files[0].name,e=t.lastIndexOf(".");e>0&&(t=t.substr(0,e)),this.setState({entryName:t})}}},{key:"render",value:function(){var t=this;return Object(r.jsxs)(Bt.a,{onClose:this.handleClose.bind(this),open:this.state.open,maxWidth:"md",children:[Object(r.jsxs)(Qt.a,{children:["\xdaj ",this.state.isDirectory?"mappa":"file"]}),Object(r.jsxs)(kt.a,{children:[Object(r.jsxs)(Dt,{children:[Object(r.jsx)(E.a,{children:"F\xe1jl"}),Object(r.jsx)(Et.a,{color:"primary",checked:this.state.isDirectory,onChange:function(e){return t.setState({isDirectory:e.target.checked})}}),Object(r.jsx)(E.a,{children:"Mappa"})]}),Object(r.jsx)(N.a,{autoFocus:!0,margin:"dense",id:"ename",type:"text",fullWidth:!0,label:"N\xe9v",value:this.state.entryName,onChange:function(e){return t.setState({entryName:e.target.value})}}),this.state.isDirectory?null:Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("input",{ref:function(e){return t.inputFileRef=e},type:"file",name:"imageFile",id:"imageFile",onChange:this.handleFileChange.bind(this)})})]}),Object(r.jsxs)(wt.a,{children:[Object(r.jsx)(w.a,{onClick:this.handleClose.bind(this),color:"primary",children:"M\xe9gse"}),Object(r.jsx)(w.a,{onClick:this.handleDone.bind(this),color:"primary",disabled:0==this.state.entryName.length,children:"L\xe9trehoz\xe1s"})]})]})}}]),n}(a.a.Component);function St(){var t=Object(h.a)(["{\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    margin: 1rem;\n}"]);return St=function(){return t},t}function Yt(){var t=Object(h.a)(["{\n    cursor: pointer;\n}"]);return Yt=function(){return t},t}function Jt(){var t=Object(h.a)(["{\n    flex: 1 1 auto;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n}"]);return Jt=function(){return t},t}function Mt(){var t=Object(h.a)(["{\n    flex: 0 0 auto;\n}"]);return Mt=function(){return t},t}function Lt(){var t=Object(h.a)(["{\n    width: 256px;\n    height: 256px;\n    border: 1px solid black;\n    display: flex;\n    flex-direction: column;\n    cursor: pointer;\n    position: relative;\n}"]);return Lt=function(){return t},t}function Gt(){var t=Object(h.a)(["{\n    display: flex;\n    flex-wrap: wrap;\n}"]);return Gt=function(){return t},t}function Ft(){var t=Object(h.a)(["{\n    flex: 0 0 auto;\n    padding: 0.5rem;\n    display: flex;\n    align-items: center;\n}"]);return Ft=function(){return t},t}function Ht(){var t=Object(h.a)(["{\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-flow: column;\n}"]);return Ht=function(){return t},t}var zt=B.a.div(Ht()),Kt=B.a.div(Ft()),Tt=B.a.div(Gt()),Ut=B.a.div(Lt()),Wt=B.a.img(Mt()),Nt=B.a.div(Jt()),Rt=Object(B.a)(E.a)(Yt()),Xt=B.a.div(St()),Zt=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(s.a)(this,n),(r=e.call(this,t)).newEntryRef=void 0,r.state={currentID:"",entries:[],history:[],hoverEntry:-1},r}return Object(A.a)(n,[{key:"componentWillMount",value:function(){this.fetchContent()}},{key:"handleEntryClick",value:function(t){var e=this;if(t.directory){var n=this.state.history;n.push(t),this.setState({currentID:t.id,history:n},(function(){e.fetchContent()}))}else this.props.showImageDialog(t)}},{key:"fetchContent",value:function(){var t=this;(function(t){var e=null==t?"":"?pid=".concat(encodeURIComponent(t));return tt("/content/byParentId".concat(e)).then(_).catch(Z)})(this.state.currentID).then((function(e){if(e.ok){var n=function(t,e){return t.name<e.name?-1:t.name>e.name?1:0},r=e.data;t.setState({entries:[].concat(Object(jt.a)(r.filter((function(t){return t.directory})).sort(n)),Object(jt.a)(r.filter((function(t){return!t.directory})).sort(n))),hoverEntry:-1})}}))}},{key:"handleRootClick",value:function(){var t=this;this.setState({history:[],currentID:""},(function(){t.fetchContent()}))}},{key:"handleHistoryClick",value:function(t){var e=this,n=this.state.history.indexOf(t),r=this.state.history;r.splice(n+1),this.setState({history:r,currentID:r[r.length-1].id,hoverEntry:-1},(function(){e.fetchContent()}))}},{key:"handleOneUp",value:function(){var t=this,e=this.state.history;e.pop(),this.setState({history:e,currentID:e.length>0?e[e.length-1].id:"",hoverEntry:-1},(function(){t.fetchContent()}))}},{key:"handleFab",value:function(){this.newEntryRef.doOpen(this.state.currentID)}},{key:"render",value:function(){var t=this;return Object(r.jsxs)(zt,{children:[Object(r.jsx)(Pt,{ref:function(e){return t.newEntryRef=e},onDone:function(){t.fetchContent()}.bind(this)}),this.props.isLoggedIn&&this.props.isAdmin?Object(r.jsx)(Xt,{children:Object(r.jsx)(gt.a,{color:"primary",onClick:this.handleFab.bind(this),children:Object(r.jsx)(xt.a,{})})}):null,Object(r.jsxs)(Kt,{children:[Object(r.jsx)(bt.a,{onClick:this.handleOneUp.bind(this),children:Object(r.jsx)(Ot.a,{})}),Object(r.jsxs)(Ct.a,{"aria-label":"breadcrumb",children:[Object(r.jsx)(Rt,{color:"textPrimary",onClick:this.handleRootClick.bind(this),children:"Root"}),";",this.state.history.map((function(e,n){return Object(r.jsx)(Rt,{color:"textPrimary",onClick:function(){t.handleHistoryClick(e)}.bind(t),children:e.name},n)})),Object(r.jsx)(E.a,{color:"textPrimary"})]})]}),Object(r.jsx)(Tt,{children:this.state.entries.map((function(e,n){return Object(r.jsxs)(Ut,{onClick:function(){t.handleEntryClick(e)}.bind(t),onMouseEnter:function(){t.setState({hoverEntry:n})}.bind(t),onMouseLeave:function(){t.setState({hoverEntry:-1})}.bind(t),children:[Object(r.jsx)(Wt,{src:e.directory?"data:image/png;base64,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":"data:image/png;base64,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"}),Object(r.jsx)(Nt,{children:Object(r.jsx)(E.a,{children:e.name})}),t.props.isLoggedIn&&t.props.isAdmin&&t.state.hoverEntry==n?Object(r.jsx)(Xt,{children:Object(r.jsx)(yt.a,{style:{opacity:.25,cursor:"pointer"},onClick:function(n){var r;n.preventDefault(),n.stopPropagation(),(r=e.id,tt("/admin/deleteEntry?entryId=".concat(encodeURIComponent(r))).then(q).catch(Z)).then((function(e){e.ok&&t.fetchContent()}))}.bind(t)})}):null]},n)}))})]})}}]),n}(a.a.Component),Vt=Object(d.b)((function(t){return{isLoggedIn:null!==t.user.token,isAdmin:t.user.admin}}),(function(t){return{showImageDialog:function(e){t(function(t){return{type:j,data:{entry:t}}}(e))}}}))(Zt);function qt(){var t=Object(h.a)(["{\n    flex: 1 1 auto;\n}"]);return qt=function(){return t},t}function _t(){var t=Object(h.a)(["{\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}"]);return _t=function(){return t},t}var $t=B.a.div(_t()),te=B.a.div(qt()),ee=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){return Object(s.a)(this,n),e.call(this,t)}return Object(A.a)(n,[{key:"render",value:function(){return this.props.isLoggedIn?Object(r.jsx)(te,{children:Object(r.jsx)(Vt,{})}):Object(r.jsx)($t,{children:Object(r.jsx)(ft,{})})}}]),n}(a.a.Component),ne=Object(d.b)((function(t){return{isLoggedIn:null!==t.user.token}}),(function(t){return{}}))(ee),re=n(192),ie=n(182),ae=n(183),oe=n(184),ce=n(189),se=n(193),Ae=n(187);function ue(){var t=Object(h.a)(["{\n    flex: 0 1 auto;\n}"]);return ue=function(){return t},t}function le(){var t=Object(h.a)(["{\n    flex: 1 1 auto;\n}"]);return le=function(){return t},t}function he(){var t=Object(h.a)(["{\n    display: flex;\n    width: 100%;\n}"]);return he=function(){return t},t}function de(){var t=Object(h.a)(["{\n    display: flex;\n    justify-content: center;\n}"]);return de=function(){return t},t}function fe(){var t=Object(h.a)(["{\n    min-width: 750px;\n}"]);return fe=function(){return t},t}function je(){var t=Object(h.a)(["{\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: center;\n    padding: 1rem;\n}"]);return je=function(){return t},t}var ge=B.a.div(je()),be=B.a.div(fe()),Ce=B.a.div(de()),ve=B.a.div(he()),Oe=B.a.div(le()),pe=B.a.div(ue()),xe=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(s.a)(this,n),(r=e.call(this,t)).state={loading:!1,extensions:[],users:[],changed:[],error:!1},r}return Object(A.a)(n,[{key:"refreshData",value:function(){var t=this;this.setState({loading:!0},(function(){tt("/admin/allExtensions").then(_).catch(Z).then((function(e){e.ok?tt("/admin/allUsers").then(_).catch(Z).then((function(n){n.ok?t.setState({loading:!1,extensions:e.data,users:n.data,changed:n.data.map((function(t){return!1}))}):ke.push("/")})):ke.push("/")}))}))}},{key:"componentWillMount",value:function(){this.props.isLoggedIn&&this.props.isAdmin?this.refreshData():ke.push("/")}},{key:"handleExtensionChange",value:function(t,e,n){var r=this.state.users[t];if(n&&!r.allowedExtensions.includes(e)&&r.allowedExtensions.push(e),!n&&r.allowedExtensions.includes(e)){var i=r.allowedExtensions.indexOf(e);r.allowedExtensions.splice(i,1)}var a=this.state.users;a[t]=r;var o=this.state.changed;o[t]=!0,this.setState({users:a,changed:o})}},{key:"handleSave",value:function(t){var e=this,n=this.state.changed;n[t]=!1,this.setState({changed:n},(function(){var r;(r=e.state.users[t],et("/admin/userModifyExt",r).then(q).catch(Z)).then((function(r){r.ok||(n[t]=!0,e.setState({error:!1,changed:n}))}))}))}},{key:"closeError",value:function(){this.setState({error:!1})}},{key:"renderList",value:function(){var t=this;return Object(r.jsx)(a.a.Fragment,{children:this.state.users.map((function(e,n){return Object(r.jsxs)(re.a,{children:[Object(r.jsx)(ie.a,{children:Object(r.jsx)(E.a,{children:e.name})}),Object(r.jsx)(ae.a,{children:Object(r.jsxs)(ve,{children:[Object(r.jsx)(Oe,{children:t.state.extensions.map((function(i){return Object(r.jsx)(oe.a,{control:Object(r.jsx)(ce.a,{checked:e.allowedExtensions.includes(i),onChange:function(e){t.handleExtensionChange(n,i,e.target.checked)}.bind(t)}),label:i.toUpperCase()},e.name+i)}))}),Object(r.jsx)(pe,{children:Object(r.jsx)(w.a,{variant:"contained",color:"primary",disabled:!t.state.changed[n],onClick:function(e){t.handleSave(n)}.bind(t),children:"Save"})})]})})]},e.name)}))})}},{key:"render",value:function(){return Object(r.jsxs)(ge,{children:[Object(r.jsxs)(be,{children:[Object(r.jsx)(Ce,{children:Object(r.jsx)(E.a,{variant:"h5",children:"Felhaszn\xe1l\xf3k kezel\xe9se"})}),this.state.loading?Object(r.jsx)(Ce,{children:Object(r.jsx)(U.a,{})}):this.renderList()]}),Object(r.jsx)(se.a,{open:this.state.error,autoHideDuration:3e3,onClose:this.closeError.bind(this),children:Object(r.jsx)(Ae.a,{elevation:6,variant:"filled",onClose:this.closeError.bind(this),severity:"error",children:"Hiba a ment\xe9s k\xf6zben!"})})]})}}]),n}(a.a.Component),me=Object(d.b)((function(t){return{isLoggedIn:null!==t.user.token,isAdmin:t.user.admin}}),(function(t){return{}}))(xe),ye=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){return Object(s.a)(this,n),e.call(this,t)}return Object(A.a)(n,[{key:"handleClose",value:function(){this.props.close()}},{key:"render",value:function(){var t;return Object(r.jsx)(Bt.a,{open:this.props.visible,onClose:this.handleClose.bind(this),children:null!=this.props.entry?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(Qt.a,{children:null===(t=this.props.entry)||void 0===t?void 0:t.name}),Object(r.jsx)("img",{src:nt(this.props.entry)})]}):null})}}]),n}(a.a.Component),Be=Object(d.b)((function(t){return{visible:t.imageDialog.visible,entry:t.imageDialog.entry}}),(function(t){return{close:function(){t({type:g})}}}))(ye);function Qe(){var t=Object(h.a)(["{\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-flow: column;\n}"]);return Qe=function(){return t},t}var ke=Object(m.a)(),Ee=function(){return Object(r.jsx)(y.a,{to:"/"})},we=B.a.div(Qe()),Ie=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){return Object(s.a)(this,n),e.call(this,t)}return Object(A.a)(n,[{key:"render",value:function(){return Object(r.jsx)(d.a,{store:x,children:Object(r.jsx)(we,{children:Object(r.jsxs)(y.c,{history:ke,children:[Object(r.jsx)(T,{}),Object(r.jsxs)(y.d,{children:[Object(r.jsx)(y.b,{exact:!0,path:"/",component:ne}),Object(r.jsx)(y.b,{exact:!0,path:"/admin",component:me}),Object(r.jsx)(y.b,{exact:!0,component:Ee})]}),Object(r.jsx)(Be,{})]})})})}}]),n}(a.a.Component),De=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),r(t),i(t),a(t),o(t)}))};c.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(Ie,{})}),document.getElementById("root")),De()}},[[135,1,2]]]);
//# sourceMappingURL=main.5d093f53.chunk.js.map