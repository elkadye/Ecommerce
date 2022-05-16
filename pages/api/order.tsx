import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { Order } from 'types'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== 'POST') {
  //     return res.status(405).send({ message: 'Only POST requests allowed' })
  // }
  const body = req.body as Order
  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
    )
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })
    const sheets = google.sheets({
      auth,
      version: 'v4',
    })
    const id = 123
    // TODO: change ID to uuid

    const order = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'Orders!A1:P1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            id,
            body.emailAddress,
            body.firstName,
            body.lastName,
            body.company,
            body.address,
            body.apartment,
            body.city,
            body.country,
            body.region,
            body.postalCode,
            body.phone,
            body.paymentType,
            body.cardNumber,
            body.nameOnCard,
            body.expirationDate,
            body.cvc,
          ],
        ],
      },
    })
    const orderLine = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'OrderLine!A1:C1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: body.orderItems.map((item) => [
          id,
          item.id,
          item.name,
          item.slug,
          item.variantID,
          item.price,
          item.orderQty,
          item.taxAmount,
        ]),
      },
    })
    return res.status(201).json({
      data: order.data,
      // orderLine: orderLine.data,
    })
  } catch (e) {
    console.log(e)
  }
}
