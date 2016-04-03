#include "FastLED.h"

FASTLED_USING_NAMESPACE

#if FASTLED_VERSION < 3001000
#error "Requires FastLED 3.1 or later; check github for latest code."
#endif

#define DATA_PIN    8
//#define CLK_PIN   4
#define LED_TYPE    WS2811
#define COLOR_ORDER GRB
#define NUM_LEDS    51
CRGB leds[NUM_LEDS];

#define BRIGHTNESS          96
#define FRAMES_PER_SECOND  120

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

    // tell FastLED about the LED strip configuration
  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  //FastLED.addLeds<LED_TYPE,DATA_PIN,CLK_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);

  // set master brightness control
  FastLED.setBrightness(BRIGHTNESS);

  FastLED.show();

}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 3){
    if(Serial.read() == '=')
      setStripColor(Serial.read(),Serial.read(),Serial.read());
  }
}

void setStripColor(int r, int g, int b){
for ( int i = 0; i < NUM_LEDS; i++) { //9948
    leds[i] = CRGB(r,g,b);
  }
  FastLED.show();
 
  Serial.print("Red = "); Serial.print(r);
  Serial.print(", Green= "); Serial.print(g);
  Serial.print(", Blue= "); Serial.print(b);
  Serial.println("");
}
