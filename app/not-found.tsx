import Link from 'next/link';
import { ROUTES, VIEW_OPTIONS } from './constantsGlobals';
export default function NotFound() {
  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center bg-black">
      <h2 className='font-bold text-xl text-white'>Página no encontrada</h2>
      <nav>
        <Link
          href={{
            pathname: ROUTES.HOME,
            query: { num: VIEW_OPTIONS.elektraLoan },
          }}
          className="text-blue-500 hover:underline text-lg"
        >
          Ir a Home
        </Link>
      </nav>
    </main>
  );
}