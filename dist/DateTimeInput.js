'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _DayInput = require('react-date-picker/dist/DateInput/DayInput');

var _DayInput2 = _interopRequireDefault(_DayInput);

var _MonthInput = require('react-date-picker/dist/DateInput/MonthInput');

var _MonthInput2 = _interopRequireDefault(_MonthInput);

var _YearInput = require('react-date-picker/dist/DateInput/YearInput');

var _YearInput2 = _interopRequireDefault(_YearInput);

var _Hour12Input = require('react-time-picker/dist/TimeInput/Hour12Input');

var _Hour12Input2 = _interopRequireDefault(_Hour12Input);

var _Hour24Input = require('react-time-picker/dist/TimeInput/Hour24Input');

var _Hour24Input2 = _interopRequireDefault(_Hour24Input);

var _MinuteInput = require('react-time-picker/dist/TimeInput/MinuteInput');

var _MinuteInput2 = _interopRequireDefault(_MinuteInput);

var _SecondInput = require('react-time-picker/dist/TimeInput/SecondInput');

var _SecondInput2 = _interopRequireDefault(_SecondInput);

var _AmPm = require('react-time-picker/dist/TimeInput/AmPm');

var _AmPm2 = _interopRequireDefault(_AmPm);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _NativeInput = require('./DateTimeInput/NativeInput');

var _NativeInput2 = _interopRequireDefault(_NativeInput);

var _dateFormatter = require('./shared/dateFormatter');

var _dates = require('./shared/dates');

var _propTypes3 = require('./shared/propTypes');

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultMinDate = new Date(-8.64e15);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['hour', 'minute', 'second'];

var datesAreDifferent = function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
};

var findPreviousInput = function findPreviousInput(element) {
  var previousElement = element.previousElementSibling; // Divider between inputs
  if (!previousElement) {
    return null;
  }
  return previousElement.previousElementSibling; // Actual input
};

var findNextInput = function findNextInput(element) {
  var nextElement = element.nextElementSibling; // Divider between inputs
  if (!nextElement) {
    return null;
  }
  return nextElement.nextElementSibling; // Actual input
};

var focus = function focus(element) {
  return element && element.focus();
};

var renderCustomInputs = function renderCustomInputs(placeholder, elementFunctions) {
  var pattern = new RegExp(Object.keys(elementFunctions).join('|'), 'gi');
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function (arr, element, index) {
    var divider = element &&
    // eslint-disable-next-line react/no-array-index-key
    _react2.default.createElement(
      _Divider2.default,
      { key: 'separator_' + index },
      element
    );
    var res = [].concat(_toConsumableArray(arr), [divider]);
    if (matches && matches[index]) {
      res.push(elementFunctions[matches[index]]());
    }
    return res;
  }, []);
};

