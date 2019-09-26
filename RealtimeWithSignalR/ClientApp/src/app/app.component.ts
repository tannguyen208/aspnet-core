import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  positionX: number = 10;
  positionY: number = 450;
  hubConnection: HubConnection;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://localhost:44389/api/values").subscribe(console.log);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44389/hubs/beacon")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch(err => console.log("Error while starting connection: " + err));

    this.hubConnection.on("beaconMoved", (x, y) => {
      this.positionX = x;
      this.positionY = y;
    });
  }

  onChangePositionBeacon(): void {
    this.hubConnection.invoke("MoveBeacon");
  }
}
1;
