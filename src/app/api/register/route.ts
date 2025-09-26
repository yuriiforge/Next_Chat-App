import { registerSchema } from '@/app/register/register-schema';
import { authService } from '@/services/auth-service';
import { userService } from '@/services/user-service';
import { createAvatar } from '@/utils/avatar';
import { handleServerError } from '@/utils/handleServerError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userRegisterData = await req.json();
    const parsed = registerSchema.safeParse(userRegisterData);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid register data' },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const userCredential = await authService.register(email, password);

    await userService.createUser({
      uid: userCredential.user.uid,
      name,
      email,
      avatarUrl: createAvatar(),
    });

    return NextResponse.json({ uid: userCredential.user.uid, email });
  } catch (err: unknown) {
    return handleServerError(err);
  }
}
