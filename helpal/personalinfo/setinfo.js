 function a(){
        var c_gender=$("#gender").val();
        var c_age=$("#age").val();
        var c_star_signs=$("#star_signs").val();
        var motto=$("#motto").val();
        //alert("123");
        //alert(motto);
        $.post("http://112.74.53.157:8080/Helpal/user/setInfo",
            {accessToken:"UnlraWUrMTQ4OTY0NzI3NStlN2I1YjljNTE2YTYwOGVkNGNhNjAxNDVlYTA5YjU5MQ%3D%3D%0A",gender:"male",age:"12",star_signs:"天蝎座",motto:"123"},
            function(data,status)
            {
                alert("11");
                alert(data.Status);
                if(data.Status!=0)
                    alert("err:"+data.errorMsg);
                else
                {
                    alert("Set success!");
                    //window.location.reload();
                }
            }
            )
        //$( "#set" ).dialog( "close" );
    }