import 'core-js/es/object/assign';
import 'core-js/es/number/is-nan';

var Language = function Language(language, months, monthsAbbr, days, today) {
  this.language = language;
  this.months = months;
  this.monthsAbbr = monthsAbbr;
  this.days = days;
  this.rtl = false;
  this.ymd = false;
  this.yearSuffix = '';
  this.today = today;
};

var prototypeAccessors = { language: { configurable: true },months: { configurable: true },monthsAbbr: { configurable: true },days: { configurable: true },today: { configurable: true } };

/* eslint-disable no-underscore-dangle */
prototypeAccessors.language.get = function () {
  return this._language
};

prototypeAccessors.language.set = function (language) {
  if (typeof language !== 'string') {
    throw new TypeError('Language must be a string')
  }
  this._language = language;
};

prototypeAccessors.months.get = function () {
  return this._months
};

prototypeAccessors.months.set = function (months) {
  if (months.length !== 12) {
    throw new RangeError(("There must be 12 months for " + (this.language) + " language"))
  }
  this._months = months;
};

prototypeAccessors.monthsAbbr.get = function () {
  return this._monthsAbbr
};

prototypeAccessors.monthsAbbr.set = function (monthsAbbr) {
  if (monthsAbbr.length !== 12) {
    throw new RangeError(("There must be 12 abbreviated months for " + (this.language) + " language"))
  }
  this._monthsAbbr = monthsAbbr;
};

prototypeAccessors.days.get = function () {
  return this._days
};

prototypeAccessors.days.set = function (days) {
  if (days.length !== 7) {
    throw new RangeError(("There must be 7 days for " + (this.language) + " language"))
  }
  this._days = days;
};

prototypeAccessors.today.get = function () {
  return this._today
};

prototypeAccessors.today.set = function (today) {
  this._today = today;
};

Language.prototype.getMonthByAbbrName = function getMonthByAbbrName (name) {
  var index = -1;
  this._monthsAbbr.some(function (month, i) {
    if (month === name) {
      index = i;
      return true
    }
    return false
  });
  var monthValue = index + 1;
  return monthValue < 10 ? ("0" + monthValue) : ("" + monthValue)
};

Language.prototype.getMonthByName = function getMonthByName (name) {
  var index = -1;
  this._months.some(function (month, i) {
    if (month === name) {
      index = i;
      return true
    }
    return false
  });
  var monthValue = index + 1;
  return monthValue < 10 ? ("0" + monthValue) : ("" + monthValue)
};

Object.defineProperties( Language.prototype, prototypeAccessors );

var en = new Language(
  'English',
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'Today'
);

var utils = {
  /**
   * @type {Boolean}
   */
  useUtc: false,
  /**
   * Returns the full year, using UTC or not
   * @param {Date} date
   */
  getFullYear: function getFullYear(date) {
    return this.useUtc ? date.getUTCFullYear() : date.getFullYear()
  },

  /**
   * Returns the month, using UTC or not
   * @param {Date} date
   */
  getMonth: function getMonth(date) {
    return this.useUtc ? date.getUTCMonth() : date.getMonth()
  },

  /**
   * Returns the date, using UTC or not
   * @param {Date} date
   */
  getDate: function getDate(date) {
    return this.useUtc ? date.getUTCDate() : date.getDate()
  },

  /**
   * Returns the day, using UTC or not
   * @param {Date} date
   */
  getDay: function getDay(date) {
    return this.useUtc ? date.getUTCDay() : date.getDay()
  },

  /**
   * Returns the hours, using UTC or not
   * @param {Date} date
   */
  getHours: function getHours(date) {
    return this.useUtc ? date.getUTCHours() : date.getHours()
  },

  /**
   * Returns the minutes, using UTC or not
   * @param {Date} date
   */
  getMinutes: function getMinutes(date) {
    return this.useUtc ? date.getUTCMinutes() : date.getMinutes()
  },

  /**
   * Sets the full year, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setFullYear: function setFullYear(date, value) {
    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value)
  },

  /**
   * Sets the month, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setMonth: function setMonth(date, value) {
    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value)
  },

  /**
   * Sets the date, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setDate: function setDate(date, value) {
    return this.useUtc ? date.setUTCDate(value) : date.setDate(value)
  },

  /**
   * Check if date1 is equivalent to date2, without comparing the time
   * @see https://stackoverflow.com/a/6202196/4455925
   * @param {Date} date1
   * @param {Date} date2
   */
  compareDates: function compareDates(date1, date2) {
    var d1 = new Date(date1.getTime());
    var d2 = new Date(date2.getTime());

    this.resetDateTime(d1);
    this.resetDateTime(d2);
    return d1.getTime() === d2.getTime()
  },

  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate: function isValidDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false
    }
    return !Number.isNaN(date.getTime())
  },

  /**
   * Return abbreviated week day name
   * @param {Date} date
   * @param {Array} days
   * @return {String}
   */
  getDayNameAbbr: function getDayNameAbbr(date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type')
    }
    return days[this.getDay(date)]
  },

  /**
   * Return name of the month
   * @param {Number|Date} month
   * @param {Array} months
   * @return {String}
   */
  getMonthName: function getMonthName(month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array')
    }
    if (typeof month === 'object') {
      return months[this.getMonth(month)]
    }
    if (typeof month === 'number') {
      return months[month]
    }
    throw TypeError('Invalid type')
  },

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date} month
   * @param {Array} monthsAbbr
   * @return {String}
   */
  getMonthNameAbbr: function getMonthNameAbbr(month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array')
    }
    if (typeof month === 'object') {
      return monthsAbbr[this.getMonth(month)]
    }
    if (typeof month === 'number') {
      return monthsAbbr[month]
    }
    throw TypeError('Invalid type')
  },

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} month
   * @return {Number}
   */
  daysInMonth: function daysInMonth(year, month) {
    /* eslint-disable-next-line no-nested-ternary */
    return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  getNthSuffix: function getNthSuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st'
      case 2:
      case 22:
        return 'nd'
      case 3:
      case 23:
        return 'rd'
      default:
        return 'th'
    }
  },

  /**
   * Formats date object
   * @param {Date} date
   * @param {String} formatStr
   * @param {Object} translation
   * @return {String}
   */
  formatDate: function formatDate(date, formatStr, translation) {
    var translationTemp = (!translation) ? en : translation;
    var year = this.getFullYear(date);
    var month = this.getMonth(date) + 1;
    var day = this.getDate(date);

    var matches = {
      dd: (("0" + day)).slice(-2),
      d: day,
      yyyy: year,
      yy: String(year).slice(2),
      MMMM: this.getMonthName(this.getMonth(date), translationTemp.months),
      MMM: this.getMonthNameAbbr(this.getMonth(date), translationTemp.monthsAbbr),
      MM: (("0" + month)).slice(-2),
      M: month,
      o: this.getNthSuffix(this.getDate(date)),
      E: this.getDayNameAbbr(date, translationTemp.days),
    };

    var REGEX_FORMAT = /y{4}|y{2}|M{1,4}(?![aäe])|d{1,2}|o{1}|E{1}(?![eéi])/g;
    return formatStr.replace(REGEX_FORMAT, function (match) { return matches[match] || match; })
  },

  /**
   * makes date parseable
   * to use with international dates
   * @param {String} dateStr
   * @param {String|Function} formatStr
   * @param {Object} translation
   * @param {Function} parser
   * @return {Date | String}
   */
  parseDate: function parseDate(dateStr, formatStr, translation, parser) {
    var translationTemp = (!translation) ? en : translation;
    if (!(dateStr && formatStr)) {
      return dateStr
    }
    if (typeof formatStr === 'function') {
      if (!parser || typeof parser !== 'function') {
        throw new Error('Parser need to be a function if you are using a custom formatter')
      }
      return parser(dateStr)
    }
    var splitter = formatStr.match(/-|\/|\s|\./) || ['-'];
    var df = formatStr.split(splitter[0]);
    var ds = dateStr.split(splitter[0]);
    var ymd = [
      0,
      0,
      0 ];
    for (var i = 0; i < df.length; i += 1) {
      if (/yyyy/i.test(df[i])) {
        ymd[0] = ds[i];
      } else if (/mmmm/i.test(df[i])) {
        ymd[1] = translationTemp.getMonthByName(ds[i]);
      } else if (/mmm/i.test(df[i])) {
        ymd[1] = translationTemp.getMonthByAbbrName(ds[i]);
      } else if (/mm/i.test(df[i])) {
        ymd[1] = ds[i];
      } else if (/m/i.test(df[i])) {
        ymd[1] = ds[i];
      } else if (/dd/i.test(df[i])) {
        ymd[2] = ds[i];
      } else if (/d/i.test(df[i])) {
        var tmp = ds[i].replace(/st|rd|nd|th/g, '');
        ymd[2] = tmp < 10 ? ("0" + tmp) : ("" + tmp);
      }
    }
    var dat = (ymd.join('-')) + "T00:00:00Z";
    if (Number.isNaN(Date.parse(dat))) {
      return dateStr
    }
    return dat
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray: function createDateArray(start, end) {
    var dates = [];
    var startTemp = start;
    while (startTemp <= end) {
      dates.push(new Date(startTemp));
      startTemp = this.setDate(new Date(startTemp), this.getDate(new Date(startTemp)) + 1);
    }
    return dates
  },

  /**
   * Remove hours/minutes/seconds/milliseconds from a date object
   * @param {Date} date
   * @return {Date}
   */
  resetDateTime: function resetDateTime(date) {
    return new Date(this.useUtc ? date.setUTCHours(0, 0, 0, 0) : date.setHours(0, 0, 0, 0))
  },

  /**
   * Return a new date object with hours/minutes/seconds/milliseconds removed
   * @return {Date}
   */
  getNewDateObject: function getNewDateObject(date) {
    return date ? this.resetDateTime(new Date(date)) : this.resetDateTime(new Date())
  },
};

