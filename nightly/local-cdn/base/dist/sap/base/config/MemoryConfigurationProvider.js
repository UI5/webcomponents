/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
import uid from "../util/uid.js";
var MemoryConfigurationProvider = function () {
  this.oConfig = Object.create(null);
  this.id = uid();
};
MemoryConfigurationProvider.prototype.getId = function () {
  return this.id;
};
MemoryConfigurationProvider.prototype.get = function (sName) {
  return this.oConfig[sName];
};
MemoryConfigurationProvider.prototype.set = function (sName, vValue) {
  this.oConfig[sName] = vValue;
};
export default MemoryConfigurationProvider;