Blockly.TypeScript['ng2_import'] = function(block) {
  var text_imports = block.getFieldValue('IMPORTS');
  var text_library = block.getFieldValue('LIBRARY');
  var code = 'import { ' + text_imports + '} from \''+ text_library +'\';\n';
  return code;
};