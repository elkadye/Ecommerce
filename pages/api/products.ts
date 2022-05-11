// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { SheetsData } from 'types'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  extractSheets(
    {
      // your google spreadsheet key
      spreadsheetKey: process.env.SHEET_KEY,
      // your google oauth2 credentials or API_KEY
      credentials,
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Products','Products_images','Products_variant','Categories'],
    },
    function (err: any, data: SheetsData) {
      const apiProducts = data.Products.map((product) =>{
        const product_images= data.Products_images.filter((image) => image.Product_ID === product.id)
        const product_variant = data.Products_variant.filter((variant) => variant.product_id === product.id)
        const product_category = data.Categories.find((category) => category.id === product.category_id)

        return{
          ...product,
          product_category,
          product_images,
          product_variant
        }
      }
        )
      console.log({ data })
      res.status(200).json(apiProducts)
    }
  )
}
