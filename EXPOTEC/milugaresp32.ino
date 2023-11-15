#include <Vector.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Escuela_Tecnica_5";
const char* password = "3TAw24InF608";

const int idGarage = 1;
const int pisoParcelas = 1;

std::vector<std::pair<int, int>>rango_parcelas;
std::vector<int> parcelas_id; // Vector para almacenar los pares de enteros -> id_parcela y numero_parcela
std::vector<std::pair<int, int>>grupos_pines; // Vector para almacenar los grupos de sensores 1roTRIG 2doECHO
std::vector<std::vector<int>>matriz_estado_parcela_sensores;
const int thresholdDistance = 10; // Distancia límite en cm para activar el estado
const char* serverAddress = "http://192.168.5.73:8080/"; // Dirección del endpoint de Express en Node.js
void setup() {
  Serial.begin(9600);
  // Conexión a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a la red WiFi...");
  }
  Serial.println("Conexión WiFi establecida");
  rango_parcelas.push_back(std::make_pair(23, 25));
  getIdsParcelas();
  agrupar(12,13);
  agrupar(18,19);
  agrupar(2,4);
  seteoModoPin();
  seteoMatrizGeneral();
}

void loop() {
  long distance;
  for(int i=0; i<matriz_estado_parcela_sensores.size(); i++){
    distance =medirDistancia(matriz_estado_parcela_sensores[i][2], matriz_estado_parcela_sensores[i][3]);
    if (distance < thresholdDistance && matriz_estado_parcela_sensores[i][0] == 0) {
    // Actualizar el estado en el servidor
    matriz_estado_parcela_sensores[i][0]= 1;
    actualizarEstado(matriz_estado_parcela_sensores[i][1],1);
    }else if(distance >= thresholdDistance && matriz_estado_parcela_sensores[i][0] ==1){
    matriz_estado_parcela_sensores[i][0]= 0;
    actualizarEstado(matriz_estado_parcela_sensores[i][1],0);
    }
  delay(100);
  }
}
void actualizarEstado(int id_parcela, int estado) {
  WiFiClient client;
  HTTPClient http;

  // Construir el objeto JSON con el valor del estado
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["estado"] = estado;

  // Convertir el objeto JSON a una cadena
  String jsonStr;
  serializeJson(jsonDoc, jsonStr);

  // Realizar la solicitud POST al endpoint del servidor
  String url1 = String(serverAddress) + "actualizar/estado/" + String(id_parcela);
  http.begin(client, url1.c_str());
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(jsonStr);
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Estado parcela "+String(id_parcela) +"actualizado correctamente: ");
    } else {
      Serial.println("Error en la solicitud HTTP");
    }
  } else {
    Serial.println("Error en la conexión");
  }

  http.end();
}
void agrupar(int trigPin,int echoPin){
  if(grupos_pines.size()<parcelas_id.size()){
    grupos_pines.push_back(std::make_pair(trigPin,echoPin));
  }
}
void seteoModoPin(){
  for(int i=0; i<grupos_pines.size(); i++){
    pinMode(grupos_pines[i].first, OUTPUT);
    pinMode(grupos_pines[i].second, INPUT);
  }
}
void seteoMatrizGeneral(){
  for(int i=0; i<grupos_pines.size(); i++){
    std::vector<int> aux = {0,parcelas_id[i],grupos_pines[i].first, grupos_pines[i].second};
    matriz_estado_parcela_sensores.push_back(aux);
  }
  if(matriz_estado_parcela_sensores.size()>0){
    Serial.println("Setup completado");
  }
}
void getIdsParcelas() {
  WiFiClient client;
  HTTPClient http;
  String url = String(serverAddress) + "Parcelas/" + String(idGarage) + "/"+ String(pisoParcelas) + "/"+ String(rango_parcelas[0].first)+"/"+String(rango_parcelas[0].second);
  http.begin(client, url.c_str());
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-ESP32", "true");
  int httpCode = http.GET();
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString(); // Almacenar la respuesta en una variable String
    Serial.println("Respuesta recibida:");
    Serial.println(response);
    
    for(int i=0; i<response.length(); i++){
      if(response[i] != '[' && response[i] != ']' && response [i] != ','){
        String aux = "";
        int j = i;
        while (j < response.length() && response[j] != ',' && response[j] != ']') {
            aux += response[j];
            j++;
        }
        parcelas_id.push_back(atoi(aux.c_str()));
        i = j - 1;
      }    
    }
    // Imprimir los valores
    for (size_t i = 0; i < parcelas_id.size(); i++) {
      Serial.print("Valor ");
      Serial.print(i);
      Serial.print(": ");
      Serial.println(parcelas_id[i]);
    }

    } else {
      Serial.println("Error en la solicitud HTTP");
    }
  } else {
    Serial.println("Error en la conexión");
  }

  http.end();
}

//Medimos las distancias del sensor requerido
long medirDistancia(int trigP, int echoP) {
  digitalWrite(trigP, LOW);
  delayMicroseconds(1.5);
  digitalWrite(trigP, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigP, LOW);
  long duracion = pulseIn(echoP, HIGH);
  return (duracion / 59);
}
