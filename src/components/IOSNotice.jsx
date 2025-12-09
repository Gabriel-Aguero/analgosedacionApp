import { useEffect, useState } from 'preact/hooks'

const IOSNotice = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isIOS && isSafari) {
      setVisible(true)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div class='w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-xl text-center shadow-md'>
      Para instalar esta app en iPhone:
      <br />
      <strong>Compartir → “Agregar a pantalla de inicio”</strong>
    </div>
  )
}

export default IOSNotice
