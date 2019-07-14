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
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knight.prototype.canMoveTo = function (position) {
        var distance = this.position.distanceFrom(position);
        var distances = [];
        distances.push(distance.x);
        distances.push(distance.y);
        distances.push(distance.z);
        // some combination of 0,1,2
        if ((distance.x + distance.y + distance.z) != 3) {
            return false;
        }
        if (distance.x > 2 || distance.y > 2 || distance.z > 2) {
            return false;
        }
        // tests if distance is 1,1,1
        if (distance.x == distance.y) {
            return false;
        }
        return true;
    };
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
