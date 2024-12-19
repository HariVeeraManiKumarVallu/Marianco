import { getProducts } from '@/lib/queries/strapi/product'
import qs from 'qs'
import ProductCard from './product-card'
import ProductPagination from './product-pagination'

type ProductsListProp = {
  searchParams: { [key: string]: string | undefined }
}

export default async function ProductsGrid({ searchParams }: ProductsListProp) {
  const query = qs.stringify(
    {
      filters: {
        product_category: {
          title: {
            $eq: searchParams?.category?.split(','),
          },
        },
        basePrice: {
          $gte: searchParams?.price?.split('-')?.[0],
          $lte: searchParams?.price?.split('-')?.[1],
        },
        search: searchParams?.search,
      },
      pagination: {
        page: searchParams?.page || 1,
        pageSize: 10,
      },
      sort: searchParams?.sort,
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  )
  const { data: products, meta } = await getProducts(query)

  // const printify = await fetch(
  //   `${process.env.PRINTIFY_API_BASE_URL}/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  // const printifyData = (await printify.json()) as PrintifyProductResponse

  return (
    <div className="flex flex-1 flex-col space-y-16">
      {products?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* {printifyData.data[0].title}

            <ul>
              {printifyData.data[0].variants
                .map(v => {
                  if (!v.is_enabled) return null
                  return (
                    <li key={v.id} className="flex gap-4">
                      <p>{v.title}</p>
                      <p>{v.price}</p>
                      <p>{v.id}</p>
                      <p
                        style={{
                          backgroundColor: `${
                            printifyData.data[0].options[0].values.find(
                              o => o.id === v.options[0]
                            )?.colors[0]
                          }`,
                        }}
                        className={`bg-[${
                          printifyData.data[0].options[0].values.find(
                            o => o.id === v.options[0]
                          )?.colors[0]
                        }]`}
                      >
                        {
                          printifyData.data[0].options[0].values.find(
                            o => o.id === v.options[0]
                          )?.colors[0]
                        }
                      </p>
                      <p>
                        {
                          printifyData.data[0].options[1].values.find(
                            o => o.id === v.options[1]
                          )?.title
                        }
                      </p>
                    </li>
                  )
                })
                .filter(Boolean)}
            </ul> */}
            {/* <div>
              {printifyData.data[0].images.map(i => (
                <img src={i.src} alt={printifyData.data[0].title} key={i.src} />
              ))}
            </div> */}
            {products?.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <ProductPagination
            searchParams={searchParams}
            currentPage={meta.pagination.page}
            totalPaginationButtons={5}
            totalPages={meta.pagination.pageCount}
          />
        </>
      )}
    </div>
  )
}