var DateTimeInput = function (_PureComponent) {
  _inherits(DateTimeInput, _PureComponent);

  function DateTimeInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeInput.__proto__ || Object.getPrototypeOf(DateTimeInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      amPm: null,
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      second: null
    }, _this.onClick = function (event) {
      if (event.target === event.currentTarget) {
        // Wrapper was directly clicked
        var _event$target$childre = _slicedToArray(event.target.children, 2),
            firstInput = _event$target$childre[1];

        focus(firstInput);
      }
    }, _this.onKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          {
            event.preventDefault();

            var input = event.target;
            var previousInput = findPreviousInput(input);
            focus(previousInput);
            break;
          }
        case 'ArrowRight':
        case _this.dateDivider:
        case _this.timeDivider:
          {
            event.preventDefault();

            var _input = event.target;
            var nextInput = findNextInput(_input);
            focus(nextInput);
            break;
          }
        default:
      }
    }, _this.onChange = function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;


      switch (name) {
        case 'hour12':
          {
            _this.setState(function (prevState) {
              return {
                hour: value ? (0, _dates.convert12to24)(parseInt(value, 10), prevState.amPm) : null
              };
            }, _this.onChangeExternal);
            break;
          }
        case 'hour24':
          {
            _this.setState({ hour: value ? parseInt(value, 10) : null }, _this.onChangeExternal);
            break;
          }
        default:
          {
            _this.setState(_defineProperty({}, name, value ? parseInt(value, 10) : null), _this.onChangeExternal);
          }
      }
    }, _this.onChangeNative = function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;


      if (!onChange) {
        return;
      }

      var processedValue = function () {
        if (!value) {
          return null;
        }

        var _value$split = value.split('T'),
            _value$split2 = _slicedToArray(_value$split, 2),
            valueDate = _value$split2[0],
            valueTime = _value$split2[1];

        var _valueDate$split = valueDate.split('-'),
            _valueDate$split2 = _slicedToArray(_valueDate$split, 3),
            yearString = _valueDate$split2[0],
            monthString = _valueDate$split2[1],
            dayString = _valueDate$split2[2];

        var year = parseInt(yearString, 10);
        var monthIndex = parseInt(monthString, 10) - 1 || 0;
        var date = parseInt(dayString, 10) || 1;

        var _valueTime$split = valueTime.split(':'),
            _valueTime$split2 = _slicedToArray(_valueTime$split, 3),
            hourString = _valueTime$split2[0],
            minuteString = _valueTime$split2[1],
            secondString = _valueTime$split2[2];

        var hour = parseInt(hourString, 10) || 0;
        var minute = parseInt(minuteString, 10) || 0;
        var second = parseInt(secondString, 10) || 0;

        return new Date(year, monthIndex, date, hour, minute, second);
      }();

      onChange(processedValue, false);
    }, _this.onChangeAmPm = function (event) {
      var value = event.target.value;


      _this.setState({ amPm: value }, _this.onChangeExternal);
    }, _this.onChangeExternal = function () {
      var onChange = _this.props.onChange;


      if (!onChange) {
        return;
      }

      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput, _this.hour12Input, _this.hour24Input, _this.minuteInput, _this.secondInput, _this.amPmInput].filter(Boolean);

      var formElementsWithoutSelect = formElements.slice(0, -1);

      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });

      if (formElementsWithoutSelect.every(function (formElement) {
        return !formElement.value;
      })) {
        onChange(null, false);
      } else if (formElements.every(function (formElement) {
        return formElement.value && formElement.checkValidity();
      })) {
        var hour = values.hour24 || (0, _dates.convert12to24)(values.hour12, values.amPm);
        var proposedValue = new Date(values.year, (values.month || 1) - 1, values.day || 1, hour, values.minute || 0, values.second || 0);
        var processedValue = proposedValue;
        onChange(processedValue, false);
      }
    }, _this.renderDay = function () {
      var _this$props = _this.props,
          maxDetail = _this$props.maxDetail,
          showLeadingZeros = _this$props.showLeadingZeros;
      var _this$state = _this.state,
          day = _this$state.day,
          month = _this$state.month,
          year = _this$state.year;


      return _react2.default.createElement(_DayInput2.default, _extends({
        key: 'day'
      }, _this.commonInputProps, {
        maxDetail: maxDetail,
        month: month,
        showLeadingZeros: showLeadingZeros,
        year: year,
        value: day
      }));
    }, _this.renderMonth = function () {
      var _this$props2 = _this.props,
          maxDetail = _this$props2.maxDetail,
          showLeadingZeros = _this$props2.showLeadingZeros;
      var month = _this.state.month;


      return _react2.default.createElement(_MonthInput2.default, _extends({
        key: 'month'
      }, _this.commonInputProps, {
        maxDetail: maxDetail,
        showLeadingZeros: showLeadingZeros,
        value: month
      }));
    }, _this.renderYear = function () {
      var year = _this.state.year;


      return _react2.default.createElement(_YearInput2.default, _extends({
        key: 'year'
      }, _this.commonInputProps, {
        value: year,
        valueType: 'day'
      }));
    }, _this.renderHour12 = function () {
      var hour = _this.state.hour;


      return _react2.default.createElement(_Hour12Input2.default, _extends({
        key: 'hour12'
      }, _this.commonInputProps, {
        value: hour
      }));
    }, _this.renderHour24 = function () {
      var hour = _this.state.hour;


      return _react2.default.createElement(_Hour24Input2.default, _extends({
        key: 'hour24'
      }, _this.commonInputProps, {
        value: hour
      }));
    }, _this.renderMinute = function () {
      var maxDetail = _this.props.maxDetail;
      var _this$state2 = _this.state,
          hour = _this$state2.hour,
          minute = _this$state2.minute;


      return _react2.default.createElement(_MinuteInput2.default, _extends({
        key: 'minute'
      }, _this.commonInputProps, {
        hour: hour,
        maxDetail: maxDetail,
        value: minute
      }));
    }, _this.renderSecond = function () {
      var maxDetail = _this.props.maxDetail;
      var _this$state3 = _this.state,
          hour = _this$state3.hour,
          minute = _this$state3.minute,
          second = _this$state3.second;


      return _react2.default.createElement(_SecondInput2.default, _extends({
        key: 'second'
      }, _this.commonInputProps, {
        hour: hour,
        maxDetail: maxDetail,
        minute: minute,
        value: second
      }));
    }, _this.renderAmPm = function () {
      var amPm = _this.state.amPm;
      var locale = _this.props.locale;


      return _react2.default.createElement(_AmPm2.default, _extends({
        key: 'ampm'
      }, _this.commonInputProps, {
        locale: locale,
        onChange: _this.onChangeAmPm,
        value: amPm
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeInput, [{
    key: 'renderCustomDateInputs',
    value: function renderCustomDateInputs() {
      var datePlaceholder = this.datePlaceholder;

      var elementFunctions = {
        day: this.renderDay,
        month: this.renderMonth,
        year: this.renderYear
      };

      return renderCustomInputs(datePlaceholder, elementFunctions);
    }
  }, {
    key: 'renderCustomTimeInputs',
    value: function renderCustomTimeInputs() {
      var timePlaceholder = this.timePlaceholder;

      var elementFunctions = {
        'hour-12': this.renderHour12,
        'hour-24': this.renderHour24,
        minute: this.renderMinute,
        second: this.renderSecond,
        ampm: this.renderAmPm
      };

      return renderCustomInputs(timePlaceholder, elementFunctions);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      var _props = this.props,
          disabled = _props.disabled,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          name = _props.name,
          required = _props.required,
          value = _props.value;


      return _react2.default.createElement(_NativeInput2.default, {
        key: 'time',
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        name: name,
        onChange: this.onChangeNative,
        required: required,
        value: value,
        valueType: this.valueType
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onClick: this.onClick,
          role: 'presentation'
        },
        this.renderNativeInput(),
        this.renderCustomDateInputs(),
        _react2.default.createElement(
          _Divider2.default,
          null,
          '\xA0'
        ),
        this.renderCustomTimeInputs()
      );
    }
  }, {
    key: 'formatTime',
    get: function get() {
      var _props2 = this.props,
          locale = _props2.locale,
          maxDetail = _props2.maxDetail;


      var options = { hour: 'numeric' };
      var level = allViews.indexOf(maxDetail);
      if (level >= 1) {
        options.minute = 'numeric';
      }
      if (level >= 2) {
        options.second = 'numeric';
      }

      return (0, _dateFormatter.getFormatter)(locale, options);
    }
  }, {
    key: 'formatNumber',
    get: function get() {
      var locale = this.props.locale;


      var options = { useGrouping: false };

      return (0, _dateFormatter.getFormatter)(locale, options);
    }
  }, {
    key: 'dateDivider',
    get: function get() {
      var locale = this.props.locale;

      var date = new Date(2017, 11, 11);

      return (0, _dateFormatter.formatDate)(locale, date).match(/[^0-9a-z]/i)[0];
    }
  }, {
    key: 'timeDivider',
    get: function get() {
      var date = new Date(2017, 0, 1, 21, 12, 13);

      return this.formatTime(date).match(/[^0-9a-z]/i)[0];
    }
  }, {
    key: 'datePlaceholder',
    get: function get() {
      var locale = this.props.locale;


      var year = 2017;
      var monthIndex = 11;
      var day = 11;

      var date = new Date(year, monthIndex, day);

      return (0, _dateFormatter.formatDate)(locale, date).replace(this.formatNumber(year), 'year').replace(this.formatNumber(monthIndex + 1), 'month').replace(this.formatNumber(day), 'day');
    }
  }, {
    key: 'timePlaceholder',
    get: function get() {
      var locale = this.props.locale;


      var hour24 = 21;
      var hour12 = 9;
      var minute = 13;
      var second = 14;
      var date = new Date(2017, 0, 1, hour24, minute, second);

      return this.formatTime(date).replace(this.formatNumber(hour24), 'hour-24').replace(this.formatNumber(hour12), 'hour-12').replace(this.formatNumber(minute), 'minute').replace(this.formatNumber(second), 'second').replace(new RegExp((0, _utils.getAmPmLabels)(locale).join('|')), 'ampm');
    }
  }, {
    key: 'maxTime',
    get: function get() {
      var maxDate = this.props.maxDate;


      if (!maxDate) {
        return null;
      }

      var _state = this.state,
          year = _state.year,
          month = _state.month,
          day = _state.day;


      if ((0, _dates.getYear)(maxDate) !== year || (0, _dates.getMonth)(maxDate) !== month || (0, _dates.getDay)(maxDate) !== day) {
        return null;
      }

      return (0, _dates.getHoursMinutesSeconds)(maxDate);
    }
  }, {
    key: 'minTime',
    get: function get() {
      var minDate = this.props.minDate;


      if (!minDate) {
        return null;
      }

      var _state2 = this.state,
          year = _state2.year,
          month = _state2.month,
          day = _state2.day;


      if ((0, _dates.getYear)(minDate) !== year || (0, _dates.getMonth)(minDate) !== month || (0, _dates.getDay)(minDate) !== day) {
        return null;
      }

      return (0, _dates.getHoursMinutesSeconds)(minDate);
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this2 = this;

      var maxTime = this.maxTime,
          minTime = this.minTime;
      var _props3 = this.props,
          className = _props3.className,
          disabled = _props3.disabled,
          isWidgetOpen = _props3.isWidgetOpen,
          maxDate = _props3.maxDate,
          minDate = _props3.minDate,
          required = _props3.required;


      return {
        className: className,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        maxTime: maxTime,
        minDate: minDate || defaultMinDate,
        minTime: minTime,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        placeholder: '--',
        // This is only for showing validity when editing
        required: required || isWidgetOpen,
        itemRef: function itemRef(ref, name) {
          // Save a reference to each input field
          _this2[name + 'Input'] = ref;
        }
      };
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;


      return maxDetail;
    }

    /**
     * Called when non-native date input is changed.
     */


    /**
     * Called when native date input is changed.
     */


    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */

  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextState = {};

      /**
       * If isWidgetOpen flag has changed, we have to update it.
       * It's saved in state purely for use in getDerivedStateFromProps.
       */
      if (nextProps.isWidgetOpen !== prevState.isWidgetOpen) {
        nextState.isWidgetOpen = nextProps.isWidgetOpen;
      }

      /**
       * If the next value is different from the current one  (with an exception of situation in
       * which values provided are limited by minDate and maxDate so that the dates are the same),
       * get a new one.
       */
      var nextValue = nextProps.value;
      if (
      // Toggling calendar visibility resets values
      nextState.isCalendarOpen // Flag was toggled
      || datesAreDifferent(nextValue, prevState.value)) {
        if (nextValue) {
          var _convert24to = (0, _dates.convert24to12)((0, _dates.getHours)(nextValue));

          var _convert24to2 = _slicedToArray(_convert24to, 2);

          nextState.amPm = _convert24to2[1];

          nextState.year = (0, _dates.getYear)(nextValue);
          nextState.month = (0, _dates.getMonth)(nextValue);
          nextState.day = (0, _dates.getDay)(nextValue);
          nextState.hour = (0, _dates.getHours)(nextValue);
          nextState.minute = (0, _dates.getMinutes)(nextValue);
          nextState.second = (0, _dates.getSeconds)(nextValue);
        } else {
          nextState.amPm = null;
          nextState.year = null;
          nextState.month = null;
          nextState.day = null;
          nextState.hour = null;
          nextState.minute = null;
          nextState.second = null;
        }
        nextState.value = nextValue;
      }

      return nextState;
    }
  }]);

  return DateTimeInput;
}(_react.PureComponent);

exports.default = DateTimeInput;


DateTimeInput.defaultProps = {
  maxDetail: 'minute',
  name: 'datetime'
};

DateTimeInput.propTypes = {
  className: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  isWidgetOpen: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  showLeadingZeros: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)])
};

(0, _reactLifecyclesCompat.polyfill)(DateTimeInput);