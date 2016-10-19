'use strict';

function Node(startPosition, endPosition) {
  if (typeof startPosition === 'undefined') {
    startPosition = -1;
  }
  if (typeof endPosition === 'undefined') {
    endPosition = -1;
  }
  this.startPosition = startPosition;
  this.endPosition = endPosition;
}


function Scalar(startPosition, endPosition, value, type) {
  Node.call(this, startPosition, endPosition);
  this.value = value;
  this.type = type;
}

Scalar.prototype = Object.create(Node.prototype);
Scalar.prototype.constructor = Scalar;

Scalar.prototype.toJSON = function () {
  return this.value;
};


function Sequence(startPosition, endPosition, items) {
  Node.call(this, startPosition, endPosition);
  this.items = items || [];
}

Sequence.prototype = Object.create(Node.prototype);
Sequence.prototype.constructor = Sequence;

Sequence.prototype.toJSON = function () {
  return this.items.map(function (item) {
    return item.toJSON();
  });
};

Sequence.prototype.addMapping = function (mapping) {
  this.items.push(mapping);
};


function Map(startPosition, endPosition, mappings) {
  Node.call(this, startPosition, endPosition);
  this.mappings = mappings || [];
  this._keys = [];
}

Map.prototype = Object.create(Node.prototype);
Map.prototype.constructor = Map;

Map.prototype.toJSON = function () {
  var map = {};
  this.mappings.forEach(function (mapping) {
    map[mapping.key.toJSON()] = mapping.value.toJSON();
  });
  return map;
};

Map.prototype.addMapping = function (mapping) {
  this.mappings.push(mapping);
  this._keys.push(mapping.key);
};

Map.prototype.mergeMappings = function (map) {
  map.mappings.forEach(function (mapping) {
    if (this._keys.indexOf(mapping.key) === -1) {
      this.mappings.push(mapping);
      this._keys.push(mapping.key);
    }
  }, this);
};


function Mapping(key, value) {
  Node.call(this, key.startPosition, value.endPosition);
  this.key = key;
  this.value = value;
}

Mapping.prototype = Object.create(Node.prototype);
Mapping.prototype.constructor = Mapping;

Mapping.prototype.toJSON = function () {
  var mapping = {};
  mapping[this.key.toJSON()] = this.value.toJSON();
  return mapping;
};


module.exports.Node = Node;
module.exports.Scalar = Scalar;
module.exports.Sequence = Sequence;
module.exports.Map = Map;
module.exports.Mapping = Mapping;
