/**
 * Bootstrap Tooltip for presenting Knockout-Validation errors
 *
 * Reference: http://getbootstrap.com/javascript/#tooltips
 * Based upon https://github.com/tov-Novoseltsev/knockout-validation-bootstrap-tooltip/blob/gh-pages/customBinding.js
 */

;
(function(factory) {
	//CommonJS
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		factory(require("knockout"), exports);
		//AMD
	} else if (typeof define === "function" && define.amd) {
		define(["knockout", "exports"], factory);
		//normal script tag
	} else {
		factory(ko);
	}
}(function(ko) {

	"use strict";

	ko.bindingHandlers.bsTooltip = {
		init: function(element, valueAccessor, allBindings) {
			// Definitions
			var el = $(element);
			var unwrapValueAccessor = ko.unwrap(valueAccessor());
			var options = {};

			// combine the default options and those provided via the value accessor
			ko.utils.extend(options, ko.bindingHandlers.bsTooltip.defaultOptions);
			ko.utils.extend(options, unwrapValueAccessor);

			// obtain the observable key for the allBindings
			var key = ko.utils.arrayFirst(["textInput", "value", "click", "event", "submit", "enable", "disable", "checked", "options", "selectedOptions"], function(item) {
				return allBindings()[item];
			});
			var observable = allBindings()[key];

			ko.computed({
				read: function() {
					if (observable.isModified() && !observable.isValid()) {
						el.parents(".form-group").addClass("has-error");
						options.title = observable.error;
						el.tooltip(options).tooltip("show");
					} else {
						el.parents(".form-group").removeClass("has-error");
						el.tooltip("destroy");
					}
				},
				disposeWhenNodeIsRemoved: element
			});

			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
				$(element).tooltip("destroy");
			});
		},
		defaultOptions: {
			placement: "bottom"
		}
	};
})); // close module loader