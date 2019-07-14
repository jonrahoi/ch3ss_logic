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
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Queen.prototype.canMoveTo = function (position) {
        // Rook like move
        var distance = this.position.distanceFrom(position);
        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false; // same postion
        }
        else if (distance.y < 1 && distance.x < 1) {
            return true; // move only along Z
        }
        else if (distance.x < 1 && distance.z < 1) {
            return true; // move only along Y
        }
        else if (distance.y < 1 && distance.z < 1) {
            return true; // move only along X
        }
        // Bishop moves are basically diagonal moves in two dimensions
        else if (distance.z < 1) {
            if (distance.y == distance.x) {
                return true;
            }
            return false;
        }
        else if (distance.y < 1) {
            if (distance.z == distance.x) {
                return true;
            }
            return false;
        }
        else if (distance.x < 1) {
            if (distance.y == distance.z) {
                return true;
            }
            return false;
        }
        // unicorn moves
        else if (distance.z == distance.y && distance.y == distance.x) {
            return true;
        }
        return false;
    };
    return Queen;
}(Piece_1.Piece));
exports.Queen = Queen;
