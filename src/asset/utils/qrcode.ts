const { AwesomeQR } = require('awesome-qr')
import {
  Encoder,
  Decoder,
  QRByte,
  QRKanji,
  ErrorCorrectionLevel
} from '@nuintun/qrcode'
const LOGO =
  'data:image/png;base64,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'
const qrcodeDecoder = new Decoder()

export const generateQrCodeBase64 = async (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // const meta = text.startsWith('http') ? text : EXTENSION_LINK + text;
    const meta = text

    const url = 'https://s3.bmp.ovh/imgs/2022/02/f88fe67806036f90.png'

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = function () {
          new AwesomeQR({
            text: meta,
            size: 200,
            margin: 20,
            // backgroundImage: this.result,
            //@ts-ignore
            logoImage: this.result,
            logoScale: 0.2
            // dotScale: 0.5,
            // scale: 0.5,
          })
            .draw()
            .then((dataURL) => resolve(dataURL))
        }
        reader.readAsDataURL(blob)
      })
      .catch((e) => {
        new AwesomeQR({
          text: meta,
          size: 200,
          margin: 20
        })
          .draw()
          .then((dataURL) => resolve(dataURL))
      })
  })
}

export const decodeQrcodeFromImgSrc = async (
  imgSrc: string
): Promise<string> => {
  // try scan twice
  try {
    const _result = await qrcodeDecoder.scan(imgSrc)
    if (_result) {
      return _result.data
    }
  } catch (error) {
    // qrcode error
    // console.error(error)
  }
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = imgSrc

    image.onload = function () {
      try {
        const width = image.width
        const height = image.height
        const qrCodeX = width / 2 - 50 // qrcode is 100 x100
        const qrCodeY = height / 2 - 50
        context?.drawImage(image, qrCodeX, qrCodeY, 100, 100, 0, 0, 100, 100)
        const imageData = context?.getImageData(0, 0, 100, 100)
        const result = qrcodeDecoder
          .setOptions({ canOverwriteImage: false })
          .decode(imageData!.data, imageData!.width, imageData!.height)
        resolve(result?.data)
      } catch (err) {
        // second try with canvas
        // console.error(err)
        reject(err)
      }
    }
  })
}
