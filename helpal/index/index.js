function log()
{
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var md5_password=MD5(password);
	var localex='';
	var localey='';
	//alert("原密码为："+password+" "+"加密后："+md5_password);

	$.get("http://*/v1/user/login",{username:username,password:md5_password,localex:localex,localey:localey},
		function(data,status)
		{
			alert(data);
			if(data.status!=0) alert("err:"+data.errorMsg);
			else
			{
				window.location.href="../personalinfo/start_helpal.html?accessToken="+data.acccessToken;
			}
		}
		)
	
	//window.localStorage.setItem("accessToken","success!");
	//alert(window.localStorage.getItem("accessToken"));
	//window.location.href="../personalinfo/start_helpal.html?accessToken="+md5_password;
	
}

