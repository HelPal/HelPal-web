<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="com.baidu.aip.nlp.*" %>
<%@ page import="com.google.gson.*" %>
<%@ page import="org.json.JSONArray" %>
<%!
    public class search {
    
    private final String APP_ID = "9461903";
    private final String API_KEY = "j2Gv2SEAwLYiNjl4Sb2CK2SU";
    private final String SECRET_KEY = "BqPgP7jjyaDG1bvYywR7vgqhLuIjqtEs";
    
    /*
    private final String APP_ID = "9614592";
    private final String API_KEY = "9UPGf7IPHGvOLjoWaLL1hAkb";
    private final String SECRET_KEY = "p4hRyoqX1CuMgGHMNqnkkw6OMRxqYuB1";
    */
    //地球平均半径
    private int i=0;
    private final double EARTH_RADIUS = 6378137;
    //把经纬度转为度（°）
    private double rad(double d){
        return d * Math.PI / 180.0;
    }

    private float simnet(String query1,String query2) {
        AipNlp client = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
        // 获取两个文本的相似度
        JSONObject response = client.simnet(query1,query2);
        JsonParser parser=new JsonParser();
        JsonObject json=(JsonObject)parser.parse(response.toString());
        JsonObject output=json.get("output").getAsJsonObject();
        //System.out.println("1");
        //System.out.println("score="+ output.get("score").getAsString());
        return Float.parseFloat(output.get("score").getAsString());
        //System.out.println(response.toString());

    }
    public String name;
    public String detail;
    public String service;
    public double localex;
    public double localey;
    public float s_score;
    public float l_score;
    public float totalscore;

    public search(){}

    public search(String name,String detail,String service,double localex,double localey){

        this.name=name;
        this.detail=detail;
        this.service=service;
        this.localex=localex;
        this.localey=localey;
        this.s_score=0;
        this.l_score=0;
        this.totalscore=0;
    }



    public void count(search user)
    {
        this.l_score=(float)getDistance(user.localex,user.localey,this.localex,this.localey);
        this.s_score=simnet(user.service,this.service);
        this.totalscore= (float) (this.s_score*0.866666+this.l_score*0.133334);
    }

    public double getDistance(double lng1, double lat1, double lng2, double lat2){
        double radLat1 = rad(lat1);
        double radLat2 = rad(lat2);
        double a = radLat1 - radLat2;
        double b = rad(lng1) - rad(lng2);
        double s = 2 * Math.asin(
                Math.sqrt(
                        Math.pow(Math.sin(a/2),2)
                                + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)
                )
        );
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        //return s;
        return (2000-s)/2000;
    }

}

static class mycmp implements Comparator<search>
    {
        public int compare(search a, search b)
        {

            return (b.totalscore>a.totalscore)?1:-1;
        }
    }
%>
<%  
        
         request.setCharacterEncoding("UTF-8");
         response.setCharacterEncoding("UTF-8");
         String query = request.getParameter("query");
         double rangex= Double.parseDouble(request.getParameter("rangx"));
         double rangey= Double.parseDouble(request.getParameter("rangy"));
         
         
         int i=0;
         //search user_charge=new search("","","牛排",116.316174,39.974857);
         search user_charge=new search("","",query,rangex,rangey);
         //String json={query:query};
         //out.println(json);
        
         
         try {
            //加载驱动
            Class.forName("com.mysql.jdbc.Driver");
            //建立连接
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost/test","root","root");
            //创建状态
            Statement state=con.createStatement();
            //插入
            //String sql="insert into student values('Gosling','java'),('002','zxy')";
            //state.executeUpdate(sql);
            //更新
            //String sql1="update student set stuID='001' where stuName='java'";
            // state.executeUpdate(sql1);
            //修改
            //String sql3="update student set stuName='html' where stuID='002'";
            //state.executeUpdate(sql3);
            //查询
            //String sql2="select stuID,stuName from student where stuID='001'";
            /*
            String sql="select count(1) as count from search";
            ResultSet rs=state.executeQuery(sql);
            while(rs.next()){count=Integer.parseInt(rs.getString("count"));}
            */
            //out.println("1");
            String sql1="select * from search";
            ResultSet rs=state.executeQuery(sql1);
            search servrice[]=new search[6];
            while(rs.next()){
                servrice[i]=new search();
                servrice[i].name=rs.getString("user_name");
                servrice[i].detail=rs.getString("service_detail");
                servrice[i].service=rs.getString("service_name");
                servrice[i].localex=Double.parseDouble(rs.getString("service_x"));
                servrice[i].localey=Double.parseDouble(rs.getString("service_y"));
                i++;
                //out.println("i:"+i);
            }
            //out.println("2");
            //out.println("Operator success..."+"<br>");
            //request.getRequestDispatcher("index.jsp").forward(request,response);
            //response.sendRedirect("index.jsp")
             for(int j=0;j<6;j++){
            servrice[j].count(user_charge);
            Thread.sleep(300);
        }
        //out.println("3");
        //out.println("123");
        Arrays.sort(servrice,0,6,new mycmp());//排n个数，Arrays.sort(d,new mycmp())则默认排全部
        //out.println("4");
        /*
        for (int k = 0; k < 6; k++) {
            out.println("name: "+servrice[k].name+"detail: "+servrice[k].detail+"service: " + servrice[k].service+";localex: "+servrice[k].localex+";localey: "+servrice[k].localey+";s_score: "+servrice[k].s_score+";l_score: "+servrice[k].l_score+";totalscore: "+servrice[k].totalscore);
        }*/
        JSONObject jsonObj = new JSONObject();//创建json格式的数据  
  
        JSONArray jsonArr = new JSONArray();//json格式的数组  
  
        
        for(int k=0;k<3;k++)
        {
            JSONObject jsonObjArr = new JSONObject(); 
            jsonObjArr.put("name",servrice[k].name);    
            jsonObjArr.put("title", servrice[k].service);  
            jsonObjArr.put("detail", servrice[k].detail);  
            jsonObjArr.put("rangex", servrice[k].localex);  
            jsonObjArr.put("rangey", servrice[k].localey);  
            jsonArr.put(jsonObjArr);//将json格式的数据放到json格式的数组里 
            
            //out.println(jsonArr.toString()); 
        }
        //out.println("4"); 
        jsonObj.put("status", "0");
        jsonObj.put("results", jsonArr);//再将这个json格式的的数组放到最终的json对象中。  
        response.setContentType("text/json; charset=UTF-8");  
        out.println(jsonObj.toString());  
            state.close();
            con.close();
            
        } catch (Exception e) { 
            e.printStackTrace();
            out.println("{'status':'1'}");
        }
        /*
        search user_charge=new search("取快递",106.505998,29.62652);
        search servrice[]=new search[5];
        servrice[0]=new search();
        servrice[0].service="跑腿";
        servrice[0].localex=106.505998;servrice[0].localey=29.62652;
        servrice[1]=new search();
        servrice[1].service="帮取快递";
        servrice[1].localex=106.559465;servrice[1].localey=29.614463;
        servrice[2]=new search();
        servrice[2].service="校园快递";
        servrice[2].localex=106.515771;servrice[2].localey=29.580797;
        servrice[3]=new search();
        servrice[3].service="中餐";
        servrice[3].localex=106.515771;servrice[3].localey=29.580797;
        servrice[4]=new search();
        servrice[4].service="西餐";
        servrice[4].localex=106.553141;servrice[4].localey=29.598385;
        */
       
 %>  
