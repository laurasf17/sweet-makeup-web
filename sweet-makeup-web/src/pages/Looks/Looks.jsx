import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Looks.css'
import { createBeautyAiSessionId, requestBeautyAi } from '../../components/ai/beautyAiClient'
import models1 from '../../assets/models1.jpeg'
import models2 from '../../assets/models2.jpeg'
import models3 from '../../assets/models3.jpeg'
import models4 from '../../assets/models4.jpeg'
import models5 from '../../assets/models5.jpeg'

const modelImages = [models1, models2, models3, models4, models5]
const createMakeupCategory = (name, icon, description, names, colors, intensities, finishes) => ({
  name,
  icon,
  description,
  options: names.map((option, index) => ({
    name: option,
    color: colors[index % colors.length],
    intensity: intensities[index % intensities.length],
    finish: finishes[index % finishes.length]
  }))
})

const makeupGroups = [
  {
    name: 'ROSTRO',
    icon: '◌',
    categories: [
      createMakeupCategory('Base', '◯', 'Unifica el tono manteniendo el acabado que mejor acompaña tu look.', ['Porcelain', 'Natural', 'Warm', 'Golden', 'Tan'], ['#f1d8c9', '#d8ae91', '#c98a64', '#b87547', '#84543d'], ['Suave', 'Media', 'Media', 'Alta', 'Alta'], ['Natural', 'Satinado', 'Luminous', 'Soft matte', 'Velvet']),
      createMakeupCategory('Corrector', '✧', 'Ilumina y equilibra con una cobertura adaptable.', ['Light', 'Neutral', 'Warm', 'Golden'], ['#f3ddcb', '#d8b69f', '#c88b67', '#a96743'], ['Suave', 'Media', 'Media', 'Alta'], ['Natural', 'Satinado', 'Soft matte', 'Natural']),
      createMakeupCategory('Rubor', '♡', 'Aporta dimensión y vida con un matiz elegido por ti.', ['Peach', 'Rose', 'Berry', 'Nude', 'Coral'], ['#ee9c79', '#db7795', '#a94368', '#c58b80', '#f27c61'], ['Suave', 'Media', 'Alta', 'Suave', 'Media'], ['Dewy', 'Satinado', 'Soft matte', 'Natural', 'Luminous']),
      createMakeupCategory('Contorno', '⌁', 'Define suavemente los rasgos sin perder naturalidad.', ['Soft', 'Warm', 'Sculpt'], ['#d1aa94', '#b98262', '#8d584b'], ['Suave', 'Media', 'Alta'], ['Natural', 'Satinado', 'Soft matte']),
      createMakeupCategory('Iluminador', '✦', 'Añade puntos de luz y refleja la energía del look.', ['Pearl', 'Champagne', 'Golden', 'Pink Glow'], ['#f4e5e1', '#efd0a1', '#d9a64e', '#f1a3c8'], ['Suave', 'Media', 'Alta', 'Media'], ['Glass', 'Satinado', 'Luminous', 'Dewy'])
    ]
  },
  {
    name: 'OJOS',
    icon: '◉',
    categories: [
      createMakeupCategory('Sombras', '◉', 'Construye profundidad, luz y expresión en la mirada.', ['Soft Brown', 'Champagne', 'Bronze', 'Pink', 'Smoky', 'Graphic'], ['#9a6650', '#efd1a5', '#a96337', '#e7a0bd', '#493342', '#9237a7'], ['Suave', 'Suave', 'Media', 'Media', 'Alta', 'Alta'], ['Matte', 'Shimmer', 'Metallic', 'Satinado', 'Smoky', 'Graphic']),
      createMakeupCategory('Delineador', '〰', 'Enmarca la mirada desde una línea sutil hasta un gesto gráfico.', ['Brown', 'Black', 'Plum', 'Graphic'], ['#694230', '#17131b', '#60344f', '#bd3fba'], ['Suave', 'Alta', 'Media', 'Alta'], ['Soft line', 'Precise matte', 'Satinado', 'Graphic']),
      createMakeupCategory('Pestañina', '⌁', 'Define las pestañas con el nivel de presencia que prefieras.', ['Natural', 'Volume', 'Dramatic', 'Fox'], ['#725042', '#2f2027', '#170f16', '#352127'], ['Suave', 'Media', 'Alta', 'Media'], ['Natural', 'Volume', 'Dramatic', 'Lifted'])
    ]
  },
  {
    name: 'LABIOS',
    icon: '♡',
    categories: [
      createMakeupCategory('Labial', '♡', 'Elige el acento de color que firma tu combinación.', ['Nude', 'Rose', 'Pink', 'Coral', 'Cherry', 'Burgundy', 'Brown', 'Mauve'], ['#bf8d78', '#bd647d', '#e85d9d', '#f07860', '#a72648', '#671b39', '#744b3c', '#a66d88'], ['Suave', 'Media', 'Media', 'Media', 'Alta', 'Alta', 'Media', 'Media'], ['Satinado', 'Velvet', 'Gloss', 'Cream', 'Lacquer', 'Velvet', 'Matte', 'Satinado']),
      createMakeupCategory('Gloss', '✧', 'Crea reflejo y dimensión con un velo translúcido o de color.', ['Crystal', 'Pink Glow', 'Glass', 'Cherry Shine'], ['#f4dce8', '#ed72b4', '#f8e9f1', '#c93662'], ['Suave', 'Media', 'Suave', 'Alta'], ['Crystal', 'Glow', 'Glass', 'Shine'])
    ]
  }
]
const makeupCategories = makeupGroups.flatMap((group) => group.categories)
const colorLab = [
  { family: 'Nude', name: 'Warm Nude', hex: '#cda48e', intensity: 'Media', finish: 'Velvet', description: 'Un neutro cálido que acompaña sin competir con tus rasgos.', styles: 'Clean Beauty / Soft Glam' },
  { family: 'Pink', name: 'Pink Voltage', hex: '#e85d9d', intensity: 'Alta', finish: 'Gloss', description: 'Rosa luminoso para sumar frescura y energía al look.', styles: 'Romantic / Bold' },
  { family: 'Rose', name: 'Rosewood', hex: '#a9546e', intensity: 'Media', finish: 'Satinado', description: 'Un rosa profundo y equilibrado con carácter editorial.', styles: 'Old Money / Soft Glam' },
  { family: 'Coral', name: 'Coral Bloom', hex: '#f07860', intensity: 'Media', finish: 'Cream', description: 'Un matiz cálido que aporta vitalidad y un rubor natural.', styles: 'Fresh / Summer' },
  { family: 'Red', name: 'Classic Red', hex: '#c52e4d', intensity: 'Alta', finish: 'Lacquer', description: 'Rojo definido para convertir el color en protagonista.', styles: 'Icon / Classic Glam' },
  { family: 'Berry', name: 'Berry Muse', hex: '#843e61', intensity: 'Alta', finish: 'Velvet', description: 'Frutos rojos con profundidad y una presencia envolvente.', styles: 'Dark Glam / Romantic' },
  { family: 'Brown', name: 'Cocoa Veil', hex: '#744b3c', intensity: 'Media', finish: 'Matte', description: 'Marrón suave para esculpir calidez con un acabado pulido.', styles: 'Latte Makeup / Natural' },
  { family: 'Mauve', name: 'Mauve Theory', hex: '#a77d91', intensity: 'Suave', finish: 'Satinado', description: 'Malva equilibrado que mezcla suavidad y definición.', styles: 'Romantic / Minimal' },
  { family: 'Champagne', name: 'Champagne Light', hex: '#dec1a0', intensity: 'Suave', finish: 'Shimmer', description: 'Luz perlada para puntos estratégicos y dimensión delicada.', styles: 'Luxury / Soft Glam' },
  { family: 'Bronze', name: 'Bronze Signal', hex: '#a96337', intensity: 'Media', finish: 'Metallic', description: 'Bronce reflectante que suma calidez y profundidad.', styles: 'Golden / After Dark' }
]
const lipMatchOptions = [
  { name: 'Nude', hex: '#cda48e', lips: 'Nude satin', eyes: 'Soft taupe', blush: 'Peach veil', glow: 'Pearl sheen' },
  { name: 'Pink', hex: '#e85d9d', lips: 'Pink gloss', eyes: 'Rose shimmer', blush: 'Petal pink', glow: 'Dewy rose' },
  { name: 'Red', hex: '#c52e4d', lips: 'Classic red', eyes: 'Defined neutral', blush: 'Soft rose', glow: 'Satin highlight' },
  { name: 'Berry', hex: '#843e61', lips: 'Berry velvet', eyes: 'Plum smoke', blush: 'Muted mauve', glow: 'Low pearl' },
  { name: 'Brown', hex: '#744b3c', lips: 'Cocoa cream', eyes: 'Bronze wash', blush: 'Warm nude', glow: 'Golden veil' },
  { name: 'Mauve', hex: '#a77d91', lips: 'Mauve satin', eyes: 'Mauve haze', blush: 'Soft mauve', glow: 'Rose pearl' },
  { name: 'Coral', hex: '#f07860', lips: 'Coral cream', eyes: 'Warm champagne', blush: 'Coral flush', glow: 'Fresh glass' }
]
const eyeLooks = [
  { name: 'Soft', description: 'Una definición difuminada y ligera que mantiene la mirada abierta.', shadows: 'Soft taupe / champagne', liner: 'Brown, difuminado', mascara: 'Natural lift', intensity: 'Suave' },
  { name: 'Smoky', description: 'Profundidad ahumada con bordes suaves y dimensión gradual.', shadows: 'Smoky brown / charcoal', liner: 'Black, difuminado', mascara: 'Volume', intensity: 'Alta' },
  { name: 'Bronze', description: 'Reflejos cálidos y metálicos que aportan luz envolvente.', shadows: 'Bronze / golden brown', liner: 'Warm brown', mascara: 'Defined volume', intensity: 'Media' },
  { name: 'Pink', description: 'Un velo rosado que ilumina la mirada con un acabado delicado.', shadows: 'Rose / soft pink', liner: 'Mauve brown', mascara: 'Natural', intensity: 'Suave' },
  { name: 'Graphic', description: 'Líneas definidas y geometría limpia para una expresión creativa.', shadows: 'Neutral base / graphic accent', liner: 'Black graphic', mascara: 'Defined', intensity: 'Alta' },
  { name: 'Siren', description: 'Forma alargada y sombra profunda para una mirada magnética.', shadows: 'Plum / deep bronze', liner: 'Elongated espresso', mascara: 'Fox lift', intensity: 'Alta' },
  { name: 'Clean', description: 'Piel visualmente ligera, pestañas separadas y definición mínima.', shadows: 'Neutral skin tone', liner: 'Tightline brown', mascara: 'Natural separation', intensity: 'Muy suave' },
  { name: 'Dramatic', description: 'Contraste intenso y dimensión para una mirada de impacto.', shadows: 'Deep charcoal / metallic', liner: 'Black, sculpted', mascara: 'Dramatic volume', intensity: 'Muy alta' }
]
const beautyColorHex = {
  rosewood: '#a9546e', 'warm nude': '#cda48e', champagne: '#dec1a0', cherry: '#ad234d', noir: '#29101e', 'electric rose': '#ff2fa3', lilac: '#a987c9', pearl: '#ead8e9', 'soft pink': '#efb2cc', burgundy: '#70233d', gold: '#c99b55', 'classic rose': '#bd7185', 'bare nude': '#d4b6a4', peach: '#e9a982', 'clear gloss': '#e8dce2', 'deep plum': '#57304e', berry: '#843e61', 'rose gold': '#c78c7c', 'blush rose': '#d9829b', mauve: '#a77d91', 'soft berry': '#a65876', 'chrome lilac': '#9c76bc', fuchsia: '#e83391', silver: '#c8c0d2', 'noir cherry': '#63152f', plum: '#663a63', 'soft rose': '#d890a8'
}
const alterEgos = [
  { name: 'THE MUSE', description: 'Una presencia serena con luz suave y elegancia natural.', colors: ['Rosewood', 'Warm nude', 'Champagne'], intensity: 'SUAVE', eyes: 'Soft shimmer', lips: 'Rose nude', category: 'Rubor' },
  { name: 'THE REBEL', description: 'Contraste y actitud para romper el guion con intención.', colors: ['Cherry', 'Noir', 'Electric rose'], intensity: 'ALTA', eyes: 'Graphic liner', lips: 'Cherry lacquer', category: 'Delineador' },
  { name: 'THE DREAMER', description: 'Brillo etéreo, color difuminado y un toque inesperado.', colors: ['Lilac', 'Pearl', 'Soft pink'], intensity: 'MEDIA', eyes: 'Iridescent wash', lips: 'Petal gloss', category: 'Iluminador' },
  { name: 'THE ICON', description: 'Un acabado pulido que convierte cada entrada en una escena.', colors: ['Burgundy', 'Gold', 'Classic rose'], intensity: 'ALTA', eyes: 'Sculpted smoky', lips: 'Statement red', category: 'Labios' },
  { name: 'THE MINIMALIST', description: 'Pocos gestos, piel fresca y una belleza sin ruido.', colors: ['Bare nude', 'Peach', 'Clear gloss'], intensity: 'SUAVE', eyes: 'Bare definition', lips: 'Nude balm', category: 'Base' },
  { name: 'THE SIREN', description: 'Una mirada magnética con tonos profundos y reflejos húmedos.', colors: ['Deep plum', 'Berry', 'Rose gold'], intensity: 'INTENSA', eyes: 'Elongated smoke', lips: 'Berry gloss', category: 'Sombras' },
  { name: 'THE ROMANTIC', description: 'Tonos delicados, rubor visible y detalles llenos de calidez.', colors: ['Blush rose', 'Mauve', 'Soft berry'], intensity: 'MEDIA', eyes: 'Rosy definition', lips: 'Mauve satin', category: 'Rubor' },
  { name: 'THE FUTURIST', description: 'Acabados reflectantes y formas gráficas con visión de futuro.', colors: ['Chrome lilac', 'Fuchsia', 'Silver'], intensity: 'EXPERIMENTAL', eyes: 'Chrome graphic', lips: 'Glass tint', category: 'Iluminador' }
]
const moods = [
  { name: 'Soft', icon: '♡', look: 'Cloud Skin', colors: ['Warm nude', 'Soft rose', 'Pearl'], intensity: 'SUAVE', eyes: 'Soft taupe', lips: 'Rose balm', blush: 'Petal blush', glow: 'Pearl veil' },
  { name: 'Powerful', icon: '✦', look: 'Power Signal', colors: ['Rosewood', 'Cherry', 'Champagne'], intensity: 'ALTA', eyes: 'Defined bronze', lips: 'Rosewood satin', blush: 'Sculpted rose', glow: 'Lit highlight' },
  { name: 'Mysterious', icon: '☾', look: 'Velvet Eclipse', colors: ['Berry', 'Plum', 'Noir'], intensity: 'INTENSA', eyes: 'Smoked plum', lips: 'Berry velvet', blush: 'Muted mauve', glow: 'Low chrome' },
  { name: 'Romantic', icon: '♡', look: 'Rose Reverie', colors: ['Soft pink', 'Mauve', 'Rose gold'], intensity: 'MEDIA', eyes: 'Rosy shimmer', lips: 'Petal gloss', blush: 'Rose cloud', glow: 'Dewy rose' },
  { name: 'Fresh', icon: '✧', look: 'Morning Halo', colors: ['Peach', 'Warm nude', 'Champagne'], intensity: 'SUAVE', eyes: 'Fresh bronze', lips: 'Clear gloss', blush: 'Peach flush', glow: 'Glass skin' },
  { name: 'Glam', icon: '◆', look: 'Afterglow Icon', colors: ['Burgundy', 'Gold', 'Rosewood'], intensity: 'ALTA', eyes: 'Bronze smoke', lips: 'Burgundy satin', blush: 'Golden rose', glow: 'High beam' },
  { name: 'Bold', icon: '✦', look: 'Cherry Voltage', colors: ['Cherry', 'Fuchsia', 'Soft pink'], intensity: 'MUY ALTA', eyes: 'Graphic shimmer', lips: 'Cherry lacquer', blush: 'Hot rose', glow: 'Prismatic' },
  { name: 'Dark', icon: '☽', look: 'Noir Bloom', colors: ['Noir', 'Deep berry', 'Plum'], intensity: 'INTENSA', eyes: 'Smoky noir', lips: 'Black cherry', blush: 'Cool contour', glow: 'Satin shadow' }
]
const routineStages = [
  { name: 'BEFORE', title: 'Antes del look', steps: ['Limpiador', 'Hidratante', 'Primer'] },
  { name: 'MAKEUP', title: 'Durante el look', steps: ['Base', 'Corrector', 'Rubor', 'Contorno', 'Iluminador', 'Labial', 'Gloss', 'Pestañina', 'Fijador'] },
  { name: 'AFTER', title: 'Después del look', steps: ['Desmaquillante', 'Limpiador', 'Hidratante'] }
]
const routineSteps = routineStages.flatMap((stage) => stage.steps)
const trendPresets = [
  { name: 'Latte Makeup', description: 'Tonos café cálidos, dimensión suave y acabado aterciopelado.', colors: ['Cocoa', 'Bronze', 'Warm nude'], intensity: 'Medium', occasion: 'Trabajo', vibe: 'Elegante', mood: 'Glam', products: ['Base Sephora', 'Contorno Sheglam', 'Brochas'], makeup: { Base: 'Natural', Corrector: 'Warm', Contorno: 'Warm', Sombras: 'Bronze', Rubor: 'Nude', Labial: 'Brown', Gloss: 'Crystal', Pestañina: 'Natural' } },
  { name: 'Glass Skin', description: 'Piel luminosa, tonos ligeros y reflejos frescos con apariencia cristalina.', colors: ['Pearl', 'Peach', 'Clear'], intensity: 'Soft', occasion: 'Universidad', vibe: 'Natural', mood: 'Fresh', products: ['Agua Micelar Garnier', 'Base Sephora', 'Guasha y Rodillo Facial'], makeup: { Base: 'Porcelain', Corrector: 'Light', Rubor: 'Peach', Iluminador: 'Pearl', Labial: 'Nude', Gloss: 'Glass', Pestañina: 'Natural' } },
  { name: 'Soft Glam', description: 'Definición pulida, brillo controlado y tonos clásicos fáciles de llevar.', colors: ['Champagne', 'Rose', 'Warm brown'], intensity: 'Medium', occasion: 'Evento', vibe: 'Elegante', mood: 'Glam', products: ['Base Sephora', 'Paleta de Sombras', 'Brochas'], makeup: { Base: 'Natural', Corrector: 'Neutral', Sombras: 'Champagne', Delineador: 'Brown', Rubor: 'Rose', Labial: 'Rose', Gloss: 'Crystal', Iluminador: 'Champagne', Pestañina: 'Volume' } },
  { name: 'Strawberry Makeup', description: 'Rubor rosado, tonos frutales y brillo fresco de apariencia delicada.', colors: ['Strawberry pink', 'Petal', 'Soft rose'], intensity: 'Soft', occasion: 'Cita', vibe: 'Coqueta', mood: 'Romantic', products: ['Gloos elf', 'Paleta de Sombras', 'Base Sephora'], makeup: { Base: 'Natural', Corrector: 'Light', Rubor: 'Rose', Sombras: 'Pink', Labial: 'Pink', Gloss: 'Pink Glow', Iluminador: 'Pink Glow', Pestañina: 'Natural' } },
  { name: 'Siren Eyes', description: 'Mirada alargada y definida con tonos profundos y labios equilibrados.', colors: ['Plum', 'Berry', 'Espresso'], intensity: 'Bold', occasion: 'Noche', vibe: 'Misteriosa', mood: 'Mysterious', products: ['Paleta de Sombras', 'Gel de Cejas Melu', 'Gloos Hotchocolate'], makeup: { Sombras: 'Smoky', Delineador: 'Plum', Pestañina: 'Fox', Labial: 'Mauve', Gloss: 'Cherry Shine', Contorno: 'Sculpt' } },
  { name: 'Dark Feminine', description: 'Contraste profundo, contornos esculpidos y un acabado de noche.', colors: ['Noir cherry', 'Burgundy', 'Plum'], intensity: 'Bold', occasion: 'Noche', vibe: 'Misteriosa', mood: 'Dark', products: ['Paleta de Sombras', 'Contorno Sheglam', 'Brochas'], makeup: { Base: 'Warm', Contorno: 'Sculpt', Sombras: 'Smoky', Delineador: 'Black', Pestañina: 'Dramatic', Labial: 'Burgundy', Gloss: 'Cherry Shine', Iluminador: 'Champagne' } },
  { name: 'Clean Beauty', description: 'Una combinación ligera que prioriza tonos suaves y rasgos definidos con sutileza.', colors: ['Porcelain', 'Nude', 'Soft brown'], intensity: 'Soft', occasion: 'Universidad', vibe: 'Natural', mood: 'Fresh', products: ['Agua Micelar Garnier', 'Base Sephora', 'Gel de Cejas Melu'], makeup: { Base: 'Porcelain', Corrector: 'Neutral', Rubor: 'Nude', Sombras: 'Soft Brown', Delineador: 'Brown', Pestañina: 'Natural', Labial: 'Nude', Gloss: 'Crystal' } },
  { name: 'Cherry Makeup', description: 'Labios cereza protagonistas con un balance rosado y brillo selectivo.', colors: ['Cherry', 'Coral', 'Rose'], intensity: 'Bold', occasion: 'Fiesta', vibe: 'Atrevida', mood: 'Bold', products: ['Gloos elf', 'Paleta de Sombras', 'Brochas'], makeup: { Base: 'Natural', Rubor: 'Coral', Sombras: 'Pink', Delineador: 'Brown', Pestañina: 'Volume', Labial: 'Cherry', Gloss: 'Cherry Shine', Iluminador: 'Pink Glow' } }
]
const storeProductMatches = [
  { name: 'Gloos elf', category: 'Labios', price: 65000, makeupCategories: ['Labial', 'Gloss'] },
  { name: 'Gloos Hotchocolate', category: 'Labios', price: 38000, makeupCategories: ['Labial', 'Gloss'] },
  { name: 'Base Sephora', category: 'Rostro', price: 72000, makeupCategories: ['Base'] },
  { name: 'Contorno Sheglam', category: 'Rostro', price: 28000, makeupCategories: ['Contorno'] },
  { name: 'Paleta de Sombras', category: 'Ojos', price: 48000, makeupCategories: ['Sombras'] },
  { name: 'Kit de Maquillaje', category: 'Kits IA', price: 120000, makeupCategories: ['Labial', 'Gloss', 'Sombras', 'Rubor', 'Base', 'Contorno'], minimumSelections: 4 },
  { name: 'Brochas', category: 'Brochas', price: 15000, makeupCategories: ['Base', 'Corrector', 'Rubor', 'Contorno', 'Iluminador', 'Sombras'], minimumSelections: 3 }
]
const lookNames = ['Soft Signal', 'Cherry Code', 'Violet Theory', 'After Glow', 'Rose Protocol']
const analysisStatuses = ['Preparando análisis...', 'Escaneando...', 'Analizando...', 'Creando tu Beauty Profile...']
const recommendationColors = ['ROSEWOOD', 'WARM NUDE', 'CHAMPAGNE', 'BERRY', 'SOFT PINK']
const analysisMetrics = ['ARMONÍA', 'INTENSIDAD', 'CONTRASTE', 'GLOW', 'ESTILO', 'BALANCE']
const generatorOccasions = ['Universidad', 'Trabajo', 'Cita', 'Fiesta', 'Evento', 'Noche']
const generatorVibes = ['Natural', 'Elegante', 'Coqueta', 'Atrevida', 'Misteriosa', 'Romántica']
const generatorIntensities = ['Soft', 'Medium', 'Bold']
const archiveMakeupFields = [
  ['lip', 'Labial', 'Labial'],
  ['gloss', 'Gloss', 'Gloss'],
  ['eyes', 'Sombras', 'Sombras'],
  ['eyeliner', 'Delineador', 'Delineador'],
  ['mascara', 'Pestañina', 'Pestañina'],
  ['blush', 'Rubor', 'Rubor'],
  ['glow', 'Iluminador', 'Iluminador'],
  ['base', 'Base', 'Base'],
  ['contour', 'Contorno', 'Contorno']
]

