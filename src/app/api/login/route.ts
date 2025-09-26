import { loginSchema } from '@/app/login/loginSchema';
import { authService } from '@/services/auth-service';
import { handleServerError } from '@/utils/handleServerError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userLoginData = await req.json();
    const parsed = loginSchema.safeParse(userLoginData);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid login data' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const userCredential = await authService.login(email, password);

    return NextResponse.json({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });
  } catch (err) {
    return handleServerError(err);
  }
}