var makeDateUtils = function (useUtc) { return (Object.assign({}, utils,
  {useUtc: useUtc})); };

Object.assign({}, utils);

var script = ({
  props: {
    format: {
      type: [
        String,
        Function ],
      default: 'dd MMM yyyy',
    },
    parser: {
      type: Function,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    refName: {
      type: String,
      default: '',
    },
    openDate: {
      type: [
        String,
        Date,
        Number ],
      default: null,
      validator:
        function (val) { return val === null
          || val instanceof Date
          || typeof val === 'string'
          || typeof val === 'number'; },
    },
    placeholder: {
      type: String,
      default: null,
    },
    tabindex: {
      type: [
        Number,
        String ],
      default: null,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: [
        String,
        Object,
        Array ],
      default: null,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
    clearButtonIcon: {
      type: String,
      default: '',
    },
    calendarButton: {
      type: Boolean,
      default: false,
    },
    calendarButtonIcon: {
      type: String,
      default: '',
    },
    calendarButtonIconContent: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    typeable: {
      type: Boolean,
      default: false,
    },
    bootstrapStyling: {
      type: Boolean,
      default: false,
    },
    useUtc: {
      type: Boolean,
      default: false,
    },
    showCalendarOnFocus: {
      type: Boolean,
      default: false,
    },
    showCalendarOnButtonClick: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [
        Number,
        String ],
      default: null,
    },
    pattern: {
      type: String,
      default: null,
    },
  },
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'DatepickerInput',
  mixins: [
    __vue_component__ ],
  props: {
    selectedDate: {
      type: Date,
      default: null,
    },
    resetTypedDate: {
      type: [Date],
      default: null,
    },
    translation: {
      type: Object,
      default: function default$1() {
        return {}
      },
    },
  },
  data: function data() {
    var constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      input: null,
      typedDate: false,
      utils: constructedDateUtils,
    }
  },
  computed: {
    formattedValue: function formattedValue() {
      if (!this.selectedDate) {
        return null
      }
      if (this.typedDate) {
        return this.typedDate
      }
      return typeof this.format === 'function'
        ? this.format(new Date(this.selectedDate))
        : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation)
    },

    computedInputClass: function computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [
            this.inputClass,
            'form-control' ].join(' ')
        }
        return Object.assign({}, {'form-control': true}, this.inputClass)
      }
      return this.inputClass
    },
  },
  watch: {
    resetTypedDate: function resetTypedDate() {
      this.typedDate = false;
    },
  },
  mounted: function mounted() {
    this.input = this.$el.querySelector('input');
  },
  methods: {
    showCalendar: function showCalendar(isButton) {
      // prevent to emit the event twice if we are listening focus
      if (!this.showCalendarOnFocus) {
        if (
          !this.showCalendarOnButtonClick
          || (
            this.showCalendarOnButtonClick
            && this.calendarButton
            && isButton
          )
        ) {
          this.$emit('show-calendar');
        }
      }
    },
    showFocusCalendar: function showFocusCalendar() {
      if (this.showCalendarOnFocus) {
        this.$emit('show-calendar', true);
      }

      this.$emit('focus');
    },
    /**
     * Attempt to parse a typed date
     * @param {Event} event
     */
    parseTypedDate: function parseTypedDate(event) {
      var code = (event.keyCode ? event.keyCode : event.which);
      // close calendar if escape or enter are pressed
      if ([
        27, // escape
        13 ].indexOf(code) !== -1) {
        this.input.blur();
      }

      if (this.typeable) {
        var parsableDate = this.parseDate(this.input.value);
        var parsedDate = Date.parse(parsableDate);
        if (!Number.isNaN(parsedDate)) {
          this.typedDate = this.input.value;
          this.$emit('typed-date', new Date(parsedDate));
        }
      }
    },
    /**
     * nullify the typed date to defer to regular formatting
     * called once the input is blurred
     */
    inputBlurred: function inputBlurred() {
      var parsableDate = this.parseDate(this.input.value);
      if (this.typeable && Number.isNaN(Date.parse(parsableDate))) {
        this.clearDate();
        this.input.value = null;
        this.typedDate = null;
      }
      this.$emit('blur');
      this.$emit('close-calendar');
    },
    /**
     * emit a clearDate event
     */
    clearDate: function clearDate() {
      this.$emit('clear-date');
    },
    parseDate: function parseDate(value) {
      return this.utils.parseDate(
        value,
        this.format,
        this.translation,
        this.parser
      )
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { "input-group": _vm.bootstrapStyling } },
    [
      _vm._t("beforeDateInput"),
      _vm._v(" "),
      _vm.calendarButton
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__calendar-button",
              class: {
                "input-group-prepend": _vm.bootstrapStyling,
                "calendar-btn-disabled": _vm.disabled
              },
              on: {
                click: function($event) {
                  return _vm.showCalendar(true)
                }
              }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _c("i", { class: _vm.calendarButtonIcon }, [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.calendarButtonIconContent) +
                        "\n        "
                    ),
                    !_vm.calendarButtonIcon
                      ? _c("span", [_vm._v("\n          …\n        ")])
                      : _vm._e()
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        ref: _vm.refName,
        class: _vm.computedInputClass,
        attrs: {
          id: _vm.id,
          type: _vm.inline ? "hidden" : "text",
          name: _vm.name,
          "open-date": _vm.openDate,
          placeholder: _vm.placeholder,
          "clear-button": _vm.clearButton,
          disabled: _vm.disabled,
          required: _vm.required,
          readonly: !_vm.typeable,
          autofocus: _vm.autofocus,
          maxlength: _vm.maxlength,
          pattern: _vm.pattern,
          tabindex: _vm.tabindex,
          autocomplete: "off"
        },
        domProps: { value: _vm.formattedValue },
        on: {
          click: function($event) {
            return _vm.showCalendar(false)
          },
          focus: _vm.showFocusCalendar,
          keyup: _vm.parseTypedDate,
          blur: _vm.inputBlurred
        }
      }),
      _vm._v(" "),
      _vm.clearButton && _vm.selectedDate
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__clear-button",
              class: { "input-group-append": _vm.bootstrapStyling },
              on: {
                click: function($event) {
                  return _vm.clearDate()
                }
              }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _c("i", { class: _vm.clearButtonIcon }, [
                    !_vm.clearButtonIcon
                      ? _c("span", [_vm._v("\n          ×\n        ")])
                      : _vm._e()
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("afterDateInput")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'DatepickerHeader',
  props: {
    config: {
      type: Object,
      default: function default$1() {
        return {
          showHeader: true,
          isRtl: false,
          isNextDisabled: function isNextDisabled() {
            return false
          },
          isPreviousDisabled: function isPreviousDisabled() {
            return false
          },
        }
      },
    },
    next: {
      type: Function,
      default: function default$2() {
        return false
      },
    },
    previous: {
      type: Function,
      default: function default$3() {
        return false
      },
    },
  },
  computed: {
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled: function isLeftNavDisabled() {
      return this.config.isRtl
        ? this.config.isNextDisabled()
        : this.config.isPreviousDisabled()
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled: function isRightNavDisabled() {
      return this.config.isRtl
        ? this.config.isPreviousDisabled()
        : this.config.isNextDisabled()
    },
  },
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "header",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.config.showHeader,
          expression: "config.showHeader"
        }
      ]
    },
    [
      _c(
        "span",
        {
          staticClass: "prev",
          class: { disabled: _vm.isLeftNavDisabled },
          on: {
            click: function($event) {
              _vm.config.isRtl ? _vm.next() : _vm.previous();
            }
          }
        },
        [
          _vm._t("prevIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v("<")])
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("headerContent"),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "next",
          class: { disabled: _vm.isRightNavDisabled },
          on: {
            click: function($event) {
              _vm.config.isRtl ? _vm.previous() : _vm.next();
            }
          }
        },
        [
          _vm._t("nextIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v(">")])
          ])
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var script$3 = ({
  components: { PickerHeader: __vue_component__$2 },
  inheritAttrs: false,
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    allowedToShowView: {
      type: Function,
      default: function default$1() {
      },
    },
    disabledDates: {
      type: Object,
      default: function default$2() {
        return {}
      },
    },
    isRtl: {
      type: Boolean,
      default: false,
    },
    pageDate: {
      type: Date,
      default: null,
    },
    pageTimestamp: {
      type: Number,
      default: 0,
    },
    selectedDate: {
      type: Date,
      default: null,
    },
    translation: {
      type: Object,
      default: function default$3() {
        return {}
      },
    },
    useUtc: {
      type: Boolean,
      default: false,
    },
  },
  data: function data() {
    return {
      utils: makeDateUtils(this.useUtc),
      headerConfig: {
        showHeader: this.showHeader,
        isRtl: this.isRtl,
        isNextDisabled: this.isNextDisabled,
        isPreviousDisabled: this.isPreviousDisabled,
      },
    }
  },
  methods: {
    /**
     * Emit an event to show the month picker
     */
    showPickerCalendar: function showPickerCalendar(type) {
      this.$emit(("show-" + type + "-calendar"));
    },
    /**
     * Need to be set inside the different pickers for month, year, decade
     */
    isNextDisabled: function isNextDisabled() {
      return false
    },
    isPreviousDisabled: function isPreviousDisabled() {
      return false
    },
  },
});

/* script */
var __vue_script__$3 = script$3;

/* template */

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  name: 'DatepickerFooter',
  props: {
    config: {
      type: Object,
      default: function default$1() {
        return {
          showFooter: true,
          isRtl: false,
          isNextDisabled: function isNextDisabled() {
            return false
          },
          isPreviousDisabled: function isPreviousDisabled() {
            return false
          },
        }
      },
    },
    next: {
      type: Function,
      default: function default$2() {
        return false
      },
    },
    previous: {
      type: Function,
      default: function default$3() {
        return false
      },
    },
  },
  computed: {
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled: function isLeftNavDisabled() {
      return this.config.isRtl
        ? this.config.isNextDisabled()
        : this.config.isPreviousDisabled()
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled: function isRightNavDisabled() {
      return this.config.isRtl
        ? this.config.isPreviousDisabled()
        : this.config.isNextDisabled()
    },
  },
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "footer",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.config.showFooter,
          expression: "config.showFooter"
        }
      ]
    },
    [
      _c(
        "span",
        {
          staticClass: "prev",
          class: { disabled: _vm.isLeftNavDisabled },
          on: {
            click: function($event) {
              _vm.config.isRtl ? _vm.next() : _vm.previous();
            }
          }
        },
        [
          _vm._t("prevIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v("<")])
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("footerContent"),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "next",
          class: { disabled: _vm.isRightNavDisabled },
          on: {
            click: function($event) {
              _vm.config.isRtl ? _vm.previous() : _vm.next();
            }
          }
        },
        [
          _vm._t("nextIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v(">")])
          ])
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

var checkDateSpecific = function (date, disabledDates, utils) {
  if (typeof disabledDates.dates !== 'undefined' && disabledDates.dates.length) {
    var dates = disabledDates.dates;
    for (var i = 0; i < dates.length; i += 1) {
      if (utils.compareDates(date, dates[i])) {
        return true
      }
    }
  }
  return false
};

var checkDateDisabledFromTo = function (date, disabledDates) {
  if (typeof disabledDates.to !== 'undefined' && disabledDates.to && date < disabledDates.to) {
    return true
  }
  if (
    typeof disabledDates.from !== 'undefined'
    && disabledDates.from
    && date > disabledDates.from
  ) {
    return true
  }
  return false
};

var checkDateRange = function (date, disabledDates) {
  if (typeof disabledDates.ranges !== 'undefined' && disabledDates.ranges.length) {
    var ranges = disabledDates.ranges;
    for (var i = 0; i < ranges.length; i += 1) {
      var range = ranges[i];
      if (
        typeof range.from !== 'undefined'
        && range.from
        && typeof range.to !== 'undefined'
        && range.to
      ) {
        if (date < range.to && date > range.from) {
          return true
        }
      }
    }
  }
  return false
};

/**
 * Checks if the given date should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
var isDateDisabled = function (date, disabledDates, utils) {
  // skip if no config
  if (typeof disabledDates === 'undefined') {
    return false
  }

  // check specific dates
  if (checkDateSpecific(date, disabledDates, utils)) {
    return true
  }

  if (checkDateDisabledFromTo(date, disabledDates)) {
    return true
  }

  // check date ranges
  if (checkDateRange(date, disabledDates)) {
    return true
  }

  if (
    typeof disabledDates.days !== 'undefined'
    && disabledDates.days.indexOf(utils.getDay(date)) !== -1
  ) {
    return true
  }
  if (
    typeof disabledDates.daysOfMonth !== 'undefined'
    && disabledDates.daysOfMonth.indexOf(utils.getDate(date)) !== -1
  ) {
    return true
  }
  if (
    typeof disabledDates.customPredictor === 'function'
    && disabledDates.customPredictor(date)
  ) {
    return true
  }

  return false
};

/**
 * Checks if the given month should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
var isMonthDisabled = function (date, disabledDates, utils) {
  // skip if no config
  if (typeof disabledDates === 'undefined') {
    return false
  }

  // check if the whole month is disabled before checking every individual days
  if (typeof disabledDates.to !== 'undefined' && disabledDates.to) {
    if (
      (
        utils.getMonth(date) < utils.getMonth(disabledDates.to)
        && utils.getFullYear(date) <= utils.getFullYear(disabledDates.to)
      )
      || utils.getFullYear(date) < utils.getFullYear(disabledDates.to)
    ) {
      return true
    }
  }
  if (typeof disabledDates.from !== 'undefined' && disabledDates.from) {
    if (
      (
        utils.getMonth(date) > utils.getMonth(disabledDates.from)
        && utils.getFullYear(date) >= utils.getFullYear(disabledDates.from)
      )
      || utils.getFullYear(date) > utils.getFullYear(disabledDates.from)
    ) {
      return true
    }
  }

  // now we have to check every days of the month
  var daysInMonth = utils.daysInMonth(utils.getFullYear(date), utils.getMonth(date));
  for (var j = 1; j <= daysInMonth; j += 1) {
    var dayDate = new Date(date);
    dayDate.setDate(j);
    // if at least one day of this month is NOT disabled,
    // we can conclude that this month SHOULD be selectable
    if (!isDateDisabled(dayDate, disabledDates, utils)) {
      return false
    }
  }
  return true
};

/**
 * Checks if the given year should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
var isYearDisabled = function (date, disabledDates, utils) {
  // skip if no config
  if (typeof disabledDates === 'undefined' || !disabledDates) {
    return false
  }

  // check if the whole year is disabled before checking every individual months
  if (typeof disabledDates.to !== 'undefined' && disabledDates.to) {
    if (utils.getFullYear(date) < utils.getFullYear(disabledDates.to)) {
      return true
    }
  }
  if (typeof disabledDates.from !== 'undefined' && disabledDates.from) {
    if (utils.getFullYear(date) > utils.getFullYear(disabledDates.from)) {
      return true
    }
  }

  // now we have to check every months of the year
  for (var j = 0; j < 12; j += 1) {
    var monthDate = new Date(date);
    monthDate.setMonth(j);
    // if at least one month of this year is NOT disabled,
    // we can conclude that this year SHOULD be selectable
    if (!isMonthDisabled(monthDate, disabledDates, utils)) {
      return false
    }
  }
  return true
};

//

var script$5 = {
  name: 'DatepickerDayView',
  mixins: [
    __vue_component__$3 ],
  components: {
    PickerFooter: __vue_component__$4,
  },
  props: {
    showFooter: {
      type: Boolean,
      default: false,
    },
    fullMonthName: {
      type: Boolean,
      default: false,
    },
    dayCellContent: {
      type: Function,
      default: function (day) { return day.date; },
    },
    highlighted: {
      type: Object,
      default: function default$1() {
        return {}
      },
    },
    mondayFirst: {
      type: Boolean,
      default: false,
    },
  },
  data: function data() {
    return {
      footerConfig: {
        showFooter: this.showFooter,
        isRtl: this.isRtl,
        isNextDisabled: this.isNextDisabled,
        isPreviousDisabled: this.isPreviousDisabled,
      },
    }
  },
  computed: {
    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek: function daysOfWeek() {
      if (this.mondayFirst) {
        var tempDays = this.translation.days.slice();
        tempDays.push(tempDays.shift());
        return tempDays
      }
      return this.translation.days
    },
    /**
     * Returns the day number of the week less one for the first of the current month
     * Used to show amount of empty cells before the first in the day calendar layout
     * @return {Number}
     */
    blankDays: function blankDays() {
      var d = this.pageDate;
      var dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      if (this.mondayFirst) {
        return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6
      }
      return this.utils.getDay(dObj)
    },
    /**
     * Set an object with all days inside the month
     * @return {Object[]}
     */
    days: function days() {
      var d = this.pageDate;
      var days = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      var daysInMonth = this.utils.daysInMonth(
        this.utils.getFullYear(dObj), this.utils.getMonth(dObj)
      );
      for (var i = 0; i < daysInMonth; i += 1) {
        days.push({
          date: this.utils.getDate(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedDate(dObj),
          isDisabled: this.isDisabledDate(dObj),
          isHighlighted: this.isHighlightedDate(dObj),
          isHighlightStart: this.isHighlightStart(dObj),
          isHighlightEnd: this.isHighlightEnd(dObj),
          isToday: this.utils.compareDates(dObj, new Date()),
          isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
          isSaturday: this.utils.getDay(dObj) === 6,
          isSunday: this.utils.getDay(dObj) === 0,
        });
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }
      return days
    },
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    currMonthName: function currMonthName() {
      var monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName)
    },
    /**
     * Gets the name of the year that current page is on
     * @return {Number}
     */
    currYearName: function currYearName() {
      var ref = this.translation;
      var yearSuffix = ref.yearSuffix;
      return ("" + (this.utils.getFullYear(this.pageDate)) + yearSuffix)
    },
    /**
     * Is this translation using year/month/day format?
     * @return {Boolean}
     */
    isYmd: function isYmd() {
      return this.translation.ymd && this.translation.ymd === true
    },
  },
  methods: {
    /**
     * Emits a selectDate event
     * @param {Object} date
     */
    selectDate: function selectDate(date) {
      if (date.isDisabled) {
        this.$emit('selected-disabled', date);
        return false
      }
      this.$emit('select-date', date);
      return true
    },
    /**
     * @return {Number}
     */
    getPageMonth: function getPageMonth() {
      return this.utils.getMonth(this.pageDate)
    },
    /**
     * Change the page month
     * @param {Number} incrementBy
     */
    changeMonth: function changeMonth(incrementBy) {
      var date = this.pageDate;
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('changed-month', date);
    },
    /**
     * Decrement the page month
     */
    previousMonth: function previousMonth() {
      if (!this.isPreviousDisabled()) {
        this.changeMonth(-1);
      }
    },
    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */
    isPreviousDisabled: function isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false
      }
      var d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d)
        && this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d)
    },
    /**
     * Increment the current page month
     */
    nextMonth: function nextMonth() {
      if (!this.isNextDisabled()) {
        this.changeMonth(+1);
      }
    },
    /**
     * Is the next month disabled?
     * @return {Boolean}
     */
    isNextDisabled: function isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false
      }
      var d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d)
        && this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d)
    },
    /**
     * Whether a day is selected
     * @param {Date} dObj to check if selected
     * @return {Boolean}
     */
    isSelectedDate: function isSelectedDate(dObj) {
      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj)
    },
    /**
     * Whether a day is disabled
     * @param {Date} date to check if disabled
     * @return {Boolean}
     */
    isDisabledDate: function isDisabledDate(date) {
      return isDateDisabled(date, this.disabledDates, this.utils)
    },
    /**
     * Whether a day is highlighted
     * (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date} date to check if highlighted
     * @return {Boolean}
     */
    isHighlightedDate: function isHighlightedDate(date) {
      var this$1 = this;

      var dateWithoutTime = this.utils.resetDateTime(date);
      if (
        !(this.highlighted && this.highlighted.includeDisabled)
        && this.isDisabledDate(dateWithoutTime)
      ) {
        return false
      }

      var highlighted = false;

      if (typeof this.highlighted === 'undefined') {
        return false
      }

      if (typeof this.highlighted.dates !== 'undefined') {
        this.highlighted.dates.forEach(function (d) {
          if (this$1.utils.compareDates(dateWithoutTime, d)) {
            highlighted = true;
          }
        });
      }

      if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
        highlighted = dateWithoutTime >= this.highlighted.from
          && dateWithoutTime <= this.highlighted.to;
      }

      if (
        typeof this.highlighted.days !== 'undefined'
        && this.highlighted.days.indexOf(this.utils.getDay(dateWithoutTime)) !== -1
      ) {
        highlighted = true;
      }

      if (
        typeof this.highlighted.daysOfMonth !== 'undefined'
        && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(dateWithoutTime)) !== -1
      ) {
        highlighted = true;
      }

      if (
        typeof this.highlighted.customPredictor === 'function'
        && this.highlighted.customPredictor(dateWithoutTime)
      ) {
        highlighted = true;
      }

      return highlighted
    },
    /**
     * set the class for a specific day
     * @param {Object} day
     * @return {Object}
     */
    dayClasses: function dayClasses(day) {
      return {
        selected: day.isSelected,
        disabled: day.isDisabled,
        highlighted: day.isHighlighted,
        today: day.isToday,
        weekend: day.isWeekend,
        sat: day.isSaturday,
        sun: day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd,
      }
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date} date start highlight
     * @return {Boolean}
     */
    isHighlightStart: function isHighlightStart(date) {
      return this.isHighlightedDate(date)
        && (this.highlighted.from instanceof Date)
        && (this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date))
        && (this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date))
        && (this.utils.getDate(this.highlighted.from) === this.utils.getDate(date))
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date} date end highlight
     * @return {Boolean}
     */
    isHighlightEnd: function isHighlightEnd(date) {
      return this.isHighlightedDate(date)
        && (this.highlighted.to instanceof Date)
        && (this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date))
        && (this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date))
        && (this.utils.getDate(this.highlighted.to) === this.utils.getDate(date))
    },
    /**
     * Helper
     * @param  {all}  prop
     * @return {Boolean}
     */
    isDefined: function isDefined(prop) {
      return typeof prop !== 'undefined' && prop
    },
  },
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderDay"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextMonth,
            previous: _vm.previousMonth
          }
        },
        [
          _c(
            "span",
            {
              staticClass: "day__month_btn",
              class: _vm.allowedToShowView("month") ? "up" : "",
              attrs: { slot: "headerContent" },
              on: {
                click: function($event) {
                  return _vm.showPickerCalendar("month")
                }
              },
              slot: "headerContent"
            },
            [
              _vm._v(
                "\n      " +
                  _vm._s(_vm.isYmd ? _vm.currYearName : _vm.currMonthName) +
                  " " +
                  _vm._s(_vm.isYmd ? _vm.currMonthName : _vm.currYearName) +
                  "\n    "
              )
            ]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.isRtl ? "flex-rtl" : "" },
        [
          _vm._l(_vm.daysOfWeek, function(d) {
            return _c(
              "span",
              { key: d.timestamp, staticClass: "cell day-header" },
              [_vm._v("\n      " + _vm._s(d[0]) + "\n    ")]
            )
          }),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _vm.blankDays > 0
            ? _vm._l(_vm.blankDays, function(d) {
                return _c("span", {
                  key: d.timestamp,
                  staticClass: "cell day blank"
                })
              })
            : _vm._e(),
          _vm._l(_vm.days, function(day) {
            return _c("span", {
              key: day.timestamp,
              staticClass: "cell day",
              class: _vm.dayClasses(day),
              domProps: { innerHTML: _vm._s(_vm.dayCellContent(day)) },
              on: {
                click: function($event) {
                  return _vm.selectDate(day)
                }
              }
            })
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "PickerFooter",
        {
          attrs: {
            config: _vm.footerConfig,
            next: _vm.nextMonth,
            previous: _vm.previousMonth
          }
        },
        [
          _c(
            "span",
            {
              staticClass: "day__month_btn up",
              attrs: { slot: "footerContent" },
              on: {
                click: function($event) {
                  _vm.$emit("select-date", { timestamp: Date.now() });
                }
              },
              slot: "footerContent"
            },
            [_vm._v("\n      " + _vm._s(_vm.translation.today) + "\n    ")]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("calendarFooterDay")
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$6 = {
  name: 'DatepickerMonthView',
  mixins: [
    __vue_component__$3 ],
  computed: {
    /**
     * set an object with all months
     * @return {Object[]}
     */
    months: function months() {
      var d = this.pageDate;
      var months = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate()))
        : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
      for (var i = 0; i < 12; i += 1) {
        months.push({
          month: this.utils.getMonthName(i, this.translation.months),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedMonth(dObj),
          isDisabled: this.isDisabledMonth(dObj),
        });
        this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
      }
      return months
    },
    /**
     * Get year name on current page.
     * @return {String}
     */
    pageYearName: function pageYearName() {
      var ref = this.translation;
      var yearSuffix = ref.yearSuffix;
      return ("" + (this.utils.getFullYear(this.pageDate)) + yearSuffix)
    },
  },
  methods: {
    /**
     * Emits a selectMonth event
     * @param {Object} month
     */
    selectMonth: function selectMonth(month) {
      if (!month.isDisabled) {
        this.$emit('select-month', month);
        return true
      }
      return false
    },
    /**
     * Changes the year up or down
     * @param {Number} incrementBy
     */
    changeYear: function changeYear(incrementBy) {
      var date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changed-year', date);
    },
    /**
     * Decrements the year
     */
    previousYear: function previousYear() {
      if (!this.isPreviousDisabled()) {
        this.changeYear(-1);
      }
    },
    /**
     * Checks if the previous year is disabled or not
     * @return {Boolean}
     */
    isPreviousDisabled: function isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false
      }
      return this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(this.pageDate)
    },
    /**
     * Increments the year
     */
    nextYear: function nextYear() {
      if (!this.isNextDisabled()) {
        this.changeYear(1);
      }
    },
    /**
     * Checks if the next year is disabled or not
     * @return {Boolean}
     */
    isNextDisabled: function isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false
      }
      return this.utils.getFullYear(
        this.disabledDates.from
      ) <= this.utils.getFullYear(this.pageDate)
    },
    /**
     * Whether the selected date is in this month
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedMonth: function isSelectedMonth(date) {
      return (this.selectedDate
        && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date)
        && this.utils.getMonth(this.selectedDate) === this.utils.getMonth(date))
    },
    /**
     * Whether a month is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledMonth: function isDisabledMonth(date) {
      return isMonthDisabled(date, this.disabledDates, this.utils)
    },
  },
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderMonth"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextYear,
            previous: _vm.previousYear
          }
        },
        [
          _c(
            "span",
            {
              staticClass: "month__year_btn",
              class: _vm.allowedToShowView("year") ? "up" : "",
              attrs: { slot: "headerContent" },
              on: {
                click: function($event) {
                  return _vm.showPickerCalendar("year")
                }
              },
              slot: "headerContent"
            },
            [_vm._v("\n      " + _vm._s(_vm.pageYearName) + "\n    ")]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _vm._l(_vm.months, function(month) {
        return _c(
          "span",
          {
            key: month.timestamp,
            staticClass: "cell month",
            class: { selected: month.isSelected, disabled: month.isDisabled },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.selectMonth(month)
              }
            }
          },
          [_vm._v("\n    " + _vm._s(month.month) + "\n  ")]
        )
      }),
      _vm._v(" "),
      _vm._t("calendarFooterMonth")
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$7 = {
  name: 'DatepickerYearView',
  mixins: [
    __vue_component__$3 ],
  computed: {
    /**
     * set an object with years for a decade
     * @return {Object[]}
     */
    years: function years() {
      var d = this.pageDate;
      var years = [];
      // set up a new date object to the beginning of the current 'page'7
      var dObj = this.useUtc
        ? new Date(
          Date.UTC(Math.floor(d.getUTCFullYear() / 10) * 10, d.getUTCMonth(), d.getUTCDate())
        )
        : new Date(
          Math.floor(
            d.getFullYear() / 10
          ) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()
        );
      for (var i = 0; i < 10; i += 1) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj),
        });
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
      }
      return years
    },
    /**
     * Get decade name on current page.
     * @return {String}
     */
    getPageDecade: function getPageDecade() {
      var decadeStart = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10;
      var decadeEnd = decadeStart + 9;
      var ref = this.translation;
      var yearSuffix = ref.yearSuffix;
      return (decadeStart + " - " + decadeEnd + yearSuffix)
    },
  },
  methods: {
    /**
     * Emits a selectYear event
     * @param {Object} year
     */
    selectYear: function selectYear(year) {
      if (!year.isDisabled) {
        this.$emit('select-year', year);
        return true
      }
      return false
    },
    /**
     * Changes the year up or down
     * @param {Number} incrementBy
     */
    changeYear: function changeYear(incrementBy) {
      var date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changed-decade', date);
    },
    /**
     * Decrements the decade
     */
    previousDecade: function previousDecade() {
      if (!this.isPreviousDisabled()) {
        this.changeYear(-10);
        return true
      }
      return false
    },
    /**
     * Checks if the next year is disabled or not
     * @return {Boolean}
     */
    isPreviousDisabled: function isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false
      }
      return Math.floor(this.utils.getFullYear(this.disabledDates.to) / 10) * 10
        >= Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10
    },
    /**
     * Increments the decade
     */
    nextDecade: function nextDecade() {
      if (!this.isNextDisabled()) {
        this.changeYear(10);
        return true
      }
      return false
    },
    /**
     * Checks if the next decade is disabled or not
     * @return {Boolean}
     */
    isNextDisabled: function isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false
      }
      return Math.ceil(this.utils.getFullYear(this.disabledDates.from) / 10) * 10
        <= Math.ceil(this.utils.getFullYear(this.pageDate) / 10) * 10
    },

    /**
     * Whether the selected date is in this year
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedYear: function isSelectedYear(date) {
      return this.selectedDate
        && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date)
    },
    /**
     * Whether a year is disabled
     * @param {Date} date
     * @return {Boolean}
     */
    isDisabledYear: function isDisabledYear(date) {
      return isYearDisabled(date, this.disabledDates, this.utils)
    },
  },
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderYear"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextDecade,
            previous: _vm.previousDecade
          }
        },
        [
          _c(
            "span",
            { attrs: { slot: "headerContent" }, slot: "headerContent" },
            [_vm._v("\n      " + _vm._s(_vm.getPageDecade) + "\n    ")]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _vm._l(_vm.years, function(year) {
        return _c(
          "span",
          {
            key: year.timestamp,
            staticClass: "cell year",
            class: { selected: year.isSelected, disabled: year.isDisabled },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.selectYear(year)
              }
            }
          },
          [_vm._v("\n    " + _vm._s(year.year) + "\n  ")]
        )
      }),
      _vm._v(" "),
      _vm._t("calendarFooterYear")
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$8 = {
  name: 'Datepicker',
  components: {
    DateInput: __vue_component__$1,
    PickerDay: __vue_component__$5,
    PickerMonth: __vue_component__$6,
    PickerYear: __vue_component__$7,
  },
  mixins: [
    __vue_component__ ],
  props: {
    calendarClass: {
      type: [
        String,
        Object,
        Array ],
      default: '',
    },
    dayCellContent: {
      type: Function,
      default: function (day) { return day.date; },
    },
    disabledDates: {
      type: Object,
      default: function default$1() {
        return {}
      },
    },
    fixedPosition: {
      type: String,
      default: '',
      validator: function (val) { return val === ''
        || val === 'bottom'
        || val === 'bottom-left'
        || val === 'bottom-right'
        || val === 'top'
        || val === 'top-left'
        || val === 'top-right'; },
    },
    fullMonthName: {
      type: Boolean,
      default: false,
    },
    highlighted: {
      type: Object,
      default: function default$2() {
        return {}
      },
    },
    initialView: {
      type: String,
      default: '',
    },
    language: {
      type: Object,
      default: function () { return en; },
    },
    maximumView: {
      type: String,
      default: 'year',
    },
    minimumView: {
      type: String,
      default: 'day',
    },
    mondayFirst: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [
        String,
        Date,
        Number ],
      default: '',
      validator:
        function (val) { return val === null
          || val instanceof Date
          || typeof val === 'string'
          || typeof val === 'number'; },
    },
    wrapperClass: {
      type: [
        String,
        Object,
        Array ],
      default: '',
    },
  },
  data: function data() {
    // const startDate = this.openDate ? new Date(this.openDate) : new Date()
    var constructedDateUtils = makeDateUtils(this.useUtc);
    var startDate;
    if (this.openDate) {
      startDate = constructedDateUtils.getNewDateObject(this.openDate);
    } else {
      startDate = constructedDateUtils.getNewDateObject();
    }
    var pageTimestamp = constructedDateUtils.setDate(startDate, 1);
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp: pageTimestamp,
      currentPicker: '',
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: constructedDateUtils.getNewDateObject(),
      utils: constructedDateUtils,
    }
  },
  computed: {
    computedInitialView: function computedInitialView() {
      if (!this.initialView) {
        return this.minimumView
      }

      return this.initialView
    },
    pageDate: function pageDate() {
      return new Date(this.pageTimestamp)
    },

    translation: function translation() {
      return this.language
    },

    isOpen: function isOpen() {
      return this.currentPicker !== ''
    },
    isInline: function isInline() {
      return !!this.inline
    },
    isRtl: function isRtl() {
      return this.translation.rtl === true
    },
  },
  watch: {
    value: function value(value$1) {
      this.setValue(value$1);
    },
    openDate: function openDate() {
      this.setPageDate();
    },
    initialView: function initialView() {
      this.setInitialView();
    },
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    setPickerPosition: function setPickerPosition() {
      var this$1 = this;

      this.$nextTick(function () {
        var calendar = this$1.$refs.datepicker;
        if (calendar) {
          if (this$1.currentPicker) {
            var parent = calendar.parentElement;
            var calendarBounding = calendar.getBoundingClientRect();
            var outOfBoundsRight = calendarBounding.right > window.innerWidth;
            var outOfBoundsBottom = calendarBounding.bottom > window.innerHeight;
            var parentHeight = (parent.getBoundingClientRect().height) + "px";

            if (this$1.fixedPosition === '') {
              if (outOfBoundsRight) {
                calendar.style.right = 0;
              } else {
                calendar.style.right = 'unset';
              }

              if (outOfBoundsBottom) {
                calendar.style.bottom = parentHeight;
              } else {
                calendar.style.bottom = 'unset';
              }
            } else {
              if (this$1.fixedPosition.indexOf('right') !== -1) {
                calendar.style.right = 0;
              } else {
                calendar.style.right = 'unset';
              }
              if (this$1.fixedPosition.indexOf('top') !== -1) {
                calendar.style.bottom = parentHeight;
              } else {
                calendar.style.bottom = 'unset';
              }
            }
          } else {
            calendar.style.right = 'unset';
            calendar.style.bottom = 'unset';
          }
        }
      });
    },
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate: function resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate();
        return
      }
      this.setPageDate(this.selectedDate);
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar: function showCalendar() {
      if (this.disabled || this.isInline) {
        return false
      }
      if (this.isOpen) {
        return this.close(true)
      }
      this.setInitialView();
      if (!this.isInline) {
        this.setPickerPosition();
        this.$emit('opened');
      }
      return true
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView: function setInitialView() {
      var initialView = this.computedInitialView;
      if (!this.allowedToShowView(initialView)) {
        throw new Error(("initialView '" + (this.initialView) + "' cannot be rendered based on minimum '" + (this.minimumView) + "' and maximum '" + (this.maximumView) + "'"))
      }
      switch (initialView) {
        case 'year':
          this.showSpecificCalendar('Year');
          break
        case 'month':
          this.showSpecificCalendar('Month');
          break
        default:
          this.showSpecificCalendar('Day');
          break
      }
    },
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView: function allowedToShowView(view) {
      var views = [
        'day',
        'month',
        'year' ];
      var minimumViewIndex = views.indexOf(this.minimumView);
      var maximumViewIndex = views.indexOf(this.maximumView);
      var viewIndex = views.indexOf(view);

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    /**
     * Show a specific picker
     * @return {Boolean}
     */
    showSpecificCalendar: function showSpecificCalendar(type) {
      if (type) {
        if (!this.allowedToShowView(type.toLowerCase())) {
          return false
        }
        this.close();
        this.currentPicker = "Picker" + type;
        return true
      }
      this.currentPicker = '';
      return false
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate: function setDate(timestamp) {
      var date = new Date(timestamp);
      this.selectedDate = date;
      this.setPageDate(date);
      this.$emit('selected', date);
      this.$emit('input', date);
    },
    /**
     * Clear the selected date
     */
    clearDate: function clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },
    /**
     * @param {Object} date
     */
    selectDate: function selectDate(date) {
      this.setDate(date.timestamp);
      if (!this.isInline) {
        this.close(true);
      }
      this.resetTypedDate = this.utils.getNewDateObject();
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate: function selectDisabledDate(date) {
      this.$emit('selected-disabled', date);
    },
    /**
     * @param {Object} month
     */
    selectMonth: function selectMonth(month) {
      var date = new Date(month.timestamp);
      if (this.allowedToShowView('day')) {
        this.setPageDate(date);
        this.$emit('changed-month', month);
        this.showSpecificCalendar('Day');
      } else {
        this.selectDate(month);
      }
    },
    /**
     * @param {Object} year
     */
    selectYear: function selectYear(year) {
      var date = new Date(year.timestamp);
      if (this.allowedToShowView('month')) {
        this.setPageDate(date);
        this.$emit('changed-year', year);
        this.showSpecificCalendar('Month');
      } else {
        this.selectDate(year);
      }
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue: function setValue(date) {
      var dateTemp = date;
      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
        var parsed = new Date(dateTemp);
        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed;
      }
      if (!dateTemp) {
        this.setPageDate();
        this.selectedDate = null;
        return
      }
      this.selectedDate = dateTemp;
      this.setPageDate(dateTemp);
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate: function setPageDate(date) {
      var dateTemp = date;
      if (!dateTemp) {
        if (this.openDate) {
          dateTemp = new Date(this.openDate);
        } else {
          dateTemp = new Date();
        }
        dateTemp = this.utils.resetDateTime(dateTemp);
      }
      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1);
    },
    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker: function handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date);
      this.$emit('changed-month', date);
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate: function setTypedDate(date) {
      this.setDate(date.getTime());
    },
    /**
     * Close all calendar layers
     * @param {Boolean} full - emit close event
     */
    close: function close(full) {
      if ( full === void 0 ) full = false;

      this.showSpecificCalendar();
      if (!this.isInline) {
        if (full) {
          this.$emit('closed');
        }
      }
    },
    /**
     * Initiate the component
     */
    init: function init() {
      if (this.value) {
        this.setValue(this.value);
      }
      if (this.isInline) {
        this.setInitialView();
      }
    },
    onBlur: function onBlur() {
      this.$emit('blur');
    },
    onFocus: function onFocus() {
      this.$emit('focus');
    },
  },
};

