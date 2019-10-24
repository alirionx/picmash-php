<?php

//--------------------

function api_tableGet($varAry){
    echo"<pre>" . arrayToJSON($varAry, true);
    //echo"<pre>".print_r($varAry,true)."</pre>";
}

//--------------------

?>