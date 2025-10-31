/*!
  * Simple-Jekyll-Search v1.7.2 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2018, Christian Fei
  * Licensed under the MIT License.
  */

(function(){
/* globals ActiveXObject:false */

'use strict'

var _$JSONLoader_2 = {
  load: load
}

function load (location, callback) {
  var xhr = getXHR()
  xhr.open('GET', location, true)
  xhr.onreadystatechange = createStateChangeListener(xhr, callback)
  xhr.send()
}

function createStateChangeListener (xhr, callback) {
  return function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        callback(null, JSON.parse(xhr.responseText))
      } catch (err) {
        callback(err, null)
      }
    }
  }
}

function getXHR () {
  return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
}

'use strict'

var _$OptionsValidator_3 = function OptionsValidator (params) {
  if (!validateParams(params)) {
    throw new Error('-- OptionsValidator: required options missing')
  }

  if (!(this instanceof OptionsValidator)) {
    return new OptionsValidator(params)
  }

  var requiredOptions = params.required

  this.getRequiredOptions = function () {
    return requiredOptions
  }

  this.validate = function (parameters) {
    var errors = []
    requiredOptions.forEach(function (requiredOptionName) {
      if (typeof parameters[requiredOptionName] === 'undefined') {
        errors.push(requiredOptionName)
      }
    })
    return errors
  }

  function validateParams (params) {
    if (!params) {
      return false
    }
    return typeof params.required !== 'undefined' && params.required instanceof Array
  }
}

'use strict';

