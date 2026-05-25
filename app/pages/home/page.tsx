interface Props {
  // En React 19 / Next.js 15, searchParams es una promesa que resuelve un objeto
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const numParam = resolvedParams.num;

  // Sanitizar y validar el parámetro 
  let numValue: number | null = typeof numParam === 'string' ? parseInt(numParam, 10) : null;

  // Ejemplo de validación: si 'num' no es un número válido o no se envía, manejamos el caso
  if (numValue === null || isNaN(numValue)) {
    numValue = 1;
  }

  return (
    <main className="p-8">
      <h1>Estructura de Path Validada con Éxito</h1>
      <p>El parámetro "num" recibido de forma segura es: <strong>{numValue}</strong></p>
    </main>
  );
}
