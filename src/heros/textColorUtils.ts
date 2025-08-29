export const getTextColorClasses = (textColor: string = 'white'): string => {
  const colorMap = {
    white: 'text-white',
    black: 'text-black',
    'gray-light': 'text-gray-300',
    'gray-dark': 'text-gray-800',
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
  }
  
  return colorMap[textColor as keyof typeof colorMap] || 'text-white'
}

export const getCaptionTextColorClasses = (textColor: string = 'white'): string => {
  const colorMap = {
    white: 'text-white/80',
    black: 'text-black/70',
    'gray-light': 'text-gray-300/80',
    'gray-dark': 'text-gray-800/80',
    blue: 'text-blue-600/80',
    red: 'text-red-600/80',
    green: 'text-green-600/80',
    yellow: 'text-yellow-600/80',
    purple: 'text-purple-600/80',
    pink: 'text-pink-600/80',
  }
  
  return colorMap[textColor as keyof typeof colorMap] || 'text-white/80'
}
