window.ACTIVITY_DATA={
  "title": "Preguntas de autoevaluación ",
  "instruction": "<strong>Instrucciones:</strong> Lee cuidadosamente cada enunciado y selecciona la opción correcta.",
  "questions": [
    {
      "id": 1,
      "marker": "p3",
      "html": "1. ¿Qué representa exactamente la <strong>distribución de muestreo de la media</strong>?",
      "options": [
        {
          "marker": "p4",
          "html": "A) La distribución de frecuencia de todas las observaciones individuales dentro de una población."
        },
        {
          "marker": "p5",
          "html": "B) Una distribución de probabilidad de todos los valores posibles que puede tomar la media muestral <span class=\"math-group\">(<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow></math>)</span> para un tamaño de muestra dado (<em>n</em>)."
        },
        {
          "marker": "p6",
          "html": "C) La dispersión de los datos recopilados en una sola muestra representativa."
        },
        {
          "marker": "p7",
          "html": "D) Un método no probabilístico para seleccionar elementos de una población finita."
        }
      ],
      "key": 1,
      "keyLiteral": "B",
      "keyMarker": "p8",
      "keyHtml": "<strong> Respuesta correcta: B</strong>",
      "feedbackMarker": "p9",
      "feedback": "<em>Explicación:</em> La distribución de muestreo no analiza datos sueltos (A) ni una sola muestra (C), sino el comportamiento probabilístico de <em>todas</em> las medias de las muestras posibles de tamaño <em>n</em>"
    },
    {
      "id": 2,
      "marker": "p10",
      "html": "2. Si un investigador decide <strong>cuatriplicar el tamaño de la muestra (</strong><strong><em>n</em></strong><strong>)</strong> manteniendo constante la desviación estándar poblacional (<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>σ</mi></mrow></math>), ¿qué sucede con el error estándar de la media?",
      "options": [
        {
          "marker": "p11",
          "html": "A) Se duplica."
        },
        {
          "marker": "p12",
          "html": "B) Permanece exactamente igual."
        },
        {
          "marker": "p13",
          "html": "C) Se reduce a la mitad."
        },
        {
          "marker": "p14",
          "html": "D) Se reduce a la cuarta parte."
        }
      ],
      "key": 2,
      "keyLiteral": "C",
      "keyMarker": "p15",
      "keyHtml": "<strong>Respuesta correcta: C</strong>",
      "feedbackMarker": "p16",
      "feedback": "<em>Explicación:</em> Como la fórmula del error estándar es <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><msub><mrow><mi>σ</mi></mrow><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow></msub><mo>=</mo><mfrac><mrow><mi>σ</mi></mrow><mrow><msqrt><mrow><mi>n</mi></mrow></msqrt></mrow></mfrac></mrow></math> , al aumentar <em>n</em>  por 4, el denominador se convierte en<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><msqrt><mrow><mn>4</mn><mi>n</mi></mrow></msqrt><mo>=</mo><mn>2</mn><msqrt><mrow><mi>n</mi></mrow></msqrt></mrow></math>. Por lo tanto, el error estándar se reduce exactamente a la mitad."
    },
    {
      "id": 3,
      "marker": "p17",
      "html": "3. El Teorema del Límite Central garantiza que la distribución de muestreo de la media se aproximará a una distribución normal si:",
      "options": [
        {
          "marker": "p18",
          "html": "A) La población de origen es estrictamente simétrica y con forma de campana."
        },
        {
          "marker": "p19",
          "html": "B) El tamaño de la muestra (<em>n</em>) es lo suficientemente grande (por regla general <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>n</mi><mo>≥</mo><mn>30</mn></mrow></math>) sin importar la forma de la población original."
        },
        {
          "marker": "p20",
          "html": "C) El muestreo se realiza únicamente de forma subjetiva o por juicio."
        },
        {
          "marker": "p21",
          "html": "D) La desviación estándar de la población es exactamente igual a cero."
        }
      ],
      "key": 1,
      "keyLiteral": "B",
      "keyMarker": "p22",
      "keyHtml": "<strong>Respuesta correcta: B</strong>",
      "feedbackMarker": "p23",
      "feedback": "<em>Explicación:</em> Para muestras aleatorias de observaciones independientes e idénticamente distribuidas, con media finita y varianza finita y positiva, el TLC permite aproximar por una normal la distribución de la media muestral cuando n es suficientemente grande. El tamaño necesario depende de la distribución de origen: <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>n</mi> <mo>≥</mo> <mn>30</mn></mrow></math> es una regla orientativa, no una garantía universal; una asimetría extrema puede requerir muestras mayores."
    },
    {
      "id": 4,
      "marker": "p24",
      "html": "4. ¿En cuál de las siguientes situaciones se debe utilizar el <strong>multiplicador de población finita </strong><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><msqrt><mrow><mfrac><mrow><mi>N</mi><mo>-</mo><mi>n</mi></mrow><mrow><mi>N</mi><mo>-</mo><mn>1</mn></mrow></mfrac></mrow></msqrt></mrow></math> al calcular el error estándar?",
      "options": [
        {
          "marker": "p25",
          "html": "A) Cuando se muestrea <em>con reemplazo</em> en una población infinitamente grande."
        },
        {
          "marker": "p26",
          "html": "B) Cuando la muestra representa menos del 1% de la población total."
        },
        {
          "marker": "p27",
          "html": "C) Cuando se muestrea <em>sin reemplazo</em> en una población finita y la muestra representa más del 5% de dicha población (<em>n</em><em>/N</em> &gt; 0.05)."
        },
        {
          "marker": "p28",
          "html": "D) Siempre que el tamaño de la muestra sea menor a 10 elementos."
        }
      ],
      "key": 2,
      "keyLiteral": "C",
      "keyMarker": "p29",
      "keyHtml": "<strong>Respuesta correcta: C</strong>",
      "feedbackMarker": "p30",
      "feedback": "<em>Explicación:</em> Al extraer elementos <em>sin reemplazo</em> de una población pequeña o finita (donde la muestra supera el 5% del total), las probabilidades cambian en cada extracción y se requiere el factor de corrección."
    },
    {
      "id": 5,
      "marker": "p31",
      "html": "5. Para calcular la probabilidad de que la media de una muestra (<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow></math>) supere un valor determinado, ¿cuál es la fórmula correcta para obtener el puntaje estándar <em>Z</em>?",
      "options": [
        {
          "marker": "p32",
          "html": "A) <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>Z</mi><mo>=</mo><mfrac><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder><mo>-</mo><mi>μ</mi></mrow><mrow><msub><mrow><mi>σ</mi></mrow><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow></msub></mrow></mfrac></mrow></math>"
        },
        {
          "marker": "p33",
          "html": "B) <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>Z</mi><mo>=</mo><mfrac><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder><mo>-</mo><mi>μ</mi></mrow><mrow><mi>σ</mi></mrow></mfrac></mrow></math>"
        },
        {
          "marker": "p34",
          "html": "C) <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>Z</mi><mo>=</mo><mfrac><mrow><mi>x</mi><mo>-</mo><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow><mrow><mi>s</mi></mrow></mfrac></mrow></math>"
        },
        {
          "marker": "p35",
          "html": "D) <math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>Z</mi><mo>=</mo><mfrac><mrow><mi>μ</mi><mo>-</mo><mi>σ</mi></mrow><mrow><msqrt><mrow><mi>n</mi></mrow></msqrt></mrow></mfrac></mrow></math>"
        }
      ],
      "key": 0,
      "keyLiteral": "A",
      "keyMarker": "p36",
      "keyHtml": "<strong>Respuesta correcta: A</strong>",
      "feedbackMarker": "p37",
      "feedback": "<em>Explicación:</em> Al evaluar medias de muestras, el divisor de la fórmula de estandarización <em>Z</em> debe ser la desviación estándar de las medias, es decir, el <strong>error estándar (</strong><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><msub><mrow><mi>σ</mi></mrow><mrow><munder><mrow><mi>x</mi></mrow><mo accent=\"true\">_</mo></munder></mrow></msub></mrow></math><strong>)</strong>, no la desviación de la población individual (<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mi>σ</mi></mrow></math>)."
    }
  ]
};
