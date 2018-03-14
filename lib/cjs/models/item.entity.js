"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemEntity = function ItemEntity(data) {
  _classCallCheck(this, ItemEntity);

  this.id = data && data.id ? data.id : null;
  this.name = data && data.name ? data.name : null;
  this.children = data && Array.isArray(data.children) ? data.children : [];
};

exports.default = ItemEntity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaXRlbS5lbnRpdHkuanMiXSwibmFtZXMiOlsiSXRlbUVudGl0eSIsImRhdGEiLCJpZCIsIm5hbWUiLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQXFCQSxVLEdBQ25CLG9CQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLE9BQUtDLEVBQUwsR0FBVUQsUUFBUUEsS0FBS0MsRUFBYixHQUFrQkQsS0FBS0MsRUFBdkIsR0FBNEIsSUFBdEM7QUFDQSxPQUFLQyxJQUFMLEdBQVlGLFFBQVFBLEtBQUtFLElBQWIsR0FBb0JGLEtBQUtFLElBQXpCLEdBQWdDLElBQTVDO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkgsUUFBUUksTUFBTUMsT0FBTixDQUFjTCxLQUFLRyxRQUFuQixDQUFSLEdBQXVDSCxLQUFLRyxRQUE1QyxHQUF1RCxFQUF2RTtBQUNELEM7O2tCQUxrQkosVSIsImZpbGUiOiJpdGVtLmVudGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1FbnRpdHkge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5pZCA9IGRhdGEgJiYgZGF0YS5pZCA/IGRhdGEuaWQgOiBudWxsO1xuICAgIHRoaXMubmFtZSA9IGRhdGEgJiYgZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogbnVsbDtcbiAgICB0aGlzLmNoaWxkcmVuID0gZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuY2hpbGRyZW4pID8gZGF0YS5jaGlsZHJlbiA6IFtdO1xuICB9XG59XG4iXX0=