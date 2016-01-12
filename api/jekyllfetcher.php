<?php

// $p=file_get_contents('http://localhost:4000/spatialtrack/2008/09/29/spatial-track-chuck-e-weiss-piccolo-pete.html');

// $pr=array("response"=>$p);
// echo "callback(".json_encode($pr).");";

if(isset($_GET['solrstring'])){
$solrstring = $_GET['solrstring'];} else {
    $solrstring= "*";
}



$sarl = "http://localhost:8983/solr/miljek/select?rows=999&wt=json&q=".$solrstring;


$solrin = json_decode(file_get_contents($sarl));

$lopoints = array();
        $lolines = array();
        $lopolys = array();


foreach ($solrin->response->docs as $solr) {

$locstring = isset($solr->location) ? $solr->location : "none";

$locstringa = explode(":", $locstring);

	switch ($locstringa[0]) {
		case 'line':
			$lolines[]=$locstringa[1];
			break;
		case 'point':
			$lopoints[]=$locstringa[1];
			break;
		case 'poly':
			$lopolys[]=$locstringa[1];
			break;

		default:
			# code...
			break;
	}

} //foreach solrin


if (count(array_unique($lopoints)) > 0) {
            //$prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN (".implode(",",array_unique($lopoints)).")";
            $prtlpoint = "SELECT CONCAT('point:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_point where cartodb_id IN (".implode(",",array_unique($lopoints)).")";
        } else {
            $prtlpoint = "SELECT CONCAT('point:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_point where cartodb_id = 00";
        }
        if (count(array_unique($lolines)) > 0) {
            //$prtlline = "SELECT cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_line where cartodb_id IN (".implode(",",array_unique($lolines)).")";
            $prtlline = "SELECT CONCAT('line:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_line where cartodb_id IN (".implode(",",array_unique($lolines)).")";
        } else {
            $prtlline = "SELECT CONCAT('line:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_line where cartodb_id = 00";
        }
        if (count(array_unique($lopolys)) > 0) {
            //$prtlpoly = "SELECT cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_poly where cartodb_id IN (".implode(",",array_unique($lopolys)).")";
            $prtlpoly = "SELECT CONCAT('poly:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_poly where cartodb_id IN (".implode(",",array_unique($lopolys)).")";
        } else {
            $prtlpoly = "SELECT CONCAT('poly:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno,created,updated FROM spatialtrack_poly where cartodb_id = 00";
        }

$actualsql = $prtlpoint." UNION ALL ".$prtlline." UNION ALL ".$prtlpoly;

        $carl = "../offline/cartodb-query.geojson";
        // $carl = "https://cecmcgee.cartodb.com/api/v2/sql?format=GeoJSON&q=".$actualsql;


$carton = json_decode(file_get_contents($carl));


foreach ($carton->features as $carto) {

$mjid=$carto->properties->mjid;

foreach ($solrin->response->docs as $solrd) {
	if(isset($solrd->location) && $solrd->location==$mjid){
        // $solrd->the_geom=$carto->geometry;
		$solrd->the_geom=$carto;
		// echo "match:".$solrd->location.":::::";
		// echo $mjid;
	}
}

}

echo "cwmccallback(".json_encode($solrin).")";




?>