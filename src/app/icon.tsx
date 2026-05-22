import { ImageResponse } from 'next/og';

export const runtime = 'edge';
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
          backgroundColor: '#09090b',
          borderRadius: '6px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#fafafa" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M12 22V12" stroke="#fafafa" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M22 7L12 12L2 7" stroke="#fafafa" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" fill="#fafafa" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
