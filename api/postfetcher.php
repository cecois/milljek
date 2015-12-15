<?php

$slug = $_GET['slug'];

$post = file_get_contents('../'.$slug);

$DOM = new DOMDocument;
libxml_use_internal_errors(true);
   $DOM->loadHTMLFile('../'.$slug);

   // var_dump($DOM);die();

   //get all H1
   $bodies = $DOM->getElementsByTagName('body');

$finder = new DomXPath($DOM);
$classname="post-content";
$nodes = $finder->query("//*[contains(@class, '$classname')]");



   // $img = $dom->getElementsByTagName('img')->item(0);
// echo $img->attributes->getNamedItem("src")->value;

libxml_use_internal_errors(false);

// foreach ($bodies as $body) {
// 	echo $body->nodeValue, PHP_EOL;
// }
// 
foreach ($nodes as $node) {
	echo $node->nodeValue, PHP_EOL;
}

?>