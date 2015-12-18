<?php
$slug = $_GET['slug'];

libxml_use_internal_errors(true);
$DOM = new DOMDocument;
$DOM->loadHTML(file_get_contents('../' . $slug), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

$finder = new DomXPath($DOM);
$classname = "post-content";
$nodes = $finder->query("//*[contains(@class, '$classname')]");

libxml_use_internal_errors(false);

$innerHTML = '';

/* ONLY THING THAT WORKED - GOT IT FROM http://stackoverflow.com/questions/4879946/how-to-savehtml-of-domdocument-without-html-wrapper
*/
foreach ($nodes as $node) {
    $littledom = new DOMDocument;
    $innerHTML.= $DOM->saveXML($node);
}

echo $innerHTML;
?>