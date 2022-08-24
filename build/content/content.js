var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Content = function () {
  function Content() {
    //

    _classCallCheck(this, Content);
  }

  _createClass(Content, [{
    key: 'getMountPoints',
    value: function getMountPoints(selector) {
      var mountPoints = document.querySelectorAll(selector);
      mountPoints.forEach(function (mountPoint) {
        mountPoint.classList.add('flex', 'justify-between', 'items-center');
      });

      return mountPoints;
    }
  }, {
    key: 'renderRating',
    value: function renderRating(element, data) {
      var root = document.createElement('div');
      root.style.display = 'inline-block';
      element.insertAdjacentElement('beforeend', root);
      var reactElement = ReactDOM.createRoot(root);
      reactElement.render(React.createElement(Rating, { data: data }));
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      var mountPoints = this.getMountPoints('.artdeco-entity-lockup__subtitle');

      mountPoints.forEach(function (element) {
        _this.renderRating(element, { rating: 4.65 });
      });
    }
  }]);

  return Content;
}();

try {
  var content = new Content();
  content.init();
} catch (error) {
  console.warn('[munk] Content Error:', error);
}