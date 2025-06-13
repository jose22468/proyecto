        function calcular() {
            // Obtener valores
            const cantidad = parseInt(document.getElementById('plantas').value);
            const variedad = document.getElementById('variedad').value;
            const etapa = document.getElementById('etapa').value;
            
            // Validación
            if (isNaN(cantidad) || cantidad <= 0) {
                mostrarError("Ingrese una cantidad válida de plantas (mínimo 1)");
                return;
            }
            
            // Cálculos basados en parámetros
            let aguaPorPlanta, luzPorPlanta, nutrientes;
            
            // Factores según variedad
            switch(variedad) {
                case 'crespa':
                    aguaPorPlanta = 0.5;
                    luzPorPlanta = 6;
                    nutrientes = "Nitrógeno moderado";
                    break;
                case 'romana':
                    aguaPorPlanta = 0.6;
                    luzPorPlanta = 7;
                    nutrientes = "Nitrógeno alto";
                    break;
                case 'mantecosa':
                    aguaPorPlanta = 0.45;
                    luzPorPlanta = 5.5;
                    nutrientes = "Nitrógeno bajo";
                    break;
                case 'iceberg':
                    aguaPorPlanta = 0.55;
                    luzPorPlanta = 6.5;
                    nutrientes = "Nitrógeno moderado";
                    break;
            }
            
            // Ajuste por etapa de crecimiento
            switch(etapa) {
                case 'inicial':
                    aguaPorPlanta *= 0.7;
                    luzPorPlanta *= 0.8;
                    break;
                case 'madurez':
                    aguaPorPlanta *= 1.2;
                    luzPorPlanta *= 1.1;
                    break;
            }
            
            // Cálculos finales
            const aguaTotal = cantidad * aguaPorPlanta;
            const luzTotal = cantidad * luzPorPlanta;
            const areaRequerida = cantidad * 0.09; // 0.09 m² por planta
            
            // Generar resultado
            const resultado = `
                <div class="result-item">
                    <h4><i class="fas fa-tint"></i> Requerimientos Hídricos</h4>
                    <p>${aguaTotal.toFixed(2)} litros cada 2-3 días (${aguaPorPlanta.toFixed(2)} L/planta)</p>
                    <p class="recommendation">Recomendación: ${etapa === 'inicial' ? 'Riego superficial frecuente' : 'Riego profundo cada 2-3 días'}</p>
                </div>
                
                <div class="result-item">
                    <h4><i class="fas fa-sun"></i> Necesidades de Luz</h4>
                    <p>${luzTotal.toFixed(1)} horas semanales (${luzPorPlanta.toFixed(1)} hrs/planta)</p>
                    <p class="recommendation">Exposición solar directa: ${luzPorPlanta > 6.5 ? 'Proporcione sombra parcial' : 'Adecuada para luz directa'}</p>
                </div>
                
                <div class="result-item">
                    <h4><i class="fas fa-ruler-combined"></i> Espacio Requerido</h4>
                    <p>${areaRequerida.toFixed(2)} m² (aproximadamente ${Math.ceil(areaRequerida/1.5)} camas de cultivo estándar)</p>
                </div>
                
                <div class="result-item">
                    <h4><i class="fas fa-flask"></i> Nutrientes Clave</h4>
                    <p>${nutrientes}. ${variedad === 'romana' ? 'Aplicar compost cada 3 semanas' : 'Aplicar compost cada 4 semanas'}</p>
                </div>
                
                <div class="expert-tip">
                    <h4><i class="fas fa-lightbulb"></i> Consejo Experto</h4>
                    <p>${generarConsejo(variedad, etapa)}</p>
                </div>
            `;
            
            document.getElementById('resultados').innerHTML = resultado;
        }
        
        function generarConsejo(variedad, etapa) {
            const consejos = {
                'crespa': {
                    'inicial': 'Mantenga el suelo constantemente húmedo durante la germinación.',
                    'crecimiento': 'Aplique mulch para conservar humedad y controlar malezas.',
                    'madurez': 'Reduzca riego 3 días antes de cosecha para intensificar sabores.'
                },
                'romana': {
                    'inicial': 'Proteja las plántulas del viento fuerte en etapas tempranas.',
                    'crecimiento': 'Amarre las hojas exteriores 1 semana antes de cosecha para blanquear el corazón.',
                    'madurez': 'Coseche en horas de la mañana para mayor frescura.'
                },
                'mantecosa': {
                    'inicial': 'Siembre en semilleros protegidos por su sensibilidad inicial.',
                    'crecimiento': 'Evite mojar el centro de la roseta para prevenir hongos.',
                    'madurez': 'Coseche cuando las hojas estén firmes pero no duras.'
                },
                'iceberg': {
                    'inicial': 'Requiere suelo muy bien drenado desde la siembra.',
                    'crecimiento': 'Aplique riego por goteo para evitar enfermedades foliares.',
                    'madurez': 'Espere a que se forme un corazón firme antes de cosechar.'
                }
            };
            
            return consejos[variedad][etapa];
        }
        
        function mostrarError(mensaje) {
            document.getElementById('resultados').innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${mensaje}</p>
                </div>
            `;
        }
