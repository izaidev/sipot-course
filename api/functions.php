<?php

function metrics($post_data){
    $db = new mysqli("localhost", "izaiorg7_sipot_course", "PuntoyComa19;", 'izaiorg7_sipot_course');

    $query = <<<SQL
                INSERT INTO metrics VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
    
}


function get_metrics(){
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');
    $data = array();

    $query = <<<SQL
                SELECT DISTINCT email, name, state, org FROM metrics ORDER BY state
SQL;
    $db->set_charset("utf8");
    $result = $db->query($query) or die($db->error);
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    $db->close();

    return $data;
    
}

function get_testusers(){
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');
    $data = array();

    $query = <<<SQL
                SELECT DISTINCT email, name, state, org, status FROM testusers ORDER BY state
SQL;
    $db->set_charset("utf8");
    $result = $db->query($query) or die($db->error);
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    $db->close();

    return $data;
    
}

function testusers($post_data){
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');
    $status = property_exists($post_data, 'status') ? $post_data->status : 'Sin Enviar';


    $query = <<<SQL
                INSERT INTO testusers VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state','$status');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
}

?>