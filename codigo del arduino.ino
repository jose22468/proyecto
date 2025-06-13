#include <Servo.h>
#include <LiquidCrystal.h>

// Servo y variables
Servo miServo;
int valorSlider = 0;        // Valor del slider (de 0 a 180)
int valorServo = 90;        // Señal al servo (90 = detenido)

// Configuración del LCD: RS, E, D4, D5, D6, D7
LiquidCrystal lcd(8, 9, 10, 11, 12, 13);

void setup() {
  Serial.begin(9600);
  miServo.attach(A1);           // Servo en pin A1
  miServo.write(valorServo);    // Inicialmente detenido

  lcd.begin(16, 2);
  lcd.print("Servo listo");
}

void loop() {
  // Si se recibe valor del slider por serial
  if (Serial.available() > 0) {
    int valorRecibido = Serial.parseInt();

    // Validar rango 0-180 del slider
    if (valorRecibido >= 0 && valorRecibido <= 180) {
      valorSlider = valorRecibido;

      // Mapear 0-180 (slider) a 90-180 (servo)
      // 0 = detenido (90), 180 = máxima velocidad (180)
      valorServo = map(valorSlider, 0, 180, 90, 180);

      Serial.print("Valor slider: ");
      Serial.print(valorSlider);
      Serial.print(" | Valor servo: ");
      Serial.println(valorServo);
    }
  }

  // Enviar valor constante al servo (para que se mantenga girando)
  miServo.write(valorServo);

  // Mostrar velocidad en LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Velocidad:");

  lcd.setCursor(11, 0);
  if (valorSlider == 0) {
    lcd.print("OFF");
  } else {
    // Mostrar como porcentaje de velocidad
    int velocidadPct = map(valorSlider, 0, 180, 0, 100);
    lcd.print(velocidadPct);
    lcd.print("%");
  }

  delay(200);  // Refrescar LCD cada 200 ms
}
