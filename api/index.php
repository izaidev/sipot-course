<?php
$postdata=file_get_contents('php://input');
$obj=json_decode($postdata);
$response = array();

include_once 'functions.php';

if($obj->action == 'metrics')
    metrics($obj);
if($obj->action == 'testusers')
    testusers($obj);
if($obj->action == 'get_metrics')
    $response = get_metrics();
if($obj->action == 'get_testusers')
    $response = get_testusers();
if($obj->action == 'update_status')
    $response = update_status($obj);




Header("Content-Type: application/json;charset=UTF-8");
$data = json_encode($response, JSON_UNESCAPED_UNICODE);
$len  = strlen($data);
Header("Content-Length: {$len}");
if($data == "null"){
    $data = 1;
}
die($data);

?>