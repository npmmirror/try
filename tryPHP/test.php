<?php

$my_host = $_SERVER['HTTP_HOST'];
header("content-type:text/json;charset=utf-8");
    $test_json = "    
{\"comics\":[
    {\"name\":\"名字1\",\"cover_url\":\"http:\/\/".$my_host."\/test_img\/img1.jpg\",\"img_url_type\":\"1\",\"img_url_format\":\"http:\/\/".$my_host."\/test_img\/img1%s.jpg\",\"page_number\":\"3\"},
    {\"name\":\"名字2\",\"cover_url\":\"http:\/\/".$my_host."\/test_img\/img2.jpg\",\"img_url_type\":\"1\",\"img_url_format\":\"http:\/\/".$my_host."\/test_img\/img2%s.jpg\",\"page_number\":\"3\"},
    {\"name\":\"名字3\",\"cover_url\":\"http:\/\/".$my_host."\/test_img\/img3.jpg\",\"img_url_type\":\"1\",\"img_url_format\":\"http:\/\/".$my_host."\/test_img\/img3%s.jpg\",\"page_number\":\"3\"}
]}
    ";
echo $test_json;
//echo $my_host;


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
?>
