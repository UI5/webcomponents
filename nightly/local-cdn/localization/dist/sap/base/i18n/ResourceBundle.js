var oEmptyBundle = {
  getText: function () {
    return "";
  },
  hasText: function () {
    return false;
  },
  getProperty: function () {
    return "";
  }
};
var ResourceBundle = {
  create: function () {
    return Promise.resolve(oEmptyBundle);
  },
  _getUrl: function () {
    return "";
  }
};
export default ResourceBundle;