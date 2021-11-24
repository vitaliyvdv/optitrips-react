<?php
    ob_start(); //inline content

    // template root
    $rooth = $_SERVER['DOCUMENT_ROOT'];

    // css files array
    $css_array = glob($rooth.'/dist/css/*');

    // scripts array
    $scripts_array = glob($rooth.'/dist/js/*');
    $scripts_core_array = glob($rooth.'/dist/js/core/*');
    //$scripts_webworkers_array = glob($rooth.'/dist/js/webworkers/*');
    //$scripts_array = glob($rooth.'/dist/js/[^(core|vendors)]*');

    // fonts array
    $fonts_array = glob($rooth.'/dist/fonts/roboto-regular-webfont.*.woff2');
    //$fonts_array = glob($rooth.'/dist/fonts/*.woff2');
?>

<!DOCTYPE html>
<html>
<head itemtype="http://schema.org/WebSite" itemscope>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta http-equiv="x-dns-prefetch-control" content="on" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//www.google-analytics.com" />
  <link rel="dns-prefetch" href="//googletagmanager.com" />
  <link rel="dns-prefetch" href="//ajax.googleapis.com" />
  <link rel="dns-prefetch" href="//youtube.com" />
  <link rel="dns-prefetch" href="//img.youtube.com" />
  <link rel="dns-prefetch" href="//google.com" />
  <link rel="dns-prefetch" href="//facebook.com" />
  <link rel="dns-prefetch" href="//connect.facebook.net" />
  <link rel="dns-prefetch" href="//api.ipify.org" />
  <link rel="dns-prefetch" href="//apility-io-ip-geolocation-v1.p.rapidapi.com" />
  <link rel="dns-prefetch" href="//skyscanner-skyscanner-flight-search-v1.p.rapidapi.com" />

  <link rel="preconnect" href="//fonts.googleapis.com" />
  <link rel="preconnect" href="//www.google-analytics.com" />
  <link rel="preconnect" href="//youtube.com" />
  <link rel="preconnect" href="//facebook.com" />
  <link rel="preconnect" href="//static.xx.fbcdn.net" />
  <link rel="preconnect" href="//api.ipify.org" />
  <link rel="preconnect" href="//apility-io-ip-geolocation-v1.p.rapidapi.com" />
  <link rel="preconnect" href="//skyscanner-skyscanner-flight-search-v1.p.rapidapi.com" />

  <title>Main</title>
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <link rel="canonical" href="" />
  <meta name="google-site-verification" content="3rndAJuv1ikhgm5JqqmICcl3gHU6yz8xsENpc19u-zs" />
  <style>
    body:after {
      display: block;
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      z-index: 1000;
    }
  </style>
  <?php
    foreach($css_array as $file) {
      if(is_file($file)){
        echo '<link rel="preload" as="style" href="/dist/css/'.basename($file).'">' . "\n";
      }
    };

    foreach($scripts_core_array as $file) {
      if(is_file($file)){
        echo '<link rel="preload" as="script" href="/dist/js/core/'.basename($file).'">' . "\n";
      }
    };

    foreach($scripts_array as $file) {
      if(is_file($file)){
        echo '<link rel="preload" as="script" href="/dist/js/'.basename($file).'">' . "\n";
      }
    };

    /*foreach($scripts_webworkers_array as $file) {
      if(is_file($file)){
        echo '<link rel="preload" as="script" href="/dist/js/webworkers/'.basename($file).'">' . "\n";
      }
    };*/

    foreach($fonts_array as $file){
      if(is_file($file)){
        echo '<link rel="preload" as="font" href="/dist/fonts/'.basename($file).'" crossorigin="anonymous">' . "\n";
      }
    };
  ?>
  <?php
    foreach($css_array as $file) {
      echo '<link media="none" onload="if(media!=\'all\') media=\'all\'" type="text/css" rel="stylesheet" href="/dist/css/'.basename($file).'">' . "\n";
    };
  ?>

  <link rel="shortcut icon" href="/dist/app/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/dist/app/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/dist/app/favicon-32x32.png">
  <link rel="manifest" href="/dist/app/manifest.json">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#ffffff">
  <meta name="application-name" content="OptiTrips App">
  <link rel="apple-touch-icon" sizes="57x57" href="/dist/app/apple-touch-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/dist/app/apple-touch-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/dist/app/apple-touch-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/dist/app/apple-touch-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/dist/app/apple-touch-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/dist/app/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/dist/app/apple-touch-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/dist/app/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="167x167" href="/dist/app/apple-touch-icon-167x167.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/dist/app/apple-touch-icon-180x180.png">
  <link rel="apple-touch-icon" sizes="1024x1024" href="/dist/app/apple-touch-icon-1024x1024.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="OptiTrips App">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/dist/app/mstile-144x144.png">
  <meta name="msapplication-config" content="/dist/app/browserconfig.xml">
</head>

<body class="no-transition h-100" itemscope itemtype="http://schema.org/WebPage">
  <noscript>To run this application, JavaScript is required to be enabled.</noscript>
  <div id="app" class="h-100"></div>
  <?php
    foreach($scripts_core_array as $file) {
      if(is_file($file)){
        echo '<script type="text/javascript" src="/dist/js/core/'.basename($file).'" defer></script>' . "\n";
      }
    };
    foreach($scripts_array as $file) {
      if(is_file($file)){
        echo '<script type="text/javascript" src="/dist/js/'.basename($file).'" defer></script>' . "\n";
      }
    };
  ?>
</body>

</html>

<?php
// inline content
function sanitize_output($buffer)
  {
    $search = array('/\>[^\S ]+/s', '/[^\S ]+\</s', '/(\s)+/s', '(\r\n|\n|\r)');
    $replace = array('>', '<','\\1', '');

    $buffer = preg_replace($search, $replace, $buffer);
    return $buffer;
  };

  $buffer = ob_get_contents();
  ob_end_clean();
  echo sanitize_output($buffer);
  unset($buffer);
?>
