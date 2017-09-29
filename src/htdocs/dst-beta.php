<?php
if (!isset($TEMPLATE)) {
  include_once '../conf/config.inc.php';

  $TITLE = 'Disturbance Storm Time (Dst) Index - Beta';
  $NAVIGATION = true;

  $HEAD = '
    <link rel="stylesheet" href="css/index.css"/>
    <style>
      .timeseries-elements,
      .timeseries-observatories {
        display: none;
      }

      .meta-view {
        width: 5em;
      }

      .error-view.show,
      .trace-view {
        margin-left: 5em;
      }
    </style>
  ';
  $FOOT = '
    <script>
      var _CONFIG = {
        obsMetaUrl: \'' . $OBS_META_URL . '\',
        obsDataUrl: \'' . $OBS_DATA_URL . '\'
      };
    </script>
    <script src="js/dst-beta.js"></script>
  ';

  include_once 'template.inc.php';
}
?>

<div id="geomag-plots">
  <noscript>
    <p>This application requires javascript.</p>
  </noscript>
</div>
