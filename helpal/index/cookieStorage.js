//本类实现像localStorage和sessionStorage一样的存储api，不同的是，基于http cookie实现它
function cookieStorage(maxage,path)  //两个参数分别代表存储有效期和作用域
{
	//获取一个存储全部cookie信息的对象
	this.cookie=new Object();
	this.cookie=(function ()
	{
		var cookie={};
		var all=document.cookie;
		if(all==="") return cookie;
		var list=all.split(";");
		for(var i=0;i<list.length;i++)
		{
			//alert(list[i]);
			var cook=list[i];
			var p=cook.indexOf("=");
			var name=cook.substring(0,p);
			var value=cook.substring(p+1);
			value=decodeURIComponent(value);
			cookie[name]=value;
		}
		return cookie;
	}());
	this.keys=new Array();
	for(var key in this.cookie)
		(this.keys).push(key);
	this.length=this.keys.length;
	this.key=function(n)
	{
		if(n<0||n>=this.keys.length) return null;
		return this.keys[n];
	};
	this.getItem=function(name)
	{
		//console.log(this.cookie);
		for(var b in this.cookie)
			if(b.trim()==name) return this.cookie[b];
		return null;
	};
	this.setItem=function(key,value)
	{	
		var judge=0;
		for(var a in this.cookie)
			if(a.trim()==key) judge=1;
		//alert(judge);
		if(!judge)
		{
			(this.keys).push(key);
			this.length++;
		} 

		this.cookie[key]=value;

		var cookie=key+"="+encodeURIComponent(value);

		if(maxage) cookie+=";max-age="+maxage;
		if(path) cookie+=";path="+path;

		document.cookie=cookie;
	};

	this.removeItem=function(key)
	{
		var flag=0;
		for(var a in this.cookie)
			if(a.trim()==key) flag=1;
			
		if(flag)
		{
			for(var i=0;i<this.keys.length;i++)
			{
				if(this.keys[i]===key)
				{
					this.keys.splice(i,1);
					break;
				}
			}
			this.length--;
			//alert("11111");
			document.cookie=key+"=;max-age=0;path=/";
			delete this.cookie[key];
		}
		else return;
 	};

 	this.clear=function()
 	{
 		for(var i=0;i<this.keys.length;i++)
 			document.cookie=this.keys[i]+"=;max-age=0;path=/";
 		this.cookie=new Object();
 		this.keys=new Array();
 		this.length=0;
 	};
}