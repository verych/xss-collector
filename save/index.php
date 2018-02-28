<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: x-requested-with, authorization, content-type, Syncplicity-Storage-Cookie, Syncplicity-Storage-Password, Syncplicity-Link-Password, Syncplicity-Preview-Document-Id');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Expose-Headers: Accusoft-Data-Encrypted, Accusoft-Data-SK');
header('Cache-Control: no-store');
header('Content-Type: text/plain; charset=utf-8');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $data = json_decode(file_get_contents('php://input'), true);
    //print_r($data);

    $chars = array(":", "/");
    $site = str_replace($chars, '_', $data['url']);
    $date = new DateTime();
    $dateStr = $date->format('Y_m_d_H_i_s');
    
    $dir = "./data/$site/$dateStr";

    if (!file_exists("data")){
            mkdir("data");
    }
    if (!file_exists("./data/$site")){
            mkdir("./data/$site");
    }
    if (!file_exists($dir)){
            mkdir($dir);
    }

    $req_dump = print_r($data, TRUE);
    $fp = fopen("$dir/request.txt", 'a');
    fwrite($fp, $req_dump);
    fclose($fp);
    echo "$dir/request.txt";
}
?>