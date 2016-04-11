import { Component, OnInit } from 'angular2/core';
import { IBlocklyEditor } from '../models/blockly-editor.model' 
import { EditorService } from '../services/editor/editor.service'
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'files-component',
  templateUrl: 'app/files/files.component.html'
})
export class FilesComponent implements OnInit {
  private _updateSubscription : Subscription;
  
  files: string[];
  
  constructor(private _editorService: EditorService) {
    this._updateSubscription = _editorService.updates.subscribe(f => this.fileChanged(f));  
  }
  
  ngOnInit() : void {
    this.files = this._editorService.all(); // TODO: observify
  }
  
  fileChanged(file: [string, IBlocklyEditor] ) : void {
    let index: number = this.files.indexOf(file[0]);
    if(index < 0) {
      this.files.push(file[0]);
    }
  }
  
  openFile(name: string) : void {
    this._editorService.fireOpen(name);
  }
}