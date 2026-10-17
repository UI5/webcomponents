export default {
  create: function () {
    return Promise.resolve({
      getProperty: function () {
        return null;
      },
      getKeys: function () {
        return [];
      }
    });
  }
};