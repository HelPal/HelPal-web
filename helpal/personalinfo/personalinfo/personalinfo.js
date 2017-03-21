$(function(){
    //get userinfo
    //upload img
    $("#upload").dialog({autoOpen:false}); 
    $("#set").dialog({autoOpen:false}); 
    $("input[name='upload_img']").click(function(){
    	$( "#upload" ).dialog( "open" );
    });
    
    $("input[name='submit2']").click(function(){
    	var avatar=$("#img_source");
    	//alert(path);
    	$.post("http://*/v1/user/setAvatar",{accessToken:getUrlParam(accessToken),avatar:avatar},
    		function(data,status)
    		{
    			if(data.status!=0)
					alert("err:"+data.errorMsg);
				else
				{
					alert("Upload success!");
				}
    		}
    		)
    	$( "#upload" ).dialog( "close" );
        window.location.reload();
    });


    //set userinfo
    $("input[name='Settings']").click(function(){
    	$( "#set" ).dialog( "open" );
    });
    $("input[name='submit1']").click(function(){
    	var c_name=$("#name").val();
        var c_sex=$("#sex").val();
        var motto=$("#motto").val();
    	alert(c_name+c_sex+motto);
    	$.post("http://*/v1/user/setiInfo",{accessToken:getUrlParam(accessToken),username:c_name,gender:c_sex,motto:motto},
    		function(data,status)
    		{
    			if(data.status!=0)
					alert("err:"+data.errorMsg);
				else
				{
					alert("Set success!");
				}
    		}
    		)
    	$( "#set" ).dialog( "close" );
        window.location.reload();
    });
    //update accesstoken
    $("a[name='link']").each(function()
        {
            var link=$(this).attr("href");
            var path=link+"?a="+getUrlParam("a");
            $(this).attr("href",path);
        });
  //  alert($("a[name='link']").attr("href"));
});
   //获取url中的参数
function getUrlParam(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r != null) return unescape(r[2]); return null; //返回参数值
}