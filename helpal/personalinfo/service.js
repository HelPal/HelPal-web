function up()
{
	var title=$("#title").val();
	var detail=$("#detail").val();
	var auto=new cookieStorage();
        //alert("123");
        //alert(motto);
        if(auto.getItem("accessToken")==null) 
        {
            alert("Seession expires.please relogin!");

            location.href="../index/index.html";
        }
        else{
	$.post("http://112.74.53.157:8080/Helpal/offer/create",
            {accessToken:auto.getItem("accessToken"),localeX:"39.967",localeY:"116.311",title:title,detail:detail},
            function(data,status)
            {
                //alert("11");
                //alert(data.Status);
                if(data.Status!=0)
                    alert("err:"+data.errorMsg);
                else
                {
                    alert("Create success! ");
                    
                }
            }
            )
}
}