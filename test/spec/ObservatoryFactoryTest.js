/* global before, chai, describe, it */
'use strict';

var expect = chai.expect,
    ObservatoryFactory = require('plots/ObservatoryFactory');

describe('Observatory Factory Test', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(ObservatoryFactory).to.not.equal(null);
    });
  });

  describe('test parse', function () {
    var observatories;

    before(function (done) {
      var factory = ObservatoryFactory({
        url: 'observatories.json'
      });

      factory.getObservatories({
        callback: function (data) {
          observatories = data;
          done();
        }
      });
    });

    it('parses observatory id correctly', function () {
      expect(observatories[0].id).to.equal('BDT');
    });

    it('parses observatory name correctly', function () {
      expect(observatories[0].get('name')).to.equal('Boulder Test');
    });

    it('parses observatory latitude correctly', function () {
      expect(observatories[0].get('latitude')).to.equal(40.137);
    });

    it('parses observatory longitude correctly', function () {
      expect(observatories[0].get('longitude')).to.equal(254.764);
    });
  });
});
