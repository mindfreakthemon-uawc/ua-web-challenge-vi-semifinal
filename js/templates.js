define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["filters"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),frequencies = locals_.frequencies,formatter = locals_.formatter;
buf.push("<h3>Equalizer</h3><table class=\"table-responsive\"><thead><tr>");
// iterate frequencies
;(function(){
  var $$obj = frequencies;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade_interp = formatter(key)) ? "" : jade_interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade_interp = formatter(key)) ? "" : jade_interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr></thead><tbody><tr>");
// iterate frequencies
;(function(){
  var $$obj = frequencies;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var key = $$obj[$index];

buf.push("<td><input type=\"range\"" + (jade.attr("data-key", key, true, false)) + " max=\"30\" min=\"-30\" step=\"1\" value=\"0\"/></td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var key = $$obj[$index];

buf.push("<td><input type=\"range\"" + (jade.attr("data-key", key, true, false)) + " max=\"30\" min=\"-30\" step=\"1\" value=\"0\"/></td>");
    }

  }
}).call(this);

buf.push("</tr></tbody></table>");;return buf.join("");
};

return this["JST"];

});