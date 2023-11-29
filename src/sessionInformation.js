// const sessionInformation = {
//   userId: 2,
// };

var sessionInformation = (function () {
  var id = null;

  var getUserId = function () {
    return id; // Or pull this from cookie/localStorage
  };

  var setUserId = function (newId) {
    id = newId;
    // Also set this in cookie/localStorage
  };

  return {
    getUserId: getUserId,
    setUserId: setUserId,
  };
})();

export default sessionInformation;
