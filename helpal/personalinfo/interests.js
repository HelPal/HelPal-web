   $(function()
   {    
   	var interests=new cookieStorage();
   	var interestsinfo=JSON.parse(interests.getItem("user"));
   	$("#interests").empty();
   	for(var i=0;i<interestsinfo.Interests.length;i++)
   	{
   		$("#interests").append("<tr><td>"+interestsinfo.User[0].username+"</td><td>"+interestsinfo.User[0].gender+"</td><td>"+interestsinfo.User[0].age+"</td><td>"+interestsinfo.Interests[i].interest_tag+"</td></tr>")
   	}
})
