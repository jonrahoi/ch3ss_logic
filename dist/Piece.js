"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var Position = (function () {
    function Position(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Position.prototype.distanceFrom = function (position) {
        return {
            x: Math.abs(position.x - this.x),
            y: Math.abs(position.y - this.y),
            z: Math.abs(position.z - this.z)
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
    Position.prototype.getPostionString = function () {
        return this.getX().toString() + this.getY().toString() + this.getZ().toString();
    };
    Position.prototype.samePosition = function (a) {
        if (a.getX() == this.x && a.getY() == this.getY() && a.getZ() == this.getZ()) {
            return true;
        }
        return false;
    };
    Position.prototype.getCopy = function () {
        return new Position(this.getX(), this.getY(), this.getZ());
    };
    return Position;
}());
exports.Position = Position;
var Piece = (function () {
    function Piece(color, x, y, z) {
        this.color = color;
        this.position = new Position(x, y, z);
    }
    Piece.prototype.setPosition = function (position) {
        this.position = position;
    };
    Piece.prototype.getPosition = function () {
        return this.position.getCopy();
    };
    Piece.prototype.getPostionString = function () {
        var loc = "";
        return this.position.getPostionString();
    };
    Piece.prototype.getColor = function () {
        if (this.color.localeCompare(constants_1.WHITE) == 0) {
            return constants_1.WHITE;
        }
        return constants_1.BLACK;
    };
    Piece.prototype.getOppositeColor = function () {
        if (this.color.localeCompare(constants_1.BLACK) == 0) {
            return constants_1.WHITE;
        }
        return constants_1.WHITE;
    };
    Piece.prototype.isColor = function (color) {
        return this.color.localeCompare(color) == 0;
    };
    Piece.prototype.isAtPosition = function (position) {
        if (position == undefined) {
            return false;
        }
        if (position.getX() == this.position.getX() &&
            position.getY() == this.position.getY() &&
            position.getZ() == this.position.getZ()) {
            return true;
        }
        return false;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map