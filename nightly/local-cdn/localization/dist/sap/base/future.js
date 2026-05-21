export default {
  active: false,
  fatalThrows: function () {},
  errorThrows: function () {},
  warningThrows: function () {},
  assertThrows: function () {},
  warningRejects: function (fnResolve) {
    if (fnResolve) {
      fnResolve();
    }
  }
};