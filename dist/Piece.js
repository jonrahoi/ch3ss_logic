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
    Position.prototype.move = function () { };
    return Position;
}());
var Piece = (function () {
    function Piece(color, x, y, z) {
        this.color = color;
        this.position = new Position(z, x, y);
    }
    Piece.prototype.moveTo = function (position) {
        this.position = position;
    };
    return Piece;
}());
//# sourceMappingURL=Piece.js.map