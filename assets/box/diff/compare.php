<?php
    $obj = json_decode($_POST["data"]);

    $original = explode("\n", $obj->original);
    $modified = explode("\n", $obj->modified);
    $response = '';
    $n = 0;
    $s = 0;

    if (count($original) > count($modified)) {
        $n = count($original);
        $s = count($modified);
    } else {
        $n = count($modified);
        $s = count($original);
    }

    for ($i = 0; $i < $n; $i++) {
        if ($i < $s) {
            if (strcmp($original[$i], $modified[$i]) ) {
                $response = $response . ($i + 1) . "\t | " . $original[$i] . " >> " . $modified[$i];
            } else {
                $response = $response . ($i + 1) . "\t | " . $original[$i];
            }
        } else {
            if (count($original) > count($modified)) {
                $response = $response . ($i + 1) . "\t | " . '[Removed] ' . $original[$i];
            } else {
                $response = $response . ($i + 1) . "\t | " . '[Added] ' . $modified[$i];
            }
        }
        
        $response = $response."\n";
    }

    echo $response;
?>