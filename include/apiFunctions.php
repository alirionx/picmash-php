<?php

//-Gobal Vars-----------------------------

$curDir = getcwd();

$dbPath = $curDir . '/db/picmash.db';
$db = new SQLite3($dbPath);

//----------------------------------------

function menueGet(){
    
    $db = $GLOBALS['db'];
    
    $fltr = " WHERE usr = 1 ";
    if( $_SESSION['adm'] == true ){
        $fltr = " WHERE adm = 1 ";
    }

    $dbRes = [];
    $dbQry = $db->query("SELECT * FROM menue ".$fltr." ORDER by odr;");
    while ($row = $dbQry->fetchArray()) {
        array_push($dbRes, $row);
    }

    $jsonStr = json_encode($dbRes, JSON_PRETTY_PRINT);
    echo $jsonStr;
}

//--------------------

function mashGet(){

}

//--------------------
?>