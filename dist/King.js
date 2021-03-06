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
var King = (function (_super) {
    __extends(King, _super);
    function King() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    King.prototype.moveShapeCorrect = function (position) {
        var distance = this.position.distanceFrom(position);
        if (distance.y == 0 && distance.x == 0 && distance.z == 0) {
            return false;
        }
        return distance.y < 2 && distance.x < 2 && distance.z < 2;
    };
    King.prototype.makeCopy = function () {
        return new King(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    };
    return King;
}(Piece_1.Piece));
exports.King = King;
//# sourceMappingURL=King.js.map