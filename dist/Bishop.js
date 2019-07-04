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
var Bishop = (function (_super) {
    __extends(Bishop, _super);
    function Bishop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bishop.prototype.canMoveTo = function (position) {
        var distance = this.position.distanceFrom(position);
        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false;
        }
        else if (distance.z < 1) {
            if (distance.y == distance.x) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (distance.y < 1) {
            if (distance.z == distance.x) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (distance.x < 1) {
            if (distance.y == distance.z) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    return Bishop;
}(Piece));
//# sourceMappingURL=Bishop.js.map