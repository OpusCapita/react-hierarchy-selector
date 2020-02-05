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

export { BaseModel as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvYmFzZS5qcyJdLCJuYW1lcyI6WyJkYXRhU291cmNlUHJvdmlkZXIiLCJXZWFrTWFwIiwiQmFzZU1vZGVsIiwiZGF0YVByb3ZpZGVyIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsa0JBQWtCLEdBQUcsSUFBSUMsT0FBSixFQUEzQjs7SUFHcUJDLFM7OztBQUNuQixxQkFBWUMsWUFBWixFQUEwQjtBQUN4QkgsSUFBQUEsa0JBQWtCLENBQUNJLEdBQW5CLENBQXVCLElBQXZCLEVBQTZCRCxZQUE3QjtBQUNEOzs7O3dCQUV3QjtBQUN2QixhQUFPSCxrQkFBa0IsQ0FBQ0ssR0FBbkIsQ0FBdUIsSUFBdkIsQ0FBUDtBQUNEOzs7Ozs7U0FQa0JILFMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRhU291cmNlUHJvdmlkZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGFQcm92aWRlcikge1xuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXQodGhpcywgZGF0YVByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldCBkYXRhU291cmNlUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIGRhdGFTb3VyY2VQcm92aWRlci5nZXQodGhpcyk7XG4gIH1cbn1cbiJdfQ==