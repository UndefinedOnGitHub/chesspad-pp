import { Component } from "@angular/core";
import { Move } from "./move";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "html_representation";
  output_text = ""
  moves : Move[] = []

  onClick = (newText: Move) => {
    this.moves.push(newText);
  };
}
