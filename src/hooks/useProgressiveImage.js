import { useState, useEffect } from 'react'

const useProgressiveImage = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc)

  useEffect(() => {
    const img = new Image()

    img.src = highQualitySrc
    img.onload = () => setSrc(highQualitySrc)
  }, [lowQualitySrc, highQualitySrc])

  return [src, src === lowQualitySrc]
}

export default useProgressiveImage