function getAnalysisMetrics(text) {
  return analysisMetrics.map((label) => {
    const matchingLine = text.split(/\r?\n/).find((line) => line.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(label.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    const percentage = matchingLine?.match(/(?:^|\D)(100|\d{1,2})\s*%/)
    return { label, value: percentage ? Number(percentage[1]) : null }
  })
}

function parseLookProposal(text) {
  const labels = [
    ['name', /^(?:nombre del look|look name|look)\s*[:—-]\s*(.+)$/i],
    ['lips', /^(?:labios|lips)\s*[:—-]\s*(.+)$/i],
    ['eyes', /^(?:ojos|eyes)\s*[:—-]\s*(.+)$/i],
    ['blush', /^(?:rubor|blush)\s*[:—-]\s*(.+)$/i],
    ['glow', /^(?:glow|brillo)\s*[:—-]\s*(.+)$/i],
    ['intensity', /^(?:intensidad|intensity)\s*[:—-]\s*(.+)$/i],
    ['description', /^(?:descripción|descripcion|description)\s*[:—-]\s*(.+)$/i]
  ]
  const proposal = {}

  text.split(/\r?\n/).forEach((line) => {
    const cleanLine = line.replace(/^\s*(?:[-*•]\s*)?/, '').replace(/\*\*/g, '').trim()
    labels.forEach(([key, pattern]) => {
      const match = cleanLine.match(pattern)
      if (match) proposal[key] = match[1].trim()
    })
  })

  return proposal
}

function formatArchiveDate(value) {
  if (!value) return 'Fecha no registrada'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Fecha no registrada'
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(date)
}

function storedValue(value) {
  return value || 'No registrado'
}

function getMatchingStoreProducts(look) {
  const selectedCategories = new Set(Object.entries(look.makeup || {}).filter(([, value]) => Boolean(value)).map(([category]) => category))
  archiveMakeupFields.forEach(([key, , category]) => {
    if (look[key]) selectedCategories.add(category)
  })
  return storeProductMatches.filter((product) => selectedCategories.size >= (product.minimumSelections || 1) && product.makeupCategories.some((category) => selectedCategories.has(category)))
}

function formatStorePrice(price) {
  return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
}

function Sparkle({ className = '' }) {
  return <span className={`looks-sparkle ${className}`} aria-hidden="true">✦</span>
}

function Looks() {
  const fileInput = useRef(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Labios')
  const [activeColor, setActiveColor] = useState(0)
  const [activeLipMatch, setActiveLipMatch] = useState(0)
  const [activeEyeLook, setActiveEyeLook] = useState(0)
  const [activeEgo, setActiveEgo] = useState(0)
  const [activeMood, setActiveMood] = useState(0)
  const [makeupSelections, setMakeupSelections] = useState({})
  const [appliedMakeup, setAppliedMakeup] = useState({})
  const [routineCompleted, setRoutineCompleted] = useState({})
  const [selectedTrendIndex, setSelectedTrendIndex] = useState(0)
  const [appliedTrend, setAppliedTrend] = useState('')
  const [generator, setGenerator] = useState({ ojos: 'Shimmer', labios: 'Gloss', acabado: 'Dewy' })
  const [generatorOccasion, setGeneratorOccasion] = useState('Universidad')
  const [generatorVibe, setGeneratorVibe] = useState('Natural')
  const [generatorIntensity, setGeneratorIntensity] = useState('Soft')
  const [analysisStatus, setAnalysisStatus] = useState('')
  const [analysisText, setAnalysisText] = useState('')
  const [analysisError, setAnalysisError] = useState('')
  const [generatedLook, setGeneratedLook] = useState('')
  const [generatorStatus, setGeneratorStatus] = useState('')
  const [archiveError, setArchiveError] = useState('')
  const [archiveNotice, setArchiveNotice] = useState('')
  const [compareIds, setCompareIds] = useState([])
  const [viewingLookId, setViewingLookId] = useState(null)
  const [archive, setArchive] = useState(() => {
    try {
      const savedLooks = JSON.parse(localStorage.getItem('sweet-makeup-archive') || '[]')
      return Array.isArray(savedLooks) ? savedLooks : []
    } catch { return [] }
  })

  const selectedColor = colorLab[activeColor]
  const selectedLipMatch = lipMatchOptions[activeLipMatch]
  const selectedEyeLook = eyeLooks[activeEyeLook]
  const selectedMood = moods[activeMood]
  const selectedAlterEgo = alterEgos[activeEgo]
  const selectedMakeupCategory = makeupCategories.find((category) => category.name === activeCategory) || makeupCategories[0]
  const selectedMakeupOption = selectedMakeupCategory.options.find((option) => option.name === makeupSelections[activeCategory]) || null
  const selectedTrend = trendPresets[selectedTrendIndex]
  const completedRoutineCount = routineStages.reduce((count, stage) => count + stage.steps.filter((step, index) => routineCompleted[`${stage.name}-${index}`]).length, 0)
  const routineProgress = Math.round((completedRoutineCount / routineSteps.length) * 100)
  const routineProgressMessage = completedRoutineCount === 0 ? 'Tu rutina está empezando ✦' : completedRoutineCount === routineSteps.length ? 'Tu rutina está completa ✦' : '¡Vas muy bien!'
  const recommendedColors = [...new Set([...selectedMood.colors, ...selectedAlterEgo.colors])].slice(0, 4)
  const moodTheme = selectedMood.name.toLowerCase()
  const previewClass = `${generator.ojos.toLowerCase()} ${generator.labios.toLowerCase()} ${generator.acabado.toLowerCase()}`
  const generatedProposal = generatedLook ? parseLookProposal(generatedLook) : null
  const latestSavedLook = archive[0] || null
  const matchedProducts = latestSavedLook ? getMatchingStoreProducts(latestSavedLook) : []
  const chronologicalLooks = [...archive].reverse()

  const loadPhoto = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('Selecciona un archivo de imagen válido.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('La imagen debe pesar menos de 5 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setUserPhoto({ src: reader.result, file, name: file.name })
      setPhotoError('')
      setAnalysisText('')
      setAnalysisError('')
      setAnalysisStatus('')
    }
    reader.onerror = () => setPhotoError('No pudimos abrir esta imagen. Prueba con otro archivo.')
    reader.readAsDataURL(file)
  }

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    loadPhoto(file)
  }

  const handlePhotoDrop = (event) => {
    event.preventDefault()
    setIsDraggingPhoto(false)
    loadPhoto(event.dataTransfer.files?.[0])
  }

  const analyzeLook = async () => {
    if (!userPhoto || (analysisStatus && analysisStatus !== 'success')) return
    setAnalysisError('')
    setAnalysisText('')
    try {
      for (const status of analysisStatuses) {
        setAnalysisStatus(status)
        await new Promise((resolve) => window.setTimeout(resolve, 650))
      }
      const responseText = await requestBeautyAi({
        sessionId: createBeautyAiSessionId(),
        message: 'Analiza esta fotografía para Sweet Makeup. Devuelve únicamente observaciones reales sobre Beauty DNA, compatibilidad de estilo, armonía, intensidad recomendada, glow, contraste, colores recomendados y recomendaciones de maquillaje. Si un dato no puede determinarse, indícalo claramente. No inventes porcentajes.',
        image: userPhoto
      })
      if (!responseText?.trim() || responseText === 'No recibí una respuesta de la asesora.') throw new Error('Empty AI response')
      setAnalysisText(responseText)
      setAnalysisStatus('success')
    } catch {
      setAnalysisError('Algo salió mal durante el análisis.')
      setAnalysisStatus('')
    }
  }

  const retryAnalysis = () => {
    setAnalysisText('')
    analyzeLook()
  }

  const generateLook = async () => {
    if (generatorStatus === 'loading') return
    setGeneratorStatus('loading')
    setGeneratedLook('')
    try {
      const responseText = await requestBeautyAi({
        sessionId: createBeautyAiSessionId(),
        message: `Crea una propuesta personalizada de maquillaje para Sweet Makeup usando estas elecciones de la usuaria: ocasión ${generatorOccasion}, vibe ${generatorVibe}, intensidad ${generatorIntensity}, alter ego ${selectedAlterEgo.name}, mood ${selectedMood.name}, combinación aplicada ${Object.entries(appliedMakeup).map(([category, option]) => `${category}: ${option.name}`).join('; ') || 'sin selecciones aplicadas'}, categoría de ojos ${generator.ojos}, labios ${generator.labios}, acabado ${generator.acabado} y tono elegido ${selectedColor.name}. Responde en español con una línea por campo usando exactamente este formato: Nombre del look: ..., Labios: ..., Ojos: ..., Rubor: ..., Glow: ..., Intensidad: ..., Descripción: .... No incluyas porcentajes ni afirmes haber analizado el rostro.`,
        image: userPhoto
      })
      if (!responseText?.trim() || responseText === 'No recibí una respuesta de la asesora.') throw new Error('Empty AI response')
      setGeneratedLook(responseText)
      setGeneratorStatus('success')
    } catch {
      setGeneratorStatus('error')
    }
  }

  const clearGeneratedProposal = () => {
    setGeneratedLook('')
    setGeneratorStatus('')
  }

  const saveLook = () => {
    const selectedProducts = Object.fromEntries(archiveMakeupFields.map(([key, , category]) => [key, makeupSelections[category]?.name || null]))
    const hasSelection = Object.values(selectedProducts).some(Boolean)
    if (!hasSelection) {
      setArchiveNotice('Selecciona al menos un producto en Makeup Lab para guardar tu look.')
      setArchiveError('')
      return
    }

    const newLook = {
      id: Date.now(),
      name: `${selectedMood.look} / ${selectedAlterEgo.name}`,
      date: new Date().toISOString(),
      ...selectedProducts,
      intensity: generatorIntensity,
      style: `${selectedMood.name} / ${selectedAlterEgo.name}`,
      mood: selectedMood.name,
      occasion: generatorOccasion,
      vibe: generatorVibe,
      color: recommendedColors.join(', '),
      makeup: Object.fromEntries(Object.entries(appliedMakeup).map(([category, option]) => [category, option.name])),
      image: userPhoto?.src || modelImages[activeMood % modelImages.length]
    }
    const nextArchive = [newLook, ...archive].slice(0, 6)
    try {
      localStorage.setItem('sweet-makeup-archive', JSON.stringify(nextArchive))
      setArchive(nextArchive)
      setArchiveError('')
      setArchiveNotice('Look guardado en tu archivo de este dispositivo.')
    } catch {
      setArchiveError('No pudimos guardar el look. Comprueba el espacio disponible en este dispositivo.')
      setArchiveNotice('')
    }
  }

  const removeArchiveLook = (id) => {
    const nextArchive = archive.filter((look) => look.id !== id)
    try {
      localStorage.setItem('sweet-makeup-archive', JSON.stringify(nextArchive))
      setArchive(nextArchive)
      setCompareIds((selectedIds) => selectedIds.filter((selectedId) => selectedId !== id))
      if (viewingLookId === id) setViewingLookId(null)
      setArchiveError('')
    } catch {
      setArchiveError('No pudimos actualizar el archivo en este dispositivo.')
    }
  }

  const toggleCompareLook = (lookId) => {
    setArchiveNotice('')
    if (compareIds.includes(lookId)) {
      setCompareIds(compareIds.filter((selectedId) => selectedId !== lookId))
      return
    }
    if (compareIds.length >= 2) {
      setArchiveNotice('Puedes comparar hasta dos looks a la vez.')
      return
    }
    setCompareIds([...compareIds, lookId])
  }

  const comparingLooks = compareIds.map((id) => archive.find((look) => look.id === id)).filter(Boolean)
  const comparisonConclusion = comparingLooks.length === 2
    ? (() => {
        const intensityRank = { soft: 0, medium: 1, bold: 2 }
        const firstRank = intensityRank[String(comparingLooks[0].intensity || '').toLowerCase()]
        const secondRank = intensityRank[String(comparingLooks[1].intensity || '').toLowerCase()]
        if (firstRank === undefined || secondRank === undefined) return 'No hay intensidad comparable registrada para ambos looks.'
        if (firstRank === secondRank) return `Ambos looks tienen intensidad ${comparingLooks[0].intensity}.`
        const moreIntenseLook = firstRank > secondRank ? comparingLooks[0] : comparingLooks[1]
        const moreNaturalLook = firstRank < secondRank ? comparingLooks[0] : comparingLooks[1]
        return `Tu look más intenso: ${moreIntenseLook.name}. Tu look más natural: ${moreNaturalLook.name}.`
      })()
    : ''

  const scrollToStudio = () => document.getElementById('virtual-beauty-studio')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToLookbook = () => document.getElementById('beauty-lookbook')?.scrollIntoView({ behavior: 'smooth' })
  const applyMakeupSelection = () => {
    if (Object.keys(makeupSelections).length === 0) return
    setAppliedMakeup({ ...makeupSelections })
    clearGeneratedProposal()
  }

  const toggleRoutineStep = (stageName, stepIndex) => {
    const stepKey = `${stageName}-${stepIndex}`
    setRoutineCompleted((current) => ({ ...current, [stepKey]: !current[stepKey] }))
  }

  const applyTrend = () => {
    const trendSelections = Object.fromEntries(Object.entries(selectedTrend.makeup).map(([categoryName, optionName]) => {
      const category = makeupCategories.find((item) => item.name === categoryName)
      return [categoryName, category?.options.find((option) => option.name === optionName)]
    }).filter(([, option]) => option))

    setMakeupSelections((current) => ({ ...current, ...trendSelections }))
    setAppliedMakeup((current) => ({ ...current, ...trendSelections }))
    setGeneratorOccasion(selectedTrend.occasion)
    setGeneratorVibe(selectedTrend.vibe)
    setGeneratorIntensity(selectedTrend.intensity)
    const moodIndex = moods.findIndex((mood) => mood.name === selectedTrend.mood)
    if (moodIndex >= 0) setActiveMood(moodIndex)
    setActiveCategory(Object.keys(trendSelections)[0] || activeCategory)
    setAppliedTrend(selectedTrend.name)
    clearGeneratedProposal()
  }

  return (
    <main className={`looks-page mood-theme-${moodTheme}`}>
      <div className="looks-ambient looks-ambient-one" aria-hidden="true" /><div className="looks-ambient looks-ambient-two" aria-hidden="true" /><div className="looks-orbit looks-orbit-one" aria-hidden="true" /><div className="looks-orbit looks-orbit-two" aria-hidden="true" /><Sparkle className="looks-spark-one" /><Sparkle className="looks-spark-two" />

      <section className="looks-section looks-hero">
        <div className="looks-hero-copy looks-hero-reveal"><p className="looks-eyebrow">LOOKS / THE BEAUTY AI LAB</p><h1>TU ROSTRO.<br />TU ESTILO.<br /><em>TU LOOK.</em></h1><p className="looks-hero-lead">Experimenta con tu belleza, descubre nuevos estilos y deja que la tecnología te ayude a encontrar el look que más representa tu esencia.</p><div className="looks-scan-tags"><span>AI SCAN</span><span>COLOR / 001</span><span>STYLE SYSTEM</span></div><div className="looks-hero-actions"><button type="button" className="looks-primary-button" onClick={scrollToStudio}>✦ PROBAR MI LOOK</button><button type="button" className="looks-secondary-button" onClick={scrollToLookbook}>EXPLORAR INSPIRACIÓN <b>↓</b></button></div></div>
        <div className="looks-hero-visual looks-hero-reveal looks-hero-reveal-delay"><div className="hero-scan-orbit" aria-hidden="true" /><div className="hero-scan-orbit hero-scan-orbit-inner" aria-hidden="true" /><div className="hero-image"><img src={models1} alt="Modelo en el Beauty AI Lab" /><span className="hero-scan-line" /><span className="hero-corner hero-corner-one" /><span className="hero-corner hero-corner-two" /></div><span className="hero-code">FACE / STYLE<br /><b>READY TO SCAN</b></span><span className="hero-index">001 / 005</span><span className="hero-online"><i /> BEAUTY AI ONLINE</span><span className="hero-experience">PERSONAL BEAUTY EXPERIENCE</span><span className="hero-analysis-dot hero-analysis-dot-one" /><span className="hero-analysis-dot hero-analysis-dot-two" /></div>
      </section>

      <section className="looks-section studio-section" id="virtual-beauty-studio">
        <div className="section-heading"><p className="looks-eyebrow">01 / VIRTUAL BEAUTY STUDIO</p><h2>VIRTUAL BEAUTY<br /><em>STUDIO</em></h2><p className="studio-subtitle">Tu rostro es el lienzo. Tu estilo es la creación.</p><p>Sube una fotografía y comienza a explorar diferentes posibilidades de maquillaje, colores y estilos.</p></div>
        <div className="studio-layout"><div className="studio-upload"><div className={`studio-frame ${userPhoto ? 'has-photo' : ''} ${analysisStatus && analysisStatus !== 'success' ? 'is-scanning' : ''} ${isDraggingPhoto ? 'is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setIsDraggingPhoto(true) }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsDraggingPhoto(false) }} onDrop={handlePhotoDrop} onClick={() => !userPhoto && fileInput.current?.click()} onKeyDown={(event) => { if (!userPhoto && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); fileInput.current?.click() } }} role="button" tabIndex={0} aria-label="Arrastra una fotografía aquí o selecciona una imagen">{userPhoto ? <img src={userPhoto.src} alt="Vista previa de tu fotografía" /> : <div className="studio-empty"><span>◌</span><strong>ARRASTRA TU FOTO AQUÍ</strong><small>o selecciona una imagen desde tu dispositivo</small><b>✦ SUBIR FOTO</b></div>}<span className="studio-scan" aria-hidden="true" /><span className="studio-analysis-ring" aria-hidden="true" /><span className="studio-corner studio-corner-top" aria-hidden="true" /><span className="studio-corner studio-corner-bottom" aria-hidden="true" /><span className="studio-label">VIRTUAL TRY-ON / PREVIEW</span>{userPhoto && <span className="studio-photo-name">{userPhoto.name}</span>}</div><input ref={fileInput} type="file" accept="image/*" hidden onChange={handlePhoto} /><div className="studio-actions"><button type="button" onClick={() => fileInput.current?.click()}>{userPhoto ? 'CAMBIAR FOTOGRAFÍA' : '✦ SUBIR FOTO'}</button>{userPhoto && <button type="button" className="text-button" onClick={() => { setUserPhoto(null); setAnalysisText(''); setAnalysisStatus(''); setAnalysisError(''); setPhotoError('') }}>ELIMINAR</button>}</div>{photoError && <p className="studio-photo-error" role="alert">{photoError}</p>}<button type="button" className="ai-analysis-button" disabled={!userPhoto || Boolean(analysisStatus && analysisStatus !== 'success')} onClick={analyzeLook}>✦ ANALIZAR MI LOOK</button><p className="studio-tryon-note">Preview listo para conectar con virtual try-on. La fotografía no se modifica.</p></div><div className="studio-note"><span className="studio-ai">AI <b>✦</b></span><h3>Un espejo que aprende<br /><em>de ti, no al revés.</em></h3><p>La vista previa conserva tu imagen original. El análisis usa la conexión existente de Claude y no aplica maquillaje sobre la fotografía.</p><div className="studio-stats"><span><b>01</b> PRIVATE PREVIEW</span><span><b>∞</b> POSSIBILITIES</span></div></div></div>
      </section>

      <section className="looks-section analysis-section"><div className="section-heading"><p className="looks-eyebrow">02 / BEAUTY AI SCAN</p><h2>Descubre lo que tu estilo<br /><em>dice de ti.</em></h2><p>La inteligencia artificial analiza tu estilo y genera recomendaciones personalizadas de maquillaje.</p></div>{!analysisStatus && !analysisError && !analysisText && <p className="analysis-initial">{userPhoto ? 'Fotografía lista. Pulsa “ANALIZAR MI LOOK” para comenzar.' : 'Sube una fotografía para comenzar.'}</p>}{analysisStatus && analysisStatus !== 'success' && <div className="analysis-progress"><span className="analysis-spinner" /><div><strong>{analysisStatus}</strong><small>BEAUTY AI SCAN / IMAGE ANALYSIS</small></div></div>}{analysisError && <div className="analysis-error"><span>{analysisError}</span><button type="button" onClick={retryAnalysis}>REINTENTAR</button></div>}<div className="analysis-dashboard">{getAnalysisMetrics(analysisText).map((metric) => <div className="analysis-metric" key={metric.label}><div className="analysis-metric-top"><span>{metric.label}</span><strong>{metric.value === null ? '--' : `${metric.value}%`}</strong></div><div className="analysis-metric-track"><i style={{ width: metric.value === null ? '0%' : `${metric.value}%` }} /></div><small>{metric.value === null ? 'PENDIENTE DE ANÁLISIS' : 'CLAUDE ANALYSIS'}</small></div>)}</div>{analysisText && <div className="analysis-result"><div className="analysis-result-head"><span className="studio-ai">BEAUTY PROFILE / CLAUDE</span><span>RESPUESTA REAL</span></div><div className="analysis-colors">{recommendationColors.filter((color) => analysisText.toUpperCase().includes(color)).map((color) => <span key={color}>{color}</span>)}</div><p className="analysis-raw">{analysisText}</p></div>}</section>

      <section className="looks-section makeup-lab-section" id="makeup-lab">
        <div className="section-heading"><p className="looks-eyebrow">02 / BEAUTY FORMULATION</p><h2>MAKEUP <em>LAB</em></h2><p>Explora texturas y tonos. Tu selección se convierte en una combinación editable para tu look.</p></div>
        <div className="makeup-lab-shell" style={{ '--makeup-accent': selectedMakeupOption?.color || selectedColor.hex }}>
          <nav className="makeup-category-nav" aria-label="Categorías de maquillaje">
            {makeupGroups.map((group) => <div className="makeup-category-group" key={group.name}><span className="makeup-group-label"><i>{group.icon}</i>{group.name}</span><div>{group.categories.map((category) => <button type="button" className={activeCategory === category.name ? 'makeup-category active' : 'makeup-category'} onClick={() => setActiveCategory(category.name)} aria-pressed={activeCategory === category.name} key={category.name}>{category.name}<span>{makeupSelections[category.name] ? '✓' : '＋'}</span></button>)}</div></div>)}
          </nav>
          <div className="makeup-workbench">
            <div className="makeup-workbench-heading"><div><p className="looks-eyebrow">{selectedMakeupCategory.icon} {makeupGroups.find((group) => group.categories.some((category) => category.name === activeCategory))?.name} / FORMULA SELECT</p><h3>{selectedMakeupCategory.name}</h3><p>{selectedMakeupCategory.description}</p></div><span className="makeup-live-indicator"><i /> LIVE</span></div>
            <div className="makeup-choice-swatches">{selectedMakeupCategory.options.map((option, index) => <button type="button" className={makeupSelections[activeCategory]?.name === option.name ? 'makeup-option active' : 'makeup-option'} onClick={() => setMakeupSelections((current) => ({ ...current, [activeCategory]: option }))} aria-pressed={makeupSelections[activeCategory]?.name === option.name} key={option.name}><span className="makeup-option-color" style={{ '--option-color': option.color }} /><strong>{option.name}</strong><small>0{index + 1}</small></button>)}</div>
            {selectedMakeupOption ? <div className="makeup-option-detail"><span className="makeup-detail-pigment" style={{ background: selectedMakeupOption.color }} /><div className="makeup-detail-copy"><p className="looks-eyebrow">SELECCIÓN ACTUAL / {activeCategory.toUpperCase()}</p><h4>{selectedMakeupOption.name}</h4><p>{selectedMakeupCategory.description}</p><div className="makeup-detail-meta"><span>INTENSIDAD <b>{selectedMakeupOption.intensity}</b></span><span>ACABADO <b>{selectedMakeupOption.finish}</b></span></div></div></div> : <p className="makeup-option-hint">Selecciona un tono para ver su intensidad y acabado.</p>}
            <button type="button" className="makeup-apply-button" disabled={Object.keys(makeupSelections).length === 0} onClick={applyMakeupSelection}>✦ APLICAR A MI LOOK <span>→</span></button>
          </div>
          <aside className="makeup-combination"><div className="makeup-combination-heading"><span className="looks-eyebrow">BEAUTY FORMULA / 01</span><h3>MI <em>COMBINACIÓN</em></h3><span className={Object.keys(appliedMakeup).length ? 'combination-state applied' : 'combination-state'}>{Object.keys(appliedMakeup).length ? 'APLICADA' : 'EN EDICIÓN'}</span></div>{Object.keys(makeupSelections).length ? <div className="makeup-combination-list">{Object.entries(makeupSelections).map(([category, option]) => <div key={category}><span>{category}</span><strong><i style={{ background: option.color }} />{option.name}</strong><small>{option.finish} / {option.intensity}</small></div>)}</div> : <p className="makeup-combination-empty">Tus tonos elegidos aparecerán aquí mientras construyes tu look.</p>}{Object.keys(appliedMakeup).length > 0 && <p className="makeup-applied-note">Combinación aplicada y lista para tu próximo look guardado o generado.</p>}</aside>
        </div>
      </section>

      <section className="looks-section generator-section">
        <div className="section-heading"><p className="looks-eyebrow">03 / LOOK GENERATOR</p><h2>Create my <em>look.</em></h2><p>Combina ocasión, energía e intensidad. Claude convierte tus elecciones en una propuesta real.</p></div>
        <div className="generator-interface">
          <div className={`generator-preview ${previewClass}`}><img src={models3} alt="Imagen editorial de referencia para el look" /><div className="generator-preview-shade" /><span className="generator-preview-code">BEAUTY LAB / CONFIGURATION<br />{generatorOccasion.toUpperCase()} · {generatorVibe.toUpperCase()}</span><strong>{generator.ojos} / {generator.labios}</strong></div>
          <div className="generator-controls">
            <fieldset className="generator-choice-group"><legend>OCASIÓN</legend><div className="generator-choice-grid occasion-options">{generatorOccasions.map((occasion, index) => <button type="button" className={generatorOccasion === occasion ? 'generator-choice selected' : 'generator-choice'} onClick={() => { setGeneratorOccasion(occasion); clearGeneratedProposal() }} key={occasion}><small>0{index + 1}</small>{occasion}</button>)}</div></fieldset>
            <fieldset className="generator-choice-group"><legend>VIBE</legend><div className="generator-choice-grid vibe-options">{generatorVibes.map((vibe) => <button type="button" className={generatorVibe === vibe ? 'generator-choice selected' : 'generator-choice'} onClick={() => { setGeneratorVibe(vibe); clearGeneratedProposal() }} key={vibe}>{vibe}</button>)}</div></fieldset>
            <fieldset className="generator-choice-group"><legend>INTENSIDAD</legend><div className="generator-intensity" role="group" aria-label="Intensidad del look">{generatorIntensities.map((intensity) => <button type="button" className={generatorIntensity === intensity ? 'selected' : ''} aria-pressed={generatorIntensity === intensity} onClick={() => { setGeneratorIntensity(intensity); clearGeneratedProposal() }} key={intensity}>{intensity}</button>)}</div></fieldset>
            <div className="generator-control"><label>DETALLES DE MAQUILLAJE</label><div className="generator-makeup-selectors">{Object.entries({ ojos: ['Smoky', 'Shimmer', 'Graphic'], labios: ['Nude', 'Cherry', 'Gloss'], acabado: ['Dewy', 'Matte', 'Glass'] }).map(([key, options]) => <label className="generator-select" key={key}>{key.toUpperCase()}<select value={generator[key]} onChange={(event) => { setGenerator({ ...generator, [key]: event.target.value }); clearGeneratedProposal() }}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}</div></div>
            <button type="button" className="generator-ai-button" onClick={generateLook} disabled={generatorStatus === 'loading'}>{generatorStatus === 'loading' ? <><span className="generator-loading-dot" /> CREANDO TU LOOK...</> : generatorStatus === 'error' ? '✦ REINTENTAR' : '✦ CREAR MI LOOK'}</button>
            {generatorStatus === 'loading' && <p className="generator-loading-message" role="status">Consultando tu Beauty AI...</p>}
            {generatorStatus === 'error' && <div className="generator-error" role="alert"><span>No pudimos conectar con Claude. Tu selección sigue guardada; puedes reintentar.</span><button type="button" onClick={generateLook}>REINTENTAR →</button></div>}
            {generatedLook && <article className="generator-result"><div className="generator-result-heading"><span>✦</span><div><small>CLAUDE / PROPUESTA REAL</small><h3>{generatedProposal?.name || 'Tu propuesta de look'}</h3></div></div>{Object.entries({ lips: 'LABIOS', eyes: 'OJOS', blush: 'RUBOR', glow: 'GLOW', intensity: 'INTENSIDAD', description: 'DESCRIPCIÓN' }).some(([key]) => generatedProposal?.[key]) ? <div className="generator-result-fields">{Object.entries({ lips: 'LABIOS', eyes: 'OJOS', blush: 'RUBOR', glow: 'GLOW', intensity: 'INTENSIDAD', description: 'DESCRIPCIÓN' }).filter(([key]) => generatedProposal?.[key]).map(([key, label]) => <div className={key === 'description' ? 'generator-result-field description' : 'generator-result-field'} key={key}><small>{label}</small><p>{generatedProposal[key]}</p></div>)}</div> : <p className="generator-result-raw">{generatedLook}</p>}</article>}
          </div>
        </div>
      </section>

      <section className="looks-section color-section">
        <div className="section-heading"><p className="looks-eyebrow">04 / BEAUTY COLOR LAB</p><h2>Color is a <em>signal.</em></h2><p>Explora familias de color y descubre sus matices, acabados y energía visual.</p></div>
        <div className="color-lab-layout" style={{ '--color-accent': selectedColor.hex }}>
          <div className="color-palette">{colorLab.map((color, index) => <button type="button" className={activeColor === index ? 'color-swatch active' : 'color-swatch'} onClick={() => setActiveColor(index)} aria-pressed={activeColor === index} key={color.family}><span style={{ background: color.hex }} /><small>{color.family}</small></button>)}</div>
          <article className="color-readout"><span className="color-big-dot" style={{ background: selectedColor.hex }} /><div><p className="looks-eyebrow">{selectedColor.family.toUpperCase()} FAMILY / SELECTED</p><h3>{selectedColor.name}</h3><p>{selectedColor.description}</p><div className="color-readout-meta"><span>FAMILIA <b>{selectedColor.family}</b></span><span>ACABADO <b>{selectedColor.finish}</b></span><span>INTENSIDAD <b>{selectedColor.intensity}</b></span></div><small className="color-style-match">ESTILOS / {selectedColor.styles}</small></div></article>
        </div>
      </section>

      <section className="looks-section lip-match-section">
        <div className="section-heading"><p className="looks-eyebrow">05 / LIP MATCH</p><h2>Find your <em>lip signature.</em></h2><p>Selecciona una familia y explora una combinación equilibrada de labios, ojos, rubor y glow.</p></div>
        <div className="lip-match-panel" style={{ '--lip-accent': selectedLipMatch.hex }}>
          <div className="lip-match-selector" role="group" aria-label="Elige un tono para Lip Match">{lipMatchOptions.map((lip, index) => <button type="button" className={activeLipMatch === index ? 'lip-match-choice active' : 'lip-match-choice'} onClick={() => setActiveLipMatch(index)} aria-pressed={activeLipMatch === index} key={lip.name}><i style={{ background: lip.hex }} /><span>{lip.name}</span></button>)}</div>
          <div className="lip-match-result"><div className="lip-match-color"><span style={{ background: selectedLipMatch.hex }} /><small>SELECTED / {selectedLipMatch.name.toUpperCase()}</small></div><div className="lip-match-heading"><p className="looks-eyebrow">CURATED BEAUTY PAIRING</p><h3>{selectedLipMatch.name} <em>match</em></h3><p>Combinación editorial sugerida; no es un análisis de IA ni un resultado personalizado por porcentaje.</p></div><div className="lip-match-recommendations">{[['LABIOS', selectedLipMatch.lips], ['OJOS', selectedLipMatch.eyes], ['RUBOR', selectedLipMatch.blush], ['GLOW', selectedLipMatch.glow]].map(([label, recommendation], index) => <div key={label}><span>0{index + 1} / {label}</span><strong>{recommendation}</strong></div>)}</div></div>
        </div>
      </section>

      <section className="looks-section eye-finder-section">
        <div className="section-heading"><p className="looks-eyebrow">06 / EYE LOOK FINDER</p><h2>Frame your <em>gaze.</em></h2><p>Encuentra una dirección para tu mirada y conoce los elementos que componen cada estilo.</p></div>
        <div className="eye-finder-panel">
          <div className="eye-style-selector" role="group" aria-label="Selecciona un estilo de ojos">{eyeLooks.map((style, index) => <button type="button" className={activeEyeLook === index ? 'eye-style-choice active' : 'eye-style-choice'} onClick={() => setActiveEyeLook(index)} aria-pressed={activeEyeLook === index} key={style.name}><span>0{index + 1}</span><strong>{style.name}</strong><i>✦</i></button>)}</div>
          <article className="eye-look-result"><div className="eye-result-orbit" aria-hidden="true"><span>◉</span></div><div className="eye-result-copy"><p className="looks-eyebrow">EYE PROFILE / {selectedEyeLook.intensity.toUpperCase()}</p><h3>{selectedEyeLook.name} <em>eyes</em></h3><p>{selectedEyeLook.description}</p><div className="eye-result-details"><div><small>SOMBRAS RECOMENDADAS</small><strong>{selectedEyeLook.shadows}</strong></div><div><small>DELINEADOR</small><strong>{selectedEyeLook.liner}</strong></div><div><small>PESTAÑINA</small><strong>{selectedEyeLook.mascara}</strong></div><div><small>INTENSIDAD</small><strong>{selectedEyeLook.intensity}</strong></div></div></div></article>
        </div>
      </section>

      <section className="looks-section alter-section">
        <div className="section-heading centered">
          <p className="looks-eyebrow">04 / STYLE ALTER EGO</p>
          <h2>DESCUBRE TU<br /><em>ALTER EGO</em></h2>
          <p>Elige una identidad visual y encuentra nuevos matices para tu propuesta.</p>
        </div>
        <div className="alter-rail">
          {alterEgos.map((ego, index) => (
            <button type="button" className={activeEgo === index ? 'alter-pill active' : 'alter-pill'} onClick={() => { setActiveEgo(index); setActiveCategory(ego.category) }} key={ego.name} aria-pressed={activeEgo === index}>
              <span>0{index + 1}</span><strong>{ego.name}</strong><i aria-hidden="true">✦</i>
            </button>
          ))}
        </div>
        <article className="alter-feature">
          <div className="alter-feature-orbit" aria-hidden="true">✦</div>
          <div className="alter-feature-main"><p className="looks-eyebrow">ACTIVE ALTER EGO / 0{activeEgo + 1}</p><h3>{selectedAlterEgo.name}</h3><p>{selectedAlterEgo.description}</p></div>
          <div className="alter-details">
            <div><small>TONOS SUGERIDOS</small><div className="alter-color-list">{selectedAlterEgo.colors.map((color) => <span key={color}>{color}</span>)}</div></div>
            <div><small>INTENSIDAD</small><strong>{selectedAlterEgo.intensity}</strong></div>
            <div><small>OJOS</small><strong>{selectedAlterEgo.eyes}</strong></div>
            <div><small>LABIOS</small><strong>{selectedAlterEgo.lips}</strong></div>
          </div>
          <button type="button" className="alter-try-button" onClick={() => document.getElementById('makeup-lab')?.scrollIntoView({ behavior: 'smooth' })}>PROBAR ESTE ALTER EGO <span>↓</span></button>
        </article>
      </section>

      <section className="looks-section mood-section">
        <div className="section-heading centered"><p className="looks-eyebrow">05 / MOOD → LOOK</p><h2>¿CÓMO QUIERES<br /><em>VERTE HOY?</em></h2><p>Elige una energía y mira cómo evoluciona tu propuesta.</p></div>
        <div className="mood-grid">
          {moods.map((mood, index) => <button type="button" className={activeMood === index ? 'mood-card active' : 'mood-card'} onClick={() => setActiveMood(index)} key={mood.name} aria-pressed={activeMood === index}><span>{mood.icon}</span><strong>{mood.name}</strong><i>0{index + 1}</i></button>)}
        </div>
        <article className="mood-signal">
          <div className="mood-signal-art" aria-hidden="true"><span className="mood-aura" /><span className="mood-aura-inner">{selectedMood.icon}</span><span className="mood-art-orbit" /></div>
          <div className="mood-signal-copy"><p className="looks-eyebrow">TU LOOK PODRÍA SER...</p><h3>{selectedMood.look}</h3><p className="mood-ego-line">{selectedAlterEgo.name} / {selectedMood.name}</p>
            <div className="mood-summary-grid"><div><small>LABIOS</small><strong>{selectedMood.lips}</strong></div><div><small>OJOS</small><strong>{selectedMood.eyes}</strong></div><div><small>RUBOR</small><strong>{selectedMood.blush}</strong></div><div><small>GLOW</small><strong>{selectedMood.glow}</strong></div></div>
            <div className="mood-summary-footer"><span>INTENSIDAD <b>{selectedMood.intensity}</b></span><div className="mood-color-swatches">{recommendedColors.map((color, index) => <i key={`${color}-${index}`} title={color} style={{ '--swatch-color': beautyColorHex[color.toLowerCase()] || 'var(--mood-glow)' }} />)}</div><span className="mood-color-names">{recommendedColors.join(' / ')}</span></div>
          </div>
        </article>
      </section>

      <section className="looks-section match-section"><div className="section-heading"><p className="looks-eyebrow">06 / BEAUTY MATCH</p><h2>Find your <em>alignment.</em></h2><p>Compatibilidad visual entre tu mood, tu alter ego y el color que elegiste.</p></div><div className="match-meter"><div className="match-score"><strong>{getAnalysisMetrics(analysisText).find((metric) => /compatibilidad/i.test(metric.label))?.value || '--'}{getAnalysisMetrics(analysisText).some((metric) => /compatibilidad/i.test(metric.label)) ? '%' : ''}</strong><span>{analysisText ? 'AI STYLE MATCH' : 'WAITING FOR AI'}</span></div><div className="match-lines"><span><i style={{ width: analysisText ? '82%' : '0%' }} /><b>ALTER EGO / {selectedAlterEgo.name}</b></span><span><i style={{ width: analysisText ? '76%' : '0%' }} /><b>MOOD / {selectedMood.name}</b></span><span><i style={{ width: analysisText ? '88%' : '0%' }} /><b>COLOR / {selectedColor.name}</b></span></div></div></section>

      <section className="looks-section routine-section">
        <div className="section-heading centered"><p className="looks-eyebrow">07 / BEAUTY RITUAL</p><h2>MY BEAUTY<br /><em>ROUTINE</em></h2><p>Marca cada paso y sigue tu ritual antes, durante y después del maquillaje.</p></div>
        <div className="routine-progress-panel"><div className="routine-progress-copy"><span className="looks-eyebrow">RITUAL PROGRESS</span><strong>{completedRoutineCount} <i>/</i> {routineSteps.length}</strong><p>{routineProgressMessage}</p></div><div className="routine-progress-track" role="progressbar" aria-label="Progreso de la rutina" aria-valuemin={0} aria-valuemax={routineSteps.length} aria-valuenow={completedRoutineCount}><span style={{ width: `${routineProgress}%` }} /></div><small>{routineProgress}% COMPLETADO</small></div>
        <div className="routine-stage-grid">{routineStages.map((stage, stageIndex) => <article className={`routine-stage routine-stage-${stage.name.toLowerCase()}`} key={stage.name}><header><span>0{stageIndex + 1}</span><div><p>{stage.name}</p><h3>{stage.title}</h3></div><i aria-hidden="true">{stage.name === 'BEFORE' ? '◌' : stage.name === 'MAKEUP' ? '✦' : '☾'}</i></header><div className="routine-stage-steps">{stage.steps.map((step, stepIndex) => { const stepKey = `${stage.name}-${stepIndex}`; const isCompleted = Boolean(routineCompleted[stepKey]); return <button type="button" role="checkbox" aria-checked={isCompleted} className={isCompleted ? 'routine-check-step completed' : 'routine-check-step'} onClick={() => toggleRoutineStep(stage.name, stepIndex)} key={stepKey}><span className="routine-checkbox">{isCompleted ? '✓' : ''}</span><span>{step}</span><small>{String(stepIndex + 1).padStart(2, '0')}</small></button> })}</div></article>)}</div>
      </section>

      <section className="looks-section trend-section">
        <div className="section-heading"><p className="looks-eyebrow">08 / THE TREND EDIT</p><h2>TRY THE <em>TREND</em></h2><p>Explora una dirección de belleza y llévala a tu combinación actual.</p></div>
        <div className="trend-layout">
          <div className="trend-selector" role="group" aria-label="Selecciona una tendencia">{trendPresets.map((trend, index) => <button type="button" className={selectedTrendIndex === index ? 'trend-choice active' : 'trend-choice'} onClick={() => setSelectedTrendIndex(index)} aria-pressed={selectedTrendIndex === index} key={trend.name}><span>0{index + 1}</span><strong>{trend.name}</strong><i>↗</i></button>)}</div>
          <article className="trend-detail" style={{ '--trend-accent': beautyColorHex[selectedTrend.colors[0].toLowerCase()] || '#ff2fa3' }}><div className="trend-detail-orbit" aria-hidden="true">✦</div><div className="trend-detail-heading"><p className="looks-eyebrow">TREND PROFILE / 0{selectedTrendIndex + 1}</p><h3>{selectedTrend.name}</h3><p>{selectedTrend.description}</p></div><div className="trend-data-grid"><div><small>COLORES</small><div className="trend-color-list">{selectedTrend.colors.map((color) => <span key={color}><i style={{ background: beautyColorHex[color.toLowerCase()] || 'var(--trend-accent)' }} />{color}</span>)}</div></div><div><small>INTENSIDAD</small><strong>{selectedTrend.intensity}</strong></div><div><small>VIBE / OCASIÓN</small><strong>{selectedTrend.vibe} / {selectedTrend.occasion}</strong></div></div><div className="trend-products"><small>PRODUCTOS DEL CATÁLOGO</small><div>{selectedTrend.products.map((product) => <span key={product}>{product}</span>)}</div></div><button type="button" className="trend-apply-button" onClick={applyTrend}>{appliedTrend === selectedTrend.name ? '✓ ESTILO APLICADO' : '✦ PROBAR ESTE ESTILO'} <span>→</span></button>{appliedTrend === selectedTrend.name && <p className="trend-applied-note" role="status">Selecciones actualizadas en Makeup Lab y Look Generator.</p>}</article>
        </div>
      </section>

      <section className="looks-section lookbook-section" id="beauty-lookbook"><div className="section-heading"><p className="looks-eyebrow">08 / BEAUTY LOOKBOOK</p><h2>Looks in <em>motion.</em></h2><p>Un archivo editorial de rostros, texturas y posibilidades.</p></div><div className="lookbook-mural">{modelImages.map((image, index) => <article className={`lookbook-piece piece-${index + 1}`} key={image}><img src={image} alt={`Lookbook ${index + 1}`} /><span>LOOK 00{index + 1}</span><strong>{lookNames[index]}</strong><small>BEAUTY / AI / ARCHIVE</small></article>)}</div></section>

      <section className="looks-section mirror-section">
        <div className="mirror-visual">
          <div className="mirror-grid" aria-hidden="true" />
          <div className="mirror-indicator mirror-indicator-skin"><span>SKIN</span><i /></div>
          <div className="mirror-indicator mirror-indicator-lips"><span>LIPS</span><i /></div>
          <div className="mirror-indicator mirror-indicator-eyes"><span>EYES</span><i /></div>
          <div className="mirror-indicator mirror-indicator-glow"><span>GLOW</span><i /></div>
          <div className="mirror-indicator mirror-indicator-style"><span>STYLE</span><i /></div>
          <div className={userPhoto ? 'mirror-frame has-photo' : 'mirror-frame mirror-empty'}>
            {userPhoto ? <img src={userPhoto.src} alt="Vista de Beauty Mirror con tu fotografía" /> : <div><span>◌</span><strong>Carga tu foto para activar Beauty Mirror ✦</strong><button type="button" onClick={() => fileInput.current?.click()}>SUBIR FOTOGRAFÍA</button></div>}
            {userPhoto && <><span className="mirror-scan" /><span className="mirror-scan-grid" /><b>BEAUTY MIRROR / PREVIEW</b></>}
          </div>
          <Sparkle className="mirror-spark" />
        </div>
        <div className="mirror-copy"><p className="looks-eyebrow">09 / BEAUTY MIRROR</p><h2>See yourself<br /><em>in a new light.</em></h2><p>Tu fotografía se muestra como una representación visual del estilo seleccionado. No se modifica físicamente ni se aplica maquillaje a sus píxeles.</p><button type="button" className="outline-button" onClick={() => fileInput.current?.click()}>{userPhoto ? 'CAMBIAR FOTOGRAFÍA →' : 'ACTIVAR BEAUTY MIRROR →'}</button></div>
      </section>

      <section className="looks-section archive-section">
        <div className="section-heading"><p className="looks-eyebrow">10 / MY BEAUTY ARCHIVE</p><h2>Keep your <em>evolution.</em></h2><p>Tus combinaciones de Makeup Lab se guardan localmente en este dispositivo.</p></div>
        <div className="archive-actions"><button type="button" className="looks-primary-button" onClick={saveLook} disabled={Object.keys(makeupSelections).length === 0}>♡ GUARDAR MI LOOK <b>→</b></button><span>{archive.length} / 06 LOOKS GUARDADOS</span></div>
        {archiveNotice && <p className="archive-notice" role="status">{archiveNotice}</p>}
        {archiveError && <p className="archive-error" role="alert">{archiveError}</p>}
        {archive.length > 0 ? <div className="archive-grid">{archive.map((look, index) => {
          const summaryProducts = archiveMakeupFields.map(([key, label]) => look[key] ? `${label}: ${look[key]}` : null).filter(Boolean)
          return <article className="archive-look-card" key={look.id}>
            <div className="archive-card-art"><img src={look.image || models1} alt="" /><span>LOOK #{String(index + 1).padStart(2, '0')}</span><button type="button" className="archive-delete-button" onClick={() => removeArchiveLook(look.id)} aria-label={`Eliminar ${look.name}`}>×</button></div>
            <div className="archive-card-content"><p className="looks-eyebrow">{formatArchiveDate(look.date)}</p><h3>{look.name || `LOOK #${String(index + 1).padStart(2, '0')}`}</h3><p className="archive-card-meta">{look.style || look.mood || 'Estilo no registrado'} · {look.color || 'Colores no registrados'}</p><div className="archive-product-summary">{summaryProducts.length ? summaryProducts.slice(0, 4).map((item) => <span key={item}>{item}</span>) : <small>Productos no registrados en este look.</small>}</div><div className="archive-card-bottom"><span>INTENSIDAD <b>{storedValue(look.intensity)}</b></span><button type="button" className="archive-view-button" aria-expanded={viewingLookId === look.id} onClick={() => setViewingLookId(viewingLookId === look.id ? null : look.id)}>{viewingLookId === look.id ? 'CERRAR' : 'VER'}</button></div>{viewingLookId === look.id && <div className="archive-look-details">{archiveMakeupFields.map(([key, label]) => <div key={key}><span>{label}</span><strong>{storedValue(look[key])}</strong></div>)}</div>}<button type="button" className={compareIds.includes(look.id) ? 'archive-compare-toggle selected' : 'archive-compare-toggle'} aria-pressed={compareIds.includes(look.id)} onClick={() => toggleCompareLook(look.id)}>{compareIds.includes(look.id) ? '✓ SELECCIONADO PARA COMPARAR' : '＋ COMPARAR LOOK'}</button></div>
          </article>
        })}</div> : <div className="archive-empty"><span className="archive-empty-mark">♡</span><strong>TU ARCHIVO ESTÁ ESPERANDO</strong><p>Elige tonos en Makeup Lab y guarda tu primera combinación.</p></div>}
        {archive.length > 0 && <div className="archive-compare-section"><div className="archive-compare-header"><div><p className="looks-eyebrow">BEAUTY DNA / SIDE BY SIDE</p><h3>COMPARAR <em>LOOKS</em></h3><p>Selecciona dos looks guardados para ver sus diferencias.</p></div><span>{compareIds.length} / 2</span></div><button type="button" className="archive-compare-button" disabled={comparingLooks.length !== 2} onClick={() => setArchiveNotice('Comparación actualizada con los datos guardados.')}>COMPARAR LOOKS <b>↗</b></button>{compareIds.length === 2 && <div className="archive-comparison"><div className="comparison-label-column"><span>COMPARACIÓN</span><span>LABIOS</span><span>OJOS</span><span>RUBOR</span><span>GLOW</span><span>INTENSIDAD</span><span>ESTILO</span></div>{comparingLooks.map((look) => <div className="comparison-look-column" key={look.id}><header><small>{formatArchiveDate(look.date)}</small><strong>{look.name}</strong></header><p>{[look.lip, look.gloss].filter(Boolean).join(' / ') || 'No registrado'}</p><p>{[look.eyes, look.eyeliner, look.mascara].filter(Boolean).join(' / ') || 'No registrado'}</p><p>{storedValue(look.blush)}</p><p>{storedValue(look.glow)}</p><p>{storedValue(look.intensity)}</p><p>{look.style || look.mood || 'No registrado'}</p></div>)}</div>}{comparingLooks.length === 2 && <p className="archive-comparison-conclusion">✦ {comparisonConclusion}</p>}</div>}
      </section>

      {latestSavedLook && <section className="looks-section product-match-section">
        <div className="section-heading"><p className="looks-eyebrow">12 / CATALOG MATCH</p><h2>COMPLETE <em>YOUR LOOK</em></h2><p>Productos del catálogo actual relacionados con tu combinación guardada más reciente.</p></div>
        {matchedProducts.length ? <div className="product-match-grid">{matchedProducts.map((product) => <article className="product-match-card" key={product.name}><span className="product-match-mark">✦</span><div><small>{product.category}</small><h3>{product.name}</h3><strong>{formatStorePrice(product.price)}</strong></div><Link to="/tienda" className="product-match-link">VER EN TIENDA <span>→</span></Link></article>)}</div> : <div className="product-match-empty">No encontramos productos del catálogo asociados a las categorías guardadas en este look.</div>}
      </section>}

      <section className="looks-section evolution-section">
        <div className="section-heading centered"><p className="looks-eyebrow">13 / MY BEAUTY TIMELINE</p><h2>MY BEAUTY<br /><em>EVOLUTION</em></h2><p>Una secuencia construida únicamente con tus looks guardados.</p></div>
        {archive.length >= 2 ? <div className="evolution-archive-flow">{chronologicalLooks.map((look, index) => <article className="evolution-look" key={look.id}><div className="evolution-look-marker"><span>LOOK {String(index + 1).padStart(2, '0')}</span><i /></div><div className="evolution-look-card"><small>{formatArchiveDate(look.date)}</small><h3>{look.name || `LOOK ${String(index + 1).padStart(2, '0')}`}</h3><p>{look.style || look.mood || 'Estilo no registrado'}</p><div><span>INTENSIDAD</span><strong>{storedValue(look.intensity)}</strong></div><div><span>COLORES</span><strong>{storedValue(look.color)}</strong></div></div></article>)}</div> : <div className="evolution-empty"><span className="evolution-empty-orbit">✦</span><h3>{archive.length === 0 ? 'Tu historia de belleza comienza con tu primer look.' : 'Tu evolución comienza aquí.'}</h3>{archive.length === 1 && <p>LOOK 01 · {archive[0].name || 'Look guardado'} · {formatArchiveDate(archive[0].date)}</p>}<small>{archive.length === 0 ? 'Guarda una combinación desde My Beauty Archive para empezar tu recorrido.' : 'Guarda otro look para ver la evolución entre tus combinaciones.'}</small></div>}
      </section>

      <section className="looks-section closing-section"><div className="closing-orbit" aria-hidden="true" /><Sparkle className="closing-spark closing-spark-left" /><p className="looks-eyebrow">SWEET MAKEUP / BEAUTY AI LAB</p><h2>TU BELLEZA<br /><em>NO TIENE UN SOLO LOOK.</em></h2><p className="closing-copy">Explora. Experimenta. Descubre.<br />Y deja que tu estilo cambie contigo.</p><Link to="/asesoria-ia" className="looks-primary-button">✦ HABLAR CON MI ASESORA IA <b>→</b></Link><Sparkle className="closing-spark" /></section>
    </main>
  )
}

export default Looks
