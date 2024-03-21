import { Noto_Sans } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const noto = Noto_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>IT Academy</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24 ${noto.className}`}
      >
        <Link href={'/bet'}>
          <div className='bg-blue-secundario text-3xl cursor-pointer text-white py-16 px-60 shadow-xl hover:shadow-2xl rounded-md hover:bg-blue-padrao'>
            Apostar
          </div>
        </Link>
      </main>
    </>
  )
}
