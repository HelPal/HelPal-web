$(function()
{
	var auto=new cookieStorage();
	var acccessToken=auto.getItem("acccessToken");
	//alert(acccessToken!=null);
	if(acccessToken!=null) location.href="../personalinfo/start_helpal.html?accessToken="+acccessToken;
});

function log()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var md5_password=MD5(password);
	var localex='';
	var localey='';
	//alert("原密码为："+password+" "+"加密后："+md5_password);
	$.get("http://112.74.53.157:8080/Helpal/user/login",{username:"Lilian",password:"65ef2aa20ce8a5c16b7a1a4046ff9557",localex:localex,localey:localey},
		function(data,status)
		{
			if(data.Status!=0) alert("err:"+data.errorMsg);
			else
			{
				var cookie=new cookieStorage(60,"/");
				cookie.setItem("acccessToken",data.accessToken);
				window.location.href="../personalinfo/start_helpal.html";
			}
		}
		)
	
	//window.localStorage.setItem("accessToken","success!");
	//alert(window.localStorage.getItem("accessToken"));
	//window.location.href="../personalinfo/start_helpal.html?accessToken="+md5_password;
	/*	$.ajax({
		type:"get",
		url:"http://112.74.53.157:8080/Helpal/user/login?username=Lilian&password=65ef2aa20ce8a5c16b7a1a4046ff9557",
		error: function(){  
                alert("系统错误，请重试");  
            },  
		success:function(data)
		{
			console.log(data);
		}});
		$.get("http://112.74.53.157:8080/Helpal/user/login",{username:"Lilian",password:"65ef2aa20ce8a5c16b7a1a4046ff9557",localex:"",localey:""},
		function(data,status)
		{
			console.log(data.accessToken);
	
		}
		);s
			var skills={"a":"1","b":"2"};
	sessionStorage.setItem("x",JSON.stringify(skills));
	var s=JSON.parse(sessionStorage.getItem("x"));
	$.each(s,function(name,value)
	{
		alert(name+": "+value);
	})

	sessionStorage.setItem("y","213");
	 alert("y: "+sessionStorage.getItem("y"));

	alert(1);
	window.cookieStorage("10","/").setItem("x","123");
	*/
}


