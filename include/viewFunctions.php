<?php

//--------------------

function view_initHtml(){

    $initHTML = file_get_contents("content/init.html");
    echo $initHTML;
}

//--------------------

function view_appFrame(){

    $frameHTML = file_get_contents("content/app.html");
    //$frameHTML = str_replace('${baseURL}', $baseURL, $frameHTML);
    echo $frameHTML;
}

//--------------------



?>