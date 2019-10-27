<?php


//---App Config-------------------------------------------------------------------------

$baseURL = '/';
    
//--------------------------------------------------------------------------------------


//---Some Globals and Initiators--------------------------------------------------------

session_start();

$curHost = $_SERVER['SERVER_NAME'];
$curDir = getcwd();

$dbPath = $curDir . '/db/picmash.db';
$dbDump = $curDir . '/init/picmash.sql';

$curUrl  = $_SERVER['REQUEST_URI'];
$curPath = parse_url($curUrl, PHP_URL_PATH);

//---App Init---------------------------------------------------------------------------

if($curPath == '/api/init'){
    
    $protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === 0 ? 'https://' : 'http://';

    if( $_POST['newAdmPwd'] ){
        $newAdmPwd = $_POST['newAdmPwd'];
        $newAdmHash = password_hash($newAdmPwd, PASSWORD_DEFAULT);
    }
    else{
        header("Location: " . $protocol . $_SERVER['HTTP_HOST'] );
        die();
    }

    mkdir($curDir.'/db/pics');
    $db = new SQLite3($dbPath);

    shell_exec('cat '.$dbDump.' | sqlite3 '.$dbPath);
    //$output = shell_exec('sqlite3 '.$dbPath.' < '.$dbPath);

    $dbQry = $db->query("
        UPDATE mgmt set val = '$newAdmHash' WHERE key = 'adminpwdhash';
    ");
    
    $_SESSION['adm'] = true;
    
    header("Location: " . $protocol . $_SERVER['HTTP_HOST'] );
    die();
}

//-------------------------

if( !file_exists($dbPath) ){
    require_once('include/viewFunctions.php');
    view_initHtml();
    die();
}

//--------------------------------------------------------------------------------------


//---To include-------------------------------------------------------------------------

include 'include/viewFunctions.php';
include 'include/apiFunctions.php';

//--------------------------------------------------------------------------------------


//-Maintenance Mode-----------------------

//$_SESSION['adm'] = true;

//----------------------------------------


//---The URL Router---------------------------------------------------------------------

$pathArray = [
    '\/' => 'view_appFrame',
    '\/api\/menu\/get' => 'menueGet',
    '\/api\/mash\/get' => 'mashGet',
    '\/api\/mash\/vote' => 'mashVote',
    '\/api\/rating\/get' => 'ratingGet',
    '\/api\/pic\/download\/(.*)' => 'picDownload',
    '\/api\/pic\/reset' => 'picReset',
    '\/api\/pic\/delete' => 'picDelete',
    '\/api\/pic\/upload' => 'picUpload',
    '\/api\/mgmt\/admpwd' => 'mgmtAdmPwd',
    '\/api\/mgmt\/resrating' => 'mgmtResRating',
    '\/api\/mgmt\/delpics' => 'mgmtDelPics',
    '\/api\/mgmt\/resapp' => 'mgmtResApp',
    '\/api\/login' => 'logIn',
    '\/api\/logout' => 'logOut',
];

$keys = array_map('strlen', array_keys($pathArray));
array_multisort($keys, SORT_DESC, $pathArray);

//--------------------

foreach($pathArray as $pathPat => $func){
    $matchCHK = false;
    if( preg_match('/^'.$pathPat.'$/', $curPath, $matches, PREG_OFFSET_CAPTURE) ){
        unset($matches[0]);
        $varAry = [];
        foreach($matches as $var){
            array_push($varAry, $var[0]);
        }
        $func($varAry);
        $matchCHK = true;
        break;
    }
}
if( $matchCHK == false){
    echo "invalid path or path not found";
    header("HTTP/1.0 404 Not Found");
}
//--------------------------------------------------------------------------------------


//---Little Helpers---------------------------------------------------------------------

function arrayToJSON($array, $pretty=false){
    if($pretty == true){
        $resJSON = json_encode($array, JSON_PRETTY_PRINT);
    }
    else{
        $resJSON = json_encode($array);
    }
    return $resJSON;
}

//-------------------------


//--------------------------------------------------------------------------------------





?>
