'use strict';

var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Node = (function () {
  function Node(startPosition, endPosition) {
    if (startPosition === void 0) { startPosition = -1; }
    if (endPosition === void 0) { endPosition = -1; }
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }
  return Node;
} ());
module.exports.Node = Node;

var Scalar = (function (_super) {
  __extends(Scalar, _super);
  function Scalar(startPosition, endPosition, value, type) {
    if (startPosition === void 0) { startPosition = -1; }
    if (endPosition === void 0) { endPosition = -1; }
    _super.call(this, startPosition, endPosition);
    this.value = value;
    this.type = type;
  }
  Scalar.prototype.toJSON = function () {
    return this.value;
  };
  return Scalar;
} (Node));
module.exports.Scalar = Scalar;

var Sequence = (function (_super) {
  __extends(Sequence, _super);
  function Sequence(startPosition, endPosition, items) {
    if (startPosition === void 0) { startPosition = -1; }
    if (endPosition === void 0) { endPosition = -1; }
    if (items === void 0) { items = []; }
    _super.call(this, startPosition, endPosition);
    this.items = items;
  }
  Sequence.prototype.toJSON = function () {
    return this.items.map(function (item) {
      return item.toJSON();
    });
  };
  return Sequence;
} (Node));
module.exports.Sequence = Sequence;

var Map = (function (_super) {
  __extends(Map, _super);
  function Map(startPosition, endPosition, mappings) {
    if (startPosition === void 0) { startPosition = -1; }
    if (endPosition === void 0) { endPosition = -1; }
    if (mappings === void 0) { mappings = []; }
    _super.call(this, startPosition, endPosition);
    this.mappings = mappings;
  }
  Map.prototype.toJSON = function () {
    var map = {};
    this.mappings.forEach(function (mapping) {
      map[mapping.key.toJSON()] = mapping.value.toJSON();
    });
    return map;
  };
  return Map;
} (Node));
module.exports.Map = Map;

var Mapping = (function (_super) {
  __extends(Mapping, _super);
  function Mapping(startPosition, endPosition, key, value) {
    if (startPosition === void 0) { startPosition = -1; }
    if (endPosition === void 0) { endPosition = -1; }
    endPosition = (value ? value.endPosition : key.endPosition + 1);
    _super.call(this, startPosition, endPosition);
    this.key = key;
    this.value = value;
  }
  Mapping.prototype.toJSON = function () {
    var mapping = {};
    mapping[this.key.toJSON()] = this.value.toJSON();
    return mapping;
  };
  return Mapping;
} (Node));
module.exports.Mapping = Mapping;
