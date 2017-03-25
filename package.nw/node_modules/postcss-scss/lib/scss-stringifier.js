'use strict';

exports.__esModule = true;

var _stringifier = require('postcss/lib/stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssStringifier = function (_Stringifier) {
    _inherits(ScssStringifier, _Stringifier);

    function ScssStringifier() {
        _classCallCheck(this, ScssStringifier);

        return _possibleConstructorReturn(this, _Stringifier.apply(this, arguments));
    }

    ScssStringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');

        if (node.raws.inline) {
            this.builder('//' + left + node.text + right, node);
        } else {
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    };

    ScssStringifier.prototype.decl = function decl(node, semicolon) {
        if (!node.isNested) {
            _Stringifier.prototype.decl.call(this, node, semicolon);
        } else {

            var between = this.raw(node, 'between', 'colon');
            var string = node.prop + between + this.rawValue(node, 'value');
            if (node.important) {
                string += node.raws.important || ' !important';
            }

            this.builder(string + '{', node, 'start');

            var after = void 0;
            if (node.nodes && node.nodes.length) {
                this.body(node);
                after = this.raw(node, 'after');
            } else {
                after = this.raw(node, 'after', 'emptyBody');
            }
            if (after) this.builder(after);
            this.builder('}', node, 'end');
        }
    };

    return ScssStringifier;
}(_stringifier2.default);

exports.default = ScssStringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3Mtc3RyaW5naWZpZXIuZXM2Il0sIm5hbWVzIjpbIlNjc3NTdHJpbmdpZmllciIsImNvbW1lbnQiLCJub2RlIiwibGVmdCIsInJhdyIsInJpZ2h0IiwicmF3cyIsImlubGluZSIsImJ1aWxkZXIiLCJ0ZXh0IiwiZGVjbCIsInNlbWljb2xvbiIsImlzTmVzdGVkIiwiYmV0d2VlbiIsInN0cmluZyIsInByb3AiLCJyYXdWYWx1ZSIsImltcG9ydGFudCIsImFmdGVyIiwibm9kZXMiLCJsZW5ndGgiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7OzhCQUVqQkMsTyxvQkFBUUMsSSxFQUFNO0FBQ1YsWUFBSUMsT0FBUSxLQUFLQyxHQUFMLENBQVNGLElBQVQsRUFBZSxNQUFmLEVBQXdCLGFBQXhCLENBQVo7QUFDQSxZQUFJRyxRQUFRLEtBQUtELEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsY0FBeEIsQ0FBWjs7QUFFQSxZQUFLQSxLQUFLSSxJQUFMLENBQVVDLE1BQWYsRUFBd0I7QUFDcEIsaUJBQUtDLE9BQUwsQ0FBYSxPQUFPTCxJQUFQLEdBQWNELEtBQUtPLElBQW5CLEdBQTBCSixLQUF2QyxFQUE4Q0gsSUFBOUM7QUFDSCxTQUZELE1BRU87QUFDSCxpQkFBS00sT0FBTCxDQUFhLE9BQU9MLElBQVAsR0FBY0QsS0FBS08sSUFBbkIsR0FBMEJKLEtBQTFCLEdBQWtDLElBQS9DLEVBQXFESCxJQUFyRDtBQUNIO0FBQ0osSzs7OEJBRURRLEksaUJBQUtSLEksRUFBTVMsUyxFQUFXO0FBQ2xCLFlBQUssQ0FBQ1QsS0FBS1UsUUFBWCxFQUFzQjtBQUNsQixtQ0FBTUYsSUFBTixZQUFXUixJQUFYLEVBQWlCUyxTQUFqQjtBQUNILFNBRkQsTUFFTzs7QUFFSCxnQkFBSUUsVUFBVSxLQUFLVCxHQUFMLENBQVNGLElBQVQsRUFBZSxTQUFmLEVBQTBCLE9BQTFCLENBQWQ7QUFDQSxnQkFBSVksU0FBVVosS0FBS2EsSUFBTCxHQUFZRixPQUFaLEdBQXNCLEtBQUtHLFFBQUwsQ0FBY2QsSUFBZCxFQUFvQixPQUFwQixDQUFwQztBQUNBLGdCQUFLQSxLQUFLZSxTQUFWLEVBQXNCO0FBQ2xCSCwwQkFBVVosS0FBS0ksSUFBTCxDQUFVVyxTQUFWLElBQXVCLGFBQWpDO0FBQ0g7O0FBRUQsaUJBQUtULE9BQUwsQ0FBYU0sU0FBUyxHQUF0QixFQUEyQlosSUFBM0IsRUFBaUMsT0FBakM7O0FBRUEsZ0JBQUlnQixjQUFKO0FBQ0EsZ0JBQUtoQixLQUFLaUIsS0FBTCxJQUFjakIsS0FBS2lCLEtBQUwsQ0FBV0MsTUFBOUIsRUFBdUM7QUFDbkMscUJBQUtDLElBQUwsQ0FBVW5CLElBQVY7QUFDQWdCLHdCQUFRLEtBQUtkLEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsQ0FBUjtBQUNILGFBSEQsTUFHTztBQUNIZ0Isd0JBQVEsS0FBS2QsR0FBTCxDQUFTRixJQUFULEVBQWUsT0FBZixFQUF3QixXQUF4QixDQUFSO0FBQ0g7QUFDRCxnQkFBS2dCLEtBQUwsRUFBYSxLQUFLVixPQUFMLENBQWFVLEtBQWI7QUFDYixpQkFBS1YsT0FBTCxDQUFhLEdBQWIsRUFBa0JOLElBQWxCLEVBQXdCLEtBQXhCO0FBQ0g7QUFDSixLOzs7OztrQkFwQ2dCRixlIiwiZmlsZSI6InNjc3Mtc3RyaW5naWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RyaW5naWZpZXIgZnJvbSAncG9zdGNzcy9saWIvc3RyaW5naWZpZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3NzU3RyaW5naWZpZXIgZXh0ZW5kcyBTdHJpbmdpZmllciB7XG5cbiAgICBjb21tZW50KG5vZGUpIHtcbiAgICAgICAgbGV0IGxlZnQgID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAgJ2NvbW1lbnRMZWZ0Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKTtcblxuICAgICAgICBpZiAoIG5vZGUucmF3cy5pbmxpbmUgKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8vJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCwgbm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjbChub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgaWYgKCAhbm9kZS5pc05lc3RlZCApIHtcbiAgICAgICAgICAgIHN1cGVyLmRlY2wobm9kZSwgc2VtaWNvbG9uKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdjb2xvbicpO1xuICAgICAgICAgICAgbGV0IHN0cmluZyAgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKTtcbiAgICAgICAgICAgIGlmICggbm9kZS5pbXBvcnRhbnQgKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5idWlsZGVyKHN0cmluZyArICd7Jywgbm9kZSwgJ3N0YXJ0Jyk7XG5cbiAgICAgICAgICAgIGxldCBhZnRlcjtcbiAgICAgICAgICAgIGlmICggbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkobm9kZSk7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInLCAnZW1wdHlCb2R5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGFmdGVyICkgdGhpcy5idWlsZGVyKGFmdGVyKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlcignfScsIG5vZGUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
