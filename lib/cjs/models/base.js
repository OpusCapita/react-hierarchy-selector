"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataSourceProvider = new WeakMap();

var BaseModel = function () {
  function BaseModel(dataProvider) {
    _classCallCheck(this, BaseModel);

    dataSourceProvider.set(this, dataProvider);
  }

  _createClass(BaseModel, [{
    key: "dataSourceProvider",
    get: function get() {
      return dataSourceProvider.get(this);
    }
  }]);

  return BaseModel;
}();

exports.default = BaseModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvYmFzZS5qcyJdLCJuYW1lcyI6WyJkYXRhU291cmNlUHJvdmlkZXIiLCJXZWFrTWFwIiwiQmFzZU1vZGVsIiwiZGF0YVByb3ZpZGVyIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLHFCQUFxQixJQUFJQyxPQUFKLEVBQTNCOztJQUdxQkMsUztBQUNuQixxQkFBWUMsWUFBWixFQUEwQjtBQUFBOztBQUN4QkgsdUJBQW1CSSxHQUFuQixDQUF1QixJQUF2QixFQUE2QkQsWUFBN0I7QUFDRDs7Ozt3QkFFd0I7QUFDdkIsYUFBT0gsbUJBQW1CSyxHQUFuQixDQUF1QixJQUF2QixDQUFQO0FBQ0Q7Ozs7OztrQkFQa0JILFMiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhdGFTb3VyY2VQcm92aWRlciA9IG5ldyBXZWFrTWFwKCk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZU1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YVByb3ZpZGVyKSB7XG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldCh0aGlzLCBkYXRhUHJvdmlkZXIpO1xuICB9XG5cbiAgZ2V0IGRhdGFTb3VyY2VQcm92aWRlcigpIHtcbiAgICByZXR1cm4gZGF0YVNvdXJjZVByb3ZpZGVyLmdldCh0aGlzKTtcbiAgfVxufVxuIl19