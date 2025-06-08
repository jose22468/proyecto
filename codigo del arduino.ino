  #include <LiquidCrystal.h>
#include <Servo.h>  // Nueva línea

// Pines existentes
int activar12 = 6;
int entrada1 = 5;
int entrada2 = 3;
int Pot = A0;
int Pulsador = 13;
int ledRojo = 7;
int ledVerde = 4;

// Nuevo pin para el servo
int pinServo = A1;

// Variables
float ValorPot;
int Velocidad;
int ValorP = 0;
int anguloServo;

LiquidCrystal lcd(8, 9, 10, 11, 12, 13);
Servo miServo;

void setup() {
  pinMode(Pulsador, INPUT);
  pinMode(entrada2, OUTPUT);
  pinMode(entrada1, OUTPUT);
  pinMode(activar12, OUTPUT);
  pinMode(ledRojo, OUTPUT);
  pinMode(ledVerde, OUTPUT);

  miServo.attach(pinServo);  // Ahora usa A1

  lcd.begin(16, 2);
  Serial.begin(9600);
}

void loop() {
  ValorPot = analogRead(Pot);
  Velocidad = map(ValorPot, 0, 1023, 0, 255);
  analogWrite(activar12, Velocidad);

  ValorP = digitalRead(Pulsador);
  digitalWrite(entrada1, !ValorP);
  digitalWrite(entrada2, ValorP);

  if (ValorP == HIGH) {
    // Receptor activo: mover el servo
    int anguloServo = map(ValorPot, 0, 1023, 180, 0); // Modificación para mayor rotación
    Serial.println(anguloServo);
    miServo.write(anguloServo);
  } else {
    // Receptor apagado: poner el servo en reposo o centro
    miServo.write(90);  // Puedes poner 0 si prefieres que "desaparezca"
  }

  // LEDs de estado
  if (Velocidad > 0) {
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledRojo, LOW);
  } else {
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledRojo, HIGH);
  }

  // LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Velocidad:");
  lcd.setCursor(10, 0);
  lcd.print(Velocidad);

  lcd.setCursor(0, 1);
  if (Velocidad > 0) {
    lcd.print("sistema encendido");
  } else {
    lcd.print("sistema apagado");
  }

  delay(500);
}
