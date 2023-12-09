import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "html_representation";
  output_text = ""
  moveList : string[] = []

  clearDisplay() {
    this.output_text = ""
  }

  clearDisplayList() {
    this.moveList = []
  }

  onClick = (newText: string) => {
    this.moveList.push(newText);
  };
}
