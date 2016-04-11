Blockly.Blocks['ng2_component'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Component")
        .appendField("name")
        .appendField(new Blockly.FieldTextInput(""), "NAME");
    this.appendStatementInput("IMPORTS")
        .setCheck("import");
    this.appendDummyInput()
        .appendField("selector")
        .appendField(new Blockly.FieldTextInput(""), "SELECTOR");
    this.setColour(240);
    this.setTooltip('Angular2 Component');
    this.setHelpUrl('http://angular.io/');
  }
};