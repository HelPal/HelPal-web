   $(function()
   {    
   	var interests=new cookieStorage();
   	var interestsinfo=JSON.parse(interests.getItem("user"));
   	$("#interests").empty();
    //alert(interestsinfo.Interests.length);
   	for(var i=0;i<interestsinfo.Interests.length;i++)
   	{

   		$("#interests").append("<tr><td>"+interestsinfo.User[0].username+"</td><td>"+interestsinfo.User[0].gender+"</td><td>"+interestsinfo.User[0].age+"</td><td>"+interestsinfo.Interests[i].interest_tag+"</td></tr>")
   	}
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
        $.post("http://112.74.53.157:8080/Helpal/user/editInterest",
            {accessToken:auto.getItem("accessToken"),isAdd:isadd,interest:name},
            function(data,status)
            {
                //alert("11");
                //alert(data.Status);
                if(data.Status!=0)
                    alert("err:"+data.errorMsg);
                else
                {
                    alert("Set success!Please refresh!");
                    window.location.reload(true);

                    
                }
            }
            )
      }
        $( "#edit" ).dialog( "close" );
    });
})
