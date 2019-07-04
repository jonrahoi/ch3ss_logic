var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knight.prototype.canMoveTo = function (position) {
        var distance = this.position.distanceFrom(position);
        var z = distance.z;
        var x = distance.x;
        var y = distance.y;
        if (z == 0) {
            if (x == 1 && y == 2) {
                return true;
            }
            else if (x == 2 && y == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (y == 0) {
            if (x == 1 && z == 2) {
                return true;
            }
            else if (x == 2 && z == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (x == 0) {
            if (y == 1 && z == 2) {
                return true;
            }
            else if (y == 2 && z == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    return Knight;
}(Piece));
//# sourceMappingURL=Knight.js.map