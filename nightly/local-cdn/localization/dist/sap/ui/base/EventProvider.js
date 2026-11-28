function EventProvider() {}
EventProvider.prototype.attachEvent = function () {
  return this;
};
EventProvider.prototype.attachEventOnce = function () {
  return this;
};
EventProvider.prototype.detachEvent = function () {
  return this;
};
EventProvider.prototype.fireEvent = function () {
  return this;
};
EventProvider.prototype.hasListeners = function () {
  return false;
};
EventProvider.prototype.getEventingParent = function () {
  return null;
};
EventProvider.prototype.destroy = function () {};
export default EventProvider;