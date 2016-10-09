var test = {
  involution: function (base, exp) {
    var result = 1;
    for (var i = 0; i < Math.abs(exp); i++) {
      result *= base;
    }
    if (exp < 0) {
      result = 1/result;
    }
    return result;
  }
}

module.exports = test;