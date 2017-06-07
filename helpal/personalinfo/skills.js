   $(function()
   {    
   	var skills=new cookieStorage();
    var skillsinfo=JSON.parse(skills.getItem("user"));
    $("#skills").empty();
  
    for(var i=0;i<skillsinfo.Skills.length;i++)
    {

      $("#skills").append("<tr><td>"+skillsinfo.User[0].username+"</td><td>"+skillsinfo.User[0].gender+"</td><td>"+skillsinfo.User[0].age+"</td><td>"+skillsinfo.Skills[i].skill_tag+"</td></tr>");
    }

    /*
   	var username=skills.getItem("username");
     if(username==null) 
    {
        alert("Seession expires.please relogin!");
        location.href="../index/index.html";
    }
    else{
   	
   	//alert("1");
   	//alert(skills.getItem("accessToken"));
     $.get("http://112.74.53.157:8080/Helpal/user/info",{username:username},
        function(data,status)
        {
            if(data.Status!=0) alert("error: "+data.errorMsg);
            else
            {
              $("#skills").empty();
              for(var i=0;i<data.Skills.length;i++)
              {
                $("#skills").append("<tr><td>"+data.User[0].username+"</td><td>"+data.User[0].gender+"</td><td>"+data.User[0].age+"</td><td>"+data.Skills[i].skill_tag+"</td></tr>")
              }
            }
        }
        );
        */
   	
   
    $("#edit").dialog({autoOpen:false}); 
    $("input[name='edit']").click(function(){
        $( "#edit" ).dialog( "open" );
    });
    $("#submit3").click(function(){
        var name=$("#name").val();
        var radios = document.getElementsByName('ad_edit');
    for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // 弹出选中值
      var isadd=radios[i].value;
      // 选中后退出循环
      break;
      }
    }
   	
        //alert(name+isadd);
        var auto=new cookieStorage();
        //alert("123");
        //alert(motto);
        if(auto.getItem("accessToken")==null) 
        {
            alert("Seession expires.please relogin!");

            location.href="../index/index.html";
        }
        else{
        $.post("http://112.74.53.157:8080/Helpal/user/editSkill",
            {accessToken:auto.getItem("accessToken"),isAdd:isadd,skill:name},
            function(data,status)
            {
                //alert("11");
                //alert(data.Status);
                if(data.Status!=0)
                    alert("err:"+data.errorMsg);
                else
                {
                    alert("Edit success! Please refresh!");
                    location.reload(true);
                }
            }
            )
      }
        $( "#edit" ).dialog( "close" );
    });

})
