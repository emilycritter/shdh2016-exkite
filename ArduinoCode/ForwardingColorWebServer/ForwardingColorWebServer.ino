//#include <NeoPixelAnimator.h>
//#include <NeoPixelBus.h>

//This version forwards messages to a second arduino running neopixel lib

/* Create a WiFi access point and provide a web server on it. */
//#include <Adafruit_NeoPixel.h>

#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN 13

#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>

/* Set these to your desired credentials. */
const char *ssid = "Samsung Galaxy S6 edge 2074";
const char *password = "1234567890";

ESP8266WebServer server(80);

/* Just a little test message.  Go to http://192.168.4.1 in a web browser
 * connected to this access point to see it.
 */
void handleRoot() {
  server.send(200, "text/html", "<h1>You are connected</h1>");
}

void handle_color() {
  String msg = server.arg("b");
  Serial.print("=");
  Serial.write(msg.toInt());
  msg = server.arg("g");
  Serial.write(msg.toInt());
  msg = server.arg("r");
  Serial.write(msg.toInt());
  server.send(200, "text/html", "COLOR!");
}

void setup() {
  delay(1000);
  Serial.begin(9600);
  //Serial.println();
  //Serial.print("Configuring access point...");
  /* You can remove the password parameter if you want the AP to be open. */

  //pinMode(5,OUTPUT);
  WiFi.begin(ssid, password);
  
  //Serial.print("AP IP address: ");
  //Serial.println(myIP);
  server.on("/", handleRoot);
  server.on("/color", handle_color);
  server.begin();
  //Serial.println("HTTP server started");

}

void loop() {
  server.handleClient();
}
