int scene;
int red = 4;
int green = 7;
int white = 8;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(red, OUTPUT); // Declare the LED as an output
  pinMode(green, OUTPUT); // Declare the LED as an output
  pinMode(white, OUTPUT); // Declare the LED as an output

}

void loop() {
  while(Serial.available( ) > 0){
    scene = Serial.read();
    digitalWrite(red, LOW);
    digitalWrite(green, LOW);
    digitalWrite(white, LOW);
    Serial.println(scene);
    if(scene == 49){
      digitalWrite(red, HIGH);
    } else if(scene == 50){
      digitalWrite(green, HIGH);
    } else if(scene == 51){
      digitalWrite(white, HIGH);
    }
  }

}
