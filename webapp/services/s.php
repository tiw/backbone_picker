<?php 
$customer = array(
    'id' => 1,
    'customerNumber' => 1, 
    'email' => 'aa@bb.cc', 
    'dob'=>'12/12/12', 
    'firstName' => 'Jack', 
    'lastName' => 'Sparrow'
);
$customer2 = array(
    'id' => 2,
    'customerNumber' => 1, 
    'email' => 'aa@bb.cc', 
    'dob'=>'12/12/12', 
    'firstName' => 'Tim', 
    'lastName' => 'Cook'
);
$r = array();
$r[] = $customer;
$r[] = $customer2;
echo json_encode($r);

