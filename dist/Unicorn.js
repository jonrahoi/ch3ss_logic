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
var Unicorn = (function (_super) {
    __extends(Unicorn, _super);
    function Unicorn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Unicorn.prototype.moveShapeCorrect = function (position) {
        var distance = this.position.distanceFrom(position);
        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false;
        }
        else if (distance.z == distance.y && distance.y == distance.x) {
            return true;
        }
        return false;
    };
    Unicorn.prototype.makeCopy = function () {
        return new Unicorn(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    };
    return Unicorn;
}(Piece_1.Piece));
exports.Unicorn = Unicorn;
//# sourceMappingURL=Unicorn.js.map