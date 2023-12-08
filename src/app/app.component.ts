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

  onClick = (newText: string) => {
    this.moveList.push(newText);
  };
}
