import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 30% 30%, #ff6b6b 0%, #ff1a00 50%, #22080f 100%)',
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 900,
          borderRadius: 8
        }}
      >
        ♟
      </div>
    ),
    size
  );
}
