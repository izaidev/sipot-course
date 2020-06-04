<?php

function metrics($post_data){
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');

    $query = <<<SQL
                INSERT INTO metrics VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
    
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