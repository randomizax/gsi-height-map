// ==UserScript==
// @id             iitc-plugin-gsi-relief@jonatkins
// @name           IITC plugin: GSI height map tiles as a layer
// @category       Layer
// @version        2.0.0.20250420.52310
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://randomizax.github.io/gsi-height-map/gsi-height-map.meta.js
// @downloadURL    https://randomizax.github.io/gsi-height-map/gsi-height-map.user.js
// @description    [randomizax-2025-04-20-052310] Add GSI height map tiles as an optional layer.
// @include        https://intel.ingress.com/*
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
// plugin_info.buildName = 'randomizax';
// plugin_info.dateTimeVersion = '20250420.52310';
// plugin_info.pluginId = 'gsi-height-map';
//END PLUGIN AUTHORS NOTE



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


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


