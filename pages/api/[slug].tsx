// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { GProduct, SheetsData } from 'types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )
  const { slug } = req.query
  console.log(slug)
  extractSheets(
    {
      // your google spreadsheet key
      spreadsheetKey: process.env.SHEET_KEY,
      // your google oauth2 credentials or API_KEY
      credentials,
      // optional: names of the sheets you want to extract
      sheetsToExtract: [
        'Products',
        'Products_images',
        'Products_variant',
        'Categories',
      ],
    },
    function (err: any, data: SheetsData) {
      const apiProduct = data.Products.find(
        (product: GProduct) => product.slug === slug
      )
      console.log(apiProduct)
      if (!apiProduct) {
        return res.status(404).json({ msg: "product doesn't exist" })
        console.log('400 not found')
      }
      const product_images = data.Products_images.filter(
        (image) => image.Product_ID === apiProduct.id
      )
      const product_variant = data.Products_variant.filter(
        (variant) => variant.product_id === apiProduct.id
      )
      const product_category = data.Categories.find(
        (category) => category.id === apiProduct.category_id
      )

      return res.status(200).json( {
        ...apiProduct,
        trending: (apiProduct.trending + '').toLowerCase() === 'true',
        product_category,
        product_images,
        product_variant,
      }
      )
      console.log({ apiProduct })
    }
    // console.log({ apiProduct })
    //   res.status(200).json(apiProduct)
  )
}
