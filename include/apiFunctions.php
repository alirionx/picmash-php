<?php

//-Gobal Vars-----------------------------

$curDir = getcwd();

$dbPath = $curDir . '/db/picmash.db';
$db = new SQLite3($dbPath);

$picUrlPath = '/db/pics/';
$picSysPath = $curDir . $picUrlPath;

//--------------------------------------------------------------------------

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

//--------------------------------------------------------------------------

function mashGet(){

    $db = $GLOBALS['db'];

    $dbRes = [];
    $dbRes["picUrlPath"] = $GLOBALS['picUrlPath'];
    $dbRes["pics"] = [];
    $dbQry = $db->query("
        SELECT 
            id,
            filename,
            win,
            loss,
            (win + loss) as vcount 
            
            FROM mash
            ORDER BY vcount, RANDOM() 
            LIMIT 2
        ;
    ");
    while ($row = $dbQry->fetchArray(SQLITE3_ASSOC)) {
        array_push($dbRes["pics"], $row);
    }

    $jsonStr = json_encode($dbRes, JSON_PRETTY_PRINT);
    echo $jsonStr;
}

//--------------------

function mashVote(){

    $db = $GLOBALS['db'];

    $win = $_POST['win'];
    $loss = $_POST['loss'];
 
    $dbQry = $db->query("
        UPDATE mash set win = win + 1 WHERE id = $win;
    ");
    $dbQry = $db->query("
        UPDATE mash set loss = loss + 1 WHERE id = $loss;
    ");
}

//--------------------------------------------------------------------------

function ratingGet(){

    $db = $GLOBALS['db'];

    $dbRes = [];
    $picUrlPath = $GLOBALS['picUrlPath'];
    $dbRes["picUrlPath"] = $picUrlPath;
    $dbRes['defi'] = [];
    $dbRes['data'] = [];
    

    $fltr = " WHERE usr = 1 ";
    if( $_SESSION['adm'] == true ){
        $fltr = " WHERE adm = 1 ";
    }

    $dbQry = $db->query("
        SELECT * FROM _mash $fltr ORDER BY odr;
    ");
    while ($row = $dbQry->fetchArray(SQLITE3_ASSOC)) {
        array_push($dbRes["defi"], $row);
    }
   
    $dbQry = $db->query("
        SELECT 
            id,
            '".$picUrlPath."' || filename as filepath,
            (win+loss) as votes,
            win,
            loss,
            case when (win+loss) = 0 then '50.0 %' else round( ((win*1.0)/(win+loss) )* 100 ,1 ) || ' %' end as rate
            
            FROM mash
            ORDER BY rate DESC
        ;
    ");
    while ($row = $dbQry->fetchArray(SQLITE3_ASSOC)) {
        array_push($dbRes["data"], $row);
    }

    $jsonStr = json_encode($dbRes, JSON_PRETTY_PRINT);
    echo $jsonStr;
}

//--------------------

function picDownload($paras){

    $db = $GLOBALS['db'];
    $picUrlPath = $GLOBALS['picUrlPath'];
    $picId = $paras[0];
    $dbQry = $db->query("
        SELECT filename FROM mash WHERE id = $picId;
    ");
    $row = $dbQry->fetchArray(SQLITE3_ASSOC);
    
    $fUrl = $picUrlPath . $row['filename'];
    echo $fUrl;
    header("Location: " . $fUrl);

    /*
    $fPath = $picSySPath . $row['filename'];
    echo $fPath;

    $mime = ($mime = getimagesize($fPath)) ? $mime['mime'] : $mime;
    $size = filesize($fPath);
    $fp   = fopen($fPath, "rb");
    if (!($mime && $size && $fp)) {
        // Error.
        return;
    }

    header("Content-type: " . $mime);
    header("Content-Length: " . $size);
    header("Content-Disposition: attachment; filename=" . $row['filename']);
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    fpassthru($fp);
    */
}

//--------------------

function picReset(){

    $db = $GLOBALS['db'];
    $picId = $_POST['picId'];
 
    $dbQry = $db->query("
        UPDATE mash set win = 0, loss = 0 WHERE id = $picId;
    ");
}

//--------------------

function picDelete(){

    $db = $GLOBALS['db'];

    $picId = $_POST['picId'];
    $picSysPath = $GLOBALS['picSysPath'];
    $dbQry = $db->query("
        SELECT filename FROM mash WHERE id = $picId;
    ");
    $row = $dbQry->fetchArray(SQLITE3_ASSOC);
    $fPath = $picSysPath . $row['filename'];

    unlink($fPath);

    $dbQry = $db->query("
        DELETE FROM mash WHERE id = $picId;
    ");
}

//--------------------

function picUpload(){

    chkAdm();

    $db = $GLOBALS['db'];
    $picSysPath = $GLOBALS['picSysPath'];
    
    $mimeAry = [];
    $mimeAry["image/jpeg"] = "jpg";
    $mimeAry["image/png"] = "png";

    print_r($_FILES['fileToUpload']);

    $FileCnt = count($_FILES['fileToUpload']['name']);
    for ($i = 0; $i < $FileCnt; $i++) {
        $dbQry = $db->query("
            INSERT INTO mash DEFAULT VALUES ;
        ");
        $dbQry = $db->query("
            SELECT last_insert_rowid() as lir;
        ");
        $row = $dbQry->fetchArray(SQLITE3_ASSOC);
        $lir = $row['lir'];
        
        $isMime = $mimeAry[$_FILES['fileToUpload']['type'][$i]];

        if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'][$i], $picSysPath.'image_'.$lir.'.'.$isMime)) {
            $dbQry = $db->query("
                UPDATE mash set filename = 'image_$lir.$isMime' WHERE id = $lir;
            ");
        } 
        else {
            $dbQry = $db->query("
                DELETE FROM mash WHERE id = $lir;
            ");
        }
    }    
}

//--------------------------------------------------------------------------

function mgmtAdmPwd(){

    chkAdm();

    $db = $GLOBALS['db'];

    $newAdmPwd = $_POST['newAdmPwd'];
    $newAdmHash = password_hash($newAdmPwd, PASSWORD_DEFAULT);

    $dbQry = $db->query("
        UPDATE mgmt set val = '$newAdmHash' WHERE key = 'adminpwdhash';
    ");

    echo '{"state": true}';
}

//-----------------------------

function mgmtResRating(){

    chkAdm();

    $db = $GLOBALS['db'];

    $dbQry = $db->query("
        UPDATE mash set win = 0, loss = 0;
    ");

    echo '{"state": true}';
}

//-----------------------------

function mgmtDelPics(){

    chkAdm();

    $db = $GLOBALS['db'];
    $picSysPath = $GLOBALS['picSysPath'];

    $dbQry = $db->query("
        DELETE FROM mash;
    ");

    $files = glob($picSysPath.'*'); 
    foreach($files as $file){
        if(is_file($file)){ unlink($file); }
    }

    echo '{"state": true}';
}

function mgmtResApp(){

    chkAdm();

    $dbDir = getcwd() . '\/db\/';
    $picSysPath = $GLOBALS['picSysPath'];
    
    $files = glob($picSysPath.'*'); 
    foreach($files as $file){
        if(is_file($file)){ unlink($file); }
    }
    rmdir($picSysPath);
    
    $files = glob($dbDir.'*'); 
    foreach($files as $file){
        if(is_file($file)){ unlink($file); }
    }
    rmdir($dbDir);

    echo '{"state": true}';
}

//--------------------------------------------------------------------------

function chkAdm(){

    if( $_SESSION['adm'] != true){
        echo "Function Unauthorized";
        header("HTTP/1.0 401 Unauthorized");
        return;
    }
}

//--------------------------------------------------------------------------

function logIn(){
    
    $db = $GLOBALS['db'];
    $AdmPwd = $_POST['AdmPwd'];
    
    $dbQry = $db->query("
        SELECT val FROM mgmt WHERE key = 'adminpwdhash';
    ");
    $row = $dbQry->fetchArray(SQLITE3_ASSOC);
    $AdmPwdHash = $row['val'];

    if (password_verify($AdmPwd, $AdmPwdHash)) {
        $_SESSION['adm'] = true;
    } 
    else {
        echo "Wrong Password";
        header("HTTP/1.0 303 See Other");
    }
}

//--------------------

function logOut(){
    $_SESSION['adm'] = false;
    session_unset();
    session_destroy();
}


//--------------------------------------------------------------------------

?>