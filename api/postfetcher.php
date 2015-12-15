<?php

$slug = $_GET['slug'];

$post = file_get_contents('../'.$slug);

$DOM = new DOMDocument;
libxml_use_internal_errors(true);
   $DOM->loadHTMLFile($post);

   // var_dump($DOM);die();

   //get all H1
   $body = $DOM->getElementsByTagName('body')->item(0);

   // $img = $dom->getElementsByTagName('img')->item(0);
// echo $img->attributes->getNamedItem("src")->value;

libxml_use_internal_errors(false);

echo $body;

?>