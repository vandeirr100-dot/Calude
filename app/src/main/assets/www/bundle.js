(()=>{var Au=0,vc=1,Ru=2;var Nr=1,Cu=2,As=3,vi=0,tn=1,nn=2,Oi=0,Rs=1,yc=2,Mc=3,Sc=4,Pu=5;var Bi=100,Iu=101,Lu=102,Nu=103,Du=104,Uu=200,Fu=201,Ou=202,Bu=203,bc=204,wc=205,ku=206,zu=207,Hu=208,Gu=209,Vu=210,Wu=211,Xu=212,qu=213,Yu=214,Ua=0,Fa=1,Oa=2,ds=3,Ba=4,ka=5,za=6,Ha=7,vo=0,$u=1,Zu=2,Un=0,Ec=1,Tc=2,Ac=3,Dr=4,Rc=5,Cc=6,Pc=7;var Ic=300,ki=301,Cs=302,yo=303,Mo=304,fs=1e3,Cn=1001,Ga=1002,zt=1003,Ju=1004;var Ur=1005;var jt=1006,So=1007;var Kn=1008;var sn=1009,Lc=1010,Nc=1011,Ps=1012,bo=1013,wn=1014,_n=1015,En=1016,wo=1017,Eo=1018,zi=1020,Dc=35902,Uc=35899,Fc=1021,Oc=1022,Tn=1023,$n=1026,jn=1027,To=1028,Ao=1029,yi=1030,Ro=1031;var Co=1033,Fr=33776,Or=33777,Br=33778,kr=33779,Po=35840,Io=35841,Lo=35842,No=35843,Do=36196,Uo=37492,Fo=37496,Oo=37488,Bo=37489,zr=37490,ko=37491,zo=37808,Ho=37809,Go=37810,Vo=37811,Wo=37812,Xo=37813,qo=37814,Yo=37815,$o=37816,Zo=37817,Jo=37818,Ko=37819,jo=37820,Qo=37821,el=36492,tl=36494,nl=36495,il=36283,sl=36284,Hr=36285,rl=36286;var tr=2300,Va=2301,Na=2302,lc=2303,cc=2400,hc=2401,uc=2402;var Ku=3200;var Gr=0,ju=1,Qn="",Bt="srgb",nr="srgb-linear",ir="linear",pt="srgb";var Da=7680;var Qu=519,ed=512,td=513,nd=514,Bc=515,id=516,sd=517,kc=518,zc=519,rd=35044;var Hc="300 es",mn=2e3,ps=2001;function Xf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ad(){let i=sr("canvas");return i.style.display="block",i}var Zh={},ms=null;function Gc(...i){let e="THREE."+i.shift();ms?ms("log",e,...i):console.log(e,...i)}function od(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=od(i);let e="THREE."+i.shift();if(ms)ms("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=od(i);let e="THREE."+i.shift();if(ms)ms("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ii(...i){let e=i.join(" ");e in Zh||(Zh[e]=!0,He(...i))}function ld(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var cd={[Ua]:Ua,[Oa]:za,[Ba]:Ba,[ds]:ka,[Fa]:Fa,[za]:Oa,[Ha]:Ha,[ka]:ds},Pn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jh=1234567,Ks=Math.PI/180,gs=180/Math.PI;function Hi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function Vc(i,e){return(i%e+e)%e}function Yf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function $f(i,e,t){return i!==e?(t-i)/(e-i):0}function js(i,e,t){return(1-t)*i+t*e}function Zf(i,e,t,n){return js(i,e,1-Math.exp(-t*n))}function Jf(i,e=1){return e-Math.abs(Vc(i,e*2)-e)}function Kf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function jf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Qf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ep(i,e){return i+Math.random()*(e-i)}function tp(i){return i*(.5-Math.random())}function np(i){i!==void 0&&(Jh=i);let e=Jh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ip(i){return i*Ks}function sp(i){return i*gs}function rp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ap(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function op(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function hd(i,e){if(e.constructor===Float32Array)return i;let t=Xc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function ud(i,e){if(e.constructor===Float32Array)return i;let t=Xc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var qc={DEG2RAD:Ks,RAD2DEG:gs,generateUUID:Hi,clamp:Ke,euclideanModulo:Vc,mapLinear:Yf,inverseLerp:$f,lerp:js,damp:Zf,pingpong:Jf,smoothstep:Kf,smootherstep:jf,randInt:Qf,randFloat:ep,randFloatSpread:tp,seededRandom:np,degToRad:ip,radToDeg:sp,isPowerOfTwo:rp,ceilPowerOfTwo:ap,floorPowerOfTwo:Wc,setQuaternionFromProperEuler:op,normalize:ud,denormalize:hd},jc=class jc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jc.prototype.isVector2=!0;var oe=jc,gn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],M=r[a+3];if(d!==M||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*M;m<0&&(u=-u,f=-f,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){let x=Math.acos(m),w=Math.sin(x);p=Math.sin(p*x)/w,o=Math.sin(o*x)/w,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+M*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+M*o;let x=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=x,c*=x,h*=x,d*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Qc=class Qc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return kl.copy(this).projectOnVector(e),this.sub(kl)}reflect(e){return this.sub(kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qc.prototype.isVector3=!0;var U=Qc,kl=new U,Kh=new gn,eh=class eh{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],M=s[0],m=s[3],p=s[6],x=s[1],w=s[4],y=s[7],A=s[2],E=s[5],_=s[8];return r[0]=a*M+o*x+l*A,r[3]=a*m+o*w+l*E,r[6]=a*p+o*y+l*_,r[1]=c*M+h*x+d*A,r[4]=c*m+h*w+d*E,r[7]=c*p+h*y+d*_,r[2]=u*M+f*x+g*A,r[5]=u*m+f*w+g*E,r[8]=u*p+f*y+g*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return e[0]=d*M,e[1]=(s*c-h*n)*M,e[2]=(o*n-s*a)*M,e[3]=u*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=f*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ii("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zl.makeScale(e,t)),this}rotate(e){return Ii("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zl.makeRotation(-e)),this}translate(e,t){return Ii("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};eh.prototype.isMatrix3=!0;var Xe=eh,zl=new Xe,jh=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qh=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lp(){let i={enabled:!0,workingColorSpace:nr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pt&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pt&&(s.r=us(s.r),s.g=us(s.g),s.b=us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qn?ir:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[nr]:{primaries:e,whitePoint:n,transfer:ir,toXYZ:jh,fromXYZ:Qh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:jh,fromXYZ:Qh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),i}var ot=lp();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ki,Wa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ki===void 0&&(Ki=sr("canvas")),Ki.width=e.width,Ki.height=e.height;let s=Ki.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ki}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},cp=0,_s=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Hl(s[a].image)):r.push(Hl(s[a]))}else r=Hl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Hl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var hp=0,Gl=new U,Qt=class i extends Pn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Cn,s=Cn,r=jt,a=Kn,o=Tn,l=sn,c=i.DEFAULT_ANISOTROPY,h=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=Hi(),this.name="",this.source=new _s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Gl).x}get height(){return this.source.getSize(Gl).y}get depth(){return this.source.getSize(Gl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fs:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fs:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Ic;Qt.DEFAULT_ANISOTROPY=1;var th=class th{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,y=(f+1)/2,A=(p+1)/2,E=(h+u)/4,_=(d+M)/4,S=(g+m)/4;return w>y&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=_/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=S/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=_/r,s=S/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-M)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};th.prototype.isVector4=!0;var bt=th,Xa=class extends Pn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Qt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new _s(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},cn=class extends Xa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},rr=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var qa=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var xo=class xo{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,M,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,M,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xo().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ji.setFromMatrixColumn(e,0).length(),r=1/ji.setFromMatrixColumn(e,1).length(),a=1/ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,M=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,M=c*d;t[0]=u+M*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,M=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+M,t[1]=l*d,t[5]=M*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=M-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-M*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+M,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(up,e,dp)}lookAt(e,t,n){let s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),oi.crossVectors(n,on),oi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),oi.crossVectors(n,on)),oi.normalize(),ha.crossVectors(on,oi),s[0]=oi.x,s[4]=ha.x,s[8]=on.x,s[1]=oi.y,s[5]=ha.y,s[9]=on.y,s[2]=oi.z,s[6]=ha.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],M=n[6],m=n[10],p=n[14],x=n[3],w=n[7],y=n[11],A=n[15],E=s[0],_=s[4],S=s[8],L=s[12],C=s[1],N=s[5],O=s[9],X=s[13],I=s[2],G=s[6],Y=s[10],V=s[14],se=s[3],q=s[7],Q=s[11],ne=s[15];return r[0]=a*E+o*C+l*I+c*se,r[4]=a*_+o*N+l*G+c*q,r[8]=a*S+o*O+l*Y+c*Q,r[12]=a*L+o*X+l*V+c*ne,r[1]=h*E+d*C+u*I+f*se,r[5]=h*_+d*N+u*G+f*q,r[9]=h*S+d*O+u*Y+f*Q,r[13]=h*L+d*X+u*V+f*ne,r[2]=g*E+M*C+m*I+p*se,r[6]=g*_+M*N+m*G+p*q,r[10]=g*S+M*O+m*Y+p*Q,r[14]=g*L+M*X+m*V+p*ne,r[3]=x*E+w*C+y*I+A*se,r[7]=x*_+w*N+y*G+A*q,r[11]=x*S+w*O+y*Y+A*Q,r[15]=x*L+w*X+y*V+A*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],M=e[7],m=e[11],p=e[15],x=l*f-c*u,w=o*f-c*d,y=o*u-l*d,A=a*f-c*h,E=a*u-l*h,_=a*d-o*h;return t*(M*x-m*w+p*y)-n*(g*x-m*A+p*E)+s*(g*w-M*A+p*_)-r*(g*y-M*E+m*_)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],M=e[13],m=e[14],p=e[15],x=t*o-n*a,w=t*l-s*a,y=t*c-r*a,A=n*l-s*o,E=n*c-r*o,_=s*c-r*l,S=h*M-d*g,L=h*m-u*g,C=h*p-f*g,N=d*m-u*M,O=d*p-f*M,X=u*p-f*m,I=x*X-w*O+y*N+A*C-E*L+_*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return e[0]=(o*X-l*O+c*N)*G,e[1]=(s*O-n*X-r*N)*G,e[2]=(M*_-m*E+p*A)*G,e[3]=(u*E-d*_-f*A)*G,e[4]=(l*C-a*X-c*L)*G,e[5]=(t*X-s*C+r*L)*G,e[6]=(m*y-g*_-p*w)*G,e[7]=(h*_-u*y+f*w)*G,e[8]=(a*O-o*C+c*S)*G,e[9]=(n*C-t*O-r*S)*G,e[10]=(g*E-M*y+p*x)*G,e[11]=(d*y-h*E-f*x)*G,e[12]=(o*L-a*N-l*S)*G,e[13]=(t*N-n*L+s*S)*G,e[14]=(M*w-g*A-m*x)*G,e[15]=(h*A-d*w+u*x)*G,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,M=a*h,m=a*d,p=o*d,x=l*c,w=l*h,y=l*d,A=n.x,E=n.y,_=n.z;return s[0]=(1-(M+p))*A,s[1]=(f+y)*A,s[2]=(g-w)*A,s[3]=0,s[4]=(f-y)*E,s[5]=(1-(u+p))*E,s[6]=(m+x)*E,s[7]=0,s[8]=(g+w)*_,s[9]=(m-x)*_,s[10]=(1-(u+M))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ji.set(s[0],s[1],s[2]).length(),o=ji.set(s[4],s[5],s[6]).length(),l=ji.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);let c=1/a,h=1/o,d=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=d,vn.elements[9]*=d,vn.elements[10]*=d,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=mn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===mn)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===ps)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=mn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===mn)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===ps)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};xo.prototype.isMatrix4=!0;var ht=xo,ji=new U,vn=new ht,up=new U(0,0,0),dp=new U(1,1,1),oi=new U,ha=new U,on=new U,eu=new ht,tu=new gn,hn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return eu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tu.setFromEuler(this),this.setFromQuaternion(tu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER="XYZ";var ar=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fp=0,nu=new U,Qi=new gn,Gn=new ht,ua=new U,Ws=new U,pp=new U,mp=new gn,iu=new U(1,0,0),su=new U(0,1,0),ru=new U(0,0,1),au={type:"added"},gp={type:"removed"},es={type:"childadded",child:null},Vl={type:"childremoved",child:null},Ht=class i extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new hn,n=new gn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Xe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.premultiply(Qi),this}rotateX(e){return this.rotateOnAxis(iu,e)}rotateY(e){return this.rotateOnAxis(su,e)}rotateZ(e){return this.rotateOnAxis(ru,e)}translateOnAxis(e,t){return nu.copy(e).applyQuaternion(this.quaternion),this.position.add(nu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(iu,e)}translateY(e){return this.translateOnAxis(su,e)}translateZ(e){return this.translateOnAxis(ru,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ua.copy(e):ua.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Ws,ua,this.up):Gn.lookAt(ua,Ws,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Gn),this.quaternion.premultiply(Qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(au),es.child=e,this.dispatchEvent(es),es.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gp),Vl.child=e,this.dispatchEvent(Vl),Vl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(au),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,mp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ht.DEFAULT_UP=new U(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kt=class extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},_p={type:"move"},xs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let M of e.hand.values()){let m=t.getJointPose(M,n),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_p)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},da={h:0,s:0,l:0};function Wl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=Vc(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Wl(a,r,e+1/3),this.g=Wl(a,r,e),this.b=Wl(a,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){let n=dd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=us(e.r),this.g=us(e.g),this.b=us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return ot.workingToColorSpace($t.copy(this),e),Math.round(Ke($t.r*255,0,255))*65536+Math.round(Ke($t.g*255,0,255))*256+Math.round(Ke($t.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Bt){ot.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(da);let n=js(li.h,da.h,t),s=js(li.s,da.s,t),r=js(li.l,da.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ge;Ge.NAMES=dd;var or=class extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},yn=new U,Vn=new U,Xl=new U,Wn=new U,ts=new U,ns=new U,ou=new U,ql=new U,Yl=new U,$l=new U,Zl=new bt,Jl=new bt,Kl=new bt,di=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),yn.subVectors(e,t),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){yn.subVectors(s,t),Vn.subVectors(n,t),Xl.subVectors(e,t);let a=yn.dot(yn),o=yn.dot(Vn),l=yn.dot(Xl),c=Vn.dot(Vn),h=Vn.dot(Xl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Zl.setScalar(0),Jl.setScalar(0),Kl.setScalar(0),Zl.fromBufferAttribute(e,t),Jl.fromBufferAttribute(e,n),Kl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Zl,r.x),a.addScaledVector(Jl,r.y),a.addScaledVector(Kl,r.z),a}static isFrontFacing(e,t,n,s){return yn.subVectors(n,t),Vn.subVectors(e,t),yn.cross(Vn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),yn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ts.subVectors(s,n),ns.subVectors(r,n),ql.subVectors(e,n);let l=ts.dot(ql),c=ns.dot(ql);if(l<=0&&c<=0)return t.copy(n);Yl.subVectors(e,s);let h=ts.dot(Yl),d=ns.dot(Yl);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(n).addScaledVector(ts,a);$l.subVectors(e,r);let f=ts.dot($l),g=ns.dot($l);if(g>=0&&f<=g)return t.copy(r);let M=f*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ns,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return ou.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(ou,o);let p=1/(m+M+u);return a=M*p,o=u*p,t.copy(n).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},In=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fa.copy(n.boundingBox)),fa.applyMatrix4(e.matrixWorld),this.union(fa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xs),pa.subVectors(this.max,Xs),is.subVectors(e.a,Xs),ss.subVectors(e.b,Xs),rs.subVectors(e.c,Xs),ci.subVectors(ss,is),hi.subVectors(rs,ss),Ti.subVectors(is,rs);let t=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Ti.z,Ti.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Ti.z,0,-Ti.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Ti.y,Ti.x,0];return!jl(t,is,ss,rs,pa)||(t=[1,0,0,0,1,0,0,0,1],!jl(t,is,ss,rs,pa))?!1:(ma.crossVectors(ci,hi),t=[ma.x,ma.y,ma.z],jl(t,is,ss,rs,pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xn=[new U,new U,new U,new U,new U,new U,new U,new U],Mn=new U,fa=new In,is=new U,ss=new U,rs=new U,ci=new U,hi=new U,Ti=new U,Xs=new U,pa=new U,ma=new U,Ai=new U;function jl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ai.fromArray(i,r);let o=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),l=e.dot(Ai),c=t.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Pt=new U,ga=new oe,xp=0,bn=class extends Pn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rd,this.updateRanges=[],this.gpuType=_n,this.version=0,this._normalizationScale=e!==void 0?Xc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ga.fromBufferAttribute(this,t),ga.applyMatrix3(e),this.setXY(t,ga.x,ga.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):hd(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ud(e,this.array)}};var lr=class extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}},vp=new In,qs=new U,Ql=new U,fi=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):vp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qs.subVectors(e,this.center);let t=qs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qs.copy(e.center).add(Ql)),this.expandByPoint(qs.copy(e.center).sub(Ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yp=0,pn=new ht,ec=new Ht,as=new U,ln=new In,Ys=new In,Ot=new U,en=class i extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xf(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return ec.lookAt(e),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ys.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(ln.min,Ys.min),ln.expandByPoint(Ot),Ot.addVectors(ln.max,Ys.max),ln.expandByPoint(Ot)):(ln.expandByPoint(Ys.min),ln.expandByPoint(Ys.max))}ln.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),Ot.add(as)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new bn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)o[L]=new U,l[L]=new U;let h=new U,d=new U,u=new U,f=new oe,g=new oe,M=new oe,m=new U,p=new U;function x(L,C,N){c[L]=c[C]=c[N]=1,h.fromBufferAttribute(n,L),d.fromBufferAttribute(n,C),u.fromBufferAttribute(n,N),f.fromBufferAttribute(r,L),g.fromBufferAttribute(r,C),M.fromBufferAttribute(r,N),d.sub(h),u.sub(h),g.sub(f),M.sub(f);let O=1/(g.x*M.y-M.x*g.y);isFinite(O)&&(m.copy(d).multiplyScalar(M.y).addScaledVector(u,-g.y).multiplyScalar(O),p.copy(u).multiplyScalar(g.x).addScaledVector(d,-M.x).multiplyScalar(O),o[L].add(m),o[C].add(m),o[N].add(m),l[L].add(p),l[C].add(p),l[N].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let L=0,C=w.length;L<C;++L){let N=w[L],O=N.start,X=N.count;for(let I=O,G=O+X;I<G;I+=3)x(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let y=new U,A=new U,E=new U,_=new U;function S(L){E.fromBufferAttribute(s,L),_.copy(E);let C=o[L];y.copy(C),y.sub(E.multiplyScalar(E.dot(C))).normalize(),A.crossVectors(_,C);let O=A.dot(l[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,O)}for(let L=0,C=n.count;L<C;++L)c[L]&&S(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?f=l[M]*o.data.stride+o.offset:f=l[M]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new bn(u,h,d)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var tc=new U,Mp=new U,Sp=new Xe,Sn=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=tc.subVectors(n,t).cross(Mp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(tc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Sp.getNormalMatrix(e),s=this.coplanarPoint(tc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},bp=0,Zn=class extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=Rs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bc,this.blendDst=wc,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Da,this.stencilZFail=Da,this.stencilZPass=Da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ge().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Sn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var qn=new U,nc=new U,_a=new U,xa=new U,Ya=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){nc.copy(e).add(t).multiplyScalar(.5),_a.copy(t).sub(e).normalize(),xa.copy(this.origin).sub(nc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(_a),o=xa.dot(this.direction),l=-xa.dot(_a),c=xa.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let M=1/h;d*=M,u*=M,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(nc).addScaledVector(_a,u),f}intersectSphere(e,t){if(e.radius<0)return null;qn.subVectors(e.center,this.origin);let n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,M=t.y-a.y,m=t.z-a.z,p=n.x-a.x,x=n.y-a.y,w=n.z-a.z,y=Math.abs(l),A=Math.abs(c),E=Math.abs(h),_,S,L,C,N,O,X,I,G,Y,V,se;if(y>=A&&y>=E?(L=l,O=d,G=g,se=p,l>=0?(_=c,S=h,C=u,N=f,X=M,I=m,Y=x,V=w):(_=h,S=c,C=f,N=u,X=m,I=M,Y=w,V=x)):A>=E?(L=c,O=u,G=M,se=x,c>=0?(_=h,S=l,C=f,N=d,X=m,I=g,Y=w,V=p):(_=l,S=h,C=d,N=f,X=g,I=m,Y=p,V=w)):(L=h,O=f,G=m,se=w,h>=0?(_=l,S=c,C=d,N=u,X=g,I=M,Y=p,V=x):(_=c,S=l,C=u,N=d,X=M,I=g,Y=x,V=p)),L===0)return null;let q=_/L,Q=S/L,ne=1/L,Te=C-q*O,Be=N-Q*O,Z=X-q*G,ye=I-Q*G,Ae=Y-q*se,Ue=V-Q*se,Me=Ae*ye-Ue*Z,Fe=Te*Ue-Be*Ae,Mt=Z*Be-ye*Te;if(s){if(Me<0||Fe<0||Mt<0)return null}else if((Me<0||Fe<0||Mt<0)&&(Me>0||Fe>0||Mt>0))return null;let ze=Me+Fe+Mt;if(ze===0)return null;let Qe=ne*(Me*O+Fe*G+Mt*se);return(ze>0?Qe<0:Qe>0)?null:this.at(Qe/ze,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vs=class extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},lu=new ht,Ri=new Ya,va=new fi,cu=new U,ya=new U,Ma=new U,Sa=new U,ic=new U,ba=new U,hu=new U,wa=new U,Ze=class extends Ht{constructor(e=new en,t=new vs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ba.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(ic.fromBufferAttribute(d,e),a?ba.addScaledVector(ic,h):ba.addScaledVector(ic.sub(t),h))}t.add(ba)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(r),Ri.copy(e.ray).recast(e.near),!(va.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(va,cu)===null||Ri.origin.distanceToSquared(cu)>(e.far-e.near)**2))&&(lu.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(lu),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let m=u[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,A=w;y<A;y+=3){let E=o.getX(y),_=o.getX(y+1),S=o.getX(y+2);s=Ea(this,p,e,n,c,h,d,E,_,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){let x=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);s=Ea(this,a,e,n,c,h,d,x,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let m=u[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,A=w;y<A;y+=3){let E=y,_=y+1,S=y+2;s=Ea(this,p,e,n,c,h,d,E,_,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){let x=m,w=m+1,y=m+2;s=Ea(this,a,e,n,c,h,d,x,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function wp(i,e,t,n,s,r,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===vi,o),l===null)return null;wa.copy(o),wa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(wa);return c<t.near||c>t.far?null:{distance:c,point:wa.clone(),object:i}}function Ea(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ya),i.getVertexPosition(l,Ma),i.getVertexPosition(c,Sa);let h=wp(i,e,t,n,ya,Ma,Sa,hu);if(h){let d=new U;di.getBarycoord(hu,ya,Ma,Sa,d),s&&(h.uv=di.getInterpolatedAttribute(s,o,l,c,d,new oe)),r&&(h.uv1=di.getInterpolatedAttribute(r,o,l,c,d,new oe)),a&&(h.normal=di.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new U,materialIndex:0};di.getNormal(ya,Ma,Sa,u.normal),h.face=u,h.barycoord=d}return h}var hr=class extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=zt,h=zt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ur=class extends bn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},os=new ht,uu=new ht,Ta=[],du=new In,Ep=new ht,$s=new Ze,Zs=new fi,ys=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ur(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ep)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new In),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),du.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(du)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Zs.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(n),e.ray.intersectsSphere(Zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),uu.multiplyMatrices(n,os),$s.matrixWorld=uu,$s.raycast(e,Ta);for(let a=0,o=Ta.length;a<o;a++){let l=Ta[a];l.instanceId=r,l.object=this,t.push(l)}Ta.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ur(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hr(new Float32Array(s*this.count),s,this.count,To,_n));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ci=new fi,Tp=new oe(.5,.5),Aa=new U,pi=class{constructor(e=new Sn,t=new Sn,n=new Sn,s=new Sn,r=new Sn,a=new Sn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],M=r[9],m=r[10],p=r[11],x=r[12],w=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,f-h,p-g,A-x).normalize(),s[1].setComponents(c+a,f+h,p+g,A+x).normalize(),s[2].setComponents(c+o,f+d,p+M,A+w).normalize(),s[3].setComponents(c-o,f-d,p-M,A-w).normalize(),n)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,f-u,p-m,A-y).normalize();else if(s[4].setComponents(c-l,f-u,p-m,A-y).normalize(),t===mn)s[5].setComponents(c+l,f+u,p+m,A+y).normalize();else if(t===ps)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);let t=Tp.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Aa.x=s.normal.x>0?e.max.x:e.min.x,Aa.y=s.normal.y>0?e.max.y:e.min.y,Aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Aa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},fu=new ht,$a=class i{constructor(){this.coordinateSystem=mn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];fu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new pi),n[s].setFromProjectionMatrix(fu,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new pi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var dr=class extends Qt{constructor(e=[],t=ki,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Li=class extends Qt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Jn=class extends Qt{constructor(e,t,n=wn,s,r,a,o=zt,l=zt,c,h=$n,d=1){if(h!==$n&&h!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},fr=class extends Jn{constructor(e,t=wn,n=ki,s,r,a=zt,o=zt,l,c=$n){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},pr=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ms=class i extends en{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(d,2));function g(M,m,p,x,w,y,A,E,_,S,L){let C=y/_,N=A/S,O=y/2,X=A/2,I=E/2,G=_+1,Y=S+1,V=0,se=0,q=new U;for(let Q=0;Q<Y;Q++){let ne=Q*N-X;for(let Te=0;Te<G;Te++){let Be=Te*C-O;q[M]=Be*x,q[m]=ne*w,q[p]=I,c.push(q.x,q.y,q.z),q[M]=0,q[m]=0,q[p]=E>0?1:-1,h.push(q.x,q.y,q.z),d.push(Te/_),d.push(1-Q/S),V+=1}}for(let Q=0;Q<S;Q++)for(let ne=0;ne<_;ne++){let Te=u+ne+G*Q,Be=u+ne+G*(Q+1),Z=u+(ne+1)+G*(Q+1),ye=u+(ne+1)+G*Q;l.push(Te,Be,ye),l.push(Be,Z,ye),se+=6}o.addGroup(f,se,L),f+=se,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var mr=class i extends en{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new U,h=new oe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ni=class i extends en{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,M=[],m=n/2,p=0;x(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(f,2));function x(){let y=new U,A=new U,E=0,_=(t-e)/n;for(let S=0;S<=r;S++){let L=[],C=S/r,N=C*(t-e)+e;for(let O=0;O<=s;O++){let X=O/s,I=X*l+o,G=Math.sin(I),Y=Math.cos(I);A.x=N*G,A.y=-C*n+m,A.z=N*Y,d.push(A.x,A.y,A.z),y.set(G,_,Y).normalize(),u.push(y.x,y.y,y.z),f.push(X,1-C),L.push(g++)}M.push(L)}for(let S=0;S<s;S++)for(let L=0;L<r;L++){let C=M[L][S],N=M[L+1][S],O=M[L+1][S+1],X=M[L][S+1];(e>0||L!==0)&&(h.push(C,N,X),E+=3),(t>0||L!==r-1)&&(h.push(N,O,X),E+=3)}c.addGroup(p,E,0),p+=E}function w(y){let A=g,E=new oe,_=new U,S=0,L=y===!0?e:t,C=y===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),g++;let N=g;for(let O=0;O<=s;O++){let I=O/s*l+o,G=Math.cos(I),Y=Math.sin(I);_.x=L*Y,_.y=m*C,_.z=L*G,d.push(_.x,_.y,_.z),u.push(0,C,0),E.x=G*.5+.5,E.y=Y*.5*C+.5,f.push(E.x,E.y),g++}for(let O=0;O<s;O++){let X=A+O,I=N+O;y===!0?h.push(I,I+1,X):h.push(I+1,I,X),S+=3}c.addGroup(p,S,y===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ss=class i extends Ni{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Za=class i extends en{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new dt(r,3)),this.setAttribute("normal",new dt(r.slice(),3)),this.setAttribute("uv",new dt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){let w=new U,y=new U,A=new U;for(let E=0;E<t.length;E+=3)f(t[E+0],w),f(t[E+1],y),f(t[E+2],A),l(w,y,A,x)}function l(x,w,y,A){let E=A+1,_=[];for(let S=0;S<=E;S++){_[S]=[];let L=x.clone().lerp(y,S/E),C=w.clone().lerp(y,S/E),N=E-S;for(let O=0;O<=N;O++)O===0&&S===E?_[S][O]=L:_[S][O]=L.clone().lerp(C,O/N)}for(let S=0;S<E;S++)for(let L=0;L<2*(E-S)-1;L++){let C=Math.floor(L/2);L%2===0?(u(_[S][C+1]),u(_[S+1][C]),u(_[S][C])):(u(_[S][C+1]),u(_[S+1][C+1]),u(_[S+1][C]))}}function c(x){let w=new U;for(let y=0;y<r.length;y+=3)w.x=r[y+0],w.y=r[y+1],w.z=r[y+2],w.normalize().multiplyScalar(x),r[y+0]=w.x,r[y+1]=w.y,r[y+2]=w.z}function h(){let x=new U;for(let w=0;w<r.length;w+=3){x.x=r[w+0],x.y=r[w+1],x.z=r[w+2];let y=m(x)/2/Math.PI+.5,A=p(x)/Math.PI+.5;a.push(y,1-A)}g(),d()}function d(){for(let x=0;x<a.length;x+=6){let w=a[x+0],y=a[x+2],A=a[x+4],E=Math.max(w,y,A),_=Math.min(w,y,A);E>.9&&_<.1&&(w<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),A<.2&&(a[x+4]+=1))}}function u(x){r.push(x.x,x.y,x.z)}function f(x,w){let y=x*3;w.x=e[y+0],w.y=e[y+1],w.z=e[y+2]}function g(){let x=new U,w=new U,y=new U,A=new U,E=new oe,_=new oe,S=new oe;for(let L=0,C=0;L<r.length;L+=9,C+=6){x.set(r[L+0],r[L+1],r[L+2]),w.set(r[L+3],r[L+4],r[L+5]),y.set(r[L+6],r[L+7],r[L+8]),E.set(a[C+0],a[C+1]),_.set(a[C+2],a[C+3]),S.set(a[C+4],a[C+5]),A.copy(x).add(w).add(y).divideScalar(3);let N=m(A);M(E,C+0,x,N),M(_,C+2,w,N),M(S,C+4,y,N)}}function M(x,w,y,A){A<0&&x.x===1&&(a[w]=x.x-1),y.x===0&&y.z===0&&(a[w]=A/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new oe:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,s=[],r=[],a=[],o=new U,l=new ht;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new U)}r[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ke(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ke(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},bs=class extends un{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new oe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ja=class extends bs{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Yc(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var pu=new U,mu=new U,sc=new Yc,rc=new Yc,ac=new Yc,Ka=class extends un{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(mu.subVectors(s[0],s[1]).add(s[0]),c=mu);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(pu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=pu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),M=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),sc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,M,m),rc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,M,m),ac.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(sc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),rc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),ac.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(sc.calc(l),rc.calc(l),ac.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gu(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Ap(i,e){let t=1-i;return t*t*e}function Rp(i,e){return 2*(1-i)*i*e}function Cp(i,e){return i*i*e}function Qs(i,e,t,n){return Ap(i,e)+Rp(i,t)+Cp(i,n)}function Pp(i,e){let t=1-i;return t*t*t*e}function Ip(i,e){let t=1-i;return 3*t*t*i*e}function Lp(i,e){return 3*(1-i)*i*i*e}function Np(i,e){return i*i*i*e}function er(i,e,t,n,s){return Pp(i,e)+Ip(i,t)+Lp(i,n)+Np(i,s)}var gr=class extends un{constructor(e=new oe,t=new oe,n=new oe,s=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new oe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(er(e,s.x,r.x,a.x,o.x),er(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ja=class extends un{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(er(e,s.x,r.x,a.x,o.x),er(e,s.y,r.y,a.y,o.y),er(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_r=class extends un{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends un{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xr=class extends un{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,s.x,r.x,a.x),Qs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eo=class extends un{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,s.x,r.x,a.x),Qs(e,s.y,r.y,a.y),Qs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Di=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(gu(o,l.x,c.x,h.x,d.x),gu(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new oe().fromArray(s))}return this}},dc=Object.freeze({__proto__:null,ArcCurve:Ja,CatmullRomCurve3:Ka,CubicBezierCurve:gr,CubicBezierCurve3:ja,EllipseCurve:bs,LineCurve:_r,LineCurve3:Qa,QuadraticBezierCurve:xr,QuadraticBezierCurve3:eo,SplineCurve:Di}),to=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new dc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},vr=class extends to{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new _r(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new xr(this.currentPoint.clone(),new oe(e,t),new oe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new gr(this.currentPoint.clone(),new oe(e,t),new oe(n,s),new oe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Di(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new bs(e,t,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ws=class extends vr{constructor(e){super(e),this.uuid=Hi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new vr().fromJSON(s))}return this}};function Dp(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=fd(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=kp(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,d=l;for(let u=t;u<s;u+=t){let f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return yr(r,a,t,o,l,c,0),a}function fd(i,e,t,n,s){let r;if(s===Jp(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=_u(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=_u(a/n|0,i[a],i[a+1],r);return r&&Es(r,r.next)&&(Sr(r),r=r.next),r}function Ui(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Es(t,t.next)||Et(t.prev,t,t.next)===0)){if(Sr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Wp(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Fp(i,n,s,r):Up(i)){e.push(l.i,i.i,c.i),Sr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Op(Ui(i),e),yr(i,e,t,n,s,r,2)):a===2&&Bp(i,e,t,n,s,r):yr(Ui(i),e,t,n,s,r,1);break}}}function Up(i){let e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Js(s,o,r,l,a,c,g.x,g.y)&&Et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Fp(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Et(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),M=Math.max(o,l,c),m=Math.max(h,d,u),p=fc(f,g,e,t,n),x=fc(M,m,e,t,n),w=i.prevZ,y=i.nextZ;for(;w&&w.z>=p&&y&&y.z<=x;){if(w.x>=f&&w.x<=M&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Js(o,h,l,d,c,u,w.x,w.y)&&Et(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=f&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Js(o,h,l,d,c,u,y.x,y.y)&&Et(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=p;){if(w.x>=f&&w.x<=M&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Js(o,h,l,d,c,u,w.x,w.y)&&Et(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Js(o,h,l,d,c,u,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Op(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Es(n,s)&&md(n,t,t.next,s)&&Mr(n,s)&&Mr(s,n)&&(e.push(n.i,t.i,s.i),Sr(t),Sr(t.next),t=i=s),t=t.next}while(t!==i);return Ui(t)}function Bp(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Yp(a,o)){let l=gd(a,o);a=Ui(a,a.next),l=Ui(l,l.next),yr(a,e,t,n,s,r,0),yr(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function kp(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=fd(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(qp(c))}s.sort(zp);for(let r=0;r<s.length;r++)t=Hp(s[r],t);return t}function zp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Hp(i,e){let t=Gp(i,e);if(!t)return e;let n=gd(t,i);return Ui(n,n.next),Ui(t,t.next)}function Gp(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Es(i,t))return t;do{if(Es(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&pd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);Mr(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&Vp(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function Vp(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function Wp(i,e,t,n){let s=i;do s.z===0&&(s.z=fc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Xp(s)}function Xp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function fc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function qp(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Js(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&pd(i,e,t,n,s,r,a,o)}function Yp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!$p(i,e)&&(Mr(i,e)&&Mr(e,i)&&Zp(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||Es(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Es(i,e){return i.x===e.x&&i.y===e.y}function md(i,e,t,n){let s=Ca(Et(i,e,t)),r=Ca(Et(i,e,n)),a=Ca(Et(t,n,i)),o=Ca(Et(t,n,e));return!!(s!==r&&a!==o||s===0&&Ra(i,t,e)||r===0&&Ra(i,n,e)||a===0&&Ra(t,i,n)||o===0&&Ra(t,e,n))}function Ra(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ca(i){return i>0?1:i<0?-1:0}function $p(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&md(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Mr(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function Zp(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function gd(i,e){let t=pc(i.i,i.x,i.y),n=pc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function _u(i,e,t,n){let s=pc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Sr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function pc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Jp(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var mc=class{static triangulate(e,t,n=2){return Dp(e,t,n)}},Pi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];xu(e),vu(n,e);let a=e.length;t.forEach(xu);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,vu(n,t[l]);let o=mc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function xu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function vu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var br=class i extends en{constructor(e=new ws([new oe(.5,.5),new oe(-.5,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new dt(s,3)),this.setAttribute("uv",new dt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,M=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Kp,w,y=!1,A,E,_,S;if(p){w=p.getSpacedPoints(h),y=!0,u=!1;let te=p.isCatmullRomCurve3?p.closed:!1;A=p.computeFrenetFrames(h,te),E=new U,_=new U,S=new U}u||(m=0,f=0,g=0,M=0);let L=o.extractPoints(c),C=L.shape,N=L.holes;if(!Pi.isClockWise(C)){C=C.reverse();for(let te=0,de=N.length;te<de;te++){let ce=N[te];Pi.isClockWise(ce)&&(N[te]=ce.reverse())}}function X(te){let ce=10000000000000001e-36,Ee=te[0];for(let ve=1;ve<=te.length;ve++){let Ye=ve%te.length,Le=te[Ye],it=Le.x-Ee.x,st=Le.y-Ee.y,ut=it*it+st*st,F=Math.max(Math.abs(Le.x),Math.abs(Le.y),Math.abs(Ee.x),Math.abs(Ee.y)),Rt=ce*F*F;if(ut<=Rt){te.splice(Ye,1),ve--;continue}Ee=Le}}X(C),N.forEach(X);let I=N.length,G=C;for(let te=0;te<I;te++){let de=N[te];C=C.concat(de)}function Y(te,de,ce){return de||Ve("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(de,ce)}let V=C.length;function se(te,de,ce){let Ee,ve,Ye,Le=te.x-de.x,it=te.y-de.y,st=ce.x-te.x,ut=ce.y-te.y,F=Le*Le+it*it,Rt=Le*ut-it*st;if(Math.abs(Rt)>Number.EPSILON){let tt=Math.sqrt(F),_t=Math.sqrt(st*st+ut*ut),ge=de.x-it/tt,Tt=de.y+Le/tt,Oe=ce.x-ut/_t,We=ce.y+st/_t,R=((Oe-ge)*ut-(We-Tt)*st)/(Le*ut-it*st);Ee=ge+Le*R-te.x,ve=Tt+it*R-te.y;let v=Ee*Ee+ve*ve;if(v<=2)return new oe(Ee,ve);Ye=Math.sqrt(v/2)}else{let tt=!1;Le>Number.EPSILON?st>Number.EPSILON&&(tt=!0):Le<-Number.EPSILON?st<-Number.EPSILON&&(tt=!0):Math.sign(it)===Math.sign(ut)&&(tt=!0),tt?(Ee=-it,ve=Le,Ye=Math.sqrt(F)):(Ee=Le,ve=it,Ye=Math.sqrt(F/2))}return new oe(Ee/Ye,ve/Ye)}let q=[];for(let te=0,de=G.length,ce=de-1,Ee=te+1;te<de;te++,ce++,Ee++)ce===de&&(ce=0),Ee===de&&(Ee=0),q[te]=se(G[te],G[ce],G[Ee]);let Q=[],ne,Te=q.concat();for(let te=0,de=I;te<de;te++){let ce=N[te];ne=[];for(let Ee=0,ve=ce.length,Ye=ve-1,Le=Ee+1;Ee<ve;Ee++,Ye++,Le++)Ye===ve&&(Ye=0),Le===ve&&(Le=0),ne[Ee]=se(ce[Ee],ce[Ye],ce[Le]);Q.push(ne),Te=Te.concat(ne)}let Be;if(m===0)Be=Pi.triangulateShape(G,N);else{let te=[],de=[];for(let ce=0;ce<m;ce++){let Ee=ce/m,ve=f*Math.cos(Ee*Math.PI/2),Ye=g*Math.sin(Ee*Math.PI/2)+M;for(let Le=0,it=G.length;Le<it;Le++){let st=Y(G[Le],q[Le],Ye);Fe(st.x,st.y,-ve),Ee===0&&te.push(st)}for(let Le=0,it=I;Le<it;Le++){let st=N[Le];ne=Q[Le];let ut=[];for(let F=0,Rt=st.length;F<Rt;F++){let tt=Y(st[F],ne[F],Ye);Fe(tt.x,tt.y,-ve),Ee===0&&ut.push(tt)}Ee===0&&de.push(ut)}}Be=Pi.triangulateShape(te,de)}let Z=Be.length,ye=g+M;for(let te=0;te<V;te++){let de=u?Y(C[te],Te[te],ye):C[te];y?(_.copy(A.normals[0]).multiplyScalar(de.x),E.copy(A.binormals[0]).multiplyScalar(de.y),S.copy(w[0]).add(_).add(E),Fe(S.x,S.y,S.z)):Fe(de.x,de.y,0)}for(let te=1;te<=h;te++)for(let de=0;de<V;de++){let ce=u?Y(C[de],Te[de],ye):C[de];y?(_.copy(A.normals[te]).multiplyScalar(ce.x),E.copy(A.binormals[te]).multiplyScalar(ce.y),S.copy(w[te]).add(_).add(E),Fe(S.x,S.y,S.z)):Fe(ce.x,ce.y,d/h*te)}for(let te=m-1;te>=0;te--){let de=te/m,ce=f*Math.cos(de*Math.PI/2),Ee=g*Math.sin(de*Math.PI/2)+M;for(let ve=0,Ye=G.length;ve<Ye;ve++){let Le=Y(G[ve],q[ve],Ee);Fe(Le.x,Le.y,d+ce)}for(let ve=0,Ye=N.length;ve<Ye;ve++){let Le=N[ve];ne=Q[ve];for(let it=0,st=Le.length;it<st;it++){let ut=Y(Le[it],ne[it],Ee);y?Fe(ut.x,ut.y+w[h-1].y,w[h-1].x+ce):Fe(ut.x,ut.y,d+ce)}}}Ae(),Ue();function Ae(){let te=s.length/3;if(u){let de=0,ce=V*de;for(let Ee=0;Ee<Z;Ee++){let ve=Be[Ee];Mt(ve[2]+ce,ve[1]+ce,ve[0]+ce)}de=h+m*2,ce=V*de;for(let Ee=0;Ee<Z;Ee++){let ve=Be[Ee];Mt(ve[0]+ce,ve[1]+ce,ve[2]+ce)}}else{for(let de=0;de<Z;de++){let ce=Be[de];Mt(ce[2],ce[1],ce[0])}for(let de=0;de<Z;de++){let ce=Be[de];Mt(ce[0]+V*h,ce[1]+V*h,ce[2]+V*h)}}n.addGroup(te,s.length/3-te,0)}function Ue(){let te=s.length/3,de=0;Me(G,de),de+=G.length;for(let ce=0,Ee=N.length;ce<Ee;ce++){let ve=N[ce];Me(ve,de),de+=ve.length}n.addGroup(te,s.length/3-te,1)}function Me(te,de){let ce=te.length;for(;--ce>=0;){let Ee=ce,ve=ce-1;ve<0&&(ve=te.length-1);for(let Ye=0,Le=h+m*2;Ye<Le;Ye++){let it=V*Ye,st=V*(Ye+1),ut=de+Ee+it,F=de+ve+it,Rt=de+ve+st,tt=de+Ee+st;ze(ut,F,Rt,tt)}}}function Fe(te,de,ce){l.push(te),l.push(de),l.push(ce)}function Mt(te,de,ce){Qe(te),Qe(de),Qe(ce);let Ee=s.length/3,ve=x.generateTopUV(n,s,Ee-3,Ee-2,Ee-1);nt(ve[0]),nt(ve[1]),nt(ve[2])}function ze(te,de,ce,Ee){Qe(te),Qe(de),Qe(Ee),Qe(de),Qe(ce),Qe(Ee);let ve=s.length/3,Ye=x.generateSideWallUV(n,s,ve-6,ve-3,ve-2,ve-1);nt(Ye[0]),nt(Ye[1]),nt(Ye[3]),nt(Ye[1]),nt(Ye[2]),nt(Ye[3])}function Qe(te){s.push(l[te*3+0]),s.push(l[te*3+1]),s.push(l[te*3+2])}function nt(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return jp(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new dc[s.type]().fromJSON(s)),new i(n,e.options)}},Kp={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new oe(r,a),new oe(o,l),new oe(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],g=e[s*3+2],M=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new oe(a,1-l),new oe(c,1-d),new oe(u,1-g),new oe(M,1-p)]:[new oe(o,1-l),new oe(h,1-d),new oe(f,1-g),new oe(m,1-p)]}};function jp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var wr=class i extends Za{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Er=class i extends en{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Ke(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,d=new U,u=new oe,f=new U,g=new U,M=new U,m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,M.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:M.normalize(),l.push(M.x,M.y,M.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=M.x,f.y+=M.y,f.z+=M.z,f.normalize(),l.push(f.x,f.y,f.z),M.copy(g)}for(let x=0;x<=t;x++){let w=n+x*h*s,y=Math.sin(w),A=Math.cos(w);for(let E=0;E<=e.length-1;E++){d.x=e[E].x*y,d.y=e[E].y,d.z=e[E].x*A,a.push(d.x,d.y,d.z),u.x=x/t,u.y=E/(e.length-1),o.push(u.x,u.y);let _=l[3*E+0]*y,S=l[3*E+1],L=l[3*E+0]*A;c.push(_,S,L)}}for(let x=0;x<t;x++)for(let w=0;w<e.length-1;w++){let y=w+x*e.length,A=y,E=y+e.length,_=y+e.length+1,S=y+1;r.push(A,E,S),r.push(_,S,E)}this.setIndex(r),this.setAttribute("position",new dt(a,3)),this.setAttribute("uv",new dt(o,2)),this.setAttribute("normal",new dt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}};var Fi=class i extends en{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){let x=p*u-a;for(let w=0;w<c;w++){let y=w*d-r;g.push(y,-x,0),M.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){let w=x+c*p,y=x+c*(p+1),A=x+1+c*(p+1),E=x+1+c*p;f.push(w,y,E),f.push(y,A,E)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(M,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Wt=class i extends en{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new U,u=new U,f=[],g=[],M=[],m=[];for(let p=0;p<=n;p++){let x=[],w=p/n,y=a+w*o,A=e*Math.cos(y),E=Math.sqrt(e*e-A*A),_=0;p===0&&a===0?_=.5/t:p===n&&l===Math.PI&&(_=-.5/t);for(let S=0;S<=t;S++){let L=S/t,C=s+L*r;d.x=-E*Math.cos(C),d.y=A,d.z=E*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(L+_,1-w),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){let w=h[p][x+1],y=h[p][x],A=h[p+1][x],E=h[p+1][x+1];(p!==0||a>0)&&f.push(w,y,E),(p!==n-1||l<Math.PI)&&f.push(y,A,E)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(M,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ln=class i extends en{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new U,f=new U,g=new U;for(let M=0;M<=n;M++){let m=a+M/n*o;for(let p=0;p<=s;p++){let x=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(x),f.y=(e+t*Math.cos(m))*Math.sin(x),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(M/n)}}for(let M=1;M<=n;M++)for(let m=1;m<=s;m++){let p=(s+1)*M+m-1,x=(s+1)*(M-1)+m-1,w=(s+1)*(M-1)+m,y=(s+1)*M+m;l.push(p,x,y),l.push(x,w,y)}this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Gi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(yu(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(yu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Zt(i){let e={};for(let t=0;t<i.length;t++){let n=Gi(i[t]);for(let s in n)e[s]=n[s]}return e}function yu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Qp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $c(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var _d={clone:Gi,merge:Zt},em=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=em,this.fragmentShader=tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=Qp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ge().setHex(s.value);break;case"v2":this.uniforms[n].value=new oe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},no=class extends Nn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Dn=class extends Zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gr,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends Dn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ii('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ii('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Tr=class extends Zn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gr,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=vo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},io=class extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},so=class extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ls(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Pa(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var mi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ro=class extends mi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cc,endingEnd:cc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hc:r=e,o=2*t-n;break;case uc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hc:a=e,l=2*n-t;break;case uc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),M=g*g,m=M*g,p=-u*m+2*u*M-u*g,x=(1+u)*m+(-1.5-2*u)*M+(-.5+u)*g+1,w=(-1-f)*m+(1.5+f)*M+.5*g,y=f*m-f*M;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+x*a[c+A]+w*a[l+A]+y*a[d+A];return r}},ao=class extends mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},oo=class extends mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},lo=class extends mi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(s-t),M=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*M+a[l+m]*g;return r}let u=o*2,f=e-1;for(let g=0;g!==o;++g){let M=a[c+g],m=a[l+g],p=f*u+g*2,x=d[p],w=d[p+1],y=e*u+g*2,A=h[y],E=h[y+1],_=im(n,t,x,A,s);r[g]=xd(_,M,w,E,m)}return r}};function xd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function nm(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function im(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=xd(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=nm(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var fn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ls(t,this.TimeBufferType),this.values=ls(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ls(e.times,Array),values:ls(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Pa(e.settings)&&(n.settings={inTangents:ls(e.settings.inTangents,Array),outTangents:ls(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new lo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case tr:t=this.InterpolantFactoryMethodDiscrete;break;case Va:t=this.InterpolantFactoryMethodLinear;break;case Na:t=this.InterpolantFactoryMethodSmooth;break;case lc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return Va;case this.InterpolantFactoryMethodSmooth:return Na;case this.InterpolantFactoryMethodBezier:return lc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Pa(this.settings)&&(Mu(this.settings.inTangents,e),Mu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Pa(this.settings)&&(Su(this.settings.inTangents,e),Su(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ve("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ve("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&qf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ve("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Na,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let M=t[d+g];if(M!==t[u+g]||M!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Pa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Mu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Su(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Va;var gi=class extends fn{constructor(e,t,n){super(e,t,n)}};gi.prototype.ValueTypeName="bool";gi.prototype.ValueBufferType=Array;gi.prototype.DefaultInterpolation=tr;gi.prototype.InterpolantFactoryMethodLinear=void 0;gi.prototype.InterpolantFactoryMethodSmooth=void 0;var co=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};co.prototype.ValueTypeName="color";var ho=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};ho.prototype.ValueTypeName="number";var uo=class extends mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)gn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ar=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new uo(this.times,this.values,this.getValueSize(),e)}};Ar.prototype.ValueTypeName="quaternion";Ar.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends fn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="string";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=tr;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var fo=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};fo.prototype.ValueTypeName="vector";var po=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},vd=new po,mo=class{constructor(e){this.manager=e!==void 0?e:vd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};mo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rr=class extends Ht{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Cr=class extends Rr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},oc=new ht,bu=new U,wu=new U,go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pi,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(bu),wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){oc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(oc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ps||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ia=new U,La=new gn,Rn=new U,Pr=class extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ia,La,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,La,Rn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ia,La,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,La,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new U,Eu=new oe,Tu=new oe,Kt=class extends Pr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gs*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,Eu,Tu),t.subVectors(Tu,Eu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ir=class extends Pr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},gc=class extends go{constructor(){super(new Ir(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xi=class extends Rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new gc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var cs=-90,hs=1,Ts=class extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Kt(cs,hs,e,t);s.layers=this.layers,this.add(s);let r=new Kt(cs,hs,e,t);r.layers=this.layers,this.add(r);let a=new Kt(cs,hs,e,t);a.layers=this.layers,this.add(a);let o=new Kt(cs,hs,e,t);o.layers=this.layers,this.add(o);let l=new Kt(cs,hs,e,t);l.layers=this.layers,this.add(l);let c=new Kt(cs,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=M,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},_o=class extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Lr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=sm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function sm(){this._document.hidden===!1&&this.reset()}var Zc="\\[\\]\\.:\\/",rm=new RegExp("["+Zc+"]","g"),Jc="[^"+Zc+"]",am="[^"+Zc.replace("\\.","")+"]",om=/((?:WC+[\/:])*)/.source.replace("WC",Jc),lm=/(WCOD+)?/.source.replace("WCOD",am),cm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jc),hm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jc),um=new RegExp("^"+om+lm+cm+hm+"$"),dm=["material","materials","bones","map"],_c=class{constructor(e,t,n){let s=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(rm,"")}static parseTrackName(e){let t=um.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);dm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=_c;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wv=new Float32Array(1);var nh=class nh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};nh.prototype.isMatrix2=!0;var xc=nh;function Kc(i,e,t,n){let s=fm(n);switch(t){case Fc:return i*e;case To:return i*e/s.components*s.byteLength;case Ao:return i*e/s.components*s.byteLength;case yi:return i*e*2/s.components*s.byteLength;case Ro:return i*e*2/s.components*s.byteLength;case Oc:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case Co:return i*e*4/s.components*s.byteLength;case Fr:case Or:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Br:case kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Io:case No:return Math.max(i,16)*Math.max(e,8)/4;case Po:case Lo:return Math.max(i,8)*Math.max(e,8)/2;case Do:case Uo:case Oo:case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fo:case zr:case ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ho:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case qo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $o:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case jo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Qo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case el:case tl:case nl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case il:case sl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Hr:case rl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fm(i){switch(i){case sn:case Lc:return{byteLength:1,components:1};case Ps:case Nc:case En:return{byteLength:2,components:1};case wo:case Eo:return{byteLength:2,components:4};case wn:case bo:case _n:return{byteLength:4,components:1};case Dc:case Uc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Hd(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function mm(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],M=d[f];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,d[u]=M)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let M=d[f];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var gm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_m=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ym=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Am=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,km=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",qm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ym=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Zm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ng=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ag=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,og=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,lg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_g=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,xg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Eg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ag=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ig=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ng=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Dg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Og=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$g=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,jg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,e0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,t0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,n0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,i0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,s0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,r0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,l0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,c0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,h0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,p0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,m0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,g0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,S0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,b0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,w0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,P0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,D0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,F0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,O0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,z0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Y0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:gm,alphahash_pars_fragment:_m,alphamap_fragment:xm,alphamap_pars_fragment:vm,alphatest_fragment:ym,alphatest_pars_fragment:Mm,aomap_fragment:Sm,aomap_pars_fragment:bm,batching_pars_vertex:wm,batching_vertex:Em,begin_vertex:Tm,beginnormal_vertex:Am,bsdfs:Rm,iridescence_fragment:Cm,bumpmap_pars_fragment:Pm,clipping_planes_fragment:Im,clipping_planes_pars_fragment:Lm,clipping_planes_pars_vertex:Nm,clipping_planes_vertex:Dm,color_fragment:Um,color_pars_fragment:Fm,color_pars_vertex:Om,color_vertex:Bm,common:km,defaultnormal_vertex:zm,displacementmap_pars_vertex:Hm,displacementmap_vertex:Gm,emissivemap_fragment:Vm,emissivemap_pars_fragment:Wm,colorspace_fragment:Xm,colorspace_pars_fragment:qm,envmap_fragment:Ym,envmap_common_pars_fragment:$m,envmap_pars_fragment:Zm,envmap_pars_vertex:Jm,envmap_physical_pars_fragment:og,envmap_vertex:Km,fog_vertex:jm,fog_pars_vertex:Qm,fog_fragment:eg,fog_pars_fragment:tg,gradientmap_pars_fragment:ng,lightmap_pars_fragment:ig,lights_lambert_fragment:sg,lights_lambert_pars_fragment:rg,lights_pars_begin:ag,lights_toon_fragment:lg,lights_toon_pars_fragment:cg,lights_phong_fragment:hg,lights_phong_pars_fragment:ug,lights_physical_fragment:dg,lights_physical_pars_fragment:fg,lights_fragment_begin:pg,lights_fragment_maps:mg,lights_fragment_end:gg,lightprobes_pars_fragment:_g,logdepthbuf_fragment:xg,logdepthbuf_pars_fragment:vg,logdepthbuf_pars_vertex:yg,logdepthbuf_vertex:Mg,map_fragment:Sg,map_pars_fragment:bg,map_particle_fragment:wg,map_particle_pars_fragment:Eg,metalnessmap_fragment:Tg,metalnessmap_pars_fragment:Ag,morphinstance_vertex:Rg,morphcolor_vertex:Cg,morphnormal_vertex:Pg,morphtarget_pars_vertex:Ig,morphtarget_vertex:Lg,normal_fragment_begin:Ng,normal_fragment_maps:Dg,normal_pars_fragment:Ug,normal_pars_vertex:Fg,normal_vertex:Og,normalmap_pars_fragment:Bg,clearcoat_normal_fragment_begin:kg,clearcoat_normal_fragment_maps:zg,clearcoat_pars_fragment:Hg,iridescence_pars_fragment:Gg,opaque_fragment:Vg,packing:Wg,premultiplied_alpha_fragment:Xg,project_vertex:qg,dithering_fragment:Yg,dithering_pars_fragment:$g,roughnessmap_fragment:Zg,roughnessmap_pars_fragment:Jg,shadowmap_pars_fragment:Kg,shadowmap_pars_vertex:jg,shadowmap_vertex:Qg,shadowmask_pars_fragment:e0,skinbase_vertex:t0,skinning_pars_vertex:n0,skinning_vertex:i0,skinnormal_vertex:s0,specularmap_fragment:r0,specularmap_pars_fragment:a0,tonemapping_fragment:o0,tonemapping_pars_fragment:l0,transmission_fragment:c0,transmission_pars_fragment:h0,uv_pars_fragment:u0,uv_pars_vertex:d0,uv_vertex:f0,worldpos_vertex:p0,background_vert:m0,background_frag:g0,backgroundCube_vert:_0,backgroundCube_frag:x0,cube_vert:v0,cube_frag:y0,depth_vert:M0,depth_frag:S0,distance_vert:b0,distance_frag:w0,equirect_vert:E0,equirect_frag:T0,linedashed_vert:A0,linedashed_frag:R0,meshbasic_vert:C0,meshbasic_frag:P0,meshlambert_vert:I0,meshlambert_frag:L0,meshmatcap_vert:N0,meshmatcap_frag:D0,meshnormal_vert:U0,meshnormal_frag:F0,meshphong_vert:O0,meshphong_frag:B0,meshphysical_vert:k0,meshphysical_frag:z0,meshtoon_vert:H0,meshtoon_frag:G0,points_vert:V0,points_frag:W0,shadow_vert:X0,shadow_frag:q0,sprite_vert:Y0,sprite_frag:$0},be={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},On={basic:{uniforms:Zt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Zt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ge(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Zt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Zt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Zt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ge(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Zt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Zt([be.points,be.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Zt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Zt([be.common,be.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Zt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Zt([be.sprite,be.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Zt([be.common,be.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Zt([be.lights,be.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};On.physical={uniforms:Zt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var al={r:0,b:0,g:0},Z0=new ht,Gd=new Xe;Gd.set(-1,0,0,0,1,0,0,0,1);function J0(i,e,t,n,s,r){let a=new Ge(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(x){let w=x.isScene===!0?x.background:null;if(w&&w.isTexture){let y=x.backgroundBlurriness>0;w=e.get(w,y)}return w}function g(x){let w=!1,y=f(x);y===null?m(a,o):y&&y.isColor&&(m(y,1),w=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(x,w){let y=f(w);y&&y.isCubeTexture?(c===void 0&&(c=new Ze(new Ms(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Gi(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,E,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Gd),c.material.toneMapped=ot.getTransfer(y.colorSpace)!==pt,(h!==y||d!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ze(new Fi(2,2),new Nn({name:"BackgroundMaterial",uniforms:Gi(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ot.getTransfer(y.colorSpace)!==pt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,w){x.getRGB(al,$c(i)),t.buffers.color.setClear(al.r,al.g,al.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,w=1){a.set(x),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:g,addToRenderList:M,dispose:p}}function K0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(N,O,X,I,G){let Y=!1,V=d(N,I,X,O);r!==V&&(r=V,c(r.object)),Y=f(N,I,X,G),Y&&g(N,I,X,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(N,O,X,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,O,X,I){let G=I.wireframe===!0,Y=n[O.id];Y===void 0&&(Y={},n[O.id]=Y);let V=N.isInstancedMesh===!0?N.id:0,se=Y[V];se===void 0&&(se={},Y[V]=se);let q=se[X.id];q===void 0&&(q={},se[X.id]=q);let Q=q[G];return Q===void 0&&(Q=u(l()),q[G]=Q),Q}function u(N){let O=[],X=[],I=[];for(let G=0;G<t;G++)O[G]=0,X[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:I,object:N,attributes:{},index:null}}function f(N,O,X,I){let G=r.attributes,Y=O.attributes,V=0,se=X.getAttributes();for(let q in se)if(se[q].location>=0){let ne=G[q],Te=Y[q];if(Te===void 0&&(q==="instanceMatrix"&&N.instanceMatrix&&(Te=N.instanceMatrix),q==="instanceColor"&&N.instanceColor&&(Te=N.instanceColor)),ne===void 0||ne.attribute!==Te||Te&&ne.data!==Te.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function g(N,O,X,I){let G={},Y=O.attributes,V=0,se=X.getAttributes();for(let q in se)if(se[q].location>=0){let ne=Y[q];ne===void 0&&(q==="instanceMatrix"&&N.instanceMatrix&&(ne=N.instanceMatrix),q==="instanceColor"&&N.instanceColor&&(ne=N.instanceColor));let Te={};Te.attribute=ne,ne&&ne.data&&(Te.data=ne.data),G[q]=Te,V++}r.attributes=G,r.attributesNum=V,r.index=I}function M(){let N=r.newAttributes;for(let O=0,X=N.length;O<X;O++)N[O]=0}function m(N){p(N,0)}function p(N,O){let X=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;X[N]=1,I[N]===0&&(i.enableVertexAttribArray(N),I[N]=1),G[N]!==O&&(i.vertexAttribDivisor(N,O),G[N]=O)}function x(){let N=r.newAttributes,O=r.enabledAttributes;for(let X=0,I=O.length;X<I;X++)O[X]!==N[X]&&(i.disableVertexAttribArray(X),O[X]=0)}function w(N,O,X,I,G,Y,V){V===!0?i.vertexAttribIPointer(N,O,X,G,Y):i.vertexAttribPointer(N,O,X,I,G,Y)}function y(N,O,X,I){M();let G=I.attributes,Y=X.getAttributes(),V=O.defaultAttributeValues;for(let se in Y){let q=Y[se];if(q.location>=0){let Q=G[se];if(Q===void 0&&(se==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),se==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){let ne=Q.normalized,Te=Q.itemSize,Be=e.get(Q);if(Be===void 0)continue;let Z=Be.buffer,ye=Be.type,Ae=Be.bytesPerElement,Ue=ye===i.INT||ye===i.UNSIGNED_INT||Q.gpuType===bo;if(Q.isInterleavedBufferAttribute){let Me=Q.data,Fe=Me.isInterleavedBuffer===!0?Me.stride:Me.itemSize,Mt=Q.offset;if(Me.isInstancedInterleavedBuffer||Me.isInstancedBufferAttribute){for(let ze=0;ze<q.locationSize;ze++)p(q.location+ze,Me.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let ze=0;ze<q.locationSize;ze++)m(q.location+ze);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let ze=0;ze<q.locationSize;ze++)w(q.location+ze,Te/q.locationSize,ye,ne,Fe*Ae,(Mt+Te/q.locationSize*ze)*Ae,Ue)}else{if(Q.isInstancedBufferAttribute){for(let Me=0;Me<q.locationSize;Me++)p(q.location+Me,Q.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Me=0;Me<q.locationSize;Me++)m(q.location+Me);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Me=0;Me<q.locationSize;Me++)w(q.location+Me,Te/q.locationSize,ye,ne,Te*Ae,Te/q.locationSize*Me*Ae,Ue)}}else if(V!==void 0){let ne=V[se];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(q.location,ne);break;case 3:i.vertexAttrib3fv(q.location,ne);break;case 4:i.vertexAttrib4fv(q.location,ne);break;default:i.vertexAttrib1fv(q.location,ne)}}}}x()}function A(){L();for(let N in n){let O=n[N];for(let X in O){let I=O[X];for(let G in I){let Y=I[G];for(let V in Y)h(Y[V].object),delete Y[V];delete I[G]}}delete n[N]}}function E(N){if(n[N.id]===void 0)return;let O=n[N.id];for(let X in O){let I=O[X];for(let G in I){let Y=I[G];for(let V in Y)h(Y[V].object),delete Y[V];delete I[G]}}delete n[N.id]}function _(N){for(let O in n){let X=n[O];for(let I in X){let G=X[I];if(G[N.id]===void 0)continue;let Y=G[N.id];for(let V in Y)h(Y[V].object),delete Y[V];delete G[N.id]}}}function S(N){for(let O in n){let X=n[O],I=N.isInstancedMesh===!0?N.id:0,G=X[I];if(G!==void 0){for(let Y in G){let V=G[Y];for(let se in V)h(V[se].object),delete V[se];delete G[Y]}delete X[I],Object.keys(X).length===0&&delete n[O]}}}function L(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:_,initAttributes:M,enableAttribute:m,disableUnusedAttributes:x}}function j0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Q0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==Tn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){let S=_===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==sn&&_!==_n&&!S&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&He("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:y,maxSamples:A,samples:E}}function e_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Sn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let x=r?0:n,w=x*4,y=p.clippingState||null;l.value=y,y=h(g,u,w,f);for(let A=0;A!==w;++A)y[A]=t[A];p.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let M=d!==null?d.length:0,m=null;if(M!==0){if(m=l.value,g!==!0||m===null){let p=f+M*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=f;w!==M;++w,y+=4)a.copy(d[w]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}var Xr=class extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ms(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Oi});r.uniforms.tEquirect.value=t;let a=new Ze(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=jt),new Ts(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},yd=256,t_=3,n_=20,Vd=256,Wd=16,i_=3,s_=new U,r_=new Ge,ll=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ts(1,10,null),this._boxMesh=new Ze(new Ms(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=s_}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,M=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(e.background=l.getClearColor(r_));let m=new Ts(n,s,h);return m.position.copy(o),m.update(l,e),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=g,e.background=M,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(yd,Wc(e))}_fromTexture(e,t){e.mapping===ki||e.mapping===Cs?this._setSize(e.image.length===0?yd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Md(e,!1,!1),n=Math.log2(e)-t_;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Md(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ki||e.mapping===Cs?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Sd()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=a_(),this._integrationMaterial=o_());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Wd);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-i_)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Vd*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=l_());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Md(i,e,t){return new Xr(i,{minFilter:Kn,generateMipmaps:e,type:En,colorSpace:nr,depthBuffer:t})}function qr(i,e,t){return new Nn({name:i,uniforms:e,vertexShader:je.cube_vert,fragmentShader:t,side:tn,blending:Oi,depthTest:!1,depthWrite:!1})}function a_(){return qr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Vd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function o_(){return qr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Wd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function l_(){return qr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${n_}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Sd(){return qr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function bd(){return qr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function c_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===yo||f===Mo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let M=new Xr(g.height);return M.fromEquirectangularTexture(i,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let f=u.mapping,g=f===yo||f===Mo,M=f===ki||f===Cs;if(g||M){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ll(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let x=u.image;return g&&x&&x.height>0||M&&x&&l(x)?(n===null&&(n=new ll(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===yo?u.mapping=ki:f===Mo&&(u.mapping=Cs),u}function l(u){let f=0,g=6;for(let M=0;M<g;M++)u[M]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function h_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ii("WebGLRenderer: "+n+" extension not supported."),s}}}function u_(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let M=r.get(g);M&&(e.remove(M),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,M){return s[M.id]!==void 0||(M.addEventListener("dispose",o),s[M.id]=new WeakRef(M),a.register(M,M.id,M),t.memory.geometries++),M}function h(g){let M=g.attributes;for(let m in M)e.update(M[m],i.ARRAY_BUFFER)}function d(g){let M=g.index,m=g.attributes.position,p=0;if(m===void 0)return;let x=M!==null?M.array.length:m.array.length/3-1,w=m.count>=65535?cr:lr,y=new w(Math.ceil(x/3)*6,1),A=y.array;if(M!==null){let _=M.array;p=M.version;for(let S=0,L=0;S<x;S+=3){let C=_[S+0],N=_[S+1],O=_[S+2];A[L++]=C,A[L++]=N,A[L++]=N,A[L++]=O,A[L++]=O,A[L++]=C}}else{p=m.version;for(let _=0,S=0;_<x;_+=3){let L=_+0,C=_+1,N=_+2;A[S++]=L,A[S++]=C,A[S++]=C,A[S++]=N,A[S++]=N,A[S++]=L}}y.version=p;let E=r.get(g);E&&e.remove(E),r.set(g,y)}function u(g){let M=r.get(g);if(M){let m=g.index;m!==null&&M.version<m.version&&d(g)}else d(g);return r.get(g)}function f(){for(let g in s){let M=s[g].deref();M!==void 0&&l(M)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function d_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let M=0;for(let m=0;m<f;m++)M+=u[m];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function f_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function p_(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let L=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",L)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),M===!0&&(w=3);let y=o.attributes.position.count*w,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*A*4*d),_=new rr(E,y,A,d);_.type=_n,_.needsUpdate=!0;let S=w*4;for(let C=0;C<d;C++){let N=m[C],O=p[C],X=x[C],I=y*A*4*C;for(let G=0;G<N.count;G++){let Y=G*S;f===!0&&(s.fromBufferAttribute(N,G),E[I+Y+0]=s.x,E[I+Y+1]=s.y,E[I+Y+2]=s.z,E[I+Y+3]=0),g===!0&&(s.fromBufferAttribute(O,G),E[I+Y+4]=s.x,E[I+Y+5]=s.y,E[I+Y+6]=s.z,E[I+Y+7]=0),M===!0&&(s.fromBufferAttribute(X,G),E[I+Y+8]=s.x,E[I+Y+9]=s.y,E[I+Y+10]=s.z,E[I+Y+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new oe(y,A)},n.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let M=0;M<c.length;M++)f+=c[M];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function m_(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var g_={[Ec]:"LINEAR_TONE_MAPPING",[Tc]:"REINHARD_TONE_MAPPING",[Ac]:"CINEON_TONE_MAPPING",[Dr]:"ACES_FILMIC_TONE_MAPPING",[Cc]:"AGX_TONE_MAPPING",[Pc]:"NEUTRAL_TONE_MAPPING",[Rc]:"CUSTOM_TONE_MAPPING"};function __(i,e,t,n,s,r){let a=new cn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new en;h.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new dt([0,2,0,0,2,0],2));let d=new no({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ze(h,d),f=new Ir(-1,1,1,-1,0,1),g=null,M=null,m=!1,p,x=null,w=[],y=!1;this.setSize=function(A,E){a.setSize(A,E),o!==null&&o.setSize(A,E),l!==null&&l.setSize(A,E);for(let _=0;_<w.length;_++){let S=w[_];S.setSize&&S.setSize(A,E)}},this.setEffects=function(A){w=A,y=w.length>0&&w[0].isRenderPass===!0;let E=a.width,_=a.height;w.length>0&&o===null&&(o=new cn(E,_,{type:En,depthBuffer:!1,stencilBuffer:!1}),l=new cn(E,_,{type:En,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&w.some(L=>L.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new Jn(E,_),r===!0&&(c.format=jn,c.type=zi)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let L=0;L<w.length;L++){let C=w[L];C.setSize&&C.setSize(E,_),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(A,E){if(m||A.toneMapping===Un&&w.length===0)return!1;if(x=E,E!==null){let _=E.width,S=E.height;(a.width!==_||a.height!==S)&&this.setSize(_,S)}return y===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=Un,!0},this.hasRenderPass=function(){return y},this.end=function(A,E){A.toneMapping=p,m=!0;let _=a,S=o;for(let L=0;L<w.length;L++){let C=w[L];C.enabled!==!1&&(C.render(A,S,_,E),C.needsSwap!==!1&&(_=S,S=S===o?l:o))}if(g!==A.outputColorSpace||M!==A.toneMapping){g=A.outputColorSpace,M=A.toneMapping,d.defines={},ot.getTransfer(g)===pt&&(d.defines.SRGB_TRANSFER="");let L=g_[M];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=_.texture,A.setRenderTarget(x),A.render(u,f),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var Xd=new Qt,qd=new Jn(1,1),Yd=new fr(1),$d=new rr,Zd=new qa,Jd=new dr,wd=[],Ed=[],Td=new Float32Array(16),Ad=new Float32Array(9),Rd=new Float32Array(4);function Ls(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=wd[s];if(r===void 0&&(r=new Float32Array(s),wd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hl(i,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function x_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function v_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function y_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function M_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function S_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;Rd.set(n),i.uniformMatrix2fv(this.addr,!1,Rd),Dt(t,n)}}function b_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;Ad.set(n),i.uniformMatrix3fv(this.addr,!1,Ad),Dt(t,n)}}function w_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,n))return;Td.set(n),i.uniformMatrix4fv(this.addr,!1,Td),Dt(t,n)}}function E_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function T_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function A_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function R_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function C_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function P_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function I_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function L_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function ul(i){return i.version===0&&(i.compareFunction=zc,i.needsUpdate=!0),i}function N_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ul(qd):r=Xd,t.setTexture2D(e||r,s)}function D_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Zd,s)}function U_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ul(Yd):r=Jd,t.setTextureCube(e||r,s)}function F_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||$d,s)}function O_(i){switch(i){case 5126:return x_;case 35664:return v_;case 35665:return y_;case 35666:return M_;case 35674:return S_;case 35675:return b_;case 35676:return w_;case 5124:case 35670:return E_;case 35667:case 35671:return T_;case 35668:case 35672:return A_;case 35669:case 35673:return R_;case 5125:return C_;case 36294:return P_;case 36295:return I_;case 36296:return L_;case 35678:case 36198:case 36298:case 36306:case 35682:return N_;case 35679:case 36299:case 36307:return D_;case 35680:case 36300:case 36308:case 36293:return U_;case 36289:case 36303:case 36311:case 36292:return F_}}function B_(i,e){i.uniform1fv(this.addr,e)}function k_(i,e){let t=Ls(e,this.size,2);i.uniform2fv(this.addr,t)}function z_(i,e){let t=Ls(e,this.size,3);i.uniform3fv(this.addr,t)}function H_(i,e){let t=Ls(e,this.size,4);i.uniform4fv(this.addr,t)}function G_(i,e){let t=Ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function V_(i,e){let t=Ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function W_(i,e){let t=Ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function X_(i,e){i.uniform1iv(this.addr,e)}function q_(i,e){i.uniform2iv(this.addr,e)}function Y_(i,e){i.uniform3iv(this.addr,e)}function $_(i,e){i.uniform4iv(this.addr,e)}function Z_(i,e){i.uniform1uiv(this.addr,e)}function J_(i,e){i.uniform2uiv(this.addr,e)}function K_(i,e){i.uniform3uiv(this.addr,e)}function j_(i,e){i.uniform4uiv(this.addr,e)}function Q_(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ul(qd):a=Xd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function ex(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Zd,r[a])}function tx(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ul(Yd):a=Jd;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function nx(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||$d,r[a])}function ix(i){switch(i){case 5126:return B_;case 35664:return k_;case 35665:return z_;case 35666:return H_;case 35674:return G_;case 35675:return V_;case 35676:return W_;case 5124:case 35670:return X_;case 35667:case 35671:return q_;case 35668:case 35672:return Y_;case 35669:case 35673:return $_;case 5125:return Z_;case 36294:return J_;case 36295:return K_;case 36296:return j_;case 35678:case 36198:case 36298:case 36306:case 35682:return Q_;case 35679:case 36299:case 36307:return ex;case 35680:case 36300:case 36308:case 36293:return tx;case 36289:case 36303:case 36311:case 36292:return nx}}var rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=O_(t.type)}},ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ix(t.type)}},oh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ih=/(\w+)(\])?(\[|\.)?/g;function Cd(i,e){i.seq.push(e),i.map[e.id]=e}function sx(i,e,t){let n=i.name,s=n.length;for(ih.lastIndex=0;;){let r=ih.exec(n),a=ih.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Cd(t,c===void 0?new rh(o,i,e):new ah(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new oh(o),Cd(t,d)),t=d}}}var Is=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Pd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var rx=37297,ax=0;function ox(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Id=new Xe;function lx(i){ot._getMatrix(Id,ot.workingColorSpace,i);let e=`mat3( ${Id.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case ir:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ld(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ox(i.getShaderSource(e),o)}else return r}function cx(i,e){let t=lx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var hx={[Ec]:"Linear",[Tc]:"Reinhard",[Ac]:"Cineon",[Dr]:"ACESFilmic",[Cc]:"AgX",[Pc]:"Neutral",[Rc]:"Custom"};function ux(i,e){let t=hx[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ol=new U;function dx(){ot.getLuminanceCoefficients(ol);let i=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function px(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Wr(i){return i!==""}function Nd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Dd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var gx=/^[ \t]*#include +<([\w\d./]+)>/gm;function lh(i){return i.replace(gx,_x)}function _x(i,e){let t=je[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return lh(t)}var xx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ud(i){return i.replace(xx,vx)}function vx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var yx={[Nr]:"SHADOWMAP_TYPE_PCF",[As]:"SHADOWMAP_TYPE_VSM"};function Mx(i){return yx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Sx={[Cs]:"ENVMAP_MODE_REFRACTION"};function bx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Sx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var wx={[vo]:"ENVMAP_BLENDING_MULTIPLY",[$u]:"ENVMAP_BLENDING_MIX",[Zu]:"ENVMAP_BLENDING_ADD"};function Ex(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":wx[i.combine]||"ENVMAP_BLENDING_NONE"}function Tx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Mx(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=bx(t),d=Ex(t),u=fx(t),f=px(r),g=s.createProgram(),M,m,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Wr).join(`
`),M.length>0&&(M+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Wr).join(`
`),m.length>0&&(m+=`
`)):(M=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),m=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?je.tonemapping_pars_fragment:"",t.toneMapping!==Un?ux("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,cx("linearToOutputTexel",t.outputColorSpace),dx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wr).join(`
`)),a=lh(a),a=Nd(a,t),a=Dd(a,t),o=lh(o),o=Nd(o,t),o=Dd(o,t),a=Ud(a),o=Ud(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,m=["#define varying in",t.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=p+M+a,w=p+m+o,y=Pd(s,s.VERTEX_SHADER,x),A=Pd(s,s.FRAGMENT_SHADER,w);s.attachShader(g,y),s.attachShader(g,A),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(C){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(g)||"",O=s.getShaderInfoLog(y)||"",X=s.getShaderInfoLog(A)||"",I=N.trim(),G=O.trim(),Y=X.trim(),V=!0,se=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,y,A);else{let q=Ld(s,y,"vertex"),Q=Ld(s,A,"fragment");Ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+q+`
`+Q)}else I!==""?He("WebGLProgram: Program Info Log:",I):(G===""||Y==="")&&(se=!1);se&&(C.diagnostics={runnable:V,programLog:I,vertexShader:{log:G,prefix:M},fragmentShader:{log:Y,prefix:m}})}s.deleteShader(y),s.deleteShader(A),_=new Is(s,g),S=mx(s,g)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(g,rx)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ax++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=A,this}var Ax=0,ch=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hh(e),t.set(e,n)),n}},hh=class{constructor(e){this.id=Ax++,this.code=e,this.usedTimes=0}};function Rx(i){return i===yi||i===zr||i===Hr}function Cx(i,e,t,n,s,r){let a=new ar,o=new ch,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,S,L,C,N,O){let X=C.fog,I=N.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,V=e.get(_.envMap||G,Y),se=u[_.type],q=n.precision;_.precision!==null&&(q=n.getMaxPrecision(_.precision),q!==_.precision&&He("WebGLProgram.getParameters:",_.precision,"not supported, using",q,"instead."));let Q=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ne=Q!==void 0?Q.length:0,Te=0;I.morphAttributes.position!==void 0&&(Te=1),I.morphAttributes.normal!==void 0&&(Te=2),I.morphAttributes.color!==void 0&&(Te=3);let Be,Z,ye,Ae;if(se){let Se=On[se];Be=Se.vertexShader,Z=Se.fragmentShader}else{Be=_.vertexShader,Z=_.fragmentShader;let Se=o.getVertexShaderStage(_),mt=o.getFragmentShaderStage(_);o.update(_,Se,mt),ye=Se.id,Ae=mt.id}let Ue=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Fe=N.isInstancedMesh===!0,Mt=N.isBatchedMesh===!0,ze=!!_.map,Qe=!!_.matcap,nt=!!V,te=nt&&V.isPMREMTexture===!0,de=!!_.aoMap,ce=!!_.lightMap,Ee=!!_.bumpMap&&_.wireframe===!1,ve=!!_.normalMap,Ye=!!_.displacementMap,Le=!!_.emissiveMap,it=!!_.metalnessMap,st=!!_.roughnessMap,ut=_.anisotropy>0,F=_.clearcoat>0,Rt=_.diffuseRoughness>0,tt=_.dispersion>0,_t=_.retroreflectivity>0,ge=_.iridescence>0,Tt=_.sheen>0,Oe=_.transmission>0,We=ut&&!!_.anisotropyMap,R=F&&!!_.clearcoatMap,v=F&&!!_.clearcoatNormalMap,z=F&&!!_.clearcoatRoughnessMap,re=Rt&&!!_.diffuseRoughnessMap,ee=ge&&!!_.iridescenceMap,he=ge&&!!_.iridescenceThicknessMap,_e=Tt&&!!_.sheenColorMap,J=Tt&&!!_.sheenRoughnessMap,K=!!_.specularMap,fe=!!_.specularColorMap,P=!!_.specularIntensityMap,j=Oe&&!!_.transmissionMap,$=Oe&&!!_.thicknessMap,pe=!!_.gradientMap,le=!!_.alphaMap,ue=_.alphaTest>0,Ne=!!_.alphaHash,Je=!!_.extensions,ae=Un;_.toneMapped&&(Ue===null||Ue.isXRRenderTarget===!0)&&(ae=i.toneMapping);let De=te?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,$e={shaderID:se,shaderType:_.type,shaderName:_.name,vertexShader:Be,fragmentShader:Z,defines:_.defines,customVertexShaderID:ye,customFragmentShaderID:Ae,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:q,batching:Mt,batchingColor:Mt&&N._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&N.instanceColor!==null,instancingMorph:Fe&&N.morphTexture!==null,outputColorSpace:Ue===null?i.outputColorSpace:Ue.isXRRenderTarget===!0?Ue.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ze,matcap:Qe,envMap:nt,envMapMode:nt&&V.mapping,envMapPMREM:te,envMapMaxLod:te?De.length-1:null,envMapSize:te?De[0].width:null,aoMap:de,lightMap:ce,bumpMap:Ee,normalMap:ve,displacementMap:Ye,emissiveMap:Le,normalMapObjectSpace:ve&&_.normalMapType===ju,normalMapTangentSpace:ve&&_.normalMapType===Gr,packedNormalMap:ve&&_.normalMapType===Gr&&Rx(_.normalMap.format),metalnessMap:it,roughnessMap:st,anisotropy:ut,anisotropyMap:We,clearcoat:F,clearcoatMap:R,clearcoatNormalMap:v,clearcoatRoughnessMap:z,diffuseRoughness:Rt,diffuseRoughnessMap:re,dispersion:tt,retroreflection:_t,iridescence:ge,iridescenceMap:ee,iridescenceThicknessMap:he,sheen:Tt,sheenColorMap:_e,sheenRoughnessMap:J,specularMap:K,specularColorMap:fe,specularIntensityMap:P,transmission:Oe,transmissionMap:j,thicknessMap:$,gradientMap:pe,opaque:_.transparent===!1&&_.blending===Rs&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:ue,alphaHash:Ne,combine:_.combine,mapUv:ze&&f(_.map.channel),aoMapUv:de&&f(_.aoMap.channel),lightMapUv:ce&&f(_.lightMap.channel),bumpMapUv:Ee&&f(_.bumpMap.channel),normalMapUv:ve&&f(_.normalMap.channel),displacementMapUv:Ye&&f(_.displacementMap.channel),emissiveMapUv:Le&&f(_.emissiveMap.channel),metalnessMapUv:it&&f(_.metalnessMap.channel),roughnessMapUv:st&&f(_.roughnessMap.channel),anisotropyMapUv:We&&f(_.anisotropyMap.channel),clearcoatMapUv:R&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:ee&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:he&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:J&&f(_.sheenRoughnessMap.channel),specularMapUv:K&&f(_.specularMap.channel),specularColorMapUv:fe&&f(_.specularColorMap.channel),specularIntensityMapUv:P&&f(_.specularIntensityMap.channel),transmissionMapUv:j&&f(_.transmissionMap.channel),thicknessMapUv:$&&f(_.thicknessMap.channel),alphaMapUv:le&&f(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ve||ut),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(ze||le),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&ve===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Me,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Te,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:O.filter(Se=>Se.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:ze&&_.map.isVideoTexture===!0&&ot.getTransfer(_.map.colorSpace)===pt,decodeVideoTextureEmissive:Le&&_.emissiveMap.isVideoTexture===!0&&ot.getTransfer(_.emissiveMap.colorSpace)===pt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===nn,flipSided:_.side===tn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Je&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&_.extensions.multiDraw===!0||Mt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return $e.vertexUv1s=l.has(1),$e.vertexUv2s=l.has(2),$e.vertexUv3s=l.has(3),l.clear(),$e}function M(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let L in _.defines)S.push(L),S.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(m(S,_),p(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function m(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapPMREM),_.push(S.envMapMaxLod),_.push(S.envMapSize),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.diffuseRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.numLightProbeGrids),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function p(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function x(_){let S=u[_.type],L;if(S){let C=On[S];L=_d.clone(C.uniforms)}else L=_.uniforms;return L}function w(_,S){let L=h.get(S);return L!==void 0?++L.usedTimes:(L=new Tx(i,S,_,s),c.push(L),h.set(S,L)),L}function y(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function E(){o.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:x,acquireProgram:w,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:E}}function Px(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ix(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Od(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Bd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,M,m,p){let x=i[e];return x===void 0?(x={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:p},i[e]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=g,x.materialVariant=a(u),x.groupOrder=M,x.renderOrder=u.renderOrder,x.z=m,x.group=p),e++,x}function l(u,f,g,M,m,p,x){x.reversedDepth===!0&&(m=-m);let w=o(u,f,g,M,m,p);g.transmission>0?n.push(w):g.transparent===!0?s.push(w):t.push(w)}function c(u,f,g,M,m,p){let x=o(u,f,g,M,m,p);g.transmission>0?n.unshift(x):g.transparent===!0?s.unshift(x):t.unshift(x)}function h(u,f){t.length>1&&t.sort(u||Ix),n.length>1&&n.sort(f||Od),s.length>1&&s.sort(f||Od)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Lx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Bd,i.set(n,[a])):s>=r.length?(a=new Bd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Nx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new U,color:new Ge};break;case"SpotLight":t={position:new U,direction:new U,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Dx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Ux=0;function Fx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ox(i){let e=new Nx,t=Dx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new ht,a=new ht;function o(c){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,g=0,M=0,m=0,p=0,x=0,w=0,y=0,A=0,E=0,_=0,S=0,L=0,C=0;c.sort(Fx);for(let O=0,X=c.length;O<X;O++){let I=c[O],G=I.color,Y=I.intensity,V=I.distance,se=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===yi?se=I.shadow.map.texture:se=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*Y,d+=G.g*Y,u+=G.b*Y;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],Y);C++}else if(I.isSunLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,ne=t.get(I);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=ne,n.sunShadowMap[g]=se;let Te=Q.getViewportCount();for(let Be=0;Be<Te;Be++)n.sunShadowMatrix[M+Be]=Q.getMatrix(Be),n.sunShadowCascade[M+Be]=Q._cascadeData[Be];M+=Te,g++}n.sun[f]=q,f++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,ne=t.get(I);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,n.directionalShadow[m]=ne,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=I.shadow.matrix,A++}n.directional[m]=q,m++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(G).multiplyScalar(Y),q.distance=V,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[x]=q;let Q=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,Q.updateMatrices(I),I.castShadow&&L++),n.spotLightMatrix[x]=Q.matrix,I.castShadow){let ne=t.get(I);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,n.spotShadow[x]=ne,n.spotShadowMap[x]=se,_++}x++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(G).multiplyScalar(Y),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[w]=q,w++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let Q=I.shadow,ne=t.get(I);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,ne.shadowCameraNear=Q.camera.near,ne.shadowCameraFar=Q.camera.far,n.pointShadow[p]=ne,n.pointShadowMap[p]=se,n.pointShadowMatrix[p]=I.shadow.matrix,E++}n.point[p]=q,p++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(Y),q.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[y]=q,y++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let N=n.hash;(N.sunLength!==f||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==x||N.rectAreaLength!==w||N.hemiLength!==y||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==E||N.numSpotShadows!==_||N.numSpotMaps!==S||N.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=m,n.spot.length=x,n.rectArea.length=w,n.point.length=p,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+S-L,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=C,N.sunLength=f,N.directionalLength=m,N.pointLength=p,N.spotLength=x,N.rectAreaLength=w,N.hemiLength=y,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=E,N.numSpotShadows=_,N.numSpotMaps=S,N.numLightProbes=C,n.version=Ux++)}function l(c,h){let d=0,u=0,f=0,g=0,M=0,m=0,p=h.matrixWorldInverse;for(let x=0,w=c.length;x<w;x++){let y=c[x];if(y.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),u++}else if(y.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let A=n.rectArea[M];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function kd(i){let e=new Ox(i),t=[],n=[],s=[];function r(d){h.camera=d,t.length=0,n.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):t.push(d)}function o(d){n.push(d)}function l(){e.setup(t),s.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Bx(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new kd(i),e.set(s,[o])):r>=a.length?(o=new kd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Hx=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Gx=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],zd=new ht,Vr=new U,sh=new U;function Vx(i,e,t){let n=new pi,s=new oe,r=new oe,a=new bt,o=new io,l=new so,c={},h=t.maxTextureSize,d={[vi]:tn,[tn]:vi,[nn]:nn},u=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:kx,fragmentShader:zx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new en;g.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new Ze(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nr;let p=this.type;this.render=function(E,_,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Cu&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Nr);let L=i.getRenderTarget(),C=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Oi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let X=p!==this.type;X&&_.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=E.length;I<G;I++){let Y=E[I],V=Y.shadow;if(V===void 0){He("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let se=V.getFrameExtents();s.multiply(se),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/se.x),s.x=r.x*se.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/se.y),s.y=r.y*se.y,V.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=q,V.map===null||X===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===As){if(Y.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new cn(s.x,s.y,{format:yi,type:En,minFilter:jt,magFilter:jt,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new Jn(s.x,s.y,_n),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=$n,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=zt,V.map.depthTexture.magFilter=zt}else Y.isPointLight?(V.map=new Xr(s.x),V.map.depthTexture=new fr(s.x,wn)):(V.map=new cn(s.x,s.y),V.map.depthTexture=new Jn(s.x,s.y,wn)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=$n,this.type===Nr?(V.map.depthTexture.compareFunction=q?kc:Bc,V.map.depthTexture.minFilter=jt,V.map.depthTexture.magFilter=jt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=zt,V.map.depthTexture.magFilter=zt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let Q=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Y.isPointLight!==!0&&V.updateMatrices(Y,S);let ne=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:S.layers;for(let Te=0;Te<Q;Te++){let Be=V.getCamera(Te);if(Y.isPointLight){let Z=V.camera,ye=V.matrix,Ae=Y.distance||Z.far;Ae!==Z.far&&(Z.far=Ae,Z.updateProjectionMatrix()),Vr.setFromMatrixPosition(Y.matrixWorld),Z.position.copy(Vr),sh.copy(Z.position),sh.add(Hx[Te]),Z.up.copy(Gx[Te]),Z.lookAt(sh),Z.updateMatrixWorld(),ye.makeTranslation(-Vr.x,-Vr.y,-Vr.z),zd.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),V._frustum.setFromProjectionMatrix(zd,Z.coordinateSystem,Z.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,Te),i.clear();else{Te===0&&(i.setRenderTarget(V.map),i.clear());let Z=V.getViewport(Te);a.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),O.viewport(a)}n=V.getFrustum(Te),y(_,S,Be,Y,ne,this.type)}V.isPointLightShadow!==!0&&this.type===As&&x(V,S),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(L,C,N)};function x(E,_){let S=e.update(M);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new cn(s.x,s.y,{format:yi,type:En}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(_,null,S,u,M,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(_,null,S,f,M,null)}function w(E,_,S,L){let C=null,N=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)C=N;else if(C=S.isPointLight===!0?l:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let O=C.uuid,X=_.uuid,I=c[O];I===void 0&&(I={},c[O]=I);let G=I[X];G===void 0&&(G=C.clone(),I[X]=G,_.addEventListener("dispose",A)),C=G}if(C.visible=_.visible,C.wireframe=_.wireframe,L===As?C.side=_.shadowSide!==null?_.shadowSide:_.side:C.side=_.shadowSide!==null?_.shadowSide:d[_.side],C.alphaMap=_.alphaMap,C.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,C.map=_.map,C.clipShadows=_.clipShadows,C.clippingPlanes=_.clippingPlanes,C.clipIntersection=_.clipIntersection,C.displacementMap=_.displacementMap,C.displacementScale=_.displacementScale,C.displacementBias=_.displacementBias,C.wireframeLinewidth=_.wireframeLinewidth,C.linewidth=_.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let O=i.properties.get(C);O.light=S}return C}function y(E,_,S,L,C,N){if(E.visible===!1)return;if(E.layers.test(C)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&N===As)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);let I=e.update(E),G=E.material;if(Array.isArray(G)){let Y=I.groups;for(let V=0,se=Y.length;V<se;V++){let q=Y[V],Q=G[q.materialIndex];if(Q&&Q.visible){let ne=w(E,Q,L,N);E.onBeforeShadow(i,E,_,S,I,ne,q),i.renderBufferDirect(S,null,I,ne,E,q),E.onAfterShadow(i,E,_,S,I,ne,q)}}}else if(G.visible){let Y=w(E,G,L,N);E.onBeforeShadow(i,E,_,S,I,Y,null),i.renderBufferDirect(S,null,I,Y,E,null),E.onAfterShadow(i,E,_,S,I,Y,null)}}let X=E.children;for(let I=0,G=X.length;I<G;I++)y(X[I],_,S,L,C,N)}function A(E){E.target.removeEventListener("dispose",A);for(let S in c){let L=c[S],C=E.target.uuid;C in L&&(L[C].dispose(),delete L[C])}}}function Wx(i,e){function t(){let P=!1,j=new bt,$=null,pe=new bt(0,0,0,0);return{setMask:function(le){$!==le&&!P&&(i.colorMask(le,le,le,le),$=le)},setLocked:function(le){P=le},setClear:function(le,ue,Ne,Je,ae){ae===!0&&(le*=Je,ue*=Je,Ne*=Je),j.set(le,ue,Ne,Je),pe.equals(j)===!1&&(i.clearColor(le,ue,Ne,Je),pe.copy(j))},reset:function(){P=!1,$=null,pe.set(-1,0,0,0)}}}function n(){let P=!1,j=!1,$=null,pe=null,le=null;return{setReversed:function(ue){if(j!==ue){let Ne=e.get("EXT_clip_control");ue?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),j=ue;let Je=le;le=null,this.setClear(Je)}},getReversed:function(){return j},setTest:function(ue){ue?Me(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(ue){$!==ue&&!P&&(i.depthMask(ue),$=ue)},setFunc:function(ue){if(j&&(ue=cd[ue]),pe!==ue){switch(ue){case Ua:i.depthFunc(i.NEVER);break;case Fa:i.depthFunc(i.ALWAYS);break;case Oa:i.depthFunc(i.LESS);break;case ds:i.depthFunc(i.LEQUAL);break;case Ba:i.depthFunc(i.EQUAL);break;case ka:i.depthFunc(i.GEQUAL);break;case za:i.depthFunc(i.GREATER);break;case Ha:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=ue}},setLocked:function(ue){P=ue},setClear:function(ue){le!==ue&&(le=ue,j&&(ue=1-ue),i.clearDepth(ue))},reset:function(){P=!1,$=null,pe=null,le=null,j=!1}}}function s(){let P=!1,j=null,$=null,pe=null,le=null,ue=null,Ne=null,Je=null,ae=null;return{setTest:function(De){P||(De?Me(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(De){j!==De&&!P&&(i.stencilMask(De),j=De)},setFunc:function(De,$e,Se){($!==De||pe!==$e||le!==Se)&&(i.stencilFunc(De,$e,Se),$=De,pe=$e,le=Se)},setOp:function(De,$e,Se){(ue!==De||Ne!==$e||Je!==Se)&&(i.stencilOp(De,$e,Se),ue=De,Ne=$e,Je=Se)},setLocked:function(De){P=De},setClear:function(De){ae!==De&&(i.clearStencil(De),ae=De)},reset:function(){P=!1,j=null,$=null,pe=null,le=null,ue=null,Ne=null,Je=null,ae=null}}}let r=new t,a=new n,o=new s,l={},c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],M=null,m=!1,p=null,x=null,w=null,y=null,A=null,E=null,_=null,S=new Ge(0,0,0),L=0,C=!1,N=null,O=null,X=null,I=null,G=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,se=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=se>=1):q.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=se>=2);let Q=null,ne={},Te=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),Z=new bt().fromArray(Te),ye=new bt().fromArray(Be);function Ae(P,j,$,pe){let le=new Uint8Array(4),ue=i.createTexture();i.bindTexture(P,ue),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<$;Ne++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(j,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(j+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return ue}let Ue={};Ue[i.TEXTURE_2D]=Ae(i.TEXTURE_2D,i.TEXTURE_2D,1),Ue[i.TEXTURE_CUBE_MAP]=Ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ue[i.TEXTURE_2D_ARRAY]=Ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ue[i.TEXTURE_3D]=Ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Me(i.DEPTH_TEST),a.setFunc(ds),Ee(!1),ve(vc),Me(i.CULL_FACE),de(Oi);function Me(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Fe(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Mt(P,j){return u[P]!==j?(i.bindFramebuffer(P,j),u[P]=j,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=j),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=j),!0):!1}function ze(P,j){let $=g,pe=!1;if(P){$=f.get(j),$===void 0&&($=[],f.set(j,$));let le=P.textures;if($.length!==le.length||$[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,Ne=le.length;ue<Ne;ue++)$[ue]=i.COLOR_ATTACHMENT0+ue;$.length=le.length,pe=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,pe=!0);pe&&i.drawBuffers($)}function Qe(P){return M!==P?(i.useProgram(P),M=P,!0):!1}let nt={[Bi]:i.FUNC_ADD,[Iu]:i.FUNC_SUBTRACT,[Lu]:i.FUNC_REVERSE_SUBTRACT};nt[Nu]=i.MIN,nt[Du]=i.MAX;let te={[Uu]:i.ZERO,[Fu]:i.ONE,[Ou]:i.SRC_COLOR,[bc]:i.SRC_ALPHA,[Vu]:i.SRC_ALPHA_SATURATE,[Hu]:i.DST_COLOR,[ku]:i.DST_ALPHA,[Bu]:i.ONE_MINUS_SRC_COLOR,[wc]:i.ONE_MINUS_SRC_ALPHA,[Gu]:i.ONE_MINUS_DST_COLOR,[zu]:i.ONE_MINUS_DST_ALPHA,[Wu]:i.CONSTANT_COLOR,[Xu]:i.ONE_MINUS_CONSTANT_COLOR,[qu]:i.CONSTANT_ALPHA,[Yu]:i.ONE_MINUS_CONSTANT_ALPHA};function de(P,j,$,pe,le,ue,Ne,Je,ae,De){if(P===Oi){m===!0&&(Fe(i.BLEND),m=!1);return}if(m===!1&&(Me(i.BLEND),m=!0),P!==Pu){if(P!==p||De!==C){if((x!==Bi||A!==Bi)&&(i.blendEquation(i.FUNC_ADD),x=Bi,A=Bi),De)switch(P){case Rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFunc(i.ONE,i.ONE);break;case Mc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",P);break}else switch(P){case Rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mc:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sc:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",P);break}w=null,y=null,E=null,_=null,S.set(0,0,0),L=0,p=P,C=De}return}le=le||j,ue=ue||$,Ne=Ne||pe,(j!==x||le!==A)&&(i.blendEquationSeparate(nt[j],nt[le]),x=j,A=le),($!==w||pe!==y||ue!==E||Ne!==_)&&(i.blendFuncSeparate(te[$],te[pe],te[ue],te[Ne]),w=$,y=pe,E=ue,_=Ne),(Je.equals(S)===!1||ae!==L)&&(i.blendColor(Je.r,Je.g,Je.b,ae),S.copy(Je),L=ae),p=P,C=!1}function ce(P,j){P.side===nn?Fe(i.CULL_FACE):Me(i.CULL_FACE);let $=P.side===tn;j&&($=!$),Ee($),P.blending===Rs&&P.transparent===!1?de(Oi):de(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let pe=P.stencilWrite;o.setTest(pe),pe&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Le(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Me(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ee(P){N!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),N=P)}function ve(P){P!==Au?(Me(i.CULL_FACE),P!==O&&(P===vc?i.cullFace(i.BACK):P===Ru?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),O=P}function Ye(P){P!==X&&(V&&i.lineWidth(P),X=P)}function Le(P,j,$){P?(Me(i.POLYGON_OFFSET_FILL),(I!==j||G!==$)&&(I=j,G=$,a.getReversed()&&(j=-j,$=-$),i.polygonOffset(j,$))):Fe(i.POLYGON_OFFSET_FILL)}function it(P){P?Me(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function st(P){P===void 0&&(P=i.TEXTURE0+Y-1),Q!==P&&(i.activeTexture(P),Q=P)}function ut(P,j,$){$===void 0&&(Q===null?$=i.TEXTURE0+Y-1:$=Q);let pe=ne[$];pe===void 0&&(pe={type:void 0,texture:void 0},ne[$]=pe),(pe.type!==P||pe.texture!==j)&&(Q!==$&&(i.activeTexture($),Q=$),i.bindTexture(P,j||Ue[P]),pe.type=P,pe.texture=j)}function F(){let P=ne[Q];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Rt(){try{i.compressedTexImage2D(...arguments)}catch(P){Ve("WebGLState:",P)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch(P){Ve("WebGLState:",P)}}function _t(){try{i.texSubImage2D(...arguments)}catch(P){Ve("WebGLState:",P)}}function ge(){try{i.texSubImage3D(...arguments)}catch(P){Ve("WebGLState:",P)}}function Tt(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Ve("WebGLState:",P)}}function Oe(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Ve("WebGLState:",P)}}function We(){try{i.texStorage2D(...arguments)}catch(P){Ve("WebGLState:",P)}}function R(){try{i.texStorage3D(...arguments)}catch(P){Ve("WebGLState:",P)}}function v(){try{i.texImage2D(...arguments)}catch(P){Ve("WebGLState:",P)}}function z(){try{i.texImage3D(...arguments)}catch(P){Ve("WebGLState:",P)}}function re(P){return d[P]!==void 0?d[P]:i.getParameter(P)}function ee(P,j){d[P]!==j&&(i.pixelStorei(P,j),d[P]=j)}function he(P){Z.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Z.copy(P))}function _e(P){ye.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ye.copy(P))}function J(P,j){let $=c.get(j);$===void 0&&($=new WeakMap,c.set(j,$));let pe=$.get(P);pe===void 0&&(pe=i.getUniformBlockIndex(j,P.name),i.uniformBlockBinding(j,pe,pe),$.set(P,pe))}function K(P,j,$){let le=c.get(j).get(P);l[le]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,le,$),l[le]=$)}function fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,ne={},u={},l={},f=new WeakMap,g=[],M=null,m=!1,p=null,x=null,w=null,y=null,A=null,E=null,_=null,S=new Ge(0,0,0),L=0,C=!1,N=null,O=null,X=null,I=null,G=null,Z.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Me,disable:Fe,bindFramebuffer:Mt,drawBuffers:ze,useProgram:Qe,setBlending:de,setMaterial:ce,setFlipSided:Ee,setCullFace:ve,setLineWidth:Ye,setPolygonOffset:Le,setScissorTest:it,activeTexture:st,bindTexture:ut,unbindTexture:F,compressedTexImage2D:Rt,compressedTexImage3D:tt,texImage2D:v,texImage3D:z,pixelStorei:ee,getParameter:re,updateUBOMapping:J,uniformBlockBinding:K,texStorage2D:We,texStorage3D:R,texSubImage2D:_t,texSubImage3D:ge,compressedTexSubImage2D:Tt,compressedTexSubImage3D:Oe,scissor:he,viewport:_e,reset:fe}}function Xx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new oe,h=new WeakMap,d=new Set,u,f=new WeakMap,g=new Set,M=new FinalizationRegistry(R=>g.delete(R)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,v){return m?new OffscreenCanvas(R,v):sr("canvas")}function x(R,v,z){let re=1,ee=We(R);if((ee.width>z||ee.height>z)&&(re=z/Math.max(ee.width,ee.height)),re<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let he=Math.floor(re*ee.width),_e=Math.floor(re*ee.height);u===void 0&&(u=p(he,_e));let J=v?p(he,_e):u;return J.width=he,J.height=_e,J.getContext("2d").drawImage(R,0,0,he,_e),He("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+he+"x"+_e+")."),J}else return"data"in R&&He("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function w(R){return R.generateMipmaps}function y(R){i.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(R,v,z,re,ee,he=!1){if(R!==null){if(i[R]!==void 0)return i[R];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let _e;re&&(_e=e.get("EXT_texture_norm16"),_e||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=v;if(v===i.RED&&(z===i.FLOAT&&(J=i.R32F),z===i.HALF_FLOAT&&(J=i.R16F),z===i.UNSIGNED_BYTE&&(J=i.R8),z===i.UNSIGNED_SHORT&&_e&&(J=_e.R16_EXT),z===i.SHORT&&_e&&(J=_e.R16_SNORM_EXT)),v===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.R8UI),z===i.UNSIGNED_SHORT&&(J=i.R16UI),z===i.UNSIGNED_INT&&(J=i.R32UI),z===i.BYTE&&(J=i.R8I),z===i.SHORT&&(J=i.R16I),z===i.INT&&(J=i.R32I)),v===i.RG&&(z===i.FLOAT&&(J=i.RG32F),z===i.HALF_FLOAT&&(J=i.RG16F),z===i.UNSIGNED_BYTE&&(J=i.RG8),z===i.UNSIGNED_SHORT&&_e&&(J=_e.RG16_EXT),z===i.SHORT&&_e&&(J=_e.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RG8UI),z===i.UNSIGNED_SHORT&&(J=i.RG16UI),z===i.UNSIGNED_INT&&(J=i.RG32UI),z===i.BYTE&&(J=i.RG8I),z===i.SHORT&&(J=i.RG16I),z===i.INT&&(J=i.RG32I)),v===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RGB8UI),z===i.UNSIGNED_SHORT&&(J=i.RGB16UI),z===i.UNSIGNED_INT&&(J=i.RGB32UI),z===i.BYTE&&(J=i.RGB8I),z===i.SHORT&&(J=i.RGB16I),z===i.INT&&(J=i.RGB32I)),v===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),z===i.UNSIGNED_INT&&(J=i.RGBA32UI),z===i.BYTE&&(J=i.RGBA8I),z===i.SHORT&&(J=i.RGBA16I),z===i.INT&&(J=i.RGBA32I)),v===i.RGB&&(z===i.UNSIGNED_SHORT&&_e&&(J=_e.RGB16_EXT),z===i.SHORT&&_e&&(J=_e.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),v===i.RGBA){let K=he?ir:ot.getTransfer(ee);z===i.FLOAT&&(J=i.RGBA32F),z===i.HALF_FLOAT&&(J=i.RGBA16F),z===i.UNSIGNED_BYTE&&(J=K===pt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&_e&&(J=_e.RGBA16_EXT),z===i.SHORT&&_e&&(J=_e.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function _(R,v){let z;return R?v===null||v===wn||v===zi?z=i.DEPTH24_STENCIL8:v===_n?z=i.DEPTH32F_STENCIL8:v===Ps&&(z=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===wn||v===zi?z=i.DEPTH_COMPONENT24:v===_n?z=i.DEPTH_COMPONENT32F:v===Ps&&(z=i.DEPTH_COMPONENT16),z}function S(R,v){return w(R)===!0||R.isFramebufferTexture&&R.minFilter!==zt&&R.minFilter!==jt?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function L(R){let v=new WeakRef(R);n.get(R).__ref=v,g.add(v),M.register(R,v,v)}function C(R){let v=n.get(R).__ref;v!==void 0&&(g.delete(v),M.unregister(v))}function N(R){X(R.target)}function O(R){I(R.target)}function X(R){R.removeEventListener("dispose",N),C(R),Y(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&d.delete(R)}function I(R){R.removeEventListener("dispose",O),C(R),se(R)}function G(){for(let R of g){let v=R.deref();v!==void 0&&(v.isRenderTarget===!0?I(v):X(v))}g.clear(),d.clear()}function Y(R){let v=n.get(R);if(v.__webglInit===void 0)return;let z=R.source,re=f.get(z);if(re){let ee=re[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&V(R),Object.keys(re).length===0&&f.delete(z)}n.remove(R)}function V(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let z=R.source,re=f.get(z);delete re[v.__cacheKey],a.memory.textures--}function se(R){let v=n.get(R);v.__depthDisposeCallback&&v.__depthDisposeCallback();let z=R.depthTexture;if(z&&z.renderTarget===R&&X(z),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(v.__webglFramebuffer[ee]))for(let he=0;he<v.__webglFramebuffer[ee].length;he++)i.deleteFramebuffer(v.__webglFramebuffer[ee][he]);else i.deleteFramebuffer(v.__webglFramebuffer[ee]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[ee])}else{if(Array.isArray(v.__webglFramebuffer))for(let ee=0;ee<v.__webglFramebuffer.length;ee++)i.deleteFramebuffer(v.__webglFramebuffer[ee]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ee=0;ee<v.__webglColorRenderbuffer.length;ee++)v.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[ee]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let re=R.textures;for(let ee=0,he=re.length;ee<he;ee++){let _e=n.get(re[ee]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(re[ee])}n.remove(R)}let q=0;function Q(){q=0}function ne(){return q}function Te(R){q=R}function Be(){let R=q;return R>=s.maxTextures&&He("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,R}function Z(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.mipmapsAutoUpdate),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function ye(R,v){let z=n.get(R);if(R.isVideoTexture&&Tt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){let re=R.image;if(re===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{ce(z,R,v);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+v)}function Ae(R,v){let z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){ce(z,R,v);return}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+v)}function Ue(R,v){let z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){ce(z,R,v);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+v)}function Me(R,v){let z=n.get(R);if(R.version>0&&z.__version!==R.version){Ee(z,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+v)}let Fe={[fs]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[Ga]:i.MIRRORED_REPEAT},Mt={[zt]:i.NEAREST,[Ju]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[So]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},ze={[ed]:i.NEVER,[zc]:i.ALWAYS,[td]:i.LESS,[Bc]:i.LEQUAL,[nd]:i.EQUAL,[kc]:i.GEQUAL,[id]:i.GREATER,[sd]:i.NOTEQUAL};function Qe(R,v){if(v.type===_n&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===jt||v.magFilter===So||v.magFilter===Ur||v.magFilter===Kn||v.minFilter===jt||v.minFilter===So||v.minFilter===Ur||v.minFilter===Kn)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Fe[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Fe[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Fe[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Mt[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Mt[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ze[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===zt||v.minFilter!==Ur&&v.minFilter!==Kn||v.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function nt(R,v){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",N),L(v));let re=v.source,ee=f.get(re);ee===void 0&&(ee={},f.set(re,ee));let he=Z(v);if(he!==R.__cacheKey){ee[he]===void 0&&(ee[he]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[he].usedTimes++;let _e=ee[R.__cacheKey];_e!==void 0&&(ee[R.__cacheKey].usedTimes--,_e.usedTimes===0&&V(v)),R.__cacheKey=he,R.__webglTexture=ee[he].texture}return z}function te(R,v,z){return Math.floor(Math.floor(R/z)/v)}function de(R,v,z,re){let he=R.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,z,re,v.data);else{he.sort((P,j)=>P.start-j.start);let _e=0;for(let P=1;P<he.length;P++){let j=he[_e],$=he[P],pe=j.start+j.count,le=te($.start,v.width,4),ue=te(j.start,v.width,4);$.start<=pe+1&&le===ue&&te($.start+$.count-1,v.width,4)===le?j.count=Math.max(j.count,$.start+$.count-j.start):(++_e,he[_e]=$)}he.length=_e+1;let J=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let P=0,j=he.length;P<j;P++){let $=he[P],pe=Math.floor($.start/4),le=Math.ceil($.count/4),ue=pe%v.width,Ne=Math.floor(pe/v.width),Je=le,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ne),t.texSubImage2D(i.TEXTURE_2D,0,ue,Ne,Je,ae,z,re,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function ce(R,v,z){let re=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(re=i.TEXTURE_3D);let ee=nt(R,v),he=v.source;t.bindTexture(re,R.__webglTexture,i.TEXTURE0+z);let _e=n.get(he);if(he.version!==_e.__version||ee===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ae=ot.getPrimaries(ot.workingColorSpace),De=v.colorSpace===Qn?null:ot.getPrimaries(v.colorSpace),$e=v.colorSpace===Qn||ae===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let K=x(v.image,!1,s.maxTextureSize);K=Oe(v,K);let fe=r.convert(v.format,v.colorSpace),P=r.convert(v.type),j=E(v.internalFormat,fe,P,v.normalized,v.colorSpace,v.isVideoTexture);Qe(re,v);let $,pe=v.mipmaps,le=v.isVideoTexture!==!0,ue=_e.__version===void 0||ee===!0,Ne=he.dataReady,Je=S(v,K);if(v.isDepthTexture)j=_(v.format===jn,v.type),ue&&(le?t.texStorage2D(i.TEXTURE_2D,1,j,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,j,K.width,K.height,0,fe,P,null));else if(v.isDataTexture)if(pe.length>0){le&&ue&&t.texStorage2D(i.TEXTURE_2D,Je,j,pe[0].width,pe[0].height);for(let ae=0,De=pe.length;ae<De;ae++)$=pe[ae],le?Ne&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,fe,P,$.data):t.texImage2D(i.TEXTURE_2D,ae,j,$.width,$.height,0,fe,P,$.data);v.generateMipmaps=!1}else le?(ue&&t.texStorage2D(i.TEXTURE_2D,Je,j,K.width,K.height),Ne&&de(v,K,fe,P)):t.texImage2D(i.TEXTURE_2D,0,j,K.width,K.height,0,fe,P,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){le&&ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,j,pe[0].width,pe[0].height,K.depth);for(let ae=0,De=pe.length;ae<De;ae++)if($=pe[ae],v.format!==Tn)if(fe!==null)if(le){if(Ne)if(v.layerUpdates.size>0){let $e=Kc($.width,$.height,v.format,v.type);for(let Se of v.layerUpdates){let mt=$.data.subarray(Se*$e/$.data.BYTES_PER_ELEMENT,(Se+1)*$e/$.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,Se,$.width,$.height,1,fe,mt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,$.width,$.height,K.depth,fe,$.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,j,$.width,$.height,K.depth,0,$.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?Ne&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,$.width,$.height,K.depth,fe,P,$.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,j,$.width,$.height,K.depth,0,fe,P,$.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{le&&ue&&t.texStorage2D(i.TEXTURE_2D,Je,j,pe[0].width,pe[0].height);for(let ae=0,De=pe.length;ae<De;ae++)$=pe[ae],v.format!==Tn?fe!==null?le?Ne&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,fe,$.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,j,$.width,$.height,0,$.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?Ne&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,$.width,$.height,fe,P,$.data):t.texImage2D(i.TEXTURE_2D,ae,j,$.width,$.height,0,fe,P,$.data)}else if(v.isDataArrayTexture)if(le){if(ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,j,K.width,K.height,K.depth),Ne)if(v.layerUpdates.size>0){let ae=Kc(K.width,K.height,v.format,v.type);for(let De of v.layerUpdates){let $e=K.data.subarray(De*ae/K.data.BYTES_PER_ELEMENT,(De+1)*ae/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,De,K.width,K.height,1,fe,P,$e)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,fe,P,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,j,K.width,K.height,K.depth,0,fe,P,K.data);else if(v.isData3DTexture)le?(ue&&t.texStorage3D(i.TEXTURE_3D,Je,j,K.width,K.height,K.depth),Ne&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,fe,P,K.data)):t.texImage3D(i.TEXTURE_3D,0,j,K.width,K.height,K.depth,0,fe,P,K.data);else if(v.isFramebufferTexture){if(ue)if(le)t.texStorage2D(i.TEXTURE_2D,Je,j,K.width,K.height);else{let ae=K.width,De=K.height;for(let $e=0;$e<Je;$e++)t.texImage2D(i.TEXTURE_2D,$e,j,ae,De,0,fe,P,null),ae>>=1,De>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),K.parentNode!==ae){ae.appendChild(K),d.add(v),ae.onpaint=De=>{let $e=De.changedElements;for(let Se of d)$e.includes(Se.image)&&(Se.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let $e=i.RGBA,Se=i.RGBA,mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,$e,Se,mt,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(pe.length>0){if(le&&ue){let ae=We(pe[0]);t.texStorage2D(i.TEXTURE_2D,Je,j,ae.width,ae.height)}for(let ae=0,De=pe.length;ae<De;ae++)$=pe[ae],le?Ne&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,fe,P,$):t.texImage2D(i.TEXTURE_2D,ae,j,fe,P,$);v.generateMipmaps=!1}else if(le){if(ue){let ae=We(K);t.texStorage2D(i.TEXTURE_2D,Je,j,ae.width,ae.height)}Ne&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,P,K)}else t.texImage2D(i.TEXTURE_2D,0,j,fe,P,K);w(v)&&v.mipmapsAutoUpdate===!0&&y(re),_e.__version=he.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ee(R,v,z){if(v.image.length!==6)return;let re=nt(R,v),ee=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);let he=n.get(ee);if(ee.version!==he.__version||re===!0){t.activeTexture(i.TEXTURE0+z);let _e=ot.getPrimaries(ot.workingColorSpace),J=v.colorSpace===Qn?null:ot.getPrimaries(v.colorSpace),K=v.colorSpace===Qn||_e===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let fe=v.isCompressedTexture||v.image[0].isCompressedTexture,P=v.image[0]&&v.image[0].isDataTexture,j=[];for(let Se=0;Se<6;Se++)!fe&&!P?j[Se]=x(v.image[Se],!0,s.maxCubemapSize):j[Se]=P?v.image[Se].image:v.image[Se],j[Se]=Oe(v,j[Se]);let $=j[0],pe=r.convert(v.format,v.colorSpace),le=r.convert(v.type),ue=E(v.internalFormat,pe,le,v.normalized,v.colorSpace),Ne=v.isVideoTexture!==!0,Je=he.__version===void 0||re===!0,ae=ee.dataReady,De=S(v,$);Qe(i.TEXTURE_CUBE_MAP,v);let $e;if(v.isDepthTexture){if(ue=_(v.format===jn,v.type),Je)if(Ne)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ue,$.width,$.height);else for(let Se=0;Se<6;Se++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ue,$.width,$.height,0,pe,le,null)}else if(fe){Ne&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,De,ue,$.width,$.height);for(let Se=0;Se<6;Se++){$e=j[Se].mipmaps;for(let mt=0;mt<$e.length;mt++){let Ut=$e[mt];v.format!==Tn?pe!==null?Ne?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt,0,0,Ut.width,Ut.height,pe,Ut.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt,ue,Ut.width,Ut.height,0,Ut.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt,0,0,Ut.width,Ut.height,pe,le,Ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt,ue,Ut.width,Ut.height,0,pe,le,Ut.data)}}}else{if($e=v.mipmaps,Ne&&Je){$e.length>0&&De++;let Se=We(j[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,De,ue,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(P){Ne?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,j[Se].width,j[Se].height,pe,le,j[Se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ue,j[Se].width,j[Se].height,0,pe,le,j[Se].data);for(let mt=0;mt<$e.length;mt++){let ri=$e[mt].image[Se].image;Ne?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt+1,0,0,ri.width,ri.height,pe,le,ri.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt+1,ue,ri.width,ri.height,0,pe,le,ri.data)}}else{Ne?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,pe,le,j[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ue,pe,le,j[Se]);for(let mt=0;mt<$e.length;mt++){let Ut=$e[mt];Ne?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt+1,0,0,pe,le,Ut.image[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,mt+1,ue,pe,le,Ut.image[Se])}}}w(v)&&v.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),he.__version=ee.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function ve(R,v,z,re,ee,he){let _e=r.convert(z.format,z.colorSpace),J=r.convert(z.type),K=E(z.internalFormat,_e,J,z.normalized,z.colorSpace),fe=n.get(v),P=n.get(z);if(P.__renderTarget=v,!fe.__hasExternalTextures){let j=Math.max(1,v.width>>he),$=Math.max(1,v.height>>he);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,he,K,j,$,v.depth,0,_e,J,null):t.texImage2D(ee,he,K,j,$,0,_e,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ee,P.__webglTexture,0,_t(v)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ee,P.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(R,v,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let re=v.depthTexture,ee=re&&re.isDepthTexture?re.type:null,he=_(v.stencilBuffer,ee),_e=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_t(v),he,v.width,v.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,_t(v),he,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,he,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,R)}else{let re=v.textures;for(let ee=0;ee<re.length;ee++){let he=re[ee],_e=r.convert(he.format,he.colorSpace),J=r.convert(he.type),K=E(he.internalFormat,_e,J,he.normalized,he.colorSpace);ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_t(v),K,v.width,v.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,_t(v),K,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,K,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(R,v,z){let re=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=n.get(v.depthTexture);ee.__renderTarget=v;let he=re?v.depthTexture.image[0]:v.depthTexture.image;(!ee.__webglTexture||he.width!==v.width||he.height!==v.height)&&(he.width=v.width,he.height=v.height,v.depthTexture.needsUpdate=!0),re?Me(v.depthTexture,0):ye(v.depthTexture,0);let _e=ee.__webglTexture,J=_t(v),K=re?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,fe=v.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===$n)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,K,_e,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,fe,K,_e,0);else if(v.depthTexture.format===jn)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,K,_e,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,fe,K,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(R){let v=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let re=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),re){let ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,re.removeEventListener("dispose",ee)};re.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=re}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(z)for(let re=0;re<6;re++)Le(v.__webglFramebuffer[re],R,re);else R.texture.mipmaps.length>0?Le(v.__webglFramebuffer[0],R,0):Le(v.__webglFramebuffer,R,0);else if(z){v.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[re]),v.__webglDepthbuffer[re]===void 0)v.__webglDepthbuffer[re]=i.createRenderbuffer(),Ye(v.__webglDepthbuffer[re],R,!1);else{let ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=v.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,he)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ye(v.__webglDepthbuffer,R,!1);else{let ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,he)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function st(R,v,z){let re=n.get(R);v!==void 0&&ve(re.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&it(R)}function ut(R){let v=R.texture,z=n.get(R),re=n.get(v);R.addEventListener("dispose",O),L(R);let ee=R.textures,he=R.isWebGLCubeRenderTarget===!0,_e=ee.length>1;if(_e||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=v.version,a.memory.textures++),he){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(v.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let K=0;K<v.mipmaps.length;K++)z.__webglFramebuffer[J][K]=i.createFramebuffer()}else z.__webglFramebuffer[J]=i.createFramebuffer()}else{if(v.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<v.mipmaps.length;J++)z.__webglFramebuffer[J]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(_e)for(let J=0,K=ee.length;J<K;J++){let fe=n.get(ee[J]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&ge(R)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<ee.length;J++){let K=ee[J];z.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[J]);let fe=r.convert(K.format,K.colorSpace),P=r.convert(K.type),j=E(K.internalFormat,fe,P,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),$=_t(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,j,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,z.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,v);for(let J=0;J<6;J++)if(v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)ve(z.__webglFramebuffer[J][K],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,K);else ve(z.__webglFramebuffer[J],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);w(v)?y(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(_e){for(let J=0,K=ee.length;J<K;J++){let fe=ee[J],P=n.get(fe),j=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(j=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,P.__webglTexture),Qe(j,fe),ve(z.__webglFramebuffer,R,fe,i.COLOR_ATTACHMENT0+J,j,0),w(fe)&&y(j)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(J=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,re.__webglTexture),Qe(J,v),v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)ve(z.__webglFramebuffer[K],R,v,i.COLOR_ATTACHMENT0,J,K);else ve(z.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,J,0);w(v)?y(J):v.mipmaps.length>0&&i.texParameteri(J,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&it(R)}function F(R){let v=R.textures;for(let z=0,re=v.length;z<re;z++){let ee=v[z];if(w(ee)&&ee.mipmapsAutoUpdate===!0){let he=A(R),_e=n.get(ee).__webglTexture;t.bindTexture(he,_e),y(he),t.unbindTexture()}}}let Rt=[];function tt(R){if(R.samples>0){if(ge(R)===!1){let v=R.textures,z=R.width,re=R.height,ee=i.COLOR_BUFFER_BIT,he=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(R),J=v.length>1;if(J)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);let P=n.get(v[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,z,re,0,0,z,re,ee,i.NEAREST),l===!0&&(Rt.length=0,Rt.push(i.COLOR_ATTACHMENT0+fe),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&Rt.push(he),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Rt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);let P=n.get(v[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,P,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function _t(R){return Math.min(s.maxSamples,R.samples)}function ge(R){let v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Tt(R){let v=a.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function Oe(R,v){let z=R.colorSpace,re=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==nr&&z!==Qn&&(ot.getTransfer(z)===pt?(re!==Tn||ee!==sn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",z)),v}function We(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Be,this.resetTextureUnits=Q,this.getTextureUnits=ne,this.setTextureUnits=Te,this.setTexture2D=ye,this.setTexture2DArray=Ae,this.setTexture3D=Ue,this.setTextureCube=Me,this.rebindTextures=st,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ge,this.dispose=G}function qx(i,e){function t(n,s=Qn){let r,a=ot.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===wo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Eo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Dc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lc)return i.BYTE;if(n===Nc)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===bo)return i.INT;if(n===wn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===En)return i.HALF_FLOAT;if(n===Fc)return i.ALPHA;if(n===Oc)return i.RGB;if(n===Tn)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===To)return i.RED;if(n===Ao)return i.RED_INTEGER;if(n===yi)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Co)return i.RGBA_INTEGER;if(n===Fr||n===Or||n===Br||n===kr)if(a===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Po||n===Io||n===Lo||n===No)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Po)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===No)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Do||n===Uo||n===Fo||n===Oo||n===Bo||n===zr||n===ko)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Do||n===Uo)return a===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Oo)return r.COMPRESSED_R11_EAC;if(n===Bo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===zr)return r.COMPRESSED_RG11_EAC;if(n===ko)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===zo||n===Ho||n===Go||n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Zo||n===Jo||n===Ko||n===jo||n===Qo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ho)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Go)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$o)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===el||n===tl||n===nl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===el)return a===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===il||n===sl||n===Hr||n===rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Yx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$x=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new pr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Nn({vertexShader:Yx,fragmentShader:$x,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new Fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dh=class extends Pn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,M=typeof XRWebGLBinding<"u",m=new uh,p={},x=t.getContextAttributes(),w=null,y=null,A=[],E=[],_=new oe,S=null,L=null,C=new Kt;C.viewport=new bt;let N=new Kt;N.viewport=new bt;let O=[C,N],X=new _o,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ye=A[Z];return ye===void 0&&(ye=new xs,A[Z]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(Z){let ye=A[Z];return ye===void 0&&(ye=new xs,A[Z]=ye),ye.getGripSpace()},this.getHand=function(Z){let ye=A[Z];return ye===void 0&&(ye=new xs,A[Z]=ye),ye.getHandSpace()};function Y(Z){let ye=E.indexOf(Z.inputSource);if(ye===-1)return;let Ae=A[ye];Ae!==void 0&&(Ae.update(Z.inputSource,Z.frame,c||a),Ae.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",se);for(let Z=0;Z<A.length;Z++){let ye=E[Z];ye!==null&&(E[Z]=null,A[Z].disconnect(ye))}I=null,G=null,m.reset();for(let Z in p)delete p[Z];if(e.setRenderTarget(w),f=null,u=null,d=null,s=null,y=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(_.width,_.height,!1),L!==null){let Z=L.camera;Z.fov=L.fov,Z.zoom=L.zoom,Z.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",V),s.addEventListener("inputsourceschange",se),x.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(_),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,Ue=null,Me=null;x.depth&&(Me=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=x.stencil?jn:$n,Ue=x.stencil?zi:wn);let Fe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new cn(u.textureWidth,u.textureHeight,{format:Tn,type:sn,depthTexture:new Jn(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Ae={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ae),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new cn(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Be.setContext(s),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(Z){for(let ye=0;ye<Z.removed.length;ye++){let Ae=Z.removed[ye],Ue=E.indexOf(Ae);Ue>=0&&(E[Ue]=null,A[Ue].disconnect(Ae))}for(let ye=0;ye<Z.added.length;ye++){let Ae=Z.added[ye],Ue=E.indexOf(Ae);if(Ue===-1){for(let Fe=0;Fe<A.length;Fe++)if(Fe>=E.length){E.push(Ae),Ue=Fe;break}else if(E[Fe]===null){E[Fe]=Ae,Ue=Fe;break}if(Ue===-1)break}let Me=A[Ue];Me&&Me.connect(Ae)}}function q(Z,ye){ye===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ye.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ye=Z.near,Ae=Z.far;m.texture!==null&&(m.depthNear>0&&(ye=m.depthNear),m.depthFar>0&&(Ae=m.depthFar)),X.near=N.near=C.near=ye,X.far=N.far=C.far=Ae,(I!==X.near||G!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),I=X.near,G=X.far),X.layers.mask=Z.layers.mask|6,C.layers.mask=X.layers.mask&-5,N.layers.mask=X.layers.mask&-3;let Ue=Z.parent,Me=X.cameras;q(X,Ue);for(let Fe=0;Fe<Me.length;Fe++)q(Me[Fe],Ue);X.projectionMatrix.copy(C.projectionMatrix),X.projectionMatrixInverse.copy(C.projectionMatrixInverse),L===null&&Z.isPerspectiveCamera&&(L={camera:Z,fov:Z.fov,zoom:Z.zoom}),Q(Z,X,Ue)};function Q(Z,ye,Ae){Ae===null?Z.matrix.copy(ye.matrixWorld):(Z.matrix.copy(Ae.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ye.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ye.projectionMatrix),Z.projectionMatrixInverse.copy(ye.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=gs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(X)},this.getCameraTexture=function(Z){return p[Z]};let ne=null;function Te(Z,ye){if(h=ye.getViewerPose(c||a),g=ye,h!==null){let Ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ue=!1;Ae.length!==X.cameras.length&&(X.cameras.length=0,Ue=!0);for(let ze=0;ze<Ae.length;ze++){let Qe=Ae[ze],nt=null;if(f!==null)nt=f.getViewport(Qe);else{let de=d.getViewSubImage(u,Qe);nt=de.viewport,ze===0&&(e.setRenderTargetTextures(y,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(y))}let te=O[ze];te===void 0&&(te=new Kt,te.layers.enable(ze),te.viewport=new bt,O[ze]=te),te.matrix.fromArray(Qe.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Qe.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(nt.x,nt.y,nt.width,nt.height),ze===0&&(X.matrix.copy(te.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ue===!0&&X.cameras.push(te)}let Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=n.getBinding();let ze=d.getDepthInformation(Ae[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(Me&&Me.includes("camera-access")&&M){e.state.unbindTexture(),d=n.getBinding();for(let ze=0;ze<Ae.length;ze++){let Qe=Ae[ze].camera;if(Qe){let nt=p[Qe];nt||(nt=new pr,p[Qe]=nt);let te=d.getCameraImage(Qe);nt.sourceTexture=te}}}}for(let Ae=0;Ae<A.length;Ae++){let Ue=E[Ae],Me=A[Ae];Ue!==null&&Me!==void 0&&Me.update(Ue,ye,c||a)}ne&&ne(Z,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),g=null}let Be=new Hd;Be.setAnimationLoop(Te),this.setAnimationLoop=function(Z){ne=Z},this.dispose=function(){}}},Zx=new ht,Kd=new Xe;Kd.set(-1,0,0,0,1,0,0,0,1);function Jx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,$c(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,w,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let x=e.get(p),w=x.envMap,y=x.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Zx.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Kd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){let x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Kx(i,e,t,n){let s={},r={};function a(x,w){let y=w.program;n.uniformBlockBinding(x,y,s[x.id])}function o(x,w){let y=s[x.id];y===void 0&&(g(x),y=l(x),s[x.id]=y,x.addEventListener("dispose",m));let A=w.program;n.updateUBOMapping(x,A);let E=e.render.frame;r[x.id]!==E&&(c(x),r[x.id]=E)}function l(x){let w=i.createBuffer(),y=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,y,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(x){let w=s[x.id],y=x.uniforms,A=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let E=0,_=y.length;E<_;E++){let S=y[E];if(Array.isArray(S))for(let L=0,C=S.length;L<C;L++)h(S[L],E,L,A);else h(S,E,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(x,w,y,A){if(u(x,w,y,A)===!0){let E=x.__offset,_=x.value;if(Array.isArray(_)){let S=0;for(let L=0;L<_.length;L++){let C=_[L],N=M(C,!0);d(C,x.__data,S),S+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else d(_,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,x.__data)}}function d(x,w,y){typeof x=="number"||typeof x=="boolean"?w[y]=x:x.isMatrix3?(w[y]=x.elements[0],w[y+1]=x.elements[1],w[y+2]=x.elements[2],w[y+3]=0,w[y+4]=x.elements[3],w[y+5]=x.elements[4],w[y+6]=x.elements[5],w[y+7]=0,w[y+8]=x.elements[6],w[y+9]=x.elements[7],w[y+10]=x.elements[8],w[y+11]=0):ArrayBuffer.isView(x)?w.set(x.subarray(0,w.length-y),y):x.toArray(w,y)}function u(x,w,y,A){let E=x.value,_=w+"_"+y;if(Array.isArray(E)){A[_]===void 0&&(A[_]=[]);let S=A[_],L=!1;for(let C=0;C<E.length;C++)f(E[C],S,C)===!0&&(L=!0);return L}return f(E,A,_)}function f(x,w,y){if(w[y]===void 0)return typeof x=="number"||typeof x=="boolean"?w[y]=x:ArrayBuffer.isView(x)?w[y]=x.slice():w[y]=x.clone(),!0;{let A=w[y];if(typeof x=="number"||typeof x=="boolean"){if(A!==x)return w[y]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(A.equals(x)===!1)return A.copy(x),!0}}return!1}function g(x){let w=x.uniforms,y=0,A=16;for(let _=0,S=w.length;_<S;_++){let L=Array.isArray(w[_])?w[_]:[w[_]];for(let C=0,N=L.length;C<N;C++){let O=L[C],X=Array.isArray(O.value)?O.value:[O.value],I=Array.isArray(w[_])||Array.isArray(O.value),G=y;for(let V=0,se=X.length;V<se;V++){let q=X[V],Q=M(q,I),ne=y%A,Te=ne%Q.boundary,Be=ne+Te;y+=Te,Be!==0&&A-Be<Q.storage&&(y+=A-Be),V===0&&(G=y),y+=Q.storage}let Y=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new Y((y-G)/Float32Array.BYTES_PER_ELEMENT),O.__offset=G}}let E=y%A;return E>0&&(y+=A-E),x.__size=y,x.__cache={},this}function M(x,w){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=16,y.storage=48):x.isMatrix4?(y.boundary=16,y.storage=64):x.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(y.boundary=16,y.storage=x.byteLength):He("WebGLRenderer: Unsupported uniform value type.",x),w===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(x){let w=x.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(let x in s)i.deleteBuffer(s[x]);s={},r={}}return{bind:a,update:o,dispose:p}}var jx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fn=null;function Qx(){return Fn===null&&(Fn=new hr(jx,16,16,yi,En),Fn.name="DFG_LUT",Fn.minFilter=jt,Fn.magFilter=jt,Fn.wrapS=Cn,Fn.wrapT=Cn,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}var cl=class{constructor(e={}){let{canvas:t=ad(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let M=f,m=new Set([Co,Ro,Ao]),p=new Set([sn,wn,Ps,zi,wo,Eo]),x=new Uint32Array(4),w=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},A=null,E=null,_=[],S=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,N=!1,O=null,X=null,I=null,G=null;this._outputColorSpace=Bt;let Y=0,V=0,se=null,q=-1,Q=null,ne=new bt,Te=new bt,Be=null,Z=new Ge(0),ye=0,Ae=t.width,Ue=t.height,Me=1,Fe=null,Mt=null,ze=new bt(0,0,Ae,Ue),Qe=new bt(0,0,Ae,Ue),nt=!1,te=new pi,de=new $a,ce=!1,Ee=!1,ve=new ht,Ye=new U,Le=new bt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},st=!1;function ut(){return se===null?Me:1}let F=n;function Rt(b,D){return t.getContext(b,D)}let tt,_t,ge,Tt,Oe,We,R,v,z,re,ee,he,_e,J,K,fe,P,j,$,pe,le,ue,Ne;try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",De,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",Se,!1),F===null){let D="webgl2";if(F=Rt(D,b),F===null)throw Rt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(b){throw t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Ve("WebGLRenderer: "+b.message),b}function Je(){tt=new h_(F),tt.init(),le=new qx(F,tt),_t=new Q0(F,tt,e,le),ge=new Wx(F,tt),_t.reversedDepthBuffer&&u&&ge.buffers.depth.setReversed(!0),X=F.createFramebuffer(),I=F.createFramebuffer(),G=F.createFramebuffer(),Tt=new f_(F),Oe=new Px,We=new Xx(F,tt,ge,Oe,_t,le,Tt),R=new c_(C),v=new mm(F),ue=new K0(F,v),z=new u_(F,v,Tt,ue),re=new m_(F,z,v,ue,Tt),j=new p_(F,_t,We),K=new e_(Oe),ee=new Cx(C,R,tt,_t,ue,K),he=new Jx(C,Oe),_e=new Lx,J=new Bx(tt),P=new J0(C,R,ge,re,g,l),fe=new Vx(C,re,_t),Ne=new Kx(F,Tt,_t,ge),$=new j0(F,tt,Tt),pe=new d_(F,tt,Tt),Tt.programs=ee.programs,C.capabilities=_t,C.extensions=tt,C.properties=Oe,C.renderLists=_e,C.shadowMap=fe,C.state=ge,C.info=Tt}M!==sn&&(L=new __(M,t.width,t.height,o,s,r));let ae=new dh(C,F);this.xr=ae,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let b=tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(b){b!==void 0&&(Me=b,this.setSize(Ae,Ue,!1))},this.getSize=function(b){return b.set(Ae,Ue)},this.setSize=function(b,D,W=!0){if(ae.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}Ae=b,Ue=D,t.width=Math.floor(b*Me),t.height=Math.floor(D*Me),W===!0&&(t.style.width=b+"px",t.style.height=D+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(Ae*Me,Ue*Me).floor()},this.setDrawingBufferSize=function(b,D,W){Ae=b,Ue=D,Me=W,t.width=Math.floor(b*W),t.height=Math.floor(D*W),this.setViewport(0,0,b,D)},this.setEffects=function(b){if(M===sn){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let D=0;D<b.length;D++)if(b[D].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(ze)},this.setViewport=function(b,D,W,k){b.isVector4?ze.set(b.x,b.y,b.z,b.w):ze.set(b,D,W,k),ge.viewport(ne.copy(ze).multiplyScalar(ut()).round())},this.getScissor=function(b){return b.copy(Qe)},this.setScissor=function(b,D,W,k){b.isVector4?Qe.set(b.x,b.y,b.z,b.w):Qe.set(b,D,W,k),ge.scissor(Te.copy(Qe).multiplyScalar(ut()).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(b){ge.setScissorTest(nt=b)},this.setOpaqueSort=function(b){Fe=b},this.setTransparentSort=function(b){Mt=b},this.getClearColor=function(b){return b.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(b=!0,D=!0,W=!0){let k=0;if(b){let H=!1;if(se!==null){let xe=se.texture.format;H=m.has(xe)}if(H){let xe=se.texture.type,Re=p.has(xe),me=P.getClearColor(),we=P.getClearAlpha(),Ie=me.r,qe=me.g,rt=me.b;Re?(x[0]=Ie,x[1]=qe,x[2]=rt,x[3]=we,F.clearBufferuiv(F.COLOR,0,x)):(w[0]=Ie,w[1]=qe,w[2]=rt,w[3]=we,F.clearBufferiv(F.COLOR,0,w))}else k|=F.COLOR_BUFFER_BIT}D&&(k|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(k|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&F.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),O=b},this.dispose=function(){t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),P.dispose(),_e.dispose(),J.dispose(),We.dispose(),Oe.dispose(),R.dispose(),re.dispose(),z.dispose(),ue.dispose(),Ne.dispose(),ee.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",kh),ae.removeEventListener("sessionend",zh),bi.stop()};function De(b){b.preventDefault(),Gc("WebGLRenderer: Context Lost."),N=!0}function $e(){Gc("WebGLRenderer: Context Restored."),N=!1;let b=Tt.autoReset,D=fe.enabled,W=fe.autoUpdate,k=fe.needsUpdate,H=fe.type;Je(),Tt.autoReset=b,fe.enabled=D,fe.autoUpdate=W,fe.needsUpdate=k,fe.type=H}function Se(b){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function mt(b){let D=b.target;D.removeEventListener("dispose",mt),Ut(D)}function Ut(b){ri(b),Oe.remove(b)}function ri(b){let D=Oe.get(b).programs;D!==void 0&&(D.forEach(function(W){ee.releaseProgram(W)}),b.isShaderMaterial&&ee.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,W,k,H,xe){D===null&&(D=it);let Re=H.isMesh&&H.matrixWorld.determinantAffine()<0,me=Gf(b,D,W,k,H);ge.setMaterial(k,Re);let we=W.index,Ie=1;if(k.wireframe===!0){if(we=z.getWireframeAttribute(W),we===void 0)return;Ie=2}let qe=W.drawRange,rt=W.attributes.position,Ce=qe.start*Ie,at=(qe.start+qe.count)*Ie;xe!==null&&(Ce=Math.max(Ce,xe.start*Ie),at=Math.min(at,(xe.start+xe.count)*Ie)),we!==null?(Ce=Math.max(Ce,0),at=Math.min(at,we.count)):rt!=null&&(Ce=Math.max(Ce,0),at=Math.min(at,rt.count));let Ct=at-Ce;if(Ct<0||Ct===1/0)return;ue.setup(H,k,me,W,we);let yt,xt=$;if(we!==null&&(yt=v.get(we),xt=pe,xt.setIndex(yt)),H.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*ut()),xt.setMode(F.LINES)):xt.setMode(F.TRIANGLES);else if(H.isLine){let Xt=k.linewidth;Xt===void 0&&(Xt=1),ge.setLineWidth(Xt*ut()),H.isLineSegments?xt.setMode(F.LINES):H.isLineLoop?xt.setMode(F.LINE_LOOP):xt.setMode(F.LINE_STRIP)}else H.isPoints?xt.setMode(F.POINTS):H.isSprite&&xt.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))xt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Xt=H._multiDrawStarts,Pe=H._multiDrawCounts,Jt=H._multiDrawCount,ft=we?v.get(we).bytesPerElement:1,wi=Oe.get(k).currentProgram.getUniforms();for(let qt=0;qt<Jt;qt++)wi.setValue(F,"_gl_DrawID",qt),xt.render(Xt[qt]/ft,Pe[qt])}else if(H.isInstancedMesh)xt.renderInstances(Ce,Ct,H.count);else if(W.isInstancedBufferGeometry){let Xt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Pe=Math.min(W.instanceCount,Xt);xt.renderInstances(Ce,Ct,Pe)}else xt.render(Ce,Ct)};function Bh(b,D,W,k){O!==null&&b.isNodeMaterial&&O.setObject(k,b),ce===!0&&K.setState(b,W,!1),b.transparent===!0&&b.side===nn&&b.forceSinglePass===!1?(b.side=tn,b.needsUpdate=!0,Vs(b,D,k),b.side=vi,b.needsUpdate=!0,Vs(b,D,k),b.side=nn):Vs(b,D,k)}this.compile=function(b,D,W=null){W===null&&(W=b),O!==null&&O.renderStart(b,D,W),E=J.get(W),E.init(D),S.push(E),W.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),b!==W&&b.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights(),O!==null&&O.updateLights(E.state.lightsArray),Ee=this.localClippingEnabled,ce=K.init(this.clippingPlanes,Ee),ce===!0&&K.setGlobalState(this.clippingPlanes,D),O!==null&&fe.render(E.state.shadowsArray,W,D);let k=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let xe=H.material;if(xe)if(Array.isArray(xe))for(let Re=0;Re<xe.length;Re++){let me=xe[Re];Bh(me,W,D,H),k.add(me)}else Bh(xe,W,D,H),k.add(xe)}),E=S.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(b,D,W=null){let k=this.compile(b,D,W);return new Promise(H=>{function xe(){if(k.forEach(function(Re){let we=Oe.get(Re).currentProgram;(we===void 0||we.isReady())&&k.delete(Re)}),k.size===0){H(b);return}setTimeout(xe,10)}tt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Ol=null;function zf(b){Ol&&Ol(b)}function kh(){bi.stop()}function zh(){bi.start()}let bi=new Hd;bi.setAnimationLoop(zf),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(b){Ol=b,ae.setAnimationLoop(b),b===null?bi.stop():bi.start()},ae.addEventListener("sessionstart",kh),ae.addEventListener("sessionend",zh),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;O!==null&&O.renderStart(b,D);let W=ae.enabled===!0&&ae.isPresenting===!0,k=L!==null&&(se===null||W)&&L.begin(C,se);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(D),D=ae.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,D,se),E=J.get(b,S.length),E.init(D),E.state.textureUnits=We.getTextureUnits(),S.push(E),ve.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?de.setFromArrayCamera(D):te.setFromProjectionMatrix(ve,mn,D.reversedDepth),Ee=this.localClippingEnabled,ce=K.init(this.clippingPlanes,Ee),A=_e.get(b,_.length),A.init(),_.push(A),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){let Re=C.xr.getDepthSensingMesh();Re!==null&&Bl(Re,D,-1/0,C.sortObjects)}Bl(b,D,0,C.sortObjects),A.finish(),O!==null&&O.updateLights(E.state.lightsArray),C.sortObjects===!0&&A.sort(Fe,Mt),st=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,st&&P.addToRenderList(A,b),this.info.autoReset===!0&&this.info.reset(),ce===!0&&K.beginShadows();let H=E.state.shadowsArray;if(fe.render(H,b,D),ce===!0&&K.endShadows(),(k&&L.hasRenderPass())===!1){let Re=A.opaque,me=A.transmissive;if(E.setupLights(),D.isArrayCamera){let we=D.cameras;if(me.length>0)for(let Ie=0,qe=we.length;Ie<qe;Ie++){let rt=we[Ie];Gh(Re,me,b,rt)}st&&P.render(b);for(let Ie=0,qe=we.length;Ie<qe;Ie++){let rt=we[Ie];Hh(A,b,rt,rt.viewport)}}else me.length>0&&Gh(Re,me,b,D),st&&P.render(b),Hh(A,b,D)}se!==null&&V===0&&(We.updateMultisampleRenderTarget(se),We.updateRenderTargetMipmap(se)),k&&L.end(C),b.isScene===!0&&b.onAfterRender(C,b,D),ue.resetDefaultState(),q=-1,Q=null,S.pop(),S.length>0?(E=S[S.length-1],We.setTextureUnits(E.state.textureUnits),ce===!0&&K.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,_.pop(),_.length>0?A=_[_.length-1]:A=null,O!==null&&O.renderEnd()};function Bl(b,D,W,k){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){let Re=D.isArrayCamera?de:te;if(!b.frustumCulled||b.intersectsFrustum(Re)){k&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ve);let me=re.update(b),we=b.material;we.visible&&A.push(b,me,we,W,Le.z,null,D)}}else if(b.isMesh||b.isLine||b.isPoints){let Re=D.isArrayCamera?de:te;if(!b.frustumCulled||b.intersectsFrustum(Re)){let me=re.update(b),we=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Le.copy(me.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(ve)),Array.isArray(we)){let Ie=me.groups;for(let qe=0,rt=Ie.length;qe<rt;qe++){let Ce=Ie[qe],at=we[Ce.materialIndex];at&&at.visible&&A.push(b,me,at,W,Le.z,Ce,D)}}else we.visible&&A.push(b,me,we,W,Le.z,null,D)}}}let xe=b.children;for(let Re=0,me=xe.length;Re<me;Re++)Bl(xe[Re],D,W,k)}function Hh(b,D,W,k){let{opaque:H,transmissive:xe,transparent:Re}=b;E.setupLightsView(W),ce===!0&&K.setGlobalState(C.clippingPlanes,W),k&&ge.viewport(ne.copy(k)),H.length>0&&la(H,D,W),xe.length>0&&la(xe,D,W),Re.length>0&&la(Re,D,W),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Gh(b,D,W,k){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[k.id]===void 0){let Ce=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[k.id]=new cn(1,1,{generateMipmaps:!0,type:Ce?En:sn,minFilter:Kn,samples:Math.max(4,_t.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let xe=E.state.transmissionRenderTarget[k.id],Re=k.viewport||ne;xe.setSize(Re.z*C.transmissionResolutionScale,Re.w*C.transmissionResolutionScale);let me=C.getRenderTarget(),we=C.getActiveCubeFace(),Ie=C.getActiveMipmapLevel();C.setRenderTarget(xe),C.getClearColor(Z),ye=C.getClearAlpha(),ye<1&&C.setClearColor(16777215,.5),C.clear(),st&&P.render(W);let qe=C.toneMapping;C.toneMapping=Un;let rt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),E.setupLightsView(k),ce===!0&&K.setGlobalState(C.clippingPlanes,k),la(b,W,k),We.updateMultisampleRenderTarget(xe),We.updateRenderTargetMipmap(xe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let at=0,Ct=D.length;at<Ct;at++){let yt=D[at],{object:xt,geometry:Xt,material:Pe,group:Jt}=yt;if(Pe.side===nn&&xt.layers.test(k.layers)){let ft=Pe.side;Pe.side=tn,Pe.needsUpdate=!0,Vh(xt,W,k,Xt,Pe,Jt),Pe.side=ft,Pe.needsUpdate=!0,Ce=!0}}Ce===!0&&(We.updateMultisampleRenderTarget(xe),We.updateRenderTargetMipmap(xe))}C.setRenderTarget(me,we,Ie),C.setClearColor(Z,ye),rt!==void 0&&(k.viewport=rt),C.toneMapping=qe}function la(b,D,W){let k=D.isScene===!0?D.overrideMaterial:null;for(let H=0,xe=b.length;H<xe;H++){let Re=b[H],{object:me,geometry:we,group:Ie}=Re,qe=Re.material;qe.allowOverride===!0&&k!==null&&(qe=k),me.layers.test(W.layers)&&Vh(me,D,W,we,qe,Ie)}}function Vh(b,D,W,k,H,xe){O!==null&&H.isNodeMaterial&&O.setObject(b,H),b.onBeforeRender(C,D,W,k,H,xe),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(C,D,W,k,b,xe),H.transparent===!0&&H.side===nn&&H.forceSinglePass===!1?(H.side=tn,H.needsUpdate=!0,C.renderBufferDirect(W,D,k,H,b,xe),H.side=vi,H.needsUpdate=!0,C.renderBufferDirect(W,D,k,H,b,xe),H.side=nn):C.renderBufferDirect(W,D,k,H,b,xe),b.onAfterRender(C,D,W,k,H,xe)}function Wh(b){let D=0;for(let W of b)W.texture!==null&&D++;return D}function Vs(b,D,W){D.isScene!==!0&&(D=it);let k=Oe.get(b),H=E.state.lights,xe=E.state.shadowsArray,Re=H.state.version,me=ee.getParameters(b,H.state,xe,D,W,E.state.lightProbeGridArray),we=ee.getProgramCacheKey(me),Ie=k.programs;k.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;let qe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;k.envMap=R.get(b.envMap||k.environment,qe),k.envMapRotation=k.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",mt),Ie=new Map,k.programs=Ie,k.programVariants=new Map);let rt=Ie.get(we);if(rt!==void 0){if(k.currentProgram===rt&&k.lightsStateVersion===Re)return qh(b,me),rt}else me.uniforms=ee.getUniforms(b),O!==null&&b.isNodeMaterial&&O.build(b,W,me),b.onBeforeCompile(me,C),rt=ee.acquireProgram(me,we),Ie.set(we,rt),k.uniforms=me.uniforms;let Ce=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ce.clippingPlanes=K.uniform),qh(b,me),k.needsLights=Wf(b),k.lightsStateVersion=Re,k.needsLights&&(Ce.ambientLightColor.value=H.state.ambient,Ce.lightProbe.value=H.state.probe,Ce.sunLights.value=H.state.sun,Ce.sunLightShadows.value=H.state.sunShadow,Ce.directionalLights.value=H.state.directional,Ce.directionalLightShadows.value=H.state.directionalShadow,Ce.spotLights.value=H.state.spot,Ce.spotLightShadows.value=H.state.spotShadow,Ce.rectAreaLights.value=H.state.rectArea,Ce.ltc_1.value=H.state.rectAreaLTC1,Ce.ltc_2.value=H.state.rectAreaLTC2,Ce.pointLights.value=H.state.point,Ce.pointLightShadows.value=H.state.pointShadow,Ce.hemisphereLights.value=H.state.hemi,Ce.sunShadowMatrix.value=H.state.sunShadowMatrix,Ce.sunShadowCascade.value=H.state.sunShadowCascade,Ce.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ce.spotLightMatrix.value=H.state.spotLightMatrix,Ce.spotLightMap.value=H.state.spotLightMap,Ce.pointShadowMatrix.value=H.state.pointShadowMatrix),k.numLightProbeGrids=Wh(E.state.lightProbeGridArray),k.currentProgram=rt,k.uniformsList=null,rt}function Hf(b,D,W,k,H){let xe=Oe.get(b),Re=xe.currentProgram.id+","+k+","+H,me=xe.programVariants.get(Re);return me===void 0?(me=Vs(b,D,W),xe.programVariants.set(Re,me)):(xe.currentProgram=me,xe.uniformsList=null,xe.outputColorSpace=k,xe.toneMapping=H),me}function Xh(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=Is.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function qh(b,D){let W=Oe.get(b);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function Gf(b,D,W,k,H){D.isScene!==!0&&(D=it),We.resetTextureUnits();let xe=D.fog,Re=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,me=se===null?C.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ot.workingColorSpace,we=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ie=R.get(k.envMap||Re,we),qe=k.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,rt=!!W.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ce=!!W.morphAttributes.position,at=!!W.morphAttributes.normal,Ct=!!W.morphAttributes.color,yt=Un;k.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(yt=C.toneMapping);let xt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Xt=xt!==void 0?xt.length:0,Pe=Oe.get(k),Jt=E.state.lights;if(ce===!0&&(Ee===!0||b!==Q)){let wt=b===Q&&k.id===q;K.setState(k,b,wt)}let ft=!1,wi=!1;k.version===Pe.__version?Pe.needsLights&&Pe.lightsStateVersion!==Jt.state.version||H.isBatchedMesh&&Pe.batching===!1||!H.isBatchedMesh&&Pe.batching===!0||H.isBatchedMesh&&Pe.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Pe.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Pe.instancing===!1||!H.isInstancedMesh&&Pe.instancing===!0||H.isSkinnedMesh&&Pe.skinning===!1||!H.isSkinnedMesh&&Pe.skinning===!0||H.isInstancedMesh&&Pe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Pe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Pe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Pe.instancingMorph===!1&&H.morphTexture!==null||Pe.envMap!==Ie||k.fog===!0&&Pe.fog!==xe||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==K.numPlanes||Pe.numIntersection!==K.numIntersection)||Pe.vertexAlphas!==qe||Pe.vertexTangents!==rt||Pe.morphTargets!==Ce||Pe.morphNormals!==at||Pe.morphColors!==Ct||Pe.morphTargetsCount!==Xt||Pe.numLightProbeGrids!==Wh(E.state.lightProbeGridArray)?ft=!0:(Pe.outputColorSpace!==me||Pe.toneMapping!==yt)&&(wi=!0):(ft=!0,Pe.__version=k.version);let qt=Pe.currentProgram;(ft===!0||wi===!0)&&(qt=wi===!0?Hf(k,D,H,me,yt):Vs(k,D,H),O&&k.isNodeMaterial&&O.onUpdateProgram(k,qt,Pe));let ca=!1,ai=!1,Ei=!1,ct=qt.getUniforms(),Vt=Pe.uniforms;if(ge.useProgram(qt.program)&&(ca=!0,ai=!0,Ei=!0),k.id!==q&&(q=k.id,ai=!0),ca||Q!==b){ge.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ct.setValue(F,"projectionMatrix",b.projectionMatrix),ct.setValue(F,"viewMatrix",b.matrixWorldInverse);let Ft=ct.map.cameraPosition;Ft!==void 0&&Ft.setValue(F,Ye.setFromMatrixPosition(b.matrixWorld)),_t.logarithmicDepthBuffer&&ct.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ct.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),Q!==b&&(Q=b,ai=!0,Ei=!0)}if(Pe.needsLights&&(Jt.state.sunShadowMap.length>0&&ct.setValue(F,"sunShadowMap",Jt.state.sunShadowMap,We),Jt.state.directionalShadowMap.length>0&&ct.setValue(F,"directionalShadowMap",Jt.state.directionalShadowMap,We),Jt.state.spotShadowMap.length>0&&ct.setValue(F,"spotShadowMap",Jt.state.spotShadowMap,We),Jt.state.pointShadowMap.length>0&&ct.setValue(F,"pointShadowMap",Jt.state.pointShadowMap,We)),H.isSkinnedMesh){ct.setOptional(F,H,"bindMatrix"),ct.setOptional(F,H,"bindMatrixInverse");let wt=H.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),ct.setValue(F,"boneTexture",wt.boneTexture,We))}H.isBatchedMesh&&(ct.setOptional(F,H,"batchingTexture"),ct.setValue(F,"batchingTexture",H._matricesTexture,We),ct.setOptional(F,H,"batchingIdTexture"),ct.setValue(F,"batchingIdTexture",H._indirectTexture,We),ct.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ct.setValue(F,"batchingColorTexture",H._colorsTexture,We));let xn=W.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&j.update(H,W,qt),(ai||Pe.receiveShadow!==H.receiveShadow)&&(Pe.receiveShadow=H.receiveShadow,ct.setValue(F,"receiveShadow",H.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(Vt.envMapIntensity.value=D.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=Qx()),ai){if(ct.setValue(F,"toneMappingExposure",C.toneMappingExposure),Pe.needsLights&&Vf(Vt,Ei),xe&&k.fog===!0&&he.refreshFogUniforms(Vt,xe),he.refreshMaterialUniforms(Vt,k,Me,Ue,E.state.transmissionRenderTarget[b.id]),Pe.needsLights&&Pe.numLightProbeGrids>0){let wt=y,Ft=0;for(let Hn of E.state.lightProbeGridArray)Hn.texture!==null&&(wt.textures[Ft]=Hn.texture,wt.min[Ft]=Hn.boundingBox.min,wt.max[Ft]=Hn.boundingBox.max,wt.resolution[Ft]=Hn.resolution,Ft++);for(let Hn in wt)wt[Hn].length=Ft;Vt.probesSH.value=wt.textures,Vt.probesMin.value=wt.min,Vt.probesMax.value=wt.max,Vt.probesResolution.value=wt.resolution}Is.upload(F,Xh(Pe),Vt,We)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Is.upload(F,Xh(Pe),Vt,We),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ct.setValue(F,"center",H.center),ct.setValue(F,"modelViewMatrix",H.modelViewMatrix),ct.setValue(F,"normalMatrix",H.normalMatrix),ct.setValue(F,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){let wt=k.uniformsGroups;for(let Ft=0,Hn=wt.length;Ft<Hn;Ft++){let $h=wt[Ft];Ne.update($h,qt),Ne.bind($h,qt)}}return qt}function Vf(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.sunLights.needsUpdate=D,b.sunLightShadows.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function Wf(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(b,D,W){let k=Oe.get(b);k.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Oe.get(b.texture).__webglTexture=D,Oe.get(b.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:W,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,D){let W=Oe.get(b);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,W=0){se=b,Y=D,V=W;let k=null,H=!1,xe=!1;if(b){let me=Oe.get(b);if(me.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(F.FRAMEBUFFER,me.__webglFramebuffer),ne.copy(b.viewport),Te.copy(b.scissor),Be=b.scissorTest,ge.viewport(ne),ge.scissor(Te),ge.setScissorTest(Be),q=-1;return}else if(me.__webglFramebuffer===void 0)We.setupRenderTarget(b);else if(me.__hasExternalTextures)We.rebindTextures(b,Oe.get(b.texture).__webglTexture,Oe.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let qe=b.depthTexture;if(me.__boundDepthTexture!==qe){if(qe!==null&&Oe.has(qe)&&(b.width!==qe.image.width||b.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(b)}}let we=b.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(xe=!0);let Ie=Oe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[D])?k=Ie[D][W]:k=Ie[D],H=!0):b.samples>0&&We.useMultisampledRTT(b)===!1?k=Oe.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?k=Ie[W]:k=Ie,ne.copy(b.viewport),Te.copy(b.scissor),Be=b.scissorTest}else ne.copy(ze).multiplyScalar(Me).floor(),Te.copy(Qe).multiplyScalar(Me).floor(),Be=nt;if(W!==0&&(k=X),ge.bindFramebuffer(F.FRAMEBUFFER,k)&&ge.drawBuffers(b,k),ge.viewport(ne),ge.scissor(Te),ge.setScissorTest(Be),H){let me=Oe.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+D,me.__webglTexture,W)}else if(xe){let me=D;for(let we=0;we<b.textures.length;we++){let Ie=Oe.get(b.textures[we]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+we,Ie.__webglTexture,W,me)}}else if(b!==null&&W!==0){let me=Oe.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,me.__webglTexture,W)}q=-1};function Yh(b){let D=Oe.get(b);return(D.__readFormat!==b.format||D.__readType!==b.type)&&(D.__readFormat=b.format,D.__readType=b.type,D.__formatReadable=_t.textureFormatReadable(b.format),D.__typeReadable=_t.textureTypeReadable(b.type)),D}this.readRenderTargetPixels=function(b,D,W,k,H,xe,Re,me=0){if(!(b&&b.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Oe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Re!==void 0&&(we=we[Re],Array.isArray(we)&&(we=we[0])),we){ge.bindFramebuffer(F.FRAMEBUFFER,we);try{let Ie=b.textures[me],qe=Ie.format,rt=Ie.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);let Ce=Yh(Ie);if(Ce.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-k&&W>=0&&W<=b.height-H&&F.readPixels(D,W,k,H,le.convert(qe),le.convert(rt),xe)}finally{let Ie=se!==null?Oe.get(se).__webglFramebuffer:null;ge.bindFramebuffer(F.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(b,D,W,k,H,xe,Re,me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Oe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Re!==void 0&&(we=we[Re],Array.isArray(we)&&(we=we[0])),we)if(D>=0&&D<=b.width-k&&W>=0&&W<=b.height-H){ge.bindFramebuffer(F.FRAMEBUFFER,we);let Ie=b.textures[me],qe=Ie.format,rt=Ie.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);let Ce=Yh(Ie);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,at),F.bufferData(F.PIXEL_PACK_BUFFER,xe.byteLength,F.STREAM_READ),F.readPixels(D,W,k,H,le.convert(qe),le.convert(rt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ct=se!==null?Oe.get(se).__webglFramebuffer:null;ge.bindFramebuffer(F.FRAMEBUFFER,Ct);let yt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ld(F,yt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,at),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,xe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(at),F.deleteSync(yt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,D=null,W=0){let k=Math.pow(2,-W),H=Math.floor(b.image.width*k),xe=Math.floor(b.image.height*k),Re=D!==null?D.x:0,me=D!==null?D.y:0;We.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,Re,me,H,xe),ge.unbindTexture()},this.copyTextureToTexture=function(b,D,W=null,k=null,H=0,xe=0){let Re,me,we,Ie,qe,rt,Ce,at,Ct,yt=b.isCompressedTexture?b.mipmaps[xe]:b.image;if(W!==null)Re=W.max.x-W.min.x,me=W.max.y-W.min.y,we=W.isBox3?W.max.z-W.min.z:1,Ie=W.min.x,qe=W.min.y,rt=W.isBox3?W.min.z:0;else{let ct=Math.pow(2,-H);Re=Math.floor(yt.width*ct),me=Math.floor(yt.height*ct),b.isDataArrayTexture?we=yt.depth:b.isData3DTexture?we=Math.floor(yt.depth*ct):we=1,Ie=0,qe=0,rt=0}k!==null?(Ce=k.x,at=k.y,Ct=k.z):(Ce=0,at=0,Ct=0);let xt=le.convert(D.format),Xt=le.convert(D.type),Pe;D.isData3DTexture?(We.setTexture3D(D,0),Pe=F.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(We.setTexture2DArray(D,0),Pe=F.TEXTURE_2D_ARRAY):(We.setTexture2D(D,0),Pe=F.TEXTURE_2D),ge.activeTexture(F.TEXTURE0),ge.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,D.flipY),ge.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),ge.pixelStorei(F.UNPACK_ALIGNMENT,D.unpackAlignment);let Jt=ge.getParameter(F.UNPACK_ROW_LENGTH),ft=ge.getParameter(F.UNPACK_IMAGE_HEIGHT),wi=ge.getParameter(F.UNPACK_SKIP_PIXELS),qt=ge.getParameter(F.UNPACK_SKIP_ROWS),ca=ge.getParameter(F.UNPACK_SKIP_IMAGES);ge.pixelStorei(F.UNPACK_ROW_LENGTH,yt.width),ge.pixelStorei(F.UNPACK_IMAGE_HEIGHT,yt.height),ge.pixelStorei(F.UNPACK_SKIP_PIXELS,Ie),ge.pixelStorei(F.UNPACK_SKIP_ROWS,qe),ge.pixelStorei(F.UNPACK_SKIP_IMAGES,rt);let ai=b.isDataArrayTexture||b.isData3DTexture,Ei=D.isDataArrayTexture||D.isData3DTexture;if(b.isDepthTexture){let ct=Oe.get(b),Vt=Oe.get(D),xn=Oe.get(ct.__renderTarget),wt=Oe.get(Vt.__renderTarget);ge.bindFramebuffer(F.READ_FRAMEBUFFER,xn.__webglFramebuffer),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let Ft=0;Ft<we;Ft++)ai&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Oe.get(b).__webglTexture,H,rt+Ft),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Oe.get(D).__webglTexture,xe,Ct+Ft)),F.blitFramebuffer(Ie,qe,Ie+Re,qe+me,Ce,at,Ce+Re,at+me,F.DEPTH_BUFFER_BIT,F.NEAREST);ge.bindFramebuffer(F.READ_FRAMEBUFFER,null),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||Oe.has(b)){let ct=Oe.get(b),Vt=Oe.get(D);ge.bindFramebuffer(F.READ_FRAMEBUFFER,I),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,G);for(let xn=0;xn<we;xn++)ai?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ct.__webglTexture,H,rt+xn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ct.__webglTexture,H),Ei?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Vt.__webglTexture,xe,Ct+xn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Vt.__webglTexture,xe),H!==0?F.blitFramebuffer(Ie,qe,Ie+Re,qe+me,Ce,at,Ce+Re,at+me,F.COLOR_BUFFER_BIT,F.NEAREST):Ei?F.copyTexSubImage3D(Pe,xe,Ce,at,Ct+xn,Ie,qe,Re,me):F.copyTexSubImage2D(Pe,xe,Ce,at,Ie,qe,Re,me);ge.bindFramebuffer(F.READ_FRAMEBUFFER,null),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ei?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Pe,xe,Ce,at,Ct,Re,me,we,xt,Xt,yt.data):D.isCompressedArrayTexture?F.compressedTexSubImage3D(Pe,xe,Ce,at,Ct,Re,me,we,xt,yt.data):F.texSubImage3D(Pe,xe,Ce,at,Ct,Re,me,we,xt,Xt,yt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,xe,Ce,at,Re,me,xt,Xt,yt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,xe,Ce,at,yt.width,yt.height,xt,yt.data):F.texSubImage2D(F.TEXTURE_2D,xe,Ce,at,Re,me,xt,Xt,yt);ge.pixelStorei(F.UNPACK_ROW_LENGTH,Jt),ge.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ft),ge.pixelStorei(F.UNPACK_SKIP_PIXELS,wi),ge.pixelStorei(F.UNPACK_SKIP_ROWS,qt),ge.pixelStorei(F.UNPACK_SKIP_IMAGES,ca),xe===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&F.generateMipmap(Pe),ge.unbindTexture()},this.initRenderTarget=function(b){Oe.get(b).__webglFramebuffer===void 0&&We.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?We.setTextureCube(b,0):b.isData3DTexture?We.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?We.setTexture2DArray(b,0):We.setTexture2D(b,0),ge.unbindTexture()},this.resetState=function(){Y=0,V=0,se=null,ge.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var Bn={lia:{id:"lia",name:"Lia",gender:"f",skin:16042408,skinDark:15315602,sheen:16751752,hair:"#7a3a24",hairStyle:"bob",top:3115663,topDark:2453363,topSheen:8378064,iris:["#3b2210","#7a4a1c","#b9792f","#8a5222","#2a160a"],lashes:!0,blush:.42,freckles:!0,brow:"#4b2415",browThick:15,lip:["#c4626a","#cf6c73","#9a3f47"],jaw:.3,necklace:!0,starClip:!0,earrings:!1,glasses:!1},maya:{id:"maya",name:"Maya",gender:"f",skin:10117954,skinDark:9066040,sheen:13666922,hair:"#2b1a12",hairStyle:"curly",top:14721072,topDark:12879388,topSheen:16769184,iris:["#1e1009","#3a200f","#5e3418","#40220e","#140a05"],lashes:!0,blush:.22,freckles:!1,brow:"#1e120c",browThick:16,lip:["#8e4048","#9c4a52","#6e2c33"],jaw:.28,necklace:!1,starClip:!1,earrings:!0,glasses:!1},ben:{id:"ben",name:"Ben",gender:"m",skin:15381644,skinDark:14393978,sheen:16751744,hair:"#3a2618",hairStyle:"short",top:3100550,topDark:2375275,topSheen:10139903,iris:["#14222e","#2d4a5e","#4f7a8e","#2f5064","#0e1820"],lashes:!1,blush:.14,freckles:!1,brow:"#2f1d12",browThick:21,lip:["#b3646a","#bd6e72","#8f474d"],jaw:.17,necklace:!1,starClip:!1,earrings:!1,glasses:!0}},et=Bn.lia,tv=new U(.95,1,.95);function dl(i){let e=i.y;if(e<0){let t=Math.min(1,-e);i.x*=1-et.jaw*t*t,i.z*=1-.06*t*t,i.y*=1-.04*t}else i.x*=1+.03*e;return i.multiply(tv),i}function Vi(i,e,t=1){let n=Math.sqrt(Math.max(0,1-i*i-e*e));return dl(new U(i,e,n).multiplyScalar(t))}function Yr(i,e=1,t){let n=i.attributes.position,s=new U;for(let r=0;r<n.count;r++)s.fromBufferAttribute(n,r),t&&t(s),s.normalize().multiplyScalar(e),dl(s),n.setXYZ(r,s.x,s.y,s.z);return i.computeVertexNormals(),i}function fh(i,e,t,n,s,r){let a=Math.PI/2-t,o=t*2,l=i-e,c=e*2,h=new Wt(1,72,48,a,o,l,c);Yr(h,r);let d=document.createElement("canvas");d.width=n,d.height=s;let u=d.getContext("2d"),f=new Li(d);f.colorSpace=Bt,f.anisotropy=4;let g=new Dn({map:f,transparent:!0,depthWrite:!1,roughness:.55,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),M=new Ze(h,g),m=(x,w)=>{let y=Math.acos(Math.max(-1,Math.min(1,w))),A=Math.sin(y)||1e-6;return[(Math.acos(Math.max(-1,Math.min(1,-x/A)))-a)/o*n,(y-l)/c*s]};return{mesh:M,canvas:d,ctx:u,tex:f,toPx:m,unit:(x,w,y)=>{let A=m(x-y/2,w),E=m(x+y/2,w);return Math.abs(E[0]-A[0])}}}function fl(i){let e=i;return()=>(e=e*16807%2147483647)/2147483647}function pl(i,e){let t=parseInt(i.slice(1),16),n=s=>Math.max(0,Math.min(255,Math.round(e>0?s+(255-s)*e:s*(1+e))));return`rgb(${n(t>>16)},${n(t>>8&255)},${n(t&255)})`}function jd(i){let e=document.createElement("canvas");e.width=256,e.height=256;let t=e.getContext("2d");t.fillStyle=i,t.fillRect(0,0,256,256);let n=pl(i,.35).replace("rgb","rgba").replace(")",","),s=pl(i,-.55).replace("rgb","rgba").replace(")",","),r=fl(7);for(let o=0;o<420;o++){let l=r()*256,c=.6+r()*1.8,h=r();t.strokeStyle=h>.6?`${n}${.25+r()*.3})`:`${s}${.25+r()*.35})`,t.lineWidth=c,t.beginPath(),t.moveTo(l,0),t.bezierCurveTo(l+(r()-.5)*14,85,l+(r()-.5)*14,170,l+(r()-.5)*10,256),t.stroke()}let a=new Li(e);return a.colorSpace=Bt,a.wrapS=a.wrapT=fs,a}function nv(i){let n=document.createElement("canvas");n.width=1024,n.height=512;let s=n.getContext("2d"),r=s.createRadialGradient(256,256,40,256,256,330);r.addColorStop(0,"#ffffff"),r.addColorStop(.6,"#f7f2ef"),r.addColorStop(1,"#e8d2cf"),s.fillStyle=r,s.fillRect(0,0,1024,512);let a=256,o=256,l=86,c=34,h=s.createRadialGradient(a,o,c*.8,a,o,l);h.addColorStop(0,i[0]),h.addColorStop(.18,i[1]),h.addColorStop(.55,i[2]),h.addColorStop(.85,i[3]),h.addColorStop(1,i[4]),s.fillStyle=h,s.beginPath(),s.arc(a,o,l,0,Math.PI*2),s.fill();let d=fl(3);for(let f=0;f<90;f++){let g=d()*Math.PI*2,M=c+4,m=l*(.75+d()*.2);s.strokeStyle=d()>.5?"rgba(240,190,110,0.35)":"rgba(60,30,10,0.35)",s.lineWidth=1+d()*1.5,s.beginPath(),s.moveTo(a+Math.cos(g)*M,o+Math.sin(g)*M),s.lineTo(a+Math.cos(g)*m,o+Math.sin(g)*m),s.stroke()}s.strokeStyle="rgba(30,14,5,0.85)",s.lineWidth=7,s.beginPath(),s.arc(a,o,l-3,0,Math.PI*2),s.stroke(),s.fillStyle="#0b0605",s.beginPath(),s.arc(a,o,c,0,Math.PI*2),s.fill(),s.fillStyle="rgba(255,255,255,0.95)",s.beginPath(),s.ellipse(a-28,o-30,16,13,0,0,Math.PI*2),s.fill(),s.fillStyle="rgba(255,255,255,0.7)",s.beginPath(),s.arc(a+26,o+28,7,0,Math.PI*2),s.fill();let u=new Li(n);return u.colorSpace=Bt,u.anisotropy=4,u}var Wi=(i,e,t)=>i+(e-i)*t,ph=(i,e,t)=>Math.max(e,Math.min(t,i)),rn={a:{open:.8,wide:.35,round:0},e:{open:.5,wide:.7,round:0},i:{open:.32,wide:.95,round:0},o:{open:.65,wide:-.2,round:.85},u:{open:.32,wide:-.4,round:1},m:{open:0,wide:0,round:0},f:{open:.12,wide:.3,round:0},w:{open:.22,wide:-.4,round:.9},l:{open:.38,wide:.3,round:0},s:{open:.18,wide:.6,round:0},c:{open:.3,wide:.2,round:.1},rest:{open:0,wide:0,round:0}};function iv(i,e){return"a".includes(i)?rn.a:"e".includes(i)?rn.e:"iy".includes(i)?rn.i:"o".includes(i)?e==="o"||e==="u"?rn.u:rn.o:"u".includes(i)?rn.u:"mbp".includes(i)?rn.m:"fv".includes(i)?rn.f:"wq".includes(i)?rn.w:"lntdr".includes(i)?rn.l:"szjx".includes(i)?rn.s:"h".includes(i)?null:rn.c}var ml=class{constructor(e,t="lia",n="high"){this.canvas=e,et=Bn[t]||Bn.lia,this.quality=n;let s=new cl({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance"});s.setPixelRatio(n==="low"?1:Math.min(window.devicePixelRatio||1,1.75)),s.outputColorSpace=Bt,s.toneMapping=Dr,s.toneMappingExposure=1,s.setClearColor(0,0),this.renderer=s,this.scene=new or,this.camera=new Kt(22,1,.1,60),this._lights(),this._build(),this.mode="idle",this.mood="neutral",this.mouth={open:0,wide:0,round:0,smile:.35},this.mouthTarget={...this.mouth},this.brow={raise:0,frown:0,asym:0},this.browTarget={...this.brow},this.gaze=new oe,this.gazeTarget=new oe,this.nextSaccade=0,this.blink=0,this.blinkT=-1,this.nextBlink=1.5,this.doubleBlink=!1,this.squint=0,this.word=null,this.speakingUntil=0,this.micLevel=0,this.nod=0,this.nodVel=0,this.talkLevel=0,this.talkAt=0,this.lastFrame=0,this.lastMouthKey="",this.lastBrowKey="",this.clock=new Lr,this.clock.connect(document),this.resize(),window.addEventListener("resize",()=>this.resize()),this._drawFace(),this._loop=this._loop.bind(this),requestAnimationFrame(this._loop)}_lights(){let e=this.scene;e.add(new Cr(16773341,3809816,1.1));let t=new xi(16769216,2.6);t.position.set(-2.5,3,4.5),e.add(t);let n=new xi(13623551,.7);n.position.set(3,.5,3),e.add(n);let s=new xi(16754784,2.2);s.position.set(3,2.5,-3),e.add(s);let r=new xi(11832575,1.4);r.position.set(-3.5,1,-2.5),e.add(r)}_build(){let e=new kt;this.scene.add(e),this.root=e;let t=new dn({color:et.skin,roughness:.55,sheen:.7,sheenColor:new Ge(et.sheen),sheenRoughness:.45});this.skinMat=t;let n=new kt;e.add(n),this.body=n;let s=new dn({color:et.top,roughness:.85,sheen:1,sheenColor:new Ge(et.topSheen),sheenRoughness:.8}),r=[],a=[[0,.05],[.4,.05],[.72,-.04],[1.08,-.16],[1.34,-.38],[1.45,-.72],[1.47,-1.2],[1.47,-2.8]];for(let[_,S]of a)r.push(new oe(_,S));let o=new Er(new Di(r).getPoints(40),64),l=new Ze(o,s);l.scale.set(1,1,.62),l.position.set(0,-1.24,-.12),n.add(l),this.torso=l;let c=new Ze(new Ni(.3,.34,1,32),t);c.position.set(0,-.85,-.12),n.add(c);let h=new Ze(new Ln(.42,.085,16,48),new dn({color:et.topDark,roughness:.9,sheen:1,sheenColor:new Ge(et.topSheen)}));h.scale.set(1,.85,1),h.rotation.x=Math.PI/2,h.position.set(0,-1.2,-.12),n.add(h);let d=new Dn({color:15909198,metalness:.9,roughness:.25});if(this.gold=d,et.necklace){let _=new Ze(new Ln(.42,.012,8,64,Math.PI*.62),d);_.rotation.set(Math.PI/2-.55,0,Math.PI+Math.PI*.19),_.position.set(0,-1.3,.02),n.add(_);let S=new Ze(this._starGeo(.07,.03,.025),d);S.position.set(0,-1.65,.3),S.rotation.x=-.35,n.add(S)}if(et.gender==="m")for(let _ of[-1,1]){let S=new Ze(new Ss(.16,.34,3),new Tr({color:14673648}));S.scale.set(1,1,.25),S.rotation.set(.35,0,_*2.5),S.position.set(_*.26,-1.36,.28),n.add(S)}let u=new kt;u.position.set(0,0,0),e.add(u),this.head=u;let f=Yr(new Wt(1,96,72),1);u.add(new Ze(f,t));for(let _ of[-1,1]){let S=new Ze(new Wt(.17,24,16),t);S.scale.set(.55,1,.7);let L=Vi(_*.97,-.08,.98);if(S.position.copy(L),S.rotation.y=_*.3,u.add(S),et.earrings){let C=new Ze(new Ln(.09,.014,8,32),this.gold);C.position.copy(L).add(new U(_*.03,-.2,.02)),C.rotation.y=_*1.2,u.add(C)}}this.facePatch=fh(Math.acos(-.05),.85,1.05,512,512,1.003),u.add(this.facePatch.mesh),this.browPatch=fh(Math.acos(.33),.24,.8,512,192,1.005),u.add(this.browPatch.mesh),this.mouthPatch=fh(Math.acos(-.53),.3,.42,384,320,1.005),u.add(this.mouthPatch.mesh);let g=new dn({color:et.skinDark,roughness:.5,sheen:.7,sheenColor:new Ge(et.sheen)}),M=Vi(0,-.19,1),m=new Ze(new Wt(.085,32,24),g);m.scale.set(1,.78,.85),m.position.copy(M).add(new U(0,0,-.035)),u.add(m);let p=new Ze(new Wt(.06,24,16),t);p.scale.set(.8,1.9,.7),p.position.copy(Vi(0,-.07,1)).add(new U(0,0,-.035)),u.add(p),this.eyes=[];let x=nv(et.iris),w=new Dn({map:x,roughness:.12,metalness:0}),y=new dn({color:et.skin,roughness:.55,side:nn,sheen:.7,sheenColor:new Ge(et.sheen)}),A=new Dn({color:1707272,roughness:.6}),E=.2;for(let _ of[-1,1]){let S=new kt,L=Vi(_*.335,-.01,1),C=L.clone().normalize();S.position.copy(L).addScaledVector(C,-.095),S.rotation.y=_*.06,u.add(S);let N=new kt;S.add(N);let O=new Ze(new Wt(E,48,32),w);N.add(O);let X=new kt;S.add(X);let I=new Ze(new Wt(E*1.03,40,20,0,Math.PI*2,0,Math.PI/2+.05),y);X.add(I);let G=new Ze(new Ln(E*1.035,et.lashes?.022:.012,8,48,Math.PI),A);G.rotation.x=Math.PI/2,G.position.y=-.008,X.add(G);for(let q=0;q<(et.lashes?3:0);q++){let Q=new Ze(new Ss(.012,.07,6),A),ne=(_>0?.12:Math.PI-.12)+(_>0?1:-1)*q*.2;Q.position.set(Math.cos(ne)*E*1.04,-.005,Math.sin(ne)*E*1.06),Q.rotation.z=-_*(.9+q*.15),Q.rotation.x=.3,X.add(Q)}let Y=new kt;S.add(Y);let V=new Ze(new Wt(E*1.012,40,16,0,Math.PI*2,Math.PI/2-.05,Math.PI/2+.05),y);Y.add(V);let se=new Ze(new Wt(.02,12,8),new vs({color:16777215}));se.position.set(-.05,.06,E*.985),S.add(se),this.eyes.push({g:S,gazeG:N,upper:X,lower:Y,side:_})}if(et.glasses){let _=new Dn({color:1973796,roughness:.35,metalness:.4});for(let L of this.eyes){let C=new Ze(new Ln(.235,.022,10,48),_);C.scale.set(1.12,.86,1),C.position.copy(L.g.position).add(new U(0,0,.2)),u.add(C);let N=new Ze(new mr(.235,32),new dn({color:16777215,transparent:!0,opacity:.12,roughness:.05,metalness:0}));N.scale.set(1.12,.86,1),N.position.copy(C.position),u.add(N);let O=new Ze(new Ni(.014,.014,.85,8),_);O.rotation.x=Math.PI/2,O.position.set(L.side*.92,L.g.position.y+.04,C.position.z-.42),u.add(O)}let S=new Ze(new Ln(.07,.016,8,16,Math.PI),_);S.position.set(0,this.eyes[0].g.position.y+.04,this.eyes[0].g.position.z+.21),u.add(S)}et.hairStyle==="curly"?this._buildCurly(u):et.hairStyle==="short"?this._buildShort(u):this._buildHair(u)}_starGeo(e,t,n){let s=new ws;for(let a=0;a<10;a++){let o=a%2?t:e,l=Math.PI/2+a*Math.PI/5,c=Math.cos(l)*o,h=Math.sin(l)*o;a?s.lineTo(c,h):s.moveTo(c,h)}s.closePath();let r=new br(s,{depth:n,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2});return r.center(),r}_hairSheet(e,t,n,s){let r=new Fi(1,1,t,n),a=r.attributes.position,o=r.attributes.uv,l=new U;for(let c=0;c<a.count;c++){let h=o.getX(c),d=1-o.getY(c),{phi:u,theta:f,out:g}=s(h,d);l.set(-Math.cos(u)*Math.sin(f),Math.cos(f),Math.sin(u)*Math.sin(f)).multiplyScalar(g),dl(l),a.setXYZ(c,l.x,l.y,l.z)}return r.computeVertexNormals(),new Ze(r,e)}_hairMat(){let e=jd(et.hair);return e.repeat.set(6,1),new dn({color:16777215,map:e,roughness:.42,sheen:1,sheenColor:new Ge(pl(et.hair,.4)),sheenRoughness:.35,clearcoat:.25,clearcoatRoughness:.5,side:nn})}_buildCurly(e){let t=this._hairMat();t.map.repeat.set(1,1),t.roughness=.75,t.clearcoat=0;let n=new kt;e.add(n),this.hair=n;let s=new Wt(1,64,48,0,Math.PI*2,0,1.75);s.applyMatrix4(new ht().makeRotationX(-.72)),Yr(s,1.05),n.add(new Ze(s,t));let r=fl(21),a=new wr(1,2),o=[];for(let f=0;f<2e3&&o.length<240;f++){let g=r()*2-1,M=r()*Math.PI*2,m=Math.sqrt(1-g*g),p=new U(m*Math.cos(M),g,m*Math.sin(M));p.y<-.45||p.z>.25&&p.y<.6&&Math.abs(p.x)<.78||p.z>0&&p.y<.1&&Math.abs(p.x)<.9||o.push(p)}let l=new ys(a,t,o.length),c=new ht,h=new gn,d=new U;o.forEach((f,g)=>{let M=1.12+r()*.16+Math.max(0,f.y)*.18,m=dl(f.clone().multiplyScalar(M)),p=.15+r()*.08;d.set(p,p,p),h.setFromEuler(new hn(r()*3,r()*3,r()*3)),c.compose(m,h,d),l.setMatrixAt(g,c)}),n.add(l);let u=new ys(a,t,13);for(let f=0;f<13;f++){let g=-.72+f*.12,M=.6-Math.abs(g)*.12+(r()-.5)*.04,m=Vi(g,M,1.08),p=.12+r()*.04;d.set(p,p,p),h.setFromEuler(new hn(r()*3,r()*3,r()*3)),c.compose(m,h,d),u.setMatrixAt(f,c)}n.add(u)}_buildShort(e){let t=this._hairMat(),n=new kt;e.add(n),this.hair=n;let s=new Wt(1,96,64,0,Math.PI*2,0,1.55);s.applyMatrix4(new ht().makeRotationX(-.72)),Yr(s,1.045),n.add(new Ze(s,t));let r=[[-.35,.86,.5,.42],[-.08,.9,.35,.46],[.2,.88,.2,.42],[.45,.8,.05,.36]];for(let[a,o,l,c]of r){let h=Vi(a,o,1.07),d=new Ht;d.position.copy(h),d.lookAt(h.clone().multiplyScalar(2)),d.rotateZ(l);let u=new Ze(new Wt(1,24,16),t);u.scale.set(.2,c,.09),d.add(u),n.add(d)}}_buildHair(e){let t=jd(et.hair);t.repeat.set(6,1);let n=new dn({color:16777215,map:t,roughness:.42,sheen:1,sheenColor:new Ge(pl(et.hair,.4)),sheenRoughness:.35,clearcoat:.25,clearcoatRoughness:.5,side:nn}),s=new kt;e.add(s),this.hair=s;let r=Math.PI,a=new Wt(1,96,64,0,r*2,0,1.78);a.applyMatrix4(new ht().makeRotationX(-.8)),Yr(a,1.06),s.add(new Ze(a,n));let o=.92;if(s.add(this._hairSheet(n,96,40,(d,u)=>{let f=r/2+o+d*(2*r-2*o),g=Math.abs(Math.cos(f-r/2)),M=.04*Math.pow(Math.abs(Math.sin(d*r*22)),3),m=2.3-.12*(1-g)+M,p=.55+u*(m-.55),x=1.075+.13*Math.pow(u,2.2)-.05*Math.pow(u,6);return{phi:f,theta:p,out:x}})),s.add(this._hairSheet(n,80,30,(d,u)=>{let f=r/2-1.12+d*2.24,g=.74,M;d<g?M=.3+.28*Math.pow(d/g,1.8):M=.6-.1*((d-g)/(1-g));let m=d*4.5%1;M-=d<g?.06*Math.pow(Math.sin(m*r),2.5):0,M-=.22*Math.pow(Math.max(0,.18-d)/.18,1.5);let p=Math.acos(Math.max(-.95,Math.min(.95,M))),x=.12+u*(p-.12),w=1.075+.035*Math.sin(u*r)+.01*(1-u);return{phi:f,theta:x,out:w}})),!et.starClip)return;let l=new dn({color:16762941,roughness:.3,clearcoat:1}),c=new Ze(this._starGeo(.09,.04,.04),l),h=Vi(.6,.62,1.13);c.position.copy(h),c.lookAt(h.clone().multiplyScalar(2)),c.rotateZ(-.3),s.add(c)}_drawFace(){let{ctx:e,canvas:t,toPx:n,unit:s,tex:r}=this.facePatch;e.clearRect(0,0,t.width,t.height);for(let h of[-1,1]){let[d,u]=n(h*.48,-.2),f=s(h*.48,-.2,.36),g=e.createRadialGradient(d,u,0,d,u,f);g.addColorStop(0,`rgba(255,110,105,${et.blush})`),g.addColorStop(1,"rgba(255,110,105,0)"),e.fillStyle=g,e.beginPath(),e.ellipse(d,u,f,f*.75,0,0,Math.PI*2),e.fill()}let a=fl(11);for(let h=0;h<(et.freckles?34:0);h++){let u=(h%2?1:-1)*(.12+a()*.42),f=-.08-a()*.2,[g,M]=n(u,f);e.fillStyle=`rgba(150,78,45,${.25+a()*.25})`,e.beginPath(),e.arc(g,M,1.2+a()*1.6,0,Math.PI*2),e.fill()}let[o,l]=n(0,-.66),c=e.createRadialGradient(o,l,0,o,l,s(0,-.66,.3));c.addColorStop(0,"rgba(200,120,100,0.18)"),c.addColorStop(1,"rgba(200,120,100,0)"),e.fillStyle=c,e.beginPath(),e.arc(o,l,s(0,-.66,.3),0,Math.PI*2),e.fill(),r.needsUpdate=!0}_drawBrows(){let e=this.brow,t=`${e.raise.toFixed(3)}|${e.frown.toFixed(3)}|${e.asym.toFixed(3)}`;if(t===this.lastBrowKey)return;this.lastBrowKey=t;let{ctx:n,canvas:s,toPx:r,tex:a}=this.browPatch;n.clearRect(0,0,s.width,s.height);for(let o of[-1,1]){let l=e.raise+e.asym*o*.5,c=l*.05,h=c-e.frown*.04+l*.01,d=[[o*.15,.315+h],[o*.3,.375+c],[o*.46,.345+c*.8]].map(([p,x])=>r(p,x)),u=et.browThick,f=et.gender==="m"?9:5,g=[],M=[],m=16;for(let p=0;p<=m;p++){let x=p/m,w=(1-x)*(1-x)*d[0][0]+2*(1-x)*x*d[1][0]+x*x*d[2][0],y=(1-x)*(1-x)*d[0][1]+2*(1-x)*x*d[1][1]+x*x*d[2][1],A=Wi(u,f,x)*(1-.3*x*x);g.push([w,y-A/2]),M.push([w,y+A/2])}n.fillStyle=et.brow,n.beginPath(),n.moveTo(g[0][0],g[0][1]);for(let p of g)n.lineTo(p[0],p[1]);for(let p=M.length-1;p>=0;p--)n.lineTo(M[p][0],M[p][1]);n.closePath(),n.fill()}a.needsUpdate=!0}_drawMouth(){let e=this.mouth,t=`${e.open.toFixed(3)}|${e.wide.toFixed(3)}|${e.round.toFixed(3)}|${e.smile.toFixed(3)}`;if(t===this.lastMouthKey)return;this.lastMouthKey=t;let{ctx:n,canvas:s,toPx:r,unit:a,tex:o}=this.mouthPatch;n.clearRect(0,0,s.width,s.height);let[l,c]=r(0,-.47),h=a(0,-.47,1),d=h*.155*(1+.22*e.wide-.38*e.round+.12*e.smile),u=h*.3*e.open,f=h*.035*e.smile,g=c,M=[l-d,g-f],m=[l+d,g-f];if(e.open<.05){let _=h*.03*e.smile+2;n.strokeStyle=et.lip[2],n.lineWidth=4.5,n.lineCap="round",n.beginPath(),n.moveTo(M[0],M[1]),n.bezierCurveTo(l-d*.4,g+_,l+d*.4,g+_,m[0],m[1]),n.stroke();let S=n.createRadialGradient(l,g+_+9,1,l,g+_+9,d*.7);S.addColorStop(0,"rgba(214,105,110,0.75)"),S.addColorStop(1,"rgba(214,105,110,0)"),n.fillStyle=S,n.beginPath(),n.ellipse(l,g+_+8,d*.62,9,0,0,Math.PI*2),n.fill();let L=n.createRadialGradient(l,g-5,1,l,g-5,d*.6);L.addColorStop(0,"rgba(200,95,100,0.45)"),L.addColorStop(1,"rgba(200,95,100,0)"),n.fillStyle=L,n.beginPath(),n.ellipse(l,g-5,d*.55,6,0,0,Math.PI*2),n.fill(),o.needsUpdate=!0;return}let p=g-u*.38-f*.2+h*.012*e.smile,x=g+u*1+h*.02*e.smile,w=e.round*d*.35,y=()=>{n.beginPath(),n.moveTo(M[0],M[1]),n.bezierCurveTo(l-d*.55+w*.3,p,l+d*.55-w*.3,p,m[0],m[1]),n.bezierCurveTo(l+d*.8-w,x,l-d*.8+w,x,M[0],M[1]),n.closePath()};y();let A=n.createLinearGradient(0,p,0,x);A.addColorStop(0,"#3a0f14"),A.addColorStop(1,"#6b2128"),n.fillStyle=A,n.fill(),n.save(),y(),n.clip(),n.fillStyle="#fbf6ef";let E=Math.max(6,Math.min(u*.3,20));n.beginPath(),n.ellipse(l,p+E*.15,d*.78,E,0,0,Math.PI*2),n.fill(),e.open>.25&&(n.fillStyle="#d4646c",n.beginPath(),n.ellipse(l,x-2,d*.55,u*.32,0,0,Math.PI*2),n.fill()),n.restore(),n.lineJoin="round",n.lineCap="round",n.strokeStyle=et.lip[0],n.lineWidth=et.gender==="m"?4:6,n.beginPath(),n.moveTo(M[0],M[1]),n.bezierCurveTo(l-d*.55+w*.3,p-3,l+d*.55-w*.3,p-3,m[0],m[1]),n.stroke(),n.strokeStyle=et.lip[1],n.lineWidth=et.gender==="m"?6:9,n.beginPath(),n.moveTo(M[0]+3,M[1]+1),n.bezierCurveTo(l-d*.8+w,x+4,l+d*.8-w,x+4,m[0]-3,m[1]+1),n.stroke(),n.strokeStyle="rgba(255,210,210,0.45)",n.lineWidth=2.5,n.beginPath(),n.moveTo(l-d*.25,x+5),n.lineTo(l+d*.15,x+5),n.stroke(),o.needsUpdate=!0}setProfile(e){!Bn[e]||et===Bn[e]&&this.root||(et=Bn[e],this.root&&(this.scene.remove(this.root),this.root.traverse(t=>{t.geometry&&t.geometry.dispose();let n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let s of n)s.map&&s.map.dispose(),s.dispose()})),this._build(),this.lastMouthKey="",this.lastBrowKey="",this._drawFace())}get profile(){return et}setQuality(e){this.quality=e,this.renderer.setPixelRatio(e==="low"?1:Math.min(window.devicePixelRatio||1,1.75)),this.resize()}setTalkLevel(e){this.talkLevel=e,this.talkAt=performance.now(),e>.03&&(this.speakingUntil=this.talkAt+220)}setMode(e){this.mode=e}setMood(e){this.mood=e||"neutral",this.moodUntil=performance.now()+4e3}setMicLevel(e){this.micLevel=ph(e,0,1)}nodOnce(e=1){this.nodVel+=.9*e}speakWord(e,t){let n=(e||"").toLowerCase().replace(/[^a-záàâãéêíóôõúç']/g,""),s=[];for(let a=0;a<n.length;a++){let o=iv(n[a],n[a+1]);o&&s[s.length-1]!==o&&s.push(o)}s.length||s.push(rn.c),s.push(rn.rest);let r=performance.now();this.word={seq:s,start:r,dur:Math.max(120,t)},this.speakingUntil=r+t+250,Math.random()<.18&&(this.browTarget.raise=.35+Math.random()*.3)}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(e,t,!1);let n=e/t;this.camera.aspect=n;let s=2*Math.tan(qc.degToRad(this.camera.fov/2)),o=Math.max(2.75/(s*n),3.7/s),l=-.38;this.camera.position.set(0,l+.25,o),this.camera.lookAt(0,l,0),this.camera.updateProjectionMatrix()}_loop(e){if(requestAnimationFrame(this._loop),this.quality==="low"&&e-this.lastFrame<31)return;this.lastFrame=e,this.clock.update();let t=Math.min(.05,this.clock.getDelta()),n=this.clock.getElapsed(),s=performance.now();this._update(t,n,s),this.renderer.render(this.scene,this.camera)}_update(e,t,n){let s=this.mode,r=1-Math.pow(5e-4,e),a=this.mood;this.moodUntil&&n>this.moodUntil&&a!=="neutral"&&(a=this.mood="neutral");let o=.4,l=0,c=0,h=0,d=0;a==="happy"?(o=.95,l=.3,d=.6):a==="surprised"?(o=.25,l=.9):a==="thinking"?(o=.15,h=.6,c=.2):a==="sad"&&(o=0,c=-.6,l=.2),s==="listening"&&(l+=.15,o=Math.max(o,.5)),s==="thinking"&&(h=.55,o=.2);let u=n<this.speakingUntil||s==="speaking",f={open:0,wide:0,round:0,smile:o};if(this.word&&n<this.word.start+this.word.dur+200){let{seq:x,start:w,dur:y}=this.word,A=ph((n-w)/y,0,.999),E=x[Math.floor(A*x.length)];f={open:E.open*(.85+.15*Math.sin(t*20)),wide:E.wide,round:E.round,smile:o*.55}}else if(n-this.talkAt<200){let x=ph(this.talkLevel*1.35,0,1);f={open:x<.06?0:.15+x*.8,wide:.35*Math.sin(t*5.3)+.15,round:Math.max(0,.6*Math.sin(t*3.1+1))*(x>.3?1:.4),smile:o*.55}}else u&&s==="speaking"&&!this.word&&(f={open:Math.abs(Math.sin(t*10.5))*(.4+.3*Math.sin(t*3.1)),wide:.3*Math.sin(t*4.7),round:.2*Math.max(0,Math.sin(t*2.3)),smile:o*.6});this.word&&n>this.word.start+this.word.dur+200&&(this.word=null);let g=u?1-Math.pow(2e-5,e):r;for(let x of["open","wide","round","smile"])this.mouth[x]=Wi(this.mouth[x],f[x],g);this.mouth.open<.02&&(this.mouth.open=0),this._drawMouth(),this.browTarget.raise=Wi(this.browTarget.raise,l,1-Math.pow(.2,e));let M={raise:this.browTarget.raise,frown:c,asym:h};for(let x of["raise","frown","asym"])this.brow[x]=Wi(this.brow[x],M[x],r),this.brow[x]=Math.round(this.brow[x]*200)/200;if(this._drawBrows(),t>this.nextSaccade&&(s==="thinking"?this.gazeTarget.set(.45+Math.random()*.2,.55+Math.random()*.15):Math.random()<.75?this.gazeTarget.set((Math.random()-.5)*.18,(Math.random()-.5)*.12):this.gazeTarget.set((Math.random()-.5)*.7,(Math.random()-.5)*.35),this.nextSaccade=t+.6+Math.random()*2.2),this.gaze.lerp(this.gazeTarget,1-Math.pow(1e-6,e)),this.blinkT<0&&t>this.nextBlink&&(this.blinkT=0),this.blinkT>=0){this.blinkT+=e;let w=this.blinkT/.17;this.blink=w<.5?w*2:Math.max(0,2-w*2),w>=1&&(this.blinkT=-1,this.blink=0,!this.doubleBlink&&Math.random()<.2?(this.doubleBlink=!0,this.nextBlink=t+.12):(this.doubleBlink=!1,this.nextBlink=t+1.8+Math.random()*3.5))}this.squint=Wi(this.squint,d,r);for(let x of this.eyes){x.gazeG.rotation.y=this.gaze.x*.38,x.gazeG.rotation.x=-this.gaze.y*.3;let w=-.5+this.gaze.y*.25+this.squint*.12,y=.68;x.upper.rotation.x=Wi(w,y,this.blink),x.lower.rotation.x=.68-this.squint*.25+this.blink*.05}this.nodVel+=-this.nod*60*e-this.nodVel*8*e,this.nod+=this.nodVel*e,s==="listening"&&this.micLevel>.35&&Math.random()<e*.8&&this.nodOnce(.5);let m=u?1:0,p=s==="listening"?.07:s==="thinking"?-.05:0;this.head.rotation.y=.07*Math.sin(t*.45)+.03*Math.sin(t*1.3)+m*.04*Math.sin(t*2.1),this.head.rotation.x=.03*Math.sin(t*.7)+this.nod*.12+m*.025*Math.sin(t*3.3)+(s==="thinking"?-.06:0),this.head.rotation.z=Wi(this.head.rotation.z,p+.025*Math.sin(t*.37),r*.5),this.head.position.y=.012*Math.sin(t*1.6),this.torso.scale.y=1+.012*Math.sin(t*1.6),this.body.rotation.y=this.head.rotation.y*.3}};var lt=window.Android,It=!!lt,sv=0,Qd=i=>`${i}${Date.now().toString(36)}${(sv++).toString(36)}`,Zr=new Map;window.__nativeHttp=(i,e,t)=>{let n=Zr.get(i);n&&(Zr.delete(i),n({status:e,text:t}))};async function Ns(i,e,t,n=7e4){let s=JSON.stringify(t);if(It){let o=Qd("h");return await new Promise(l=>{Zr.set(o,l),lt.http(o,"POST",i,JSON.stringify(e),s),setTimeout(()=>{Zr.has(o)&&(Zr.delete(o),l({status:0,text:"timeout"}))},n+5e3)})}let r=new AbortController,a=setTimeout(()=>r.abort(),n);try{let o=await fetch(i,{method:"POST",headers:e,body:s,signal:r.signal});return{status:o.status,text:await o.text()}}catch(o){return{status:0,text:String(o)}}finally{clearTimeout(a)}}var Xi=new Map;window.__nativeTts=(i,e,t,n)=>{let s=Xi.get(e);if(s)if(i==="start")s.h.onStart&&s.h.onStart();else if(i==="range"){let r=s.text.slice(t,n);s.h.onWord&&s.h.onWord(r,t,n)}else(i==="done"||i==="error"||i==="stopped")&&(Xi.delete(e),s.resolve(i))};var mh=[];if(!It&&window.speechSynthesis){let i=()=>{mh=speechSynthesis.getVoices()};i(),speechSynthesis.onvoiceschanged=i}function Ds(i,e,t,n,s={}){return new Promise(r=>{if(It){let h=Qd("t");Xi.set(h,{text:i,h:s,resolve:r}),lt.speak(h,i,e,t,n||"");let d=8e3+i.length*150/t;setTimeout(()=>{Xi.has(h)&&(Xi.delete(h),r("timeout"))},d);return}if(!window.speechSynthesis){setTimeout(()=>r("done"),400+i.length*50);return}let a=!1,o=h=>{a||(a=!0,r(h))};setTimeout(()=>o("timeout"),3e3+i.length*110/t);let l=new SpeechSynthesisUtterance(i);l.lang=e.startsWith("pt")?"pt-BR":"en-US",l.rate=t;let c=mh.find(h=>h.name===n);c&&(l.voice=c),l.onstart=()=>s.onStart&&s.onStart(),l.onboundary=h=>{if(h.name&&h.name!=="word")return;let u=i.slice(h.charIndex).match(/^[\w'’-]+/);u&&s.onWord&&s.onWord(u[0],h.charIndex,h.charIndex+u[0].length)},l.onend=()=>o("done"),l.onerror=()=>o("error"),speechSynthesis.speak(l)})}function ei(){It?lt.stopSpeak():window.speechSynthesis&&speechSynthesis.cancel();for(let[i,e]of Xi)Xi.delete(i),e.resolve("stopped")}function ef(){if(It)try{return JSON.parse(lt.voices()||"[]")}catch{return[]}return mh.filter(i=>/^en/i.test(i.lang)).map(i=>({name:i.name,lang:i.lang,local:i.localService}))}var Jr=null;window.__nativeStt=(i,e)=>{let t=Jr;if(t)if(i==="ready")t.onReady&&t.onReady();else if(i==="partial")t.onPartial&&t.onPartial(e);else if(i==="level")t.onLevel&&t.onLevel(Number(e));else if(i==="result"){let n=[];try{n=JSON.parse(e)}catch{n=[e]}Jr=null,t.onResult&&t.onResult(n)}else i==="error"&&(Jr=null,t.onError&&t.onError(e))};var An=null;function gh(i,e){if(Jr=e,It){lt.listen(i);return}let t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!t){setTimeout(()=>window.__nativeStt("error","unavailable"),50);return}An=new t,An.lang=i,An.interimResults=!0,An.maxAlternatives=3;let n=!1;An.onstart=()=>window.__nativeStt("ready"),An.onresult=s=>{let r=s.results[s.results.length-1];r.isFinal?(n=!0,window.__nativeStt("result",JSON.stringify(Array.from(r).map(a=>a.transcript)))):window.__nativeStt("partial",r[0].transcript)},An.onerror=s=>{n=!0,window.__nativeStt("error",s.error==="no-speech"?"no_match":s.error)},An.onend=()=>{n||window.__nativeStt("error","no_match")},An.start()}function ti(){if(Jr=null,It)lt.stopListen();else if(An)try{An.abort()}catch{}}function Kr(i){if(It&&lt.setBoost)try{lt.setBoost(Math.round(i*100))}catch{}}function _h(){if(It&&lt.ensureAudible)try{lt.ensureAudible()}catch{}}function tf(i){It?lt.openUrl(i):window.open(i,"_blank")}function nf(){try{return It?lt.appVersion():"web"}catch{return"?"}}var xh=null;window.__nativeMic=(i,e,t,n)=>{let s=xh;s&&(t==="data"?s.onData&&s.onData(i,Number(e)):s.onEvent&&s.onEvent(t,n))};function sf({call:i=!1,half:e=!0,chunkMs:t=100}={},n={}){xh=n,It&&lt.micStart?lt.micStart(!!i,!!e,t):setTimeout(()=>n.onEvent&&n.onEvent("unavailable"),30)}function _l(){xh=null,It&&lt.micStop&&lt.micStop()}var $r={};window.__nativeAudio=(i,e,t)=>{i==="level"?$r.onLevel&&$r.onLevel(Number(e),t):i==="drained"&&(rf=Date.now(),$r.onDrained&&$r.onDrained(t),rv.splice(0).forEach(s=>s(t)))};var rv=[],rf=0,af=()=>rf;function of(i){$r=i||{}}var xl={ctx:null,t:0,rate:24e3,timer:null,playing:!1,srcs:[],open(i){this.rate=i;try{this.ctx=this.ctx||new(window.AudioContext||window.webkitAudioContext)}catch{this.ctx=null}this.t=0},write(i){let e=atob(i),t=e.length>>1,n=new Float32Array(t),s=0;for(let c=0;c<t;c++){let h=e.charCodeAt(2*c)|e.charCodeAt(2*c+1)<<8;h>32767&&(h-=65536),n[c]=h/32768,s+=n[c]*n[c]}let r=Math.min(1,Math.sqrt(s/Math.max(1,t))*4),a=t/this.rate,o=this.ctx?this.ctx.currentTime:performance.now()/1e3,l=Math.max(o,this.t);if(this.t=l+a,this.ctx){let c=this.ctx.createBuffer(1,t,this.rate);c.copyToChannel(n,0);let h=this.ctx.createBufferSource();h.buffer=c,h.connect(this.ctx.destination),h.start(l),this.srcs.push(h)}this.playing=!0,setTimeout(()=>window.__nativeAudio("level",r,"web"),Math.max(0,(l-o)*1e3)),clearTimeout(this.timer),this.timer=setTimeout(()=>{this.playing=!1,window.__nativeAudio("level",0,"web"),window.__nativeAudio("drained",0,"web")},(this.t-o)*1e3+50)},flush(){this.srcs.forEach(i=>{try{i.stop()}catch{}}),this.srcs=[],this.t=0,clearTimeout(this.timer),this.playing&&(this.playing=!1,window.__nativeAudio("drained",0,"web"))}};function qi(i=24e3,e=!1,t="live"){It&&lt.playerOpen?lt.playerOpen(i,!!e,t):xl.open(i)}function vh(i){It&&lt.playerWrite?lt.playerWrite(i):xl.write(i)}function ni(){It&&lt.playerFlush?lt.playerFlush():xl.flush()}function vl(){It&&lt.playerClose?lt.playerClose():xl.flush()}function yl(i){It&&lt.setCallMode&&lt.setCallMode(!!i)}var gl=null;window.__nativeRec=(i,e)=>{let t=gl;t&&(i==="level"?t.onLevel&&t.onLevel(Number(e)):i==="speech"?t.onSpeech&&t.onSpeech():i==="ready"?t.onReady&&t.onReady():(gl=null,i==="done"?t.onDone&&t.onDone(e):i==="none"?t.onNone&&t.onNone():t.onError&&t.onError(e)))};var Us=It&&!!(lt&&lt.recordStart);function lf(i,e){gl=e,Us?lt.recordStart(i):setTimeout(()=>window.__nativeRec("error","unavailable"),30)}function cf(){Us&&lt.recordStop()}function Ml(){gl=null,Us&&lt.recordCancel()}function hf(i,e,t,n,s){It&&lt.setReminder&&lt.setReminder(!!i,e|0,t|0,n,s)}var kn={gemini:{name:"Google Gemini",model:"gemini-3.5-flash",keyUrl:"https://aistudio.google.com/apikey"},anthropic:{name:"Anthropic Claude",model:"claude-haiku-5-5",keyUrl:"https://console.anthropic.com/settings/keys"},openai:{name:"OpenAI",model:"gpt-5.6-luna",keyUrl:"https://platform.openai.com/api-keys"}},bl={iniciante:"BEGINNER (iniciante). Explain mostly in Brazilian Portuguese, short and simple. Every English sentence must be very short (2-6 words) and very common. Translate each English sentence to Portuguese right after it.",basico:"ELEMENTARY (b\xE1sico). Mix: simple English sentences followed by a short Portuguese explanation when something is new. English sentences up to ~8 words.",intermediario:"INTERMEDIATE (intermedi\xE1rio). Speak mostly English at a natural but clear pace. Use Portuguese only to translate a new word or clarify a mistake.",avancado:"ADVANCED (avan\xE7ado). English only. Natural speed, phrasal verbs, idioms, follow-up questions. Correct subtle mistakes."},wl={realtime:`REAL-TIME CORRECTION MODE (the student asked to be corrected every time):
- After EVERY sentence the student says in English, check grammar, word choice and pronunciation. The speech recognizer writes what it heard: strange or wrong words in the transcript usually mean a pronunciation problem \u2014 treat them as pronunciation mistakes.
- If there is ANY mistake, fill "correction" with what they said, the correct sentence and a very short explanation in Portuguese, say the correct sentence out loud, and put the correct sentence in "repeat" so they practice it right away. Then continue the conversation in the next turn.
- If the sentence was correct, leave "correction" empty and praise briefly (vary the praise).`,light:'LIGHT CORRECTION MODE: only correct mistakes that change the meaning or make the sentence hard to understand. Fill "correction" only in those cases. Prioritize keeping the conversation flowing.',off:`NO CORRECTION MODE: do not correct the student's grammar; keep "correction" empty and just keep the conversation going naturally (you may model the right form in your own answer).`};function Mh({level:i,vocab:e,correct:t="realtime",tutor:n="Lia",scenario:s=""}){let r=(e||[]).slice(-25).map(a=>a.en).join(", ")||"(nenhuma ainda)";return`You are ${n}, a warm, upbeat and patient English tutor on a live video call with a Brazilian student (native language: Brazilian Portuguese).

YOU CAN SEE THE STUDENT'S WORLD: many turns include a photo taken right now by the student's phone camera (their room, what they are doing, objects in their hands, food, the kitchen, the street...). Your method is to teach English from the student's real day-to-day life: notice what they are doing or what is around them and turn it into tiny, practical lessons \u2014 vocabulary for objects, verbs for actions (present continuous: "I'm cooking"), and useful phrases for that exact situation.

STUDENT LEVEL: ${bl[i]||bl.iniciante}
${s?`
TODAY'S LESSON: ${s}
`:""}
CONVERSATION RULES
- This is a SPOKEN call. Keep every turn short: at most 3 short sentences in total. Be natural, friendly and encouraging. No lists, no emojis, no markdown, no special symbols.
- Almost every turn, give the student ONE short English sentence to say out loud (field "repeat"), preferably about what they are doing or seeing right now. Example: "I'm washing the dishes."
- When the student tried to repeat a sentence you will receive an automatic pronunciation score. React honestly: if score >= 80 praise briefly and move on to something new; if lower, say which word(s) to improve and ask them to try once more (give the same "repeat"). Never ask more than twice for the same sentence.
${wl[t]||wl.realtime}
- If the student speaks Portuguese or asks a question, answer briefly and bring them back to English practice.
- About the image: talk about objects, actions, places, food, colors, weather. Never comment on the student's body, looks or appearance. If the image is dark or unclear, say it briefly and continue the conversation normally. Don't describe the same thing again if you already taught it \u2014 vary the topic.
- From time to time review one of the student's saved words: ${r}.

OUTPUT: reply ONLY with a JSON object (no markdown, no text outside it):
{"speech":[{"lang":"pt","text":"..."},{"lang":"en","text":"..."}],"correction":{"said":"","correct":"","explain_pt":""},"repeat":"","repeat_pt":"","new_words":[{"en":"","pt":""}],"mood":"happy","seen":""}
- "speech": what you say out loud, split in parts by language, in speaking order. English parts use "lang":"en", Portuguese parts use "lang":"pt".
- "correction": when correcting the student, "said" = what they said (as heard), "correct" = the right English sentence, "explain_pt" = a very short reason in Portuguese (max 12 words). Otherwise use empty strings.
- "repeat": the English sentence the student should say now (or "" if none). "repeat_pt": its Portuguese translation.
- "new_words": up to 3 genuinely new useful words or expressions from this turn (English + Portuguese). Empty list if none.
- "mood": one of happy, neutral, surprised, thinking.
- "seen": a few words in Portuguese about what you see in the photo (or "" if there is no photo).`}function Tl(i,e={}){let t=e.hasImage?"":`
(Sem imagem: a c\xE2mera est\xE1 desligada.)`;switch(i){case"start":return`[Chamada iniciada] Cumprimente o aluno de forma calorosa e curta e comece a aula de hoje (veja TODAY'S LESSON, se houver). Se fizer sentido, comente em uma frase o que voc\xEA v\xEA na c\xE2mera.${t}`;case"review":return`[Chamada iniciada \u2014 aula de revis\xE3o] Cumprimente rapidamente e revise uma por uma as palavras salvas do aluno, pedindo para ele usar cada palavra numa frase curta.${t}`;case"look":return`[O aluno tocou em "O que estou fazendo?"] Olhe a foto atual e ensine como dizer em ingl\xEAs o que ele est\xE1 fazendo ou o que aparece em destaque. D\xEA uma frase para ele repetir.${t}`;case"idle":return`[O aluno ficou um tempo em sil\xEAncio] Olhe a foto atual e puxe uma conversa curta sobre o que ele est\xE1 fazendo agora, ou proponha uma frase nova para repetir.${t}`;case"user":{let n=`O aluno falou (reconhecimento de voz em ${e.lang==="pt-BR"?"portugu\xEAs":"ingl\xEAs"}): "${e.text}"`;return e.repeat&&(n+=`
Ele estava tentando repetir: "${e.repeat}". Pontua\xE7\xE3o autom\xE1tica de pron\xFAncia: ${e.score}%.`,e.missed&&e.missed.length&&(n+=` Palavras com problema: ${e.missed.join(", ")}.`),e.issue&&(n+=` Avalia\xE7\xE3o pelo som do \xE1udio: ${e.issue}.`)),n+t}default:return String(e.text||"")}}function pf(i){if(!i)return null;let e=i.trim().replace(/^```(?:json)?/i,"").replace(/```$/,"").trim(),t=e.indexOf("{"),n=e.lastIndexOf("}");t>=0&&n>t&&(e=e.slice(t,n+1));try{return JSON.parse(e)}catch{return null}}function ii(i){return String(i||"").replace(/[*_#`~>|]/g,"").replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu,"").replace(/\s+/g," ").trim()}function yh(i){let e=pf(i);if(!e){let a=ii(i).slice(0,400);return{speech:a?[{lang:"en",text:a}]:[],correction:null,repeat:"",repeat_pt:"",new_words:[],mood:"neutral",seen:""}}let t=Array.isArray(e.speech)?e.speech:typeof e.speech=="string"?[{lang:"en",text:e.speech}]:[];t=t.map(a=>({lang:String(a.lang||"en").toLowerCase().startsWith("pt")?"pt":"en",text:ii(a.text)})).filter(a=>a.text);let n=(Array.isArray(e.new_words)?e.new_words:[]).filter(a=>a&&a.en).slice(0,3).map(a=>({en:String(a.en).trim(),pt:String(a.pt||"").trim()})),s=null,r=e.correction;if(r&&typeof r=="object"&&ii(r.correct)){let a=ii(r.said),o=ii(r.correct);a.toLowerCase().replace(/[^a-z ]/g,"")===o.toLowerCase().replace(/[^a-z ]/g,"")||(s={said:a,correct:o,explain:ii(r.explain_pt)})}return{speech:t,correction:s,repeat:ii(e.repeat),repeat_pt:ii(e.repeat_pt),new_words:n,mood:["happy","neutral","surprised","thinking","sad"].includes(e.mood)?e.mood:"neutral",seen:ii(e.seen)}}function jr(i,e){let t="";try{let n=JSON.parse(e);t=n.error&&(n.error.message||n.error.type)||n.message||""}catch{t=(e||"").slice(0,160)}return i===0?"Sem conex\xE3o com a internet (ou a IA demorou demais).":i===401||i===403||/api key|API_KEY|invalid.*key|authentication/i.test(t)?"Chave da API inv\xE1lida ou sem permiss\xE3o. Confira nas Configura\xE7\xF5es.":i===429?"Limite de uso da IA atingido. Espere um pouco ou confira seu plano/cr\xE9ditos.":i===404?`Modelo n\xE3o encontrado. Troque o nome do modelo nas Configura\xE7\xF5es. (${t})`:i===402||/credit|billing|quota/i.test(t)?"Sem cr\xE9ditos na conta da IA. Confira o faturamento da sua conta.":`Erro da IA (${i}): ${t}`}var Sl={};async function Sh(i,e,t,n,s){let r=i.provider,a=(i.model||kn[r].model).trim(),o=(i.key||"").trim();if(!o)throw new Error("Coloque sua chave da API nas Configura\xE7\xF5es.");let l;if(r==="gemini"){let p=t.map(O=>({role:O.role==="assistant"?"model":"user",parts:[{text:O.text}]})),x=[{text:n}];s&&x.unshift({inline_data:{mime_type:"image/jpeg",data:s}}),p.push({role:"user",parts:x});let w=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(a)}:generateContent`,y={systemInstruction:{parts:[{text:e}]},contents:p,generationConfig:{temperature:.8,maxOutputTokens:1200,responseMimeType:"application/json"}},A={"Content-Type":"application/json","x-goog-api-key":o},E=["minimal","low",null],_=Sl[a]||0;for(;;){let O=JSON.parse(JSON.stringify(y));if(E[_]&&(O.generationConfig.thinkingConfig={thinkingLevel:E[_]}),l=await Ns(w,A,O),l.status===400&&/thinking/i.test(l.text)&&_<E.length-1){_++,Sl[a]=_;continue}break}if(l.status!==200)throw new Error(jr(l.status,l.text));let S=JSON.parse(l.text),L=S.candidates&&S.candidates[0],C=L&&L.content&&(L.content.parts||[]).filter(O=>!O.thought).map(O=>O.text||"").join("");if(!C)throw new Error("A IA n\xE3o respondeu (talvez a imagem tenha sido bloqueada). Tente de novo.");let N=S.usageMetadata||{};return{...yh(C),usage:{in:N.promptTokenCount||0,out:(N.candidatesTokenCount||0)+(N.thoughtsTokenCount||0)}}}if(r==="anthropic"){let p=t.map(E=>({role:E.role,content:E.text})),x=[{type:"text",text:n}];if(s&&x.unshift({type:"image",source:{type:"base64",media_type:"image/jpeg",data:s}}),p.push({role:"user",content:x}),l=await Ns("https://api.anthropic.com/v1/messages",{"Content-Type":"application/json","x-api-key":o,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},{model:a,max_tokens:800,system:e,messages:p}),l.status!==200)throw new Error(jr(l.status,l.text));let w=JSON.parse(l.text),y=(w.content||[]).filter(E=>E.type==="text").map(E=>E.text).join(""),A=w.usage||{};return{...yh(y),usage:{in:A.input_tokens||0,out:A.output_tokens||0}}}let c=[{role:"system",content:e}];for(let p of t)c.push({role:p.role,content:p.text});let h=[{type:"text",text:n}];s&&h.push({type:"image_url",image_url:{url:`data:image/jpeg;base64,${s}`,detail:"low"}}),c.push({role:"user",content:h});let d={model:a,messages:c,response_format:{type:"json_object"}},u={"Content-Type":"application/json",Authorization:`Bearer ${o}`},f=["minimal","low",null],g=Sl["oa:"+a]||0;for(;;){if(l=await Ns("https://api.openai.com/v1/chat/completions",u,f[g]?{...d,reasoning_effort:f[g]}:d),l.status===400&&/reasoning/i.test(l.text)&&g<f.length-1){g++,Sl["oa:"+a]=g;continue}break}if(l.status!==200)throw new Error(jr(l.status,l.text));let M=JSON.parse(l.text),m=M.usage||{};return{...yh(M.choices&&M.choices[0]&&M.choices[0].message&&M.choices[0].message.content),usage:{in:m.prompt_tokens||0,out:m.completion_tokens||0}}}var uf={"i'm":"i am","you're":"you are","we're":"we are","they're":"they are","he's":"he is","she's":"she is","it's":"it is","that's":"that is","there's":"there is","what's":"what is","where's":"where is","let's":"let us","don't":"do not","doesn't":"does not","didn't":"did not","can't":"can not",cannot:"can not","won't":"will not","isn't":"is not","aren't":"are not","wasn't":"was not","i've":"i have","you've":"you have","i'll":"i will","you'll":"you will","i'd":"i would",wanna:"want to",gonna:"going to",ok:"okay"};function El(i){return String(i||"").toLowerCase().replace(/[’`]/g,"'").replace(/[^a-z0-9' ]+/g," ").split(/\s+/).filter(Boolean).flatMap(e=>uf[e]?uf[e].split(" "):[e.replace(/^'+|'+$/g,"")]).filter(Boolean)}function Yi(i,e){let t=String(i||"").split(/\s+/).filter(Boolean),n=El(e),s=0;return t.map(r=>{let a=El(r);if(!a.length)return!0;let o=!0;for(let l of a){let c=n.indexOf(l,s);if(c===-1){o=!1;break}s=c+1}return o})}function mf(i,e){let t=El(i);if(!t.length)return null;let n={score:0,missed:t.slice(),heard:e[0]||""};for(let s of e){let r=El(s),a=Array.from({length:t.length+1},()=>new Array(r.length+1).fill(0));for(let u=1;u<=t.length;u++)for(let f=1;f<=r.length;f++)a[u][f]=t[u-1]===r[f-1]?a[u-1][f-1]+1:Math.max(a[u-1][f],a[u][f-1]);let o=new Set,l=t.length,c=r.length;for(;l>0&&c>0;)t[l-1]===r[c-1]?(o.add(l-1),l--,c--):a[l-1][c]>=a[l][c-1]?l--:c--;let h=Math.max(0,r.length-t.length),d=Math.round(o.size/t.length*100-Math.min(15,h*4));d=Math.max(0,Math.min(100,d)),(d>n.score||s===e[0]&&n.score===0)&&(n={score:d,missed:t.filter((u,f)=>!o.has(f)),heard:s})}return n}function gf({level:i,vocab:e,correct:t="realtime",tutor:n="Lia",scenario:s="",due:r=[]}){let a=(e||[]).slice(-25).map(l=>l.en).join(", ")||"(none yet)",o=r.length?r.slice(0,12).map(l=>`${l.en} (${l.pt})`).join(", "):"";return`You are ${n}, a warm, upbeat and patient English tutor on a LIVE VOICE + VIDEO CALL with a Brazilian student (native language: Brazilian Portuguese). You talk in real time, like a real person on a call.

YOU CAN SEE: you periodically receive images from the student's phone camera (their room, what they are doing, objects, food, the street). Teach English from the student's real day-to-day life: notice what they are doing or what is around them and turn it into tiny, practical lessons (objects, actions in present continuous, useful phrases for that exact situation).

YOU CAN HEAR THE REAL VOICE: judge pronunciation from the SOUND, not only the words. Pay special attention to typical Brazilian difficulties: "th" (think/this said as f/d/t), initial "h" (house said like "rouse"), extra vowel at the end of words (big -> "bigi", Facebook -> "Facebooki"), final -ed and -s, short vs long vowels (ship/sheep, full/fool), "r" sounds, word stress, and the schwa. Explain how to place the tongue/lips briefly in Portuguese when needed.

STUDENT LEVEL: ${bl[i]||bl.iniciante}
${s?`
TODAY'S LESSON: ${s}
`:""}
${wl[t]||wl.realtime}

SPEAKING STYLE
- Short turns (1-3 short sentences), natural, friendly, encouraging, with natural pauses. Speak English clearly; for beginners speak English slowly.
- Almost every turn, give the student ONE short English sentence to say out loud, preferably about what they are doing or seeing right now.
- Never talk about the student's body, looks or appearance. If the image is unclear, just continue.
- Vary topics; don't repeat what you already taught.
- Student's saved words (review some from time to time): ${a}.
${o?`- Words due for review today (review these first, one by one): ${o}.`:""}

SCREEN TOOLS \u2014 the student also SEES a screen. Use these tools while you speak (never read the tool arguments aloud, never mention the tools):
- show_phrase: EVERY time you ask the student to repeat/say a sentence.
- show_correction: EVERY time you correct a mistake.
- show_pronunciation: right after the student tries to repeat a sentence (score 0-100 judged by the sound, problem words, a short tip in Portuguese).
- save_words: when you teach new useful words/expressions (max 3 at a time).

Start the call now: greet the student warmly and briefly, say in one sentence what you see on the camera (if anything) and start the first mini-lesson.`}var df=["gemini-3.1-flash-tts-preview","gemini-2.5-flash-preview-tts"],ff=0;async function _f(i,e,t,n=!1){let s=n?`Say this slowly and very clearly, like an English teacher modeling pronunciation, with a short pause between words: ${e}`:`Say this warmly and naturally, like a friendly teacher on a video call. Portuguese parts in Brazilian Portuguese, English parts with a clear American accent: ${e}`;for(let r=ff;r<df.length;r++){let a=`https://generativelanguage.googleapis.com/v1beta/models/${df[r]}:generateContent`,o=await Ns(a,{"Content-Type":"application/json","x-goog-api-key":i},{contents:[{parts:[{text:s}]}],generationConfig:{responseModalities:["AUDIO"],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:t||"Aoede"}}}}},45e3);if(o.status===404||o.status===400&&/model|not found|not supported/i.test(o.text)){ff=r+1;continue}if(o.status!==200)throw new Error(jr(o.status,o.text));let l=JSON.parse(o.text),h=(l.candidates&&l.candidates[0]&&l.candidates[0].content&&l.candidates[0].content.parts||[]).find(u=>u.inlineData&&u.inlineData.data);if(!h)throw new Error("A voz natural n\xE3o retornou \xE1udio.");let d=/rate=(\d+)/.exec(h.inlineData.mimeType||"");return{b64:h.inlineData.data,rate:d?Number(d[1]):24e3}}throw new Error("Nenhum modelo de voz natural dispon\xEDvel.")}async function xf(i,e,t,n){let s=i.model||kn.gemini.model,r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent`,a=`You are an expert English pronunciation coach for Brazilian learners (level: ${n}).
The audio is a Brazilian student trying to say exactly: "${t}".
Listen to the ACTUAL SOUNDS (not just whether words are recognizable). Check: th, initial h, extra final vowels, -ed/-s endings, vowel length, r, word stress, missing or extra words.
Reply ONLY with JSON:
{"heard":"what the student actually said","score":0,"words":[{"w":"each word of the target, in order","ok":true}],"issue_pt":"the main problem in Portuguese (or empty)","tip_pt":"one short practical tip in Portuguese on how to make the sound (or a short praise)"}
Score: 90-100 native-like/clear, 75-89 good with small issues, 50-74 understandable with clear problems, below 50 hard to understand or wrong sentence.`,o=await Ns(r,{"Content-Type":"application/json","x-goog-api-key":i.key},{contents:[{role:"user",parts:[{inline_data:{mime_type:"audio/wav",data:e}},{text:a}]}],generationConfig:{temperature:.2,maxOutputTokens:700,responseMimeType:"application/json"}});if(o.status!==200)throw new Error(jr(o.status,o.text));let l=JSON.parse(o.text),c=l.candidates&&l.candidates[0],h=c&&c.content&&(c.content.parts||[]).filter(f=>!f.thought).map(f=>f.text||"").join(""),d=pf(h)||{},u=l.usageMetadata||{};return{heard:String(d.heard||""),score:Math.max(0,Math.min(100,Math.round(Number(d.score)||0))),words:Array.isArray(d.words)?d.words.map(f=>({w:String(f.w||""),ok:!!f.ok})):[],issue:String(d.issue_pt||""),tip:String(d.tip_pt||""),usage:{in:u.promptTokenCount||0,out:(u.candidatesTokenCount||0)+(u.thoughtsTokenCount||0)}}}var ov="wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent",Qr=["gemini-3.8-live","gemini-3.1-flash-live-preview","gemini-2.5-flash-native-audio-preview-12-2025"],vf=[{name:"show_phrase",description:"Show on the student's screen the English sentence they must say/repeat now, with its Brazilian Portuguese translation. Call it every time you ask the student to repeat something.",parameters:{type:"object",properties:{phrase:{type:"string",description:"English sentence to repeat"},translation_pt:{type:"string",description:"Portuguese translation"}},required:["phrase"]}},{name:"show_correction",description:"Show a correction card when the student made a mistake (grammar, wrong word or pronunciation heard in the audio).",parameters:{type:"object",properties:{said:{type:"string",description:"What the student said (as you heard it)"},correct:{type:"string",description:"The correct English sentence"},explanation_pt:{type:"string",description:"Very short reason in Portuguese (max 12 words)"}},required:["correct"]}},{name:"show_pronunciation",description:"After the student repeats the sentence, show a pronunciation score judged from the SOUND of their voice.",parameters:{type:"object",properties:{score:{type:"integer",description:"0 to 100"},problem_words:{type:"array",items:{type:"string"},description:"Words pronounced badly"},tip_pt:{type:"string",description:"Short tip in Portuguese about the specific sound, e.g. how to make TH"}},required:["score"]}},{name:"save_words",description:"Save useful new English words or expressions the student just learned (max 3 per call).",parameters:{type:"object",properties:{words:{type:"array",items:{type:"object",properties:{en:{type:"string"},pt:{type:"string"}},required:["en","pt"]}}},required:["words"]}}];function lv(i){let e=/rate=(\d+)/.exec(i||"");return e?Number(e[1]):24e3}var bh=class{constructor(e){this.o=e,this.ws=null,this.ready=!1,this.closed=!1,this.handle=null,this.reconnects=0}connect(){return new Promise((e,t)=>{let n=!1,s=o=>{n||(n=!0,clearTimeout(r),o?t(o):e())},r=setTimeout(()=>{s(new Error("tempo esgotado ao conectar"));try{this.ws&&this.ws.close()}catch{}},15e3),a;try{a=new WebSocket(`${ov}?key=${encodeURIComponent(this.o.key)}`)}catch(o){s(o);return}a.binaryType="arraybuffer",this.ws=a,this.ready=!1,a.onopen=()=>{a.send(JSON.stringify({setup:this._setup()}))},a.onmessage=o=>{let l=o.data;if(typeof l!="string")try{l=new TextDecoder().decode(o.data)}catch{return}let c;try{c=JSON.parse(l)}catch{return}c.setupComplete&&(this.ready=!0,s()),this._handle(c)},a.onerror=()=>{},a.onclose=o=>{if(a===this.ws){if(!this.ready){s(new Error(o.reason||`conex\xE3o recusada (c\xF3digo ${o.code})`));return}this._onClose(o)}}})}_setup(){let e=this.o,t={model:`models/${e.model}`,generationConfig:{responseModalities:["AUDIO"],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:e.voice||"Aoede"}}}},systemInstruction:{parts:[{text:e.system}]},inputAudioTranscription:{},outputAudioTranscription:{},contextWindowCompression:{slidingWindow:{}},sessionResumption:this.handle?{handle:this.handle}:{}};return e.tools&&e.tools.length&&(t.tools=[{functionDeclarations:e.tools}]),t}_handle(e){let t=this.o;e.sessionResumptionUpdate&&e.sessionResumptionUpdate.newHandle&&e.sessionResumptionUpdate.resumable!==!1&&(this.handle=e.sessionResumptionUpdate.newHandle),e.usageMetadata&&t.onUsage&&t.onUsage(e.usageMetadata),e.goAway&&this._reconnect("goAway"),e.toolCall&&t.onToolCall&&t.onToolCall(e.toolCall.functionCalls||[]);let n=e.serverContent;if(n){if(n.modelTurn&&Array.isArray(n.modelTurn.parts))for(let s of n.modelTurn.parts)s.inlineData&&s.inlineData.data&&/audio/i.test(s.inlineData.mimeType||"audio/pcm")&&t.onAudio&&t.onAudio(s.inlineData.data,lv(s.inlineData.mimeType));n.inputTranscription&&n.inputTranscription.text&&t.onInput&&t.onInput(n.inputTranscription.text),n.outputTranscription&&n.outputTranscription.text&&t.onOutput&&t.onOutput(n.outputTranscription.text),n.interrupted&&t.onInterrupted&&t.onInterrupted(),n.turnComplete&&t.onTurnComplete&&t.onTurnComplete()}}async _reconnect(e){if(this.closed||this.reconnecting)return;if(this.reconnects>=4){this.o.onClosed&&this.o.onClosed(e);return}this.reconnecting=!0,this.reconnects++;let t=this.ws;this.ws=null;try{t&&t.close(1e3)}catch{}try{await this.connect(),this.o.onReconnect&&this.o.onReconnect()}catch(n){this.o.onClosed&&this.o.onClosed(n.message||e)}finally{this.reconnecting=!1}}_onClose(e){this.closed||(this.handle?this._reconnect(e.reason||"closed"):this.o.onClosed&&this.o.onClosed(e.reason||`c\xF3digo ${e.code}`))}_send(e){return!this.ws||this.ws.readyState!==1||!this.ready?!1:(this.ws.send(JSON.stringify(e)),!0)}sendAudio(e){return this._send({realtimeInput:{audio:{data:e,mimeType:"audio/pcm;rate=16000"}}})}sendImage(e){return this._send({realtimeInput:{video:{data:e,mimeType:"image/jpeg"}}})}sendText(e){return this._send({clientContent:{turns:[{role:"user",parts:[{text:e}]}],turnComplete:!0}})}sendToolResponse(e){return this._send({toolResponse:{functionResponses:e}})}close(){this.closed=!0;try{this.ws&&this.ws.close(1e3)}catch{}this.ws=null}};async function yf(i,e){let t=[],n=[e,...Qr].filter((a,o,l)=>a&&l.indexOf(a)===o),s=null;for(let a of n){let o=new bh({...i,model:a});try{return await o.connect(),o.model=a,o}catch(l){s=l,t.push(a);let c=String(l.message||l);if(/api key|API_KEY|permission|PERMISSION|billing|quota/i.test(c)&&!/not found|not supported|unsupported/i.test(c))break}}let r=new Error(s?s.message:"falha ao conectar");throw r.tried=t,r}var Al=[{id:"daily",emoji:"\u{1F4F7}",title:"Meu dia a dia",desc:"Ela v\xEA o que voc\xEA faz e ensina",cam:"user",prompt:"DAY-TO-DAY: teach from what the student is doing right now on the camera (actions, objects, routine). Make it feel like a friendly call."},{id:"explore",emoji:"\u{1F50E}",title:"Explorar a casa",desc:"Aponte a c\xE2mera para objetos",cam:"environment",autoLook:20,prompt:"EXPLORE MODE: the student points the BACK camera at objects around the house. Each time you see a new main object, say its English name slowly, its Portuguese translation, and one short useful sentence with it for the student to repeat. Then ask them to show you another object. Keep a fast, playful rhythm, like a game."},{id:"restaurant",emoji:"\u{1F37D}\uFE0F",title:"Restaurante",desc:"Pedir comida, conta, alergias",prompt:"ROLE-PLAY: you are a friendly waiter/waitress in a restaurant in New York and the student is the customer. Practice greeting, ordering food and drinks, special requests, allergies, asking for the check and tipping. Stay in character, but step out briefly to correct mistakes."},{id:"travel",emoji:"\u2708\uFE0F",title:"Viagem e aeroporto",desc:"Check-in, imigra\xE7\xE3o, hotel",prompt:"ROLE-PLAY: airport check-in agent, then immigration officer, then hotel receptionist. Ask the typical questions one at a time and help the student answer naturally."},{id:"job",emoji:"\u{1F4BC}",title:"Entrevista de emprego",desc:"Perguntas e boas respostas",prompt:"ROLE-PLAY: job interview. First ask which job the student wants, then ask typical interview questions one at a time (tell me about yourself, strengths, weaknesses, experience, why this company) and help them build strong, natural answers."},{id:"shopping",emoji:"\u{1F6CD}\uFE0F",title:"Compras",desc:"Tamanhos, pre\xE7os, trocas",prompt:"ROLE-PLAY: shop assistant in a clothing store and later a supermarket cashier. Practice sizes, colors, prices, trying on, paying by card, returns and exchanges."},{id:"friends",emoji:"\u{1F64B}",title:"Conhecer pessoas",desc:"Apresenta\xE7\xF5es e conversa",prompt:"ROLE-PLAY: you meet the student at a party/meetup. Practice introductions, where are you from, work/study, hobbies, making plans, small talk and keeping a conversation going."},{id:"doctor",emoji:"\u{1FA7A}",title:"M\xE9dico e farm\xE1cia",desc:"Sintomas e rem\xE9dios",prompt:"ROLE-PLAY: a doctor (then a pharmacist). Practice describing symptoms, how long, pain scale, allergies, understanding instructions and buying medicine."},{id:"directions",emoji:"\u{1F5FA}\uFE0F",title:"Pedir informa\xE7\xF5es",desc:"Dire\xE7\xF5es e transporte",prompt:"ROLE-PLAY: a local person in a big city. Practice asking for and giving directions, public transport, tickets, landmarks."},{id:"review",emoji:"\u{1F501}",title:"Revisar com a professora",desc:"Usa suas palavras salvas",prompt:"REVIEW LESSON: review the student's words that are due for review, one by one: say the Portuguese meaning, ask the student to say the English word and then use it in a short sentence. Praise and correct."}],ea=i=>Al.find(e=>e.id===i)||Al[0],Mf=864e5,wh=[0,1,3,7,16,35,90];function Rl(i){return i.box==null&&(i.box=0),i.due==null&&(i.due=Date.now()),i}function Sf(i,e){Rl(i);let t=Date.now();return e===0?(i.box=0,i.due=t+10*6e4,i.lapses=(i.lapses||0)+1):e===1?i.due=t+Mf*Math.max(1,Math.round(wh[i.box]/2)):(i.box=Math.min(wh.length-1,i.box+(e===3?2:1)),i.due=t+wh[i.box]*Mf),i.reviews=(i.reviews||0)+1,i.last=t,i}function $i(i,e=Date.now()){return i.filter(t=>(t.due==null?0:t.due)<=e).sort((t,n)=>(t.due||0)-(n.due||0))}function Eh(i){return["nova","aprendendo","aprendendo","quase l\xE1","firme","dominada","dominada"][i||0]}var Th=()=>{let i=new Date;return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`};function bf(i){let e=new Date,t=(e.getDay()+6)%7,n=0;for(let s=0;s<=t;s++){let r=new Date(e);r.setDate(e.getDate()-s);let a=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`;n+=i[a]||0}return Math.round(n)}function Ah(){let i=new Date;return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`}function Fs(i){if(!i||!i.videoWidth)return null;let e=Fs.c||(Fs.c=document.createElement("canvas"));e.width=16,e.height=12;let t=e.getContext("2d",{willReadFrequently:!0});t.drawImage(i,0,0,16,12);let n=t.getImageData(0,0,16,12).data,s=new Uint8Array(192);for(let r=0;r<192;r++)s[r]=(n[r*4]*3+n[r*4+1]*6+n[r*4+2])/10;return s}function Rh(i,e){if(!i||!e)return 1;let t=0;for(let n=0;n<i.length;n++)t+=Math.abs(i[n]-e[n]);return t/i.length/255}var B=i=>document.getElementById(i),ia=i=>new Promise(e=>setTimeout(e,i)),Gt={get(i,e){try{let t=localStorage.getItem("lia."+i);return t==null?e:JSON.parse(t)}catch{return e}},set(i,e){try{localStorage.setItem("lia."+i,JSON.stringify(e))}catch{}}},cv={provider:"gemini",keys:{},models:{},level:"iniciante",rate:.9,voice:"",autoLook:60,handsFree:!0,camDefault:!0,correct:"realtime",boost:9,mode:"live",duplex:!1,liveModel:Qr[0],soundPron:!0,voiceMode:"natural",tutor:"lia",scenario:"daily",goal:60,reminder:!1,reminderTime:"19:00",price:"",quality:"high"},ie={...cv,...Gt.get("settings",{})},Tf={lia:"Aoede",maya:"Kore",ben:"Puck"},Hs=()=>(ie.keys.gemini||"").trim(),hv=()=>({provider:ie.provider,key:ie.keys[ie.provider]||"",model:ie.models[ie.provider]||kn[ie.provider].model}),Af=()=>ie.mode==="live"&&ie.provider==="gemini"&&!!Hs(),aa=()=>ie.voiceMode==="natural"&&!!Hs(),sa=()=>Bn[ie.tutor].name,ra=()=>ie.voice||(Bn[ie.tutor].gender==="m"?"auto:male":"auto:female"),vt=Gt.get("vocab",[]).map(Rl),Mi=Gt.get("days",[]),zs=Gt.get("mins",{}),Os=Gt.get("usage",{}),ke=new ml(B("avatar"),ie.tutor,ie.quality);window.lia={avatar:ke};var T={inCall:!1,busy:!1,speaking:!1,listening:!1,practicing:!1,camOn:!1,facing:"user",stream:null,speakerOn:!0,lang:"en-US",repeat:null,repeatTries:0,history:[],corr:null,lastActivity:Date.now(),silences:0,callId:0,hearId:0,startedAt:0,live:null,liveMode:!1,micOn:!0,dropAudio:!1,turnOpen:!1,tutorText:"",userText:"",lastSig:null,lastSigAt:0,frameTimer:null,scenario:ea(ie.scenario),sess:null};function uv(){return{start:Date.now(),phrases:[],scores:[],corrections:[],words:[],tokens:{in:0,out:0},problems:{}}}var wf;function gt(i,e=3200){let t=B("toast");t.textContent=i,t.classList.add("show"),clearTimeout(wf),wf=setTimeout(()=>t.classList.remove("show"),e)}function At(i){B("status").textContent=i}function Lt(i){return String(i??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function Lh(i){if(!i)return;let e=Ah();Os[e]=Os[e]||{in:0,out:0},Os[e].in+=i.in||0,Os[e].out+=i.out||0,T.sess&&(T.sess.tokens.in+=i.in||0,T.sess.tokens.out+=i.out||0),Gt.set("usage",Os)}function Rf(i){let e=parseFloat(String(ie.price).replace(",",".")),t=(i/1e3).toFixed(i<1e4?1:0);if(!e)return`${t} mil tokens`;let n=i/1e6*e;return`${t} mil tokens \u2248 US$ ${n<.01?n.toFixed(4):n.toFixed(2)}`}function si(){let i=new Set(Mi),e=0,t=new Date,n=h=>`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`;for(i.has(n(t))||t.setDate(t.getDate()-1);i.has(n(t));)e++,t.setDate(t.getDate()-1);B("streak").textContent=`\u{1F525} ${e} ${e===1?"dia":"dias"}`,B("wordCount").textContent=`\u{1F4DA} ${vt.length} ${vt.length===1?"palavra":"palavras"}`;let s={iniciante:"Iniciante",basico:"B\xE1sico",intermediario:"Intermedi\xE1rio",avancado:"Avan\xE7ado"};B("levelChip").textContent=`\u{1F3AF} ${s[ie.level]}`;let r=bf(zs);B("goalTxt").textContent=`${r} de ${ie.goal} min${r>=ie.goal?" \u2705":""}`,B("goalBar").style.width=`${Math.min(100,r/ie.goal*100)}%`;let a=$i(vt).length;B("dueN").textContent=a,B("btnReview").style.opacity=vt.length?1:.5;let o=!!ie.keys[ie.provider];B("btnStart").querySelector("span").textContent=o?`Come\xE7ar aula com ${sa()}`:"Configurar para come\xE7ar";let l=Bn[ie.tutor];B("homeTitle").textContent=`Oi! Eu sou ${l.gender==="m"?"o":"a"} ${l.name}`,B("tutorName").textContent=l.name,document.querySelectorAll("#tutorPick button").forEach(h=>h.classList.toggle("on",h.dataset.t===ie.tutor)),B("scenList").innerHTML=Al.map(h=>`<button data-s="${h.id}" class="${h.id===T.scenario.id?"on":""}"><b>${h.emoji} ${Lt(h.title)}</b><small>${Lt(h.desc)}</small></button>`).join("");let c=B("wordsBadge");c.textContent=a||vt.length,c.classList.toggle("hidden",!vt.length),dv()}var Ef="";function dv(){let[i,e]=String(ie.reminderTime||"19:00").split(":").map(Number),t=new Date;t.setHours(i||19,e||0,0,0),t<new Date&&t.setDate(t.getDate()+1);let n=$i(vt,t.getTime()).length,s=n?`Voc\xEA tem ${n} ${n===1?"palavra":"palavras"} para revisar hoje. S\xE3o s\xF3 uns minutinhos!`:"Que tal 5 minutinhos de conversa em ingl\xEAs hoje?",r=`${ie.reminder}|${i}|${e}|${sa()}|${s}`;r!==Ef&&(Ef=r,hf(!!ie.reminder,i||19,e||0,`Hora do ingl\xEAs com ${sa()}! \u{1F1FA}\u{1F1F8}`,s))}async function Nh(){Dl();try{T.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:T.facing},width:{ideal:960},height:{ideal:720}},audio:!1});let i=B("cam");i.srcObject=T.stream,await i.play().catch(()=>{}),T.camOn=!0,T.lastSig=null,B("pip").classList.remove("hidden"),B("pip").classList.toggle("mirror",T.facing==="user")}catch{T.camOn=!1,B("pip").classList.add("hidden"),gt("N\xE3o consegui abrir a c\xE2mera. Verifique a permiss\xE3o do app.")}B("btnCam").classList.toggle("off",!T.camOn)}function Dl(){T.stream&&T.stream.getTracks().forEach(i=>i.stop()),T.stream=null,T.camOn=!1,B("pip").classList.add("hidden"),B("btnCam").classList.add("off")}function Cl(i=640,e=.66){if(!T.camOn)return null;let t=B("cam");if(!t.videoWidth)return null;let n=Math.min(1,i/Math.max(t.videoWidth,t.videoHeight)),s=document.createElement("canvas");s.width=Math.round(t.videoWidth*n),s.height=Math.round(t.videoHeight*n),s.getContext("2d").drawImage(t,0,0,s.width,s.height);let r=B("pip");return r.classList.remove("snap"),r.offsetWidth,r.classList.add("snap"),s.toDataURL("image/jpeg",e).split(",")[1]}function fv(i=6e4,e=!1){if(!T.camOn)return{img:null,same:!1};let t=Fs(B("cam")),n=Rh(t,T.lastSig);if(!e&&t&&T.lastSig&&n<.07&&Date.now()-T.lastSigAt<i)return{img:null,same:!0};let s=Cl();return s&&(T.lastSig=t,T.lastSigAt=Date.now()),{img:s,same:!1}}function Pl(i,e=-1){B("tutorLine").innerHTML=i.map((t,n)=>`<span class="seg ${t.lang} ${n===e?"now":""}">${Lt(t.text)}</span>`).join(" ")}function pv(i){B("tutorLine").innerHTML=i?`<span class="seg en">${Lt(i)}</span>`:""}function Si(i){B("userLine").textContent=i?`Voc\xEA: ${i}`:""}function Il(i){let e=B("repeatBox");if(!i||!i.text){e.classList.add("hidden");return}B("repeatText").innerHTML=i.text.split(/\s+/).filter(Boolean).map((t,n)=>`<span class="w" data-i="${n}">${Lt(t)}</span>`).join(" "),e.classList.remove("played"),B("repeatPt").textContent=i.pt||"",B("score").classList.add("hidden"),e.classList.remove("hidden")}function Gs(i,e){document.querySelectorAll("#repeatText .w").forEach((t,n)=>{t.classList.toggle("ok",!!i[n]),t.classList.toggle("miss",!!e&&!i[n])})}function oa(i){let e=B("corrBox");if(!i){e.classList.add("hidden"),document.body.classList.remove("has-corr"),T.corr=null;return}B("corrWrong").textContent=i.said||"\u2026",B("corrWrong").parentElement.classList.toggle("hidden",!i.said),B("corrRight").textContent=i.correct,B("corrExp").textContent=i.explain||"",e.classList.remove("hidden"),document.body.classList.add("has-corr"),T.corr=i,T.sess&&T.sess.corrections.push(i)}function Dh(i){let e=B("score");e.className=i.score>=80?"good":i.score>=50?"mid":"bad";let n=`${i.score>=80?"\u{1F389}":i.score>=50?"\u{1F44D}":"\u{1F501}"} Pron\xFAncia: ${i.score}%`;if(i.missed&&i.missed.length&&i.score<100&&(n+=` \xB7 treine: ${i.missed.map(s=>`<span class="miss">${Lt(s)}</span>`).join(" ")}`),i.tip&&(n+=`<div style="font-weight:500;font-size:13px;color:#6b5a50;margin-top:3px">\u{1F4A1} ${Lt(i.tip)}</div>`),e.innerHTML=n,e.classList.remove("hidden"),T.sess){T.sess.scores.push(i.score);for(let s of i.missed||[]){let r=String(s).toLowerCase().replace(/[^a-z']/g,"");r&&(T.sess.problems[r]=(T.sess.problems[r]||0)+1)}}i.score>=80&&(ke.setMood("happy"),ke.nodOnce(1))}function Cf(i,e){if(!i){T.repeat=null,Il(null);return}(!T.repeat||T.repeat.text!==i)&&(T.repeatTries=0,T.sess&&T.sess.phrases.push(i)),T.repeat={text:i,pt:e},Il(T.repeat)}function Pf(i){let e=0;for(let t of i||[]){if(!t||!t.en)continue;let n=String(t.en).toLowerCase().trim();vt.some(s=>s.en.toLowerCase()===n)||(vt.push(Rl({en:String(t.en).trim(),pt:String(t.pt||"").trim(),ts:Date.now()})),e++,T.sess&&T.sess.words.push(t))}e&&(Gt.set("vocab",vt),si(),gt(`\u{1F4DA} +${e} ${e===1?"palavra nova salva":"palavras novas salvas"}`,2e3))}var Bs=new Map;async function Ul(i,e,t){let n=`${ie.tutor}|${e?1:0}|${i}`,s=Bs.get(n);if(s||(s=await _f(Hs(),i,Tf[ie.tutor],e),Bs.set(n,s),Bs.size>40&&Bs.delete(Bs.keys().next().value)),t!=null&&t!==T.callId)return;ni(),await ia(60);let r=Date.now(),a=s.b64,o=Math.floor(s.rate*2*.2*4/3/4)*4;for(let c=0;c<a.length;c+=o)vh(a.slice(c,c+o));let l=a.length*3/4/2/s.rate*1e3;for(await ia(l*.9);af()<r+l*.6&&Date.now()-r<l+4e3&&!(t!=null&&t!==T.callId);)await ia(80)}async function mv(i,e){if(T.speaking=!0,ke.setMode("speaking"),At("falando\u2026"),aa()&&T.speakerOn){Pl(i);try{await Ul(i.map(t=>t.text).join(" "),!1,e),T.speaking=!1,ke.speakingUntil=0,T.lastActivity=Date.now();return}catch{gt("Voz natural indispon\xEDvel agora; usando a voz do Android.",2500)}}for(let t=0;t<i.length&&e===T.callId;t++){let n=i[t];if(Pl(i,t),!T.speakerOn){let a=400+n.text.length*55/ie.rate,o=n.text.split(/\s+/),l=a/o.length;for(let c of o){if(e!==T.callId)break;ke.speakWord(c,l*.9),await ia(l)}continue}let s=n.lang==="pt"?"pt-BR":"en-US",r=n.lang==="pt"?Math.min(1.1,ie.rate+.1):ie.rate;await Ds(n.text,s,r,ra(),{onWord:a=>ke.speakWord(a,(90+a.length*62)/r)})}T.speaking=!1,ke.speakingUntil=0,T.lastActivity=Date.now()}function zn(i){B("btnMic").classList.toggle("live",i),B("btnMic").classList.toggle("off",T.liveMode&&!T.micOn)}function Zi(){if(!T.inCall||T.liveMode||T.busy||T.speaking)return;ti(),T.listening=!0,zn(!0),ke.setMode("listening");let i=T.callId;if(T.repeat&&T.lang==="en-US"&&ie.soundPron&&Hs()&&Us){At("ouvindo\u2026 (avaliando pelo som)"),lf(9e3,{onLevel:e=>{B("btnMic").style.setProperty("--lvl",(1+Math.min(.35,e*.4)).toFixed(3)),ke.setMicLevel(e)},onSpeech:()=>Si("\u{1F399}\uFE0F \u2026"),onDone:e=>{i===T.callId&&gv(e)},onNone:()=>{i===T.callId&&(ks(),Ch())},onError:e=>{i===T.callId&&(ks(),gt("N\xE3o consegui gravar o \xE1udio: "+e))}});return}At(T.lang==="pt-BR"?"ouvindo (portugu\xEAs)\u2026":"ouvindo\u2026"),gh(T.lang,{onPartial:e=>{Si(e),T.repeat&&T.lang==="en-US"&&Gs(Yi(T.repeat.text,e),!1)},onLevel:e=>{B("btnMic").style.setProperty("--lvl",(1+Math.min(.35,e*.4)).toFixed(3)),ke.setMicLevel(e)},onResult:e=>{if(i!==T.callId)return;ks();let t=(e[0]||"").trim();if(!t)return Ch();T.silences=0,T.lastActivity=Date.now(),_v(t,e)},onError:e=>{if(i===T.callId){if(ks(),e==="no_match"||e==="speech_timeout")return Ch();if(e==="unavailable"){gt("Reconhecimento de voz indispon\xEDvel. Instale/atualize o app Google.");return}if(e==="permission"){gt("Permita o uso do microfone para o app.");return}e==="network"&&gt("Sem internet para o reconhecimento de voz."),setTimeout(()=>{ie.handsFree&&T.inCall&&!T.busy&&!T.speaking&&Zi()},1200)}}})}async function gv(i){ks(),T.silences=0,T.lastActivity=Date.now(),At("avaliando sua pron\xFAncia\u2026"),ke.setMode("thinking");let e=T.repeat.text;try{let t=await xf({key:Hs(),model:ie.models.gemini||kn.gemini.model},i,e,ie.level);Lh(t.usage),Si(t.heard||"\u2026");let n=t.words.length?t.words.map(r=>r.ok):Yi(e,t.heard);Gs(n,!0);let s=t.words.filter(r=>!r.ok).map(r=>r.w);T.repeatTries++,Dh({score:t.score,missed:s,tip:t.tip}),Ji("user",{text:t.heard||"(inaud\xEDvel)",lang:"en-US",repeat:e,score:t.score,missed:s,issue:t.issue})}catch(t){gt(t.message||String(t),4e3),ke.setMode("idle"),At("toque no microfone para falar")}}function ks(){T.listening=!1,zn(!1),B("btnMic").style.setProperty("--lvl",1),ke.setMicLevel(0),T.inCall&&!T.busy&&!T.speaking&&!T.liveMode&&(ke.setMode("idle"),At("toque no microfone para falar"))}function Ch(){T.silences++,!(!ie.handsFree||!T.inCall)&&(T.silences<3?setTimeout(()=>{T.listening||Zi()},300):At("toque no microfone para falar"))}async function Ji(i,e={}){if(!T.inCall||T.busy||T.liveMode)return;ti(),T.listening=!1,zn(!1),T.busy=!0;let t=T.callId;ke.setMode("thinking"),At("pensando\u2026");let n=i==="look"||i==="start"||i==="review",{img:s,same:r}=fv(6e4,n),a=Tl(i,{...e,hasImage:!!s||r});r&&(a+=`
(A cena da c\xE2mera n\xE3o mudou desde a \xFAltima foto.)`);let o;try{let c=$i(vt).slice(0,12),h=T.scenario.prompt+(T.scenario.id==="review"&&c.length?` Words due: ${c.map(d=>`${d.en} (${d.pt})`).join(", ")}.`:"");o=await Sh(hv(),Mh({level:ie.level,vocab:vt,correct:ie.correct,tutor:sa(),scenario:h}),T.history.slice(-14),a,s)}catch(c){if(T.busy=!1,t!==T.callId)return;ke.setMode("idle"),ke.setMood("sad"),At("erro de conex\xE3o"),gt(c.message||String(c),6e3);return}if(t!==T.callId)return;T.busy=!1,Lh(o.usage),T.history.push({role:"user",text:s?a+`
[foto da c\xE2mera enviada]`:a}),T.history.push({role:"assistant",text:JSON.stringify({...o,usage:void 0})}),T.history.length>30&&T.history.splice(0,T.history.length-30),Pf(o.new_words),Cf(o.repeat,o.repeat_pt),oa(o.correction),o.correction?ke.setMood("neutral"):ke.setMood(o.mood),Si("");let l=o.speech.length?o.speech:o.repeat?[{lang:"en",text:o.repeat}]:[];await mv(l,t),t===T.callId&&(ie.handsFree?Zi():(ke.setMode("idle"),At("toque no microfone para falar")))}function _v(i,e){Si(i);let t={text:i,lang:T.lang};if(T.repeat&&T.lang==="en-US"){let n=mf(T.repeat.text,e);n&&(T.repeatTries++,Dh(n),Gs(Yi(T.repeat.text,n.heard),!0),Object.assign(t,{repeat:T.repeat.text,score:n.score,missed:n.missed}))}Ji("user",t)}async function If(i){T.liveMode=!0,document.body.classList.add("live"),At("conectando ao vivo\u2026"),ke.setMode("thinking"),yl(ie.duplex),qi(24e3,ie.duplex,"live");let e=T.callId,t=$i(vt),n=T.scenario.prompt;(i==="review"||T.scenario.id==="review")&&(n=ea("review").prompt);let s;try{s=await yf({key:Hs(),voice:Tf[ie.tutor],system:gf({level:ie.level,vocab:vt,correct:ie.correct,tutor:sa(),scenario:n,due:t}),tools:vf,onAudio:a=>{e!==T.callId||T.dropAudio||(T.turnOpen||(T.turnOpen=!0,T.tutorText="",xv()),T.speakerOn&&vh(a),T.speaking=!0,ke.setMode("speaking"),At("falando\u2026"))},onOutput:a=>{e!==T.callId||T.dropAudio||(T.tutorText=(T.tutorText+a).replace(/\s+/g," "),pv(T.tutorText.trim().slice(-220)))},onInput:a=>{if(e!==T.callId)return;T.turnOpen&&ie.duplex,T.userText=(T.userText+a).replace(/\s+/g," ");let o=T.userText.trim();Si(o),T.lastActivity=Date.now(),T.repeat&&Gs(Yi(T.repeat.text,o),!1)},onInterrupted:()=>{e===T.callId&&(ni(),T.turnOpen=!1)},onTurnComplete:()=>{e===T.callId&&(T.turnOpen=!1,T.dropAudio=!1,T.lastActivity=Date.now())},onToolCall:a=>vv(a,e),onUsage:a=>Lh({in:a.promptTokenCount||0,out:(a.responseTokenCount||0)+(a.thoughtsTokenCount||0)}),onReconnect:()=>gt("Conex\xE3o restabelecida \u2714",1500),onClosed:a=>{e!==T.callId||!T.inCall||(gt(`A conversa ao vivo caiu (${a}). Toque em Reiniciar para voltar.`,6e3),At("desconectado"),ke.setMode("idle"),ke.setMood("sad"))}},ie.liveModel)}catch(a){if(e!==T.callId)return;let o=String(a.message||a);if(vl(),yl(!1),T.liveMode=!1,document.body.classList.remove("live"),/api key|API_KEY|permission|PERMISSION/i.test(o)){gt("Chave do Gemini inv\xE1lida para o modo ao vivo. Confira nas Configura\xE7\xF5es.",6e3),At("erro");return}Nl(),gt(`Modo ao vivo indispon\xEDvel agora (${o.slice(0,80)}). Usando o modo cl\xE1ssico.`,5e3),qi(24e3,!1,"tts"),Ji(i);return}if(e!==T.callId){s.close();return}T.live=s,Nl(),ie.liveModel!==s.model&&(ie.liveModel=s.model,Gt.set("settings",ie));let r=T.camOn?Cl(640,.6):null;r&&(s.sendImage(r),T.lastSig=Fs(B("cam")),T.lastSigAt=Date.now()),s.sendText(Tl(i==="review"?"review":"start",{hasImage:!!r})),Uh(),clearInterval(T.frameTimer),T.frameTimer=setInterval(()=>{if(!T.live||!T.camOn||e!==T.callId)return;let a=Fs(B("cam")),o=Rh(a,T.lastSig)>.07,l=Date.now()-T.lastSigAt>(T.scenario.id==="explore"?6e3:2e4);if(o||l){let c=Cl(512,.6);c&&T.live.sendImage(c)&&(T.lastSig=a,T.lastSigAt=Date.now())}},3e3)}function Uh(){if(!T.live||!T.micOn)return;let i=T.callId;sf({call:ie.duplex,half:!ie.duplex,chunkMs:100},{onData:(e,t)=>{i!==T.callId||!T.live||(T.live.sendAudio(e),B("btnMic").style.setProperty("--lvl",(1+Math.min(.35,t*.45)).toFixed(3)),ke.setMicLevel(t))},onEvent:e=>{e==="start"?zn(!0):e==="permission"?gt("Permita o uso do microfone para o app."):(e==="error"||e==="unavailable")&&gt("N\xE3o consegui abrir o microfone.")}}),zn(!0)}function xv(){let i=T.userText.trim();T.userText="",i&&T.repeat&&Gs(Yi(T.repeat.text,i),!0)}function vv(i,e){let t=[];for(let n of i){let s=n.args||{};try{if(n.name==="show_phrase")Cf(String(s.phrase||""),String(s.translation_pt||""));else if(n.name==="show_correction")oa({said:String(s.said||""),correct:String(s.correct||""),explain:String(s.explanation_pt||"")}),ke.setMood("neutral");else if(n.name==="show_pronunciation"){let r=Array.isArray(s.problem_words)?s.problem_words.map(String):[],a=Math.max(0,Math.min(100,Math.round(Number(s.score)||0)));if(T.repeat){let o=new Set(r.map(l=>l.toLowerCase().replace(/[^a-z']/g,"")));Gs(T.repeat.text.split(/\s+/).filter(Boolean).map(l=>!o.has(l.toLowerCase().replace(/[^a-z']/g,""))),!0)}T.repeatTries++,Dh({score:a,missed:r,tip:String(s.tip_pt||"")})}else n.name==="save_words"&&Pf(Array.isArray(s.words)?s.words:[])}catch{}t.push({id:n.id,name:n.name,response:{result:"ok"},scheduling:"SILENT"})}T.live&&e===T.callId&&T.live.sendToolResponse(t)}function Lf(){clearInterval(T.frameTimer),_l(),T.live&&(T.live.close(),T.live=null),vl(),yl(!1),T.liveMode=!1,document.body.classList.remove("live")}var Ph={text:"",at:0};async function Ll(i,e={}){if(i=String(i||"").trim(),!i)return;if(T.busy){gt("Espere terminar de pensar\u2026",1200);return}let t=Date.now(),n=e.slow||Ph.text===i&&t-Ph.at<6e3;Ph={text:i,at:t};let s=++T.hearId;T.liveMode?(T.dropAudio=!0,ni()):(T.speaking&&(T.callId++,ei(),T.speaking=!1),ti(),T.listening=!1,zn(!1)),ke.setMode("speaking"),At(n?"falando devagar\u2026":"ou\xE7a a pron\xFAncia\u2026");let r=e.highlight?[...document.querySelectorAll("#repeatText .w")]:[];r.forEach(o=>o.classList.remove("ok","miss")),T.practicing=!0;let a=!1;if(aa()){r.forEach(o=>o.classList.add("playing"));try{await Ul(i,n,null),a=!0}catch{}r.forEach(o=>o.classList.remove("playing"))}if(!a){let o=0,l=n?Math.max(.5,ie.rate-.3):ie.rate;await Ds(i,"en-US",l,ra(),{onWord:c=>{ke.speakWord(c,(90+c.length*62)/l),r.forEach(h=>h.classList.remove("playing")),r[o]&&r[o].classList.add("playing"),o++}}),r.forEach(c=>c.classList.remove("playing"))}T.practicing=!1,s===T.hearId&&(ke.speakingUntil=0,T.lastActivity=Date.now(),T.liveMode?(T.dropAudio=!1,ke.setMode("listening"),At("sua vez \u2014 pode falar")):T.inCall&&!T.busy?ie.handsFree?Zi():(ke.setMode("idle"),At("toque no microfone para falar")):ke.setMode("idle"))}async function yv(i="start"){if(!ie.keys[ie.provider]){Of(),gt("Primeiro coloque a chave da IA (\xE9 rapidinho).");return}T.inCall=!0,T.callId++,T.history=[],T.repeat=null,T.silences=0,T.startedAt=Date.now(),T.dropAudio=!1,T.turnOpen=!1,T.tutorText="",T.userText="",T.micOn=!0,T.sess=uv(),i==="review"&&(T.scenario=ea("review")),document.body.classList.add("in-call"),["captions","controls","callBar"].forEach(n=>B(n).classList.remove("hidden")),Pl([]),Si(""),Il(null),oa(null),B("btnSpeaker").classList.toggle("off",!T.speakerOn),Nl();let e=Th();Mi.includes(e)||(Mi.push(e),Mi=Mi.slice(-400),Gt.set("days",Mi)),_h(),Kr(ie.boost);let t=T.scenario.cam?!0:ie.camDefault;T.facing=T.scenario.cam==="environment"?"environment":"user",t?await Nh():Dl(),At("conectando\u2026"),await ia(T.camOn?800:150),Af()?If(i):(aa()&&qi(24e3,!1,"tts"),Ji(i))}function Nf(){if(!T.inCall)return;T.inCall=!1,T.callId++,T.busy=!1,T.speaking=!1,T.liveMode&&Lf(),ei(),ti(),Ml(),vl(),Dl(),ke.setMode("idle"),ke.setMood("happy"),document.body.classList.remove("in-call"),["captions","controls","callBar"].forEach(t=>B(t).classList.add("hidden")),oa(null),At("Professora de ingl\xEAs");let i=(Date.now()-T.startedAt)/6e4,e=Th();zs[e]=(zs[e]||0)+i,Gt.set("mins",zs),si(),Sv(i)}function Mv(){if(!T.inCall)return;let i=T.scenario.id==="review"?"review":"start";T.liveMode&&Lf(),T.callId++,T.busy=!1,T.speaking=!1,T.listening=!1,ei(),ti(),Ml(),zn(!1),T.history=[],T.repeat=null,T.repeatTries=0,T.silences=0,T.dropAudio=!1,T.turnOpen=!1,Pl([]),Si(""),Il(null),oa(null),ke.setMode("idle"),ke.setMood("happy"),ke.nodOnce(.6),gt("Aula reiniciada \u21BA",1400),At("reiniciando\u2026"),setTimeout(()=>{T.inCall&&(Af()?If(i):(aa()&&qi(24e3,!1,"tts"),Ji(i)))},500)}function Nl(){B("langChip").classList.toggle("hidden",T.liveMode),B("langChip").innerHTML=`Voc\xEA fala em: <b>${T.lang==="en-US"?"Ingl\xEAs":"Portugu\xEAs"}</b>`}function Sv(i){let e=T.sess;if(!e)return;let t=e.scores.length?Math.round(e.scores.reduce((a,o)=>a+o,0)/e.scores.length):null,n=Object.entries(e.problems).sort((a,o)=>o[1]-a[1]).slice(0,5).map(([a])=>a),s=e.tokens.in+e.tokens.out,r=`<div class="rep-kpis">
    <div><b>${Math.max(1,Math.round(i))}</b>minutos</div>
    <div><b>${e.phrases.length}</b>frases treinadas</div>
    <div><b>${t==null?"\u2014":t+"%"}</b>pron\xFAncia m\xE9dia</div>
  </div>`;e.corrections.length&&(r+=`<div class="rep-sec"><h4>\u270D\uFE0F Corre\xE7\xF5es (${e.corrections.length})</h4><ul class="rep-list">${e.corrections.slice(-8).map(a=>`<li>${a.said?`<span class="bad">${Lt(a.said)}</span><br>`:""}<span class="good" data-say="${Lt(a.correct)}">\u2713 ${Lt(a.correct)} \u{1F50A}</span>${a.explain?`<small>${Lt(a.explain)}</small>`:""}</li>`).join("")}</ul></div>`),e.words.length&&(r+=`<div class="rep-sec"><h4>\u{1F4DA} Palavras novas (${e.words.length})</h4><ul class="rep-list">${e.words.map(a=>`<li><span class="good" data-say="${Lt(a.en)}">${Lt(a.en)} \u{1F50A}</span> \u2014 ${Lt(a.pt)}</li>`).join("")}</ul></div>`),n.length&&(r+=`<div class="rep-sec"><h4>\u{1F3AF} Para treinar</h4><p>${n.map(a=>`<span class="good" data-say="${Lt(a)}">${Lt(a)}</span>`).join(" \xB7 ")}</p></div>`),!e.corrections.length&&!e.words.length&&!e.phrases.length&&(r+='<p class="hint" style="margin-top:14px">Aula curtinha! Na pr\xF3xima, converse um pouco mais para ver seu resumo aqui.</p>'),r+=`<p class="hint" style="margin-top:14px">Uso de IA nesta aula: ${Rf(s)}</p>`,B("reportBody").innerHTML=r,B("report").classList.remove("hidden")}var an={list:[],i:0};function Df(){let i=$i(vt),e=i.length?i.slice(0,20):vt.slice().sort(()=>Math.random()-.5).slice(0,10);if(!e.length){gt("Ainda n\xE3o h\xE1 palavras. Elas aparecem durante as aulas.");return}an={list:e,i:0},B("review").classList.remove("hidden"),B("revDone").classList.add("hidden"),Uf()}function Uf(){let i=an.list[an.i];if(!i){B("flash").classList.add("hidden"),B("revAsk").classList.add("hidden"),B("revGrades").classList.add("hidden"),B("revDone").classList.remove("hidden"),B("revProg").textContent="",si();return}B("flash").classList.remove("hidden"),B("revAsk").classList.remove("hidden"),B("revGrades").classList.add("hidden"),B("revProg").textContent=`${an.i+1} de ${an.list.length} \xB7 ${Eh(i.box)}`,B("fPt").textContent=i.pt||"(sem tradu\xE7\xE3o)",B("fEn").textContent=`${i.en} \u{1F50A}`,B("fEn").classList.add("hidden"),B("fHeard").textContent="",B("fHeard").className="f-heard"}function Ff(i){B("fEn").classList.remove("hidden"),B("revAsk").classList.add("hidden"),B("revGrades").classList.remove("hidden"),document.querySelectorAll("#revGrades button").forEach(e=>e.style.outline=i===!0&&e.dataset.g==="2"?"3px solid #13894c":""),Fl(an.list[an.i].en)}function Fl(i){aa()?(qi(24e3,!1,"tts"),Ul(i,!1,null).catch(()=>Ds(i,"en-US",ie.rate,ra(),{onWord:e=>ke.speakWord(e,90+e.length*70)}))):Ds(i,"en-US",ie.rate,ra(),{onWord:e=>ke.speakWord(e,90+e.length*70)})}function ta(i,e){document.querySelectorAll(`#${i} button`).forEach(t=>t.classList.toggle("on",t.dataset.v===e))}function na(i,e){let t=document.querySelector(`#${i} button.on`);return t?t.dataset.v:e}function Of(){B("setProvider").value=ie.provider,Bf(),ta("setLevel",ie.level),ta("setCorrect",ie.correct||"realtime"),ta("setMode",ie.mode),ta("setVoiceMode",ie.voiceMode),ta("setQuality",ie.quality),B("setDuplex").checked=ie.duplex,B("setLiveModel").value=ie.liveModel||Qr[0],B("setSoundPron").checked=ie.soundPron,B("setRate").value=ie.rate,B("rateVal").textContent=ie.rate,B("setBoost").value=ie.boost,B("boostVal").textContent=kf(ie.boost),B("setAutoLook").value=String(ie.autoLook),B("setHandsFree").checked=ie.handsFree,B("setCamDefault").checked=ie.camDefault,B("setGoal").value=String(ie.goal),B("setReminder").checked=ie.reminder,B("setReminderTime").value=ie.reminderTime,B("setPrice").value=ie.price||"",B("testResult").textContent="",B("btnResetAll").textContent="Apagar progresso";let i=B("setVoice"),e=ef().filter(n=>/^en/i.test(n.lang));i.innerHTML='<option value="">Autom\xE1tica</option>'+e.map(n=>`<option value="${Lt(n.name)}">${Lt(bv(n))}</option>`).join(""),i.value=ie.voice||"";let t=Os[Ah()]||{in:0,out:0};B("usageBox").innerHTML=`Uso este m\xEAs: <b>${Rf(t.in+t.out)}</b><br><small>A professora s\xF3 manda foto quando a cena muda, para economizar.</small>`,B("ver").textContent=`Vers\xE3o ${nf()}`,B("settings").classList.remove("hidden")}function bv(i){let e={"en-US":"EUA","en-GB":"Reino Unido","en-AU":"Austr\xE1lia","en-IN":"\xCDndia","en-CA":"Canad\xE1"}[String(i.lang).replace("_","-")]||i.lang;return`${i.name} (${e}${i.local===!1?", online":""})`}var Ih=null;function Bf(){let i=B("setProvider").value;Ih=i,B("setKey").value=ie.keys[i]||"",B("setModel").value=ie.models[i]||kn[i].model,B("keyHelp").dataset.url=kn[i].keyUrl,B("keyHelp").textContent=i==="gemini"?"Pegar chave gr\xE1tis no Google AI Studio \u2192":`Pegar chave em ${kn[i].name} \u2192`}function Fh(){let i=B("setProvider").value,e={...ie,keys:{...ie.keys},models:{...ie.models}};e.provider=i,e.keys[i]=B("setKey").value.trim();let t=B("setModel").value.trim();return t&&t!==kn[i].model?e.models[i]=t:delete e.models[i],e.level=na("setLevel","iniciante"),e.correct=na("setCorrect","realtime"),e.mode=na("setMode","live"),e.voiceMode=na("setVoiceMode","natural"),e.quality=na("setQuality","high"),e.duplex=B("setDuplex").checked,e.liveModel=B("setLiveModel").value.trim()||Qr[0],e.soundPron=B("setSoundPron").checked,e.rate=Number(B("setRate").value),e.boost=Number(B("setBoost").value),e.voice=B("setVoice").value,e.autoLook=Number(B("setAutoLook").value),e.handsFree=B("setHandsFree").checked,e.camDefault=B("setCamDefault").checked,e.goal=Number(B("setGoal").value)||60,e.reminder=B("setReminder").checked,e.reminderTime=B("setReminderTime").value||"19:00",e.price=B("setPrice").value.trim(),e}function kf(i){return i=Number(i),i<=0?"normal":i<=6?`+${i} (um pouco)`:i<=12?`+${i} (alto)`:`+${i} (m\xE1ximo)`}function Oh(){let i=B("vocabList"),e=$i(vt).length;B("btnReviewFromList").textContent=e?`\u{1F501} Revisar agora (${e} para hoje)`:"\u{1F501} Treinar palavras",B("btnReviewFromList").classList.toggle("hidden",!vt.length),vt.length?i.innerHTML=vt.slice().reverse().map((t,n)=>`<li data-i="${vt.length-1-n}"><div class="w"><b>${Lt(t.en)}<span class="box">${Eh(t.box)}</span></b><span>${Lt(t.pt)}</span></div><button class="say" aria-label="ouvir">\u{1F50A}</button><button class="del" aria-label="apagar">\u{1F5D1}</button></li>`).join(""):i.innerHTML='<li class="empty">Ainda n\xE3o h\xE1 palavras. Elas aparecem aqui durante as aulas.</li>',B("vocab").classList.remove("hidden")}of({onLevel:i=>ke.setTalkLevel(i),onDrained:()=>{T.liveMode&&T.inCall&&(T.speaking=!1,ke.speakingUntil=0,T.practicing||(ke.setMode("listening"),At(T.micOn?"sua vez \u2014 pode falar":"microfone desligado")))}});B("btnStart").onclick=()=>yv(T.scenario.id==="review"?"review":"start");B("btnReview").onclick=Df;B("btnReviewFromList").onclick=()=>{B("vocab").classList.add("hidden"),Df()};B("btnHomeWords").onclick=Oh;B("btnWords").onclick=Oh;B("btnMenu").onclick=Of;B("btnHang").onclick=Nf;B("btnRestart").onclick=Mv;B("scenList").onclick=i=>{let e=i.target.closest("button[data-s]");e&&(T.scenario=ea(e.dataset.s),ie.scenario=T.scenario.id,Gt.set("settings",ie),si())};B("tutorPick").onclick=i=>{let e=i.target.closest("button[data-t]");!e||e.dataset.t===ie.tutor||(ie.tutor=e.dataset.t,Gt.set("settings",ie),ke.setProfile(ie.tutor),Bs.clear(),si(),setTimeout(()=>{ke.setMood("happy"),ke.nodOnce(.8)},200))};B("btnLook").onclick=()=>{if(!T.camOn){gt("Ligue a c\xE2mera para eu ver o que voc\xEA est\xE1 fazendo.");return}if(T.liveMode&&T.live){let i=Cl(640,.7);i&&T.live.sendImage(i),T.dropAudio=!1,T.live.sendText(Tl("look",{hasImage:!!i}));return}T.busy||(T.speaking&&(T.callId++,ei(),ni(),T.speaking=!1,ke.speakingUntil=0),Ji("look"))};B("btnMic").onclick=()=>{if(T.inCall){if(T.liveMode){if(T.speaking){T.dropAudio=!0,ni(),T.speaking=!1,At("sua vez \u2014 pode falar");return}T.micOn=!T.micOn,T.micOn?(Uh(),gt("Microfone ligado",1e3)):(_l(),zn(!1),gt("Microfone desligado",1e3)),zn(T.micOn);return}if(T.listening){ti(),cf(),ks();return}if(T.busy){gt("Espere terminar de pensar\u2026",1200);return}T.speaking&&(T.callId++,ei(),ni(),T.speaking=!1,ke.speakingUntil=0),T.silences=0,Zi()}};B("btnSpeaker").onclick=()=>{T.speakerOn=!T.speakerOn,B("btnSpeaker").classList.toggle("off",!T.speakerOn),T.speakerOn||(ei(),ni()),gt(T.speakerOn?"Som ligado":"Som desligado (s\xF3 legendas)",1400)};B("btnCam").onclick=()=>{T.camOn?Dl():Nh()};B("pip").onclick=()=>{T.facing=T.facing==="user"?"environment":"user",Nh()};B("langChip").onclick=()=>{T.lang=T.lang==="en-US"?"pt-BR":"en-US",Nl(),gt(T.lang==="en-US"?"Agora fale em ingl\xEAs":"Agora pode falar em portugu\xEAs (para tirar d\xFAvidas)",1800),T.listening&&Zi()};document.querySelectorAll("[data-close]").forEach(i=>{i.onclick=()=>B(i.dataset.close).classList.add("hidden")});document.querySelectorAll(".sheet").forEach(i=>i.addEventListener("click",e=>{e.target===i&&i.classList.add("hidden")}));B("setProvider").onchange=()=>{Ih&&(ie.keys[Ih]=B("setKey").value.trim()),Bf()};B("btnShowKey").onclick=()=>{let i=B("setKey");i.type=i.type==="password"?"text":"password"};B("keyHelp").onclick=i=>{i.preventDefault(),tf(B("keyHelp").dataset.url)};B("setRate").oninput=()=>{B("rateVal").textContent=B("setRate").value};B("setBoost").oninput=()=>{B("boostVal").textContent=kf(B("setBoost").value),Kr(Number(B("setBoost").value))};B("btnTestVoice").onclick=()=>{_h();let i=Fh(),e="Hello! This is my voice. Can you hear me well?";i.voiceMode==="natural"&&i.keys.gemini?(qi(24e3,!1,"tts"),Ul(e,!1,null).catch(t=>gt(t.message||String(t)))):Ds(e,"en-US",i.rate,i.voice||ra(),{onWord:t=>ke.speakWord(t,90+t.length*62)})};["setLevel","setCorrect","setMode","setVoiceMode","setQuality"].forEach(i=>{document.querySelectorAll(`#${i} button`).forEach(e=>{e.onclick=()=>document.querySelectorAll(`#${i} button`).forEach(t=>t.classList.toggle("on",t===e))})});B("btnReload").onclick=()=>{ei(),ti(),location.reload()};B("btnResetAll").onclick=()=>{let i=B("btnResetAll");if(i.dataset.armed!=="1"){i.dataset.armed="1",i.textContent="Toque de novo p/ confirmar",setTimeout(()=>{i.dataset.armed="",i.textContent="Apagar progresso"},4e3);return}i.dataset.armed="",vt=[],Mi=[],zs={},Gt.set("vocab",vt),Gt.set("days",Mi),Gt.set("mins",zs),si(),i.textContent="Progresso apagado \u2714"};B("btnSave").onclick=()=>{let i=ie.quality;ie=Fh(),Gt.set("settings",ie),Kr(ie.boost),i!==ie.quality&&ke.setQuality(ie.quality),B("settings").classList.add("hidden"),si(),gt("Configura\xE7\xF5es salvas \u2714",1500)};B("btnTest").onclick=async()=>{let i=Fh(),e=B("testResult");e.textContent="Testando\u2026";try{let t=await Sh({provider:i.provider,key:i.keys[i.provider],model:i.models[i.provider]||kn[i.provider].model},Mh({level:i.level,vocab:[],correct:i.correct}),[],"[Teste de conex\xE3o] Diga apenas um oi curto.",null);e.textContent=`\u2705 Funcionou! Resposta: "${t.speech.map(n=>n.text).join(" ")}"`}catch(t){e.textContent="\u274C "+(t.message||t)}};B("vocabList").onclick=i=>{let e=i.target.closest("li[data-i]");if(!e)return;let t=vt[Number(e.dataset.i)];i.target.classList.contains("say")?Fl(t.en):i.target.classList.contains("del")&&(vt.splice(Number(e.dataset.i),1),Gt.set("vocab",vt),Oh(),si())};B("repeatBox").onclick=i=>{if(!T.repeat)return;B("repeatBox").classList.add("played");let e=i.target.closest("#repeatText .w");if(e){Ll(e.textContent.replace(/[^\w'’-]/g,""),{slow:!0});return}Ll(T.repeat.text,{highlight:!0})};B("corrBox").onclick=()=>{T.corr&&Ll(T.corr.correct)};B("tutorLine").onclick=i=>{let e=i.target.closest(".seg.en");e&&Ll(e.textContent.slice(-160))};B("reportBody").onclick=i=>{let e=i.target.closest("[data-say]");e&&Fl(e.dataset.say)};B("btnRevShow").onclick=()=>Ff(!1);B("fEn").onclick=()=>Fl(an.list[an.i].en);B("btnRevSpeak").onclick=()=>{let i=an.list[an.i];i&&(B("fHeard").textContent="\u{1F3A4} ouvindo\u2026",gh("en-US",{onPartial:e=>{B("fHeard").textContent=e},onResult:e=>{let t=e.some(n=>Yi(i.en,n).every(Boolean));B("fHeard").textContent=t?`\u2713 "${e[0]}"`:`Ouvi: "${e[0]||"\u2026"}"`,B("fHeard").className="f-heard"+(t?" ok":""),Ff(t)},onError:()=>{B("fHeard").textContent="N\xE3o ouvi. Tente de novo ou toque em Mostrar."}}))};B("revGrades").onclick=i=>{let e=i.target.closest("button[data-g]");e&&(Sf(an.list[an.i],Number(e.dataset.g)),Gt.set("vocab",vt),an.i++,Uf())};window.onNativeBack=()=>{let i=[...document.querySelectorAll(".sheet")].find(e=>!e.classList.contains("hidden"));return i?(i.classList.add("hidden"),!0):T.inCall?(Nf(),!0):!1};document.addEventListener("visibilitychange",()=>{T.inCall&&(document.hidden?T.liveMode?(_l(),ni()):(ti(),ei(),Ml(),T.listening=!1,zn(!1)):T.liveMode?T.micOn&&Uh():!T.busy&&ie.handsFree&&setTimeout(Zi,600))});setInterval(()=>{if(!T.inCall||T.liveMode||T.busy||T.speaking||T.practicing||T.listening&&T.repeat&&Us||!T.camOn)return;let i=T.scenario.autoLook||ie.autoLook;i&&Date.now()-T.lastActivity>i*1e3&&(T.lastActivity=Date.now(),Ji("idle"))},1e3);Kr(ie.boost);si();setTimeout(()=>{ke.setMood("happy"),ke.nodOnce(.8)},600);ie.keys[ie.provider]||setTimeout(()=>gt('Bem-vindo! Toque em "Configurar para come\xE7ar".',4e3),900);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
