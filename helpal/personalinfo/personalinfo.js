$(function(){
   // alert("y: "+sessionStorage.getItem("y"));
    //localStorage.clear();
    //get userinfo
    //TGlsaWFuMTQ4OTU2NzUwM2U3YjViOWM1MTZhNjA4ZWQ0Y2E2MDE0NWVhMDliNTkx%0D%0A
    var auto=new cookieStorage();
    var username=auto.getItem("username");
    //alert(accessToken!=null);
    if(username==null) 
    {
        alert("Seession expires.please relogin!");
        location.href="../index/index.html";
    }
    else{
    $.get("http://112.74.53.157:8080/Helpal/user/info",{username:username},
        function(data,status)
        {
            if(data.Status!=0) alert("error: "+data.errorMsg);
            else
            {
                //alert(data.User[0].username);
                
                var info=new cookieStorage(1200,"/");
                //info.removeItem("user");
                info.setItem("user",JSON.stringify(data));
                var userinfo=JSON.parse(info.getItem("user"));
               
                $("#username").empty().append(data.User[0].username);
                $("#usermotto").empty().append(data.User[0].username+"<br/><small><font size='1px'>"+data.User[0].star_signs+"</font><br/>"+data.User[0].motto+"</small>");
                $("#user_name").empty().append(data.User[0].username);
                $("#user_img").empty().append(data.User[0].avatar);
                var gender=data.User[0].gender;
                if(gender=="male")
                    $("#usergender").empty().append("<small>"+data.User[0].age+"</small>&nbsp;&nbsp;"+'<i class="fa fa-mars text-success"></i>male');
                else
                    $("#usergender").empty().append("<small>"+data.User[0].age+"</small>&nbsp;&nbsp;"+'<i class="fa fa-venus" style="color:pink"></i>female');
                //window.location.reload(true);
            }
        }
        );
    }
    //upload img
    $("#upload").dialog({autoOpen:false}); 
    $("#set").dialog({autoOpen:false}); 
    $("input[name='upload_img']").click(function(){
    	$( "#upload" ).dialog( "open" );
    });
    
    $("#submit2").click(function(){
        var formData = new FormData();
        formData.append('avatar', $('#img_source')[0].files[0]);
        alert(formData);
    	/*$.post("http://112.74.53.157:8080/Helpal/user/setAvatar",{accessToken:"UnlraWUrMTQ4OTY0NzI3NStlN2I1YjljNTE2YTYwOGVkNGNhNjAxNDVlYTA5YjU5MQ%3D%3D%0A",formData},
    		function(data,status)
    		{
                alert(data.Status);
    			if(data.Status!=0)
					alert("err:"+data.errorMsg);
				else
				{
					alert("Upload success!");
                   // window.location.reload();
				}
    		}
    		)
            */
            $.ajax({
             url:'http://112.74.53.157:8080/Helpal/user/setAvatar',
             type:'POST',
             data:formData,
             cache: false,
             contentType: false,    //不可缺
             processData: false,    //不可缺
             success:function(data){
                alert(data.Status);
             },
             error:function(data)
             {alert(data.errorMsg);}
         });
    	$( "#upload" ).dialog( "close" );
        //window.location.reload();
    });


    //set userinfo
     $("input[name='Settings']").click(function(){
        $( "#set" ).dialog( "open" );
    });

     //set userinfo
   
   $("#submit1").click(function(){
        var radios = document.getElementsByName('gender');
        for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
        // 弹出选中值
        var c_gender=radios[i].value;
        // 选中后退出循环
        break;
         }
        }
        var c_age=$("#age").val();
        var c_star_signs=$("#star_signs").val();
        var motto=$("#motto").val();
        var auto=new cookieStorage();
        //alert("123");
        //alert(motto);
        if(auto.getItem("accessToken")==null) 
        {
            alert("Seession expires.please relogin!");

            location.href="../index/index.html";
        }
        else{
            //alert(auto.getItem("accessToken"));
        $.post("http://112.74.53.157:8080/Helpal/user/setInfo",
            {accessToken:auto.getItem("accessToken"),gender:c_gender,age:c_age,star_signs:c_star_signs,motto:motto},
            function(data,status)
            {
                //alert("11");
                //alert(data.Status);
                if(data.Status!=0)
                    alert("err:"+data.errorMsg);
                else
                {
                    alert("Set success!");
                    window.location.replace("start_helpal.html");
                }
            }
            )
    }
        $( "#set" ).dialog( "close" );
    });

   //sign out
   $("#signout").click(function(){
        new cookieStorage().clear();
        alert("sign out!")
        window.location.href="../index/index.html";
   });
    //update accesstoken
    /*
    $("a[name='link']").each(function()
        {
            var link=$(this).attr("href");
            var path=link+"?a="+getUrlParam("a");
            $(this).attr("href",path);
        });
  //  alert($("a[name='link']").attr("href"));
  */
});


   //获取url中的参数
function getUrlParam(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r != null) return unescape(r[2]); return null; //返回参数值
}