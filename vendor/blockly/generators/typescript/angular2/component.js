Blockly.TypeScript['ng2_component'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_imports = Blockly.TypeScript.statementToCode(block, 'IMPORTS');
  var text_selector = block.getFieldValue('SELECTOR');

  var selector = text_selector ? '  selector: \''+text_selector+'\'\n' : '';
  var code = 'import { Component } from \'angular2/core\';\n' + statements_imports + '\n@Component({\n'+selector+'})\nexport class ' + text_name + ' {}';
  return code;
};