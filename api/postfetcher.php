<?php

$slug = $_GET['slug'];

$post = file_get_contents('../'.$slug);

$DOM = new DOMDocument;
   $DOM->loadHTML($post);

   var_dump($DOM);die();

   //get all H1
   $body = $DOM->getElementsByTagName('body');

   echo $body;

?>