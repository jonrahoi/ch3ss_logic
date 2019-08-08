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
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pawn.prototype.moveShapeCorrect = function (position) {
        var distance = this.position.distanceFrom(position);
        if (distance.x != 0) {
            return false;
        }
        if (distance.y == 0 && distance.z == 1) {
            return true;
        }
        if (distance.y == 1 && distance.z == 0) {
            return true;
        }
        return false;
    };
    Pawn.prototype.makeCopy = function () {
        return new Pawn(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map