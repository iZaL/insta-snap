/*
 a bootstrap like style
 */
'use strict';

var LABEL_COLOR = '#888888';
var INPUT_COLOR = '#5BC3BE';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#E7E7E7';
var DISABLED_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#E7E7E7';
var FONT_SIZE = 17;
var FONT_WEIGHT = '400';

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2,
      fontWeight: FONT_WEIGHT,
      textAlign:'right'
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2,
      fontWeight: FONT_WEIGHT,
      textAlign:'right'
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: 14,
    marginBottom: 2,
    color: ERROR_COLOR,
    textAlign:'right'
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      borderRadius: 0,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      height: 50,
      padding: 10,
      borderBottomColor: '#48BBEC',
      textAlign: 'right'
    },

    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 50,
      padding: 10,
      borderRadius: 0,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      textAlign:'right'
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR,
      textAlign:'right'
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      marginBottom: 4,


    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  }
});

module.exports = stylesheet;