   $(function()
   {    
   	$("a[name='link']").each(function()
        {
            alert($(this).attr("href"));
        });
})
