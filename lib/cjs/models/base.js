"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dataSourceProvider = new WeakMap();

var BaseModel =
/*#__PURE__*/
function () {
  function BaseModel(dataProvider) {
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

exports["default"] = BaseModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvYmFzZS5qcyJdLCJuYW1lcyI6WyJkYXRhU291cmNlUHJvdmlkZXIiLCJXZWFrTWFwIiwiQmFzZU1vZGVsIiwiZGF0YVByb3ZpZGVyIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFNQSxrQkFBa0IsR0FBRyxJQUFJQyxPQUFKLEVBQTNCOztJQUdxQkMsUzs7O0FBQ25CLHFCQUFZQyxZQUFaLEVBQTBCO0FBQ3hCSCxJQUFBQSxrQkFBa0IsQ0FBQ0ksR0FBbkIsQ0FBdUIsSUFBdkIsRUFBNkJELFlBQTdCO0FBQ0Q7Ozs7d0JBRXdCO0FBQ3ZCLGFBQU9ILGtCQUFrQixDQUFDSyxHQUFuQixDQUF1QixJQUF2QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRhU291cmNlUHJvdmlkZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGFQcm92aWRlcikge1xuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXQodGhpcywgZGF0YVByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldCBkYXRhU291cmNlUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIGRhdGFTb3VyY2VQcm92aWRlci5nZXQodGhpcyk7XG4gIH1cbn1cbiJdfQ==