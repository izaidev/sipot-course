<?php
$postdata=file_get_contents('php://input');
$obj=json_decode($postdata);

include_once 'functions.php';

if($obj->action == 'metrics')
    metrics($obj);
if($obj->action == 'testusers')
    testusers($obj);




Header("Content-Type: application/json;charset=UTF-8");
$data = json_encode($obj, JSON_UNESCAPED_UNICODE);
$len  = strlen($data);
Header("Content-Length: {$len}");
if($data == "null"){
    $data = 1;
}
die($data);

?>