import { Component } from 'angular2/core'
import { BlocklyComponent } from './blockly/blockly.component'
import { FilesComponent } from './files/files.component'
import { EditorService } from './services/editor/editor.service'


@Component({
  selector: "app-component",
  templateUrl: "app/app.component.html",
  directives:[BlocklyComponent, FilesComponent],
  providers:[EditorService]
})
export class AppComponent {
  appTitle: string = "Blockly"
}