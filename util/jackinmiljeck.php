<?php


function getCurl($url) {
	// create a new cURL resource
	$ch = curl_init();
	// set URL and other appropriate options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	$curlresp = curl_exec($ch);
	// print_r($curlresp);
	curl_close($ch);
	return $curlresp;

}

$filein = '/Users/ccmiller/git/milleriajek/_site/spatialtrack/2007/05/25/spatial-track-leonard-cohen-stranger-song.html';
if (fopen($filein, 'r')) {
    
    $id = basename($filein);
    
    $sanitized = htmlentities(file_get_contents($filein));
    
    // echo "file in: " . $filein."<br/>";
    // echo "running with id: " . $id;
    // echo $sanitized;
    $url = "http://localhost:8983/solr/miljek/update/extract?literal.id=".$id."&commit=true&literal.body=".$sanitized -F "myfile=@".$filein;
    $resp = getCurl()
    // 
    // 
} else {
	echo "couldn't open";
}
?>