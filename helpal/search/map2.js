
$(function()
{
    map = new BMap.Map("container");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,16);
    map.enableContinuousZoom();
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(new BMap.Point(116.315648,39.974657));
            map.addOverlay(mk);
            mk.setAnimation(BMAP_ANIMATION_BOUNCE); 
            var label = new BMap.Label("你的位置",{offset:new BMap.Size(20,-10)});
            mk.setLabel(label);
            map.panTo(new BMap.Point(116.315648,39.974657));
            alert('您的位置：'+r.point.lng+','+r.point.lat);
            u_lat=39.974657;
            u_lng=116.315648;
        }
        else {
            alert('failed'+this.getStatus());
        }        
    },{enableHighAccuracy: true})
    //关于状态码
    //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
});
     

function result()
{
    /*
    map.clearOverlays();
    var markerr = new BMap.Marker(new BMap.Point(u_lng, u_lat)); // 创建点
    var marker = new BMap.Marker(new BMap.Point(116.31875,39.977313)); // 创建点
    map.addOverlay(markerr);
    map.addOverlay(marker);
    map.panTo(new BMap.Point(116.31875,39.977313));
    */
    map.clearOverlays();
    var markerr = new BMap.Marker(new BMap.Point(u_lng, u_lat)); 
    map.addOverlay(markerr);
    markerr.setAnimation(BMAP_ANIMATION_BOUNCE); 
    var label = new BMap.Label("你的位置",{offset:new BMap.Size(20,-10)});
    markerr.setLabel(label);
    var pointArray = new Array();
    pointArray[0]=new BMap.Point(u_lng, u_lat);
    var query=$("#search").val();
    $.get("a.jsp",{query:query,rangx:u_lng,rangy:u_lat},
        function(data,status)
        {
            //var json = eval("("+data+")"); // data的值是json字符串，这行把字符串转成object  
            if(data.status!=0) alert("网络波动！请重试");
            else{
            //alert(data.results[0].detail);// 取出属性值testname
                for(var i=0;i<data.results.length;i++)
                {
                    var point =new BMap.Point(data.results[i].rangex,data.results[i].rangey);
                    var marker = new BMap.Marker(point); // 创建点
                    map.addOverlay(marker);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
                    var label = new BMap.Label("第"+(i+1)+"位: "+data.results[i].name+"<br/>类型："+data.results[i].title+"<br/>说明："+data.results[i].detail,{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                    var zz=data.results[i].name;
                    marker.addEventListener("click",function(){alert("联系他／她?");});
                    
                
                    pointArray[i] = new BMap.Point(data.results[i].rangex,data.results[i].rangey);
                }
                map.setViewport(pointArray);
             }
        });

}

function recommend()
{
    
    var scope=$("#r_scope").val()/1000;
    var base=((Math.sqrt(2)/2)*1000)/111319;
    var r_lng1=u_lng-scope*base;
    var r_lat1=u_lat+scope*base;
    var r_lng2=u_lng+scope*base;
    var r_lat2=u_lat-scope*base;
    //alert("左上角: "+r_lng1+" "+r_lat1+" "+"右下角: "+r_lng2+" "+r_lat2);
    //var auto=new cookieStorage();
    
    map.clearOverlays();
    var markerr = new BMap.Marker(new BMap.Point(u_lng, u_lat)); 
    map.addOverlay(markerr);
    markerr.setAnimation(BMAP_ANIMATION_BOUNCE); 
    var label = new BMap.Label("你的位置",{offset:new BMap.Size(20,-10)});
    markerr.setLabel(label);
    var pointArray = new Array();
    pointArray[0]=new BMap.Point(u_lng, u_lat);

    var auto=new cookieStorage();
        //alert("123");
        //alert(motto);
        if(auto.getItem("accessToken")==null) 
        {
            alert("Seession expires.please relogin!");

            location.href="../index/index.html";
        }
        else{
             $.get("http://112.74.53.157:8080/Helpal/discover/recommo",
            {accessToken:"VGVzdCsxNDg1NDEyNTg0K2U3YjViOWM1MTZhNjA4ZWQ0Y2E2MDE0NWVhMDliNTk%0A",rangeLX:r_lat2,rangeLY:r_lng2,rangeRX:r_lat1,rangeRY:r_lng1},
            function(data,status)
            {
                //alert("11");
                if(data.Status!=0) alert("error: "+data.errorMsg);
                else{
                    //alert(data.offerlist.length);
                    for(var i=0;i<data.offerlist.length;i++)
                    {
                        //alert(i+" :"+data.offerlist[i].hostname);
                    var point =new BMap.Point(data.offerlist[i].localeY,data.offerlist[i].localeX);
                    var marker = new BMap.Marker(point); // 创建点
                    map.addOverlay(marker);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
                    var label = new BMap.Label("Recommo-name: "+data.offerlist[i].hostname+"<br/>类型："+data.offerlist[i].title+"<br/>说明："+data.offerlist[i].detail,{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                    //var zz=data.results[i].name;
                    marker.addEventListener("click",function(){alert("联系他／她?");});
                    
                
                    pointArray[i] = new BMap.Point(data.offerlist[i].localeY,data.offerlist[i].localeX);
                }
                map.setViewport(pointArray);
                }
                
            }
            )
        }
    
}