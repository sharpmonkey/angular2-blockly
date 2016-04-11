Blockly.Blocks['ng2_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import")
        .appendField(new Blockly.FieldTextInput("Item1, Item2"), "IMPORTS")
        .appendField("from")
        .appendField(new Blockly.FieldTextInput("angular2/core"), "LIBRARY");
    this.setPreviousStatement(true, "import");
    this.setNextStatement(true, "import");
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://angular.io');
  }
};