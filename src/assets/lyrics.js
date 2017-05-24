import {ct} from './tm.js';

export const lrc=function(lrc){
	var lrc_arr=lrc.split(/\n/g);
	var ln=new Array();
	lrc_arr.forEach(function(v,i){
		var n=v.replace(/\s/g,'');
		n=n.replace(/\[/g,'');
		var v_arr=n.split(']');
		var lth=v_arr.length;
		v_arr.forEach((v,i)=>{
			if(i<lth-1){
				var m=ct.s(v);
				ln.push({
					t:m,
					l:v_arr[lth-1]
				})
			}
		})
	})
	ln.sort((a,b)=>{
		return a.t-b.t
	})
	lrc_arr=ln;
	return lrc_arr;
}