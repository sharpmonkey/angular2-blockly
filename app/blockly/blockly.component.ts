import { Component, OnInit, OnDestroy  } from 'angular2/core';
import { Subject, Subscription } from 'rxjs/Rx'
import { EditorService } from '../services/editor/editor.service'
import { IBlocklyEditor } from '../models/blockly-editor.model'

declare var Blockly: any;

@Component({
  selector: 'blockly-component',
  templateUrl: 'app/blockly/blockly.component.html',
  styleUrls: ['app/blockly/blockly.component.css']
})
export class BlocklyComponent implements OnInit, OnDestroy {
  private _workspace: any;
  private _subject: Subject<any>;
  private _subscription: Subscription;
  private _openFileSubscription: Subscription;
  
  dirty: boolean = false;
  name: string = '';  
  generatedCode: string = '// generated code will appear here';
  
  constructor(private _editorService: EditorService) {
    this._openFileSubscription = this._editorService.open.subscribe(name => this.openFile(name));
  }
  
  ngOnInit(): void {
    let toolbox: any = {toolbox: document.getElementById('toolbox')};
    this._workspace = Blockly.inject('blocklyDiv', toolbox);
    this._workspace.addChangeListener(e => this.onWorkspaceChange(e));
  }
  
  ngOnDestroy() : void{
    this._subscription.unsubscribe();
    // TODO: cleanup blockly components
  }
  
  onWorkspaceChange(item) : void {
    let code: string = Blockly.TypeScript.workspaceToCode(this._workspace);
    this.generatedCode = code;
    this.dirty = true;
  }
  
  clickedNew(event) : void {
    this._workspace.clear();
    this.name = "";
    this.dirty = false;
    this.generatedCode = "// generated code will appear here";
  }
  
  clickedSave(event) : void {
    let xml = Blockly.Xml.workspaceToDom(this._workspace);
    let xml_text = Blockly.Xml.domToText(xml);
    let editor: IBlocklyEditor = <IBlocklyEditor>{ xml: xml_text };
    this._editorService.save(this.name, editor);
    this.dirty = false;
  }
  
  openFile(file: [string, IBlocklyEditor]) : void {
    let xml_text: string = file[1].xml;
    this.name = file[0];
    var xml = Blockly.Xml.textToDom(xml_text);
    this._workspace.clear();
    Blockly.Xml.domToWorkspace(xml, this._workspace);
    // TODO: meh, workspace is loaded and fires off changed event after this dirty gets cleared
    this.dirty = false;
  }
}