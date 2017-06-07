$(function()
{
	var auto=new cookieStorage();
	var accessToken=auto.getItem("accessToken");
	//alert(accessToken!=null);
	if(accessToken!=null) location.href="../personalinfo/start_helpal.html?accessToken="+accessToken;
});

function log()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var md5_password=MD5(password);
	var localex;
	var localey;
	var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            localex=r.point.lng;
            localey=r.point.lat;
            $.get("http://112.74.53.157:8080/Helpal/user/login",{username:username,password:md5_password,localex:localex,localey:localey},
			function(data,status)
			{
				if(data.Status!=0) alert("err:"+data.errorMsg);
				else
				{
					var cookie=new cookieStorage(1200,"/");
					cookie.setItem("accessToken",data.accessToken);
					cookie.setItem("username",username);
					window.location.href="../personalinfo/start_helpal.html";
				}
			}
			)
        }
        else {
            alert('failed'+this.getStatus());
        }        
    },{enableHighAccuracy: true})
	//alert("原密码为："+password+" "+"加密后："+md5_password);
	
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


