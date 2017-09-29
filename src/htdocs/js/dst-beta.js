/* global _CONFIG */
'use strict';


var Timeseries = require('plots/Timeseries'),
    TimeseriesApp = require('plots/TimeseriesApp');


/**
 * Get a date based on age.
 *
 * @param age {Number}
 *        age in milliseconds, relative to 00:00 on current day.
 * @return {Date}
 *         Date object.
 */
var __getTime = function (age) {
  var now = new Date(),
      then;
  then = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ) - age);
  return then;
};


var app,
    configEl,
    el;

configEl = document.querySelector('#geomag-config');
el = document.querySelector('#geomag-plots');

app = TimeseriesApp({
  config: {
    endtime: __getTime(0),
    timemode: 'pastday',
    starttime: __getTime(86400000 * 3)
  },
  configEl: configEl,
  el: el,

  obsMetaUrl: _CONFIG.obsMetaUrl,
  obsDataUrl: _CONFIG.obsDataUrl
});

app.timeseriesManager.createTimeseries = function () {
  var elements,
      models,
      observatories;

  elements = app.elements;
  observatories = app.observatories;


  // create models
  models = [
    Timeseries({
      id: 'dst3',
      element: {
        'type': 'Feature',
        'id': 'MD3',
        'properties': {
          'abbreviation': 'Dst3-USGS',
          'name': '3 Station Dst',
          'units': 'nT'
        },
        'geometry': null
      },
      observatory: observatories.get('USGS'),
      times: [],
      values: []
    }),
    Timeseries({
      id: 'dst4',
      element: {
        'type': 'Feature',
        'id': 'MDT',
        'properties': {
          'abbreviation': 'Dst-1min',
          'name': '4 Station Dst',
          'units': 'nT'
        },
        'geometry': null
      },
      observatory: observatories.get('USGS'),
      times: [],
      values: []
    })
  ];

  ['HON', 'SJG', 'HER', 'KAK'].forEach(function (obs) {
    models.push(
      Timeseries({
        id: 'hon_dist',
        element: elements.get('MDT'),
        observatory: observatories.get(obs),
        times: [],
        values: []
      })
    );
  });

  // reset timeseries collection
  app.timeseries.reset(models);
};