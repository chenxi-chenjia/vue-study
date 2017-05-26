export const ct = {
	s:function(time){
		var m = parseInt(time.substring(0,2));
		var s = parseFloat(time.substring(3,8));
		return m*60+s;
	},
	m:function(time){
		var t=parseFloat(time);
		var m=Math.floor(t/60);
		m=m<10?(0+''+m):m;
		var s=Math.floor(t%60);
		s=s<10?('0'+s):s;
		return m+':'+s;
	}
}

