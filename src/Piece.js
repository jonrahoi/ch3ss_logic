"use strict";
exports.__esModule = true;
var Position = /** @class */ (function () {
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
    return Position;
}());
exports.Position = Position;
var Piece = /** @class */ (function () {
    function Piece(
    // private readonly color: Color,
    color, x, y, z) {
        this.color = color;
        this.position = new Position(x, y, z);
    }
    Piece.prototype.moveTo = function (position) {
        this.position = position;
    };
    Piece.prototype.getPosition = function () {
        return this.position;
    };
    Piece.prototype.getPostionString = function () {
        var loc = "";
        // loc.concat(this.position.getX().toString());
        // loc.concat(this.position.getY().toString());
        // loc.concat(this.position.getZ().toString());
        // return loc;
        return this.position.getPostionString();
    };
    Piece.prototype.getColor = function () {
        if (this.color.localeCompare("White") == 0) {
            return "White";
        }
        return "Black";
    };
    Piece.prototype.getOppositeColor = function () {
        if (this.color.localeCompare("Black") == 0) {
            return "White";
        }
        return "Black";
    };
    Piece.prototype.isWhite = function () {
        if (this.color.localeCompare("White") == 0) {
            return true;
        }
        return false;
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
    Piece.prototype.sameColor = function (b) {
        return (this.color.localeCompare(b.getColor()) == 0);
    };
    return Piece;
}());
exports.Piece = Piece;
