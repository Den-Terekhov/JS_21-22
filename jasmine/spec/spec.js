var test = require('../js/test.js')

describe("involution test", function() {
  it("test 1", function() {
    var result;

    result = test.involution(5, 3);

    expect(result).toBe(125);
  });

  it("test 2", function() {
    var result;

    result = test.involution(5, -3);

    expect(result).toBe(0.008);
  });

  it("test 3", function() {
    var result;

    result = test.involution(5, 0);

    expect(result).toBe(1);
  });
});
