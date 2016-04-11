import { Injectable } from 'angular2/core';
import { IBlocklyEditor } from '../../models/blockly-editor.model';
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class EditorService {
  private _editors: { [name: string] : IBlocklyEditor; } = {};
  private _updatesSubject: Subject<[string, IBlocklyEditor]>;
  private _openSubject: Subject<[string, IBlocklyEditor]>;
  
  updates: Observable<[string, IBlocklyEditor]>;
  open: Observable<[string, IBlocklyEditor]>;
  
  constructor() {
    this._updatesSubject = new Subject<[string, IBlocklyEditor]>();
    this._openSubject = new Subject<[string, IBlocklyEditor]>();
    
    this.updates = this._updatesSubject.asObservable();
    this.open = this._openSubject.asObservable();
  }
  
  save(name: string, editor: IBlocklyEditor) : void {
    this._editors[name] = editor;
    this._updatesSubject.next([name, editor]);
  }
  
  load(name: string) : IBlocklyEditor {
    return this._editors[name];
  }
  
  remove(name: string) : void {
    this._editors[name] = null;
  }
  
  all() : string[] {
    return Object.keys(this._editors);
  }

  fireOpen(name: string) : void {
    let editor: IBlocklyEditor = this._editors[name];
    this._openSubject.next([name, editor]);
  }
}