/* script */
var __vue_script__$8 = script$8;
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vdp-datepicker",
      class: [_vm.wrapperClass, _vm.isRtl ? "rtl" : ""]
    },
    [
      _c(
        "DateInput",
        {
          attrs: {
            id: _vm.id,
            "selected-date": _vm.selectedDate,
            "reset-typed-date": _vm.resetTypedDate,
            format: _vm.format,
            parser: _vm.parser,
            translation: _vm.translation,
            inline: _vm.inline,
            name: _vm.name,
            "ref-name": _vm.refName,
            "open-date": _vm.openDate,
            placeholder: _vm.placeholder,
            "input-class": _vm.inputClass,
            typeable: _vm.typeable,
            "clear-button": _vm.clearButton,
            "clear-button-icon": _vm.clearButtonIcon,
            "calendar-button": _vm.calendarButton,
            "calendar-button-icon": _vm.calendarButtonIcon,
            "calendar-button-icon-content": _vm.calendarButtonIconContent,
            disabled: _vm.disabled,
            required: _vm.required,
            autofocus: _vm.autofocus,
            maxlength: _vm.maxlength,
            pattern: _vm.pattern,
            "bootstrap-styling": _vm.bootstrapStyling,
            "use-utc": _vm.useUtc,
            "show-calendar-on-focus": _vm.showCalendarOnFocus,
            tabindex: _vm.tabindex,
            "show-calendar-on-button-click": _vm.showCalendarOnButtonClick
          },
          on: {
            "show-calendar": _vm.showCalendar,
            "close-calendar": function($event) {
              return _vm.close(true)
            },
            "typed-date": _vm.setTypedDate,
            "clear-date": _vm.clearDate,
            blur: _vm.onBlur,
            focus: _vm.onFocus
          }
        },
        [
          _vm._t("beforeDateInput", null, { slot: "beforeDateInput" }),
          _vm._v(" "),
          _vm._t("afterDateInput", null, { slot: "afterDateInput" })
        ],
        2
      ),
      _vm._v(" "),
      _vm.isOpen
        ? [
            _c(
              "div",
              {
                ref: "datepicker",
                class: [
                  _vm.calendarClass,
                  "vdp-datepicker__calendar",
                  _vm.isInline && "inline"
                ],
                on: {
                  mousedown: function($event) {
                    $event.preventDefault();
                  }
                }
              },
              [
                _vm._t("beforeCalendarHeader"),
                _vm._v(" "),
                _c(
                  _vm.currentPicker,
                  {
                    tag: "component",
                    attrs: {
                      "page-date": _vm.pageDate,
                      "selected-date": _vm.selectedDate,
                      "allowed-to-show-view": _vm.allowedToShowView,
                      "disabled-dates": _vm.disabledDates,
                      highlighted: _vm.highlighted,
                      translation: _vm.translation,
                      "page-timestamp": _vm.pageTimestamp,
                      "is-rtl": _vm.isRtl,
                      "use-utc": _vm.useUtc,
                      "show-header": _vm.showHeader,
                      "show-footer": _vm.showFooter,
                      "full-month-name": _vm.fullMonthName,
                      "monday-first": _vm.mondayFirst,
                      "day-cell-content": _vm.dayCellContent
                    },
                    on: {
                      "select-date": _vm.selectDate,
                      "changed-month": _vm.handleChangedMonthFromDayPicker,
                      "selected-disabled": _vm.selectDisabledDate,
                      "select-month": _vm.selectMonth,
                      "changed-year": _vm.setPageDate,
                      "show-month-calendar": function($event) {
                        return _vm.showSpecificCalendar("Month")
                      },
                      "select-year": _vm.selectYear,
                      "changed-decade": _vm.setPageDate,
                      "show-year-calendar": function($event) {
                        return _vm.showSpecificCalendar("Year")
                      }
                    }
                  },
                  [
                    _vm._t("beforeCalendarHeaderDay", null, {
                      slot: "beforeCalendarHeaderDay"
                    }),
                    _vm._v(" "),
                    _vm._t("calendarFooterDay", null, {
                      slot: "calendarFooterDay"
                    }),
                    _vm._v(" "),
                    _vm._t("beforeCalendarHeaderMonth", null, {
                      slot: "beforeCalendarHeaderMonth"
                    }),
                    _vm._v(" "),
                    _vm._t("calendarFooterMonth", null, {
                      slot: "calendarFooterMonth"
                    }),
                    _vm._v(" "),
                    _vm._t("beforeCalendarHeaderYear", null, {
                      slot: "beforeCalendarHeaderYear"
                    }),
                    _vm._v(" "),
                    _vm._t("calendarFooterYear", null, {
                      slot: "calendarFooterYear"
                    }),
                    _vm._v(" "),
                    _vm._t("nextIntervalBtn", null, {
                      slot: "nextIntervalBtn"
                    }),
                    _vm._v(" "),
                    _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
                  ],
                  2
                ),
                _vm._v(" "),
                _vm._t("calendarFooter")
              ],
              2
            )
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$8;
