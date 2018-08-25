<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/8/25
 * Time: 11:39
 */
?>

<?php
header("content-type:text/json;charset=utf-8");
$servername = "193.112.1.213";
$username = "hzh";
$password = "1q2w3e4r5t";
$mysqlname = "comics_site";
$json = '';
$data = array();

class User
{
    public $name;
    public $cover_url;
    public $img_url_type;
    public $img_url_format;
    public $page_number;
}
/*
//获取域名或主机地址
echo $_SERVER['HTTP_HOST']."<br />";

//获取网页地址
echo $_SERVER['PHP_SELF']."<br />";

//获取网址参数
echo $_SERVER["QUERY_STRING"]."<br />";

//获取用户代理
echo $_SERVER['HTTP_REFERER']."<br />";

//获取完整的url
echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."<br />";
echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']."<br />";

//包含端口号的完整url
echo 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"]."<br />";

//只取路径
$url='http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"]."<br />";
echo dirname($url);
*/
/*第二步，链接数据库，代码如下：*/

// 创建连接
$conn = mysqli_connect($servername, $username, $password, $mysqlname);

/*第三步，定义查询语句，并执行，代码如下：*/

$sql = "SELECT `name`,cover_url,img_url_type,img_url_format,page_number FROM comics_list
	WHERE img_url_type = 1 AND
		page_number > 0 AND
		state = 1 AND
		valid = 1
	ORDER BY RAND()
	LIMIT 9
;";
$result = $conn->query($sql);

/*第四步，获取查询出来的数据，并将其放在事先声明的类中，最后以json格式输出。代码如下：*/

if ($result) {
//echo "查询成功";
    while ($row = mysqli_fetch_array($result)) {
        $user = new User();
        $user->name = urlencode($row["name"]);
//        $user->name = urlencode("名字");
//        echo $row["name"];
        $user->cover_url = $row["cover_url"];
//        echo $row["cover_url"];echo "\n";
        $user->img_url_type = $row["img_url_type"];
        $user->img_url_format = $row["img_url_format"];
        $user->page_number = $row["page_number"];
        $data[] = $user;
    }
    $json = json_encode($data);//把数据转换为JSON数据.
    $out =  "{" . '"comics"' . ":" . urldecode($json) . "}";
    //如果在阿里云的虚拟主机需要加上这行，那个破主机会返回GBK的字符不知道为什么
//  $out = iconv('GB2312', 'UTF-8//IGNORE', "$out"); //将字符串的编码从GB2312转到UTF-8
//    echo $out;
} else {
    echo "查询失败";
}
echo $out;
?>
