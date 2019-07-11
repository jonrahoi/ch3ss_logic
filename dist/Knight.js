"use strict";
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
exports.__esModule = true;
var Piece_1 = require("./Piece");
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knight.prototype.canMoveTo = function (position) {
        var distance = this.position.distanceFrom(position);
        var distances = [distance.x, distance.y, distance.z];
        var sum;
        var countOnes = 0;
        for (var i = 0; i < 3; i++) {
            sum += distances[i];
            if (distances[i] > 3) {
                return false;
            }
            if (distances[i] == 1) {
                countOnes++;
                if (countOnes > 1) {
                    return false;
                }
            }
        }
        if (sum > 3) {
            return false;
        }
        return true;
    };
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
//# sourceMappingURL=Knight.js.map