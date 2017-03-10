function register()
{
	var username=$("#username").val();
	var password=$("#password").val();
	var email=$("#email").val();
	var md5_password;
	if(validateForm(email))
	{
		//alert(username+password+email);
		md5_password=MD5(password);
		$.post("http://*/v1/user/signup",{username:username,password:md5_password,email:email},
			function(data,status)
			{
				alert(data);
				if(data.status!=0)
					alert("err:"+data.errorMsg);
				else
				{
					alert("Register success!")
					window.location.href("index.html");
				}
			}
			)
	}
	else alert("不是一个有效的 e-mail 地址");
}

//邮箱验证
function validateForm(x){
  var atpos=x.indexOf("@");
  var dotpos=x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
    return false;
  }
  return true;
}
