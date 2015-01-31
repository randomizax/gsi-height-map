// ==UserScript==
// @id             iitc-plugin-gsi-relief@jonatkins
// @name           IITC plugin: GSI height map tiles as a layer
// @category       Layer
// @version        0.1.4.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Add GSI height map tiles as an optional layer.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.mapTileGSIHeightMap = function() {};

window.plugin.mapTileGSIHeightMap.addLayer = function() {

  //GSIHeightMap tiles - we shouldn't use these by default - https://wiki.openstreetmap.org/wiki/Tile_usage_policy
  // "Heavy use (e.g. distributing an app that uses tiles from openstreetmap.org) is forbidden without prior permission from the System Administrators"

  window.plugin.mapTileGSIHeightMap.layerGroup = new L.LayerGroup();

  osmAttribution = 'Map data © 国土地理院タイル （標高タイル）を加工して作成。海域部は海上保安庁海洋情報部の資料を使用して作成';
  var osmOpt = {attribution: osmAttribution, maxNativeZoom: 15, maxZoom: 21, opacity: 0.3};
  var osm = new L.TileLayer('http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png', osmOpt);

  osm.addTo(window.plugin.mapTileGSIHeightMap.layerGroup);
  window.addLayerGroup('GSI Height Map', window.plugin.mapTileGSIHeightMap.layerGroup, true);
};

var setup =  window.plugin.mapTileGSIHeightMap.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
