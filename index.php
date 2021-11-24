<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
  case '/' :
    require __DIR__ . '/views/index.php';
    break;
  case '' :
    require __DIR__ . '/views/index.php';
    break;
  default:
    require __DIR__ . '/views/index.php';
    break;
}
