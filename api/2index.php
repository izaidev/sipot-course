<?php

use Phalcon\Mvc\Micro,
    Phalcon\Http\Request,
    Phalcon\Http\Response;


$app = new Micro();

$app->post('/metrics', function(){
    
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');
    $request = new Request();
    $post_data = $request->getJsonRawBody();
    $data = array(1);


    $query = <<<SQL
                INSERT INTO metrics VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();
    
    $response = new Response();
    //Define the content 
    $content = json_encode($data,JSON_NUMERIC_CHECK);
    // Status Code
    $response->setStatusCode(200, "Data Result");
    // Mandamos el tipo de contenido al Header
    $response->setContentType('application/json');
    //Para acceder desde cualquier origen en el http request
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Headers', 'X-Requested-With');//corregir error cors
    // Asignamos los datos al contenido del header
    $response->setContent($content);
    // Regresamos la respuesta dada.
    return $response;
    
});

$app->post('/testusers', function(){
    
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'sipot');
    $request = new Request();
    $post_data = $request->getJsonRawBody();
    $data = array(1);

    $status = property_exists($post_data, 'status') ? $post_data->status : 'Sin Enviar';


    $query = <<<SQL
                INSERT INTO testusers VALUES (NULL,'$post_data->name','$post_data->email','$post_data->org','$post_data->state','$status');
SQL;
    $db->set_charset("utf8");
    $db->query($query) or die($db->error);
    $db->close();

    $response = new Response();
    //Define the content 
    $content = json_encode($data,JSON_NUMERIC_CHECK);
    // Status Code
    $response->setStatusCode(200, "Data Result");
    // Mandamos el tipo de contenido al Header
    $response->setContentType('application/json');
    //Para acceder desde cualquier origen en el http request
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Headers', 'X-Requested-With');//corregir error cors
    // Asignamos los datos al contenido del header
    $response->setContent($content);
    // Regresamos la respuesta dada.
    return $response;
    
});


$app->get('/', function(){
    
    $db = new mysqli("localhost", "puntoycoma", "PuntoyComa19;", 'capacitadores');
    $request = new Request();
    $data = array();

    $query = <<<SQL
                SELECT * FROM capacitadores
SQL;
    
    
    $db->set_charset("utf8");
    $result = $db->query($query) or die($db->error);

    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }

    $db->close();
    
    $response = new Response();
    //Define the content 
    $content = json_encode($data,JSON_NUMERIC_CHECK);
    // Status Code
    $response->setStatusCode(200, "Data Result");
    // Mandamos el tipo de contenido al Header
    $response->setContentType('application/json');
    //Para acceder desde cualquier origen en el http request
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Headers', 'X-Requested-With');//corregir error cors
    // Asignamos los datos al contenido del header
    $response->setContent($content);
    // Regresamos la respuesta dada.
    return $response;
    
});


// To allow access from outside
$app->before(function() use ($app){
	$origin = $app->request->getHeader("ORIGIN") ? $app->request->getHeader("ORIGIN") : '*';
	$app->response->setHeader("Access-Control-Allow-Origin", $origin)
		  ->setHeader("Access-Control-Allow-Methods", 'GET,POST,PUT')
		  ->setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization')
		  ->setHeader("Access-Control-Allow-Credentials", true);
});
	
$app->options('/{catch:(.*)}', function() use ($app) { 
	$app->response->setStatusCode(200, "OK")->send();
});


$app->notFound(function() use ($app){
    $app->response->setStatusCode(404, "Not Found");

    $app->response->sendHeaders();

    echo "This is crazy, but this page was not found!";

});

// Two Lines added for Phalcon 4.0
$uri = str_replace('_url=',"",$_SERVER["QUERY_STRING"]);
$app -> handle($uri);




?>