"use strict";
exports.__esModule = true;
var Position = (function () {
    function Position(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Position.prototype.distanceFrom = function (position) {
        return {
            z: Math.abs(position.z - this.z),
            x: Math.abs(position.x - this.x),
            y: Math.abs(position.y = this.y)
        };
    };
    Position.prototype.getX = function () {
        return this.x;
    };
    Position.prototype.getY = function () {
        return this.y;
    };
    Position.prototype.getZ = function () {
        return this.z;
    };
    Position.prototype.setX = function (x) {
        this.x = x;
    };
    Position.prototype.setY = function (y) {
        this.y = y;
    };
    Position.prototype.setZ = function (z) {
        this.z = z;
    };
    Position.prototype.move = function () { };
    return Position;
}());
exports.Position = Position;
var Piece = (function () {
    function Piece(color, x, y, z) {
        this.color = color;
        this.position = new Position(z, x, y);
    }
    Piece.prototype.moveTo = function (position) {
        this.position = position;
    };
    Piece.prototype.getPosition = function () {
        return this.position;
    };
    Piece.prototype.getPostionString = function () {
        var loc = "";
        loc.concat(this.position.getX().toString());
        loc.concat(this.position.getY().toString());
        loc.concat(this.position.getZ().toString());
        return loc;
    };
    Piece.prototype.getColor = function () {
        if (this.color.localeCompare("White")) {
            return "White";
        }
        return "Black";
    };
    Piece.prototype.getName = function () {
        return this.constructor.name;
    };
    Piece.prototype.isAtPosition = function (position) {
        position.getX;
        if (position.getX == this.position.getX &&
            position.getY == this.position.getY &&
            position.getZ == this.position.getZ) {
            return true;
        }
        return false;
    };
    Piece.prototype.isBlockingMove = function (a, b) {
        return false;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map