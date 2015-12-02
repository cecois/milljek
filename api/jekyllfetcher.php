<?

$p=file_get_contents('http://localhost:4000/spatialtrack/2008/09/29/spatial-track-chuck-e-weiss-piccolo-pete.html');

$pr=array("response"=>$p);

// cwmccallback({"responseHeader":{"status":0,"QTime":1,"params":{"json.wrf":"cwmccallback","q":"location_id:\"75\" AND location_type:\"point\"","callback":"cwmccallback","_":"1449059115776","wt":"json"}},"response":{"numFound":1,"start":0,"docs":[{"_id":"5651b1e2431ee61b9fc04c78","episode":"34","episode_title":"Have a Merry Christmas...","guests":"Jon Hamm,Doug Benson,Nick Kroll,Kulap Vilaysack,Paul F. Tompkins,James Adomian","slug_earwolf":"have-a-merry-christmas","id_wikia":"2498","slug_soundcloud":"http://soundcloud.com/comedybangbang/have-a-merry-christmas/#t=11:35","bit":"Location","fat_name":"Location","instance":"Chupa will visit Monterrey for Christmas.","created_at":"2015-04-03T10:51:29Z","updated_at":"2015-10-16T10:51:29Z","elucidation":"identifiable earth location","tags":"El Chupacabra","tstart":"11:35","tend":"11:43","location_type":"point","location_id":"75","holding":"false","_version_":1519445474686271492}]}})


echo "callback(".json_encode($pr).");";

?>