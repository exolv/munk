'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rating = function (_React$Component) {
  _inherits(Rating, _React$Component);

  function Rating(props) {
    _classCallCheck(this, Rating);

    return _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));
  }

  _createClass(Rating, [{
    key: 'renderStar',
    value: function renderStar(rating) {
      var star = React.createElement(
        'svg',
        { height: '20', width: '20' },
        React.createElement('path', { className: 'fill-amber-400', d: 'm5.062 18 1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062Z' })
      );

      if (rating >= 0 && rating < 1.67) {
        star = React.createElement(
          'svg',
          { height: '20', width: '20' },
          React.createElement('path', { className: 'fill-amber-400', d: 'M7.333 14.896 10 13.312l2.688 1.584-.709-3 2.313-1.979-3.063-.271L10 6.792 8.771 9.646l-3.063.271 2.334 1.979ZM5.062 18l1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062ZM10 11.062Z' })
        );
      } else if (rating >= 1.67 && rating < 3.34) {
        star = React.createElement(
          'svg',
          { height: '20', width: '20' },
          React.createElement('path', { className: 'fill-amber-400', d: 'M10 6.792v6.52l2.688 1.584-.709-3 2.313-1.979-3.063-.271ZM5.062 18l1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062Z' })
        );
      } else {
        return star;
      }

      return star;
    }
  }, {
    key: 'render',
    value: function render() {
      var rating = this.props.data.rating;


      return React.createElement(
        'div',
        { className: 'flex justify-between items-center' },
        this.renderStar(rating),
        React.createElement(
          'span',
          { className: 'text-white ml-2 pt-1' },
          rating
        )
      );
    }
  }]);

  return Rating;
}(React.Component);