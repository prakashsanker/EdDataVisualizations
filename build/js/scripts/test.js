"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = // The 'class' keyword
function Person(name, age) {
    _classCallCheck(this, Person);

    // Constructors
    this.name = name;
    this.age = age;
};

var Developer = (function (_Person) {
    _inherits(Developer, _Person);

    // The 'extends' keyword

    function Developer(name, age) {
        _classCallCheck(this, Developer);

        // Rest parameters
        _get(Object.getPrototypeOf(Developer.prototype), "constructor", this).call(this, name, age); // Super calls

        for (var _len = arguments.length, languages = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            languages[_key - 2] = arguments[_key];
        }

        this.languages = [].concat(languages); // The spread operator
    }

    _createClass(Developer, [{
        key: "printLanguages",
        value: function printLanguages() {
            // Short method definitions
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.languages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var lang = _step.value;
                    // The for..of loop
                    console.log(lang);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Developer;
})(Person);

var me = new Developer("James", 23, "ES5", "ES6"); // Block scoping hello
console.log("HELLO");
//# sourceMappingURL=test.js.map
