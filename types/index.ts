export interface Product {
  id: number
  name: string
  href: string
  color: string
  price: string
  availableQty: number
  imageSrc: string
  imageAlt: string
}

export interface CartItem extends RootProduct {
  quantity: number
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
    name: string;
    href: string;
}
export type Navigation = {
  categories: Category[]
  pages: Page[]
}
  export interface GProduct {
    id: string
    name: string
    category_id: string
    slug: string
    description: string
    details: string
    trending: boolean
  }

  export interface GProductsImage {
    ID: string
    Product_ID: string
    imageSrc: string
    imageAlt: string
    main: string
    variant_id: string
  }

  export interface GProductsVariant {
    id: string
    product_id: string
    color: string
    size: string
    price: string
    qty: string
  }

  export interface GCategory {
    id: string
    name: string
    featured: string
  }

  export interface SheetsData {
    Products: GProduct[]
    Products_images: GProductsImage[]
    Products_variant: GProductsVariant[]
    Categories: GCategory[]
  }

  export interface ProductCategory {
    id: string
    name: string
    featured: string
  }

  export interface ProductImage {
    ID: string
    Product_ID: string
    imageSrc: string
    imageAlt: string
    main: string
    variant_id: string
  }

  export interface ProductVariant {
    id: string
    product_id: string
    color: string
    size: string
    price: string
    qty: string
  }

  export interface RootProduct {
    id: string
    name: string
    category_id: string
    slug: string
    description: string
    details: string
    trending: boolean
    product_category: ProductCategory
    product_images: ProductImage[]
    product_variant: ProductVariant[]
  }

export interface Order {
  emailAddress: string
  firstName: string
  lastName: string
  company: string
  address: string
  apartment: string
  city: string
  country: string
  region: string
  postalCode: string
  phone: string
  paymentType: string
  cardNumber: string
  nameOnCard: string
  expirationDate: string
  cvc: string
  orderItems: CartItem[]
}
