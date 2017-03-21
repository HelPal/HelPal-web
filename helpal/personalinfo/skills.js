   $(function()
   {    
   	var skills=new cookieStorage();
   	var skillsinfo=JSON.parse(skills.getItem("user"));
   	$("#skills").empty();
   	for(var i=0;i<skillsinfo.Skills.length;i++)
   	{
   		$("#skills").append("<tr><td>"+skillsinfo.User[0].username+"</td><td>"+skillsinfo.User[0].gender+"</td><td>"+skillsinfo.User[0].age+"</td><td>"+skillsinfo.Skills[i].skill_tag+"</td></tr>")
   	}
})
