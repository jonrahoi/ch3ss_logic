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
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rook.prototype.moveShapeCorrect = function (position) {
        var distance = this.position.distanceFrom(position);
        if (distance.y == distance.x && distance.x == distance.z) {
            return false;
        }
        else if (distance.y == 0 && distance.x == 0) {
            return true;
        }
        else if (distance.x == 0 && distance.z == 0) {
            return true;
        }
        else if (distance.y == 0 && distance.z == 0) {
            return true;
        }
        return false;
    };
    Rook.prototype.makeCopy = function () {
        return new Rook(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    };
    return Rook;
}(Piece_1.Piece));
exports.Rook = Rook;
//# sourceMappingURL=Rook.js.map