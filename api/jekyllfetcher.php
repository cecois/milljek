<?php

// $p=file_get_contents('http://localhost:4000/spatialtrack/2008/09/29/spatial-track-chuck-e-weiss-piccolo-pete.html');

// $pr=array("response"=>$p);
// echo "callback(".json_encode($pr).");";

if(isset($_GET['solrstring'])){
$solrstring = $_GET['solrstring'];} else {
    $solrstring= "*";
}

// spatialgo is a killer of sorts - if set to "false" (string) it will just echo out the solr query without merging with a cartodb call also
if(isset($_GET['spatialgo'])){
$spatialgo = $_GET['spatialgo'];} else {
    $spatialgo='true';
}


$offline=false;


$sarl = "http://localhost:8983/solr/eoljek/select?rows=999&wt=json&q=".$solrstring;


$solrin = json_decode(file_get_contents($sarl),true);


if($spatialgo=='false'){

// $myArray = array('item1', 'item2hidden', 'item3', 'item4', 'item5hidden');

// echo json_encode($solrin);die();

$acv=array();
$aabout=array();

foreach ($solrin['response']['docs'] as $doc) {

switch ($doc['subject'][0]) {
    case 'about':
        $aabout[]=$doc;
        break;
            case 'cv':
        $acv[]=$doc;
        break;
    
    default:
        # code...
        break;
}

    // echo "suect:".$doc['subject'][0]."<br/><br/><br/>";
}
// die();

// $acv = array_filter($solrin['response']['docs'], function($v) { return $v['subject'][0] === 'cv'; });
// $aabout = array_diff($solrin, $acv);

$solrindivid['about']=$aabout;
$solrindivid['cv']=$acv;

    // echo "cwmccallback(".json_encode($solrin).")";
    echo "cwmccallback(".json_encode($solrindivid).")";
    die();
}

// $solrindejsond = json_decode($solrin);
// LAZINESS!
$solrindejsond = $solrin;

$lopoints = array();
        $lolines = array();
        $lopolys = array();


foreach ($solrindejsond->response->docs as $solr) {

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

if ($offline == true) {
 $carl = "../offline/cartodb-query.geojson";
$carton = json_decode(file_get_contents($carl));
} else {

if (count(array_unique($lopoints)) > 0) {
            //$prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN (".implode(",",array_unique($lopoints)).")";
            $prtlpoint = "SELECT CONCAT('point:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_point where cartodb_id IN (".implode(",",array_unique($lopoints)).")";
        } else {
            $prtlpoint = "SELECT CONCAT('point:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_point where cartodb_id = 00";
        }
        if (count(array_unique($lolines)) > 0) {
            //$prtlline = "SELECT cartodb_id,the_geom,name,anno FROM eolapp_line where cartodb_id IN (".implode(",",array_unique($lolines)).")";
            $prtlline = "SELECT CONCAT('line:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_line where cartodb_id IN (".implode(",",array_unique($lolines)).")";
        } else {
            $prtlline = "SELECT CONCAT('line:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_line where cartodb_id = 00";
        }
        if (count(array_unique($lopolys)) > 0) {
            //$prtlpoly = "SELECT cartodb_id,the_geom,name,anno FROM eolapp_poly where cartodb_id IN (".implode(",",array_unique($lopolys)).")";
            $prtlpoly = "SELECT CONCAT('poly:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_poly where cartodb_id IN (".implode(",",array_unique($lopolys)).")";
        } else {
            $prtlpoly = "SELECT CONCAT('poly:'||cartodb_id) AS mjid,cartodb_id,the_geom,name,anno FROM eolapp_poly where cartodb_id = 00";
        }

$actualsql = $prtlpoint." UNION ALL ".$prtlline." UNION ALL ".$prtlpoly;




        $carl = "https://cecmcgee.cartodb.com/api/v2/sql?format=GeoJSON&q=".urlencode($actualsql);

        // echo $carl;die();


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $carl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$carlton = curl_exec($ch);
curl_close($ch);

// var_dump($carlton);die();
$carton = json_decode($carlton);

} //offline

// var_dump($carton);die();

foreach ($carton->features as $carto) {

$mjid=$carto->properties->mjid;

foreach ($solrindejsond->response->docs as $solrd) {
	if(isset($solrd->location) && $solrd->location==$mjid){
        // $solrd->the_geom=$carto->geometry;
		$solrd->the_geom=$carto;
		// echo "match:".$solrd->location.":::::";
		// echo $mjid;
	}
}

}

echo "cwmccallback(".json_encode($solrindejsond).")";




?>