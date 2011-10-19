<?php 
$address = array(
    'id' => 1,
    'addressNumber' => 1, 
    'street' => 'Alicenstr 6', 
);
$address2 = array(
    'id' => 2,
    'addressNumber' => 1, 
    'street' => 'Alicenstr 6', 
);
$r = array();
$r[] = $address;
$r[] = $address2;
echo json_encode($r);