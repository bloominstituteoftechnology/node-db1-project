module.exports = {
    intToBoolean,
    booleanToint,
    accountToBody,
  };

  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }

  function accountToBody(action) {
    return {
      ...action
    };
  }