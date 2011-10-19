<?php 
$customer = array(
    'id' => 1,
    'customerNumber' => 1, 
    'email' => 'aa@bb.cc', 
    'dob'=>'12/12/12', 
    'firstName' => 'Jack', 
    'lastName' => 'Sparrow'
);
$r = array();
$r[] = $customer;
echo json_encode($r);

