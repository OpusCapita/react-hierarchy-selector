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

export { BaseModel as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvYmFzZS5qcyJdLCJuYW1lcyI6WyJkYXRhU291cmNlUHJvdmlkZXIiLCJXZWFrTWFwIiwiQmFzZU1vZGVsIiwiZGF0YVByb3ZpZGVyIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEscUJBQXFCLElBQUlDLE9BQUosRUFBM0I7O0lBR3FCQyxTO0FBQ25CLHFCQUFZQyxZQUFaLEVBQTBCO0FBQUE7O0FBQ3hCSCx1QkFBbUJJLEdBQW5CLENBQXVCLElBQXZCLEVBQTZCRCxZQUE3QjtBQUNEOzs7O3dCQUV3QjtBQUN2QixhQUFPSCxtQkFBbUJLLEdBQW5CLENBQXVCLElBQXZCLENBQVA7QUFDRDs7Ozs7O1NBUGtCSCxTIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRhU291cmNlUHJvdmlkZXIgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VNb2RlbCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YVByb3ZpZGVyKSB7XHJcbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0KHRoaXMsIGRhdGFQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0YVNvdXJjZVByb3ZpZGVyKCkge1xyXG4gICAgcmV0dXJuIGRhdGFTb3VyY2VQcm92aWRlci5nZXQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==