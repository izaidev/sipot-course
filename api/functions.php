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
     $db = new mysqli("localhost", "izaiorg7_sipot_course", "PuntoyComa19;", 'izaiorg7_sipot_course');
    $data = array();

    $query = <<<SQL
                SELECT
                    ANY_VALUE(name) AS name,
                    email,
                    ANY_VALUE(org) AS org,
                    ANY_VALUE(state) AS state
                FROM
                    metrics
                GROUP BY
                    email
                ORDER BY
                    state
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
     $db = new mysqli("localhost", "izaiorg7_sipot_course", "PuntoyComa19;", 'izaiorg7_sipot_course');
    $data = array();

    $query = <<<SQL
                SELECT DISTINCT email, name, state, org, testID, status FROM testusers ORDER BY state
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
    $db = new mysqli("localhost", "izaiorg7_sipot_course", "PuntoyComa19;", 'izaiorg7_sipot_course');
    $status = property_exists($post_data, 'status') ? $post_data->status : 'Sin Enviar';


    $query = <<<SQL
                INSERT INTO testusers VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state','$status');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
}


function update_status($post_data){
    $db = new mysqli("localhost", "izaiorg7_sipot_course", "PuntoyComa19;", 'izaiorg7_sipot_course');


    $query = <<<SQL
               UPDATE testusers SET status = 'Enviado' WHERE testID = $post_data->testID;
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
}

?>