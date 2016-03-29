<?php

$prtlpoint = "SELECT CONCAT('g.'||cartodb_id) AS cvjek,cartodb_id,the_geom,name,anno FROM eolapp_point";

$prtlline = "SELECT CONCAT('g|'||cartodb_id) AS cvjek,cartodb_id,the_geom,name,anno FROM eolapp_line";

$prtlpoly = "SELECT CONCAT('gD'||cartodb_id) AS cvjek,cartodb_id,the_geom,name,anno FROM eolapp_poly";

$actualsql = $prtlpoint . " UNION ALL " . $prtlline . " UNION ALL " . $prtlpoly;

// echo $actualsql;die();

$carl = "https://cecmcgee.cartodb.com/api/v2/sql?format=GeoJSON&q=" . urlencode($actualsql);

echo $carl;die();

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $carl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$carlton = curl_exec($ch);
curl_close($ch);

// var_dump($carlton);die();
echo "<pre>" . $carlton . "</pre>";die();
// $carton = json_decode($carlton);

// var_dump($carton);die();

foreach ($carton->features as $carto) {

	$mjid = $carto->properties->mjid;

	foreach ($solrindejsond->response->docs as $solrd) {
		if (isset($solrd->location) && $solrd->location == $mjid) {
			// $solrd->the_geom=$carto->geometry;
			$solrd->the_geom = $carto;
			// echo "match:".$solrd->location.":::::";
			// echo $mjid;
		}
	}

}

?>