function fuzzysearch (needle, haystack) {
  var haystackLength = haystack.length;
  var needleLength = needle.length;
  if (needleLength > haystackLength) {
    return false;
  }
  if (needleLength === haystackLength) {
    return needle === haystack;
  }
  outer: for (var needleIndex = 0, haystackIndex = 0; needleIndex < needleLength; needleIndex++) {
    var needleChar = needle.charCodeAt(needleIndex);
    while (haystackIndex < haystackLength) {
      if (haystack.charCodeAt(haystackIndex++) === needleChar) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

var _$fuzzysearch_1 = fuzzysearch;

'use strict'

/* removed: var _$fuzzysearch_1 = require('fuzzysearch') */;

var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy()

function FuzzySearchStrategy () {
  this.matches = function (string, searchTerm) {
    return _$fuzzysearch_1(searchTerm.toLowerCase(), string.toLowerCase())
  }
}

'use strict'

var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy()

function LiteralSearchStrategy () {
  this.matches = function (string, searchTerm) {
    if (!string) return false

    string = string.trim().toLowerCase()
    searchTerm = searchTerm.trim().toLowerCase()

    return searchTerm.split(' ').filter(function (word) {
      return string.indexOf(word) >= 0
    }).length === searchTerm.split(' ').length
  }
}

'use strict'

var _$Repository_4 = {
  put: put,
  clear: clear,
  search: search,
  setOptions: setOptions
}

/* removed: var _$FuzzySearchStrategy_5 = require('./SearchStrategies/FuzzySearchStrategy') */;
/* removed: var _$LiteralSearchStrategy_6 = require('./SearchStrategies/LiteralSearchStrategy') */;

function NoSort () {
  return 0
}

var data = []
var options = {}

options.fuzzy = false
options.limit = 10
options.searchStrategy = options.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
options.sort = NoSort

function put (data) {
  if (isObject(data)) {
    return addObject(data)
  }
  if (isArray(data)) {
    return addArray(data)
  }
  return undefined
}
function clear () {
  data.length = 0
  return data
}

function isObject (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject (_data) {
  data.push(_data)
  return data
}

function addArray (dataArray) {
  var added = []
  clear()
  for (var i = 0, length = dataArray.length; i < length; i++) {
    if (isObject(dataArray[i])) {
      added.push(addObject(dataArray[i]))
    }
  }
  return added
}

function search (searchTerm) {
  if (!searchTerm) {
    return []
  }
  return findMatches(data, searchTerm, options.searchStrategy, options).sort(options.sort)
}

function setOptions (newOptions) {
  newOptions = newOptions || {}

  options.fuzzy = newOptions.fuzzy || false
  options.limit = newOptions.limit || 10
  options.searchStrategy = newOptions.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
  options.sort = newOptions.sort || NoSort
}

function findMatches (data, searchTerm, strategy, options) {
  var matches = []
  for (var i = 0; i < data.length && matches.length < options.limit; i++) {
    var match = findMatchesInObject(data[i], searchTerm, strategy, options)
    if (match) {
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject (object, searchTerm, strategy, options) {
  for (var key in object) {
    if (!isExcluded(object[key], options.exclude) && strategy.matches(object[key], searchTerm)) {
      return object
    }
  }
}

function isExcluded (term, excludedTerms) {
  var excluded = false
  excludedTerms = excludedTerms || []
  for (var i = 0, length = excludedTerms.length; i < length; i++) {
    var excludedTerm = excludedTerms[i]
    if (!excluded && new RegExp(term).test(excludedTerm)) {
      excluded = true
    }
  }
  return excluded
}

'use strict'

var _$Templater_7 = {
  compile: compile,
  setOptions: __setOptions_7
}

var options = {}
options.pattern = /\{(.*?)\}/g
options.template = ''
options.middleware = function () {}

function __setOptions_7 (_options) {
  options.pattern = _options.pattern || options.pattern
  options.template = _options.template || options.template
  if (typeof _options.middleware === 'function') {
    options.middleware = _options.middleware
  }
}

function compile (data) {
  return options.template.replace(options.pattern, function (match, prop) {
    var value = options.middleware(prop, data[prop], options.template)
    if (typeof value !== 'undefined') {
      return value
    }
    return data[prop] || match
  })
}

'use strict'

var _$utils_9 = {
  merge: merge,
  isJSON: isJSON
}

function merge (defaultParams, mergeParams) {
  var mergedOptions = {}
  for (var option in defaultParams) {
    mergedOptions[option] = defaultParams[option]
    if (typeof mergeParams[option] !== 'undefined') {
      mergedOptions[option] = mergeParams[option]
    }
  }
  return mergedOptions
}

function isJSON (json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

var _$src_8 = {};
(function (window) {
  'use strict'

  var options = {
    searchInput: null,
    resultsContainer: null,
    json: [],
    success: Function.prototype,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware: Function.prototype,
    sortMiddleware: function () {
      return 0
    },
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  }

  var requiredOptions = ['searchInput', 'resultsContainer', 'json']

  /* removed: var _$Templater_7 = require('./Templater') */;
  /* removed: var _$Repository_4 = require('./Repository') */;
  /* removed: var _$JSONLoader_2 = require('./JSONLoader') */;
  var optionsValidator = _$OptionsValidator_3({
    required: requiredOptions
  })
  /* removed: var _$utils_9 = require('./utils') */;

  window.SimpleJekyllSearch = function (_options) {
    var errors = optionsValidator.validate(_options)
    if (errors.length > 0) {
      throwError('You must specify the following required options: ' + requiredOptions)
    }

    options = _$utils_9.merge(options, _options)

    _$Templater_7.setOptions({
      template: options.searchResultTemplate,
      middleware: options.templateMiddleware
    })

    _$Repository_4.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit,
      sort: options.sortMiddleware
    })

    if (_$utils_9.isJSON(options.json)) {
      initWithJSON(options.json)
    } else {
      initWithURL(options.json)
    }

    return {
      search: search
    }
  }

  function initWithJSON (json) {
    options.success(json)
    _$Repository_4.put(json)
    registerInput()
  }

  function initWithURL (url) {
    _$JSONLoader_2.load(url, function (err, json) {
      if (err) {
        throwError('failed to get JSON (' + url + ')')
      }
      initWithJSON(json)
    })
  }

  function emptyResultsContainer () {
    options.resultsContainer.innerHTML = ''
  }

  function appendToResultsContainer (text) {
    options.resultsContainer.innerHTML += text
  }

  function registerInput () {
    options.searchInput.addEventListener('keyup', function (e) {
      if (isWhitelistedKey(e.which)) {
        emptyResultsContainer()
        search(e.target.value)
      }
    })
  }

  function search (query) {
    if (isValidQuery(query)) {
      emptyResultsContainer()
      render(_$Repository_4.search(query), query)
    }
  }

  function render (results, query) {
    var length = results.length
    if (length === 0) {
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < length; i++) {
      results[i].query = query
      appendToResultsContainer(_$Templater_7.compile(results[i]))
    }
  }

  function isValidQuery (query) {
    return query && query.length > 0
  }

  function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
  }

  function throwError (message) {
    throw new Error('SimpleJekyllSearch --- ' + message)
  }
})(window)

}());
