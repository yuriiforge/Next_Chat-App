import { NextResponse } from 'next/server';

export function handleServerError(err: unknown) {
  let message = 'Internal Server Error';

  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  }

  console.error('Server error:', err);

  return NextResponse.json({ error: message }, { status: 500 });
}
